import { configureStore } from '@reduxjs/toolkit';
import { IngredientsSlice } from './slices/ingredientsSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { BurgerConstructorSlice } from './slices/burgerConstructorSlice';
import { UserSlice } from './slices/userSlice';
import { OrderSlice } from './slices/orderSlice';
import { FeedSlice } from './slices/feedSlice';

const rootReducer = {
  [IngredientsSlice.name]: IngredientsSlice.reducer,
  [BurgerConstructorSlice.name]: BurgerConstructorSlice.reducer,
  [UserSlice.name]:UserSlice.reducer,
  [OrderSlice.name]:OrderSlice.reducer,
  [FeedSlice.name]:FeedSlice.reducer,
}; 

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
