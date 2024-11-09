import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api/userActions";

interface UserState {
  access_token: string | null;
  userName: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: UserState = {
  access_token: localStorage.getItem("token"),
  userName: localStorage.getItem("userName"),
  userId: localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId")!) : null,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser(state) {
      const token = localStorage.getItem("token");
      if (token) {
        state.userName = state.userName
        state.access_token = token;
        state.isAuthenticated = true;
      }
    },
    logout(state) {
      state.access_token = null;
      state.userName = null;
      state.userId = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.userName = action.payload.userName;
        state.userId = action.payload.userId;  
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.userName = action.payload.userName;
        state.userId = action.payload.userId;  
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout, loadUser } = userSlice.actions;
export default userSlice.reducer;
