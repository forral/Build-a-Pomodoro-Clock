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
  runningBreakTimer: false
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

// set the app openning with minutes and seconds display (if there isn's any user settingd, by default it should be 25:00)
minutesDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(timerStatus.defaultStartingValue);
secondsDisplay.textContent = minutesDisplay.textContent === '00' ? '60' : '00';

startButton.addEventListener('click', function() {

  helpers.pauseAndResetSound();

  if (timerStatus.runningTimer || (!timerStatus.runningTimer && !timerStatus.runningBreakTimer)) {
    console.log('run the default timer');
    //TODO: change the general colors of the application for DEFAULT running mode here
    timerStatus.runningTimer = true;
    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    setPomodoroTimer(timerStatus.defaultStartingValue);
  }

  if (timerStatus.runningBreakTimer) {
    console.log('run break timer');
    //TODO: change the general colors of the application for BREAK running mode here
    startButton.classList.add('hidden');
    setPomodoroTimer(timerStatus.defaultBreakTimeValue);
  }  
});

stopButton.addEventListener('click', function() {
  // TODO: create an `stopTimer();` function and put all of this code inside:
  console.log('stop button pressed');
  stopButton.classList.add('hidden');
  startButton.classList.remove('hidden');
  timerStatus.currentMinutes = minutesDisplay.textContent;
  timerStatus.currentSeconds = secondsDisplay.textContent;
  clearInterval(timerStatus.setTimer);
});

// TODO: maybe rename this function for something like -> startTimer();
function setPomodoroTimer(time) {
  var minutesCounter = time - 1;
  var secondsCounter = 60;

  timerStatus.setTimer = setInterval(function() {

    minutesDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(minutesCounter) > 0 ? helpers.zeroOnFrontOfSingleDigit(minutesCounter) : '00';

    if (minutesCounter !== -2) {
      secondsCounter--;
      secondsDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(secondsCounter);
    }

    if (secondsCounter === 0) {
      minutesCounter--;
      minutesDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(minutesCounter) > 0 ? helpers.zeroOnFrontOfSingleDigit(minutesCounter) : '00';
      secondsCounter = 60;
    }

    if (minutesCounter === -2) {
      timerStatus.runningTimer = !timerStatus.runningTimer;
      timerStatus.runningBreakTimer = !timerStatus.runningBreakTimer;
      title.classList.toggle('hidden');
      startButton.classList.toggle('hidden');
      alarmSound.play();
      clearInterval(timerStatus.setTimer);
    }

  }, 1000);
}