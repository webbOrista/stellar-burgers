import { expect, test } from '@jest/globals';
import {
  BurgerConstructorSlice,
  initialState as BurgerConstructorSliceInitialState
} from '../slices/burgerConstructorSlice/burgerConstructorSlice';
import {
  FeedSlice,
  initialState as FeedSliceInitialState
} from '../slices/feedSlice/feedSlice';
import {
  IngredientsSlice,
  initialState as IngredientsSliceInitialState
} from '../slices/ingredientsSlice/ingredientsSlice';
import {
  OrderSlice,
  initialState as OrderSliceInitialState
} from '../slices/orderSlice/orderSlice';
import {
  UserSlice,
  initialState as UserSliceInitialState
} from '../slices/userSlice/userSlice';
import store from '../store/store';

describe('Тест работы корневого редьюсера', () => {
  test('корневой редьюсер инициализируется коректно, начальное состояние соответствует ожидаемому', () => {
    const initialState = store.getState();
    expect(initialState).toEqual({
      [IngredientsSlice.name]: IngredientsSliceInitialState,
      [BurgerConstructorSlice.name]: BurgerConstructorSliceInitialState,
      [UserSlice.name]: UserSliceInitialState,
      [OrderSlice.name]: OrderSliceInitialState,
      [FeedSlice.name]: FeedSliceInitialState
    });
  });

  test('корневой редьюсер возвращает корректное начальное состояние хранилища при передаче неизвестного экшена', () => {
    //подготовка
    const initialState = store.getState();

    //действие

    store.dispatch({ type: 'UNKNOWN_ACTION' });

    //проверка

    expect(store.getState()).toEqual(initialState);
  });
});
