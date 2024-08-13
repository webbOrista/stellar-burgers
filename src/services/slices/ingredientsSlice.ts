import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { ERequestStatus } from '@utils-types';

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  getIngredientsApi
);

type TIngredientsState = {
  data: TIngredient[];
  status: ERequestStatus;
};

const initialState: TIngredientsState = {
  data: [],
  status: ERequestStatus.Idle
};

export const IngredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = ERequestStatus.Loading;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = ERequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = ERequestStatus.Failed;
      });
  },

  selectors: {
    IngredientsDataSelector: (state: TIngredientsState) => state.data,
    IngredientsStatusSelector: (state: TIngredientsState) => state.status
  }
});

export const IngredientsSelector = IngredientsSlice.selectors;
