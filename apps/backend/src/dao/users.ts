import {
  mapEnglishLevel,
  mapRole,
  UserEntity,
  UserUpdateDTO,
} from '@mind-challenge4/share-types';
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
    },
  });
  return user;
};

export const updateUser = async ({
  id,
  email,
  firstName,
  lastName,
  phone,
  role,
  englishLevel,
  password,
}: UserUpdateDTO & { id: number }) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      fistName: firstName,
      lastName,
      phone,
      role: mapRole(role),
      englishLevel: mapEnglishLevel(englishLevel),
      ...(password ? { password } : {}),
    },
  });
  return user;
};
