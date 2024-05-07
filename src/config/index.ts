import dev from './dev';
import prod from './prod';

export const env = process.env.NODE_ENV || 'dev';

export const getConfig = () => {
  const envMap = {
    dev,
    prod,
  };
  return envMap[env];
};
