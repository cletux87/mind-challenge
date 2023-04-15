import { TeamLogEntity } from '@mind-challenge4/share-types';
import prisma from '../db';

export const getAllTeamLogs = async () => {
  const teamLogs = await prisma.teamLog.findMany();
  return teamLogs;
};

export const getTeamLog = async (id: number) => {
  const teamLog = await prisma.teamLog.findUnique({
    where: {
      id,
    },
  });
  return teamLog;
};

export const createTeamLog = async ({
  teamMoveId,
  personMoveId,
  personDoingOperationId,
  movement,
}: Pick<
  TeamLogEntity,
  'teamMoveId' | 'personMoveId' | 'personDoingOperationId' | 'movement'
>) => {
  const teamLog = prisma.teamLog.create({
    data: {
      teamMoveId,
      personMoveId,
      personDoingOperationId,
      movement,
    },
  });
  return teamLog;
};
