import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store/store';
import {
  clearIngredients,
  getConstructorItems
} from '../../services/slices/burgerConstructorSlice/burgerConstructorSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserSelector } from '../../services/slices/userSlice/userSlice';
import {
  clearOrder,
  orderDataSelector,
  orderRequestSelector,
  submitOrder
} from '../../services/slices/orderSlice/orderSlice';

export const BurgerConstructor: FC = () => {
  const orderRequest = useSelector(orderRequestSelector);
  const orderModalData = useSelector(orderDataSelector);
  const constructorItems = useSelector(getConstructorItems);
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(UserSelector.isAuthenticatedSelector);
  const user = useSelector(UserSelector.userDataSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(clearOrder());
    }
  }, []);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user && !isAuthenticated) {
      return navigate('/login');
    }
    const ingredients = constructorItems.ingredients.map((item) => item._id);
    dispatch(
      submitOrder([
        constructorItems.bun._id,
        ...ingredients,
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
