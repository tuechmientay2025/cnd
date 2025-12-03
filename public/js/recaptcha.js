(function(win){
    win.pickerCaptcha = function(options){
      options = $.extend({key:GoogleCaptcha.key,callback:function(){}},options,true);
      $.blockUI({onBlock:function(){
        if(grecaptcha){

           grecaptcha.render($("#captchadiv")[0], {
                'sitekey' : options.key,
                'theme' : 'light',
                'callback' : function(response){
                  v.response = response;
                },
              });
           $(".captcha_id .ok").on("click",function(e){
          e.preventDefault();
           var v = $("#captchadiv")[0].response;
           options.callback(v);
        });
           $(".captcha_id .no").on("click",function(e){
          e.preventDefault();
           
           options.callback(0);
          $.unblockUI();
        });
        }else{
               options.callback(1);
        }
          
     },css:{
      width:window.innerWidth<1024?'90%':'300px', 
      left:window.innerWidth<1024?'5%':'35%', 

     },blockMsgClass: 'captcha_idform',message:`<div class="captcha_id"><div class="form-group">
      <p>Xác nhận Capcha</p>
      <div id="captchadiv"></div>  
    </div>
    <div class="text-center">
       <button class="btn no">Đóng</button>
      <button class="btn btn-primary ok">Xác nhận</button>
    </div></div>`});


    }; 

    win.anr_onloadCallback=function (){
      
    };
    var loaded = 0;
    function ready(f){
        if(loaded==0){
            loaded = 1;
            loadJS("https://www.google.com/recaptcha/api.js?onload=anr_onloadCallback&render=explicit",function(){
                delete win.anr_onloadCallback;
            });
        }
        if(win.grecaptcha){
            f();
        }else{
            setTimeout(f,1500);
        }
    }
    //ahlupos
    win.GoogleCaptcha = {
      key : '6Le1obkmAAAAAB6UdlqN_nS0sSTcrv19xKQnfRh3',
      // key : '6LewJyIkAAAAANAxFDHcpEAHo-sA01wuVPdXx66I',
       inline : function(v,key){
            ready(function(){
                 grecaptcha.render(v, {
                    'sitekey' : key||this.key,
                    'theme' : 'light',
                    'callback' : function(response){
                      v.response = response;
                    },
              });
            });
            
        },
       popup : function(options){
         options = $.extend({},options,true);
         var dialog = bootbox.dialog({
            title: 'Xác nhận không phải robot',
            message: '<p><i class="fas fa-spin fa-spinner"></i> Loading...</p>'
        });

         if(document.location.origin.includes("file://")||document.location.origin.includes("localhost")){
            if(options.callback){
                 options.callback(response);
            }
            return;
         }

         var response = null;
        dialog.init(function(){

            dialog.find('.bootbox-body').html(`<div class="ad">
              <a href="http://willgroup.vn/?ref=faucetpos" target="_blank">
                <img style="width: 100%;" src="https://willgroup.vn/wp-content/uploads/2024/09/Banner-DichVu-FacebookAds-Willgroup-0925-2048x769.jpg" /></a>
              </div>
              <div class="g-recaptcha" style="    margin: 18px auto;"></div>
              <p>Bằng cách xác nhận là bạn đã đồng ý với điều khoản của chúng tôi.</p>

              <div class="text-center mr-t-16"><button class="btn btn-primary btnok" readonly>Xác nhận</button>
              </div>`);
            var ele = dialog.find('.g-recaptcha')[0];
            ready(function(){
                grecaptcha.render(ele, {
                    'sitekey' : options.key||GoogleCaptcha.key,
                    'theme' : 'light',
                    'callback' : function(r){
                       response =r;
                       dialog.find('.btnok').removeAttr("readonly");
                    },
                  });
            });
          dialog.find('.btnok').on("click",function(){
              if(options.callback){
                 options.callback(response);
               }
              dialog.modal('hide');
          });
        });
         
       }
    };
})(window);