import { User } from '../models/user';
import { defineStore } from 'pinia';
import firebase from 'firebase/compat/app';

export const useUserStore = defineStore('authenticatedUser', {
  state: () => ({
    user: {
      displayName: null,
      email: null,
      loggedIn: false,
      phoneNumber: null,
      photoURL: null,
      providerId: '',
      role: null,
      uid: '',
    } as User,
  }),

  getters: {
    loggedIn(state) {
      return state.user.loggedIn;
    },
  },

  actions: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$reset();
        this.router.push({ name: 'login' });
      }).catch(error => console.log(error))
    },
  },
});
