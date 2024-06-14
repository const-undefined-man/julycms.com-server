import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Inject,
  SetMetadata,
  Session,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConsoleService } from './console.service';
import { AuthService } from './auth/auth.service';
import { Public, LocalAuthGuard, ReflectMetadataKeys } from '@app/common';
import { LoginAuthDto } from './auth/dto/login-auth.dto';

@ApiTags('管理后台-全局')
@Controller('api/console')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '全局认证')
export class ConsoleController {
  @Inject(ConsoleService)
  private readonly consoleService: ConsoleService;

  @Inject(AuthService)
  private readonly authService: AuthService;

  @ApiOperation({ summary: '获取验证码' })
  @Public()
  @Get('auth/code')
  captcha(@Session() session) {
    session.codeId = session.codeId ? session.codeId : session.id;
    return this.consoleService.createCaptch(session.codeId);
  }

  @ApiOperation({ summary: '登录' })
  @ApiBody({
    description: '登录',
    type: LoginAuthDto,
    required: true,
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: '退出登录' })
  @ApiBearerAuth()
  @Post('auth/logout')
  logout(@Req() req) {
    const token = req.header('authorization').split(' ')[1];
    return this.authService.logout(token);
  }

  @ApiOperation({ summary: 'dashboard' })
  @ApiBearerAuth()
  @Get('dashboard')
  dashboard() {
    return this.consoleService.dashboard();
  }
}
