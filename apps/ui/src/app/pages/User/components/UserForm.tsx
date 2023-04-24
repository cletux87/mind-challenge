import React from 'react';
import { Box } from '@mui/material';
import { UserDTO } from '@mind-challenge4/share-types';
import { UserCard } from '../../../components/UserCard';

interface Props {
  user?: UserDTO;
  isLoading?: boolean;
  forceRefetch?: () => void;
}

export const UserForm = ({ user, isLoading, forceRefetch }: Props) => {
  let isNewUser = true;
  if (user) {
    isNewUser = false;
  }
  return (
    <Box>
      <UserCard
        userDto={user}
        useExtendedCard
        isNewUser={isNewUser}
        forceRefetch={forceRefetch}
      />
    </Box>
  );
};
