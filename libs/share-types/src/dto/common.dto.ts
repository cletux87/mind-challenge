import { number, object, TypeOf, string } from 'zod';

export const IdRequestSchema = object({
  id: number({ required_error: 'Id is needed' }),
});

export type IdRequestDTO = TypeOf<typeof IdRequestSchema>;

export const activeSchema = object({
  id: number({ required_error: 'Id is needed' }),
  active: string({required_error: 'Active value is required and can be true or false'})
})

export type ActiveDTO = TypeOf<typeof activeSchema>