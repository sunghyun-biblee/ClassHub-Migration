// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABv3cpTEPx5oOzGzK3OuplWdtmPirxXTU",
  authDomain: "classhub-migration.firebaseapp.com",
  projectId: "classhub-migration",
  storageBucket: "classhub-migration.appspot.com",
  messagingSenderId: "994879295514",
  appId: "1:994879295514:web:2b61cc7a9700235fc3c1a3",
  measurementId: "G-TVMVBCG477",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const storage = getStorage(app);
// const analytics = getAnalytics(fireBaseApp);
