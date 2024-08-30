import { describe, test } from '@jest/globals';
import {
  addIngredient,
  initialState as BurgerConstructorSliceInitialState,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  BurgerConstructorReducer,
  TBurgerConstructorState
} from '../burgerConstructorSlice/burgerConstructorSlice';

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

const AnotherIngredientStub = {
  ...IngredientStub,
  _id: '643d69a5c3f7b9001cfa0949'
};

describe('Проверка работы BurgerConstructorSlice', () => {
  let state: TBurgerConstructorState;

  beforeEach(() => {
    // Сбрасываем состояние перед каждым тестом, снижаем связность тестов
    state = BurgerConstructorSliceInitialState;
  });

  test('Ингредиенты в конструкторе добавляются корректно', () => {
    const action = addIngredient(IngredientStub);
    state = BurgerConstructorReducer(state, action);
    expect(state.constructorItems.ingredients[0]).toMatchObject({
      ...IngredientStub,
      id: expect.any(String) // Проверка, что ID был присвоен с помощью nanoid
    });
  });

  test('Ингредиенты в конструкторе удаляются корректно', () => {
    const prepareAction = addIngredient(IngredientStub);
    state = BurgerConstructorReducer(state, prepareAction);

    const action = removeIngredient(state.constructorItems.ingredients[0].id);
    state = BurgerConstructorReducer(state, action);
    expect(state.constructorItems.ingredients).toEqual([]);
  }),
    describe('Изменение порядка ингредиентов в конструкторе работает корректно', () => {
      beforeEach(() => {
        state = BurgerConstructorReducer(state, addIngredient(IngredientStub));
        state = BurgerConstructorReducer(
          state,
          addIngredient(AnotherIngredientStub)
        );
      });

      test('Перемещение ингредиента вниз работает корректно', () => {
        // экшн перемещения ингредиента (перемещаем один ингредиент ниже, Index должен измениться с 0 на 1)

        const action = moveIngredientDown(
          state.constructorItems.ingredients[0]
        );
        state = BurgerConstructorReducer(state, action);
        expect(state.constructorItems.ingredients[1]._id).toEqual(
          IngredientStub._id
        );
        expect(state.constructorItems.ingredients[0]._id).toEqual(
          AnotherIngredientStub._id
        );
      });

      // сработал beforeEach, тест не связан с результатом предыдущего
      test('Перемещение ингредиента вверх работает корректно', () => {
        const action = moveIngredientUp(state.constructorItems.ingredients[1]);
        state = BurgerConstructorReducer(state, action);
        expect(state.constructorItems.ingredients[0]._id).toEqual(
          AnotherIngredientStub._id
        );
        expect(state.constructorItems.ingredients[1]._id).toEqual(
          IngredientStub._id
        );
      });
    });
});
