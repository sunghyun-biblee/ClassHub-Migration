// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
