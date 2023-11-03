// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-2ddea.firebaseapp.com",
    projectId: "mern-estate-2ddea",
    storageBucket: "mern-estate-2ddea.appspot.com",
    messagingSenderId: "1019755243781",
    appId: "1:1019755243781:web:aa6fe1abe7f6f7eb37ef6c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);