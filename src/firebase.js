import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBsStudfmA6UvV62Zh_No2JzjIyqMYQANU",
    authDomain: "instragam-projeto.firebaseapp.com",
    projectId: "instragam-projeto",
    storageBucket: "instragam-projeto.appspot.com",
    messagingSenderId: "1051366319863",
    appId: "1:1051366319863:web:cf67d1ea3da0e5f59ad5f2",
    measurementId: "G-W23EG7V9K1"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

const provider =  new firebase.auth.GoogleAuthProvider();



export  {db, auth, storage, provider};
