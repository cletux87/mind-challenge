import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React from 'react';

interface Props extends ButtonProps {
  children: React.ReactNode;
  loading: boolean;
}

export const SpinnerButton = ({ children, loading, ...rest }: Props) => {
  return (
    <Button {...rest}>
      {children}
      {loading && (
        <CircularProgress
          size={30}
          color="primary"
          style={{ position: 'absolute' }}
        />
      )}
    </Button>
  );
};
