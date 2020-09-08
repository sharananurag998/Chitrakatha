import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAKnRJffroFYAXiZzDhXD_H9TcHv7gmoHU",
  authDomain: "chitrakatha-ab4ed.firebaseapp.com",
  databaseURL: "https://chitrakatha-ab4ed.firebaseio.com",
  projectId: "chitrakatha-ab4ed",
  storageBucket: "chitrakatha-ab4ed.appspot.com",
  messagingSenderId: "308099669338",
  appId: "1:308099669338:web:6f54b0503d206f4a016763",
  measurementId: "G-2LR4YXDLRL",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
