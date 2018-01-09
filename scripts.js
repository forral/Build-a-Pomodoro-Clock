var display = document.querySelector('.display');
var startButton = document.querySelector('.start');
var pauseButton = document.querySelector('.pause');
var setTimer;

startButton.addEventListener('click', function() {
  var currentScreenTime = display.textContent;

  if (currentScreenTime == 0) {
    setPomodoroTimer(25);  
  } else {
    setPomodoroTimer(currentScreenTime - 1);
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
      clearInterval(setTimer);
    }
  }, 1000);

}

var timerStatus = {
  working: false
}