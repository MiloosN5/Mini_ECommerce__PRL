import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCart, fetchCart } from "./cartThunk";

type ChangeQuantityPayload = {
    product: Product;
    newQ: number;
};

export interface Product {
    id: bigint;
    name: string;
    price: number;
    quantity?: number;
}

interface CartState {
    id: bigint | null;
    userId: bigint | null;
    items: Product[];
    totalQuantity: number;
    totalPrice: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: CartState = {
    id: null,
    userId: null,
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    status: "idle",
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            state.items.push(product);
            state.totalQuantity += product.quantity!;
            state.totalPrice += product.price * product.quantity!;
        },
        changeQuantity: (state, action: PayloadAction<ChangeQuantityPayload>) => {
            const { product, newQ } = action.payload;
            const existingItem = state.items.find(
                (item: Product) => item.id === product.id,
            );
            if (existingItem) {
                const quantityDiff = newQ - product.quantity!;
                existingItem.quantity = newQ;
                state.totalQuantity += quantityDiff;
                state.totalPrice += product.price * quantityDiff;
            }
        },
        removeFromCart: (state, action: PayloadAction<bigint>) => {
            const productId = action.payload;
            const existingItem = state.items.find((item) => item.id === productId);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity!;
                state.totalPrice -= existingItem.price * existingItem.quantity!;
                state.items = state.items.filter((item) => item.id !== productId);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        removeCart: (state) => {
            state.id = null;
            state.userId = null;
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                console.log("Cart found - Fulfilled", action.payload);
                state.id = action.payload.cart.id ;
                state.userId = action.payload.cart.user_id;
                state.items = action.payload.cart.items;
                state.totalPrice = action.payload.cart.totalPrice;
                state.totalQuantity = action.payload.cart.totalQuantity;
                state.status = "succeeded";
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to load";
            })
            .addCase(updateCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.cart.items;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error saving the cart";
            });
    },
});

export const {
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    removeCart,
} = cartSlice.actions;
export default cartSlice.reducer;
