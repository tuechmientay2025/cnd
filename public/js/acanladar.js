(function($) {

    $("body").append(` <style>.elegant-calencar{max-width:700px;text-align:center;position:relative;margin:0 auto;overflow:hidden;border-radius:5px;-webkit-box-shadow:0 19px 27px -20px rgba(0,0,0,.16);-moz-box-shadow:0 19px 27px -20px rgba(0,0,0,.16);box-shadow:0 19px 27px -20px rgba(0,0,0,.16)}.elegant-calencar .wrap-header{position:relative;width:100%;background:#39cb75}@media (max-width:767.98px){.elegant-calencar .wrap-header{width:100%;padding-bottom: 8px}}.elegant-calencar .header1{width:100%;position:relative}.elegant-calencar .header1
     .next-button,.elegant-calencar .header1 .pre-button{cursor:pointer;width:1em;height:1em;line-height:1em;border-radius:50%;position:absolute;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);font-size:18px}.elegant-calencar .header1 .next-button i,.elegant-calencar .header1 .pre-button i,.elegant-calencar #today{color:#fff}.elegant-calencar .pre-button{left:5px}.elegant-calencar .next-button{right:5px}.elegant-calencar .head-day{font-size:8em;line-height:1;color:#fff}.elegant-calencar .head-month{line-height:1;color:#fff;font-size:18px;text-transform:uppercase}.elegant-calencar .calendar-wrap{width:100%;background:#fff;padding:8px}.elegant-calencar .calendar{width:100%}.elegant-calencar .calendar tr{height:3em}.elegant-calencar thead tr{color:#000;font-weight:700}.elegant-calencar tbody tr{color:#000}.elegant-calencar tbody td{width:14%;border-radius:50%;cursor:pointer;-webkit-transition:.2s ease-in;-o-transition:.2s ease-in;transition:.2s ease-in;position:relative;z-index:0}.elegant-calencar tbody td:after{position:absolute;top:50%;left:0;right:0;bottom:0;content:'';width:44px;height:44px;margin:0 auto;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);border-radius:50%;-webkit-transition:.3s;-o-transition:.3s;transition:.3s;z-index:-1}@media (prefers-reduced-motion:reduce){.elegant-calencar tbody td:after{-webkit-transition:none;-o-transition:none;transition:none}}.elegant-calencar tbody td:hover,.selected{color:#fff;border:none}.elegant-calencar tbody td:hover:after,.selected:after{background:#2a3246}.elegant-calencar tbody td:active{-webkit-transform:scale(.7);-ms-transform:scale(.7);transform:scale(.7)}#today:after{background:#39cb75}.elegant-calencar #disabled{cursor:default;background:#fff}.elegant-calencar #disabled:hover{background:#fff;color:#c9c9c9}#disabled:hover:after{background:0 0}.elegant-calencar .reset{display:block;position:absolute;right:.5em;top:.5em;z-index:999;color:rgba(255,255,255,.7);cursor:pointer;padding:0 .5em;border:1px solid rgba(255,255,255,.4);border-radius:4px;-webkit-transition:.3s;-o-transition:.3s;transition:.3s;text-transform:uppercase;font-size:11px}.elegant-calencar .reset:hover{color:#fff;border-color:#fff}.elegant-calencar .reset:active{-webkit-transform:scale(.8);-ms-transform:scale(.8);transform:scale(.8)}</style>`);


  var tmp = `<div class="elegant-calencar d-md-flex">
                        <div class="wrap-header d-flex align-items-center">
                            <p class="reset">reset</p>
                            <div class="header1 p-0">
                                <div class="pre-button d-flex align-items-center justify-content-center"><i class="fa fa-chevron-left"></i></div>
                                <div class="head-info">
                                    <div class="head-day"></div>
                                    <div class="head-month"></div>
                                </div>
                                <div class="next-button d-flex align-items-center justify-content-center"><i class="fa fa-chevron-right"></i></div>
                            </div>
                        </div>
                        <div class="calendar-wrap">
                            <table class="calendar">
                                <thead>
                                    <tr>
                                        <th>Sun</th>
                                        <th>Mon</th>
                                        <th>Tue</th>
                                        <th>Wed</th>
                                        <th>Thu</th>
                                        <th>Fri</th>
                                        <th>Sat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>`;

    
    $.fn.ACalandar= function(options){ 
        return this.each(function(){
            var id= "ACalandarid"+Date.now();
            var ele = $(this);
            ele.html(tmp);

            var settings = $.extend({
                onClick:function(){}
            },options,true);

            var today = new Date(),
            year = today.getFullYear(),
            month = today.getMonth(),
            monthTag =["January","February","March","April","May","June","July","August","September","October","November","December"],
            day = today.getDate(),
            days = this.querySelectorAll('td'),
            selectedDay,
            setDate,
            daysLen = days.length;

            ele.on("click",".calendar td",function(e){
               
                var date  = $(this).attr("data-date");
                var in_ = date.split("-");
                settings.onClick.call(this,{date:date,year:in_[0],month:in_[1],day:in_[2]});
            });


            function Calendar(selector, options) {
                this.options = options;
                this.selector = selector;

                this.draw();
            }
            
            Calendar.prototype.draw  = function() {
                this.getCookie('selected_day');
                this.getOptions();
                this.drawDays();
                var that = this,
                    reset = ele.find('.reset')[0],
                    pre = ele.find('.pre-button')[0],
                    next = ele.find('.next-button')[0];
                    
                    pre.addEventListener('click', function(){that.preMonth(); });
                    next.addEventListener('click', function(){that.nextMonth(); });
                    reset.addEventListener('click', function(){that.reset(); });
                while(daysLen--) {
                    days[daysLen].addEventListener('click', function(){that.clickDay(this); });
                }
            };
            
            Calendar.prototype.drawHeader = function(e) {
                var headDay = ele.find('.head-day'),
                    headMonth = ele.find('.head-month');

                    e?headDay[0].innerHTML = e : headDay[0].innerHTML = day;
                    headMonth[0].innerHTML = monthTag[month] +" - " + year;        
             };
            
            Calendar.prototype.drawDays = function() {
                var startDay = new Date(year, month, 1).getDay(),
         
                    nDays = new Date(year, month + 1, 0).getDate(),
            
                    n = startDay;
         
                for(var k = 0; k <42; k++) {
                    days[k].innerHTML = '';
                    days[k].id = '';
                    days[k].className = '';
                }

                for(var i  = 1; i <= nDays ; i++) {
                    days[n].innerHTML = `<span class="d">${i}</span>`; 
                    $(days[n]).attr("data-date",`${year}-${month + 1}-${i<10?"0":""}${i}`);
                    n++;
                }
                
                for(var j = 0; j < 42; j++) {
                    if(days[j].innerHTML === ""){
                        
                        days[j].id = "disabled";
                        
                    }else if(j === day + startDay - 1){
                        if((this.options && (month === setDate.getMonth()) && (year === setDate.getFullYear())) || (!this.options && (month === today.getMonth())&&(year===today.getFullYear()))){
                            this.drawHeader(day);
                            days[j].id = "today";
                        }
                    }
                    if(selectedDay){
                        if((j === selectedDay.getDate() + startDay - 1)&&(month === selectedDay.getMonth())&&(year === selectedDay.getFullYear())){
                        days[j].className = "selected";
                        this.drawHeader(selectedDay.getDate());
                        }
                    }
                }
            };
            
            Calendar.prototype.clickDay = function(o) {
                var selected = ele.find(".selected"),
                    len = selected.length;
                if(len !== 0){
                    selected[0].className = "";
                }
                o.className = "selected";
                selectedDay = new Date(year, month, o.innerHTML*1);


                this.drawHeader(o.innerHTML);
                this.setCookie('selected_day', 1);
                // selected[0].date = selectedDay;

                
            };
            
            Calendar.prototype.preMonth = function() {
                if(month < 1){ 
                    month = 11;
                    year = year - 1; 
                }else{
                    month = month - 1;
                }
                this.drawHeader(1);
                this.drawDays();
            };
            
            Calendar.prototype.nextMonth = function() {
                if(month >= 11){
                    month = 0;
                    year =  year + 1; 
                }else{
                    month = month + 1;
                }
                this.drawHeader(1);
                this.drawDays();
            };
            
            Calendar.prototype.getOptions = function() {
                if(this.options){
                    var sets = this.options.split('-');
                        setDate = new Date(sets[0], sets[1]-1, sets[2]);
                        day = setDate.getDate();
                        year = setDate.getFullYear();
                        month = setDate.getMonth();
                }
            };
            
             Calendar.prototype.reset = function() {
                 month = today.getMonth();
                 year = today.getFullYear();
                 day = today.getDate();
                 this.options = undefined;
                 this.drawDays();
             };
            
            Calendar.prototype.setCookie = function(name, expiredays){
                if(expiredays) {
                    var date = new Date();
                    date.setTime(date.getTime() + (expiredays*24*60*60*1000));
                    var expires = "; expires=" +date.toGMTString();
                }else{
                    var expires = "";
                }
                document.cookie = name + "=" + selectedDay + expires + "; path=/";
            };
            
            Calendar.prototype.getCookie = function(name) {
                if(document.cookie.length){
                    var arrCookie  = document.cookie.split(';'),
                        nameEQ = name + "=";
                    for(var i = 0, cLen = arrCookie.length; i < cLen; i++) {
                        var c = arrCookie[i];
                        while (c.charAt(0)==' ') {
                            c = c.substring(1,c.length);
                            
                        }
                        if (c.indexOf(nameEQ) === 0) {
                            selectedDay =  new Date(c.substring(nameEQ.length, c.length));
                        }
                    }
                }
            };

            var calendar = new Calendar();

            $(this).data("ACalandar",calendar);
        });
     };

})(jQuery);
 