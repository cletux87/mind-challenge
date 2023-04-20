import React from 'react';
import RequireAuthProtector from '../../core/RequireAuthProtector';

interface Props {
  children: React.ReactElement;
}

const AuthPage = ({ children }: Props) => {
  return (
    <div>
      <RequireAuthProtector>{children}</RequireAuthProtector>
    </div>
  );
};

export default AuthPage;
