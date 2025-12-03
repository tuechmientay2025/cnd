(function(win){

  function getCookie(d) {

    var b = d + "=";

    var a = document.cookie.split(";");

    for (var e = 0; e < a.length; e++) {

        var f = a[e].trim();

        if (f.indexOf(b) == 0) {

            return f.substring(b.length, f.length)

        }

    }

    return ""

}
var loaded = 0;
  function ready(f){
      if(loaded==0){
          loaded = 1;
          loadJS('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',function(){
            
          });
      }
      if(win.google &&win.google.translate){
          f();
      }else{
          setTimeout(f,1500);
      }
  }

win.initLanguage = function(){
    ready(function(){
         
    }); 
};
win.showLanguage = function(lang){
    ready(function(){
         $("#popuplang").fadeIn();

        if(lang){

           win.activeLanguage(lang);

           $(".listl li").removeClass("active");

            $(".listl li[data-id='"+lang+"']").addClass("active");

        }
    });
     

  }; 
  win.hideLanguage= function(){

      $("#popuplang").fadeOut(); 

  }; 
  win.activeLanguage= function(l){

      var selectField = $("select.goog-te-combo")[0];

       for(var i=0; i < selectField.children.length; i++){

          var option = selectField.children[i];

          // find desired langauge and change the former language of the hidden selection-field 

          if(option.value==l){

             selectField.selectedIndex = i;

             // trigger change event afterwards to make google-lib translate this side

             selectField.dispatchEvent(new Event('change'));

             break;

          }

        }

  };


  win.googleTranslateElementInit = function(){



  $("body").append(`

    <style>#popuplang,#popuplang #close{text-align:center;box-shadow:0 0 10px 0 #000}#popuplang,.skiptranslate.goog-te-gadget span{display:none}#popuplang{z-index:1000000000;position:fixed;border-radius:5px;z-index:10;height:100%;width:100%;left:0;background-color:rgb(51 51 51 / 55%)}#popuplang #tweet{color:#4099ff}#popuplang #close{position:absolute;background:#000;color:#fff;right:-15px;top:-15px;border-radius:50%;width:30px;height:30px;line-height:30px;font-size:8px;font-weight:700;font-family:'Arial Black',Arial,sans-serif;cursor:pointer}#popuplang .body{height:100%;display:flex;align-items:center;justify-content:center}#popuplang .body-content{background-color:#fff;width:320px;border-radius:8px;position:relative}#popuplang .listl{list-style:none;padding:0}#popuplang .listl li{padding:8px}#popuplang .listl li.active{background-color:orange;color:#fff}.app-tab,body{top:0!important}body>.skiptranslate{display:none!important}.skiptranslate.goog-te-gadget .h{width:70px;position:absolute;background:#f4f7f8;top:0;z-index:10;height:27px}.hid,.skiptranslate.goog-te-gadget{text-indent:-9999px}@media (max-width:768px){#google_translate_element{left:0;text-align:center}}select.goog-te-combo{height:30px;position:relative;top:7px}</style>

    <div id="popuplang" translate="no">

    <div class="body">

     <div class="body-content">

      <div id="close" onclick="hideLanguage()">X</div>

    

    <div id="google_translate_element" class="hide"></div>

    <ul class="listl notranslate"></ul>

          </div>

          </div>

  </div>`);
  



  



 



  // if(win.innerWidth<1200){

  //    $("#google_translate_element").insertAfter($(".navbar-header button"));

  // }



    new google.translate.TranslateElement({autoDisplay: false,pageLanguage: $("body").data("lang"),includedLanguages: 'vi,ar,en,es,jv,ko,pa,pt,ru,zh-CN,th,fr,ja,lo,ms',layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT}, 'google_translate_element');

    

     

      $("#google_translate_element").removeClass("hid").addClass('notranslate');



      var a = $(".skiptranslate.goog-te-gadget > div").eq(0);

      a.insertBefore($(".skiptranslate.goog-te-gadget"));

      setTimeout(function(){



        var lang = getCookie('googtrans');

        if(lang){

          lang = lang.split("/")[2];

        }else{

          lang = win.localStorage.getItem("googtrans");

        }

        if(!lang){

          lang='en';

        }

 

 

          var list = $(".listl");

            $("select.goog-te-combo option").each(function(i,v){

              if(i>0){

                var li = $(`<li data-id="${v.value}">

                  <span>${v.text}</span>

                </li>`);

               

               if(v.value==lang){ 

                 li.addClass("active");

               }



               list.append(li);

              }

              

            });



            $(document).on("click",".listl li",function(){

              $(".listl li").removeClass("active");

              $(this).addClass("active");

              var l = $(this).attr("data-id");

              win.activeLanguage(l);

            });



             // win.activeLanguage(lang);

             //  $(".listl li[data-id='"+lang+"']").addClass("active");





             setTimeout(function(){

                 $("div circle").closest("div").hide();

             },2000);



      },1000);

    

}






})(window);