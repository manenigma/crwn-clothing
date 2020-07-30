import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBvMtHkCMHdRyTYx9cAsfeN658lV8J25iY",
    authDomain: "crwn-db-db043.firebaseapp.com",
    databaseURL: "https://crwn-db-db043.firebaseio.com",
    projectId: "crwn-db-db043",
    storageBucket: "crwn-db-db043.appspot.com",
    messagingSenderId: "750604520538",
    appId: "1:750604520538:web:6b3f8a97e455cb07775c63",
    measurementId: "G-1NPNNF7W6F"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;