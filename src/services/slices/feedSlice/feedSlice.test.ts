import { expect, test, describe } from '@jest/globals';
import {
  getFeed,
  initialState as FeedSliceInitialState,
  FeedSliceReducer
} from './feedSlice';
import { ERequestStatus } from './../../../utils/types';

// Мокируем запрос данных ленты заказов

jest.mock('./../../../utils/burger-api', () => ({
  getFeedsApi: jest.fn()
}));

const FeedStub = {
  orders: [
    {
      _id: '66cf35c3119d45001b502957',
      ingredients: ['643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2024-08-28T14:35:47.355Z',
      updatedAt: '2024-08-28T14:35:47.908Z',
      number: 51379
    }
  ],
  total: 51005,
  totalToday: 71
};

describe('работа FeedSlice', () => {
  test('при отправке запроса статус меняется на Loading', () => {
    const neededState = {
      ...FeedSliceInitialState,
      status: ERequestStatus.Loading
    };
    const action = { type: getFeed.pending.type };
    const changedState = FeedSliceReducer(FeedSliceInitialState, action);
    expect(changedState).toEqual(neededState);
  });

  test('при успешном завершении запроса статус меняется на Success', () => {
    const neededState = {
      ...FeedSliceInitialState,
      status: ERequestStatus.Success,
      feed: FeedStub
    };
    const action = { type: getFeed.fulfilled.type, payload: FeedStub };
    const changedState = FeedSliceReducer(FeedSliceInitialState, action);
    expect(changedState).toEqual(neededState);
  });

  test('в случае ошибки запроса статус меняется на Failed', () => {
    const errorMessage = 'Ошибка при загрузке данных';
    const neededState = {
      ...FeedSliceInitialState,
      status: ERequestStatus.Failed,
      error: errorMessage
    };
    const action = {
      type: getFeed.rejected.type,
      error: { message: errorMessage }
    };
    const changedState = FeedSliceReducer(FeedSliceInitialState, action);
    expect(changedState).toEqual(neededState);
  });
});
