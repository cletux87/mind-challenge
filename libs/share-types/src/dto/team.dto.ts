import { object, string, TypeOf, number } from 'zod';

export const teamRegisterSchema = object({
  teamName: string({ required_error: 'Team name is required' }),
  accountId: number({ required_error: 'Account is required' }),
});

export type TeamRegisterDTO = TypeOf<typeof teamRegisterSchema>;
