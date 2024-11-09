import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";

import { registerUser } from "../api/userActions";
import AuthForm from "../components/AuthForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (values: {
    username: string;
    password: string;
  }) => {
    await dispatch(registerUser(values));
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
        <AuthForm
          title="Register"
          buttonText="Register"
          onSubmit={handleRegister}
          isRegistration={true}
        />
        <Typography variant="body2" mt={2}>
          Already have an account?
          <Button onClick={() => navigate("/login")} color="secondary">
            Login
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
