import { AccountsDTO } from '@mind-challenge4/share-types';
import React from 'react';

interface Props {
  accounts: AccountsDTO[];
  isLoading: boolean;
}

export const Content = ({ accounts, isLoading }: Props) => {
  console.log('accounts', accounts);
  return null;
};
