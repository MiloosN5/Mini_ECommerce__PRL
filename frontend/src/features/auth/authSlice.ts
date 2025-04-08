import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserData,
  loginUser,
  logoutUser,
  registerUser,
} from "./authThunk";

interface User {
  id: bigint;
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  userCart: bigint | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  userCart: null,
  status: "idle",
  error: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        console.log("Fetched User Data - Fullfilled", action.payload);
        state.user = action.payload.user;
        state.userCart = action.payload.cart.id;
        state.status = "succeeded";
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("User logged in - Fullfilled", action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userCart = action.payload.cartId;
        state.status = "succeeded";
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to login";
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to register";
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.userCart = null;
        state.status = "idle";
        state.loading = true;
        localStorage.removeItem("token");
        localStorage.removeItem("cartId");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to logout";
      });
  },
});

export default authSlice.reducer;
