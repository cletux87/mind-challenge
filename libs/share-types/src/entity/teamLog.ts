export interface TeamLogEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  movement: string;
  teamMoveId: number;
  personMoveId: number;
  personDoingOperationId: number;
}
