// Firebase config info
const config = {
  apiKey: "AIzaSyAR3rfWjtU_wUvtLgT-9_ag6gLQSZ6ITME",
  authDomain: "train-scheduler-169a0.firebaseapp.com",
  databaseURL: "https://train-scheduler-169a0.firebaseio.com",
  projectId: "train-scheduler-169a0",
  storageBucket: "",
  messagingSenderId: "873279498479"
};

// Initialize Firebase
firebase.initializeApp(config);

const database = firebase.database();

database.ref().on("value", (dataSnapshot) => {
  console.log(dataSnapshot.val());
});
