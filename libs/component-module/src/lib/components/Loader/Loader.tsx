import React from 'react';
import { Box } from '@mui/material';
import { Logo } from '../Logo';

const getCommonCssAttributes = ({ delay }: { delay: string }) =>
  ({
    animation: `load 1.5s infinite`,
    animationDelay: `${delay}`,
    marginRight: '15px',
    '@keyframes load': {
      '0%': {
        opacity: '0',
      },
      '50%': {
        opacity: '0',
      },
      '100%': {
        opacity: '1',
      },
    },
  } as React.CSSProperties);

export const Loader = () => {
  return (
    <Box
      sx={{ height: '100%', width: '100%' }}
      display="flex"
      justifyContent="center"
    >
      <Box display="flex">
        <Box sx={getCommonCssAttributes({ delay: '0.1s' })}>
          <Logo />
        </Box>
        <Box sx={getCommonCssAttributes({ delay: '0.3s' })}>
          <Logo />
        </Box>
        <Box sx={getCommonCssAttributes({ delay: '0.5s' })}>
          <Logo />
        </Box>
      </Box>
    </Box>
  );
};
