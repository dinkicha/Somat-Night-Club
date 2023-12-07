import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyAPdtpjZ5Z2JPX88aoDo622MeW5vuu93qM",
    authDomain: "somat-night-club.firebaseapp.com",
    databaseURL:
      "https://somat-night-club-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "somat-night-club",
    storageBucket: "somat-night-club.appspot.com",
    messagingSenderId: "521082571465",
    appId: "1:521082571465:web:c1d52817203f4c32d49b18",
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;