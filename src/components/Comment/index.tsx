import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import axiosInstance from "../../api/axiosInstance";
import { addComment } from "../../api/commentActions";
import { RootState } from "../../store/store";

interface Comment {
  id: number;
  text: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
}

interface CommentSectionProps {
  exhibitId: number;
  commentCount: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ exhibitId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [showComments, setShowComments] = useState(false);
  const { userId } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (showComments) fetchComments();
  }, [showComments]);

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/exhibits/${exhibitId}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleToggleComments = () => setShowComments((prev) => !prev);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("token");
    if (token && newComment.trim()) {
      try {
        const response = await addComment(exhibitId, newComment);
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment("");
        toast.success("Comment submitted successfully.");
      } catch (error) {
        toast.error("Error submitting comment.");
      }
    } else {
      toast.error("Error submitting comment.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment?.user.id === userId) {
      try {
        await axiosInstance.delete(
          `/api/exhibits/${exhibitId}/comments/${commentId}`
        );
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        toast.success("Comment deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete the comment.");
      }
    } else {
      toast.error("You can only delete your own comments.");
    }
  };

  return (
    <Box mt={2}>
      <Button onClick={handleToggleComments} sx={{ mt: 2 }}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </Button>

      {showComments && (
        <Box mt={2}>
          <List>
            {comments.map((comment) => (
              <React.Fragment key={comment.id}>
                <ListItem>
                  <ListItemText
                    primary={`${comment.user.username}: ${comment.text}`}
                    secondary={new Date(comment.createdAt).toLocaleString()}
                  />
                  {userId === comment.user.id && (
                    <Button onClick={() => handleDeleteComment(comment.id)}>
                      Delete
                    </Button>
                  )}
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Add a comment"
              multiline
              rows={3}
              value={newComment}
              onChange={handleCommentChange}
              variant="outlined"
            />
            <Button
              onClick={handleCommentSubmit}
              sx={{ mt: 1 }}
              fullWidth
              variant="contained"
            >
              Post Comment
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CommentSection;
