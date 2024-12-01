// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-marketplace-19076.firebaseapp.com",
  projectId: "real-estate-marketplace-19076",
  storageBucket: "real-estate-marketplace-19076.appspot.com",
  messagingSenderId: "647016235524",
  appId: "1:647016235524:web:4888f9d90201c119ceeb51",
  measurementId: "G-WE7HDTCH6K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);