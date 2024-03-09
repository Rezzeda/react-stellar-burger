import { combineReducers } from "redux";
import ingredientsReducer, {ingredientsSlice} from "./ingredientsSlice";
import burgerConstructorReducer, {burgerConstructorSlice} from "./burgerConstuctorSlice";
import orderSliceReducer, {orderSlice} from "./orderSlice";


export const rootReducer = combineReducers({
    [ingredientsSlice.name]: ingredientsReducer,
    [burgerConstructorSlice.name]: burgerConstructorReducer,
    [orderSlice.name]: orderSliceReducer,
})