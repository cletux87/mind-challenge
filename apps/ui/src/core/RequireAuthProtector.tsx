import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthUserContext } from '../context/AuthUser';
import { JWT_LOCAL_STORAGE_KEY } from '../constants/auth';
import { decodeJWT } from '../services/user';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

interface Props {
  children: React.ReactElement;
}

const RequireAuthProtector = ({ children }: Props) => {
  const location = useLocation();
  const [jwt] = useLocalStorageState(
    JWT_LOCAL_STORAGE_KEY,
    window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY),
    true
  );
  const { state, dispatch } = useAuthUserContext();
  const { user, isAuth } = state;

  useEffect(() => {
    if (jwt) {
      const loginUser = decodeJWT(jwt);
      if (loginUser && (!user?.id || !isAuth)) {
        dispatch({
          type: 'SET_USERNAME.SUCCESS',
          payload: {
            email: loginUser.email,
            role: loginUser.role,
            id: loginUser.id,
          },
        });
      }
    }
  }, [dispatch, isAuth, jwt, user?.id]);

  if (user?.id && isAuth) {
    return children;
  }

  if (!jwt) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (jwt) {
    const loginUser = decodeJWT(jwt);
    if (loginUser) {
      return children;
    }
  }

  // Token Expired
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuthProtector;
