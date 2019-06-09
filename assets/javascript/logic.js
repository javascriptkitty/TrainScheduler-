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

$("#addTrain").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#name-input")
    .val()
    .trim();
  var trainDestination = $("#destination-input")
    .val()
    .trim();
  var trainFirstTime = moment(
    $("#firstTime-input")
      .val()
      .trim(),
    "MM/DD/YYYY"
  ).format("X");
  var trainFrequency = $("#frequency-input")
    .val()
    .trim();

  // creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTime: trainFirstTime,
    frequency: trainFrequency
  };

  // Uploads data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.Destination);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#firstTime-input").val("");
  $("#frequency-input").val("");
});
