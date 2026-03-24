import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Replace with your actual Firebase project configuration
// To get this: Firebase Console -> Project Settings -> Web App -> Config
const firebaseConfig = {
  apiKey: "AIzaSy_YOUR_DUMMY_API_KEY",
  authDomain: "pmddky-hackathon.firebaseapp.com",
  projectId: "pmddky-hackathon",
  storageBucket: "pmddky-hackathon.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
