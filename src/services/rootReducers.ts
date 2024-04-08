import { combineReducers } from "redux";
import ingredientsReducer, {ingredientsSlice} from "./ingredientsSlice";
import burgerConstructorReducer, {burgerConstructorSlice} from "./burgerConstuctorSlice";
import orderSliceReducer, {orderSlice} from "./orderSlice";
import userSliceReducer, {userSlice} from "./userSlice";
import { feed } from "./feed/reducers"
import { allOrders } from "./all-orders/reducers";

export const rootReducer = combineReducers({
    [ingredientsSlice.name]: ingredientsReducer,
    [burgerConstructorSlice.name]: burgerConstructorReducer,
    [orderSlice.name]: orderSliceReducer,
    [userSlice.name]: userSliceReducer,
    feed: feed,
    allOrders: allOrders,
})