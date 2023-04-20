import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../app/pages/Login';
import NoMatch from '../app/pages/NoMatch';
import Dashboard from '../app/pages/Dashboard';
import AuthPage from '../app/components/AuthPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app">
        <Route path="dashboard">
          <Route
            path=":id"
            element={
              <AuthPage>
                <Dashboard />
              </AuthPage>
            }
          />
        </Route>
      </Route>
      <Route path="/test" element={<Dashboard />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default Router;
