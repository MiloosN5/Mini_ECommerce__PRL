import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const csrfToken = document
//   .querySelector('meta[name="csrf-token"]')
//   ?.getAttribute("content");
// axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/auth/me`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/auth/login`,
      credentials,
    );
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${response.data.token}`;
    return response.data;
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials: { name: string; email: string; password: string }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/auth/register`,
      credentials,
    );
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${response.data.token}`;
    return response.data;
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      await axios.post(`${import.meta.env.VITE_SERVER}/api/auth/logout`);
      delete axios.defaults.headers.common["Authorization"];
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
