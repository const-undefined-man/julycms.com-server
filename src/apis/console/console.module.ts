import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConsoleController } from './console.controller';
import { ConsoleService } from './console.service';
import { AuthModule } from './auth/auth.module';
import ConsoleModules from './index';

import {
  JwtAuthGuard,
  PermissionGuard,
  OperationLogMiddleware,
} from '@app/common';
import {
  AttachementModule,
  CategoryModule,
  CounterModule,
  DocumentModule,
  OperationLogModule,
  RoleModule,
  TagModule,
} from '@app/modules';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    DocumentModule,
    TagModule,
    AttachementModule,
    CounterModule,
    RoleModule,
    OperationLogModule,
    ...ConsoleModules,
  ],
  controllers: [ConsoleController],
  providers: [
    ConsoleService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
  exports: [ConsoleService],
})
export class ConsoleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OperationLogMiddleware).forRoutes('api/console');
  }
}
