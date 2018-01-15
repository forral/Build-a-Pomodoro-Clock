var startButton = document.querySelector('.start');
var stopButton = document.querySelector('.stop');
var restartButton = document.querySelector('.restart');
var minutesDisplay = document.getElementById('minutes');
var secondsDisplay = document.getElementById('seconds');
var title = document.querySelector('.title');
var alarmSound = document.getElementById('alarm-beep');

var timerStatus = {
  setTimer: null,
  currentMinutes: 0,
  currentSeconds: 0,
  defaultStartingValue: 0,
  runningTimer: false,
  defaultBreakTimeValue: 0,
  runningBreakTimer: false,
  stopped: false
}

var helpers = {
  zeroOnFrontOfSingleDigit: function(number) {
    return number < 10 ? '0' + number : number;
  },
  pauseAndResetSound: function() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
}

function init() {
  // set the app openning with minutes and seconds display (if there isn's any user settingd, by default it should be 25:00)
  minutesDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(timerStatus.defaultStartingValue);
  secondsDisplay.textContent = minutesDisplay.textContent === '00' ? '60' : '00';
}

init();

startButton.addEventListener('click', function() {

  helpers.pauseAndResetSound();

  if (timerStatus.stopped) {
    timerStatus.stopped = false;
    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');
    startTimer(timerStatus.currentMinutes, timerStatus.currentSeconds);

  } else if (timerStatus.runningTimer || (!timerStatus.runningTimer && !timerStatus.runningBreakTimer)) {
    console.log('run the default timer');
    //TODO: change the general colors of the application for DEFAULT running mode here
    timerStatus.runningTimer = true;
    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    startTimer(timerStatus.defaultStartingValue - 1);

  } else if (timerStatus.runningBreakTimer) {
    console.log('run break timer');
    //TODO: change the general colors of the application for BREAK running mode here
    startButton.classList.add('hidden');
    startTimer(timerStatus.defaultBreakTimeValue - 1);
  }  
});

stopButton.addEventListener('click', function() {
  stopTimer();
});

restartButton.addEventListener('click', function(){
  restart();
});

// TODO: maybe rename this function for something like -> startTimer();
function startTimer(minutes, seconds) {

  // Checking if the function was passed with arguments, if not give them a default value
  minutes = minutes === undefined ? '00' : minutes;
  seconds = seconds === undefined ? 60 : seconds;

  timerStatus.setTimer = setInterval(function() {

    // paint the display with first values set, make sure if the number is less than zero then put an zero in front of it.
    minutesDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(minutes) > 0 ? helpers.zeroOnFrontOfSingleDigit(minutes) : '00';
    secondsDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(seconds) > 0 ? helpers.zeroOnFrontOfSingleDigit(seconds) : '00';

    if (minutes !== -2) {
      seconds--;
      secondsDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(seconds);
    }

    if (seconds === 0) {
      minutes--;
      minutesDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(minutes) > 0 ? helpers.zeroOnFrontOfSingleDigit(minutes) : '00';
      seconds = 60;
    }

    if (minutes === -2) {
      timerStatus.runningTimer = !timerStatus.runningTimer;
      timerStatus.runningBreakTimer = !timerStatus.runningBreakTimer;
      title.classList.toggle('hidden');
      startButton.classList.toggle('hidden');
      alarmSound.play();
      clearInterval(timerStatus.setTimer);
    }

  }, 1000);
}

function stopTimer() {
  stopButton.classList.add('hidden'); // TODO: research if i can change this for toggle?
  startButton.classList.remove('hidden'); // TODO: research if i can change this for toggle?
  timerStatus.stopped = true;
  timerStatus.currentMinutes = minutesDisplay.textContent;
  timerStatus.currentSeconds = secondsDisplay.textContent;
  clearInterval(timerStatus.setTimer);
}

function restart() {
  // TODO: all the object values should be on the init function.
  timerStatus.currentMinutes = 0;
  timerStatus.currentSeconds = 0;
  timerStatus.runningTimer = false;
  timerStatus.runningBreakTimer = false;
  timerStatus.stopped = false;
  stopButton.classList.add('hidden');
  startButton.classList.remove('hidden');
  init();
  clearInterval(timerStatus.setTimer);
}