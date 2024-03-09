import { ingredientsSlice } from "./ingredientsSlice";
import { burgerConstructorSlice } from "./burgerConstuctorSlice";
import { orderSlice } from "./orderSlice";
import { createSelector } from "reselect";

export const selectorIngredients = store => store[ingredientsSlice.name];
export const selectorAllIngredients = store => store[ingredientsSlice.name].allIngredients;

export const selectorBurgerBuns = store => store[burgerConstructorSlice.name].burgerBuns;
export const selectorOtherIngredients = store => store[burgerConstructorSlice.name].otherIngredients;

export const selectorIngredientCounts = createSelector(
    [selectorOtherIngredients, selectorBurgerBuns],
    (otherIngredients, burgerBuns) => {
        const ingredientCounts = {};
        
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

export const selectorOrderNumber = store => store[orderSlice.name].orderNumber;
