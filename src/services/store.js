import { configureStore } from "@reduxjs/toolkit";
// import ingredientsSliceReducer, {ingredientsSlice} from "./ingredientsSlice";
// import categorySlice from "./categoriesSlice";
// import burgerConstuctorSlice from ".//burgerConstuctorSlice";
import { rootReducer } from "./rootReducers";



export const store = configureStore({
    reducer: rootReducer,
    //{
        
        // [ingredientsSlice.name]: ingredientsSliceReducer,
        // category: categorySlice,
        // burgerConstuctor: burgerConstuctorSlice,
    //},
    devTools: process.env.NODE_ENV !== 'production',
});
