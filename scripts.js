var display = document.querySelector('.display');
var startButton = document.querySelector('.start');
var pauseButton = document.querySelector('.pause');
var setTimer;

startButton.addEventListener('click', function() {
  var currentScreenTime = display.textContent - 1;
  setPomodoroTimer(currentScreenTime);
});

pauseButton.addEventListener('click', function() {
  clearInterval(setTimer);  
});

function setPomodoroTimer(timeInSeconds) {
  var counter = timeInSeconds;

  setTimer = setInterval(function() {
    if (counter !== 0) {
      display.textContent = counter;
      counter--;
    } else {
      display.textContent = 0;
      clearInterval(setTimer);
    }
  }, 1000);

}