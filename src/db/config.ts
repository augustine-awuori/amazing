import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyCAtitgurCoK8LIYRWfo2i95Q6otoTmXSA",
  authDomain: "kisii-campus-mart-site.firebaseapp.com",
  projectId: "kisii-campus-mart-site",
  storageBucket: "kisii-campus-mart-site.appspot.com",
  messagingSenderId: "66759292374",
  appId: "1:66759292374:web:2a09e7ad0919c6a056e077",
  measurementId: "G-C2MJ2XQDCQ",
});

const messaging = getMessaging(app);

export default {
  auth: getAuth(),
  db: getFirestore(),
  deleteObject,
  getDownloadURL,
  messaging,
  ref,
  signInWithEmailAndPassword,
  storage: getStorage(app),
  uploadBytes,
};
