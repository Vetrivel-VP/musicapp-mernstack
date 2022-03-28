import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPnnX6q4ZMrXzeKGpA_RO-6wcV3UB7ZPU",
  authDomain: "musicapp-60272.firebaseapp.com",
  projectId: "musicapp-60272",
  storageBucket: "musicapp-60272.appspot.com",
  messagingSenderId: "401631712700",
  appId: "1:401631712700:web:dbc15774f4491575ffc7b9",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
