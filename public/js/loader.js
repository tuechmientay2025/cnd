$(document).ready(function(){
  window.eleloader  =function(ele,timer){
    ele.addClass("loaddata");
    setTimeout(function(){
        ele.removeClass("loaddata");
    },timer||3000);
  };
    $.fn.eleloader = function(options){

  return this.each(function(){
      window.eleloader($(this));
  });
};

	$("body").append(`<style>
	.loaddata,[data-loader],[data-setbg],[data-lazy]{
  min-height: 130px;
  position: relative;
  top: 0;
  width: 100%;
      overflow: hidden;
      pointer-events: none;
}
button.loaddata,.btn.loaddata,input[type="submit"]{
      min-height: initial!important;
}
.loaddata:before,[data-loader]:before,[data-setbg]:before,[data-lazy]:before{
  content: " ";
    position: absolute;
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOy8qIGJhY2tncm91bmQ6IHJnYigyNDEsIDI0MiwgMjQzKTsgKi9kaXNwbGF5OiBibG9jazsiIHdpZHRoPSI0MHB4IiBoZWlnaHQ9IjQwcHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+CjxwYXRoIGQ9Ik0xMCA1MEE0MCA0MCAwIDAgMCA5MCA1MEE0MCA0MiAwIDAgMSAxMCA1MCIgZmlsbD0iI2M0NDEyOSIgc3Ryb2tlPSJub25lIj4KICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGtleVRpbWVzPSIwOzEiIHZhbHVlcz0iMCA1MCA1MTszNjAgNTAgNTEiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9wYXRoPgo8L3N2Zz4=) no-repeat;
    z-index: 1000000000;
    background-position: center;
    background-size: contain;
    height: 45px;
    width: 45px;
    display: block;
    left: 46%;
    top: 45%;
}
.loaddata:after,[data-loader]:after{    
 content: " ";
    position: absolute;
     z-index: 100000000; 
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    background-color: rgb(51 51 51 / 39%); 
}	
	</style>`);


  $(document).on("click",'form button,form input[type="submit"],.btnloader',function(){
      window.eleloader($(this));
  });

	$.fn.dataloader = function(options){

  return this.each(function(){
    function post(data,f){
       $.ajax({
        url: url,
        async: true,  
        data: data||{},
        type:"POST",
        success: function (json) {
          try{
              json= JSON.parse(json);
          }catch(e){
              
          } 
          if(f)f(json);
        },
        error: function(a,b,c){
            this.success(a.responseText);
        }
      }); 
    }
     var settings  = $.extend({
       onResult : function(){}
     },options,true);
     var ele = $(this);
     var timer = ele.attr("data-timer");
     var url = ele.attr("data-loader");


     

     this.reload = function(){
        if(url){
            if(timer){
               setTimeout(function(){
                 post({},settings.onResult);
               },timer*1);
            }else{
              post({},settings.onResult);
            }
         }
     };


     this.reload();
     ele.data("dataloader",this);
  });
};
});
/*

 */