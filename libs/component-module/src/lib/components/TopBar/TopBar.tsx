import React, { useState } from 'react';
import { Logo } from '../Logo';
import { LetterAvatar } from '../LetterAvatar';
import { Box, useTheme, Menu, MenuItem } from '@mui/material';

export interface TopBarMenuItems {
  name: string;
  onClick: () => void;
}

interface Props {
  onClickIcon?: () => void;
  userFirstName: string;
  userLastName?: string;
  menuItems?: TopBarMenuItems[];
  navigationChild?: React.ReactNode;
}

export const TopBar = ({
  onClickIcon,
  userFirstName,
  userLastName,
  menuItems,
  navigationChild,
}: Props) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (menuItems) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const safeMenuItems: TopBarMenuItems[] = menuItems ? menuItems : [];

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: { md: 'column', xs: 'row' },
        width: { md: '64px', xs: '100%' },
        height: { md: '100%', xs: '64px' },
        justifyContent: 'space-between',
        alignItems: 'center',
        background: theme.palette.primary.main,
        p: '12px 19px',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
      })}
    >
      <Box
        display="flex"
        alignItems="center"
        onClick={onClickIcon}
        sx={{ flexDirection: { md: 'column', sm: 'row' } }}
      >
        <Logo />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'column', sm: 'row' },
          }}
        >
          {navigationChild}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gap: '8px',
        }}
      >
        <Menu
          id="avatar-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {safeMenuItems.map((item) => (
            <MenuItem
              key={`${item.name}`}
              onClick={() => {
                item.onClick();
                handleCloseMenu();
              }}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
        <LetterAvatar
          firstName={userFirstName}
          lastName={userLastName}
          color={theme.palette.warning.light}
          onClick={handleClickMenu}
        />
      </Box>
    </Box>
  );
};
