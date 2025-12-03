$.fn.pointBoxCircle = function(opts){
        return this.each(function () {
            var settings = $.extend({percent:0,color:"normal"},opts,true);
            var point = $(this);
            point.addClass(settings.color).html(`<svg class="round" viewBox="0 0 100 100" style="stroke-dasharray: 360;">  <circle cx="50" cy="50" r="40"></circle>  </svg>
                    <svg class="round run" viewBox="0 0 100 100"  style="stroke-dasharray: 0;"> <circle cx="50" cy="50" r="40"></circle>   </svg>`);
 

              this.run = function(opts){
                  var settings = $.extend({percent:0,color:"normal"},opts,true);
                   var roundPercent = settings.percent;

                  point.find(".round").attr("data-percent",roundPercent);
                  var $round = point.find(".round.run");

                 var roundRadius = $round.find('circle').attr('r'),
                  roundCircum = 2 * roundRadius * Math.PI,
                  roundDraw = roundPercent * roundCircum / 100;
                  $round.css('stroke-dasharray', roundDraw + ' 999');
              };

              this.run($.extend({percent:0,color:"normal"},opts,true));
              point.data("pointBoxCircle",this);
        });
    };
$(document).ready(function(){ 

    
});

window.APPHOST={

    ping : function(f){
        wpajax("wc_client_ctv_report_date",{},function(r){
            console.log(r);

            if(typeof r=="object"){
                r.map(function (v) {
                   var date = v.closed.split(" ")[0];
                    var td = $("#inline_cal .calendar tbody td[data-date="+date+"]");
                    td.find("span.total").remove();
                    td.data("info",v).append(`<span class="total">${show_money_none(v.total_sales||"0")}</span>`);
                });
                 
            }
            if(f)f();
        });
    }
};



(function(){
    var key = "_host"+document.location.host;
    function save(){
        window.localStorage.setItem(key,JSON.stringify(data_cache));
    }
    var data_cache = window.localStorage.getItem(key);
    try{
        data_cache= JSON.parse(data_cache);
    }catch(ex){}


    if(!data_cache)data_cache={};
    String.prototype.storage = function(a){
        var name = String(this);

        return data_cache[name]||a;
    };
    String.prototype.setStorage = function(v){
        var name = String(this);
        data_cache[name] = v;
        save();
        return true;
    };

})();
 