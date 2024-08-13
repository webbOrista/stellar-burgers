

import { getOrderByNumberApi, getOrdersApi} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ERequestStatus, TOrder } from '@utils-types';



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
    status: ERequestStatus
  };
  

  const initialState: TOrdersState = {
    orders: [],
    order: null,
    status: ERequestStatus.Idle,
  };


export const OrderSlice = createSlice({
    name:'order',
    initialState:initialState,
reducers: {
  clearOrder: (state) => {
    state.order = null;
  }
},
extraReducers(builder) {
  builder.addCase(getOrders.pending, (state) => {
    state.status = ERequestStatus.Loading;
  })
  .addCase(getOrders.fulfilled, (state, action) => {
    (state.status = ERequestStatus.Success), (state.orders = action.payload);
  })
  .addCase(getOrders.rejected, (state) => {
    state.status = ERequestStatus.Failed;
  })
  .addCase(getOrderByNumber.pending, (state) => {
    state.status = ERequestStatus.Loading;
  })
  .addCase(getOrderByNumber.fulfilled, (state, action) => {
    (state.status = ERequestStatus.Success), (state.order = action.payload.orders[0]);
  })
  .addCase(getOrderByNumber.rejected, (state) => {
    state.status = ERequestStatus.Failed;
  })

},
    selectors:{
        orderDataSelector: (state) => state.order, // Селектор для получения текущего заказа
        ordersSelector: (state) => state.orders,// Селектор для получения списка всех своих заказов
        orderStatusSelector: (state) => state.status, // Селектор для проверки статуса ответа сервера на запрос

    }
})

export const { orderDataSelector, ordersSelector, orderStatusSelector } = OrderSlice.selectors;
export const { clearOrder } = OrderSlice.actions;

