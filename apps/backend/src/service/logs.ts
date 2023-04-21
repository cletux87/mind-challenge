import { TeamLogEntity } from '@mind-challenge4/share-types';
import { getAllTeamLogs, createTeamLog } from '../dao/teamLog';

export const getAllLogs = async () => {
  const logs = await getAllTeamLogs();
  return logs;
};

export const insertLog = async ({
  teamMoveId,
  personMoveId,
  personDoingOperationId,
  movement,
}: Pick<
  TeamLogEntity,
  'teamMoveId' | 'personMoveId' | 'personDoingOperationId' | 'movement'
>) => {
  const log = await createTeamLog({
    teamMoveId,
    personMoveId,
    personDoingOperationId,
    movement,
  });
  return log;
};
