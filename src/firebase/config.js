import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA_OGZP97Qg-hkd-l96r7WKQJ0IbbITUWk',
  authDomain: 'qlnv-d7fd9.firebaseapp.com',
  databaseURL: 'https://qlnv-d7fd9-default-rtdb.firebaseio.com',
  projectId: 'qlnv-d7fd9',
  storageBucket: 'qlnv-d7fd9.appspot.com',
  appId: '1:797628174505:ios:96a6492223dd07af8759b8',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };