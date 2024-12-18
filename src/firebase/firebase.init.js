// Import the necessary Firebase modules (v9 and later)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Import getAuth from 'firebase/auth'

// Your Firebase config from environment variables or directly
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the authentication service
const auth = getAuth(app);

export default auth;
// Now you can use 'auth' for authentication operations like sign in, sign up, etc.
