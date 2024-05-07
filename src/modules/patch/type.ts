import { FindOperator } from 'typeorm';

export interface queryParams {
  id?: number;
  title?: FindOperator<string> | string;
  type?: number;
}
