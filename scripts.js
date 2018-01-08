
function setPomodoroTimer(timeInSeconds) {

  var counter = timeInSeconds;

  setInterval(function() {
    if (counter !== 0) {
      console.log(counter);
      counter--;
    } else {
      console.log(0);
      clearInterval();
    }
  }, 1000);

}