var startButton = document.querySelector('.start');
var minutesDisplay = document.getElementById('minutes');
var secondsDisplay = document.getElementById('seconds');

// TODO NEXT: try to put this value inside the timerStatus object
// var setTimer;

var timerStatus = {
  setTimer: null,
  defaultStartingValue: 0,
  defaultBreakTimeValue: 5,
  running: false
}

minutesDisplay.textContent = timerStatus.defaultStartingValue < 10 ? '0' + timerStatus.defaultStartingValue : timerStatus.defaultStartingValue;
secondsDisplay.textContent = '00';

startButton.addEventListener('click', function() {
  setPomodoroTimer(timerStatus.defaultStartingValue);
  timerStatus.running = true;
  startButton.classList.add('hidden');
});

function setPomodoroTimer(time) {
  var minutesCounter = time - 1;
  var secondsCounter = 60;

  timerStatus.setTimer = setInterval(function() {

    minutesDisplay.textContent = minutesCounter < 10 ? '0' + minutesCounter : minutesCounter;

    if (minutesCounter !== -2) {
      secondsCounter--;
      secondsDisplay.textContent = secondsCounter < 10 ? '0' + secondsCounter : secondsCounter;
    }

    if (secondsCounter === 0) {
      minutesCounter--;
      minutesDisplay.textContent = minutesCounter < 10 ? '0' + minutesCounter : minutesCounter;
      secondsCounter = 60;
    }

    if (minutesCounter === -2) {
      console.log('clearInterval run');
      clearInterval(timerStatus.setTimer);
    }

  }, 1000);
}