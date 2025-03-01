import { initializeApp } from "firebase/app";
import { getDatabase } from  "firebase/database";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCkOGS1f23BbAAo-PfH5f-HIyXsA5pJKlw",
  authDomain: "finanace-5dc1c.firebaseapp.com",
  databaseURL: "https://finanace-5dc1c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finanace-5dc1c",
  storageBucket: "finanace-5dc1c.firebasestorage.app",
  messagingSenderId: "54428662496",
  appId: "1:54428662496:web:8f41ac688d495f7ab96e85"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app)