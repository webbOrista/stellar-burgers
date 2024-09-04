import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getOrders,
  ordersSelector
} from '../../services/slices/orderSlice/orderSlice';
import { useDispatch, useSelector } from '../../services/store/store';

export const ProfileOrders: FC = () => {
  /** DONE: взять переменную из стора */
  const orders: TOrder[] = useSelector(ordersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
