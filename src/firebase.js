// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiKSAmbjQG2Zb4OiciZSqHAlWq603VcU0",
  authDomain: "lets-connect-59b3d.firebaseapp.com",
  projectId: "lets-connect-59b3d",
  storageBucket: "lets-connect-59b3d.appspot.com",
  messagingSenderId: "859081930524",
  appId: "1:859081930524:web:d2909c745c65a54e47acd9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;
