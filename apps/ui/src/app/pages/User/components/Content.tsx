import React from 'react';
import { Box, Typography } from '@mui/material';
import { UserDTO } from '@mind-challenge4/share-types';
import { UserForm } from './UserForm';

interface Props {
  user?: UserDTO;
  isLoading?: boolean;
}

export const Content = ({ user, isLoading }: Props) => {
  const title = (() => {
    if (isLoading) {
      return '';
    }

    return !user ? 'Create User' : 'Edit User';
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
      <UserForm user={user} isLoading={isLoading} />
    </Box>
  );
};
