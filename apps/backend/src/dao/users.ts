import { UserEntity } from '@mind-challenge4/share-types';
import prisma from '../db';

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const deleteUser = async (id: number) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      endDate: new Date(),
    },
  });
  return user;
};

export const createUser = async ({
  email,
  fistName,
  lastName,
  phone,
  role,
  englishLevel,
  password,
}: Omit<UserEntity, 'id' | 'startDate'>) => {
  const user = await prisma.user.create({
    data: {
      email,
      fistName,
      lastName,
      phone,
      role,
      englishLevel,
      password,
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  return user;
};
