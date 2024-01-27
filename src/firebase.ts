// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGY34K91QjkHhGaYdMUl3mKJniKtPSR8g",
  authDomain: "stripe-auth-test-c672d.firebaseapp.com",
  projectId: "stripe-auth-test-c672d",
  storageBucket: "stripe-auth-test-c672d.appspot.com",
  messagingSenderId: "573786260744",
  appId: "1:573786260744:web:3893e5b4419b7c041a98bd",
  measurementId: "G-H61X52LMWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app;
}