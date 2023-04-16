import { defineStore } from 'pinia';

export const useTranslationsStore = defineStore('translations', {
  state: () => ({
    translations: {},
  }),
});
