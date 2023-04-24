import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuthUserContext } from '../context/AuthUser';

interface Props {
  children: React.ReactElement;
}

export const OwnUserProtector = ({ children }: Props) => {
  const location = useLocation();
  const { id } = useParams();

  const { state } = useAuthUserContext();

  if (
    (state.user?.id == id && state.user?.role === 'USER') ||
    state.user?.role === 'ADMIN'
  ) {
    return children;
  }

  return <Navigate to="/app/dashboard/me" state={{ from: location }} replace />;
};
