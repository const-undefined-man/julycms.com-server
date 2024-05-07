import { SetMetadata } from '@nestjs/common';
import { ReflectMetadataKeys } from '../constants';

export const Public = () =>
  SetMetadata(ReflectMetadataKeys.IS_PUBLIC_KEY, true);
