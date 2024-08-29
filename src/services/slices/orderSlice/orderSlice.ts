import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from './../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from './../../../utils/types';

export const submitOrder = createAsyncThunk(
  'order/submit',
  async (ingredients: string[], { rejectWithValue }) => {
    const reply = await orderBurgerApi(ingredients);
    if (!reply.success) {
      return rejectWithValue(reply);
    }
    return reply;
  }
);

export const getOrders = createAsyncThunk('orders/getAll', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'order/get',
  async (number: number) => getOrderByNumberApi(number)
);

type TOrdersState = {
  orders: TOrder[]; // Список всех заказов
  order: TOrder | null; // Текущий заказ, отображаемый в модальном окне
  loadingStatus: boolean;
  error?: string | null;
};

export const initialState: TOrdersState = {
  orders: [],
  order: null,
  loadingStatus: false,
  error: null
};

export const OrderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.order = action.payload.order;
        state.error = null;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error.message;
      })
      .addCase(getOrders.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        (state.loadingStatus = false), (state.orders = action.payload);
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        (state.loadingStatus = false), (state.order = action.payload.orders[0]);
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    orderDataSelector: (state) => state.order, // Селектор для получения текущего заказа
    orderRequestSelector: (state) => state.loadingStatus, // Селектор для проверки статуса ответа сервера на запрос
    ordersSelector: (state) => state.orders // Селектор для получения списка всех заказов
  }
});

export const { orderDataSelector, orderRequestSelector, ordersSelector } =
  OrderSlice.selectors;
export const { clearOrder } = OrderSlice.actions;

export const OrderSliceReducer = OrderSlice.reducer;
