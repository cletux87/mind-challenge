import React from 'react';
import { Box } from '@mui/material';
import { Logo } from '../Logo';

export const Spinner = () => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
      >
        <Box position="absolute" sx={{ height: '100%', width: '100%' }}>
          <Box
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            display="flex"
            sx={{ height: '100%' }}
          >
            <Box
              sx={{
                animation: 'flip 2s infinite',
                '@keyframes flip': {
                  '0%': {
                    transform: 'rotateY(360deg)',
                  },
                  '80%': {
                    transform: 'rotateY(0deg)',
                  },
                },
              }}
            >
              <Logo size="xlg" />
            </Box>
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            height: '200px',
            width: '200px',
            border: `8px solid ${theme.palette.primary.main}`,
            borderBottomColor: 'transparent',
            borderRadius: '50%',
            boxSizing: 'border-box',
            animation: 'rotation 1s linear infinite',
            '@keyframes rotation': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
          })}
        />
      </Box>
    </Box>
  );
};
