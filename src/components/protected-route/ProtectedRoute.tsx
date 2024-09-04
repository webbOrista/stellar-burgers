import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store/store';
import { UserSelector } from '../../services/slices/userSlice/userSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();

  const user = useSelector(UserSelector.userDataSelector);
  const isAuthChecked = useSelector(UserSelector.isAuthCheckedSelector);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (user && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
