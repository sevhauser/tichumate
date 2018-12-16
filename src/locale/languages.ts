export interface LanguageValues {
  lang: string;
  value: string;
}

export const languages: LanguageValues[] = [
  {
    lang: 'languages.en',
    value: 'en',
  }, {
    lang: 'languages.de',
    value: 'de',
  },
];

export function detectLanguage(): string {
  let userLanguage = navigator.language;
  if (userLanguage === null) {
    userLanguage = '';
  } else {
    const parts = userLanguage.split('-');
    userLanguage = parts[0].toLowerCase();
  }
  if (languages.findIndex((val) => val.value === userLanguage) < 0) {
    userLanguage = 'en';
  }
  return userLanguage;
}
