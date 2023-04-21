import { object, string, TypeOf, number } from 'zod';

export const accountRegisterSchema = object({
  name: string({ required_error: 'Name is required' }),
  clientName: string({ required_error: 'Client name is required' }),
});

export type AccountRegisterDTO = TypeOf<typeof accountRegisterSchema>;

export const accountSchema = object({
  id: number({ required_error: 'Id is required' }),
  createdAt: string({ required_error: 'Client name is required' }),
  updatedAt: string({ required_error: 'Client name is required' }),
  name: string({ required_error: 'Client name is required' }),
  clientName: string({ required_error: 'Client name is required' }),
  disableDate: string({ required_error: 'Client name is required' }),
});

export type AccountsDTO = TypeOf<typeof accountSchema>;
