import { orderBurgerApi } from '@api';
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  nanoid
} from '@reduxjs/toolkit';
import {
  ERequestStatus,
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '@utils-types';

export const submitOrder = createAsyncThunk(
  'burgerConstructor/submitOrder',
  (ingredients: string[]) => orderBurgerApi(ingredients)
);

type TBurgerConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  status: ERequestStatus;
};

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  status: ERequestStatus.Idle
};

export const BurgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload; // Если добавляется булка, меняем текущую на нее
        } else {
          state.constructorItems.ingredients.push(payload); // Если добавляется ингредиент, добавляем его к остальным
        }
      },
      // Присвоение ID ингридиенту перед добавлением в бургер, чтобы отличить от аналогичных ингридиентов
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    moveIngredientUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      if (currentIndex > 0) {
        state.constructorItems.ingredients[currentIndex] =
          state.constructorItems.ingredients[currentIndex - 1];
        state.constructorItems.ingredients[currentIndex - 1] = action.payload;
      }
    },
    // Методы для перемещения ингридиентов выше/ниже в бургере
    moveIngredientDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      if (currentIndex < state.constructorItems.ingredients.length - 1) {
        state.constructorItems.ingredients[currentIndex] =
          state.constructorItems.ingredients[currentIndex + 1];
        state.constructorItems.ingredients[currentIndex + 1] = action.payload;
      }
    },
    clearIngredients: (state) => {
      (state.constructorItems.bun = null),
        (state.constructorItems.ingredients = []);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(submitOrder.pending, (state) => {
      state.status = ERequestStatus.Loading;
    });
    builder.addCase(submitOrder.fulfilled, (state, action) => {
      state.status = ERequestStatus.Success;
      state.orderRequest = false;
      state.orderModalData = action.payload.order;
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    });
    builder.addCase(submitOrder.rejected, (state) => {
      state.status = ERequestStatus.Failed;
    });
  },

  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData,
    getOrderStatus: (state) => state.status,
    getBurgerConstructorState: (state) => state
  }
});

export const BurgerConstructorSelector = BurgerConstructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearIngredients
} = BurgerConstructorSlice.actions;
