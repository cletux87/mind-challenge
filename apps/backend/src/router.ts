import { Router } from 'express';
import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  updateUserToTeam,
} from './handlers/user';
import {
  getAccount,
  createAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
} from './handlers/account';
import {
  createTeam,
  getTeam,
  getTeams,
  deleteTeam,
  getAccountTeams,
} from './handlers/team';
import { changeIdToMe, isAdminUser } from './middleware/users';
import {
  validateCreateUserSchema,
  validateGetUserSchema,
  validateSearchUserQueryParams,
} from './middleware/validators/user';
import {
  validateAccountCreateSchema,
  validateGetTeamSchema,
} from './middleware/validators/account';
import {
  validateActiveSchema,
  validateGetIdIsNumber,
} from './middleware/validators/common';
import {
  validateAddTeamMemberSchema,
  validateTeamCreateSchema,
} from './middleware/validators/team';
import {
  getAllLogs,
  getLogs,
  getMyLogs,
  getTeamLogs,
} from './handlers/teamLog';

const router = Router();

/**
 * User
 */
router.get('/me', changeIdToMe, getUser);
router.post('/user', isAdminUser, validateCreateUserSchema, createUser);
router.get('/users', isAdminUser, validateSearchUserQueryParams, getUsers);
router.get('/user/:id', isAdminUser, validateGetUserSchema, getUser);
router.patch(
  '/user/:id',
  isAdminUser,
  validateActiveSchema,
  validateGetUserSchema,
  deleteUser
);
router.put('/user/:id', isAdminUser, updateUser);

/**
 * Account
 */
router.post(
  '/account',
  isAdminUser,
  validateAccountCreateSchema,
  createAccount
);
router.get('/accounts', isAdminUser, getAccounts);
router.get('/account/:id', isAdminUser, validateGetIdIsNumber, getAccount);
router.delete(
  '/account/:id',
  isAdminUser,
  validateGetIdIsNumber,
  deleteAccount
);
router.put('/account/:id', isAdminUser, validateGetIdIsNumber, updateAccount);
router.get(
  '/account/teams/:id',
  isAdminUser,
  validateGetIdIsNumber,
  validateGetTeamSchema,
  getAccountTeams
);

/**
 * Team
 */
router.post('/team', isAdminUser, validateTeamCreateSchema, createTeam);
router.get('/teams', isAdminUser, getTeams);
router.get('/team/:id', isAdminUser, validateGetIdIsNumber, getTeam);
router.delete('/team/:id', isAdminUser, validateGetIdIsNumber, deleteTeam);
router.put('/team/:id', isAdminUser, validateGetIdIsNumber, updateAccount);
router.post(
  '/team/changeMember',
  isAdminUser,
  validateAddTeamMemberSchema,
  updateUserToTeam
);

/**
 * Logs
 */
router.get('/logs', isAdminUser, getAllLogs);
router.get('/mylogs', getMyLogs);
router.get('/logs/user/:id', isAdminUser, getLogs);
router.get('/logs/team/:id', isAdminUser, getTeamLogs);

export default router;
