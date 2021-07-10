import {ALREADY_LAUNCHED} from "@env";
import * as firebase from "firebase";

import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.firestore().settings({experimentalForceLongPolling: true});

export {firebase};

export default {
  ALREADY_LAUNCHED,
};
