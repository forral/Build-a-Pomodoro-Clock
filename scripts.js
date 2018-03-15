var startButton = document.querySelector('.start');
var stopButton = document.querySelector('.stop');
var restartButton = document.querySelector('.restart');
var minutesDisplay = document.getElementById('minutes');
var secondsDisplay = document.getElementById('seconds');
var alarmSound = document.getElementById('alarm-beep');
var downBackground = document.querySelector('.down');
var upBackground = document.querySelector('.up');
// var title = document.querySelector('.title');

var timerStatus = {
  setTimer: null,
  minutes: 1, // read like: how many times do I whant the seconds counter to run 60 seconds?
  currentMinutes: 0,
  currentSeconds: 0,
  // defaultStartingValue: 35,
  // runningTimer: false,
  defaultBreakTimeValue: 2,
  break: false,
  stopped: false
}

var helpers = {
  twoDigitFormat: function(number) {
    if (number.length === 2) {
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
  // 1st. set the color to the DOM elements
  if (timerStatus.break) {
    upBackground.style.backgroundColor = 'white';
    downBackground.style.backgroundColor = '#23272b';
  } else {
    // default
    upBackground.style.backgroundColor = '#23272b';
    downBackground.style.backgroundColor = 'white';
  }
  // 2st. set the height
  backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent);
  
  // TODO: create the timerStatus or load it from localStorage();
}

init();




startButton.addEventListener('click', function() {
  // helpers.pauseAndResetSound();

  // run the timer after a stop button was pressed
  if (timerStatus.stopped) {

    timerStatus.stopped = !timerStatus.stopped;
    // change the bottons
    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');
    startTimer(timerStatus.currentMinutes, timerStatus.currentSeconds);

  } else if (timerStatus.break) {

    upBackground.style.backgroundColor = 'white';
    downBackground.style.backgroundColor = '#23272b';
    upBackground.style.height = '100%';
    downBackground.style.height = '0%';
    backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent);

    console.log('tried to run the startTimer(); with break timer on');
    startTimer(timerStatus.defaultBreakTimeValue);

  } else {
    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');
    restartButton.classList.remove('hidden');
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
  
  // default setup
  if (arguments.length === 0) {
    seconds = 60;
    minutes = timerStatus.minutes;
    minutes--;
  }

  // break mode setup
  if (arguments.length === 1) {
    seconds = 60;
    minutes--;
  }

  timerStatus.setTimer = setInterval(function() {

    // when minutesTextContent === '00' and secondsTextContent === '00'
    if (minutes === -1) {

      // Switching between default and break mode
      timerStatus.break = !timerStatus.break;
      stopButton.classList.add('hidden');
      startButton.classList.remove('hidden');

      // Stop the setInterval
      clearInterval(timerStatus.setTimer);

      // Sound the alarm.
      console.log('finished: sound alarm!');
      alarmSound.play();

      // setup the backgrounds

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
        // reset the seconds value.
        seconds = 60;
      }
    } // end of seconds functionality

    backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent);

  }, 100);
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

function backgroundChangeColor(minutes, seconds) {
  upBackground.style.height = (((((Number(minutes) * 60) + (Number(seconds))) * 0.10) / (Number(timerStatus.minutes) * 60)) * 1000) + '%';
  downBackground.style.height = (100 - upBackground.style.height.replace(/\%/, '')) + '%';
}