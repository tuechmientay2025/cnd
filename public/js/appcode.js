(function(win){
    var getFavicon = function(){
        var favicon = undefined;
            var nodeList = document.getElementsByTagName("link");
            for (var i = 0; i < nodeList.length; i++)
            {
                if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
                {
                    favicon = nodeList[i].getAttribute("href");
                }
            }
            return favicon;        
    };
    var loaded = 0;
    function init(){
        if(loaded==0){
            loaded = 1;
        
            //$("body").append(`<ul class="ios-notifications"></ul><style>.socials {display: flex;justify-content: space-between;align-items: center;font-size: 12px;}i.fa-whatsapp {color: green;font-weight: 600;}.text-name {font-weight: 600;font-size: 14px;margin-top: 4px;}.text-msg {font-size: 14px;margin-bottom: 4px;}.text-more {font-size: 12px;}i.fa-facebook-f {color: transparent;}i.fa-instagram {color: transparent;}i.fa-twitter {color: transparent;}ul {padding: 0;margin: 0;list-style-type: none;}.ios-notifications {position: absolute;transform-style: preserve-3d;perspective: 800px;cursor: pointer;top: 64px;width: 90%;left: 5%;z-index: 1000000;}.ios-notification_item {position: relative;color: #333;width: 100%;padding: 0.75rem;background: #fff;border-radius: 20px;box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);-webkit-backdrop-filter: saturate(130%) blur(20px);backdrop-filter: saturate(130%) blur(20px);transition: ease-in-out, transform 0.5s ease-in-out;}.ios-notification_item:nth-child(2) {position: absolute;top: 0;left: 0;z-index: -1;color: transparent;transform: translateY(1rem) translateZ(-3rem);background: rgba(255, 255, 255, 0.6);}.ios-notification_item:nth-child(3) {position: absolute;top: 0;left: 0;z-index: -2;color: transparent;transform: translateY(2rem) translateZ(-6rem);background: rgba(255, 255, 255, 0.5);}.ios-notification_item:nth-child(4) {position: absolute;top: 0;left: 0;z-index: -3;color: transparent;transform: translateY(3rem) translateZ(-9rem);background: transparent;box-shadow: none;}.ios-notifications.unfolded .ios-notification_item {color: black;background: #fff;}.ios-notifications.unfolded .ios-notification_item .more {display: none;}.ios-notifications.unfolded .ios-notification_item:nth-child(2) {transform: translateY(calc(100% + 0.5rem));transition: opacity 1s ease-in-out, transform 1s ease-in-out;}.ios-notifications.unfolded .ios-notification_item:nth-child(3) {transform: translateY(calc(200% + 1rem));transition: opacity 1s ease-in-out, transform 1s ease-in-out;}.ios-notifications.unfolded .ios-notification_item:nth-child(4) {transform: translateY(calc(300% + 1.5rem));transition: opacity 1s ease-in-out, transform 1s ease-in-out;}.ios-notifications.unfolded .ios-notification_item:nth-child(2) .fa-facebook-f {color: blue;}.ios-notifications.unfolded .ios-notification_item:nth-child(3) .fa-instagram {color: red;}.ios-notifications.unfolded .ios-notification_item:nth-child(4) .fa-twitter {color: #00acee;}</style>`);
        }
    }
    /////////////////////////////
	var ids = {};

    function msg(s){
        // if(win.toastr){
        //     toastr.info(s);
        // }else if(win.Toast){
        //     Toast.Top(s);
        // }else{
        //     alert(s);
        // }
    }


	// function send(e,data){
    //     console.log(document.location.origin,e);
	// 	if(e)e.postMessage(JSON.stringify(data),"*");
	// }
    

    function send2Parent(data){ 
        data.domain = document.location.host;
        data.domainname = win.name;
        data.hash = Date.now();

        ids[data.id] = data; 

        var p =(win.opener||win.parent);
        var str = JSON.stringify(data);
        p.postMessage(encodeURIComponent(str),"*"); 

        msg(`"${document.location.origin} invoke ${document.referrer}": ${str}`);
    }

    function isiframe(){
        return window.self!=window.top;
    }

    function iframe(id){
        if(!id)return null;
        var a = window.$?$(`iframe[name='${id}']`)[0]:document.querySelector(`iframe[name='${id}']`);
        return a?a.contentWindow:null;
    }

    function action(data,sendf){
        var str = JSON.stringify(data._authcode);
        switch(data.action){
            case "HTML2PDF": 
                var html = data._authcode.html;
                var open = data._authcode.open;

 
                //secure
                if(win.HTML2PDF){ 
                    win.HTML2PDF({html:html,open:open});
                    data.response = 1;   
                }else{ 
                    //sent to server
                    //open new browser
                    data.response = 0; 
                }

                sendf(data);   
            break;
             case "print": 
                var html = data._authcode.html;


                // msg(`"${document.location.origin} OK": ${str}`);

                //secure
                if(win.printer&&win.printer.fromHTML&&html){
                    
                    win.printer.fromHTML(html);
                    data.response = 1;  
                   
                }else{ 
                    data.response = 0; 
                }

                sendf(data);   
            break;
            case "sqlite_query_first": 
                //secure
                if(win.SQLDB){
                    //create and notififi name db with hostname
                    
                    var db = win.SQLDB.create(data.host,function(e){
                        db.query_first(data._authcode.sql,function(r){
                            data.response = r;  
                            sendf(data);
                        });
                    });
                }
                
            break;
            case "sqlite_query": 
                //secure
                if(win.SQLDB){
                    //create and notififi name db with hostname
                    
                    var db = win.SQLDB.create(data.host,function(e){
                        db.query(data._authcode.sql,function(r){
                            data.response = r;  
                            sendf(data);
                        });
                    });
                }
                
            break;
            case "sqlite": 
                //secure
                if(win.SQLDB){
                    //create and notififi name db with hostname
                    
                    win.SQLDB.create(data.host,function(e){
                        data.response = {
                            db : data.host
                        };  
                        sendf(data);
                    });
                }
                
            break;
            case "notification": 
                //from app
                if(win.notificationApp){
                    win.notificationApp(data._authcode);
                }else if(win.showNotification){
                    //from website
                    win.showNotification(data._authcode);
                }else if(win.Notification){
                    data = data._authcode;

                    var run = function(f){
                        if (Notification.permission === 'granted') {
                            // show notification here 
                            f(1);
                        } else {
                            // request permission from user
                            Notification.requestPermission().then(function (p) {
                                if (p === 'granted') {
                                    // show notification here
                                   
                                    f(1);
                                } else {
                                    console.log('User blocked notifications.');
                                    f(0);
                                }
                            }).catch(function (err) {
                                console.error(err);
                                f(0);
                            });
                        }
                    };


                    run(function(ok){
                        var title = data.title||data.name||'Hi there!';
                        var body = data.text||data.message||data.body||'How are you doing?';
                        if(ok){
                             var notify = new Notification(title, $.extend({
                                body: body,
                                icon: getFavicon(),
                            },data,true));
                            notify.onclick = function(){
                                if(data.onclick){
                                    data.onclick();
                                }

                                 notify.close();
                            }
                        }else{
                            if(win.toastr){
                                    
                                if(toastr.Center){
                                    toastr.Center(body,title,"info");
                                }else{
                                    toastr.info(body,title);
                                }
                            }else{
                                alert(body);
                            }
                        }
                    });

                     
                }
                data.response = null;  
                sendf(data);
            break;
            case "device": 
                data.response = win.ADevice||null;  
                sendf(data);
            break;
            
            case "smsphone":
                if(win.SMS){
                    win.SMS.getPhone(function(res){ 
                        data.response = res;  
                        sendf(data);
                    });
                }else{
                    data.response = null;  
                    sendf(data);
                }
            break;
            case "sms":
                if(win.SMS){
                    win.SMS.all({},function(res){
                        try{
                            res=JSON.parse(res);
                        }catch(e){}

                        data.response = res;  
                        sendf(data);
                    });
                }else{
                    data.response = null;  
                    sendf(data);
                }
            break;
            case "contact":
                if(win.Contacts){
                    win.Contacts.all({},function(res){
                        try{
                            res=JSON.parse(res);
                        }catch(e){}

                        data.response = res;  
                        sendf(data);
                    });
                }else{
                    data.response = null;  
                    sendf(data);
                }
            break;
            case "scan":
                if(win.Qrcode){

                    win.Qrcode(function(code){
                        try{
                            code=JSON.parse(code);
                        }catch(e){}

                        data.response = code;  
                        sendf(data);
                    });
                }else{
                    data.response = null;  
                    sendf(data);
                }
            break;
            case "gps":
                if(win.GPS){
                    win.GPS(function(p){  
                        data.response = p;  
                        sendf(data);
                    });
                }else{
                    if (navigator.geolocation) {
                        var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};                  if(win._GPS){
                         data.response = win._GPS;  
                        sendf(data);
                        return ;
                    }
                    navigator.geolocation.getCurrentPosition(function(position) {
                         data.response = win._GPS||{lat:position.coords.latitude,lng:position.coords.longitude};  
                        sendf(data);
                    },function(){},options);
                    navigator.geolocation.watchPosition(function(position){
                        win._GPS = {lat:position.coords.latitude,lng:position.coords.longitude}; 
                    }, function(){},options);
                  }else{
                     data.response = null;  
                    sendf(data);
                  }
                   
                }
            break;
            case "share":
                if(win.Share){
                    win.Share(data);
                }else{
                    data.response = null;  
                    sendf(data);
                }
            break;
            case "openurl":
                data.response = null; 
                if(win.openLink){
                    win.openLink(data.url);
                    sendf(data);
                }else{
                    open(data.url); 
                    sendf(data);
                }
            break;
            case "pickerdoc":
                data.response = null; 
                /**/
                var ac = data.type;
                var many = data.many||1;
                var url = data.url||document.location.origin+"/upload/";

                // Picker.document.image({},function(file){
                //     alert(JSON.stringify(file));
                // });
                // return;

           
               switch (ac) {

                  

                 case "images":

                    window.uploadFiles("images",function(file){ 
                      // console.log(file);

                       uploadFile(file,url,function(r){

                         if(r.code){

                           data.response = { 
                                image: r.url,

                                meta : {

                                   size:file.size,

                                   type:file.type,

                                   name:file.name

                                }

                              }

                           sendf(data);

                         } 
                       },Date.now());

                    },many);

                 break;

                 case "imagesvideos":

                    window.uploadFiles("imagesvideos",function(file){
 
                      // console.log(file);

                       uploadFile(file,url,function(r){

                         if(r.code){

                           var n = {
 
                            meta : {

                               size:file.size,

                               type:file.type,

                               name:file.name

                            }

                          };



                          if(file.type.includes("image")){



                            n.image= r.url;

                          }else{

                             n.video= r.url;

                          }

                           
                            data.response = n;
                            sendf(data);
                         } 
                       },Date.now());

                    },many);

                 break;

                 case "files":
                     

                    window.uploadFiles("files",function(file){
 
                      // console.log(file);

                       uploadFile(file,url,function(r){

                         if(r.code){

                           //find id to update

                           // $('li[data-id="'+file.id+'"]').find(".");

                            var n = {

                       
 
                            meta : {

                               size:file.size,

                               type:file.type,

                               name:file.name

                            }

                          };



                          if(file.type.includes("image")){



                            n.image= r.url;

                          }else if(file.type.includes("video")){

                             n.video= r.url;

                          }else if(file.type.includes("audio")){

                             n.audio= r.url;

                          }else{

                            n.file = r.url;

                          }
 
                          data.response = n;
                          sendf(data);

                         } 

                       },Date.now());

                    },10000);

                 break;

               }
               /**/
                
            break;


        case "auth":
            data.response = win.user&&win.user.hasLogin?win.user.hasLogin():null; 
            sendf(data);
            break;

        default:
            data.response =null; 
            sendf(data);
            break;
        }
    }

	win.addEventListener("message",function(e) {
        var key = e.message ? "message" : "data";
        var data = e[key];

        // console.log("appcode: ",data);
        
        try{
            data = decodeURIComponent(data);
            data=JSON.parse(data);
        }catch(ee){}

        if(typeof data=='string'){
            if(data.includes("ADevice:") && !win.ADevice){
                 win.ADevice = JSON.parse(data.replace("ADevice:",""));
                return; 
            }else  if(data.includes("AppinBackground:")){
                 if(win.$||win.jQuery){
                    (win.$||win.jQuery).trigger("AppinBackground");
                 }
                 
                return; 
            }
           
        }

        if(typeof data=='object' && data._authcode){
            
            
            //check data domain token
            if(data.hash){
                // console.log(`${document.location.origin} OK: ` +JSON.stringify(data));

                if(data.response!==undefined){
                      var f = ids[data.id];
                      if(f){
                        if(typeof f.callback=="function"){
                            // alert("Reply: "+document.location.host+JSON.stringify(data.response));
                            
                            f.callback(data.response,function(){
                                delete ids[data.id];
                            });
                            
                        }
                       
                  } 
                }else{
                    
                    // console.log("Iframe: "+e.origin,data);
                     var a = iframe(data.domainname);
                         if(a){
                            action(data,function(res){ 
                                   a.postMessage(encodeURIComponent(JSON.stringify(res)),"*");
                               
                            });
                         }else{
                            msg(data.domainname+": Not found name iframe.");
                         }
                }
            }
        }
    });

    // setTimeout(function(){
    //     if(isiframe()){
           
    //         // var closewin = win.close;
    //         // win.close = function(){
    //         //     (win.opener||win.parent).postMessage("close_app","*"); 
    //         //     closewin();
    //         // };

            
    //     }else{
           
    //     }
       
    // },30*1000);



    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    var promiseChain = Promise.resolve();
	win.AppCode = {
        isIframe : isiframe,
        isNative : function(){
            return win.ADevice;
        },
        send : function(action,callback){
             var data ={};
            data.action = action; 
            data._authcode = {}; 
            data.id = action+Date.now(); 
            data.callback  = callback; 

                        // send: function(targetFunc, data, success, error) {

            var msgObj = {
                targetFunc: targetFunc,
                data: data || {}
            };

            if (callback) {
                data.msgId = guid();
            }

            // var msg = JSON.stringify(msgObj);

            promiseChain = promiseChain.then(function() {
                return new Promise(function(resolve, reject) {
                    // console.log("sending message " + msgObj.targetFunc);

                     
                    send2Parent(data);

                    resolve();
                });
            }).catch(function(e) {
                if (callback) {
                    callback(null);
                }
                // console.log('rnBridge send failed ' + e.message);
            });
                        

                    
            
        },
        action: action,
        Report : (function(){

                   var popupid = 'popupappcode'+Date.now();
                  var url = null;
                  var host = null;

                 
 
                return function(options){ 
                     options = $.extend({autoShow:1},options,true);
                    
                    var popup =$('#'+popupid);
                    if( popup.length==0){

                     
                      
                        $('body').append(`<style>.popup-appcodeto{visibility:hidden!important; -webkit-transition:.3s ease-in-out;-o-transition:.3s ease-in-out;transition:.3s ease-in-out;-webkit-transform:scale(1.3);-ms-transform:scale(1.3);transform:scale(1.3);position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;background-color:rgba(21,17,17,.61);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.popup-content-appcodeto{overflow: auto;background-color:#fefefe;height:100%;width:100%}.popup-content-appcodeto p{font-size:17px;padding:10px;line-height:20px}.popup-content-appcodeto a.close{color:#aaa;float:right;font-size:28px;font-weight:700;background:0 0;padding:0;margin:0;text-decoration:none}.popup-content-appcodeto a.close:hover{color:#333}.popup-content-appcodeto span:focus,.popup-content-appcodeto span:hover{color:#000;text-decoration:none;cursor:pointer}.popup-appcodeto:target,
                            .popup-appcodeto.active{visibility:visible!important;-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);z-index: 100000000000;}.popup-appcodeto h3{margin:10px}.popup-style-2{-webkit-transform:scale(.3);-ms-transform:scale(.3);transform:scale(.3)}.popup-style-2:target,.popup-style-6:target{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}.popup-style-3{left:100%}.popup-style-3:target{left:0}.popup-style-4{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.popup-style-4:target{-webkit-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}.popup-style-5{top:100%}.popup-style-5:target{top:0}.popup-style-6{-webkit-transform:scale(15.3);-ms-transform:scale(15.3);transform:scale(15.3)}.popup-style-7{-webkit-transform:skewY(180deg);-ms-transform:skewY(180deg);transform:skewY(180deg);-webkit-transition:.7s ease-in-out;-o-transition:.7s ease-in-out;transition:.7s ease-in-out}.popup-style-7:target{-webkit-transform:skewY(0);-ms-transform:skewY(0);transform:skewY(0)}</style>
                                    <div id="${popupid}" class="popup-appcodeto">
                  <div class="popup-content-appcodeto" style="padding: 16px;word-break: break-all;">
                    <a href="#" class="close" onclick='$("#${popupid}").removeClass("active");return false;'>&times;</a>
                    <div><img src="https://www.w3.org/TR/mini-app-white-paper/images/widget_interaction.png" /></div>
                    <h3>Hệ thống chia sẽ Appcode trong hệ thống mini App</h3>
                    <p>Hệ thống hỗ trợ các tính năng sau:</p>
                     <ul>
                     <li>Device : <span class="getdevice">--</span></li>
                     <li>GPS : <span clsss="getgps">--</span></li>
                     <li>Phone : <span class="getphone">--</span></li>
                     <li>Auth : <span class="getauth">--</span></li>
                     <li>Scan : <span class="getscan">--</span>
                        <div><button class="btnscan btn btn-primary">Scan</button></div>
                     </li>
                     <li>SQLite : <span class="sqliteinfo">--</span> 
                     </li>
                     <li>Notification Local
                        <div><button class="btnnotification btn btn-primary">Notification</button></div>
                     </li>
                     </ul>
                  </div>
                </div>`);

                        popup = $('#'+popupid);
 
                        
                    }
                    if(options.reload){
                        popup.find("iframe").attr({
                            src : url,
                            load : onload
                        });
                    }
                    if(options.autoShow){
                        popup.addClass("active");
                    }

                    try{
                        AppCode.Device().then(function(r) {
                              popup.find(".getdevice").html(r?JSON.stringify(r):"--");
                          });

                          AppCode.getAuth().then(function(u) {
                              popup.find(".getauth").html(u?JSON.stringify(u):"--");
                          });

                          AppCode.GPS().then(function(p) {
                              popup.find(".getgps").html(p?JSON.stringify(p):"--");
                          });

                        AppCode.SQLite({},function(info) {
                              popup.find(".sqliteinfo").html(p?JSON.stringify(p):"--");
                        });


                        popup.find(".btnscan").off("click").on("click",function(e){
                            e.preventDefault();
                            AppCode.Scan().then(function(p){
                                popup.find(".getscan").html(p?JSON.stringify(p):"--"); 
                            });
                        });

                        popup.find(".btnnotification").off("click").on("click",function(e){
                            e.preventDefault();
                            AppCode.Notification.local({title:"hello",body:"welcome"}).then(function(p){
                                 
                            });
                        });
                    }catch(er){
                        alert(er);
                    }
                    
                       
                }
           })(),
        SQLite : function(options,resolve){
            options = $.extend({},options,true);
                var data ={};   
                data.action = "sqlite";
           if(isiframe()){
                
                data._authcode = options; 
                data.id = "sqlite"+Date.now(); 
                data.callback  = function(r){
                    resolve(r);
                    //change
                    Appcode.SQLite={
                        query : function(sql,f){
                            var data ={};
                            options.sql = sql;
                            data._authcode = options; 
                            data.id = "sqlitequery"+Date.now();
                            data.action = "sqlite_query"; 
                            data.callback  = f;
                            send2Parent(data);
                        },
                        query_first : function(sql,f){
                            var data ={};
                            options.sql = sql;
                            data._authcode = options; 
                            data.id = "sqlitequery_first"+Date.now();
                            data.action = "sqlite_query_first"; 
                            data.callback  = f;
                            send2Parent(data);
                        }
                    };
                };

                send2Parent(data);
                
            }else{
                action(data,function(res){
                    resolve(res.response);
                });
            }
        },
        Notification:{
            local : function(options){
                /*
                AppCode.Notification.local({
                    title:"alo",
                    body:"ai dang noi xau kia",
                    onclick:function(){
                        alert(1);
                    }
                });
                 */
               
               return new Promise(function(resolve, reject){
                    options = $.extend({},options,true);
                    var data ={};
                    data.action = "notification";
                    data._authcode = options; 
                    data.id = "notification"+Date.now();
                    

                    data.callback  = resolve; 

                    if(isiframe()){  
                        send2Parent(data);
                    }else{
                        if(document.location.host.includes("file://")||document.location.host.includes("http://localhost")){
                            resolve(win.user?win.user.hasLogin():null);
                        }else{
                             
                            action(data,function(res){
                                resolve(res.response);
                            });
                        }
                    }
               }); 
            },
            pusher : function(devicetoken,options){
                /*
                 AppCode.Notification.pusher(
                    {
                    bundle:"app.com",
                    token_ios:"",
                    token_android:"", 
                    title:"alo",
                    body:"ai dang noi xau kia",
                    onclick:function(){
                     alert(1);
                    }
                });

                 AppCode.Notification.pusher(
                    {
                        bundle:"app.com", 
                        user:"",
                        title:"alo",
                        body:"ai dang noi xau kia",
                        onclick:function(){
                         alert(1);
                        }
                    });
                 */
               
               return new Promise(function(resolve, reject){
                    options = $.extend({},options,true);
                    var data ={};
                    data.action = "pusher";
                     data.id = "pusher"+Date.now(); 
                        data.callback  = resolve;

                    if(isiframe()){
                         
                       

                        send2Parent(data);
                    }else{
                        if(document.location.host.includes("file://")||document.location.host.includes("http://localhost")){
                            resolve(win.user?win.user.hasLogin():null);
                        }else{ 
                            action(data,function(res){
                                resolve(res.response);
                            });
                        }
                    }
               }); 
            }
        },
        SMSPhone : function(options){
            options = $.extend({},options,true);
                    var data ={};
               data.action = "smsphone";
           return new Promise(function(resolve, reject){
                if(isiframe()){
                    
                    data._authcode = options; 
                    data.id = "smsphone"+Date.now();
                    

                    data.callback  = resolve;

                    send2Parent(data);
                }else{
                    action(data,function(res){
                            resolve(res.response);
                        });
                }
           }); 
        },
        SMS : function(options){
               
           return new Promise(function(resolve, reject){
                 options = $.extend({},options,true);
                  var data ={};
                  data.action = "sms";

                if(isiframe()){ 
                    data._authcode = options; 
                    data.id = "sms"+Date.now();
                    

                    data.callback  = resolve;

                    send2Parent(data);
                }else{
                    action(data,function(res){
                            resolve(res.response);
                        });
                }
           }); 
        },
        Contact : function(options){
               
           return new Promise(function(resolve, reject){
                options = $.extend({},options,true);
                var data ={};
                data.action = "contact";

                if(isiframe()){
                    
                    data._authcode = options; 
                    data.id = "contact"+Date.now(); 
                    data.callback  = resolve;

                    send2Parent(data);
                }else{
                    action(data,function(res){
                            resolve(res.response);
                        });
                }
           }); 
        },
		Device : function(options){
               
           return new Promise(function(resolve, reject){
                options = $.extend({},options,true);
                var data ={};
                data.action = "device";

                if(isiframe()){
                   
                    data._authcode = options; 
                    data.id = "device"+Date.now();
                    

                    data.callback  = resolve;

                    send2Parent(data);
                }else{
                	action(data,function(res){
                            resolve(res.response);
                        });
                }
           }); 
        },
        GPS : function(options){
               
           return new Promise(function(resolve, reject){
                options = $.extend({},options,true);
                var data ={};
                data.action = "gps";

                if(isiframe()){
                    
                    data._authcode = options; 
                    data.id = "gps"+Date.now();
                    

                    data.callback  = resolve;

                    send2Parent(data);
                }else{
                	action(data,function(res){
                            resolve(res.response);
                        });
                }
           }); 
        },
		Scan : function(options){
               
           return new Promise(function(resolve, reject){
                options = $.extend({},options,true);
                    var data ={};
                    data.action = "scan";
                if(isiframe()){
                   
                    data._authcode = options; 
                    data.id = "scan"+Date.now();
                    

                    data.callback  = resolve; 
                    send2Parent(data);
                }else{
                   action(data,function(res){
                        resolve(res.response);
                    });
                }
           }); 
        },
        getAuth : function(options){
               
           return new Promise(function(resolve, reject){
                 options = $.extend({},options,true);
                var data ={};
                data.action = "auth";
                if(isiframe()){
                   
                    data._authcode = options; 
                    data.id = "auth"+Date.now();
                    

                    data.callback  = function(e){
                        resolve(e);
                    };

                    send2Parent(data);
                }else{
                	if(document.location.host.includes("file://")||document.location.host.includes("http://localhost")){
                		resolve(win.user?win.user.hasLogin():null);
                	}else{
                        action(data,function(res){
                            resolve(res.response);
                        });
                    }
                }
           }); 
        },
        Share : function(options){
               
           return new Promise(function(resolve, reject){
                 options = $.extend({title:document.title,content:"..."},options,true);
                var data ={};
                data.action = "share";
                if(isiframe()){
                   
                    data._authcode = options; 
                    data.id = "share"+Date.now();
                    

                    data.callback  = function(e){
                        resolve(e);
                    };

                    send2Parent(data);
                }else{
                    action(data,function(res){
                        resolve(res.response);
                    });
                }
           }); 
        },
        openLink : function(options){
            return this.openURL(options);
        },
        openURL : function(options){
               
           return new Promise(function(resolve, reject){
                 options = $.extend({title:document.title,url:document.location.href},options,true);
                var data ={};
                data.action = "openurl";
                if(isiframe()){
                   
                    data._authcode = options; 
                    data.id = "openurl"+Date.now();
                    

                    data.callback  = function(e){
                        resolve(e);
                    };

                    send2Parent(data);
                }else{
                    action(data,function(res){
                        resolve(res.response);
                    });
                }
           }); 
        },
        printHTML : function(options){
               
           return new Promise(function(resolve, reject){
                options = typeof options=="string"?{html:options}:options;
                 options = $.extend({html:""},options,true);
                
                var data ={};
                data.action = "print";
                data._authcode = options; 
                
                if(isiframe()){ 
                    data.id = "print"+Date.now();
                    

                    data.callback  = function(e){
                        resolve(e);
                    };

                    send2Parent(data);
                }else{
                    action(data,function(res){
                        resolve(res.response);
                    });
                }
           }); 
        },
        Picker : {
            HTML2PDF : function(html,open){
                return new Promise(function(resolve, reject){
                     options = {html:html,open:open!==undefined?open:1};
                    var data =$.extend({},options,true);
                    data.action = "HTML2PDF";
                  
                    if(isiframe()){
                       
                        data._authcode = options; 
                        data.id = "HTML2PDF"+Date.now();
                        

                        data.callback  = function(e){
                            resolve(e);
                        };

                        send2Parent(data);
                    }else{
                        action(data,function(res){
                            resolve(res.response);
                        });
                    }
               }); 
            },
            images : function(options){
                return new Promise(function(resolve, reject){
                     options = $.extend({},options,true);
                    var data =$.extend({},options,true);
                    data.action = "pickerdoc";
                    data.type = "images"; 

                    if(isiframe()){
                       
                        data._authcode = options; 
                        data.id = "pickerdoc"+Date.now();
                        

                        data.callback  = function(e){
                            resolve(e);
                        };

                        send2Parent(data);
                    }else{
                        action(data,function(res){
                            resolve(res.response);
                        });
                    }
               }); 
            },
            imagesvideos : function(options){
                return new Promise(function(resolve, reject){
                     options = $.extend({many:10},options,true);
                    var data =$.extend({},options,true);
                    data.action = "pickerdoc";
                    data.type = "imagesvideos";
                    if(isiframe()){
                       
                        data._authcode = options; 
                        data.id = "pickerdoc"+Date.now();
                        

                        data.callback  = function(e){
                            resolve(e);
                        };

                        send2Parent(data);
                    }else{
                        action(data,function(res){
                            resolve(res.response);
                        });
                    }
               }); 
            },
            files : function(options){
                return new Promise(function(resolve, reject){
                     options = $.extend({type:"files"},options,true);
                    var data =$.extend({},options,true);
                    data.action = "pickerdoc";
                    data.type = "files";
                    if(isiframe()){
                       
                        data._authcode = options; 
                        data.id = "pickerdoc"+Date.now();
                        

                        data.callback  = function(e){
                            resolve(e);
                        };

                        send2Parent(data);
                    }else{
                        action(data,function(res){
                            resolve(res.response);
                        });
                    }
               }); 
            }
        },
        open : function(data){
            if(win.openWindow){
                return win.openWindow(data);
            }else{
                return win.open(typeof data=='string'?data:data.url);
            } 
        },
        close : function(data){
            //(window.opener||window.parent).postMessage("close","*");
            win.close(); 
        },
        goBack:(function(){
            (function(history){
                var pushState = history.pushState;
                history.pushState = function(state) {
                    if (typeof history.onpushstate == "function") {
                        history.onpushstate({state: state});
                    }
                    // ... whatever else you want to do
                    // maybe call onhashchange e.handler
                    return pushState.apply(history, arguments);
                };
                var rs = history.replaceState; 
              history.replaceState = function(){
                rs.apply(history, arguments); // preserve normal functionality
                //console.log("navigating", arguments); // do something extra here; raise an event
              };
                win.addEventListener('popstate', function(event) {
                  // event.state saves the data in the history
                  console.log('History state change:', event.state);

                 
                   
                });
            })(win.history);
            return function(){
                if(win.hideAll){
                    win.hideAll();
                }else if($(".modal").length){
                    $(".modal").last().modal('hide');
                }else if(win.goBack){
                    win.goBack();
                }
                
            };
        })()
    };
    // win.goBack = win.goBack||AppCode.goBack;
})(window);