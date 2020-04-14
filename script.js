let clock = document.getElementById("clock");

let liveTimer = document.getElementById("liveTimer");
let timerIsOn = false;
let timeoutTimer;

const startSignal = document.getElementById("signal");
const prepPlusButton = document.getElementById("prep-plus-btn");
const prepMinusButton = document.getElementById("prep-minus-btn");

const workPlusButton = document.getElementById("work-plus-btn");
const workMinusButton = document.getElementById("work-minus-btn");

const restPlusButton = document.getElementById("rest-plus-btn");
const restMinusButton = document.getElementById("rest-minus-btn");

const cyclesPlusButton = document.getElementById("cycles-plus-btn");
const cyclesMinusButton = document.getElementById("cycles-minus-btn");

const restcyPlusButton = document.getElementById("restcy-plus-btn");
const restcyMinusButton = document.getElementById("restcy-minus-btn");

let timeoutPlusMinusButtons;

let elapsedTime = 0;

let minutes;
let seconds;
let cyclesNumber;

let totalTimer;

let accelerator = 200;
let acceleratorDelay = 0;

function currentTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    clock.innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(currentTime, 1000);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

const calculateTotalTimer = () => {
    totalTimer = minutes*60 + seconds;
}

const startSignalPressed = () => {
  if(timerIsOn){
    clearTimeout(timeoutTimer);
    elapsedTime = 0;
  }
  timerIsOn = true;
  calculateTotalTimer();
  liveTimerUpdate();
  
}

const liveTimerUpdate = () => {
  
  const result = totalTimer - elapsedTime;
  liveTimer.innerHTML = result;
  elapsedTime++;

  if(result === 0){
      elapsedTime = 0;
      timerIsOn = false;
      return;
  }

  timeoutTimer = setTimeout(liveTimerUpdate, 1000);

}

const cyclesPlusButtonPressed = () => {
  const label = document.getElementsByClassName(event.target.className)[0]
  cyclesNumber = Number(label.innerHTML);

  const inc_dec = true;

  increment(label, 1);

  timeoutPlusMinusButtons = setTimeout(accelerate, 400, label, inc_dec);
}

const cyclesMinusButtonPressed = () => {
  const label = document.getElementsByClassName(event.target.className)[0]
  cyclesNumber = Number(label.innerHTML);

  const inc_dec = false;

  decrement(label, 1);

  timeoutPlusMinusButtons = setTimeout(accelerate, 400, label, inc_dec);
}

const plusButtonPressed = (event) => {

  const label = document.getElementsByClassName(event.target.className)[0]

  minutes = Number(label.innerHTML.substring(0,2));
  seconds = Number(label.innerHTML.substring(3,5));

  const inc_dec = true;
  
  incrementTime(label, 1);

  timeoutPlusMinusButtons = setTimeout(accelerateTimers, 400, label, inc_dec);

}

const minusButtonPressed = (event) => {

  const label = document.getElementsByClassName(event.target.className)[0]

  minutes = Number(label.innerHTML.substring(0,2));
  seconds = Number(label.innerHTML.substring(3,5));

  const inc_dec = false;
  
  decrementTime(label, 1);

  timeoutPlusMinusButtons = setTimeout(accelerateTimers,400, label, inc_dec);

}

const accelerateTimers = (object, inc_dec) => {
  if (inc_dec === true){
    acceleratorDelay < 40 ? incrementTime(object, 1): incrementTime(object, 10);
  }else{
    acceleratorDelay < 40 ? decrementTime(object, 1): decrementTime(object, 10);   
  }

  if (accelerator > 101){
    accelerator = accelerator - 5;
  }else if (acceleratorDelay < 40){
    acceleratorDelay++;
  }

  timeoutPlusMinusButtons = setTimeout(accelerateTimers, accelerator, object, inc_dec);

}

const accelerate = (object, inc_dec) => {
  if (inc_dec === true){
    acceleratorDelay < 40 ? increment(object, 1): increment(object, 10);
  }else{
    acceleratorDelay < 40 ? decrement(object, 1): decrement(object, 10);   
  }

  if (accelerator > 101){
    accelerator = accelerator - 5;
  }else if (acceleratorDelay < 40){
    acceleratorDelay++;
  }

  timeoutPlusMinusButtons = setTimeout(accelerate, accelerator, object, inc_dec);

}

const incrementTime = (object, value) => {
  seconds += value;
  if (seconds >= 60){
    seconds = 0;
    minutes += 1;
  }

  object.innerHTML = convertToString(minutes) + ":" + convertToString(seconds);
}

const decrementTime = (object, value) => {
  totTime = minutes*60 + seconds - value;
  if(totTime >= 0){
    minutes = Math.floor(totTime / 60);
    seconds = totTime % 60;
  }else{
    minutes = 0;
    seconds = 0;
  }

  object.innerHTML = convertToString(minutes) + ":" + convertToString(seconds);

}

const increment = (object, value) => {
  cyclesNumber = convertToString(Number(cyclesNumber) + value); 
  object.innerHTML = cyclesNumber;

}

const decrement = (object, value) => {
  if (cyclesNumber > value){
    cyclesNumber = convertToString(Number(cyclesNumber) - value);
    object.innerHTML = cyclesNumber;
  }else{
    object.innerHTML = "01";
  }
}


const convertToString = (value) => {
  if(value.toString().length === 1)
    return "0" + value;
  else
    return value.toString();
}

const clearPrepTimers = () => {
  clearTimeout(timeoutPlusMinusButtons);
  accelerator = 200;
  acceleratorDelay = 0;
}

window.addEventListener("load", currentTime);
startSignal.addEventListener("click", startSignalPressed);

prepMinusButton.addEventListener("mousedown", minusButtonPressed);
prepPlusButton.addEventListener("mousedown", plusButtonPressed);

prepMinusButton.addEventListener("mouseup", clearPrepTimers);
prepMinusButton.addEventListener("mouseleave", clearPrepTimers);

prepPlusButton.addEventListener("mouseup", clearPrepTimers);
prepPlusButton.addEventListener("mouseleave", clearPrepTimers);


workMinusButton.addEventListener("mousedown", minusButtonPressed);
workPlusButton.addEventListener("mousedown", plusButtonPressed);

workMinusButton.addEventListener("mouseup", clearPrepTimers);
workMinusButton.addEventListener("mouseleave", clearPrepTimers);

workPlusButton.addEventListener("mouseup", clearPrepTimers);
workPlusButton.addEventListener("mouseleave", clearPrepTimers);


restMinusButton.addEventListener("mousedown", minusButtonPressed);
restPlusButton.addEventListener("mousedown", plusButtonPressed);

restMinusButton.addEventListener("mouseup", clearPrepTimers);
restMinusButton.addEventListener("mouseleave", clearPrepTimers);

restPlusButton.addEventListener("mouseup", clearPrepTimers);
restPlusButton.addEventListener("mouseleave", clearPrepTimers);


cyclesMinusButton.addEventListener("mousedown", cyclesMinusButtonPressed);
cyclesPlusButton.addEventListener("mousedown", cyclesPlusButtonPressed);

cyclesMinusButton.addEventListener("mouseup", clearPrepTimers);
cyclesMinusButton.addEventListener("mouseleave", clearPrepTimers);

cyclesPlusButton.addEventListener("mouseup", clearPrepTimers);
cyclesPlusButton.addEventListener("mouseleave", clearPrepTimers);

restcyMinusButton.addEventListener("mousedown", minusButtonPressed);
restcyPlusButton.addEventListener("mousedown", plusButtonPressed);

restcyMinusButton.addEventListener("mouseup", clearPrepTimers);
restcyMinusButton.addEventListener("mouseleave", clearPrepTimers);

restcyPlusButton.addEventListener("mouseup", clearPrepTimers);
restcyPlusButton.addEventListener("mouseleave", clearPrepTimers);
