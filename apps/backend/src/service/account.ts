import { AccountRegisterDTO } from '@mind-challenge4/share-types';
import {
  getAccount as getAccountDao,
  getAllAccounts as getAccountsDao,
  createAccount as createAccountDao,
  updateAccount as updateAccountDao,
} from '../dao/account';

export const getAccount = async (id: number) => {
  const account = await getAccountDao(id);
  return account;
};

export const getAccounts = async () => {
  const accounts = await getAccountsDao();
  return accounts;
};

export const createAccount = async ({
  name,
  clientName,
}: AccountRegisterDTO) => {
  const account = await createAccountDao({ name, clientName });
  return account;
};

export const updateAccount = async ({
  id,
  name,
  clientName,
}: AccountRegisterDTO & { id: number }) => {
  return await updateAccountDao({ id, name, clientName });
};
