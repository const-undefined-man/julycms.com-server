import { I18nContext } from 'nestjs-i18n';

export const $t = (key: string) => {
  const context = I18nContext.current();
  if (!context) {
    throw new Error('I18n context is not available.');
  }
  return context.t(key) || key;
};