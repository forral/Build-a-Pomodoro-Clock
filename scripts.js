var setTimer;

function setPomodoroTimer(timeInSeconds) {
  var counter = timeInSeconds;

  setTimer = setInterval(function() {
    if (counter !== 0) {
      console.log(counter);
      counter--;
    } else {
      console.log(0);
      clearInterval(setTimer);
    }
  }, 1000);

}