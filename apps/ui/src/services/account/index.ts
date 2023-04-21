import { AccountRegisterDTO } from '@mind-challenge4/share-types';
import { client } from '../index';

export const updateAccount = ({
  accountId,
  accountUpdates,
}: {
  accountId: string;
  accountUpdates: AccountRegisterDTO;
}) => {
  return client.put<AccountRegisterDTO>(`/api/account/${accountId}`, {
    ...accountUpdates,
  });
};

export const createAccount = ({
  accountCreate,
}: {
  accountCreate: AccountRegisterDTO;
}) => {
  return client.post<{ data: AccountRegisterDTO & { id: string } }>(
    '/api/account',
    {
      ...accountCreate,
    }
  );
};
