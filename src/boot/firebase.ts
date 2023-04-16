import { useTranslationsStore } from './../stores/translations-store';
import { useUserStore } from '../stores/user-store';
import { boot } from 'quasar/wrappers';
import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, onValue } from 'firebase/database';
import { User } from 'src/models/user';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
const fbApp = firebase.initializeApp(firebaseConfig);
const fbAuth = getAuth();
const fbUiConfig = {
  signInSuccessUrl: '/#/',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
};
const fbUi = new firebaseui.auth.AuthUI(fbAuth);
const fbRealtimeDb = getDatabase();
const firestore = getFirestore();

export default boot(({ app }) => {
  const userStore = useUserStore();
  const translationsStore = useTranslationsStore();
  onAuthStateChanged(
    fbAuth,
    (user) => {
      if (user) {
        const userData: User = {
          displayName: user.displayName,
          email: user.email,
          loggedIn: true,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          providerId: user.providerId,
          uid: user.uid,
        };
        userStore.user = userData;
      } else {
        userStore.$reset();
        //store.commit('BaseStoreModule/setUser', baseUserState)
      }
    },
    function (error) {
      console.log(error);
    }
  );
  const translations = ref(fbRealtimeDb, 'translations');
  onValue(translations, (snapshot) => {
    const data = snapshot.val();
    translationsStore.translations = data;
  });
});

export { fbApp, fbUi, fbUiConfig, fbAuth, fbRealtimeDb, firestore };
