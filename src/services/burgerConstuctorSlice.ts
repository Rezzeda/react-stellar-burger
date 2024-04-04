import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType } from "../utils/types";

const sliceName = "burgerConstuctor"

interface IBurgerConstructorState {
  burgerBuns: IngredientType[];
  otherIngredients: IngredientType[];
}

const initialState: IBurgerConstructorState = {
  burgerBuns: [],
  otherIngredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.burgerBuns = [action.payload];
    },
    addIngredient(state, action) {
      state.otherIngredients.push(action.payload);
    },
    removeIngredient(state, action) {
      state.otherIngredients = state.otherIngredients.filter(ingredient => ingredient.id !== action.payload.id);
    },
    reorderIngredient(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const sortedIngredients = [...state.otherIngredients];
      sortedIngredients.splice(to, 0, sortedIngredients.splice(from, 1)[0]);
      state.otherIngredients = sortedIngredients;
    },
    clearBurger(state) {
      state.burgerBuns = [];
      state.otherIngredients = [];
    },
  },
});

export const { addBun, addIngredient, removeIngredient, reorderIngredient, clearBurger } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;

