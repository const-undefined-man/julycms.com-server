import { FindOperator } from 'typeorm';

export interface queryParams {
  id?: number;
  size?: FindOperator<number>;
  operatorId?: number;
  createdAt?: FindOperator<number>;
}
