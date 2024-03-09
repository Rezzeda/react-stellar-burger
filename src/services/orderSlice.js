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
});

export const { setOrderNumber, setError } = orderSlice.actions;

export const submitOrder = createAsyncThunk(
    `${sliceName}/submitOrder`,
    async (ingredients, { dispatch }) => {
        try {
        const response = await postOrder(ingredients);
        if (response.success) {
            dispatch(setOrderNumber(response.order.number));
            dispatch(setError(null));
        } else {
            dispatch(setError('Ошибка при оформлении заказа'));
        }
        } catch (error) {
        dispatch(setError('Произошла ошибка при соединении с сервером'));
        }
    }
);

export default orderSlice.reducer;
