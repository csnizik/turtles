import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import englishTranslations from './common/lang/en-common.json';
import spanishTranslations from './common/lang/es-common.json';

const resources = {
  en: {
    translation: englishTranslations,
  },
  es: {
    translation: spanishTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  keySeparator: '.',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
