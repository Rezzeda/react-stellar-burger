import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


const sliceName = "order"

const initialState = {
    orderNumber: null,
    error: null,
};

export const orderSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setOrderNumber(state, action) {
            state.orderNumber = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(submitOrder.fulfilled, (state, action) => {
            state.error = null;
            state.orderNumber = action.payload.order.number;
        });
        builder.addCase(submitOrder.rejected, (state, action) => {
            state.error = action.payload || 'Произошла ошибка при соединении с сервером';
        });
    },
});

export const { setOrderNumber, setError } = orderSlice.actions;

export const submitOrder = createAsyncThunk(
    `${sliceName}/submitOrder`,
    async (ingredients) => {
        const response = await postOrder(ingredients);
        if (response.success) {
            return response;
        } else {
            throw response.message || 'Ошибка при оформлении заказа';
        }
    }
);

export default orderSlice.reducer;
