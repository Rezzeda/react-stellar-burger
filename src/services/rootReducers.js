import { combineReducers } from "redux";
import ingredientsReducer, {ingredientsSlice} from "./ingredientsSlice";

export const rootReducer = combineReducers({
    [ingredientsSlice.name]: ingredientsReducer,
})