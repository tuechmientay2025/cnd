$.fn.flatlist= function(options){

      $("body").append(`<style>.flatlistwrapper .btnmore{ 
    background: -webkit-linear-gradient(15deg,#16aa80,#21d199);
    background: linear-gradient(15deg,#16aa80,#21d199);
    box-shadow: 0px 4px 10px 0px rgba(0,0,0,.12);
    font-family: Red Hat Display !important;
    font-size: 12px !important;
    line-height: 1.2 !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: .5px !important;
    height: auto;
    padding: 10px 17px 9px;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    transition: all .3s ease;
    border: none;
    color: #fff;
    border-radius: 16px;
    display: block;
    margin: 0 auto;}.placeholder-content {height: 205px;overflow: hidden;background: #000;position: relative;-webkit-animation-duration: 1.7s;animation-duration: 1.7s;-webkit-animation-fill-mode: forwards;animation-fill-mode: forwards;-webkit-animation-iteration-count: infinite;animation-iteration-count: infinite;-webkit-animation-timing-function: linear;animation-timing-function: linear;-webkit-animation-name: placeholderAnimate;animation-name: placeholderAnimate;background: #f6f7f8;background: linear-gradient(to right, #eee 2%, #ddd 18%, #eee 33%);background-size: 1300px;}.placeholder-content_item {width: 100%;height: 20px;position: absolute;background: #fff;z-index: 2;}.placeholder-content_item:after, .placeholder-content_item:before {width: inherit;height: inherit;content: "";position: absolute;}.placeholder-content_item:nth-child(1) {top: 0;left: 0;}.placeholder-content_item:nth-child(2) {top: 20px;left: 0;width: 10%;height: 90px;}.placeholder-content_item:nth-child(3) {top: 0px;left: 0;width: 10%;height: 100%;}.placeholder-content_item:nth-child(4) {top: 20px;width: 20px;left: 170px;height: 90px;}.placeholder-content_item:nth-child(5) {top: 40px;left: 190px;height: 12px;}.placeholder-content_item:nth-child(6) {top: 75px;left: 190px;height: 12px;}.placeholder-content_item:nth-child(7) {top: 20px;right: 0;width: 23%;height: 20px;}.placeholder-content_item:nth-child(8) {top: 0;right: 0;width: 10%;height: 100%;}.placeholder-content_item:nth-child(9) {top: 110px;height: 17px;left: 0;}.placeholder-content_item:nth-child(10) {top: 149px;height: 12px;left: 0;}.placeholder-content_item:nth-child(11) {top: 183px;left: 0;height: 100%;}@-webkit-keyframes placeholderAnimate {0% {background-position: -650px 0;}100% {background-position: 650px 0;}}@keyframes placeholderAnimate {0% {background-position: -650px 0;}100% {background-position: 650px 0;}}</style>`);
            function loadData(url,data,ff,f){
                $.ajax({
                    url : url, 
                    data:data,
                    type:data.json?'GET':'POST',
                    beforeSend: function( xhr ){ 
                        ff(xhr);
                    },
                    success:function(data){
                        if( data ) {
                            try{
                               f(JSON.parse(data));
                            }catch(e){
                              f(data);
                            }
                        }
                    }
                });
            }
            return this.each(function(){
                var settings = $.extend({
                  datasrc:null,
                    data:{

                    },
                    loader : function(){
                      return `<div class="placeholder-content">
                          <div class="placeholder-content_item"></div>
                          <div class="placeholder-content_item"></div>
                          <div class="placeholder-content_item"></div>
                          <div class="placeholder-content_item"></div>
                          <div class="placeholder-content_item"></div>
                          <div class="placeholder-content_item"></div>
                          <div class="placeholder-content_item"></div>
                          <div class="placeholder-content_item"></div>
                          <div class="placeholder-content_item"></div>
                          <div class="placeholder-content_item"></div>
                          <div class="placeholder-content_item"></div>
                      </div>`;
                    },
                    target : $(window),
                    beforeRender : function(){},
                    renderItem : function(item){
                      return JSON.stringify(item);
                    },
                    buttonLoadMore:{
                        label:"Load more",
                        labelLoading: "Loading...",
                        labelMore: 'More posts' 
                    }
                },options,true);
                var ele = $(this).addClass("flatlistwrapper");  
                ele.append('<div class="flatlist"></div>');
                ele.append($('<div class="moreloader"></div>').append(settings.loader()));
                
                var loader = ele.find(".moreloader").hide();

                ele = ele.find(".flatlist");


                var canBeLoaded = true, 
                bottomOffset = settings.bottomOffset||2000;  
                
                var data = $.extend({
                         json:false,
                        'action':'loadmore',
                        'type':'loadmore',
                        'query': {},
                        'page' : 1,
                        limit:20
                    },options.data,true); 
                
                if(data.type =="loadmore"){
                    settings.target.scroll(function(){
                    
                        if(settings.target.scrollTop() > ( settings.target.height() - bottomOffset ) && canBeLoaded == true ){
                        
                        
                          loader.show();
                            loadData(settings.url,data,function(xhr){
                                 canBeLoaded = false;  
                            },function(html){
                              loader.hide();
                                if( html ) {
                                    settings.beforeRender(html);
                                    if(data.json && typeof html=="object"){
                                      if(html.length==0){ 
                                        canBeLoaded = true;  
                                        return;
                                      }

                                      var s = html.map(function(v){
                                         return settings.renderItem(v);
                                      });
                                      ele.append(s);

                                      
                                      
                                    }else{
                                      ele.append( html );
                                    }
                                    
                                    canBeLoaded = true;  
                                    data.page++;
                                    if(settings.onResult){
                                        settings.onResult(html);
                                    }
                                }
                            });
                             
                        }
                    });
                }else{
                    var id=Date.now()+"btnmore";
                    var button = $('<div class="loadmore '+id+'"><button class="btnmore" type="button">'+settings.buttonLoadMore.label+'</button></div>');

                    button.insertAfter(ele);
                    button = button.find(".btnmore");
                    button.on("click",function(){
                      loader.show();
                        loadData(settings.url,data,function(xhr){
                            button.text(settings.buttonLoadMore.labelLoading); 
                        },function(html){
                          loader.hide();
                            if( html ) {  

                              settings.beforeRender(html);
                                    if(data.json && typeof html=="object"){

                                      if(html.length==0){
                                        canBeLoaded = true;  
                                        button.remove();
                                        return;
                                      }
                                      var s = html.map(function(v){
                                         return settings.renderItem(v);
                                      });
                                      ele.append(s);

                                        //check limit stop
                                       if (data.limit > html.length){
                                         button.remove();
                                       } 
                                           


                                    }else{
                                      ele.append( html );
                                    }
                                    


                                button.text(settings.buttonLoadMore.labelMore); 
                               
                               data.page++; 
                               

                             
             
                         
                               settings.onResult(html);
                            } else {
                                button.remove(); // if no data, remove the button as well
                            }
                        }); 
                    });
                }
                
                //auto load
                
                //check reload
                if(settings.datasrc){
                   settings.beforeRender(settings.datasrc);
                    if(data.json && typeof settings.datasrc=="object"){
                      var s = settings.datasrc.map(function(v){
                         return settings.renderItem(v);
                      });
                      ele.append(s);
                    }else{
                      ele.append( settings.datasrc );
                    }

                    return;
                }

                loader.show();
                //relaod next
                loadData(settings.url,data,function(xhr){
                     canBeLoaded = false;  
                },function(html){
                  loader.hide();
                    if( html ) {
                         settings.beforeRender(html);
                          if(data.json && typeof html=="object"){
                            var s = html.map(function(v){
                               return settings.renderItem(v);
                            });
                            ele.append(s);
                          }else{
                            ele.append( html );
                          }
                          
                        canBeLoaded = true;  
                        data.page++; 
                        if(settings.onResult){
                            settings.onResult(html);
                        }
                    }
                });
            });
         };