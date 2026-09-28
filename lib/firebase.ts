import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
 
const firebaseConfig = {
apiKey: "TU_API_KEY",
authDomain: "TU_AUTH_DOMAIN",
projectId: "educa360pfs",
storageBucket: "TU_STORAGE_BUCKET",
messagingSenderId: "TU_MESSAGING_SENDER_ID",
appId: "TU_APP_ID",
};
 
const app = initializeApp(firebaseConfig);
 
export const db = getFirestore(app);
 
// Conectar al emulador local
if (typeof window !== "undefined") {
connectFirestoreEmulator(db, "localhost", 8080);
}