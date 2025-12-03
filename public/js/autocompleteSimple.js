(function(win){
	 win.autocompleteSimplePopup = function(options){
	 	win.autocompleteSimple(null,options);
	 };
	 win.autocompleteSimple = function(ele,options){

     var settings = $.extend({
        key:"fullname",
        title:"Nhập SĐT Khách hàng",
        placeholder:"Tìm kiếm",
        minlength: 3,
        length :1,
        onSelect: function(ele,data){},
        renderItem: function(item){
          return item.name;
        },
        onData: function(callback){},
        onEmty: function(){
            return `<img src="images/icon-empty.png">
            <div class="text-center">
                No item at the moments.
            </div>`;
        }
      },options,true);

    var popupid = "popupsearch";
    var popup = $('#'+popupid);
      if(popup.length==0){
 
        $('body').append(`<style>.popup-autosearch{visibility:hidden!important;-webkit-transition:.3s ease-in-out;-o-transition:.3s ease-in-out;transition:.3s ease-in-out;-webkit-transform:scale(1.3);-ms-transform:scale(1.3);transform:scale(1.3);position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;background-color:rgba(21,17,17,.61);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.popup-content-autosearch{overflow:hidden;background-color:#fefefe;height:90%;width:90%;margin:0 auto;border-radius:8px;position:relative;display:flex;flex-direction:column;padding:8px}.popup-content-autosearch p{font-size:17px;padding:10px;line-height:20px}.popup-content-autosearch a.close{color:#aaa;float:right;font-size:28px;font-weight:700;background:0 0;padding:0;margin:0;text-decoration:none;opacity:1;position:absolute;right:8px;top:0}.popup-content-autosearch a.close:hover{color:#333}.popup-content-autosearch span:focus,.popup-content-autosearch span:hover{color:#000;text-decoration:none;cursor:pointer}.popup-autosearch.active,.popup-autosearch:target{visibility:visible!important;-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);z-index:100000000000}.popup-autosearch h3{margin:10px}.popup-style-2{-webkit-transform:scale(.3);-ms-transform:scale(.3);transform:scale(.3)}.popup-style-2:target,.popup-style-6:target{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}.popup-style-3{left:100%}.popup-style-3:target{left:0}.popup-style-4{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.popup-style-4:target{-webkit-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}.popup-style-5{top:100%}.popup-style-5:target{top:0}.popup-style-6{-webkit-transform:scale(15.3);-ms-transform:scale(15.3);transform:scale(15.3)}.popup-style-7{-webkit-transform:skewY(180deg);-ms-transform:skewY(180deg);transform:skewY(180deg);-webkit-transition:.7s ease-in-out;-o-transition:.7s ease-in-out;transition:.7s ease-in-out}.popup-style-7:target{-webkit-transform:skewY(0);-ms-transform:skewY(0);transform:skewY(0)}.popup-autosearch .sbody .results{padding-top:8px;position:relative}.popup-autosearch .sbody ul{padding:0;list-style:none}.popup-autosearch .sbody ul li{padding:8px 0}.popup-autosearch .sbody ul li.selected{background-color:rgb(51 51 51 / 7%)}</style>
                    <div id="popupsearch" class="popup-autosearch popup-container">
  <div class="popup-content-autosearch">
    <a href="#" class="close" onclick='$("#${popupid}").removeClass("active");return false;'>&times;</a>
    <div class="stheader">
        <h3 class="title">${settings.title}</h3>
    </div>
    <div class="sheader">
        <input type="text" class="form-control" placeholder="${settings.placeholder}">
    </div>
    <div class="sbody ">
        <div class="results"><ul> </ul></div>
    </div>
  </div>
</div>`);

       popup = $('#'+popupid);


       
    }else{
        popup.find(".title").html(settings.title);
    }



         

           var id ="search"+Date.now();
           var resultsWrapper =null;
           var body = null;


           if(ele){
           	  if(win.innerWidth<1024){
	              $(ele).off("click").on("click",function(){
	                if(win.innerWidth<1024){
	                  popup.addClass("active");
	                }
	              }).attr("readonly"); 
	              ele = popup.find(".sheader input");
	              body = popup.find(".sbody");
	              resultsWrapper = body.find(".results"); 

	              
	           }else{
	           	   //for desktop
	               $(ele).removeAttr("readonly");
	               ele = $(ele).wrap(`<div class="autoComplete_wrapper ${id}" style='position:relative;'></div>`);
	               resultsWrapper =$(`<div class="results"> <ul> </ul></div>`);
	               body = $("."+id);
	               body.append(resultsWrapper);

	           }
           }else{
           	  //no input and popup
           	  ele = popup.find(".sheader input");
              body = popup.find(".sbody");
              resultsWrapper = body.find(".results"); 
              setTimeout(function(){
              	popup.addClass("active");
              },200);
           }

           
            
          
            

            var a_results=null;
            //find customer
            function renderResults(results) { 
              a_results=results;
              if (!results || !results.length) {
                   
                  resultsWrapper.show().find("ul").html(settings.onEmty());
                 
                
              }else{
                  var content = results.map(function(item){
                    return `<li data-info='${JSON.stringify(item)}'>${settings.renderItem(item)}</li>`;
                  }). join('');

                  resultsWrapper.show().find("ul").html(`${content}`);
              }

              
            }
            ele.on("keyup",delay(function(){
 
              var val = this.value;
              if(val&&val.length>settings.minlength){
                 resultsWrapper.show().find("ul").html(`<li style="pointer-events: none;"><i class="fa fa-spinner" aria-hidden="true"></i> Đang xử lý</li>`);
                 settings.onData(val,function(data) {
                    renderResults(data);
                 });
                 
              }
        
            },700));


            body.on("click",".results li",function(e){
                if(settings.length==1){
                  $(this).siblings().removeClass("selected");
                  $(this).addClass("selected");
                  var data = $(this).data("info");
            
                  if(data[settings.key]){
                    ele.val(data[settings.key]);
                  }
                }else{
                   $(this).toggleClass("selected");
                }
                

                if(settings.onSelect){
                    if(settings.length==1){

                       settings.onSelect(e.target,[data]);
                       if(win.innerWidth<1024){
                          popup.removeClass("active");
                       }
                    }else{
                      var list = [];
                       $(this).closest(".results").find("li.selected").each(function(){
                          var data = $(this).data("info"); 
                           list.push(data);
                       });
                       if(list.length){
                         settings.onSelect(e.target,list);
                         if(win.innerWidth<1024){
                            popup.removeClass("active");
                         }
                       }
                    }
                } 
              
            });

            //show results
            if(win.innerWidth<1024){
               if(a_results){
                  resultsWrapper.show();
                  resultsWrapper.find("li.selected").removeClass("selected");
               } 
            }else{
              ele.on("focus", function(){
                 if(a_results){
                  resultsWrapper.show();
                  resultsWrapper.find("li.selected").removeClass("selected");
               }
              }).on("blur", delay(function(){
                  resultsWrapper.hide();
              },500));
            }

            ele.focus();
          return {};
      };
	$.fn.autocompleteSimple= function(options){

        return this.each(function(){
          var a = autocompleteSimple(this,options);
          $(this).data("autocompleteSimple",a);
        });
      };
})(window);