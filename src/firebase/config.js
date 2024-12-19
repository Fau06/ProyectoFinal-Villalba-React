import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqCg6kSZoIvLlnWuDsivHSY0bFjQN6U58",
  authDomain: "coderhouse-ecommerce-fv.firebaseapp.com",
  projectId: "coderhouse-ecommerce-fv",
  storageBucket: "coderhouse-ecommerce-fv.firebasestorage.app",
  messagingSenderId: "512144533468",
  appId: "1:512144533468:web:2ef86d682340ca46a9d119"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

