// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
//Firebase project config
//Firebase config is no critical data, because data is secured serverside via security rules and apiKey limitations
const firebaseConfig = {
    apiKey: "AIzaSyDdlhRAG7unoKU0F1pyEsFmsysk1mjmHiA",
    authDomain: "smartphone-picker.firebaseapp.com",
    databaseURL: "https://smartphone-picker.firebaseio.com",
    projectId: "smartphone-picker",
    storageBucket: "smartphone-picker.appspot.com",
    messagingSenderId: "181381838828",
    appId: "1:181381838828:web:5508761b891aed585532c9",
    measurementId: "G-XKC487SZM0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);