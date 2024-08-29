import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store/store';
import {
  feedOrdersSelector,
  getFeed
} from '../../services/slices/feedSlice/feedSlice';

export const Feed: FC = () => {
  /** DONE: взять переменную из стора */

  const orders: TOrder[] = useSelector(feedOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />;
};
