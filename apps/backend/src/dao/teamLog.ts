import { TeamLogEntity } from '@mind-challenge4/share-types';
import prisma from '../db';
import { getPagination } from '../modules/common';

export const getAllTeamLogs = async () => {
  const teamLogs = await prisma.teamLog.findMany();
  return teamLogs;
};

export const getLogs = async ({
  personMoveId,
  teamMoveId,
  personDoingOperationId,
  page,
  size,
}: {
  personMoveId?: number;
  teamMoveId?: number;
  personDoingOperationId?: number;
  page?: number;
  size?: number;
}) => {
  const logs = await prisma.teamLog.findMany({
    ...getPagination({ page, size }),
    where: {
      personMoveId,
      teamMoveId,
      personDoingOperationId,
    },
  });
  return logs;
};

export const getCountOfLogs = async ({
  personMoveId,
  teamMoveId,
  personDoingOperationId,
  page,
  size,
}: {
  personMoveId?: number;
  teamMoveId?: number;
  personDoingOperationId?: number;
  page?: number;
  size?: number;
}) => {
  const logs = await prisma.teamLog.count({
    ...getPagination({ page, size }),
    where: {
      personMoveId,
      teamMoveId,
      personDoingOperationId,
    },
  });
  return logs;
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
