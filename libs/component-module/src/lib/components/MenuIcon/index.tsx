import React from 'react';
import { Box, Theme, useTheme, ButtonBase } from '@mui/material';
import { ReactComponent as HomeIconComp } from '../../assets/HomeIcon.svg';
import { ReactComponent as CalendarIconComp } from '../../assets/CalendarIcon.svg';
import { ReactComponent as TeamIconComp } from '../../assets/TeamIcon.svg';
import { ReactComponent as DocumentsIconComp } from '../../assets/DocumentsIcon.svg';
import { ReactComponent as BookmarksIconComp } from '../../assets/BookmarksIcon.svg';

export type MenuIconTypeSize = 'default' | 'sm' | 'lg';
export type MenuIconTypes =
  | 'home'
  | 'calendar'
  | 'team'
  | 'documents'
  | 'bookmarks';

const getIconData = (type: MenuIconTypes, theme: Theme) => {
  if (type === 'home') {
    return {
      Component: <HomeIconComp />,
      fill: 'none',
      stroke: theme.palette.primary.main,
      activeFill: 'none',
      activeStroke: theme.palette.primary.main,
      height: '18px',
      width: '19px',
    };
  }

  if (type === 'calendar') {
    return {
      Component: <CalendarIconComp />,
      fill: 'none',
      stroke: theme.palette.grey[300],
      activeFill: 'none',
      activeStroke: theme.palette.primary.main,
      height: '24px',
      width: '25px',
    };
  }

  if (type === 'team') {
    return {
      Component: <TeamIconComp />,
      fill: 'none',
      stroke: theme.palette.grey[300],
      activeFill: 'none',
      activeStroke: theme.palette.primary.main,
      height: '24px',
      width: '25px',
    };
  }

  if (type === 'documents') {
    return {
      Component: <DocumentsIconComp />,
      fill: 'none',
      stroke: theme.palette.grey[300],
      activeFill: 'none',
      activeStroke: theme.palette.primary.main,
      height: '24px',
      width: '25px',
    };
  }

  if (type === 'bookmarks') {
    return {
      Component: <BookmarksIconComp />,
      fill: 'none',
      stroke: theme.palette.grey[300],
      activeFill: 'none',
      activeStroke: theme.palette.primary.main,
      height: '24px',
      width: '25px',
    };
  }

  return {
    Component: <HomeIconComp />,
    fill: 'none',
    stroke: theme.palette.common.black,
    activeFill: 'none',
    activeStroke: theme.palette.primary.main,
    height: '19px',
    width: '18px',
  };
};

interface Props {
  size?: MenuIconTypeSize;
  isActive?: boolean;
  type: MenuIconTypes;
  onClick?: () => void;
}

const MenuIcon = ({
  size = 'default',
  isActive = false,
  type,
  onClick,
}: Props) => {
  const theme = useTheme();
  const iconData = getIconData(type, theme);

  return (
    <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={onClick}>
      <ButtonBase>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={{ xs: '40px' }}
          width={{ xs: '40px' }}
          sx={(theme) => ({
            background: isActive
              ? theme.palette.grey[200]
              : theme.palette.common.white,
            borderRadius: theme.spacing(1),
            '&:hover': {
              background: isActive
                ? theme.palette.grey[400]
                : theme.palette.grey[500],
            },
            '&:hover > div path': {
              // update stroke of icon on button hover
              stroke: iconData.activeStroke,
            },
          })}
        >
          <Box
            sx={{
              height: iconData.height,
              width: iconData.width,
              '& path': {
                fill: isActive ? iconData.activeFill : iconData.fill,
                stroke: isActive ? iconData.activeStroke : iconData.stroke,
              },
            }}
          >
            {iconData.Component}
          </Box>
        </Box>
      </ButtonBase>
    </Box>
  );
};

export default MenuIcon;
