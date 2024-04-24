// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import axios from "axios";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6EN8g-6r8Pp6-fvY9iZaC2WmiKTPaaoE",
  authDomain: "agile-d4334.firebaseapp.com",
  projectId: "agile-d4334",
  storageBucket: "agile-d4334.appspot.com",
  messagingSenderId: "1003584293594",
  appId: "1:1003584293594:web:39d16c7be20b9a65c3b3e3",
  measurementId: "G-1HVWL385B2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DB = getFirestore(app)

const auth=getAuth(app)

export {DB , auth}

export function AddUser(email:string,password:string,firstName:string,lastName:string,birthdate:string,country:string,language:string,role:string): Promise<string> {
  return new Promise((resolve, reject) => {
      axios.post('/api/addUser', { email,password,firstName,lastName,birthdate,country,language,role })
          .then((res) => {
              console.log(res.data + " id");
              resolve(res.data as string);
          })
          .catch((error) => {
              console.error("Error adding user:", error);
              reject("Save failed"); // Reject with an error message
          });
  });
}
