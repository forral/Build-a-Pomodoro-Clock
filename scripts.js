var display = document.querySelector('.display');
var startButton = document.querySelector('.start');
var pauseButton = document.querySelector('.pause');
var setTimer;

var timerStatus = {
  defaultStartingValue: 25,
  working: false
}

startButton.addEventListener('click', function() {
  var currentScreenTime = Number(display.textContent);

  if (currentScreenTime === 0) {
    setPomodoroTimer(timerStatus.defaultStartingValue);  
  } else {
    setPomodoroTimer(currentScreenTime);
  }

  timerStatus.working = true;
  pauseButton.classList.remove('hide');
  startButton.classList.add('hide');
});

pauseButton.addEventListener('click', function() {
  clearInterval(setTimer);
  timerStatus.working = false;
  startButton.classList.remove('hide');
  pauseButton.classList.add('hide');  
});

function setPomodoroTimer(timeInSeconds) {
  var counter = timeInSeconds;
  display.textContent = counter;

  setTimer = setInterval(function() {
    if (counter !== 0) {
      display.textContent = counter;
      counter--;
    } else {
      display.textContent = 0;
      pauseButton.classList.add('hide');
      startButton.classList.remove('hide');
      clearInterval(setTimer);
    }
  }, 1000);
}