// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzHuepwEkFoI5QzJISd121B8hyaOOewZA",
    authDomain: "optical-flashcards-a6d76.firebaseapp.com",
    projectId: "optical-flashcards-a6d76",
    storageBucket: "optical-flashcards-a6d76.appspot.com",
    messagingSenderId: "930492285594",
    appId: "1:930492285594:web:f780b68efb73f2ef8e9523"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
//export const db = getFirestore(app);
export default app;//no curly brackets when importing the default
