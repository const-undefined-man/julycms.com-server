import { SetMetadata } from '@nestjs/common';
import { ReflectMetadataKeys } from '../constants';

export const VerifyPermission = (...args: string[]) =>
  SetMetadata(ReflectMetadataKeys.PERMISSION, args);
