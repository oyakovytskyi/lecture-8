import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./components/ProtectedRoute";
import StripePage from "./pages/StripePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewPost from "./pages/NewPost";
import RootLayout from "./pages/Root";
import { useAppSelector } from "./store/hooks";
import { fetchExhibits, fetchMyExhibits } from "./api/exhibitActions";
import ViewPost from "./pages/ViewPost";

function App() {
  const isAuthenticated = useAppSelector(
    (state: { user: { isAuthenticated: boolean } }) =>
      state.user.isAuthenticated
  );

  return (
    <RootLayout>
      <Routes>
        <Route
          path="/"
          element={<StripePage fetchFunction={fetchExhibits} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <StripePage fetchFunction={fetchMyExhibits} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-post"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <NewPost />
            </ProtectedRoute>
          }
        />
        <Route path="/view/:id" element={<ViewPost />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </RootLayout>
  );
}

export default App;
