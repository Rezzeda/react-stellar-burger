import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType } from "../utils/types";
import { v4 as uuidv4 } from 'uuid';

const sliceName = "burgerConstuctor"

interface IBurgerConstructorState {
  burgerBuns: IngredientType[];
  otherIngredients: IngredientType[];
}

export const initialState: IBurgerConstructorState = {
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
      state.otherIngredients = state.otherIngredients.filter(ingredient => ingredient.uniqueId !== action.payload.uniqueId);
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

// Action creator для добавления ингредиента
export const addIngredientWithId = (item: IngredientType) => {
  return {
    type: 'burgerConstructor/addIngredient',
    payload: {
      ...item,
      uniqueId: uuidv4(), // Генерируем и добавляем UUID для ингредиента
    }
  };
};

export const { addBun, addIngredient, removeIngredient, reorderIngredient, clearBurger } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;

