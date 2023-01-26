import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { fbConfig } from "./config"


// Initialize Firebase app instance, associated Firestore instance, and authentication instance using app's config
const fb = initializeApp(fbConfig);
const db = getFirestore(fb);

const auth = getAuth();


export {fb, db, auth};


