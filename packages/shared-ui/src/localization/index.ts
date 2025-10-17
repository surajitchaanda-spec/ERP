import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const createUiI18n = async () => {
  const instance = i18n.createInstance();

  await instance
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      defaultNS: 'common',
      interpolation: {
        escapeValue: false
      },
      resources: {
        en: {
          common: {
            continue: 'Continue',
            cancel: 'Cancel'
          }
        }
      }
    });

  return instance;
};

export default createUiI18n;
