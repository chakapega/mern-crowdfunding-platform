import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCIYQO9eUB_tm0Vu0x6gdKJpAL2R34zSF0',
  authDomain: 'crowdfunding-platform-5d2f5.firebaseapp.com',
  databaseURL: 'https://crowdfunding-platform-5d2f5.firebaseio.com',
  projectId: 'crowdfunding-platform-5d2f5',
  storageBucket: 'crowdfunding-platform-5d2f5.appspot.com',
  messagingSenderId: '1067642080053',
  appId: '1:1067642080053:web:e0f974069a9725e045da7c'
};

firebase.initializeApp(firebaseConfig);

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const arrayOfAuthProviders = { facebook: facebookAuthProvider, google: googleAuthProvider };
