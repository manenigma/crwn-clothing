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

  export const createUserProfileDocument = async (userAuth, additionalData) => { // use in App.js
    if (!userAuth) return;
    // console.log('userAuth ', userAuth);
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    // console.log('userRef ', userRef);
    // console.log('snapShot ', snapShot);
    // console.log('snapShot.exists ', snapShot.exists);

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try { // store in firebase Database
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth(); // use in App.js and header.component.jsx
  export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider); // use in sign-in.component.jsx

export default firebase;