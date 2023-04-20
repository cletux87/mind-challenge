import React from 'react';
import { AuthUserProvider } from '../context/AuthUser';
import { ThemeProvider } from '@mind-challenge4/component-module';
import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthUserProvider>{children}</AuthUserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Providers;
