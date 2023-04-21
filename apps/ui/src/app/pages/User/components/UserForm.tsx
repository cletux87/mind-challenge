import React from 'react';
import { Box } from '@mui/material';
import { UserDTO } from '@mind-challenge4/share-types';
import { UserCard } from '../../../components/UserCard';

interface Props {
  user?: UserDTO;
  isLoading?: boolean;
}

export const UserForm = ({ user, isLoading }: Props) => {
  let isNewUser = true;
  if (user) {
    isNewUser = false;
  }
  return (
    <Box>
      <UserCard userDto={user} useExtendedCard isNewUser={isNewUser} />
    </Box>
  );
};
