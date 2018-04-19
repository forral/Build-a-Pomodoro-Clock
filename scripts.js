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
  minutes: 25, // read like: how many times do I whant the seconds counter to run 60 seconds?
  currentMinutes: 0,
  currentSeconds: 0,
  defaultBreakTimeValue: 5,
  break: false,
  stopped: false,
  menuActive: false,
  pausedByMenu: false, // <- TODO: can I delete this line?
  alarm: false
}

function init() {
  // setup the alarm functionality
  alarmCheckbox.checked = timerStatus.alarm;
  // setup the default values on the inputs.
  pomodoroInput.value = timerStatus.minutes;
  breakInput.value = timerStatus.defaultBreakTimeValue;
  // 2. restart the app with the new values
  minutesDisplay.textContent = helpers.twoDigitFormat(timerStatus.minutes);
  secondsDisplay.textContent = '00';
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
  helpers.pauseAndResetSound();

  if (timerStatus.menuActive) {
    return;
  }

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
  if (timerStatus.menuActive) {
    return;
  }
  stopTimer();
});

restartButton.addEventListener('click', function(){
  if (timerStatus.menuActive) {
    return;
  }
  restart();
});

burgerMenu.addEventListener('click', function() {
  toggleMenu();
});

function startTimer(minutes, seconds) {

  burgerMenu.classList.add('hidden');

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
    setUpBackground('dark');
  }

  // break mode setup
  if (arguments.length === 1) {
    seconds = 60;
    minutes--;
    setUpBackground();
  }

  timerStatus.setTimer = setInterval(function() {

    // when minutesTextContent === '00' and secondsTextContent === '00'
    if (minutes === -1) {
      // Switching between default and break mode
      timerStatus.break = !timerStatus.break;
      title.classList.toggle('hidden');
      toggleStopPlayButtons();

      if (timerStatus.break) {
        minutesDisplay.textContent = helpers.twoDigitFormat(timerStatus.defaultBreakTimeValue);
        secondsDisplay.textContent = '00';
      } else {
        burgerMenu.classList.remove('hidden');
        minutesDisplay.textContent = helpers.twoDigitFormat(timerStatus.minutes);
        secondsDisplay.textContent = '00';
      }

      // Stop the setInterval
      clearInterval(timerStatus.setTimer);

      // Sound the alarm.
      console.log('finished: sound alarm!');
      if (timerStatus.alarm) {
        alarmSound.play();
      }

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


    if (timerStatus.stopped) {
      restartButton.classList.add('hidden');
    } else {
      restartButton.classList.add('hidden');
      stopButton.classList.add('hidden');
      startButton.classList.remove('hidden');
    }

    timerStatus.break = false;
    burgerMenu.classList.remove('hidden');
    init();
    clearInterval(timerStatus.setTimer);
  }
  
  function restartOnBreakMode() {
    // Change background color and size do the break mode start position
    setUpBackground();

    timerStatus.currentMinutes = 0;
    timerStatus.currentSeconds = 0;
    timerStatus.stopped = false;
    timerStatus.break = false;

    // only show play botton when restart from break mode
    if (timerStatus.stopped) {
      restartButton.classList.add('hidden');
    } else {
      restartButton.classList.add('hidden');
      stopButton.classList.add('hidden');
      startButton.classList.remove('hidden');
    }

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

  if (timerStatus.menuActive) {
    console.log('menu is open');
  } else {
    console.log('menu is closed');
    // 1. update de values
    timerStatus.minutes = pomodoroInput.value;
    timerStatus.defaultBreakTimeValue = breakInput.value;
    timerStatus.alarm = alarmCheckbox.checked;
    // 2. restart the app with the new values
    minutesDisplay.textContent = helpers.twoDigitFormat(timerStatus.minutes);
    secondsDisplay.textContent = '00';
  }

}

function toggleStopPlayButtons() {
  stopButton.classList.toggle('hidden');
  startButton.classList.toggle('hidden');
}

// pass 'dark' to pomodoro mode or nothing to break mode
// setUpBackground('dark') = pomodoro mode | dark brackground
// setUpBackground() = break mode | white brackground
function setUpBackground(mode) {
  upBackground.style.backgroundColor = mode === 'dark' ? '#23272b' : 'white';
  upBackground.style.height = '100%';
  downBackground.style.backgroundColor = mode === 'dark' ? 'white' : '#23272b';
  downBackground.style.height = '0%';
}