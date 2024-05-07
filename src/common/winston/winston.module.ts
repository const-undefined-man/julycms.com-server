import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { WinstonService } from './winston.service';

export const WINSTON_LOGGER = 'WINSTON_LOGGER'; // 定义一个全局的token

@Global()
@Module({})
export class WinstonModule {
  public static forRoot(options?: LoggerOptions): DynamicModule {
    return {
      module: WinstonModule,
      providers: [
        {
          provide: WINSTON_LOGGER,
          useValue: new WinstonService(options),
        },
      ],
      exports: [WINSTON_LOGGER],
    };
  }
}
