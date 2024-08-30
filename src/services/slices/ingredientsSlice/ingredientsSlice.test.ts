import { ERequestStatus } from './../../../utils/types';
import { expect, test, jest, describe } from '@jest/globals';
import {
  getIngredients,
  initialState as IngredientsSliceInitialState,
  IngredientsSliceReducer
} from './ingredientsSlice';

// Мокируем запрос ингредиентов

jest.mock('./../../../utils/burger-api', () => ({
  getIngredientsApi: jest.fn()
}));

const IngredientStub = {
  _id: '643d69a5c3f7b9001cfa0948',
  name: 'Кристаллы марсианских альфа-сахаридов',
  type: 'main',
  proteins: 234,
  fat: 432,
  carbohydrates: 111,
  calories: 189,
  price: 762,
  image: 'https://code.s3.yandex.net/react/code/core.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/core-large.png'
};

describe('работа ingredientsSlice', () => {
  test('при отправке запроса статус меняется на Loading', () => {
    const neededState = {
      ...IngredientsSliceInitialState,
      status: ERequestStatus.Loading,
      error: null
    };

    const action = { type: getIngredients.pending.type };

    const changedState = IngredientsSliceReducer(
      IngredientsSliceInitialState,
      action
    );
    expect(changedState).toEqual(neededState);
  });

  test('при успешном завершении запроса статус меняется на Success', () => {
    const neededState = {
      data: [IngredientStub],
      status: ERequestStatus.Success,
      error: null
    };
    const action = {
      type: getIngredients.fulfilled.type,
      payload: [IngredientStub]
    };
    const changedState = IngredientsSliceReducer(
      IngredientsSliceInitialState,
      action
    );
    expect(changedState).toEqual(neededState);
  });

  test('в случае ошибки запроса статус меняется на Failed', () => {
    const errorMessage = 'Ошибка при загрузке данных';

    const neededState = {
      ...IngredientsSliceInitialState,
      status: ERequestStatus.Failed,
      error: errorMessage
    };

    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };

    const changedState = IngredientsSliceReducer(
      IngredientsSliceInitialState,
      action
    );

    expect(changedState).toEqual(neededState);
  });
});
