import React from 'react';
import { Box, Typography } from '@mui/material';
import { AccountsDTO } from '@mind-challenge4/share-types';
import { UserForm } from './AccountForm';

interface Props {
  account?: AccountsDTO;
  isLoading?: boolean;
}

export const Content = ({ account, isLoading }: Props) => {
  const title = (() => {
    if (isLoading) {
      return '';
    }

    return !account ? 'Create Account' : 'Edit Account';
  })();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="20px"
      sx={(theme) => ({ padding: theme.spacing(2) })}
    >
      <Box>
        <Typography component="h2" sx={{ fontSize: '1.4rem' }}>
          {title}
        </Typography>
      </Box>
      <UserForm account={account} isLoading={isLoading} />
    </Box>
  );
};
