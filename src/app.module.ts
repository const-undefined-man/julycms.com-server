import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { getConfig } from './config';
import { DatabaseModule, WinstonModule, RedisModule } from './common';
import CommonModules from './modules';
import { ConsoleModule } from './apis/console/console.module';
import { PcModule } from './apis/pc/pc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    WinstonModule.forRoot(),
    RedisModule,

    ...CommonModules,

    ConsoleModule,
    PcModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
