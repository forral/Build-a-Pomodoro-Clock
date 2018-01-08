var display = document.querySelector('.display');
var setTimer;

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