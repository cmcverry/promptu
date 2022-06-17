import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";

// App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDezXJxA49Xa14giocbmt679GXi6W1254",
  authDomain: "promptu-4f001.firebaseapp.com",
  projectId: "promptu-4f001",
  storageBucket: "promptu-4f001.appspot.com",
  messagingSenderId: "1095720355013",
  appId: "1:1095720355013:web:f70794dc83df76bc679cac"
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);
export default fb;

const db = getFirestore(fb);

// Anonymous authenticate user
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const user = auth.currentUser;

    if (!user.displayName) {
      const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
      updateProfile(user, {
        displayName: randomName
      }).then(() => {
        setDoc(doc(db, "users", user.uid), {
          username: user.displayName,
        });
      }).catch((error) => {
      });
    }
  } else {
    signInAnonymously(auth)
  .then(() => {
    const user = auth.currentUser;

    if (!user.displayName) {
      const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
      updateProfile(user, {
        displayName: randomName
      }).then(() => {
        setDoc(doc(db, "users", user.uid), {
          username: user.displayName,
    });
      }).catch((error) => {
      });
    }
  })
  .catch((error) => {
  });
  }
});


