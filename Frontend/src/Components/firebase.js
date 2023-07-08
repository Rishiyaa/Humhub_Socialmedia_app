import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyC2V9ZHCEVXuKnX5RD1U3KfxDagzIUy24Q",
  authDomain: "yumhub-6123d.firebaseapp.com",
  projectId: "yumhub-6123d",
  storageBucket: "yumhub-6123d.appspot.com",
  messagingSenderId: "373091391214",
  appId: "1:373091391214:web:c34d430c5087b6da5545ff"
});

const auth=firebase.auth();
const storage=firebase.storage();

export {storage,auth};

