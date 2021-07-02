import {ALREADY_LAUNCHED} from "@env";
import * as firebase from "firebase";

import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.firestore().settings({experimentalForceLongPolling: true});

export {firebase};

export default {
  ALREADY_LAUNCHED,
};
