import { createReducer } from "@reduxjs/toolkit";
import { OrderListType } from "../../utils/types";
import { wsMessageFeed } from "./actions";

interface IOrderState {
    data: OrderListType | null;
}

export const initialState: IOrderState = {
    data: null,
};

export const feed = createReducer(initialState, builder => {
    builder.addCase(wsMessageFeed, (state, action) => {
        state.data = action.payload;
    });
});