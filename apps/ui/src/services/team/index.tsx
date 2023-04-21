import { TeamDTO, TeamRegisterDTO } from '@mind-challenge4/share-types';
import { client } from '../index';

export const updateTeam = ({ teamName, accountId }: TeamRegisterDTO) => {
  return client.put<TeamDTO>(`/api/team/${accountId}`, {
    teamName,
    accountId,
  });
};

export const createTeam = ({ teamName, accountId }: TeamRegisterDTO) => {
  return client.post<{ data: TeamDTO }>('/api/team', {
    teamName,
    accountId,
  });
};
