import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const sliceName = "ingredients"

const initialState = {
  allIngredients: [],
  loading: false, // Флаг для отслеживания состояния загрузки
  error: null, // Переменная для хранения ошибки, если она произойдет во время загрузки
  currentTab: null,
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
        state.error = action.error.message;
      });
  },
});

export const { setCurrentTab, addIngredient, removeIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;