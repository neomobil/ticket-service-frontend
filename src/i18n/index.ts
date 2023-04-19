const messages = JSON.parse(localStorage.getItem('translations') || '{}');

export default {
  en: messages.en,
  de: messages.de,
};
