// src/utils/firebaseConfig.js
import { initializeApp } from 'firebase/app';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCcT3jRGrHDSv92AWObGXd_hREHRBCPUPo",
    authDomain: "auth-guide-12ab7.firebaseapp.com",
    projectId: "auth-guide-12ab7",
    storageBucket: "auth-guide-12ab7.appspot.com",
    messagingSenderId: "989709158610",
    appId: "1:989709158610:web:c43c5487057de323b5050b",
    measurementId: "G-F8TJ4S5BM7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export the initialized Firebase app
export default firebaseApp;
