(function(win) {
     $.progressCircle= function (options) {
          options =  $.extend({ // Default values
              parent:window, // element, center into window
              transition: 0, // millisecond, transition time
              size:40,
              value : 0,
              center:true,
              onFormat: function(s){
                 return s+"%";
              }
         }, options);
        
               
              var size= options.size||40; 
              var parent = options.parent;

            var top = (parent.height() - size) / 2;
            var left = (parent.width() - size) / 2;
            parent.find('[role="progressbar"]').remove();
            style = `--size:${size}px;--top:${top}px;--left:${left}px;`;
            parent.css("position","relative").prepend(`<div class='${options.center?"center":""}' role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="${style}"></div>`);
            var methods =  {
                update : function(per){
                    per = (per*1).toFixed(2);
                    parent.find('[role="progressbar"]').attr("aria-valuenow",options.onFormat(per)).attr("style",`${style}; --value: ${per};`);
                },
                remove : function(){
                    parent.find('[role="progressbar"]').remove();
                }
            };

            methods.update(options.value||0);

         return methods;
    };

     $.fn.progressCircle = function(options) {
         return this.each(function(){
            var methods =$.progressCircle($.extend(options,{
                parent: $(this)
            },true));
             
            $(this).data("progressCircle",methods);
         });
     };
     /*
      var progressCircle = $("div").progressCircle({
         size:40,
      });
      setInterval(function(){
         progressCircle.data("progressCircle").update();
      },1000);
      
      */
      function timer(options){
              var timestart ={ 
                    data:null,
                    left: 0, 
                    start : function(date){
                        
                        var left =(typeof date=="string"?new Date(date).getTime():date)-Date.now();
                        if(left>0){
                            this.left = left/1000;
                            this.run();
                        }else{
                            if(options.onComplete)options.onComplete();
                            this.stop();
                        } 
                    }, 
                    run : function(){
                        var old = this.left;
                        this.idtimer= setInterval(function(){
                            if(timestart.left>0){

                                var secs = timestart.left;

                                const hh = Math.floor(secs / 3600).toString().padStart(2,'0'),
                              mh = Math.floor(secs % 3600 / 60).toString().padStart(2,'0'),
                              sh = Math.floor(secs % 60).toString().padStart(2,'0'),
                              dh = Math.floor(secs / 3600/24).toString().padStart(2,'0');


                               var format= hh + ':' + mh + ':' + sh;

                               

                                

                                var rad = secs*0.000004848;
                                var degrees = rad * (180/Math.PI);

                                var perc = (secs/old)*100;
                                
                                timestart.data = {countdown:old,format:format,degrees:365-degrees,radian:rad,d:dh,h:hh,m:mh,s:sh,per:perc,time:secs};
                                options.onUpdate(timestart.data);
                                timestart.left--;
                                
                            }else{
                                if(options.onComplete)options.onComplete();
                                timestart.stop();
                            }
                         },1000);
                    },
                    stop : function(){
                        if(this.idtimer)clearInterval(this.idtimer);
                    },
                    finish : function(){
                        if(options.onComplete)options.onComplete();
                        this.stop();
                    }
                };


                return timestart;
           }
    win.progressCircleTimer = function(ele,options){
      options = $.extend({

        onUpdate : function(info){
           console.log(info); 
        },
        onComplete: function(){

            console.log("complete"); 
        }
     },options,true);

      var timestart = timer(options);
     var bar = ele.progressCircle({
        size:150,
        center:false,
        value:0,
        onFormat: function(s){
           if(options.onFormat){
             s= options.onFormat.call(timestart,s);
           } 
           return s;
        }
     });

      
        if(options.timer){
          timestart.start(options.timer);
       }
    

     return {
        timer: timestart,
        bar : bar.data("progressCircle")
     };
   };
   /*
   var msgclaim = $(".counter .msgclaim");
     var bar = $(".counter .bar");
     var latest = window.localStorage.getItem("pluto_claim");
     var dd = Date.now() +(30*60*1000);
      if(latest){ 
           dd = isNaN(latest)?new Date(latest).getTime():latest*1;
          
      } 
      //go
     var timestart = progressCircleTimer(bar,{
        timer : dd,
        onFormat: function(s){
           if(this.data){
             return this.data.format;
           }
           return s;
        },
        onUpdate : function(info){
                // console.log(info);
            timestart.bar.update(parseFloat(info.per*100)); 
            msgclaim.html(`<span class="btn btn-primary no">Vui lòng chờ ${info.format} cho lượt kế tiếp.</span>`);
        },
        onComplete: function(){

            msgclaim.html(`<span class="btn btn-primary no btnclaim">Claim ngay</span>`);
        }
     }); 
     <div class="counter">
          <div class="bar"></div>
          <div class="msgclaim"></div>
        </div>
    */
})(window);