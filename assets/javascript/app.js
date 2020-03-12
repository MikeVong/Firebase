/* 
  
* Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).

* Try adding `update` and `remove` buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).

* As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.
*/
    var trainName = "";
    var destination = "" ;
    var firstTrain = 0;
    var frequency = 0;
    var list= [];
    var time = new Date();
    var h = time.getHours();
    var m = time.getMinutes();


    $("#current-time").text(h +" : " + m);

    








$("#run-search").on("click", function(event) 
    {
    event.preventDefault();

    var name = $("#trainName").val();
    var dest = $("#destination").val();
    var first = $("#time").val();
    var freq = $("#frequency").val();

    console.log("Train Name : " + name);
    console.log("Destination : " + dest);
    console.log("First Train : " + first);
    console.log("Frequency : " + freq);

    var minAway = parseInt(first) + parseInt(freq)

    
    list.push(name);
    list.push(dest);
    list.push(first);
    list.push(freq);
    list.push(time);

    console.log(list);
    render(list);

    //$("#train-section").prepend("<td>"+name+"</td>"+"<td>"+dest+"</td>"+"<td>"+first+"</td>"+"<td>"+freq+"</td>"+"<td>"+20 +"</td>");
    });





function render(list)
   {
    for( var i = 0; i<list.length; i++)
        {
            //$("#train-section").empty();

            var td = $("<td>");
            td.text(list[i]);

            $("#train-section").append(td);
        };
   };

 