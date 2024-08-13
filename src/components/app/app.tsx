/* eslint-disable*/

import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';




import { Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import {Routes, Route, useLocation, useNavigate, useMatch} from 'react-router-dom'

import {IngredientDetails, Modal, OrderInfo, } from '@components';

import {ProtectedRoute} from '../../components/protected-route/ProtectedRoute'

import { useDispatch } from '../../services/store'; 
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { getUser } from '../../services/slices/userSlice';







const App = () => {

const navigate = useNavigate();
const location = useLocation();
const backgroundLocation = location.state?.backgroundLocation;
const closeModal = () => {  navigate(-1)};
  const dispatch = useDispatch();

  // Задаем переменные для вывода номера заказа в модалках подробностей заказа. Выводим в абзац перед основной информацией
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch||feedMatch;

useEffect(() => {
  dispatch(getIngredients());
  dispatch(getUser());
},[dispatch]);





  return (
    <div className={styles.app}>
      <AppHeader /> 
        <Routes location={backgroundLocation || location}> 
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<ProtectedRoute><Login /></ProtectedRoute>} />
          <Route path='/register' element={<ProtectedRoute><Register /></ProtectedRoute>} />
          <Route path='/forgot-password' element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
          <Route path='/reset-password' element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/profile/orders' element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
          <Route path='*' element={<NotFound404 />} />
          </Routes>
  
          {backgroundLocation && (
        <Routes>
          <Route path='/feed/:number' element={<Modal title='' onClose={closeModal}><p className={`text text_type_digits-default ${styles.detailHeader}`}>#{orderNumber&&orderNumber.padStart(6,'0')}</p><OrderInfo /></Modal>} />
          <Route path='/profile/orders/:number' element={<ProtectedRoute><Modal title='' onClose={closeModal}><p className={`text text_type_digits-default ${styles.detailHeader}`}>#{orderNumber&&orderNumber.padStart(6,'0')}</p><OrderInfo /></Modal></ProtectedRoute>} />
          <Route path='/ingredients/:id' element={<Modal title='' onClose={closeModal}><IngredientDetails /></Modal>} />
          
        </Routes>)}
    </div>
    );

};

export default App;



