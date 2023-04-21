import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../app/pages/Login';
import NoMatch from '../app/pages/NoMatch';
import Dashboard from '../app/pages/Dashboard';
import AuthPage from '../app/components/AuthPage';
import { Users } from '../app/pages/Users';
import { User } from '../app/pages/User';
import { Accounts } from '../app/pages/Accounts';
import { Account } from '../app/pages/Account';
import { Team } from '../app/pages/Team';
import { Teams } from '../app/pages/Teams';
import { Logs } from '../app/pages/Logs';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="app">
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
        <Route path="users">
          <Route
            path=""
            element={
              <AuthPage onlyAdmin>
                <Users />
              </AuthPage>
            }
          />
        </Route>
        <Route path="user">
          <Route
            path=":id"
            element={
              <AuthPage onlyAdmin>
                <User />
              </AuthPage>
            }
          />
        </Route>
        <Route path="accounts">
          <Route
            path=""
            element={
              <AuthPage onlyAdmin>
                <Accounts />
              </AuthPage>
            }
          />
        </Route>
        <Route path="account">
          <Route
            path=":id"
            element={
              <AuthPage onlyAdmin>
                <Account />
              </AuthPage>
            }
          />
        </Route>
        <Route path="team">
          <Route
            path=":id"
            element={
              <AuthPage onlyAdmin>
                <Team />
              </AuthPage>
            }
          />
        </Route>
        <Route path="teams">
          <Route
            path=""
            element={
              <AuthPage onlyAdmin>
                <Teams />
              </AuthPage>
            }
          />
        </Route>
        <Route path="logs">
          <Route
            path=""
            element={
              <AuthPage onlyAdmin>
                <Logs />
              </AuthPage>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default Router;
