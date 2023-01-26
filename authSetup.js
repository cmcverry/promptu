import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";
import { fbConfig } from "./config"

// App's Firebase configuration
const firebaseConfig = fbConfig;

// Initialize Firebase
const fb = initializeApp(firebaseConfig);
export default fb;

const db = getFirestore(fb);
// Anonymous authenticate user
const auth = getAuth();

// Checks for new user 
// If so, performs anonymous authentication and assigns random display name to user
onAuthStateChanged(auth, (user) => {
  if (!user) {
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
        console.log(error)
      });
    }
  })
  .catch((error) => {
    console.log(error)
  });
  }
});


