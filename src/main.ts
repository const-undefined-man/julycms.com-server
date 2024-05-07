import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { commonBootstrap, SwaggerInit } from './common';
import { ConfigService } from '@nestjs/config';
import * as chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(ConfigService);
  const PORT = config.get('port') || 3000;

  commonBootstrap(app);

  // 初始化swagger，生产环境请注释
  SwaggerInit(app, config.get('swagger'));

  // 起飞
  await app.listen(PORT);

  // 打印环境&服务地址
  console.log(
    chalk.blue(' +-+-+-+-+-+-+-+-+-+-+-+\n'),
    chalk.blue('|J|U|L|Y|C|M|S|.|C|O|M|\n'),
    chalk.blue('+-+-+-+-+-+-+-+-+-+-+-+\n'),
    chalk.yellow(`当前环境: ${process.env.NODE_ENV}\n`),
    '服务地址: ' + chalk.green(`http://localhost:${PORT}\n`),
    '文档地址: ' + chalk.green(`http://localhost:${PORT}/api-doc\n`),
  );
}
bootstrap();
