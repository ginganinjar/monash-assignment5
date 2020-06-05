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



var Goback = 0;

function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}

function showThisDay(x){

    // if this has come from the user it will have a zero x
    // if that's the case, remove all active elements and start again.
  
    if (x !== 0) {
        $(".plannerBoxTab").remove();
        $(".plannerBoxEven").remove();
        $(".plannerBoxOdd").remove();
                 }

// lets do all 24 hours in the day. x
 for (i = 0; i < 24; i++) {   
  
  
   var controlTab = $("<div>");
    controlTab.attr("class", "plannerBoxTab");
    controlTab.attr("id","timeID" + i); 
    var doTime = i;
    
      if (i === 12) {doTime = 12 + "pm";}
      if (i < 12) {doTime = i + "am";}
      if (i === 0) {doTime = 12 + "am"};
      if (i > 12) {doTime = (i - 12) + "pm";} 
      
      controlTab.text(doTime);
      $("#dplanner").append(controlTab);
 

    var plannerBox = $("<div>");
   if (isEven(i)) {
   plannerBox.attr("class", "plannerBoxEven");} else {plannerBox.attr("class", "plannerBoxOdd");}
    //plannerBox.text("Daily planner");
    $("#dplanner").append(plannerBox);

        // create control tab

 }
 
 $("#timeID9")[0].scrollIntoView();

}


function setupPage(x) {
  
    // the month today

    if (x === 0) {
        Goback = 0;
      }

    if (x === -1) {
        Goback ++;
        $(".dayinMomth").remove();
    }
    if (x === + 1) {
        Goback --;
        $(".dayinMomth").remove();
    }
       // the true month
       var theTrueMonth = [parseInt(moment().subtract(0, 'month').format('MM'))];
       var theTrueMonth = theMonths[theTrueMonth - 1];

        // the true year
        var theTrueYear = parseInt(moment().subtract(0, 'month').format('YYYY')); 
    
        // the month today +/- mod
        var theMonthNumber = [parseInt(moment().subtract(Goback, 'month').format('MM'))];
        var theMonth = theMonths[theMonthNumber - 1];

        // the year today +/- mod
        var theYear = parseInt(moment().subtract(Goback, 'month').format('YYYY'));
        // the day today +/- mod
        var theDay = parseInt(moment().subtract(Goback, 'month').format('DD'));
  
        // do a strip of the first day of the month - Sun Mar 01 2020 00:00:00 GMT+1100
        var findMyFirstDay = moment([theYear, theMonthNumber - 1]).toString();
        var dateArray = findMyFirstDay.split(" ");
       
        // for some reason the value in a loop would not resolve
        // had to do it manually like below, which is aweful i know 
        // but i couldn't work out any other way.

        if (dateArray[0] === "Sun") {dow = 0;}
        if (dateArray[0] === "Mon") {dow = 1;}
        if (dateArray[0] === "Tue") {dow = 2;}
        if (dateArray[0] === "Wed") {dow = 3;}
        if (dateArray[0] === "Thu") {dow = 4;}
        if (dateArray[0] === "Fri") {dow = 5;}
        if (dateArray[0] === "Sat") {dow = 6;}
                
        console.log("FIRST day of the week is" + dow);
        console.log("the current day" + theDay);
        console.log("the current month" + theMonth);

  $("#theMonth").html("<p>" + theMonth + " " + theYear + "</p>") ;
     
  var thisMonthHasHowMany = parseInt(moment().daysInMonth());
  var thisDayDiv; 
  

    // 7 * 5 = 35 - the total number of squares in any given month
    for (i=0;i < 35; i ++) {

      thisDayDiv = $("<div>");
       thisDayDiv.addClass("dayinMomth");
      
       // based on the way that the callender works, we want to roll out days
       // based on the correct start of the week.
      if (i >= dow && i <= thisMonthHasHowMany) {
        
         thisDayDiv.text((i + 1) - dow);
         thisDayDiv.attr("data-month",theMonth );
         thisDayDiv.attr("data-year",theYear );
     // if this block is the current day, give it a different backgdound
       
        if (i === parseInt(theDay) && theTrueMonth === theMonth && theTrueYear === theYear) {
            thisDayDiv.css("background-color","#dce6f1");
          } else {
            thisDayDiv.css("background-color","white");
                    }

          thisDayDiv.css("cursor","pointer");
            } else {thisDayDiv.text("");
            thisDayDiv.css("background-color","#eff0f1");
                     }
                thisDayDiv.attr("id",i);
                 thisDayDiv.click(function(){
                 var thisDate = [i + 1];
                    showThisDay (this.id);
                
            })

            $("#thedays").append(thisDayDiv);
            
          

    }
}

setupPage(0);
showThisDay(0);


$(".prev").click(function(){setupPage(-1);});
$(".next").click(function(){setupPage(1);});

// reset back to today.
$("#showNow").click(function(){
  $(".dayinMomth").remove();setupPage(0);});

console.log( "ready!" );
});

