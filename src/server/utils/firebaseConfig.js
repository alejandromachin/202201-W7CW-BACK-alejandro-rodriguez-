require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "socialdistance-bbab8.firebaseapp.com",
  projectId: "socialdistance-bbab8",
  storageBucket: "socialdistance-bbab8.appspot.com",
  messagingSenderId: "795064082115",
  appId: "1:795064082115:web:735b36349199fbb71ccc76",
};

module.exports = firebaseConfig;
