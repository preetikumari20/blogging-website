let firebaseConfig = {
    apiKey: "AIzaSyAYL6tBM1vSLykIKF45pdbmXnk1s0cemY8",
    authDomain: "blogging-website-1db6f.firebaseapp.com",
    projectId: "blogging-website-1db6f",
    storageBucket: "blogging-website-1db6f.firebasestorage.app",
    messagingSenderId: "136326414648",
    appId: "1:136326414648:web:11768c13e670415a9f01cd"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();