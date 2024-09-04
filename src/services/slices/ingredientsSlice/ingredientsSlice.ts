import { getIngredientsApi } from './../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from './../../../utils/types';
import { ERequestStatus } from './../../../utils/types';

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  getIngredientsApi
);

type TIngredientsState = {
  data: TIngredient[];
  status: ERequestStatus;
  error?: string | null;
};

export const initialState: TIngredientsState = {
  data: [],
  status: ERequestStatus.Idle,
  error: null
};

export const IngredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = ERequestStatus.Loading;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = ERequestStatus.Success;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.status = ERequestStatus.Failed;
        state.error = action.error.message;
      });
  },

  selectors: {
    IngredientsDataSelector: (state: TIngredientsState) => state.data,
    IngredientsStatusSelector: (state: TIngredientsState) => state.status
  }
});

export const IngredientsSelector = IngredientsSlice.selectors;

export const IngredientsSliceReducer = IngredientsSlice.reducer;
