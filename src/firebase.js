



import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKSBfOLJxF5GxdLXlnTc6HjO3kbbYFlKs",
    authDomain: "laundryapp-376804.firebaseapp.com",
    projectId: "laundryapp-376804",
    storageBucket: "laundryapp-376804.appspot.com",
    messagingSenderId: "893744167930",
    appId: "1:893744167930:web:9067747e1df6b9b74e4243",
    measurementId: "G-YDMQBS9D4G"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;