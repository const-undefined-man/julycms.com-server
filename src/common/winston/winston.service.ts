import { LoggerService } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import * as dayjs from 'dayjs';
import * as chalk from 'chalk';
import 'winston-daily-rotate-file';

export class WinstonService implements LoggerService {
  private logger: Logger;

  constructor(options) {
    const consoleLog = new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ context, time, level, message }) => {
          const appStr = chalk.green(`[JULYCMS]`);
          const contextStr = chalk.yellow(`[${context}]`);

          return `${appStr} ${time} ${contextStr} ${level} ${message}`;
        }),
      ),
    });
    const dailyRotateLog = new transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'julycms-%DATE%.log',
      datePattern: 'YYYY-MM-DD HH',
      maxSize: '5m',
      maxFiles: '30d',
    });
    const defaultOPtions = {
      level: 'debug',
      transports: [consoleLog, dailyRotateLog],
      rejectionHandlers: [dailyRotateLog],
    };
    const env = process.env.NODE_ENV;
    if (env !== 'prod') {
      defaultOPtions.transports.pop();
      defaultOPtions.rejectionHandlers.pop();
    }
    const finalOptions = { ...defaultOPtions, ...options };
    this.logger = createLogger(finalOptions);
  }

  log(message: string, context: string) {
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }
  error(message: any, context: string) {
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('error', message, { context, time });
  }
  warn(message: any, context: string) {
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('warn', message, { context, time });
  }
  debug(message: any, context: string) {
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('debug', message, { context, time });
  }
}
