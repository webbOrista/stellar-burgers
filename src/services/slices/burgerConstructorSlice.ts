


import { orderBurgerApi } from '@api';
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  nanoid
} from '@reduxjs/toolkit';
import { ERequestStatus, TConstructorIngredient, TOrder } from '@utils-types';


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
      prepare: (ingredient: TConstructorIngredient) => {
        const ingredientId = nanoid();
        return { payload: { ...ingredient, ingredientId } };
      }
    },
    removeIngredient: (state, { payload }: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(payload, 1);
    },
     // Перемещение ингридиента выше/ниже в бургере
    moveIngredient: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const movedIngredients = [...state.constructorItems.ingredients];

      movedIngredients.splice(to, 0, movedIngredients.splice(from, 1)[0]);
      state.constructorItems.ingredients = movedIngredients;
    },
    clearIngredients: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    },
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
    getOrderStatus:(state)=>state.status,
  }
});

export const BurgerConstructorSelector = BurgerConstructorSlice.selectors;
export const BurgerConstructorActions = BurgerConstructorSlice.actions;
