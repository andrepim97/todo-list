// src/plugins/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAlkS_oywFwXnurwF51RSUBMabIzZaai_c",
  authDomain: "todo-list-vue-fa766.firebaseapp.com",
  projectId: "todo-list-vue-fa766",
  storageBucket: "todo-list-vue-fa766.firebasestorage.app",
  messagingSenderId: "183509271194",
  appId: "1:183509271194:web:a2f840b85b06446d8fd523",
  measurementId: "G-BXXZBRQHZD"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Obtém uma referência para o Firestore
const db = getFirestore(app);

// Obtém uma referência para a autenticação (se fores usar)
const auth = getAuth(app);

// Exporta as instâncias para usar nos teus componentes
export { db, app, auth }; // E auth, se usares