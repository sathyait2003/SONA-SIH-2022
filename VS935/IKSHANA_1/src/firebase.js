import  {initializeApp} from "firebase/app";
import  {getAuth} from "firebase/auth";
import   { getFirestore} from 'firebase/firestore'
import {getStorage ,uploadBytes} from 'firebase/storage'
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNEohhwQpDRe4pAGGqnsORHL1WivcL70c",
  authDomain: "sahakar-app.firebaseapp.com",
  projectId: "sahakar-app",
  storageBucket: "sahakar-app.appspot.com",
  messagingSenderId: "69223469139",
  appId: "1:69223469139:web:d5376d9d212a7088f3f6a6",
  measurementId: "G-VMQLYKR7LR"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export  {auth,db,storage,ref,uploadBytes,Timestamp, collection, addDoc,uploadBytesResumable, getDownloadURL}

export default app;