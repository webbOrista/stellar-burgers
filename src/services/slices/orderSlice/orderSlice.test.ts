import { expect, test, jest, describe } from '@jest/globals';

import {
  getOrderByNumber,
  getOrders,
  initialState as OrderSliceInitialState,
  OrderSliceReducer,
  submitOrder
} from './orderSlice';

jest.mock('./../../../utils/burger-api', () => ({
  orderBurgerApi: jest.fn(),
  getOrdersApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

const OrderStub = {
  order: {
    _id: '66cf35c3119d45001b502957',
    ingredients: ['643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2024-08-28T14:35:47.355Z',
    updatedAt: '2024-08-28T14:35:47.908Z',
    number: 51379
  }
};

const OrdersStub = [OrderStub.order];

describe('работа orderSlice', () => {
  describe('оформление заказа', () => {
    test('при отправке запроса статус меняется на Loading', () => {
      const neededState = {
        ...OrderSliceInitialState,
        loadingStatus: true,
        error: null,
        orders: []
      };

      const action = { type: submitOrder.pending.type };

      const changedState = OrderSliceReducer(OrderSliceInitialState, action);
      expect(changedState).toEqual(neededState);
    });

    test('при успешном завершении запроса статус меняется на Success', () => {
      const neededState = {
        ...OrderSliceInitialState,
        order: OrderStub.order,
        orders: [],
        loadingStatus: false,
        error: null
      };
      const action = {
        type: submitOrder.fulfilled.type,
        payload: OrderStub
      };
      const changedState = OrderSliceReducer(OrderSliceInitialState, action);
      expect(changedState).toEqual(neededState);
    });

    test('в случае ошибки запроса статус меняется на Failed', () => {
      const errorMessage = 'Ошибка при загрузке данных';

      const neededState = {
        ...OrderSliceInitialState,
        loadingStatus: false,
        error: errorMessage,
        orders: []
      };

      const action = {
        type: submitOrder.rejected.type,
        error: { message: errorMessage }
      };

      const changedState = OrderSliceReducer(OrderSliceInitialState, action);

      expect(changedState).toEqual(neededState);
    });
  });

  describe('получение оформленных ранее заказов', () => {
    test('при отправке запроса статус меняется на Loading', () => {
      const neededState = {
        ...OrderSliceInitialState,
        loadingStatus: true,
        error: null,
        orders: []
      };

      const action = { type: getOrders.pending.type };

      const changedState = OrderSliceReducer(OrderSliceInitialState, action);
      expect(changedState).toEqual(neededState);
    });

    test('при успешном завершении запроса статус меняется на Success', () => {
      const neededState = {
        ...OrderSliceInitialState,
        orders: OrdersStub,
        order: null,
        loadingStatus: false,
        error: null
      };
      const action = {
        type: getOrders.fulfilled.type,
        payload: OrdersStub
      };
      const changedState = OrderSliceReducer(OrderSliceInitialState, action);
      expect(changedState).toEqual(neededState);
    });

    test('в случае ошибки запроса статус меняется на Failed', () => {
      const errorMessage = 'Ошибка при загрузке данных';

      const neededState = {
        ...OrderSliceInitialState,
        loadingStatus: false,
        error: errorMessage,
        orders: []
      };

      const action = {
        type: getOrders.rejected.type,
        error: { message: errorMessage }
      };

      const changedState = OrderSliceReducer(OrderSliceInitialState, action);

      expect(changedState).toEqual(neededState);
    });
  });

  describe('получение заказа по номеру', () => {
    test('при отправке запроса статус меняется на Loading', () => {
      const neededState = {
        ...OrderSliceInitialState,
        loadingStatus: true,
        error: null,
        orders: []
      };

      const action = { type: getOrderByNumber.pending.type };

      const changedState = OrderSliceReducer(OrderSliceInitialState, action);
      expect(changedState).toEqual(neededState);
    });

    test('при успешном завершении запроса статус меняется на Success', () => {
      const neededState = {
        ...OrderSliceInitialState,
        order: OrderStub.order,
        orders: [],
        loadingStatus: false,
        error: null
      };
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: OrdersStub }
      };
      const changedState = OrderSliceReducer(OrderSliceInitialState, action);
      expect(changedState).toEqual(neededState);
    });

    test('в случае ошибки запроса статус меняется на Failed', () => {
      const errorMessage = 'Ошибка при загрузке данных';

      const neededState = {
        ...OrderSliceInitialState,
        loadingStatus: false,
        error: errorMessage,
        orders: []
      };

      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: errorMessage }
      };

      const changedState = OrderSliceReducer(OrderSliceInitialState, action);

      expect(changedState).toEqual(neededState);
    });
  });
});
