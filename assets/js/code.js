// thoughts
// the structure scheme for a calender shiuld essentially consist of two timestamps. from the begining of the sceduled meeting to the end

// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist
// ```


$(document).ready(function() {


var  theMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


 function dateStart () { 
  var first = moment().startOf('month');
  switch(first.day()) {
      case 6:
          return first.add(2, 'days');
      case 0:
          return first.add(1, 'days');
      default:
          return first;
  };
}

function setupPage() {
  
  var theDay = [parseInt(moment().day())];
  var theMonth = theMonths [parseInt(moment().month())];
  var theYear = [parseInt(moment().year())];
  var theFirstWeekday = dateStart();
  
  const date = moment().startOf('month'); // Thursday Feb 2015
  const dow = date.day();

  console.log ("First day of the month is " + Math.floor(dow));


  console.log("the current day" + theDay);
  console.log("the current month" + theMonth);
  $("#theMonth").html("<p>" + theMonth + " " + theYear + "</p>") ;
  var thisMonthHasHowMany = parseInt(moment().daysInMonth());
  var thisDayDiv; 


  // theTotalToStart is used to start showing dates at the correct and first day of the month.
    var theTotalToStart = thisMonthHasHowMany + Math.floor(dow);


    // 7 * 5 = 35 - the total number of squares in any given month
    for (i=0;i < 35; i ++) {

      thisDayDiv = $("<p>");
       thisDayDiv.addClass("dayinMomth");
      
      if (i >= Math.floor(dow) && i <= thisMonthHasHowMany) {
          thisDayDiv.text(i);
            thisDayDiv.css("background-color","cornsilk");
        
            } else {thisDayDiv.text("");}
      
        $("#thedays").append(thisDayDiv);

    }
}

setupPage();


console.log( "ready!" );
});