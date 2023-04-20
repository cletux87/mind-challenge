import React from 'react';
import { Box } from '@mui/material';
import LogoIcon from '../../assets/Logo.png';

const mapSize = (type: LogoTypeSize) => {
  if (type === 'sm') {
    return { height: '30px', width: '33px' };
  }

  if (type === 'lg') {
    return { height: '60px', width: '66px' };
  }

  if (type === 'xlg') {
    return { height: '80px', width: '86px' };
  }

  if (type === 'xs') {
    return { height: '17px', width: '24px' };
  }

  return { height: '32px', width: '35px' };
};

export type LogoTypeSize = 'default' | 'sm' | 'lg' | 'xs' | 'xlg';

interface Props {
  size?: LogoTypeSize;
}

export const Logo = ({ size = 'default' }: Props) => {
  const mappedSize = mapSize(size);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        component="img"
        src={LogoIcon}
        alt="logo"
        sx={{
          height: mappedSize.height,
          width: mappedSize.width,
        }}
      />
    </Box>
  );
};
