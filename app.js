import config from "./config.js";

console.dir(config);

// Initialize Firebase
firebase.initializeApp(config);

const database = firebase.database();

database.ref().push({
  test: "Test value!"
});