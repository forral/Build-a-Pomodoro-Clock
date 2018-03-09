var startButton = document.querySelector('.start');
var stopButton = document.querySelector('.stop');
var restartButton = document.querySelector('.restart');
var minutesDisplay = document.getElementById('minutes');
var secondsDisplay = document.getElementById('seconds');
// var title = document.querySelector('.title');
// var alarmSound = document.getElementById('alarm-beep');
// var lightBackground = document.querySelector('.light');
// var darkBackground = document.querySelector('.dark');

var timerStatus = {
  setTimer: null,
  minutes: 25 // read like: how many times do I whant the seconds counter to run 60 seconds?
  // currentMinutes: 0,
  // currentSeconds: 0,
  // defaultStartingValue: 35,
  // runningTimer: false,
  // defaultBreakTimeValue: 5,
  // runningBreakTimer: false,
  // stopped: false
}

var helpers = {
  twoDigitFormat: function(number) {
    return number < 10 ? '0' + number : number;
  }
  // pauseAndResetSound: function() {
  //   alarmSound.pause();
  //   alarmSound.currentTime = 0;
  // }
}

function init() {
  // TODO: set the app openning with minutes and seconds display (if there isn's any user settings, by default it should be 25:00)
    minutesDisplay.textContent = helpers.twoDigitFormat(timerStatus.minutes);
    secondsDisplay.textContent = '00';

  // set the background color:
  // backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent);
  
  // TODO: create the timerStatus or load it from localStorage();
}

init();

startButton.addEventListener('click', function() {
  startTimer();
  // helpers.pauseAndResetSound();

  // if (timerStatus.stopped) {
  //   timerStatus.stopped = false;
  //   startButton.classList.add('hidden');
  //   stopButton.classList.remove('hidden');
  //   startTimer(timerStatus.currentMinutes, timerStatus.currentSeconds);

  // } else if (timerStatus.runningTimer || (!timerStatus.runningTimer && !timerStatus.runningBreakTimer)) {
  //   //TODO: change the general colors of the application for DEFAULT running mode here
  //   timerStatus.runningTimer = true;
  //   startButton.classList.add('hidden');
  //   stopButton.classList.remove('hidden');
  //   restartButton.classList.remove('hidden');
  //   startTimer(timerStatus.defaultStartingValue - 1);

  // } else if (timerStatus.runningBreakTimer) {
  //   //TODO: change the general colors of the application for BREAK running mode here
  //   startButton.classList.add('hidden');
  //   startTimer(timerStatus.defaultBreakTimeValue - 1);
  // }  
});

stopButton.addEventListener('click', function() {
  stopTimer();
});

// restartButton.addEventListener('click', function(){
//   // restart();
// });

function startTimer(/* minutes, seconds */) {
  
  startButton.classList.add('hidden');
  stopButton.classList.remove('hidden');
  restartButton.classList.remove('hidden');

  // Checking if the function was passed with arguments, if not give them a default value
  // minutes = minutes === undefined ? '00' : minutes;
  // seconds = seconds === undefined ? 60 : seconds;

  var seconds = 60;
  timerStatus.minutes--;

  timerStatus.setTimer = setInterval(function() {

    if (timerStatus.minutes === -1) {
      clearInterval(timerStatus.setTimer);
    } else {
      // seconds functionality
      if (seconds > 1) {
        seconds--;

        console.log(helpers.twoDigitFormat(timerStatus.minutes) + ':' + helpers.twoDigitFormat(seconds));
        minutesDisplay.textContent = helpers.twoDigitFormat(timerStatus.minutes)
        secondsDisplay.textContent = helpers.twoDigitFormat(seconds);

      } else {
        seconds--;

        console.log(helpers.twoDigitFormat(timerStatus.minutes) + ':' + helpers.twoDigitFormat(seconds));
        minutesDisplay.textContent = helpers.twoDigitFormat(timerStatus.minutes)
        secondsDisplay.textContent = helpers.twoDigitFormat(seconds);

        timerStatus.minutes--;
        seconds = 60;
      }
    } // end of seconds functionality

    // paint the display with first values set, make sure if the number is less than zero then put an zero in front of it.
    // minutesDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(minutes) > 0 ? helpers.zeroOnFrontOfSingleDigit(minutes) : '00';
    // secondsDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(seconds) > 0 ? helpers.zeroOnFrontOfSingleDigit(seconds) : '00';

    // if (minutes !== -2) {
    //   seconds--;
    //   secondsDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(seconds);
    // }

    // if (seconds === 0) {
    //   minutes--;
    //   minutesDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(minutes) > 0 ? helpers.zeroOnFrontOfSingleDigit(minutes) : '00';
    //   seconds = 60;
    //   secondsDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(seconds) - 1;
    // }

    // if (minutes === -2) {
    //   timerStatus.runningTimer = !timerStatus.runningTimer;
    //   timerStatus.runningBreakTimer = !timerStatus.runningBreakTimer;
    //   // title.classList.toggle('hidden');
    //   startButton.classList.toggle('hidden');
    //   minutesDisplay.textContent = helpers.zeroOnFrontOfSingleDigit(timerStatus.defaultBreakTimeValue);
    //   alarmSound.play();
    //   clearInterval(timerStatus.setTimer);
    // }

    // backgroundChangeColor(minutesDisplay.textContent, secondsDisplay.textContent);

  }, 1000);
}

function stopTimer() {
//   stopButton.classList.add('hidden'); // TODO: research if i can change this for toggle?
//   startButton.classList.remove('hidden'); // TODO: research if i can change this for toggle?
//   timerStatus.stopped = true;
//   timerStatus.currentMinutes = minutesDisplay.textContent;
//   timerStatus.currentSeconds = secondsDisplay.textContent;
  clearInterval(timerStatus.setTimer);
}

// function restart() {
//   // TODO: all the object values should be on the init function.
//   // NOTE/TODO: this functionality it's only for the default timer not for the break timer,
//   // still have for code that
//   timerStatus.currentMinutes = 0;
//   timerStatus.currentSeconds = 0;
//   timerStatus.runningTimer = false;
//   timerStatus.runningBreakTimer = false;
//   timerStatus.stopped = false;
//   stopButton.classList.add('hidden');
//   startButton.classList.remove('hidden');
//   init();
//   clearInterval(timerStatus.setTimer);
// }

// function backgroundChangeColor(minutes, seconds) {
//   lightBackground.style.height = (100 - darkBackground.style.height.replace(/\%/, '')) + '%';
//   darkBackground.style.height = (((((Number(minutes) * 60) + (Number(seconds))) * 0.10) / (Number(timerStatus.defaultStartingValue) * 60)) * 1000) + '%';
// }