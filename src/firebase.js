import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvTVT8fnX--8nvW8IHLC7P5ieE1-Yf2BI",
  authDomain: "react-messenger-1fe15.firebaseapp.com",
  projectId: "react-messenger-1fe15",
  storageBucket: "react-messenger-1fe15.appspot.com",
  messagingSenderId: "218993549156",
  appId: "1:218993549156:web:c1a3d3029d0b0e0fafa471",
  measurementId: "G-PYZ2CPR3MX",
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

export default getFirestore();
