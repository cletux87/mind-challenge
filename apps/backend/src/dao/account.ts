import { AccountEntity } from '@mind-challenge4/share-types';
import prisma from '../db';

export const getAllAccounts = async () => {
  const accounts = await prisma.account.findMany();
  return accounts;
};

export const getAccount = async (id: number) => {
  const account = await prisma.account.findUnique({
    where: {
      id,
    },
  });
  return account;
};

export const deleteAccount = async (id: number) => {
  const account = await prisma.account.update({
    where: {
      id,
    },
    data: {
      disableDate: new Date(),
    },
  });
  return account;
};

export const createAccount = async ({
  name,
  clientName,
}: Omit<AccountEntity, 'id' | 'createdAt' | 'updatedAt'>) => {
  const account = await prisma.account.create({
    data: {
      name,
      clientName,
    },
  });
  return account;
};
