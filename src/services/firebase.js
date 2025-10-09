// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGlWDEgvST_j2Oe0FnDSVxm447_643EXI",
  authDomain: "ecommerce-28e57.firebaseapp.com",
  projectId: "ecommerce-28e57",
  storageBucket: "ecommerce-28e57.appspot.com",
  messagingSenderId: "542894096245",
  appId: "1:542894096245:web:ecd0dabe6680a404181d3c",
  measurementId: "G-W38QNJB85Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
