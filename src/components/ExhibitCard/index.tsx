import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

import { ExhibitI } from "../../interfaces/ExihibitI";
import axiosInstance from "../../api/axiosInstance";
import CommentSection from "../Comment";
import { useAppSelector } from "../../store/hooks";
import { deleteExhibit } from "../../api/exhibitActions";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";

interface ExhibitProps {
  exhibit: ExhibitI;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const ExhibitCard: React.FC<ExhibitProps> = ({ exhibit }) => {
  const userId = useAppSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const handleConfirmDelete = async () => {
    try {
      await deleteExhibit(exhibit.id);
      toast.success("Exhibit deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete exhibit.");
    }
  };

  const handleDelete = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleConfirmDelete(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleOpenPost = () => {
    navigate(`/view/${exhibit.id}`);
  };

  return (
    <Card sx={{ width: "100%", marginBottom: 2 }}>
      <CardMedia
        onClick={handleOpenPost}
        component="img"
        image={`${axiosInstance.defaults.baseURL}${exhibit.imageUrl}`}
        alt={exhibit.description}
        sx={{ height: 600 }}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {truncateText(exhibit.description, 50)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By: {exhibit.user.username}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body2" color="text.secondary">
            Comments: {exhibit.commentCount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Posted on: {new Date(exhibit.createdAt).toLocaleDateString()}
          </Typography>
          {userId === exhibit.user.id && (
            <IconButton onClick={handleDelete} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>

        <CommentSection
          exhibitId={exhibit.id}
          commentCount={exhibit.commentCount}
        />
      </CardContent>
    </Card>
  );
};

export default ExhibitCard;
