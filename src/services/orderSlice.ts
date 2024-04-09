import { createSlice } from "@reduxjs/toolkit";
import { postOrder, getOrder } from "../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderType } from "../utils/types";
import { RootState } from "./store";


const sliceName = "order"

interface IOrderState {
    orderNumber: number | null;
    currentOrder: OrderType | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: IOrderState = {
    orderNumber: null,
    currentOrder: null,
    isLoading: false,
    error: null,
};

export const orderSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(submitOrder.pending, state => {
            state.isLoading = true;
            state.error = null;
        })

        builder.addCase(submitOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderNumber = action.payload.order.number;
            state.error = null;
        })

        builder.addCase(submitOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
            state.orderNumber = null;
        })
        builder.addCase(getOrders.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentOrder = action.payload;
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
    },
});

export const submitOrder = createAsyncThunk(
    `${sliceName}/fetchOrderResult`,
    async (ingredientIds: string[]) => {
        const response = await postOrder({ ingredients: ingredientIds }); // Передаем объект с ключом "ingredients"
        return response;
    }
);

export const getOrders = createAsyncThunk<OrderType, string, { state: RootState }>(
    `${sliceName}/getOrder`,
    async (number) => {
        const data = await getOrder(number);
        return data.orders[0];
    }
);

export default orderSlice.reducer;
