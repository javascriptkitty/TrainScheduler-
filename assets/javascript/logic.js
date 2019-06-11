var config = {
  apiKey: "AIzaSyAHhYcvCBq1RoTk1SzfAfD_CxrY-lGNvQc",
  authDomain: "test-970a0.firebaseapp.com",
  databaseURL: "https://test-970a0.firebaseio.com",
  projectId: "test-970a0",
  storageBucket: "test-970a0.appspot.com",
  messagingSenderId: "1054197505823",
  appId: "1:1054197505823:web:3b5e1d318b239bf3"
};

firebase.initializeApp(config);
var database = firebase.database();

var trainName;
var trainDestination;
var firstTrain;
var trainFrequency;
var newTrain = {};

$("#addTrain").on("click", function(event) {
  event.preventDefault();

  trainName = $("#name-input")
    .val()
    .trim();
  trainDestination = $("#destination-input")
    .val()
    .trim();
  firstTrain = $("#firstTrain-input")
    .val()
    .trim();

  trainFrequency = parseInt(
    $("#frequency-input")
      .val()
      .trim()
  );

  // creates local "temporary" object for holding train data
  newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTrain: firstTrain,
    frequency: trainFrequency
  };

  // Uploads data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on(
  "child_added",
  function(childSnapshot) {
    console.log(childSnapshot.val());

    trains.push({
      name: childSnapshot.val().name,
      destination: childSnapshot.val().destination,
      firstTrain: childSnapshot.val().firstTrain,
      frequency: childSnapshot.val().frequency
    });

    renderTrains();
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);

function renderTrains() {
  $("#timeTable > tbody").empty();
  for (var i = 0; i < trains.length; i++) {
    renderTrain(trains[i]);
  }
}

function renderTrain(train) {
  var storeTrainName = train.name;
  var storeTrainDestination = train.destination;
  var storeFirstTrain = train.firstTrain;
  var storeTrainFrequency = train.frequency;

  var firstDateTime = moment("01-01-2019 " + storeFirstTrain);
  var currentDateTime = moment();

  var timeDiff = currentDateTime.diff(firstDateTime, "minutes");

  var reminder = timeDiff % storeTrainFrequency;
  var minutesLeft = storeTrainFrequency - reminder;
  var nextTrain = moment()
    .add(minutesLeft, "minutes")
    .format("hh:mm a");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(storeTrainName),
    $("<td>").text(storeTrainDestination),
    $("<td>").text(storeTrainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesLeft)
  );

  // Append the new row to the table
  $("#timeTable > tbody").append(newRow);
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#firstTime-input").val("");
  $("#frequency-input").val("");
}

var trains = [];
setInterval(renderTrains, 30000);
