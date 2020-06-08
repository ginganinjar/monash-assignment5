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
var thisDay = moment().format('DDMMY');
var rightNow = moment().format('DDMMY');
var niceDateAndTime;

var Goback = 0;

function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}

function doYourPlanningMagic(whichWay) {

  $("#hiddenInputBox").css("visibility","visible");
  
    // set up edit box.

    var forwardedDiv = document.getElementById(whichWay);
    theTime = forwardedDiv.getAttribute('data-time');
    $("#todaysDate").text("Enter task for " + niceDateAndTime + " at " + theTime);
    
    
    // make the data/time go away.
    $("#cancelEdit").click(function() {
      $("#hiddenInputBox").css("visibility","hidden");  
    })



}

function showThisDay(x){

// variable to determine if we are looking at today or any other day
var weAreHome = false;

  varRightNow = moment();
    varRightHour = varRightNow.hour();
      console.log("right now " + varRightHour);

    // if this has come from the window it will have a zero x
    // if that's the case, remove all active elements and start again.
  
    if (x.length > 2) {
      thisDay = x;
        
          // because javascript is like coding with a potato, and because the artifical placement
          // of a 0 in front of the i integer from the sender is still traunicated, and because
          // regix no longer works, I have to manually look for date ranges that are 7 as opposed 
          // to 8. and upon finding this, add it back into the string.
         
           if (thisDay.length == 7) {
            thisDay = "0" + thisDay;
          }      
        }

       


    if (x !== 0) { $(".killme").remove(); } //this resets the callander in light of a new cycle. 
    if (x === 0) { weAreHome = true;} // meaning that we are on the same day as the events we wish to see.
      
      // -1 and + 1 are used for plus month next and prev tabs
      // this information (the date) is stored in global variable - this day
    
    // this detects a referral augment for a month
    if ((x === -1) || (x === +1)) { $(".killme").remove(); x= thisDay}
    
      now = parseInt(moment().format('DDMMY')).toString();
 
    // set up master date
    // nice date and time used globally
    niceDateAndTime =  moment(thisDay.substr(2, 2) + "-" + thisDay.substr(0,2) + "-" + thisDay.substr(4,4 )).format('dddd, MMMM Do YYYY') ;
    $("#currentDay").html("<b>" + niceDateAndTime + "</b>") ;

      if (x.toString().search(now) !== -1) {
        weAreHome = true;
        console.log ("match found");};

      // so now we have our desired date - we need to search local storage
      // for events corresponding with ThisDay


        // lets do all 24 hours in the day. x
 
        // for class purposes, we need to check if the date we are currently viewing, is before today
        // or after today.
        // time that is in the past will result in a blocked cell. time in the future will use the
        // even and odd visuals.

        var isPast = false;      
          if (moment(thisDay.substr(2, 2) + "-" + thisDay.substr(0,2) + "-" + thisDay.substr(4,4 )  ).isAfter( rightNow.substr(2, 2) + "-" + rightNow.substr(0,2) + "-" + rightNow.substr(4,4 )) === true) {
           isPast = true;
              }


  for (i = 0; i < 24; i++) {   
  
  
    var controlTab = $("<div>");
    controlTab.attr("class", "plannerBoxTab killme");
    controlTab.attr("id","timeID" + i); 
    var doTime = i;
    
      if (i === 12) {doTime = 12 + "pm";}
      if (i < 12) {doTime = i + "am";}
      if (i === 0) {doTime = 12 + "am"};
      if (i > 12) {doTime = (i - 12) + "pm";} 
      
      controlTab.text(doTime);
      $("#dplanner").append(controlTab);
 
    // Create the planner box.

    var plannerBox = $("<div>");
   
   
    
    if (isEven(i)) { plannerBox.attr("class", "plannerBoxEven killme");} 
    else 
    { plannerBox.attr("class", "plannerBoxOdd killme"); }
   
    if ((i < varRightHour) && (isPast == false)) { 
      plannerBox.attr("class", "plannerBoxPast killme"); 
   
    }
    if ((i === varRightHour) && (weAreHome)) { 
      plannerBox.attr("class", "plannerBoxNow killme");
    }
    plannerBox.attr("id","pboxID"+ i);
    plannerBox.attr("data-time",doTime);
 

      $("#dplanner").append(plannerBox); // main box
      $("#pboxID"+i).click(function () {doYourPlanningMagic(this.id, doTime); });

 
    
  
  }
 
 $("#timeID9")[0].scrollIntoView();

}


function setupPage(x) {
  

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

        // the momth and year
        var parseThis = moment().subtract(Goback, 'month').format('MM') + moment().subtract(0, 'month').format('YYYY'); 
    
        // the month today +/- mod
        var theMonthNumber = [parseInt(moment().subtract(Goback, 'month').format('MM'))];
        var theMonth = theMonths[theMonthNumber - 1];

        // the year today +/- mod
        var theYear = parseInt(moment().subtract(Goback, 'month').format('YYYY'));
        // the day today +/- mod
        var theDay = moment().subtract(Goback, 'month').format('DD'); 

        // set global variable
        thisDay = moment().subtract(Goback, 'month').format('DD') + moment().subtract(Goback, 'month').format('MM') + theYear;

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
                
  $("#theMonth").html("<p>" + theMonth + " " + theYear + "</p>") ;
     
  var thisMonthHasHowMany = parseInt(moment().daysInMonth());
  var thisDayDiv; 
  

    // 7 * 5 = 35 - the total number of squares in any given month
    for (i=0;i < 35; i ++) {

      thisDayDiv = $("<div>");
       
      
       // based on the way that the callender works, we want to roll out days
       // based on the correct start of the week so we add the day of the week (dow) to the counter
       // before we start showing the actual days.
       
      if (i >= dow && i <= thisMonthHasHowMany) {
        thisDayDiv.addClass("dayinMomth daysToDelete");
         thisDayDiv.text((i + 1) - dow);
     // if this block is the current day, give it a different backgdound
       
        if (i === (parseInt(theDay) + dow) - 1) {
            thisDayDiv.css("background-color","#dce6f1");
          } else {
            thisDayDiv.css("background-color","white");
                    }

          thisDayDiv.css("cursor","pointer");
          // this div presents the days of the month that are active.
          thisDayDiv.click(function()
          {
            $(".daysToDelete").css("background","#fff");
            $(this).css("background", "#dce6f1");
            showThisDay (this.id);
          
          })} 
          
          else 
        
            {
              thisDayDiv.addClass("dayinMomth");
              thisDayDiv.text("");
              thisDayDiv.css("background-color","#eff0f1");
            }
                    
                thisDayDiv.attr("id",((i - dow) + 1) + parseThis);

            $("#thedays").append(thisDayDiv);
             }
   
    showThisDay(x);

}

setupPage(0);



$(".prev").click(function(){setupPage(-1);});
$(".next").click(function(){setupPage(1);});

// reset back to today.
$("#showNow").click(function(){
  $(".dayinMomth").remove();
  $(".killme").remove();
  
  setupPage(0);});

console.log( "ready!" );
});

