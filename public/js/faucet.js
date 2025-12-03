loadJS("https://shortlink.donggiatri.com/assets/ads.min.js",function(){});
function getGPS(f){
    if(window.GPS){
        window.GPS(f);
    }else{

    }
    navigator.geolocation.getCurrentPosition(function(location) {
        f({lat:location.coords.latitude,lng:location.coords.longitude});
    },function(p) {
        f(0);
    });
}


window.faucet = window.faucet||{};
window.faucet.getGPS = function(f){
    var m = this;
    getGPS(function(p){
        m.gps = p;
        if(f)f(p);
    });

};

window.faucet.RN =  {
    makeChat : function(){
      var  settings = {
        socket_url : null,
         
        headers:{},
        name:"Giao dịch", //name room
        room:"barcode",
        server:{
          load : "https://chat.donggiatri.com/test/chat.php",
          add : "https://chat.donggiatri.com/test/chat.php",
          edit : "https://chat.donggiatri.com/test/chat.php",
          delete : "https://chat.donggiatri.com/test/chat.php",
        },
        welcome:{
          text:""
        },
        user:{
             _id: 1,
             avatar:"https://cdn-icons-png.flaticon.com/128/2065/2065064.png",
             name: "demo",
             bundle:"",
             deviceToken:"device_token", 
         }
      };
       window.ChatDB(settings);
    }
};
window.faucet.prefetch = function(f){
    var u = window.user.u; 

    var data_ = {prefetch: 1};
    $(document).trigger("prefetch",[data_]);

    var url = document.location.href;
    fetch(url+(url.includes("?")?"&":"?")+"prefetch=1",{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Auth-token': u&&u.passkey?u.passkey:""
            },
            body: JSON.stringify(data_)
          }).then(function (e) {
                return e.json();
            }).then(function (r) {
                for(var i in r){
                    var a = $(".prefetch_"+i);
                    if(a.length){


                        var v = r[i];
                        v = typeof v =="object"?JSON.stringify(v):v;
                        switch(a[0].nodeName){
                            case "input":
                            case "select":
                               if(a[0].type!="checkbox" &&a[0].type!="radio" &&a[0].type!="file"){
                                    a.val(v);
                               }
                            break;
                            default:
                                a.html(v);
                            break;
                        }
                        
                    }

                }

                if(f)f(r);
    });
};
window.faucet.postBack = function(f){
    if(f){
        post(document.location.href,{prefetch:1},f,true);
    }else{
        return new Promise(function(a,b){
             post(document.location.href,{},function(r){a(r)},true);
        });
    }
    
};


window.faucet.direct = function(s,urr){
    $("body").html(s||"Đang xử lý...");
    document.location.href=urr;
};

window.faucet.qrcode = function(f){
    var u = window.user?window.user.u:null;
       if(u){
            window.Qrcode({barcode:u.barcode||u.email,callback:function(code){
                var old = code;
                code = decodeURIComponent(code);
                
                try{
                    code =JSON.parse(code);
                    switch(code.action){
                        case "pay":
                          var url = "https://faucet.donggiatri.com/modules/payment/id/?_u="+u.passkey+"&info="+old;
                            if(window.ReactNativeWebView){ 
                                window.open({url:url,title:"Thanh toán",hasheader:1,backgroundColor:"#673AB7"});
                            }else{
                                window.open(url);
                            }

                        break;
                        
                        case "paybill":
                          var url = "https://faucet.donggiatri.com/modules/payment/bill/?_u="+u.passkey+"&info="+old;
                            if(window.ReactNativeWebView){ 
                                window.open({url:url,title:"Thanh toán",hasheader:1,backgroundColor:"#673AB7"});
                            }else{
                                window.open(url);
                            }

                        break;

                        case "paydeposit":
                          var url = "https://faucet.donggiatri.com/modules/payment/transfer/?_u="+u.passkey+"&info="+old;
                            if(window.ReactNativeWebView){ 
                                window.open({url:url,title:"Thanh toán",hasheader:1,backgroundColor:"#673AB7"});
                            }else{
                                window.open(url);
                            }

                        break;

                        case "profile":
                            //{action:"emenu",url:"document.location.href",shop_id:"demo"}
                            var dialog = bootbox.dialog({
                                className:"modal-flex",
                                title: 'Welcome',
                                message: `<iframe src="https://chat.donggiatri.com/app/shop/staff/profile.php?\${u.passkey}&shop_id=\${code.shop_id}" style="border:0;width:100%;height:100%" />`,
                                size: 'large',
                             
                               
                            });


                            dialog.find(".bootbox-body").css("height",'100%');

                        break;

                        case "emenu":
                            //{action:"emenu",url:"document.location.href",shop_id:"demo",id_outlet:50,"table":"takeaway",id:1}
                            var dialog = bootbox.dialog({
                                className:"modal-flex",
                                title: 'Welcome',
                                message: `<iframe src="https://chat.donggiatri.com/app/emenu.php?\${u.passkey}&shop_id=\${code.shop_id}&id_outlet=\${code.id_outlet}&table=\${code.table}&id=\${code.id}&_u=" style="border:0;width:100%;height:100%" />`,
                                size: 'large',
                             
                               
                            });


                            dialog.find(".bootbox-body").css("height",'100%');
                            dialog.find(".modal-body").css("padding",'0');

                        break;

                        case "pos":
                            //{action:"pos",url:"document.location.href",shop_id:"demo"}
                            var dialog = bootbox.dialog({
                            className:"modal-flex",
                            title: 'POS',
                            message: `<iframe src="https://reactjs.donggiatri.com/kimthien/pos/?_u=?shop_id=\${code.shop_id}" style="border:0;width:100%;height:100%" />`,
                            size: 'large',
                             
                               
                            });


                            dialog.find(".bootbox-body").css("height",'100%');
                            dialog.find(".modal-body").css("padding",'0');

                        break;

                        case "pos_client":
                            //{action:"pos",url:"document.location.href",shop_id:"demo"}
                            var dialog = bootbox.dialog({
                            className:"modal-flex",
                            title: 'POS',
                            message: `<iframe src="https://reactjs.donggiatri.com/kimthien/pos/?_u=?shop_id=\${code.shop_id}" style="border:0;width:100%;height:100%" />`,
                            size: 'large',
                             
                               
                            });


                            dialog.find(".bootbox-body").css("height",'100%');
                            dialog.find(".modal-body").css("padding",'0');

                        break;
                        default:
                            if(f)f(code);
                            console.log("QRcode not support in faucet system.");

                        break;

                    } 
                }catch(e){
                   if(f)f(e);
                }
                //check ation

                 //go to profilr maybe payment
                    // var url = "https://faucet.donggiatri.com/modules/payment/?id="+code;
                    // if(window.ReactNativeWebView){ 
                    //     window.open({url:url,title:"Thanh toán",hasheader:1,backgroundColor:"#673AB7"});
                    // }else{
                    //     window.open(url);
                    // }
            }});

       }else{
          if(userSDK){
             userSDK.open();
          }else{
             window.user.ui.login();
          } 
       }
};
 





setTimeout(function(){

    (function(){
    if(!window.admod){
        window.admod = function(){
            if(window.MyAds)window.MyAds(function(){});
        }
    }else{
        var abcads = window.admod;
        window.admod  = function(data,func){
           abcads(null,function(error){
             
                if(error.includes("no-fill")){
                     if(window.MyAds)window.MyAds(function(){}).then(function(r){ });
                }
           });
        }
    }

    if(!window.admodbaner){
        window.admodbaner = function(id,pos,func){
             switch (pos) {
                 case "top":
                     
                     break;
                 default:
                     $("body").append(`<div class="footera"><img height="100" width="100%" src="https://placehold.co/315x100/cecece/333/png?text=Ads" /></div>`);
                 break;
             }
        }
    }else{
        var abcads = window.admodbaner;
        window.admodbaner  = function(id,pos,func){
           abcads(null,function(error){
             
                if(error.includes("no-fill")){
                     switch (pos) {
                         case "top":
                             
                             break;
                         default:
                             $("body").append(`<div class="footera"><img height="100" width="100%" src="https://placehold.co/315x100/cecece/333/png?text=Ads" /></div>`);
                         break;
                     }
                }
           });
        }
    }

    //run auto
    var now = Date.now();
    var abc = window.localStorage.getItem("_admod_timer");


    if(abc){
        console.log(abc);
        var t= parseInt(abc);

        var m= (now-t)/(60*1000);


        if(m>29){
            window.admod();
            window.localStorage.setItem("_admod_timer",""+now); 
        }
    }else{
        window.admod(); 
        window.localStorage.setItem("_admod_timer",""+now);
    }
})();

    if(window.RN){
        // window.RN.ui.buttonClose("");
    }


    $("img").attr("onerror","this.src='https://placehold.co/215x125/cecece/333/png?text=Adverting%20here'");

    
    $("body").addClass("loaded");
 
            if(window.innerWidth<9920){
               
                    $("body").append(`<style>.wrapperapp{width: 100%;overflow: hidden;display: flex;flex-direction: column;    background-color: #fff;height:100%}</style>`);
                    
                    // $(".wrapperapp").addClass("pagewrapper homepage page pagetr current-page mp").attr("data-transition","horizontal-easing").attr("data-name",document.location.href.replace(/[^a-z0-9]/ig,""));
 
                $("#loader").hide();
            }else{
                 $("#loader").hide();
            }
            
   $("html").removeAttr("style");

   ///bread     
   $(document).on("click","[data-back]",function(){
      window.history.back();
   }).on("page::onFocus",function(e){
     
   }).on("click","[data-admod]",function(){
       window.admod();
   });


   window.hardwareBackPress = function(){
      if($(".modal.in").length){
        var l = $(".modal.in").length;
        if(l==1){
            $(".modal.in").modal("hide");
        }else{
            $(".modal.in").eq(l-1).modal("hide");
        }
      }else{
         window.history.back();
      }
   }



   window.usercache = MCache("__usercache");
   window.usercache.url = "https://faucet.donggiatri.com/modules/user/database/api/";
   
   $(document).on("onUser",function(a,u){
        window.faucet.postBack();

        // window.admodbaner();
        // window.admod({id:"..."});

       $("a.btn-app").each(function(){
            var href = this.href;
            if(!href.includes("_u="))
            this.href = href+(href.includes("?")?"&":"?")+"_u="+(u&&u.passkey?u.passkey:"");
        });

       window.faucet.prefetch();

       
    }).on("onLogout",function(a){
       fetch(document.location.href,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-token': ""
        },
        body: JSON.stringify({prefetch: 1})
      }).then(function (e) {
            return e.json();
        }).then(function (r) {
            for(var i in r){
                var a = $(".prefetch_"+i);
                var v = r[i];
                v = typeof v =="object"?JSON.stringify(v):v;
                switch(a[0].nodeName){
                    case "input":
                    case "select":
                       if(a[0].type!="checkbox" &&a[0].type!="radio" &&a[0].type!="file"){
                            a.val(v);
                       }
                    break;
                    default:
                        a.html(v);
                    break;
                }
                
            }
        });
    });
    if( window.user){
         window.user.fetch(function(){
        $(document).trigger("Init"); 
    });
    }
   
    


    window.appdownload.show({
       android:"",
       ios:"",
       title: "Tải ứng dụng NNN về điện thoại của bạn",
       subtitle: "Truy cập NNN thật dễ dàng và nhanh chóng từ Màn hình chính của điện thoại",
       image: "https://ripenapps.com/blog/wp-content/uploads/2018/09/Hybrid-App-Development.png",
     });
         
    
    //override 
    window.beforeClick123 = function(e){
         var ele = e.target;

        if(ele.nodeName!="A"){
            ele = ele.parentNode;
        }

        if(ele.nodeName=="A"){
            var href = ele.href;
            if(href){
                
                if(href.match(/^http/ig) && (ele.target=="_blank" || $(ele).hasClass("external"))){
                    e.preventDefault();
                    if(window.ReactNativeWebView){
                        var title = ele.title || ele.alt;
                        window.open({url:href,hasheader:title||0,title:title,backgroundColor:"#673AB7"});
                    }else{
                        window.open(href);
                    }
                }else if(!href.includes("data:text") && !href.includes("blob:") &&  MVC.enable){
                    e.preventDefault();
                 
                   
                    MVC.view(ele.href,function(){
                        $(".navbar-collapse.collapse").removeClass("in");
                    },function(){

                        document.location.href= ele.href;
                    });
                }
 
            }else if(href && href[0]=="/" &&  MVC.enable){
                e.preventDefault();
                MVC.view(href,function(){
                    $(".navbar-collapse.collapse").removeClass("in")
                },function(){
                    
                    document.location.href= ele.href;
                });
            } 
            
        }else{
            var href = $(ele).attr("data-route");
            if(href &&  MVC.enable){
                e.preventDefault();
                MVC.view(href,function(){
                    $(".navbar-collapse.collapse").removeClass("in")
                },function(){
                     document.location.href= ele.href;
                });
            }
        }
    };
},1000);


 
 $(document).on("page",function(e,page){
    // if(window.innerWidth<1015){
    //       $('[data-ads="banner"]').appendTo(".spaceralltop");
    //       $('[data-ads="square"]').appendTo(".spacerall");


    //       $.magnificPopup.open({
    //         items: {
    //           src: $('<div/>').html($('[data-ads="banner-m"]'))
    //         },
    //         type: 'inline'
    //       });
    //   }
 }).on("before_render",function(e,page){
    page.find(".mainappheader").html(`<div style="    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}">
        <button onclick="window.goBack()" type="button" style="    padding-left: 16px;
    background: transparent;
    border: 0;
    font-size: 24px;">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <h1 style="    flex: 1;
    font-size: 16px;    margin: 0;">${page.attr("data-title")||page.attr("alt")||document.title}</h1>
    </div>`);
    // page.find(".mainappheader,footer").remove();
    page.find("footer").remove();
 }).on("on_modulespointindex",function(e,page){
     console.log(page);
 });
function isConsoleOpen() {  
  var startTime = new Date();
  debugger;
  var endTime = new Date();

  return endTime - startTime > 100;
}


 
//   window.onresize = function() {
//   if ((window.outerHeight - window.innerHeight) > 100 || isConsoleOpen()) {
//     $("body").html("Devtools enable");
//   }
// }

// if(isConsoleOpen()){
//     $("body").html("Devtools enable");
// }