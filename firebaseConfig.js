import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import {
//   APIKEY,
//   AUTHDOMAIN,
//   PROJECTID,
//   STORAGEBUCKET,
//   MESSAGINGSENDERID,
//   APPID,
// } from "@env";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_APPID,
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
