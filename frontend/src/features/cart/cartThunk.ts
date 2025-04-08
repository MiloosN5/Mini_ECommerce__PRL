import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import axios from "axios";

const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute("content");
axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (cartId: bigint) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/carts/${cartId}`,
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        throw new Error("Cart not found");
      }
      throw error;
    }
  },
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (cartId: bigint, { getState }) => {
    const state = getState() as RootState;
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER}/api/carts/${cartId}`,
      {
        user_id: state.auth.user?.id,
        items: state.cart.items,
        totalPrice: state.cart.totalPrice,
        totalQuantity: state.cart.totalQuantity,
      },
    );
    return response.data;
  },
);
