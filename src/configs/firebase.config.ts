/* eslint-disable linebreak-style */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBtahtNIrvpx8zChUGjq2LA9tIq6gKcKY",
  authDomain: "image-generation-1c19f.firebaseapp.com",
  projectId: "image-generation-1c19f",
  storageBucket: "image-generation-1c19f.appspot.com",
  messagingSenderId: "694965302464",
  appId: "1:694965302464:web:747ea8643a374d189e6925",
  measurementId: "G-3GHKK9FS6Z",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const auth = getAuth(app);
export { auth };
export const storage = getStorage(app);
