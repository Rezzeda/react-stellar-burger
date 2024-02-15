import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCategory: null,
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCurrentCategory(state, action) {
            state.currentCategory = action.payload;
        },
    },
});

export const { setCurrentCategory } = categorySlice.actions;

export default categorySlice.reducer;
