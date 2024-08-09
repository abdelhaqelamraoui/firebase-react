// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyCunEw8PYXo82SQYGDCWsYR4nCD-jzASK4",
   authDomain: "fir-course-34286.firebaseapp.com",
   projectId: "fir-course-34286",
   storageBucket: "fir-course-34286.appspot.com",
   messagingSenderId: "442794310599",
   appId: "1:442794310599:web:4694f5a4ec06554608b7e2",
   measurementId: "G-6Y4DQM514J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
//
export const googleProvider = new GoogleAuthProvider();
