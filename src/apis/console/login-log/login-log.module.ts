import { Module } from '@nestjs/common';
import { LoginLogModule as ComLoginLogModule } from '@app/modules';
import { LoginLogController } from './login-log.controller';

@Module({
  imports: [ComLoginLogModule],
  controllers: [LoginLogController],
})
export class LoginLogModule {}
