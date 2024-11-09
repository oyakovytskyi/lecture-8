import axiosInstance from "./axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("api/auth/login", credentials);
      const { access_token, userName, userId } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId.toString());

      return { access_token, userName, userId };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to login");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("auth/register", userData);
      const { access_token, userName, userId } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId.toString());

      return { access_token, userName, userId };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to register");
    }
  }
);
