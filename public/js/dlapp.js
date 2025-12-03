 (function(win){
  var loaded =1;
  function init(){
        $("body").append(`<style>.overlayapp{position:fixed;top:-300px;bottom:0;left:0;right:0;background:rgb(0 0 0 / .7);visibility:hidden;opacity:0;transition:all 0.3s ease;z-index:10000;text-align:center;display:flex;align-items:center;justify-content:center}.overlayapp:target,.overlayapp.active{visibility:visible;opacity:1;top:0}.popupapp{padding:8px;background:#fff;border-radius:5px;width:320px;position:relative;transition:all 5s ease-in-out}.popupapp h2{margin-top:0;color:#333;font-family:Tahoma,Arial,sans-serif}.popupapp .closeapp{position:absolute;top:20px;right:30px;transition:all 200ms;font-size:30px;font-weight:700;text-decoration:none;color:#333}.popupapp .closeapp:hover{color:orange;transform:rotate(90deg)}.popupapp .contentapp{max-height:30%;overflow:auto}</style>
<div id="popup1" class="overlayapp">
  <div class="popupapp">
 
    <a class="closeapp" onclick="window.appdownload.hide()" href="#">×</a>
    <div class="contentapp">
      <div class="">
        
        <img src=""  width="75" height="75" alt="">
         <br>
         <br>
        <p style="font-weight: bold;" class="title">--</p>
        <p class="subtitle">--</p>
        <br/>
        <br/>
        <br/>
        <div>
          <hr>
        <a href="" class="dl">Cài đặt</a>
        <hr>
        <a style="color:red" onclick="window.appdownload.hide()" href="#">Huỷ</a>
        <hr>
        </div>
      </div>
    </div>
  </div>
</div>`);
  }
      win.appdownload ={
         show : function(data){
          if(win.ADevice)return;

          if(loaded==0){
             loaded=1;
             init();
          }

           if(win.innerWidth<1015 && (navigator.appVersion.toLowerCase().includes("iphone") || navigator.appVersion.toLowerCase().includes("ipad")||navigator.appVersion.toLowerCase().includes("android"))){
              data = $.extend({
               android:"",
               ios:"",
               title: "Tải ứng dụng NNN về điện thoại của bạn",
               subtitle: "Truy cập NNN thật dễ dàng và nhanh chóng từ Màn hình chính của điện thoại",
               image: "https://deo.shopeemobile.com/shopee/shopee-mobilemall-live-sg/assets/94270a87ed02e388c43c3a1bbb7fce18.png",
             },data,true);

             var popup = $('#popup1');
             popup.find(".title").html(data.title);
             popup.find(".subtitle").html(data.subtitle);
             popup.find("img").attr("src",data.image);

             popup.find(".l").attr("src",navigator.appVersion.toLowerCase().includes("iphone") || navigator.appVersion.toLowerCase().includes("ipad")?data.ios:data.android);
             popup.addClass('active');
           }
             
         },
         hide : function(){
            $('#popup1').removeClass('active');
         }
      }
    })(window);