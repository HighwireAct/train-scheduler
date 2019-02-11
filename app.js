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

// Get 
database.ref().on("child_added", (snapshot) => {
  const data = snapshot.val();

  // Prepare data for insertion into table
  const line = data.line;
  const frequency = data.frequency;
  const destination = data.destination;
  const minutesAway = timeToNextTrain(data.initialTrain, Number(frequency));
  const nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

  addRow(line, frequency, destination, nextArrival, minutesAway);
});

// Handler for train form submission
$("#new-train").submit(function(event) {
  event.preventDefault();
  
  // Check whether input fields are blank
  const inputsEmpty = {
    line: $("#line").val().trim() === "",
    destination: $("#destination").val().trim() === "",
    initialTrain: $("#initial-train").val().trim() === "",
    frequency: $("#frequency").val().trim() === ""
  }

  if (inputsEmpty.line || inputsEmpty.destination || inputsEmpty.initialTrain || inputsEmpty.frequency) {
    alert("All fields must contain text.");
  } else {
      // Create temporary object to hold value for submitted train line
      const newTrain = {
        line: $("#line").val().trim(),
        destination: $("#destination").val().trim(),
        initialTrain: $("#initial-train").val().trim(),
        frequency: $("#frequency").val().trim()
      }
      // Push train info into database
      database.ref().push(newTrain);

      // Clear input fields
      $("#line").val("");
      $("#destination").val("");
      $("#initial-train").val("");
  }
});

/**
 * Calculates the amount of time (in minutes) until the next train arrives
 * @param {number} initTime - Initial departure time in HH:mm format 
 * @param {number} frequency - Arrival frequency in minutes
 * @returns {number} - Time until next train arrives (minutes)
 */
const timeToNextTrain = (initTime, frequency) => {
  const initTimeMoment = moment(initTime, "HH:mm");
  console.log(initTimeMoment);
  const timeSinceFirstTrain = moment().diff(initTimeMoment, "minutes");
  console.log(timeSinceFirstTrain);

  return frequency - (timeSinceFirstTrain % frequency);
};

/**
 * Adds a row of data to the train table
 * @param {string} line - Train line
 * @param {string} frequency - Arrival frequency in minutes
 * @param {string} destination - Train's final destination
 * @param {string} nextArrival - When the next train will be arriving
 * @param {string} minutesAway - How many minutes away the next train is
 */
const addRow = (line, frequency, destination, nextArrival, minutesAway) => {
  // Initialize row
  const $row = $("<tr>");
  
  // Populate cell data
  const $line = $("<td>").text(line);
  const $frequency = $("<td>").text(frequency);
  const $destination = $("<td>").text(destination);
  const $nextArrival = $("<td>").text(nextArrival);
  const $minutesAway =$("<td>").text(minutesAway);

  // Append data to row
  $row.append($line);
  $row.append($destination);
  $row.append($frequency);
  $row.append($nextArrival);
  $row.append($minutesAway);

  // Append row to table
  $("#train-data").append($row);
}