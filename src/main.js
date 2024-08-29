// main.js
import { createApp } from 'vue';
import App from './components/app.vue';
import './assets/styles.css';
import router from './routers';
import firebaseApp from './firebase'; // Import the initialized Firebase app
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import './auth'; // Ensure authListener is imported correctly

// Get Firebase services using the initialized app
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// Create Vue app instance
const app = createApp(App);

// Provide Firebase services to the app
app.provide('auth', auth);
app.provide('firestore', firestore);

// Use router
app.use(router);

// Mount the app
app.mount('#app');
