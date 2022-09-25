import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDufa1SuFZZuH-pCwFax7LjacQc8qWUnlM",
  authDomain: "waldo-project-321c7.firebaseapp.com",
  projectId: "waldo-project-321c7",
  storageBucket: "waldo-project-321c7.appspot.com",
  messagingSenderId: "898480335949",
  appId: "1:898480335949:web:6bf452947ba16af7318004"
};

//initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize cloud firestore and get a reference to the service
const db = getFirestore(app);

export { db };

