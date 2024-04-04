import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducers";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch