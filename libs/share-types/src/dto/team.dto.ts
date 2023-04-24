import { object, string, TypeOf, number } from 'zod';

export const teamRegisterSchema = object({
  teamName: string({ required_error: 'Team name is required' }),
  accountId: number({ required_error: 'Account is required' }),
});

export type TeamRegisterDTO = TypeOf<typeof teamRegisterSchema>;

export const teamSchema = object({
  id: number({ required_error: 'Account is required' }),
  createdAt: string({ required_error: 'Team name is required' }),
  updatedAt: string({ required_error: 'Team name is required' }),
  teamName: string({ required_error: 'Team name is required' }),
  accountId: number({ required_error: 'Account is required' }),
});

export type TeamDTO = TypeOf<typeof teamSchema>;

export const getTeamsSchema = object({
  accountId: number({ required_error: 'Account Id is Required' }),
});

export type GetTeamsDTO = TypeOf<typeof getTeamsSchema>;

export const addTeamMemberSchema = object({
  teamId: number({ required_error: 'teamId needs to be a number' }),
  userId: number({ required_error: 'userId needs to be a number' }),
});

export type AddTeamMemberDTO = TypeOf<typeof addTeamMemberSchema>;
