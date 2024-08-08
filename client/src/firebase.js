// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a450a.firebaseapp.com",
  projectId: "mern-estate-a450a",
  storageBucket: "mern-estate-a450a.appspot.com",
  messagingSenderId: "598778819420",
  appId: "1:598778819420:web:77633172dd37ed3e2c4799"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);