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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userDocumentRef = firestore.doc(`users/${userAuth.uid}`);
  const DocumentSnapshot = await userDocumentRef.get();

  if(!DocumentSnapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try { 
      await userDocumentRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userDocumentRef;
};

firebase.initializeApp(config);

export const addCollectionDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log({collectionRef});
  // const collectionSnapshot = await collectionRef.get();
  // console.log({collectionSnapshot});
  // const collectionSnapshotDocs = collectionSnapshot.docs;
  // console.log(collectionSnapshotDocs.map(doc => doc.id));

  const batch = firestore.batch();
  objectsToAdd.forEach( obj => {
    // console.log(obj);
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  })

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap =  (collectionsSnapshot) => {
  const transformCollection = collectionsSnapshot.docs.map( documentSnapshot => {
    const { title, items } = documentSnapshot.data();
    return { 
      routeName: encodeURI(title.toLowerCase()),
      id: documentSnapshot.id, 
      title, 
      items
    };
  });

  // console.log(transformCollection);
  const collections = transformCollection.reduce( (accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
  // console.log(collections);
  return collections;
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubcribe = auth.onAuthStateChanged( async (userAuth) => {
      unsubcribe();
      resolve(userAuth);
    }, reject)
  })
}

export const auth = firebase.auth(); 
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider); 

export default firebase;