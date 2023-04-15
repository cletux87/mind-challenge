import { TeamEntity } from '@mind-challenge4/share-types';
import prisma from '../db';

export const getAllTeams = async () => {
  const teams = await prisma.team.findMany();
  return teams;
};

export const getTeam = async (id: number) => {
  const team = await prisma.team.findUnique({
    where: {
      id,
    },
  });
  return team;
};

export const createTeam = async ({
  teamName,
  accountId,
}: Pick<TeamEntity, 'teamName' | 'accountId'>) => {
  const team = await prisma.team.create({
    data: {
      teamName,
      accountId,
    },
  });
  return team;
};
