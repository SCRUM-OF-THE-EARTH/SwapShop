// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjdyY9KLKpC4yF7bxtnZUaoTQ5DzBQ49M",
  authDomain: "swapshop-fe56a.firebaseapp.com",
  projectId: "swapshop-fe56a",
  storageBucket: "swapshop-fe56a.appspot.com",
  messagingSenderId: "705265250438",
  appId: "1:705265250438:web:86218a4a4819c17b3c6107"
};

// if firebase is not initialised in the app yet, initialise it.
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

// get the firebase firestore database and export it
const db = firebase.firestore();

export {db};