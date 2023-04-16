<template>
  <q-page class="row items-center justify-evenly">
    <pre>{{ translations }}</pre>
  </q-page>
</template>

<script lang="ts">
import { useTranslationsStore } from 'src/stores/translations-store';
import { defineComponent } from 'vue';
import { computed } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const translationsStore = useTranslationsStore();
    const translations = computed(() => translationsStore.translations);
    return {
      translations,
    };
  },
});
</script>
