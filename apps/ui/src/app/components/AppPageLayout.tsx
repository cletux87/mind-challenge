import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import {
  PageLayout,
  TopBarMenuItems,
  INavMenu,
} from '@mind-challenge4/component-module';
import { JWT_LOCAL_STORAGE_KEY } from '../../constants/auth';
import { useAuthUserContext } from '../../context/AuthUser';
import { useNavigate } from 'react-router-dom';

const navigationItems: INavMenu[] = [
  {
    type: 'home',
    path: '/app/dashboard/me',
    match: ['/app/dashboard/:id'],
  },
  {
    type: 'calendar',
    // @TODO update path once page exists
    path: '/iframe.html',
    match: [],
  },
  {
    type: 'team',
    // @TODO update path once page exists
    path: '/app/users',
    match: ['/app/users', '/app/user/:id'],
  },
  {
    type: 'documents',
    // @TODO update path once page exists
    path: '/iframe.html',
    match: [],
  },
  {
    type: 'bookmarks',
    // @TODO update path once page exists
    path: '/iframe.html',
    match: [],
  },
];

interface Props {
  children: React.ReactNode;
}

export const AppPageLayout = ({ children }: Props) => {
  const { dispatch } = useAuthUserContext();
  const navigate = useNavigate();

  const items: TopBarMenuItems[] = useMemo(() => {
    return [
      {
        name: 'Logout',
        onClick: () => {
          // remove jwt from localS torage
          window.localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);

          // clear auth state
          dispatch({
            type: 'LOGOUT_USER.SUCCESS',
          });

          // return to login
          navigate('/login');
        },
      },
    ];
  }, [dispatch, navigate]);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        zIndex: 0,
      }}
    >
      <PageLayout
        avatarMenuItems={items}
        avatarFirstName="T"
        navigation={navigationItems}
      >
        {children}
      </PageLayout>
    </Box>
  );
};
