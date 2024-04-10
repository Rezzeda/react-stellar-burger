import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IngredientType } from "../utils/types";

const sliceName = "ingredients"

interface IIngredientsState {
  allIngredients: IngredientType[];
  loading: boolean;
  error: string | null;
}

export const initialState: IIngredientsState = {
  allIngredients: [],
  loading: false, // Флаг для отслеживания состояния загрузки
  error: null, // Переменная для хранения ошибки, если она произойдет во время загрузки
};

export const fetchIngredients = createAsyncThunk(
  `${sliceName}/fetchIngredients`,
  async () => {
    const res = await getIngredients();
    return res.data;
  }
);

export const ingredientsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.allIngredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default ingredientsSlice.reducer;