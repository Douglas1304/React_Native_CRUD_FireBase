// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD09NcKr-lJFZP8d8DDY1whbvWVJ6m89x4",
  authDomain: "crud-react-native-5cc4d.firebaseapp.com",
  projectId: "crud-react-native-5cc4d",
  storageBucket: "crud-react-native-5cc4d.appspot.com",
  messagingSenderId: "780779370502",
  appId: "1:780779370502:web:7d4226a168bd76ffebab87"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase