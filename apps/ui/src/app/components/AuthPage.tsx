import React from 'react';
import { AdminProtector } from '../../core/AdminProtector';
import RequireAuthProtector from '../../core/RequireAuthProtector';

interface Props {
  children: React.ReactElement;
  onlyAdmin?: boolean;
}

const AuthPage = ({ children, onlyAdmin = false }: Props) => {
  if (onlyAdmin) {
    return (
      <div>
        <RequireAuthProtector>
          <AdminProtector>{children}</AdminProtector>
        </RequireAuthProtector>
      </div>
    );
  }

  return (
    <div>
      <RequireAuthProtector>{children}</RequireAuthProtector>
    </div>
  );
};

export default AuthPage;
