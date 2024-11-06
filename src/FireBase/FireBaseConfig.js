import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnl8-0oZggYbI2-LXNb30R9OEvoyMJZ5c",
  authDomain: "project2024-edc0d.firebaseapp.com",
  projectId: "project2024-edc0d",
  storageBucket: "project2024-edc0d.appspot.com",
  messagingSenderId: "631508929522",
  appId: "1:631508929522:web:e3428c4a73edb83ac3f96b"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);