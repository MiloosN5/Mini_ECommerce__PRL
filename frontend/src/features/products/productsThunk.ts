import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const csrfToken = document
//   .querySelector('meta[name="csrf-token"]')
//   ?.getAttribute("content");
// axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/products`,
      );
      const productsWithNumericPrice = response.data.map((product: any) => ({
        ...product,
        price: parseFloat(product.price),
      }));

      return productsWithNumericPrice;
    } catch (error: any) {
      console.error("Fetch products error: ", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct: { name: string; price: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/products`,
        newProduct,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error during addProduct:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
