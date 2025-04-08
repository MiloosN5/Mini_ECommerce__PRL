import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import authReducer from '../features/auth/authSlice';
import colorReducer from '../features/color/colorSlice';

const cartPersistConfig = {
    key: 'cart',
    storage
}

const productsPersistConfig = {
    key: 'products',
    storage
};

const authPersistConfig = {
    key: 'auth',
    storage
};

const colorPersistConfig = {
    key: 'color',
    storage
};

const persistedCartReducer  = persistReducer(cartPersistConfig, cartReducer);
const persistedProductsReducer = persistReducer(productsPersistConfig, productsReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedColorReducer = persistReducer(colorPersistConfig, colorReducer);

export const store = configureStore({
    reducer: {
        cart: persistedCartReducer,
        products: persistedProductsReducer,
        auth: persistedAuthReducer,
        color: persistedColorReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);