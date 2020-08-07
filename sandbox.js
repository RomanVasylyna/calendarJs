
//Global Variables
let monthCounter = new Date().getMonth();
let yearCounter = new Date().getFullYear();

//Onload calendar
function initCalendar() {
onLoad(); //Calendar Header
showWeekDays(); //First Row with Days
blankTds(); //Create Empty Tds
matchDays();
currentDate(); //Highlight Current Date
document.querySelector('.prev').addEventListener('click', prevMonth);
document.querySelector('.next').addEventListener('click', nextMonth);
}

//Basic Calendar Onload
function onLoad() {
getMonth();
getYear();
getDay();
}

//First Row with days of Week
function showWeekDays() {
let daysArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let parent = document.querySelector('.calendar');
let tr = document.createElement('tr');
for(let i = 0; i < daysArr.length; i++) {
let td = document.createElement('td');
td.innerHTML = daysArr[i];
td.classList.add('week-day');
if(td.innerHTML == 'Sat' || td.innerHTML == 'Sun') {td.style.cssText = 'color:red'};
tr.appendChild(td);
}
parent.appendChild(tr);
}

//Create Blank Tds
function blankTds() {
let parent = document.querySelector('.calendar');
for(let i = 0; i < 6; i++) {
let tr = document.createElement('tr');
for(let j = 0; j < 7; j++) {
let td = document.createElement('td');
td.classList.add('week-date');
tr.appendChild(td);
}
parent.appendChild(tr);
}
}

//Return Month Array
function monthArr() {
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
return months;
}

//Display Month
function getMonth() {
  let date = new Date();
  document.querySelector('.month').innerHTML = monthArr()[date.getMonth()] + ' ' + date.getDate();
}

//Display Year
function getYear() {
let date = new Date();
document.querySelector('.year').innerHTML = date.getFullYear();
}

//Get Current Day
function getDay() {
 let daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 let currentDay = new Date().getDay();
 for(let i = 0; i < daysArr.length; i++) {
  document.querySelector('.day').innerHTML = daysArr[currentDay];
 }
}

//Show Prev Month/Year
function prevMonth() {
clearTable(); //Clear table
--monthCounter; //Month before
if(monthCounter == -1) {monthCounter = 11}; //If month array has ended switch to December
matchDays(); //Fill Tds
removeEvent(); //Remove Event From Current Date
document.querySelector('.day').innerHTML = '';
document.querySelector('.month').innerHTML =  monthArr()[monthCounter];

if(document.querySelector('.month').innerHTML == 'December') {
document.querySelector('.year').innerHTML = --yearCounter;
} //clearTable();
matchDays();


//Catching Current Month
if(document.querySelector('.month').innerHTML == monthArr()[new Date().getMonth()]
&& document.querySelector('.year').innerHTML == new Date().getFullYear()) {
returnToCurrent();
};

}

//Match First Day to Week Day
function matchDays() {
let firstDay = new Date(yearCounter, monthCounter, 1);
let start = firstDay.getDay() - 1;
let tds = document.querySelectorAll('.week-date');
for(let i = start; i < numberOfDays() + start; i++) {
tds[i].innerHTML = addZero(i - start + 1);
tds[i].addEventListener('mouseover', addHover);
tds[i].addEventListener('mouseout', removeHover);
}
console.log(firstDay);
console.log(start);
}

//Return to current month
function returnToCurrent() {
onLoad();
matchDays();
currentDate();
}

//Show Next Month/Year
function nextMonth() {
  monthCounter ++;
  if (monthCounter == 12) {monthCounter = 0};
  clearTable();
  //matchDays();
  removeEvent();
  document.querySelector('.day').innerHTML = '';
  document.querySelector('.month').innerHTML =  monthArr()[monthCounter];
  if(document.querySelector('.month').innerHTML == 'January') {
  document.querySelector('.year').innerHTML = ++yearCounter;
}if(document.querySelector('.month').innerHTML == monthArr()[new Date().getMonth()]
  && document.querySelector('.year').innerHTML == new Date().getFullYear()) {
returnToCurrent();
  };
}


//Amount of Days in current Month
function numberOfDays() {
    return new Date(yearCounter, monthCounter+1, 0).getDate();
}


//Add/Remove Hover to/from Tds
function addHover() {
this.style.cssText = 'background-color:rgb(255, 77, 0); border-radius:50%;';
}

function removeHover() {
this.style.cssText = '';
}

//Clearing all tds
function clearTable() {
  let tds = document.querySelectorAll('.week-date');
  for(let i = 1; i < tds.length; i++) {
    if(tds[i].classList.contains('week-date')) {
      tds[i].innerHTML = '';
    }
  }
}

//Remove Highlight Event
function removeEvent() {
  let tds = document.querySelectorAll('.week-date');
  for(let i = 0; i < tds.length; i++) {
  tds[i].style.cssText = '';
  }
}

//Add Zero to date
function addZero(elem) {
return (elem < 10) ? elem = '0' + elem : elem;
}


//Highlight Current Date
function currentDate() {
  let tds = document.querySelectorAll('td');
  let date = new Date().getDate();
  for(let i = 0; i < tds.length; i++) {
  if(tds[i].innerHTML == date) {
  tds[i].style.cssText = 'background-color:green;color:white;border-radius:50%';
  tds[i].removeEventListener('mouseover', addHover);
  tds[i].removeEventListener('mouseout', removeHover);
  }
}
}
