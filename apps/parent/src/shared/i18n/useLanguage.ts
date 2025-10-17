import { useCallback, useState } from 'react';
import i18n from './i18n';

export const useLanguage = () => {
  const [language, setLanguageState] = useState(i18n.language);

  const setLanguage = useCallback(async (lng: string) => {
    await i18n.changeLanguage(lng);
    setLanguageState(lng);
  }, []);

  return { language, setLanguage };
};
