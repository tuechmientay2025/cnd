// Extends functionality of ".css()"
// This could be renamed if you'd like (i.e. "$.fn.cssWithListener = func ...")
(function() {
    orig = $.fn.css;
    $.fn.css = function() {
        var result = orig.apply(this, arguments);
        $(this).trigger('stylechanged');
        return result;
    }
})();

Array.prototype.toSelectHtml = function(select,f,selected){
    select.html(this.map(function(v,rowCount){
      if(f)return f(v,rowCount);
      return `<option value="${v.id}" ${selected==v.id=="selected"}>${v.name}</option>`;
   }).join(""));
};
Array.prototype.toRadioHtml = function(select,f,selected){
    select.html(this.map(function(v,rowCount){
      if(f)return f(v,rowCount);
      return `<input type="radio" value="${v.id}" ${selected==v.id=="checked"} name="${select.attr("data-name")}" /> ${v.name}`;
   }).join(""));
};
Array.prototype.toCheckboxHtml = function(select,f,selected){
    select.html(this.map(function(v,rowCount){
      if(f)return f(v,rowCount);
      return `<input type="checkbox" value="${v.id}" ${selected==v.id=="checked"} name="${select.attr("data-name")}[]" /> ${v.name}`;
   }).join(""));
};



String.prototype.Formloader = function(ok,timer){
     ok = ok==undefined?true:ok;
    var m = $(this.toString());
    var loader = m.find(".effect");
    if(!loader.length){
       loader = m.find(".loader");
    }
    if(!loader.length){
       loader = m.find(".btn-loader");
    }



    if(loader.length){
       
       if(ok){
        loader.show().addClass("active");
        setTimeout(function(){
            loader.removeClass("active").hide();
        },(timer||4)*1000);
       }else{
        loader.removeClass("active").hide();
       } 



    }else if(m.attr("data-loader")){
        
        if(ok){
            m.removeClass("loaded");
            setTimeout(function(){
               m.addClass("loaded");
            },(timer||4)*1000);
       }else{
           m.addClass("loaded");
       } 
    }
};


setTimeout(function(){
    $.fn.DataLoader = function(options){

        return this.each(function(){
            var m = $(this);
            var settings = $.extend({},options,true);
            var timer = (settings.timer||3)*1000;
            if(options.url){
                m.attr("data-loader",options.url);
            }
            var url = m.attr("data-loader");

            if(url){
        
               m.removeClass("loaded");
                fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(options.data||{})
              }).then(function(rawResponse){
                return rawResponse.json();
              }).then(function(r){
                  m.addClass("loaded");

                  if(options.callback){
                    options.callback(r)
                  }

              }).error(function(){
                  m.addClass("loaded");
                  if(options.callback){
                    options.callback(null)
                  }
              });
     
                setTimeout(function(){
                   m.addClass("loaded");
                },(timer||4)*1000);
            } 
        });
    };
    $("body").append(`<style>
                [data-loader]{
            position: relative;
            min-height: 105px;
        }
        [data-loader]:not(.loaded):after{
            content: " ";
            height: 100%;
            width: 100%;
            position: absolute;
            z-index: 1000;
            background: url(https://faucet.donggiatri.com/loader.svg) no-repeat;
            background-position: center;
                background-color: rgb(51 51 51 / 6%);
        }
    </style>`);

    //<div class="" data-loader=""></div>


    $(document).on("click","[data-back]",function(){
        window.close();
    }).on("click","[data-dismiss='modal']",function(){
        $(this).closest(".modal").modal("hide");
    });

     
     $.fn.extend({
          center: function (options) {
               var options =  $.extend({ // Default values
                    inside:window, // element, center into window
                    transition: 0, // millisecond, transition time
                    minX:0, // pixel, minimum left element value
                    minY:0, // pixel, minimum top element value
                    withScrolling:true, // booleen, take care of the scrollbar (scrollTop)
                    vertical:true, // booleen, center vertical
                    horizontal:true // booleen, center horizontal
               }, options);
               return this.each(function() {
                    var props = {position:'absolute'};
                    if (options.vertical) {
                         var top = ($(options.inside).height() - $(this).outerHeight()) / 2;
                         if (options.withScrolling) top += $(options.inside).scrollTop() || 0;
                         top = (top > options.minY ? top : options.minY);
                         $.extend(props, {top: top+'px'});
                    }
                    if (options.horizontal) {
                          var left = ($(options.inside).width() - $(this).outerWidth()) / 2;
                          if (options.withScrolling) left += $(options.inside).scrollLeft() || 0;
                          left = (left > options.minX ? left : options.minX);
                          $.extend(props, {left: left+'px'});
                    }
                    if (options.transition > 0) $(this).animate(props, options.transition);
                    else $(this).css(props);
                    return $(this);
               });
          }
     }); 
},100);
