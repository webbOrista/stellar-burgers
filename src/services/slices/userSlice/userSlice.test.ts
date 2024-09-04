import { expect, test, jest, describe } from '@jest/globals';
import {
  getUser,
  UserSliceReducer,
  initialState as UserSliceInitialState,
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} from './userSlice';
import { ERequestStatus } from './../../../utils/types';

// Мокируем сетевые запросы

jest.mock('./../../../utils/burger-api', () => ({
  getUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn()
}));

const UserStub = {
  user: { email: 'email@gmail.com', name: 'someName' }
};

describe('работа userSlice', () => {
  describe('запрос данных пользователя', () => {
    test('при отправке запроса статус меняется на Loading', () => {
      const neededState = {
        ...UserSliceInitialState,
        status: ERequestStatus.Loading
      };

      const action = { type: getUser.pending.type };

      const changedState = UserSliceReducer(UserSliceInitialState, action);
      expect(neededState).toEqual(changedState);
    });
    test('при успешном завершении запроса статус меняется на Success', () => {
      const neededState = {
        isAuthChecked: true,
        isAuthenticated: true,
        user: UserStub.user,
        status: ERequestStatus.Success,
        error: null
      };
      const action = {
        type: getUser.fulfilled.type,
        payload: UserStub
      };
      const changedState = UserSliceReducer(UserSliceInitialState, action);
      expect(neededState).toEqual(changedState);
    });
    test('в случае ошибки запроса статус меняется на Failed', () => {
      const errorMessage = 'Ошибка при загрузке данных';
      const neededState = {
        ...UserSliceInitialState,
        isAuthChecked: true,
        status: ERequestStatus.Failed,
        error: errorMessage
      };

      const action = {
        type: getUser.rejected.type,
        error: { message: errorMessage }
      };

      const changedState = UserSliceReducer(UserSliceInitialState, action);

      expect(changedState).toEqual(neededState);
    });
  });
  describe('регистрация пользователя', () => {
    test('при отправке запроса статус меняется на Loading', () => {
      const neededState = {
        ...UserSliceInitialState,
        isAuthChecked: false,
        isAuthenticated: false,
        status: ERequestStatus.Loading
      };

      const action = { type: registerUser.pending.type };

      const changedState = UserSliceReducer(UserSliceInitialState, action);
      expect(neededState).toEqual(changedState);
    });
    test('при успешном завершении запроса статус меняется на Success', () => {
      const neededState = {
        isAuthChecked: true,
        isAuthenticated: true,
        user: UserStub.user,
        status: ERequestStatus.Success,
        error: null
      };
      const action = {
        type: registerUser.fulfilled.type,
        payload: UserStub
      };
      const changedState = UserSliceReducer(UserSliceInitialState, action);
      expect(neededState).toEqual(changedState);
    });
    test('в случае ошибки запроса статус меняется на Failed', () => {
      const errorMessage = 'Ошибка при загрузке данных';
      const neededState = {
        ...UserSliceInitialState,
        isAuthChecked: true,
        isAuthenticated: false,
        status: ERequestStatus.Failed,
        error: errorMessage
      };

      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };

      const changedState = UserSliceReducer(UserSliceInitialState, action);

      expect(changedState).toEqual(neededState);
    });
  });
  describe('вход пользователя', () => {
    test('при отправке запроса статус меняется на Loading', () => {
      const neededState = {
        ...UserSliceInitialState,
        isAuthChecked: false,
        isAuthenticated: false,
        status: ERequestStatus.Loading
      };

      const action = { type: loginUser.pending.type };

      const changedState = UserSliceReducer(UserSliceInitialState, action);
      expect(neededState).toEqual(changedState);
    });
    test('при успешном завершении запроса статус меняется на Success', () => {
      const neededState = {
        isAuthChecked: true,
        isAuthenticated: true,
        user: UserStub,
        status: ERequestStatus.Success,
        error: null
      };
      const action = {
        type: loginUser.fulfilled.type,
        payload: UserStub
      };
      const changedState = UserSliceReducer(UserSliceInitialState, action);
      expect(neededState).toEqual(changedState);
    });
    test('в случае ошибки запроса статус меняется на Failed', () => {
      const errorMessage = 'Ошибка при загрузке данных';
      const neededState = {
        ...UserSliceInitialState,
        isAuthChecked: true,
        isAuthenticated: false,
        status: ERequestStatus.Failed,
        error: errorMessage
      };

      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };

      const changedState = UserSliceReducer(UserSliceInitialState, action);

      expect(changedState).toEqual(neededState);
    });
  });
  describe('обновление данных пользователя', () => {
    test('при отправке запроса статус меняется на Loading', () => {
      const neededState = {
        ...UserSliceInitialState,
        status: ERequestStatus.Loading
      };

      const action = { type: updateUser.pending.type };

      const changedState = UserSliceReducer(UserSliceInitialState, action);
      expect(changedState).toEqual(neededState);
    });
    test('при успешном завершении запроса статус меняется на Success', () => {
      const neededState = {
        isAuthChecked: true,
        isAuthenticated: true,
        user: UserStub.user,
        status: ERequestStatus.Success,
        error: null
      };
      const action = {
        type: updateUser.fulfilled.type,
        payload: UserStub
      };
      const changedState = UserSliceReducer(UserSliceInitialState, action);
      expect(changedState).toEqual(neededState);
    });
    test('в случае ошибки запроса статус меняется на Failed', () => {
      const errorMessage = 'Ошибка при загрузке данных';
      const neededState = {
        ...UserSliceInitialState,
        status: ERequestStatus.Failed,
        error: errorMessage
      };

      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };

      const changedState = UserSliceReducer(UserSliceInitialState, action);

      expect(changedState).toEqual(neededState);
    });
  });
  describe('выход пользователя', () => {
    test('при отправке запроса статус меняется на Loading', () => {
      const neededState = {
        ...UserSliceInitialState,
        isAuthChecked: true,
        isAuthenticated: true,
        status: ERequestStatus.Loading
      };

      const action = { type: logoutUser.pending.type };

      const changedState = UserSliceReducer(UserSliceInitialState, action);
      expect(changedState).toEqual(neededState);
    });
    test('при успешном завершении запроса статус меняется на Success', () => {
      const neededState = {
        isAuthChecked: true,
        isAuthenticated: false,
        user: null,
        status: ERequestStatus.Success,
        error: null
      };
      const action = {
        type: logoutUser.fulfilled.type,
        payload: UserStub
      };
      const changedState = UserSliceReducer(UserSliceInitialState, action);
      expect(changedState).toEqual(neededState);
    });
    test('в случае ошибки запроса статус меняется на Failed', () => {
      const errorMessage = 'Ошибка при загрузке данных';
      const neededState = {
        ...UserSliceInitialState,
        isAuthChecked: true,
        isAuthenticated: true,
        status: ERequestStatus.Failed,
        error: errorMessage
      };

      const action = {
        type: logoutUser.rejected.type,
        error: { message: errorMessage }
      };

      const changedState = UserSliceReducer(UserSliceInitialState, action);

      expect(changedState).toEqual(neededState);
    });
  });
});
