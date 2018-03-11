var startButton = document.querySelector('.start');
var stopButton = document.querySelector('.stop');
var restartButton = document.querySelector('.restart');
var minutesDisplay = document.getElementById('minutes');
var secondsDisplay = document.getElementById('seconds');
var alarmSound = document.getElementById('alarm-beep');
var lightBackground = document.querySelector('.light');
var darkBackground = document.querySelector('.dark');
// var title = document.querySelector('.title');

var timerStatus = {
  setTimer: null,
  minutes: 1, // read like: how many times do I whant the seconds counter to run 60 seconds?
  currentMinutes: 0,
  currentSeconds: 0,
  // defaultStartingValue: 35,
  // runningTimer: false,
  // defaultBreakTimeValue: 5,
  // runningBreakTimer: false,
  stopped: false
}

var helpers = {
  twoDigitFormat: function(number) {
    if (number === '00') {
      return number
    }
    return number < 10 ? '0' + number : number;
  },
  pauseAndResetSound: function() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
}

function init() {
  // TODO: set the app openning with minutes and seconds display (if there isn's any user settings, by default it should be 25:00)
    minutesDisplay.textContent = helpers.twoDigitFormat(timerStatus.minutes);
    secondsDisplay.textContent = '00';

  // set the background color:
  // backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent);
  
  // TODO: create the timerStatus or load it from localStorage();
}

init();

startButton.addEventListener('click', function() {
  // helpers.pauseAndResetSound();

  if (timerStatus.stopped) {
    timerStatus.stopped = !timerStatus.stopped;
    // change the bottons
    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');
    startTimer(timerStatus.currentMinutes, timerStatus.currentSeconds);
  } else {
    startTimer();
  }

});

stopButton.addEventListener('click', function() {
  stopTimer();
});

restartButton.addEventListener('click', function(){
  restart();
});

function startTimer(minutes, seconds) {
  
  startButton.classList.add('hidden');
  stopButton.classList.remove('hidden');
  restartButton.classList.remove('hidden');

  // Checking if the function was passed with arguments if not, give them a default value
  // minutes = minutes === undefined ? '00' : minutes;
  // seconds = seconds === undefined ? 60 : seconds;
  
  if (arguments.length === 0) {
    seconds = 60;
    minutes = timerStatus.minutes;
    minutes--;
  }

  timerStatus.setTimer = setInterval(function() {

    if (minutes === -1) {

      clearInterval(timerStatus.setTimer);

    } else {
      // seconds functionality
      if (seconds > 1) {
        seconds--;

        // paint (maybe turn this into a function)
        console.log(helpers.twoDigitFormat(minutes) + ':' + helpers.twoDigitFormat(seconds));
        minutesDisplay.textContent = helpers.twoDigitFormat(minutes)
        secondsDisplay.textContent = helpers.twoDigitFormat(seconds);

      } else {
        seconds--;

        // paint (maybe turn this into a function)
        console.log(helpers.twoDigitFormat(minutes) + ':' + helpers.twoDigitFormat(seconds));
        minutesDisplay.textContent = helpers.twoDigitFormat(minutes)
        secondsDisplay.textContent = helpers.twoDigitFormat(seconds);

        minutes--;
        // sound the alarm.
        console.log('finished: sound alarm!');
        alarmSound.play();
        // reset the seconds value.
        seconds = 60;

        stopButton.classList.add('hidden');
        startButton.classList.remove('hidden');

      }
    } // end of seconds functionality

    // backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent);

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
  // NOTE/TODO: this functionality it's only for the default timer not for the break timer,
  // still have for code that
  timerStatus.currentMinutes = 0;
  timerStatus.currentSeconds = 0;
  // timerStatus.runningTimer = false;
  // timerStatus.runningBreakTimer = false;
  timerStatus.stopped = false;
  stopButton.classList.add('hidden');
  startButton.classList.remove('hidden');
  restartButton.classList.add('hidden');
  init();
  clearInterval(timerStatus.setTimer);
}

// function backgroundChangeColor(minutes, seconds) {
//   lightBackground.style.height = (100 - darkBackground.style.height.replace(/\%/, '')) + '%';
//   darkBackground.style.height = (((((Number(minutes) * 60) + (Number(seconds))) * 0.10) / (Number(timerStatus.defaultStartingValue) * 60)) * 1000) + '%';
// }