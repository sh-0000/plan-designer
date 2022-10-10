// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXpAVUVDeOW9tMSZdcQr4j9gcAIJrmsjE",
  authDomain: "plan-designer.firebaseapp.com",
  projectId: "plan-designer",
  storageBucket: "plan-designer.appspot.com",
  messagingSenderId: "914875213635",
  appId: "1:914875213635:web:ff6ec31f01d128490171f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;