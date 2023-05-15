/* eslint-disable react/prop-types */
import {   Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../recoil/userAtom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {isAuth} = useRecoilValue(userAtom)
  if(!isAuth) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;