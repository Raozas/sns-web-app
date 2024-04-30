// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDqjVhimh_ll8c0EYpNmI4qjuzmXUpGXBM",
  authDomain: "app1-6e8a7.firebaseapp.com",
  databaseURL: "https://app1-6e8a7-default-rtdb.firebaseio.com",
  projectId: "app1-6e8a7",
  storageBucket: "app1-6e8a7.appspot.com",
  messagingSenderId: "775303230727",
  appId: "1:775303230727:web:6a748bfbed8982382f41a2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
