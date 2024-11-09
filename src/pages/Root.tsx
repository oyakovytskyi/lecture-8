import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/userSlice";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const userName = useAppSelector((state) => state.user.userName);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/">
            Exhibits
          </Button>
          {isAuthenticated && (
            <Button color="inherit" component={Link} to="/new-post">
              <AddIcon fontSize="large" />
            </Button>
          )}
          {isAuthenticated && (
            <Typography variant="body1" sx={{ mr: 2 }}>
              Welcome {userName}
            </Typography>
          )}
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container component="main" sx={{ flexGrow: 1, mt: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default RootLayout;
