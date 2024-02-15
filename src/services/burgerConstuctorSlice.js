import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  burgerIngredients: [],
};

const burgerConstuctorSlice = createSlice({
    name: "burgerConstuctor",
    initialState,
    reducers: {
        setBurgerIngredients(state, action) {
        state.burgerIngredients = action.payload;
        },
    },
});

export const { setBurgerIngredients } = burgerConstuctorSlice.actions;
export default burgerConstuctorSlice.reducer;
