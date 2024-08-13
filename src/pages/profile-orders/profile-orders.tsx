import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { ordersSelector } from '../../services/slices/orderSlice';
import { useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** DONE: взять переменную из стора */
  const orders: TOrder[] = useSelector(ordersSelector);

  return <ProfileOrdersUI orders={orders} />;
};
