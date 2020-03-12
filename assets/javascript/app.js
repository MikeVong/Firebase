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


      
    function startTime() 
        {
            function checkTime(i) 
            {
            if (i < 10) 
                {
                i = "0" + i;
                }
            return i;
            }
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        // add a zero in front of numbers<10
        m = checkTime(m);
        s = checkTime(s);
        $("#current-time").text("Time: " + h + ":" + m + ":" + s )
        t = setTimeout(function() 
            {startTime()}, 500);
        }
    startTime();











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

    //var minAway = parseInt(first) + parseInt(freq)

    
    list.push(name);
    list.push(dest);
    list.push(first);
    list.push(freq);
    list.push(time);

    console.log(list);
    //render(list);

    localStorage.setItem("train", name);
    localStorage.setItem("dest", dest);
    localStorage.setItem("first", first);
    localStorage.setItem("freq", freq);


    });
    var sTrain = localStorage.getItem("train");
    var sDest = localStorage.getItem("dest");
    var sFirst = localStorage.getItem("first");
    var sFreq = localStorage.getItem("freq");

    localStorage.setItem("train-list", JSON.stringify(list));

    $("#train-section").prepend("<td>"+"<button>"+" X "+"</button>"+sTrain+"</td>"+"<td>"+sDest+"</td>"+"<td>"+sFreq+"</td>"+"<td>"+sFirst+"</td>"+"<td>"+20 +"</td>");


//list = JSON.parse(localStorage.getItem("train-list"));



function render(list)
   {
    for( var i = 0; i<list.length; i++)
        {
           // $("#train-section").empty();
           
            var td = $("<td>");
            td.text(list[i]);

            //var removeBtn = $("<button>");
            //removeBtn.addClass("remove");
            //removeBtn.text("✓");

            //td = td.prepend(removeBtn);
            $("#train-section").append(td);
        };
   };

 //render(list);