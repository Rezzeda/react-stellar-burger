import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIngredient: null, // Начальное значение null
};

const selectedIngredientSlice = createSlice({
    name: "selectedIngredient",
    initialState,
    reducers: {
        setSelectedIngredient(state, action) {
        state.selectedIngredient = action.payload;
        },
    },
});

export const { setSelectedIngredient } = selectedIngredientSlice.actions;
export default selectedIngredientSlice.reducer;
