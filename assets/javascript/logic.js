
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBh57FNtZ-WsmUJKac5bPEtQ5sQjgVATug",
    authDomain: "airlinetimetable.firebaseapp.com",
    databaseURL: "https://airlinetimetable.firebaseio.com",
    projectId: "airlinetimetable",
    storageBucket: "",
    messagingSenderId: "6556396002"
  };

firebase.initializeApp(config);




var database = firebase.database();


// Button for adding Flights
$("#add-flight-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var airlineName = $("#airline-name-input").val().trim();
  var flightDestination = $("#destination-input").val().trim();
  var firstFlight = moment($("#first-flight-input").val().trim(), "HH:mm").format("HH:mm");
  var flightFrequency = $("#frequency-input").val().trim();


  // Creates local "temporary" object for holding flight data
  var newFlight = {
    name: airlineName,
    desistination: flightDestination,
    first: firstFlight,
    frequency: flightFrequency
  };

  // Uploads flight data to the database
  database.ref().push(newFlight);

  console.log("After Push: " + newFlight.airlineName);
  console.log(newFlight.flightDestination);
  console.log(newFlight.firstFlight);
  console.log(newFlight.flightFrequency);

  

  // Alert
  alert("Flight successfully added");

  // Clears all of the text-boxes
  $("#airline-name-input").val("");
  $("#destination-input").val("");
  $("#first-flight-input").val("");
  $("#frequency-input").val("");

});

// Adding flights to the database
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var airlineName = childSnapshot.val().name;
  var flightDestination = childSnapshot.val().desistination;
  var firstFlight = childSnapshot.val().first;
  var flightFrequency = childSnapshot.val().frequency;

  // Flight Info
  console.log(airlineName);
  console.log(flightDestination);
  console.log(firstFlight);
  console.log(flightFrequency);

  // Cleaning up 
  var firstFlightClean = moment.unix(firstFlight).format("HH:mm");

  // Setting current time into a variable
  var currentTime = moment().format("HH:mm");

  console.log("Current Time: " + currentTime);

  // Finding difference in time an storing in a variable
  var timeDifference = moment().diff(moment(firstFlightClean), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDifference);

  var tRemainder = timeDifference % flightFrequency;
    console.log(tRemainder);



  // Add each train's data into the table
  $("#flight-table > tbody").append("<tr><td>" + airlineName + "</td><td>" + flightDestination + "</td><td>" +
  flightFrequency + " mins" + "</td><td>");
});