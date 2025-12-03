(function(win){
    //for i frame askfor user center
     win.addEventListener("message",function(e){
        var data = e.data;
        if(typeof data=="string"&&data.includes("passkey:")){
            
            var passkey = data.replace("passkey:","");
               
        }
    },false);
    //App native///////////////////////
    //for click
    win.addEventListener("click",function(e){

   var ele = e.target;
        if(ele.nodeName.toLowerCase()=="a"){
            if(!jQuery(ele).hasClass("set-post-thumbnail")){ 
                var href = jQuery(ele).attr("href");
                if(href){ 
                    if(href.includes("http")){
                     
                        if(ele.target){
                            if(win.ADevice){
                                e.preventDefault();
                                //check the dame or not
                                // var auth_token = localStorage.getItem('auth_token');
                                // if(auth_token){
                                //     ele.href = href+(href.includes("?")?"&":"?")+'auth_token='+auth_token;
                                // }else{
                                //     if(href.includes(document.location.host)){
                                //         document.location.href=href;
                                //     }else{
                                //          win.open(href);
                                //     }
                                // }
                                
                                if(href.includes(document.location.host)){
                                     jQuery.blockUI({'message':'Đang tải...'});

                                        document.location.href=href;
                                    }else{
                                         win.open(href);
                                    }
                            }
                        }else{
                            // if(win.ADevice){
                            //     e.preventDefault();
                            //     //check the dame or not
                            //     var auth_token = localStorage.getItem('auth_token');
                            //     if(auth_token){
                            //         href = href+(href.includes("?")?"&":"?")+'auth_token='+auth_token;
                            //     } 
                                 
                            //      win.open(href);
                            // }else{
                            //     jQuery.blockUI({'message':'Đang tải...'});

                            //    setTimeout(function(){
                            //       jQuery.unblockUI();
                            //    },4000);
                            // }

                             jQuery.blockUI({'message':'Đang tải...'});

                               setTimeout(function(){
                                  jQuery.unblockUI();
                               },4000);
                        }
                        
                    } 
                } 
            } 
        } 
    },true);

    // jQuery(document).on("click","a",function(e){
    //     e.preventDefault();
    //     console.log(this);
    // });
    
    setTimeout(function(){
         var old_open = window.open;
        window.open = function(data) {
             if(typeof data=="string"&&data.includes(document.location.host)){
             jQuery.blockUI({'message':'Đang tải...'});

                document.location.href=data;
            }else{
                 old_open.open(data);
            }
        };
         var old_open_url = window.openURL;
         window.openURL = function(data) {
                if(typeof data=="string"&&data.includes(document.location.host)){
             jQuery.blockUI({'message':'Đang tải...'});

                document.location.href=data;
            }else{
                 old_open_url.open(data);
            }
        };
        // back button
        var old_back = window.hardwareBackPress;
        window.hardwareBackPress = function(ismain){
          if($(".modal.in").length){
            var l = $(".modal.in").length;
            if(l){
                if(l==1){
                    $(".modal.in").modal("hide");
                }else{
                    $(".modal.in").eq(l-1).modal("hide");
                }

            }
         
          }else if($(".frontleBottomSheet").length){
                closeAll();
            }else if($(".popup-container.active").length){
                $(".popup-container").removeClass("active");
            }else{

                old_back();
                
            }
        };
        if(win.hardwareStopPressback)win.hardwareStopPressback();
        //for link click url by pass
        window.onDeeplink = function(data){
          $(document).trigger("onDeeplink",[e,data]);
        };

        //for notify on click
        window.onNofication = function(data){
          $(document).trigger("onNofication",[e,data]);
        };
    },2000);



})(window);