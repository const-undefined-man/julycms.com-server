import { FindOperator } from 'typeorm';

export interface queryParams {
  username?: string;
  createdAt?: FindOperator<number>;
}
