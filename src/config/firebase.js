import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyDnlrsG8XNwTEx0AsODG08D5uIxVBXxYmQ",
  authDomain: "crud-63130.firebaseapp.com",
  databaseURL: "https://crud-63130-default-rtdb.firebaseio.com",
  projectId: "crud-63130",
  storageBucket: "crud-63130.appspot.com",
  messagingSenderId: "1095917611270",
  appId: "1:1095917611270:web:f6d1db52597275fe9d1687"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
