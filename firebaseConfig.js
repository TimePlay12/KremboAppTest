import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBzwl4fJJtgo4_Et0wc-wQ7xn6yDjKNjFk",
  authDomain: "test-krembo-database.firebaseapp.com",
  databaseURL: "https://test-krembo-database-default-rtdb.firebaseio.com",
  projectId: "test-krembo-database",
  storageBucket: "test-krembo-database.appspot.com",
  messagingSenderId: "203824651820",
  appId: "1:203824651820:web:47f2e0dfe9fa2a1392fb89",
  measurementId: "G-1SZ1X5L57J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;