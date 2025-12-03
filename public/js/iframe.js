
if(!window.IframePost){
    function md5(inputString) {
    var hc="0123456789abcdef";
    function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
    function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
    function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
    function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
    function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
    function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
    function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
    function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
    function sb(x) {
        var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
        for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
        blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
    }
    var i,x=sb(""+inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
    for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
        a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
        b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
        c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
        d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
        a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
        b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
        c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
        d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
        a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
        b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
        c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
        d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
        a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
        b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
        c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
        d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
        a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
        b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
        c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
        d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
        a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
        b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
    }
    return rh(a)+rh(b)+rh(c)+rh(d);
}

 (function(){
 
    window.IframePost = function(options){
        var keyaccess = options?options.key:"_crossiddata";
        var callback_bridges = {};

        return {
             iframe:null,
             onload : function(){
                this.iframe = this.contentWindow;
                delete this.onload;
             },
             send2Host : function(data,target){
                var e = {"side":'c'};
                e[keyaccess] = data;
                
                (target||(window.opener||window.parent)).postMessage(JSON.stringify(e),"*");
                return this;
             },
             listen : function(callback){
             
                   
                  //listen from data -> any domain
                    window.addEventListener("message",function(e) {
                            var key = e.message ? "message" : "data";
                            var data = e[key];

                            if(data=="uclose"){
                                // $('#'+popupid).removeClass('active');
                            }

                            // console.log(e);
                            try{
                                data=JSON.parse(data);
                            }catch(e){}


 

                            //server trigger me
                            if(typeof data=='object' && data.side=='s'){

                                data = data[keyaccess]; 
                                if(callback)callback(data);
                              
                                
                               var call_ = callback_bridges[data.id_callback];   
                              if(call_ && data.response){

                                call_.success.call(callback_bridges,data.response);
                                if(call_.live==0){
                                 delete callback_bridges[data.id_callback];
                                }
                              }
                               
                            }
                           
                    },true);
                 
                return this;
             },
            once: function(data,f,ff){
               
               if(this.iframe){
                    if(f){
                        var e ={
                            data : data
                        };
                        e.id_callback = "fn"+Date.now();
                        e.success = f;
                        e.live =1;
                        e.error = ff;
                        callback_bridges[e.id_callback] = e;

                        data.id_callback = e.id_callback;
                    }
                  
                  this.send2Host(data);
                }else{
                    console.error('Can not connect to server');
                }
               
            },
            on: function(data,f,ff){
               
               if(this.iframe){
                    if(f){
                        var e ={
                            data : data
                        };
                        e.id_callback = "fn"+Date.now();
                        e.success = f;
                        e.error = ff;
                        e.live =0;
                        callback_bridges[e.id_callback] = e;

                        data.id_callback = e.id_callback;
                    }
                  
                  this.send2Host(data);
                }else{
                    console.error('Can not connect to server');
                }
               
            },
            call: function(data,f,ff){
               
               if(this.iframe){
                    if(f){
                        var e ={
                            data : data
                        };
                        e.id_callback = "fn"+Date.now();
                        e.success = f;
                        e.error = ff;
                        callback_bridges[e.id_callback] = e;

                        data.id_callback = e.id_callback;
                    }
                  var ee ={side:'c'};
                  ee[keyaccess] = data;
                  this.iframe.postMessage(JSON.stringify(ee),"*");
                }else{
                    console.error('Can not connect to server');
                }
               
            }
          };

    }; 

})();

(function(win){
    
        setTimeout(function(){
            
            var nn = win.$||win.jQuery;
            if(nn){
                nn(document).on("onBack",function(e,info){
                    if(nn(".iframewindpow.active").length){
                        //stop back
                        info.data =0;
                        nn(".iframewindpow.active").last().removeClass("active");
                    }
                });
            }
        },2*1000);
    
    var iframes ={};
    var iframeWindowload = 0;
    var lists = {};
    var history =[];
    win.iframeWindow= function (options){
         if(iframeWindowload==0){
            iframeWindowload =1;
            jQuery("body").append(`<style>
.iframewindpowhidden{overflow:hidden}
.iframewindpow iframe{    border-radius: 8px 8px 0 0;    border: none;}
.iframewindpow,.iframewindpow iframe{width:100%;height:100%},.iframewindpow iframe{border-radius: 28px;
    overflow: hidden;}.iframewindpow{visibility:hidden!important;z-index:10000000000000;-webkit-transition:.3s ease-in;-o-transition:.3s ease-in;transition:.3s ease-in;background-color:rgb(51 51 51 / 19%);-webkit-transform:translateY(100%);-ms-transform:translateY(100%);transform:translateY(100%)}.iframewindpow .body{height:90%;border-radius:24px 24px 0 0;padding:0;width:100%;background-color:#fff;color:#333;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.iframewindpow,.iframewindpow .body{position:absolute;bottom:0;left:0}.iframewindpow.active{z-index:10000000000001;visibility:visible!important;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}.iframewindpow .flex{-webkit-box-flex:1;-ms-flex:1;flex:1}.iframewindpow .btnok{width:100%;text-align:center}.iframewindpow .ac{top: -7%;position:absolute;left: 45%;}.iframewindpow .ac span{    font-size: 20px;
    color: #fff;
    background-color: #333;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: inline-block;
    text-align: center;
    line-height: 40px;}

    .iframewindpow{
        position:fixed;
    }
    .iframewindpow .flex-body{
            border-radius: 16px 16px 0 0;
    overflow: hidden;
    }
    .iframewindpow.bottom{
            bottom: initial;
    top: 0;
    }
    .iframewindpow.bottom .body{
            border-radius: 0 0 16px 16px;
    top: 0;
    bottom: initial;
    }
    .iframewindpow.bottom .body .flex-body{
            border-radius: 0;
    }
    .iframewindpow.bottom .ac{
        bottom: -8%;
        top: initial;
    position: absolute;
    left: 45%;
    }


    @media   (min-width: 1200px) {
      .iframewindpow .body{
            width: 70%;
            margin-left: 15%;
      }
    }

    
            </style>`);
         }
         options = $.extend({},typeof options=="object"?options:{url:options},true) ;
         options.url = decodeURIComponent(options.url);

         var id = md5(options.url);

         if(lists[id]){
            return lists[id].open().onActiveUI(); 
         }

        

         var frame = jQuery("#"+id);
         if(frame.length==0){
            jQuery("body").append(`<div id="${id}" class="iframewindpow">

                   <div class="body">

                     <div class="ac">

                      <span>X</span>

                     </div>

                     <div class="flex flex-body">
                        <iframe frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen src="${options.url}" name="${id}" />
                     </div>
                      

                  </div>

                </div>`);
             frame = jQuery("#"+id);   
             if(options.width){
                frame.find(".body").width(options.width);
             }
             frame.find(".ac").on("click",function(e){
                e.preventDefault();
                if(options.autoClose){
                    frame.remove();
                }else{
                     methods.close();
                }
               
             });
             frame.find("iframe").load(function(){
                frame.window = this.contentWindow;
                if(options.callback)options.callback();

                if(win.ADevice){
                    this.contentWindow.postMessage(encodeURIComponent("ADevice:"+JSON.stringify(win.ADevice)),"*");
                }

                if(frame.f){
                    frame.f.call(methods);
                    delete frame.f;
                }
                
             });
         }
        frame.callbacks ={};
         var methods={
            settings:options,
            console : function(f){
                this.send("console",{},function(r){
                    if(f)f(r);
                });
                return this;
            },
            ready : function(f){
                frame.f = f;
                return this;
            },
            open : function(silent){
                 history.push(id);
                setTimeout(function(){
                    if(!silent){
                        frame.addClass("active");

                        $("body").addClass("iframewindpowhidden");
                    }
                    
                    if(frame.f){
                        frame.f.call(methods);
                    }
                },500);
                return this;
            },
            close : function(){
                frame.removeClass("active");
                $("body").removeClass("iframewindpowhidden");
                if(frame.window)frame.window.postMessage("AppinBackground","*");
                return this;
            },
            remove : function(){
                frame.remove();
                delete iframes["frame"+id];
                delete lists[id];
                return this;
            },
            window:function(data){
                if(frame.window){ 
                    frame.window.postMessage(data,"*");
                }
                return this;
            },
            passkey:function(passkey){
                if(frame.window){ 
                    frame.window.postMessage("passkey:"+passkey,"*");
                }
                return this;
            },
            onActiveUI:function(){
                if(frame.window){ 
                    frame.window.postMessage("onActiveUI","*");
                }
                return this;
            },
            send:function(e,data,f){
                if(frame.window){
                    data.id =e+Date.now();
                    data.bridge = "frame"+id;
                    data.ac = e;
                    data.data = data;
                    data.callback = f||function(){};
                    frame.callbacks[data.id] = data; 
                    frame.window.postMessage(encodeURIComponent(JSON.stringify(data||{})),"*");
                }
                return this;
            }
         };

         iframes["frame"+id] = frame;
         lists[id] = methods;
         if(methods.settings.silent){
            lists[id].open(1);
         }
         return methods;
     };
    win.addEventListener("click",function(e){
        var ele = $(e.target);
        var url = ele.attr("openWindow");
        if(url){
            e.preventDefault();
            iframeWindow(url).open();
            return;  
        }

        url = ele.attr("openWindow-auto");
        if(url){
            e.preventDefault();
            iframeWindow(url).open();  
        }
         
    },false);

    iframeWindow.auto = function() {
        $("[openWindow-auto]").each(function(){
            if(!this.loaded){
                this.loaded =1;
                var info = iframeWindow({url:$(this).attr("openWindow-auto"),silent:1});
                info.ready(function(){
                    var content = $("meta[name='auth-token']").attr("content");
                    if(content)this.passkey(content);
                });
            } 
       });
    };

    setTimeout(iframeWindow.auto,60*1000);
      win.addEventListener("message",function(e){
        var data = decodeURIComponent(e.data);
        if(typeof data =="string"&&data.includes("iframewindow:")){
            
            //check in level top 0
            if(win.top==win.self){
                var url = decodeURIComponent(data.replace("iframewindow:",""));
                // alert(document.location.href+" OK: "+url);
                iframeWindow(url).open();
            }
            
            return;   
        }
        if(typeof data =="string"&&data.includes("onActiveUI")){
            
            //check in level top 0
            if(win.top==win.self){
                win.focus();
                $(win).trigger("focus");
            }
            
            return;   
        }
        try{
            data = JSON.parse(data);
        }catch(eee){}

        if(typeof data =="object"&& data.bridge){
            
            if(iframes[data.bridge]){
               
               //callback
               if(iframes[data.bridge].callbacks[data.id]){
                  iframes[data.bridge].callbacks[data.id].callback(data.response);
               }
               //check console
               if(iframes[data.bridge].callbacks.console){
                 iframes[data.bridge].callbacks.console.callback(data);
               }
       
            }
        }
    });
     /**
      * Tell sub sub iframe tel open window
      * @param  {[type]} url [description]
      * @return {[type]}     [description]
      */
     win.openWindow = function(url){
         if(win.top==win.self){
            return iframeWindow(url).open();
         }else{
            (win.opener||win.parent).postMessage(encodeURIComponent("iframewindow:"+url),"*");
         }
         
     };
     openWindow.reset = function(idframe){
        history=[idframe];
        $(".iframewindpow").removeClass("active");
        $("#"+idframe).removeClass("active");
     };
     openWindow.navigate = function(idframe){
        history.push(idframe);
         $("#"+idframe).addClass("active"); 
     };
     openWindow.back = function(){
        if(history.length){
            var n = history.pop();
            $("#"+n).removeClass("active");
            var last = history[history.length];
            if(last)
            $("#"+last).addClass("active");
        }
        
     };
     var underOpen = function(items){
       
            var l = items.length;
            

            function next(i){
                var href = items[i];
                if(href){
                    iframeWindow({url:href,callback:function(){
                        if(i<l){
                            next(i+1);
                        }
                    }});
                }
                
            }

            next(0);
         
    };

     openWindow.underOpen = function(ele){
       
            var items = jQuery(ele);
            var l = [];
             items.each(function(){
                var href = this.href||$(this).attr("data-href");
                if(href)l.push(href);
             });
         
            underOpen(l);
             
     };


})(window);
}

/*

(function(win){
var IFrameBridge_events = {};
win.IFrameBridge = function (options){
    
    return new Promise(function(a,b){
        var id ="d"+Date.now();
        IFrameBridge_events[id]= {};
        var window_ = null;
        var methods ={

            send : function(data){
                var n ={};
                n[id] = data;
                window_.postMessage(JSON.stringify(n),"*");
                return this;
            },
            on : function(e,f){
                if(!IFrameBridge_events[id][e])IFrameBridge_events[id][e]=[];
                IFrameBridge_events[id][e].push(f);
                return this;
            }
        };

        options.parent.html(`<iframe src="" name="${id}"></iframe>`);
        options.parent.find("iframe").css({
          url : options.url,
          load : function(){
            window_ = this.contentWindow;
          }
        });

        a(methods)
    });
};

win.IFrameBridge.parent = (function(){
    var nn = win.name;
    var window_ = (win.opener||win.parent);

    win.addEventListener("message",function(evt){
        var m = evt.data;

         if(m=="close-iframe"){
           win.close();
           return;
         }
          
         if(typeof m=='string'&&m.includes(nn)){
            var data = null;
            try{
                data = JSON.parse(m)[nn];
            }catch(e){}

            if(typeof data=="object"){
                console.log(nn+": ",data);
                $(document).trigger(data.ac,[data]);
            }
        }
    });
    
    return {
      on : function(e,f){
        $(document).on(e,function(e,data){
            f(data);
        });
      },
      send : function(data,f){
         var n ={};
        n[nn] = data;
        window_.postMessage(JSON.stringify(n),"*"); 
      }
    };
})();

})(window);
 

//main frame
IFrameBridge({url,parent}).then(function(res){
    res.on("a",function(){

    }); 
    res.send({},function(r){

    });
});
//inside iframe

IFrameBridge.parent().on("",function(res){
    
});
IFrameBridge.parent().send({},function(r){
    
});

//////////////////////////////////////////
 */

