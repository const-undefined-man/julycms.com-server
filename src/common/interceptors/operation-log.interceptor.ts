import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { ReflectMetadataKeys } from '../constants';

@Injectable()
export class OperationLogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();

    const controllerName = this.getControllerName(context.getClass());
    const actionName = this.getActionName(context.getHandler());

    if (!controllerName || !actionName) {
      return next.handle();
    } else {
      return next.handle().pipe(
        tap(() => {
          req.loggerInfo.module = controllerName;
          req.loggerInfo.operation = actionName;
        }),
      );
    }
  }

  private getControllerName(method: any): string {
    return Reflect.getMetadata(ReflectMetadataKeys.CONTROLLER_NAME, method);
  }

  private getActionName(method: any): string {
    return Reflect.getMetadata(ReflectMetadataKeys.ACTION_NAME, method);
  }
}
