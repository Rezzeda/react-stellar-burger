import { ingredientsSlice } from "./ingredientsSlice";
// import { store } from "./store";

export const selectorIngredients = store => store[ingredientsSlice.name]
export const selectorAllIngredients = store => store[ingredientsSlice.name].allIngredients