import config from "./config.js";

// Initialize Firebase
firebase.initializeApp(config);

const database = firebase.database();

database.ref().on("value", (dataSnapshot) => {
  console.log(dataSnapshot.val());
});
