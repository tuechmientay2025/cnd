(function(){
  window.startTimeUTC = function(func) {
    offset = 2;
    var today = new Date();
    var h = today.getUTCHours();
    var m = today.getUTCMinutes();
    var s = today.getUTCSeconds();
    h = h + offset;
    if (h > 24) {
      h = h - 24;
    }
    if (h < 0) {
      h = h + 24;
    }
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    var abc = {format:h + ":" + m + ":" + s,h,m,s};
    if(func)func(abc);
    if(window.$){
      $(document).trigger("clockutc",[abc]);
    }
    var t = setTimeout(function() {
      startTimeUTC(func);
    }, 500);
  }

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i
    };
    return i;
  }
})();