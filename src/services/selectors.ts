import { ingredientsSlice } from "./ingredientsSlice";
import { burgerConstructorSlice } from "./burgerConstuctorSlice";
import { orderSlice } from "./orderSlice";
import { createSelector } from "reselect";
import { userSlice } from "./userSlice";
import { RootState } from "./store";


export const selectorIngredients = (store: RootState) => store[ingredientsSlice.name];
export const selectorAllIngredients = (store: RootState ) => store[ingredientsSlice.name].allIngredients;

export const selectorBurgerBuns = (store: RootState ) => store[burgerConstructorSlice.name].burgerBuns;
export const selectorOtherIngredients = (store: RootState ) => store[burgerConstructorSlice.name].otherIngredients;

export const selectorIngredientCounts = createSelector(
    [selectorOtherIngredients, selectorBurgerBuns],
    (otherIngredients, burgerBuns) => {
        const ingredientCounts: { [key: string]: { id: string, _id: string, count: number }[] } = {};

        // Подсчет уникальных ингредиентов из otherIngredients
        otherIngredients.forEach((ingredient) => {
            const { _id, id } = ingredient;
            if (!ingredientCounts[_id]) {
                ingredientCounts[_id] = [];
            }
            const existingIngredient = ingredientCounts[_id].find(item => item.id === id);
            if (existingIngredient) {
                existingIngredient.count++;
            } else {
                ingredientCounts[_id].push({ id, _id, count: 1 });
            }
        });

        // Подсчет уникальных ингредиентов из burgerBuns
        burgerBuns.forEach((bun) => {
            const { _id } = bun;
            if (!ingredientCounts[_id]) {
                ingredientCounts[_id] = [];
            }
            // Булки не имеют поля id, поэтому оставляем его пустым, количество 2 т.к. сверху и снизу булка
            ingredientCounts[_id].push({ id: '', _id, count: 2 });
        });
        
        return ingredientCounts;
    }
);

export const selectorOrderNumber = (store: RootState ) => store[orderSlice.name].orderNumber;
export const selectorCurrentOrder = (store: RootState ) => store[orderSlice.name].currentOrder;
export const selectorisLoadingOrder = (store: RootState ) => store[orderSlice.name].isLoading;

export const getIsAuthChecked = createSelector(
    (store: RootState) => store[userSlice.name].IsAuthChecked,
    (isAuthChecked) => isAuthChecked
);

export const selectorUser = (store: RootState ) => store[userSlice.name].data;