import { HttpException, HttpStatus } from '@nestjs/common';

type BusinessError = {
  code: number;
  message: string;
};

export class BusinessException extends HttpException {
  constructor(err: BusinessError | string) {
    if (typeof err === 'string') {
      err = {
        code: 0,
        message: err,
      };
    }

    super(err, HttpStatus.OK);
  }
}
