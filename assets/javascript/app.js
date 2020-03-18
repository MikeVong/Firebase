// the config link
var config = 
    {
    apiKey: "AIzaSyD26xyAX0PqXwvhpgHNtrji9Mxnq2l5jxU",
    authDomain: "my-first-78dfe.firebaseapp.com",
    databaseURL: "https://my-first-78dfe.firebaseio.com",
    projectId: "my-first-78dfe",
    storageBucket: "my-first-78dfe.appspot.com",
    };
// starting the firebase config
firebase.initializeApp(config);
  
  
// Create a variable to reference the database
var database = firebase.database();

//startup var
var name = "";
var desti = "" ;
var first = "";
var freq = 0;


// show current time
function currentTime() 
    {
    var current = moment().format("LT");
    $("#current-time").html(current);
    };
// run current time
currentTime();

// reload the page every minute
setInterval(function() {
    window.location.reload();
  }, 60000);

// get the info from the form on summit click
$("#run-search").on("click", function(event) 
    {
    event.preventDefault();
    //grabing info in each form entry
    var name = $("#trainName").val().trim();
    var desti = $("#destination").val().trim();
    var first = $("#time").val().trim();
    var freq = $("#frequency").val().trim();

    // push data into the firebase in array
    database.ref().push({
        name : name,
        desti : desti,
        first : first,
        freq : freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });

// displaying the table
database.ref().on("child_added", function(response)
    {
    // time conversion
    var fConverted = moment(response.val().first, "hh:mm").subtract(1, "years");
    console.log(fConverted);
    var tDiff = moment().diff(moment(fConverted), "minutes");
    console.log(tDiff);
    var tRemain = tDiff % response.val().freq;
    console.log(tRemain);
    var arrival = response.val().freq - tRemain;
    console.log(arrival);
    var nextTrain = moment().add(arrival, "minutes");
    console.log(nextTrain);
    // displaying info in a row
    var newRow = $("<tr>");
    newRow.append($("<td>" + response.val().name + "</td>"));
    newRow.append($("<td>" + response.val().desti + "</td>"));
    newRow.append($("<td>" + response.val().freq + "</td>"));
    newRow.append($("<td>" + moment(nextTrain).format("LT") + "</td>"));
    newRow.append($("<td>" + arrival + "</td>"));
    // adding remove button
    var remove = response.key;
    var newBtn =$("<button>");
    newBtn.attr("data-key", remove);
    newBtn.addClass("btn btn-outline-danger");
    newBtn.text("x");
    newRow.append(newBtn);

    //push to html
    $("#train-section").prepend(newRow);

    }, function(errorObject) 
        {
        console.log("The read failed: " + errorObject.code);
        });
//remove child from database and reload
$(document).on("click", ".btn-outline-danger", function()
    {
    var removeX = $(this).attr("data-key");
    database.ref().child(removeX).remove();
    window.location.reload();
    })