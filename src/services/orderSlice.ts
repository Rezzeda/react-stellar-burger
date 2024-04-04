import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const sliceName = "order"

interface IOrderState {
    orderNumber: number | null;
    error: string | null;
}

const initialState: IOrderState = {
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
            state.error = action.error.message || null;
        });
    },
});

export const { setOrderNumber, setError } = orderSlice.actions;

export const submitOrder = createAsyncThunk(
    `${sliceName}/submitOrder`, 
    async (ingredientIds: string[]) => {
        const response = await postOrder({ ingredients: ingredientIds }); // Передаем объект с ключом "ingredients"
        return response;
    }
);

export default orderSlice.reducer;
