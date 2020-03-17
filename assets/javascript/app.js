var config = 
    {
    apiKey: "AIzaSyD26xyAX0PqXwvhpgHNtrji9Mxnq2l5jxU",
    authDomain: "my-first-78dfe.firebaseapp.com",
    databaseURL: "https://my-first-78dfe.firebaseio.com",
    projectId: "my-first-78dfe",
    storageBucket: "my-first-78dfe.appspot.com",
    };
  
firebase.initializeApp(config);
  
  
// Create a variable to reference the database
var database = firebase.database();


var name = "";
var desti = "" ;
var first = "";
var freq = 0;



function currentTime() 
    {
    var current = moment().format("hh:mm");
    $("#current-time").html(current);
    setTimeout(currentTime, 1000);
    };

currentTime();


$("#run-search").on("click", function(event) 
    {
    event.preventDefault();

    var name = $("#trainName").val().trim();
    var desti = $("#destination").val().trim();
    var first = $("#time").val().trim();
    var freq = $("#frequency").val().trim();

    console.log("Train Name : " + name);
    console.log("Destination : " + desti);
    console.log("First Train : " + first);
    console.log("Frequency : " + freq);

    database.ref().push(
        {
        name : name,
        desti : desti,
        first : first,
        freq : freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });



    



database.ref().on("child_added", function(response)
    {
        var fConverted = moment(response.val().first, "hh:mm").subtract(1, "years");
        var tDiff = moment().diff(moment(fConverted), "minutes");
        var tRemain = tDiff % response.val().freq;
        var arrival = response.val().freq - tRemain;
        var nextTrain = moment().add(arrival, "minutes");




        var newRow = $("<tr>");
        newRow.append($("<td>" + response.val().name + "</td>"));
        newRow.append($("<td>" + response.val().desti + "</td>"));
        newRow.append($("<td>" + response.val().freq + "</td>"));
        newRow.append($("<td>" + moment(nextTrain).format("LT") + "</td>"));
        newRow.append($("<td>" + arrival + "</td>"));

        $("#train-section").prepend(newRow);


        //$("#train-section").prepend("<tr>"+"<td>"+"<span>"+"<button>"+" X "+"</button>"+"</span>"+sTrain+"</td>"+"<td>"+sDest+"</td>"+"<td>"+sFreq+"</td>"+"<td>"+sFirst+"</td>"+"<td>"+nextTrain +"</td>"+"</tr>");


    })