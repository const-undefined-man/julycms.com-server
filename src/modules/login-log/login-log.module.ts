import { Module } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginLog } from './entities/login-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoginLog])],
  providers: [LoginLogService],
  exports: [LoginLogService],
})
export class LoginLogModule {}
