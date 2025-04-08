import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, addProduct } from "./productsThunk";

export interface Product {
    id: bigint;
    name: string;
    price: number;
}

interface ProductsState {
    items: Product[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    status: "idle",
    error: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to load";
            })
            .addCase(addProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload.product);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error adding product";
            });
    },
});

export default productsSlice.reducer;
