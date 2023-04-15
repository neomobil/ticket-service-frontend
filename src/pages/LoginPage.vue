<template>
  <q-page class="flex flex-center" >
    <q-card  id="firebaseui-auth-container" class="bg-grey-4"></q-card>
  </q-page>
</template>

<script>
  import {defineComponent} from 'vue'
  import * as fBase from 'boot/firebase'
  export default defineComponent({
    name: 'LoginPage',
    mounted() {
      fBase.fbUi.start('#firebaseui-auth-container', fBase.fbUiConfig);
    }
  })
</script>

