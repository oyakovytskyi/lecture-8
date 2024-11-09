import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser } from "../api/userActions";
import AuthForm from "../components/AuthForm";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    await dispatch(loginUser(values));
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <AuthForm title="Login" buttonText="Login" onSubmit={handleLogin} />
        <Typography variant="body2" mt={2}>
          Don't have an account?
          <Button onClick={() => navigate("/register")} color="secondary">
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
