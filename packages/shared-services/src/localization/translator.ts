import i18n, { i18n as I18nInstance } from 'i18next';

export type TranslationResources = Record<string, Record<string, string>>;

let instance: I18nInstance | null = null;

export const initializeTranslator = async (locale: string, resources: TranslationResources) => {
  if (!instance) {
    instance = i18n.createInstance();
    await instance.init({
      lng: locale,
      fallbackLng: 'en'
    });
  }

  Object.entries(resources).forEach(([namespace, values]) => {
    instance!.addResources(locale, namespace, values, { overwrite: true });
  });

  await instance!.changeLanguage(locale);
  return instance!;
};

export const translate = (key: string, defaultValue?: string) => {
  if (!instance) {
    throw new Error('Translator has not been initialized');
  }

  return instance.t(key, defaultValue ? { defaultValue } : undefined);
};
