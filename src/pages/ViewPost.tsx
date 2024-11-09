import React from "react";
import { useParams } from "react-router-dom";

const ViewPost: React.FC = () => {
  const { id } = useParams();
  return <div>View Post {id}</div>;
};

export default ViewPost;
