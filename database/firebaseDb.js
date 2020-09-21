import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDROqkbvYQ4LNymf3UuBWPm1Tiftp7_VuQ",
    authDomain: "todo-a22df.firebaseapp.com",
    databaseURL: "https://todo-a22df.firebaseio.com",
    projectId: "todo-a22df",
    storageBucket: "todo-a22df.appspot.com",
    messagingSenderId: "1080265142880",
    appId: "1:1080265142880:web:5a6d4c735b8e7cdbe48905"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;