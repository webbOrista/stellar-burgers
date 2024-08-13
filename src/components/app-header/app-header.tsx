import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { UserSelector } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(UserSelector.userDataSelector);
  return <AppHeaderUI userName={user ? `${user?.name}` : ''} />;
};
