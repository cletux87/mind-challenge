import React from 'react';
import { AdminProtector } from '../../core/AdminProtector';
import RequireAuthProtector from '../../core/RequireAuthProtector';
import { OwnUserProtector } from '../../core/OwnUserProtector';

interface Props {
  children: React.ReactElement;
  onlyAdmin?: boolean;
  ownUserOnly?: boolean;
}

const AuthPage = ({
  children,
  onlyAdmin = false,
  ownUserOnly = false,
}: Props) => {
  if (onlyAdmin) {
    return (
      <div>
        <RequireAuthProtector>
          <AdminProtector>{children}</AdminProtector>
        </RequireAuthProtector>
      </div>
    );
  }

  if (ownUserOnly) {
    return (
      <div>
        <RequireAuthProtector>
          <OwnUserProtector>{children}</OwnUserProtector>
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
