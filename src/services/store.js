import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredientsSlice";
import categorySlice from "./categoriesSlice";
import burgerConstuctorSlice from ".//burgerConstuctorSlice";



export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        category: categorySlice,
        burgerConstuctor: burgerConstuctorSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
});
