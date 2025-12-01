// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAnVWY7G-yNgEswaUonHU9oPHbBSL07jhg",
    authDomain: "moraindu.firebaseapp.com",
    projectId: "moraindu",
    storageBucket: "moraindu.firebasestorage.app",
    messagingSenderId: "724894055861",
    appId: "1:724894055861:web:4f1a75cb3b9fff4e1cadfc",
    measurementId: "G-P1S0W3YNCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);