import React from 'react';
import { Box } from '@mui/material';
import { AccountsDTO } from '@mind-challenge4/share-types';
import { AccountCard } from '../../../components/AccountCard';

interface Props {
  account?: AccountsDTO;
  isLoading?: boolean;
}

export const UserForm = ({ account, isLoading }: Props) => {
  let isNewAccount = true;
  if (account) {
    isNewAccount = false;
  }
  return (
    <Box>
      <AccountCard
        accountDto={account}
        useExtendedCard
        isNewAccount={isNewAccount}
      />
    </Box>
  );
};
