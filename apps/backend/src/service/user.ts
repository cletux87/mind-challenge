import {
  getUser as getDaoUser,
  getAllUsers as getAllDaoUsers,
  deleteUser as deleteDaoUser,
  createUser as createDaoUser,
  updateUser as updateDaoUser,
  changeTeam as changeTeamDao,
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
    skills: daoUser.skills,
    cvLink: daoUser.cvLink,
  };
};

export const getUser = async (id: number) => {
  const user = await getDaoUser(id);
  return transformDaoUserToDtoUser(user);
};

export const getAllUsers = async ({
  userName,
  teamId,
}: {
  userName?: string;
  teamId?: number | null;
}) => {
  const users = await getAllDaoUsers({ userName, teamId });
  return users.map((user) => transformDaoUserToDtoUser(user));
};

export const deleteUser = async (
  id: number,
  isActive: boolean,
  contextReq: any
) => {
  const user = await deleteDaoUser(id, isActive);
  const log = await insertLog({
    teamMoveId: undefined,
    personMoveId: user.id,
    personDoingOperationId: parseInt(contextReq.user.id),
    movement: `${contextReq.user.id} ${contextReq.user.email} => ${
      isActive ? 'activate' : 'deactivate'
    } person => ${user.id} ${user.email}`,
    accountMove: undefined,
  });
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
  cvLink,
  skills,
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
    skills,
    cvLink,
  });
  const log = await insertLog({
    teamMoveId: undefined,
    personMoveId: user.id,
    personDoingOperationId: parseInt(contextReq.user.id),
    movement: `${contextReq.user.id} ${contextReq.user.email} => create  person => ${user.id} ${user.email}`,
    accountMove: undefined,
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
  cvLink,
  skills,
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
    cvLink,
    skills,
  });
  return user;
};

export const changeTeam = async ({
  teamId,
  userId,
  contextReq,
}: {
  teamId: number | null;
  userId: number;
  contextReq: any;
}) => {
  const oldUseData = await await getDaoUser(userId);
  const user = await changeTeamDao({ userId, teamId });
  const log = await insertLog({
    teamMoveId: teamId ? teamId : oldUseData.teamId,
    personMoveId: userId,
    personDoingOperationId: parseInt(contextReq.user.id),
    movement: `${contextReq.user.id} ${contextReq.user.email} => ${
      teamId ? `Assign to Team ${teamId}` : 'Remove from team'
    } => user ${userId} ${user.email}`,
    accountMove: undefined,
  });
  return user;
};
