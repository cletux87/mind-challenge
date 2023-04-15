import { TeamRegisterDTO } from '@mind-challenge4/share-types';
import {
  createTeam as createTeamDao,
  getTeam as getTeamDao,
  getAllTeams as getTeamsDao,
} from '../dao/team';

export const getTeam = async (id: number) => {
  const team = await getTeamDao(id);
  return team;
};

export const getAllTeams = async () => {
  const teams = getTeamsDao();
  return teams;
};

export const createTeam = async ({ teamName, accountId }: TeamRegisterDTO) => {
  const team = createTeamDao({
    teamName,
    accountId,
  });
  return team;
};
