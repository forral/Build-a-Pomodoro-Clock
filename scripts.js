var startButton = document.querySelector('.start');
var minutesDisplay = document.getElementById('minutes');
var secondsDisplay = document.getElementById('seconds');
var title = document.querySelector('.title');
var alarmSound = document.getElementById('alarm-beep');

var timerStatus = {
  setTimer: null,
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

minutesDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(timerStatus.defaultStartingValue);
secondsDisplay.textContent = '00';

startButton.addEventListener('click', function() {

  helpers.pauseAndResetSound();

  if (timerStatus.runningTimer || (!timerStatus.runningTimer && !timerStatus.runningBreakTimer)) {
    console.log('run the default timer');
    //TODO: change the general colors of the application for DEFAULT running mode here
    timerStatus.runningTimer = true;
    startButton.classList.add('hidden');
    setPomodoroTimer(timerStatus.defaultStartingValue);
  }

  if (timerStatus.runningBreakTimer) {
    console.log('run break timer');
    //TODO: change the general colors of the application for BREAK running mode here
    startButton.classList.add('hidden');
    setPomodoroTimer(timerStatus.defaultBreakTimeValue);
  }  
});

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
      //TODO: run a noise notification. beep beep beep beep
      alarmSound.play();
      clearInterval(timerStatus.setTimer);
    }

  }, 1000);
}