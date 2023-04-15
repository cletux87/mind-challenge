import { object, string, TypeOf } from 'zod';

export const accountRegisterSchema = object({
  name: string({ required_error: 'Name is required' }),
  clientName: string({ required_error: 'Client name is required' }),
});

export type AccountRegisterDTO = TypeOf<typeof accountRegisterSchema>;
