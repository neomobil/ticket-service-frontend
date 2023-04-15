<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn icon="home" flat dense round aria-label="Home" to="/" />
        <q-toolbar-title>
          {{ appName }}
        </q-toolbar-title>
        <q-btn
          v-if="!authStatus"
          flat
          dense
          round
          icon="person"
          aria-label="Menu"
          :to="{ name: 'login' }"
        />
        <q-btn
          v-else
          flat
          dense
          round
          icon="logout"
          aria-label="Logout"
          @click="logout"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useUserStore } from 'src/stores/user-store';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const appName = process.env.APP_NAME;
    const userStore = useUserStore();
    const logout = () => userStore.logout();
    const authStatus = computed(() => userStore.loggedIn);
    return {
      appName,
      logout,
      authStatus,
    };
  },
});
</script>
