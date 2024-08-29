import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store/store';
import { logoutUser } from '../../services/slices/userSlice/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  //DONE:добавить логаут и возврат на главную
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser()), navigate('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
