import { TeamLogEntity } from '@mind-challenge4/share-types';
import {
  getAllTeamLogs,
  createTeamLog,
  getLogs as getLogsDao,
  getCountOfLogs,
} from '../dao/teamLog';

export const getAllLogs = async () => {
  const logs = await getAllTeamLogs();
  return logs;
};

export const getLogs = async ({
  personMoveId,
  teamMoveId,
  personDoingOperationId,
  page = 1,
  size = 1000,
}: {
  personMoveId?: number;
  teamMoveId?: number;
  personDoingOperationId?: number;
  page?: number;
  size?: number;
}) => {
  const logs = await getLogsDao({
    page,
    size,
    personDoingOperationId,
    personMoveId,
    teamMoveId,
  });
  const logsCount = await getCountOfLogs({
    page,
    size,
    personDoingOperationId,
    personMoveId,
    teamMoveId,
  });
  return { logs: [...logs], totalResults: logsCount };
};

export const insertLog = async ({
  teamMoveId,
  personMoveId,
  personDoingOperationId,
  movement,
  accountMove,
}: Pick<
  TeamLogEntity,
  | 'teamMoveId'
  | 'personMoveId'
  | 'personDoingOperationId'
  | 'movement'
  | 'accountMove'
>) => {
  const log = await createTeamLog({
    teamMoveId,
    personMoveId,
    personDoingOperationId,
    movement,
    accountMove,
  });
  return log;
};
