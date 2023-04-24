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

const adminNavigationItems: INavMenu[] = [
  {
    type: 'home',
    path: '/app/dashboard/me',
    match: ['/app/dashboard/:id'],
  },
  {
    type: 'calendar',
    path: '/app/accounts',
    match: ['/app/accounts'],
  },
  {
    type: 'team',
    path: '/app/users',
    match: ['/app/users', '/app/user/:id'],
  },
  {
    type: 'bookmarks',
    path: '/app/teams',
    match: ['/app/team/:id', '/app/teams'],
  },
  {
    type: 'documents',
    path: '/app/logs',
    match: ['/app/logs'],
  },
];

const getUserNavigationItems = (userId: string): INavMenu[] => [
  {
    type: 'home',
    path: '/app/dashboard/me',
    match: ['/app/dashboard/:id'],
  },
  {
    type: 'team',
    path: `/app/user/${userId}`,
    match: ['/app/user/:id'],
  },
];

interface Props {
  children: React.ReactNode;
}

export const AppPageLayout = ({ children }: Props) => {
  const { state, dispatch } = useAuthUserContext();
  const navigate = useNavigate();

  const items: TopBarMenuItems[] = useMemo(() => {
    return [
      {
        name: 'Logout',
        onClick: () => {
          window.localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
          dispatch({
            type: 'LOGOUT_USER.SUCCESS',
          });
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
        navigation={
          state.user?.role === 'USER'
            ? getUserNavigationItems(String(state.user.id))
            : adminNavigationItems
        }
      >
        <Box
          component="main"
          display="flex"
          flexDirection="column"
          height="100%"
          width="100%"
          sx={{ overflowY: 'scroll' }}
        >
          {children}
        </Box>
      </PageLayout>
    </Box>
  );
};
