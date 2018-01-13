var startButton = document.querySelector('.start');
var minutesDisplay = document.getElementById('minutes');
var secondsDisplay = document.getElementById('seconds');
var title = document.querySelector('.title');

var timerStatus = {
  setTimer: null,
  defaultStartingValue: 0,
  runningTimer: false,
  defaultBreakTimeValue: 0,
  runningBreakTime: false
}

var helpers = {
  zeroOnFrontOfSingleDigit: function(number) {
    return number < 10 ? '0' + number : number;
  }
}

minutesDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(timerStatus.defaultStartingValue);
secondsDisplay.textContent = '00';

startButton.addEventListener('click', function() {
  setPomodoroTimer(timerStatus.defaultStartingValue);
  timerStatus.runningTimer = true;
  startButton.classList.add('hidden');
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
      title.classList.toggle('hidden');
      startButton.classList.toggle('hidden');
      clearInterval(timerStatus.setTimer);
    }

  }, 1000);
}