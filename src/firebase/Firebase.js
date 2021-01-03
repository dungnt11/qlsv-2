/**
 * Class instance defined for firebase
 */

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';

import {urlToBlob} from './helper';
import 'react-native-get-random-values';
import * as uuid from 'uuid';

const config = {
  apiKey: 'AIzaSyA_OGZP97Qg-hkd-l96r7WKQJ0IbbITUWk',
  authDomain: 'qlnv-d7fd9.firebaseapp.com',
  databaseURL: 'https://qlnv-d7fd9-default-rtdb.firebaseio.com',
  projectId: 'qlnv-d7fd9',
  storageBucket: 'gs://qlnv-d7fd9.appspot.com',
  appId: '1:797628174505:ios:96a6492223dd07af8759b8',
};

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  async uploadFile(path, type, uri) {
    const storageRef = firebase.default.storage().ref().child(path);

    const blob = await urlToBlob(uri);
    try {
      const snapshot = await storageRef.put(blob, {
        contentType: type,
        firebaseStorageDownloadTokens: uuid.v4(),
      });

      const urlDownload = await snapshot.ref.getDownloadURL();

      return urlDownload;
    } catch (e) {
      console.log(e);
      return '';
    }
  }

  async createDB(dbName) {
    return new Promise((resolve) => {
      firebase.default
        .database()
        .ref('/chat')
        .on('value', (snapshot) => {
          if (snapshot.val()) {
            resolve(snapshot.val());
          }
        });
    });
  }
}

const firebaseInstance = new Firebase();
export {firebase};
export default firebaseInstance;
