// src/utils/authListener.js
import { getAuth } from 'firebase/auth';
import firebaseApp from './firebase'; // Import the initialized Firebase app

const auth = getAuth(firebaseApp);

auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User logged in:', user);
    } else {
        console.log('User not logged in');
    }
});
