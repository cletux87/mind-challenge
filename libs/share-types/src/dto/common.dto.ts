import { number, object, TypeOf } from 'zod';

export const IdRequestSchema = object({
  id: number({ required_error: 'Id is needed' }),
});

export type IdRequestDTO = TypeOf<typeof IdRequestSchema>;
