import {
  getUser as getDaoUser,
  getAllUsers as getAllDaoUsers,
  deleteUser as deleteDaoUser,
  createUser as createDaoUser,
  updateUser as updateDaoUser,
} from '../dao/users';
import {
  mapEnglishLevel,
  mapRole,
  UserDTO,
  UserRegisterDTO,
  UserUpdateDTO,
} from '@mind-challenge4/share-types';
import { hashPassword } from '../modules/auth';
import { insertLog } from './logs';

const transformDaoUserToDtoUser = (daoUser): UserDTO => {
  return {
    email: daoUser.email,
    firstName: daoUser.fistName,
    lastName: daoUser.lastName,
    phone: daoUser.phone,
    englishLevel: daoUser.englishLevel,
    startDate: daoUser.startDate,
    endDate: daoUser.endDate,
    role: daoUser.role,
    id: daoUser.id,
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

export const createUser = async ({
  email,
  firstName,
  lastName,
  phone,
  role,
  englishLevel,
  password,
  contextReq,
}: UserRegisterDTO & { contextReq: any }) => {
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
  const log = await insertLog({
    teamMoveId: undefined,
    personMoveId: user.id,
    personDoingOperationId: parseInt(contextReq.user.id),
    movement: `${contextReq.user.id} ${contextReq.user.email} => create  person => ${user.id} ${user.email}`,
  });
  return transformDaoUserToDtoUser(user);
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
  const user = await updateDaoUser({
    id,
    email,
    firstName,
    lastName,
    phone,
    role,
    englishLevel,
    password,
  });
  return user;
};
