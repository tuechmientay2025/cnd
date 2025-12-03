(function(win){
    var date = new Date();
    var year  = date.getFullYear();
    var month  = date.getMonth()+1;

    Date.prototype.monthDays= function(){
      var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
      return d.getDate();
  }

  Date.getDayName= function(str){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = Date.getDayInWeek(str);
    return days[d];
  };

  Date.getDayInWeek= function(str){
     var d = new Date(str||Date.now());
    return d.getDay();
  };

  

  function daysInMonth (month, year) {
      var d =  new Date();
      month = month||d.getMonth();
      year = year||d.getFullYear();
      return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
    }
    

    win.FilterMonth  = function(ele){
      $(ele).html(FilterMonth.HTML());
    };
    win.FilterMonth.HTML  = function(){
      return FilterMonth.toArray().map(function(v){
        return `<option value="${v}">${v}</option>`;
      }).join("");
    };
    win.FilterMonth.toArray  = function(){
      var s =[];
      for(var i=1;i<=12;i++){
        if(i>month)break;
        var m= i<10?"0"+i:i;
        s.push(`${year}-${m}`);
      }
      return s.reverse();
    };
    win.FilterMonth.toJSON  = function(){
      
      return JSON.stringify(win.FilterMonth.toArray());
    };
    if(window.$){
       $.FilterMonth = function (ele,options) {
          win.FilterMonth($(this)[0],options);
       };
       $.fn.FilterMonth = function (options) {
          return this.each(function(){
             win.FilterMonth(this,options);
          });
       };
    }
    
    ////
    win.FilterDate  = function(ele){
      $(ele).html(FilterDate.HTML());
    };
    win.FilterDate.HTML  = function(){
       
      return FilterDate.toArray().map(function(v){
        return `<option value="${v}">${v}</option>`;
      }).join("");
    };
    win.FilterDate.toArray  = function(){
      var dates = date.monthDays();
      var d = date.getDate();
      var s =[];
      for(var i=1;i<=dates;i++){
        if(i>d)break;
        var m= i<10?"0"+i:i;
        s.push(`${year}-${month}-${d}`);
      }
      return s.reverse();
    };
    win.FilterDate.toJSON  = function(){
      
      return JSON.stringify(win.FilterDate.toArray());
    };
    if(window.$){
       $.FilterDate = function (ele,options) {
          win.FilterDate($(this)[0],options);
       };
       $.fn.FilterDate = function (options) {
          return this.each(function(){
             win.FilterDate(this,options);
          });
       };
    }

    if(win.Handlebars){
      Handlebars.registerHelper('timeago', function (s) {
            return moment(s).startOf('hour').fromNow();
      });
    }
})(window);