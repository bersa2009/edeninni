import trTranslations from '../i18n/tr.json';

type TranslationKey = keyof typeof trTranslations;

export function t(key: TranslationKey): string {
  return trTranslations[key] || key;
}

export const translations = trTranslations;