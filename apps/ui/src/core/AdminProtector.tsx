import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthUserContext } from '../context/AuthUser';

interface Props {
  children: React.ReactElement;
}

export const AdminProtector = ({ children }: Props) => {
  const location = useLocation();

  const { state } = useAuthUserContext();

  if (state.user?.role === 'ADMIN') {
    return children;
  }

  return <Navigate to="/app/dashboard/me" state={{ from: location }} replace />;
};
