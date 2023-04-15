import {
  getUser as getDaoUser,
  getAllUsers as getAllDaoUsers,
  deleteUser as deleteDaoUser,
  createUser as createDaoUser,
} from '../dao/users';
import {
  EnglishLevel,
  Role,
  UserDTO,
  UserRegisterDTO,
} from '@mind-challenge4/share-types';
import { hashPassword } from '../modules/auth';

const transformDaoUserToDtoUser = (daoUser): UserDTO => {
  return {
    email: daoUser.email,
    firstName: daoUser.fistName,
    lastName: daoUser.lastName,
    phone: daoUser.phone,
    englishLevel: daoUser.englishLevel,
    startDate: daoUser.startDate,
    endDate: daoUser.endDate,
  };
};

export const getUser = async (id: number) => {
  const user = await getDaoUser(id);
  return transformDaoUserToDtoUser(user);
};

export const getAllUsers = async () => {
  const users = await getAllDaoUsers();
  return users.map((user) => transformDaoUserToDtoUser(user));
};

export const deleteUser = async (id: number) => {
  const user = await deleteDaoUser(id);
  return transformDaoUserToDtoUser(user);
};

const mapEnglishLevel = (value: string) => {
  const lowerCaseValue = value.toLowerCase();
  switch (lowerCaseValue) {
    case 'none':
      return EnglishLevel.NONE;
    case 'basic':
      return EnglishLevel.BASIC;
    case 'intermediate':
      return EnglishLevel.INTERMEDIATE;
    case 'advanced':
      return EnglishLevel.ADVANCED;
    default:
      return EnglishLevel.NONE;
  }
};

const mapRole = (value: string) => {
  const lowerCaseValue = value.toLowerCase();
  switch (lowerCaseValue) {
    case 'user':
      return Role.USER;
    case 'admin':
      return Role.ADMIN;
    default:
      return Role.USER;
  }
};

export const createUser = async ({
  email,
  firstName,
  lastName,
  phone,
  role,
  englishLevel,
  password,
}: UserRegisterDTO) => {
  const newPassword = await hashPassword(password);
  const user = await createDaoUser({
    email,
    fistName: firstName,
    lastName,
    phone,
    role: mapRole(role),
    englishLevel: mapEnglishLevel(englishLevel),
    password: newPassword,
  });
  return transformDaoUserToDtoUser(user);
};
