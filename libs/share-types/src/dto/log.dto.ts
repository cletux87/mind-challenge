import { object, string, TypeOf, number } from 'zod';

export const logSchema = object({
  id: number({ required_error: 'Id is required' }),
  createdAt: string({ required_error: 'Client name is required' }),
  updatedAt: string({ required_error: 'Client name is required' }),
  movement: string({ required_error: 'Client name is required' }),
  teamMoveId: number({ required_error: 'Id is required' }),
  personMoveId: number({ required_error: 'Id is required' }),
  personDoingOperationId: number({ required_error: 'Id is required' }),
});

export type LogDTO = TypeOf<typeof logSchema>;

export type LogDTOWithPagination = {
  logs: LogDTO[];
  totalResults?: number;
};
