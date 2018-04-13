var startButton = document.querySelector('.start');
var stopButton = document.querySelector('.stop');
var restartButton = document.querySelector('.restart');
var minutesDisplay = document.getElementById('minutes');
var secondsDisplay = document.getElementById('seconds');
var alarmSound = document.getElementById('alarm-beep');
var downBackground = document.querySelector('.down');
var upBackground = document.querySelector('.up');
var title = document.querySelector('.title');
var burgerMenu = document.querySelector('.burger-menu');
var menu = document.querySelector('.menu');
var pomodoroInput = document.querySelector('.number-minutes-pomodoro');
var breakInput = document.querySelector('.number-minutes-break');
var alarmCheckbox = document.querySelector('.alarm-checkbox');

var helpers = {
  twoDigitFormat: function (number) {
    if (number.length === 2) {
      return number
    }
    return number < 10 ? '0' + number : number;
  },
  pauseAndResetSound: function () {
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
}

var timerStatus = {
  setTimer: null,
  minutes: 1, // read like: how many times do I whant the seconds counter to run 60 seconds?
  currentMinutes: 0,
  currentSeconds: 0,
  defaultBreakTimeValue: 1,
  break: false,
  stopped: false,
  menuActive: false,
  pausedByMenu: false,
  alarm: false
}

function init() {  
  // TODO: set the app openning with minutes and seconds display (if there isn's any user settings, by default it should be 25:00)
  minutesDisplay.textContent = helpers.twoDigitFormat(timerStatus.minutes);
  secondsDisplay.textContent = '00';

  // setup the alarm functionality
  alarmCheckbox.checked = timerStatus.alarm;

  // Set the height
  backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent, timerStatus.minutes);
  // TODO: create the timerStatus or load it from localStorage();
}

init();

pomodoroInput.addEventListener('change', function() {
  console.log('Pomodoro input change');
});

breakInput.addEventListener('change', function() {
  // timerStatus.defaultBreakTimeValue = breakInput.value;
  console.log('Break input change');
});

startButton.addEventListener('click', function() {
  // helpers.pauseAndResetSound();

  // run the timer after a stop button was pressed
  if (timerStatus.stopped) {
    timerStatus.stopped = !timerStatus.stopped;
    toggleStopPlayButtons();
    startTimer(timerStatus.currentMinutes, timerStatus.currentSeconds);

  } else if (timerStatus.break) {
    title.classList.remove('hidden');
    toggleStopPlayButtons();
    restartButton.classList.remove('hidden'); // <- see if this line is necessary
    startTimer(timerStatus.defaultBreakTimeValue);

  } else {
    title.classList.add('hidden');
    toggleStopPlayButtons();
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

burgerMenu.addEventListener('click', function() {
  toggleMenu();
});

function startTimer(minutes, seconds) {
  
  // when click the stop button with '00' on seconds, and then start the clock again.
  if (arguments.length === 2 && arguments[1] === '00') {
    seconds = 60;
    minutes--;
  }

  // default setup
  if (arguments.length === 0) {
    seconds = 60;
    minutes = timerStatus.minutes;
    minutes--;

    upBackground.style.backgroundColor = '#23272b';
    upBackground.style.height = '100%';
    downBackground.style.backgroundColor = 'white';
    downBackground.style.height = '0%';
  }

  // break mode setup
  if (arguments.length === 1) {
    seconds = 60;
    minutes--;

    upBackground.style.backgroundColor = 'white';
    upBackground.style.height = '100%';
    downBackground.style.backgroundColor = '#23272b';
    downBackground.style.height = '0%';
  }

  timerStatus.setTimer = setInterval(function() {

    // when minutesTextContent === '00' and secondsTextContent === '00'
    if (minutes === -1) {

      // Switching between default and break mode
      timerStatus.break = !timerStatus.break;
      title.classList.toggle('hidden');

      debugger;
      // TESTING TO SEE IF I CAN PUT THE TOGGLEBUTTONS FUNCTION HERE.
      stopButton.classList.add('hidden');
      startButton.classList.remove('hidden');

      if (timerStatus.break) {
        minutesDisplay.textContent = helpers.twoDigitFormat(timerStatus.defaultBreakTimeValue);
        secondsDisplay.textContent = '00';        
      } else {
        minutesDisplay.textContent = helpers.twoDigitFormat(timerStatus.minutes);
        secondsDisplay.textContent = '00';
      }

      // Stop the setInterval
      clearInterval(timerStatus.setTimer);

      // Sound the alarm.
      console.log('finished: sound alarm!');
      // alarmSound.play();

    } else {
      // seconds functionality
      if (seconds > 1) {
        seconds--;

        // paint (TODO maybe turn this into a function) DRY
        console.log(helpers.twoDigitFormat(minutes) + ':' + helpers.twoDigitFormat(seconds));
        minutesDisplay.textContent = helpers.twoDigitFormat(minutes)
        secondsDisplay.textContent = helpers.twoDigitFormat(seconds);

        // TODO: Clean this code - DRY
        if (timerStatus.break) {
          backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent, timerStatus.defaultBreakTimeValue);
        } else {
          backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent, timerStatus.minutes);
        }

      } else {
        seconds--;

        // paint (TODO maybe turn this into a function) DRY
        console.log(helpers.twoDigitFormat(minutes) + ':' + helpers.twoDigitFormat(seconds));
        minutesDisplay.textContent = helpers.twoDigitFormat(minutes)
        secondsDisplay.textContent = helpers.twoDigitFormat(seconds);

        minutes--;
        // reset the seconds value.
        seconds = 60;

        // TODO: Clean this code - DRY
        if (timerStatus.break) {
          backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent, timerStatus.defaultBreakTimeValue);
        } else {
          backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent, timerStatus.minutes);
        }
      }
    } // end of seconds functionality

  }, 300);
}

function stopTimer() {
  toggleStopPlayButtons();
  timerStatus.stopped = true;
  timerStatus.currentMinutes = minutesDisplay.textContent;
  timerStatus.currentSeconds = secondsDisplay.textContent;
  clearInterval(timerStatus.setTimer);
}

function restart() {

  var minutesOnScreen = Number(minutesDisplay.textContent);
  var secondsOnScreen = Number(secondsDisplay.textContent);
  var zerosOnScreen;

  if (minutesOnScreen === 0 && secondsOnScreen === 0) {
    zerosOnScreen = true;
  }

  function restartDefaultMode() {
    timerStatus.currentMinutes = 0;
    timerStatus.currentSeconds = 0;
    timerStatus.stopped = false;
    timerStatus.break = false;
    stopButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    restartButton.classList.add('hidden');
    timerStatus.break = false;
    init();
    clearInterval(timerStatus.setTimer);
  }

  function restartOnBreakMode() {
    // Change background color and size do the break mode start position
    upBackground.style.backgroundColor = 'white';
    upBackground.style.height = '100%';
    downBackground.style.backgroundColor = '#23272b';
    downBackground.style.height = '0%';

    // only show play botton when restart from break mode
    stopButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    restartButton.classList.add('hidden');

    // showh default value break time
    minutesDisplay.textContent = helpers.twoDigitFormat(timerStatus.defaultBreakTimeValue)
    secondsDisplay.textContent = '00'

    timerStatus.break = true;
    clearInterval(timerStatus.setTimer);
  }

  if (zerosOnScreen) {
    if (timerStatus.break) {
      restartDefaultMode();
    } else {
      restartOnBreakMode();
    }
  } else {
    if (timerStatus.break) {
      restartOnBreakMode();
    } else {
      restartDefaultMode();
    }
  }

}

// this function should called changeBackgroundSizes(); because she doesn't change colores, only height.
function backgroundChangeColor(minutes, seconds, timer) {
  upBackground.style.height = (((((Number(minutes) * 60) + (Number(seconds))) * 0.10) / (Number(timer) * 60)) * 1000) + '%';
  downBackground.style.height = (100 - upBackground.style.height.replace(/\%/, '')) + '%';
}

function toggleMenu() {
  timerStatus.menuActive = !timerStatus.menuActive;
  menu.classList.toggle('show');
}

function toggleStopPlayButtons() {
  stopButton.classList.toggle('hidden');
  startButton.classList.toggle('hidden');
}