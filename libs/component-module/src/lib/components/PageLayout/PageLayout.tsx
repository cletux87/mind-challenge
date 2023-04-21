import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { TopBar, TopBarMenuItems } from '../TopBar/TopBar';
import MenuIcon, { MenuIconTypes } from '../MenuIcon';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';

export interface INavMenu {
  type: MenuIconTypes;
  path: string;
  onClick?: () => void;
  match: string[];
}

interface Props {
  children?: React.ReactNode;
  avatarMenuItems?: TopBarMenuItems[];
  avatarFirstName: string;
  avatarLastName?: string;
  navigation?: INavMenu[];
}

export const PageLayout = ({
  children,
  avatarMenuItems,
  avatarFirstName,
  avatarLastName,
  navigation = [],
}: Props) => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(-1);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isAnyMatching = false;
    navigation.forEach((navItem, index) => {
      const match = navItem.match.some((path) => {
        return matchPath(path, location.pathname);
      });
      if (match) {
        isAnyMatching = true;
        setSelectedMenuIndex(index);
      }
    });
    if (!isAnyMatching) {
      setSelectedMenuIndex(-1);
    }
  }, [location.pathname, navigation]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: '100%',
        width: '100%',
      }}
    >
      <TopBar
        menuItems={avatarMenuItems}
        userFirstName={avatarFirstName}
        userLastName={avatarLastName}
        navigationChild={navigation.map((navItem, index) => (
          <Box
            key={`${navItem.type}-${navItem.path}`}
            sx={{
              marginTop: { xs: 0, md: 4 },
              marginRight: { xs: 4, md: 0 },
              p: 0,
            }}
            onClick={() => navigate(navItem.path)}
          >
            <MenuIcon
              type={navItem.type}
              onClick={navItem.onClick}
              isActive={index === selectedMenuIndex}
            />
          </Box>
        ))}
      />
      <Box
        sx={{
          height: { xs: '64px', md: '100%' },
          width: { xs: '100%', md: 'calc(100% - 64px)' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
