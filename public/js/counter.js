function secondsToTime(e){
    e = e/1000;
    const h = Math.floor(e / 3600).toString().padStart(2,'0'),
          m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
          s = Math.floor(e % 60).toString().padStart(2,'0');
    
    return h + ':' + m + ':' + s;
    //return `${h}:${m}:${s}`;
}


// --------Reveser-timer-----------
function time_in_range(lasttime,morning,tonight){
  
    var now_date = new Date().toJSON().split("T")[0];
    var now_lasttime = new Date(lasttime).toJSON().split("T")[0];



    lasttime = new Date(lasttime).getTime();


    var allowed = 0;
    if(now_lasttime<now_date){
      allowed = 1;
    }else if(now_lasttime==now_date){

   



    // var morning = new Date("2023-11-16 07:00:00").getTime();
    // var tonight =new Date( "2023-11-16 19:00:00").getTime();

    // var morning = new Date("2023-11-16 07:00:00").getTime();
    // var tonight =new Date( "2023-11-16 19:00:00").getTime();
    

    if(lasttime<morning){
      allowed = 1;
    }else if(lasttime>morning&&Date.now()>tonight&&tonight<lasttime){
      allowed = 1;
    }

  }

  return allowed;
}

// var date = "2023-11-16 08:12:34";
// var now_date = new Date();
// 2023-11-16 07:00:00 - 2023-11-16 19:00:00 : every day
// time_in_range(date,now_date.setHours(7,0,0),now_date.setHours(19,0,0));

$.fn.counter = function(options){
  $(document).ready(function(){
    $('body').append('<style>.base-timer {position: relative;width: 250px;height: 250px;margin: auto;}.base-timer__svg {transform: scaleX(-1);}.base-timer__circle {fill: none;stroke: none;}.base-timer__path-elapsed {stroke-width: 6px;stroke: #efefef;}.base-timer__path-remaining {stroke-width: 4px;stroke-linecap: round;transform: rotate(90deg);transform-origin: center;transition: 1s linear all;fill-rule: nonzero;stroke: currentColor;}.base-timer__path-remaining.green {color: #39b37d;}.base-timer__path-remaining.orange {color: orange;}.base-timer__path-remaining.red {color: red;}.base-timer__label {position: absolute;width: 250px;height: 250px;top: 0;display: flex;align-items: center;justify-content: center;font-size: 30px;font-weight: 600;letter-spacing: 0.3px;}</style>');
  });
  return this.each(function(){

      const ele = $(this);
      const settings = $.extend({minute:60},ele.data(),options,true);


      const FULL_DASH_ARRAY = 283;
      const WARNING_THRESHOLD = 20;
      const ALERT_THRESHOLD = 15;

      const COLOR_CODES = {
        info: {
          color: "green" },

        warning: {
          color: "orange",
          threshold: WARNING_THRESHOLD },

        alert: {
          color: "red",
          threshold: ALERT_THRESHOLD } };




      var Minute = settings.minute;
      var Seconds = Math.round(60 * Minute);
      const TIME_LIMIT = Seconds;
      let timePassed = 0;
      let timeLeft = TIME_LIMIT;
      let timerInterval = null;
      let remainingPathColor = COLOR_CODES.info.color;

      ele.html(`
      <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path 
              stroke-dasharray="283"
              class="base-timer__path-remaining base-timer-path-remaining ${remainingPathColor}"
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
            ></path>
          </g>
        </svg>
        <span class="base-timer-label base-timer__label">${formatTime(
      timeLeft)
      }</span>
      </div>
      `);

      const remainingele =ele.find(".base-timer-path-remaining");

      startTimer();

      function onTimesUp() {
        clearInterval(timerInterval);
      }

      function startTimer() {
        timerInterval = setInterval(() => {
          timePassed = timePassed += 1;
          timeLeft = TIME_LIMIT - timePassed;
          ele.find(".base-timer-label").html(formatTime(timeLeft));

          setCircleDasharray();
          setRemainingPathColor(timeLeft);

          if (timeLeft === 0) {
            onTimesUp();
          }
        }, 1000);
      }

      function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
          seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
      }

      function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
          remainingele.removeClass(warning.color).addClass(alert.color);
        } else if (timeLeft <= warning.threshold) {
          remainingele.removeClass(info.color).addClass(warning.color);
        }
      }

      function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - 1 / TIME_LIMIT * (1 - rawTimeFraction);
      }

      function setCircleDasharray() {
        const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY).
        toFixed(0)} 283`;
        remainingele.attr("stroke-dasharray", circleDasharray);
      }
  });
} 