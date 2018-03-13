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
  minutes: 5, // read like: how many times do I whant the seconds counter to run 60 seconds?
  currentMinutes: 0,
  currentSeconds: 0,
  // defaultStartingValue: 35,
  // runningTimer: false,
  defaultBreakTimeValue: 5,
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
  backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent);
  
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

  } else if (timerStatus.break) {
    console.log('tried to run the startTimer(); with break timer on');
    startTimer(timerStatus.defaultBreakTimeValue);
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
  
  // this code should be in the event listener
  startButton.classList.add('hidden');
  stopButton.classList.remove('hidden');
  restartButton.classList.remove('hidden');
  
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
    // TODO, test this code because I think minutes is allways a string so it never be === -1
    if (minutes === -1) {

      // Switch to breaktime mode
      timerStatus.break = true;
      stopButton.classList.add('hidden');
      startButton.classList.remove('hidden');

      // 1. show the default break timer values on the page.
      // 2. show play breaktime button or restart button.
      // 3. show the header break time information.
      // 4. change the order of the backgound color.

      // Stop the setInterval
      clearInterval(timerStatus.setTimer);

      // Sound the alarm.
      console.log('finished: sound alarm!');
      alarmSound.play();

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

function backgroundChangeColor(minutes, seconds) {
  darkBackground.style.height = (((((Number(minutes) * 60) + (Number(seconds))) * 0.10) / (Number(timerStatus.minutes) * 60)) * 1000) + '%';
  lightBackground.style.height = (100 - darkBackground.style.height.replace(/\%/, '')) + '%';
}