var startButton = document.querySelector('.start');
var minutesDisplay = document.getElementById('minutes');
var secondsDisplay = document.getElementById('seconds');

// TODO NEXT: try to put this value inside the timerStatus object
var setTimer;

var timerStatus = {
  defaultStartingValue: 1,
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

  setTimer = setInterval(function() {

    minutesDisplay.textContent = minutesCounter < 10 ? '0' + minutesCounter : minutesCounter;

    if (minutesCounter !== -1) {
      secondsCounter--;
      secondsDisplay.textContent = secondsCounter < 10 ? '0' + secondsCounter : secondsCounter;
    }

    if (secondsCounter === 0) {
      minutesCounter--;
      minutesDisplay.textContent = minutesCounter < 10 ? '0' + minutesCounter : minutesCounter;
      secondsCounter = 60;
    }

    if (secondsCounter === 1 && minutesCounter === 0) {
      secondsDisplay.textContent = '00';
      clearInterval(setTimer);
    }

  }, 1000);
}