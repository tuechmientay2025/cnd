var MVC = (function(){
          var caches = {};

          var T=  function(hash){
              hash = (hash||window.location.hash).replace("#!","").replace(/\/+$/, '').split("/");
              var data = {
                uri:{},
                c:"home",
                m:"index",
                params: null
              };
              if(hash.length==1){
                data.c = hash[0];
              }else if(hash.length>1){
                data.c = hash[0];
                data.m = hash[1];
                data.params = hash.slice(2);
              }
              return data;
          };
          T.settings ={
             mainview:".mainapp",
             header:".mainappheader",
             effect:window.innerWidth<1050?"ri":"fade-in"
          };


          T.prevPage = null; 
          T.goBack = function(){

          };

          function run_cache(page,func){
             if($.magnificPopup){
                $.magnificPopup.close();
            }

            if($(".modal.in").length){
                $(".modal.in").modal("hide");
            }

              if(func)func();


                $(document).triggerHandler("page",[page]);

                // $(".mainapp").addClass(T.settings.effect);
                $("#loader").hide();


                window.goTo(page,{
                    onReady : function(p){
                         $(document).triggerHandler("on"+page.attr("data-name"),[page]);
                        //
                        $(document).triggerHandler("page_before_"+page.attr("data-name"),[page]); 
                         
                    }
                });

                

                setTimeout(function(){
                  $("html,body").removeClass("load");
                  // $(".mainapp").removeClass(T.settings.effect);
                },500);
          }
          function run(html,func){
            
            
                var app = html.hasClass(T.settings.mainview.replace(".","").replace("#",""))?html: html.find(T.settings.mainview);
                if(app.length==0){
                    if(func)func();
                    return;
                }
                var id = html.attr("id");
                // var body = app.html();
                // var header = html.find(T.settings.mainappheader).html();

                // $("html,body").addClass("load");
                // $(T.settings.mainview).attr("id",id).addClass('active').html(body);
                // $(T.settings.mainappheader).html(header);

                var page = app.addClass("pagewrapper pagetr mp").attr("data-name",id);


                $(document).triggerHandler("before_render",[page]);

                page.insertAfter($(".pagewrapper").last());


                if($.magnificPopup){
                $.magnificPopup.close();
            }

            if($(".modal.in").length){
                $(".modal.in").modal("hide");
            }

                if(func)func();


                $(document).triggerHandler("page",[page]);

                // $(".mainapp").addClass(T.settings.effect);
                $("#loader").hide();


                window.goTo(page,{
                    onReady : function(p){
                       $(document).triggerHandler("on"+page.attr("data-name"),[page]);
                        //
                        $(document).triggerHandler("page_before_"+page.attr("data-name"),[page]);

                    }
                });

                

                setTimeout(function(){
                  $("html,body").removeClass("load");
                  // $(".mainapp").removeClass(T.settings.effect);
                },500);
          }

          T.view = function(options,func,onError){
             options = $.extend({cache:0,name:Date.now()},typeof options =="object"?options:{url:options},true);


             if($(T.settings.mainview).length==0){
                if(onError){
                    onError();
                }
                return;
             }


             if(typeof T.settings.filter=="function"){
                var a = T.settings.filter(options.url);
                if(!a){
                    return;
                }
             }

             if(!options.url.match(/^http/ig)){
                options.url = options.url.replace("#!","").replace(/\/+$/, '');
                window.history.replaceState(undefined, undefined, "#!"+options.url);
                // window.history.replaceState(undefined, undefined, "https://faucet.donggiatri.com#!"+options.url);
             }

             window.scrollTo({ top: 0, behavior: 'smooth' });

             var dataname = options.url.replace(/[^a-z0-9]/ig,"");

             if($('[data-name="'+dataname+'"]').length){

                run_cache($('[data-name="'+dataname+'"]'),func);

                return;
             }
 
             var id = $(T.settings.mainview).attr("data-name");
             T.prevPage = $(T.settings.mainview);
             if(id){
                $(document).trigger("page_after_"+id,[$(T.settings.mainview)]);
             }
             
             if(options.cache){
                run( caches[options.name],func);
                return;
             } 
             fetch(options.url).then(function(r){return r.text()}).then(function(html){
                // html = $('<div>'+html+'</div>').attr("id",dataname);
                var abc = $('<div>'+html+'</div>');

                var title = abc.find("title").text();
                html = abc.find(T.settings.mainview).attr("id",dataname).attr("data-title",title);
                $("body").append(html);
                abc.remove();
                run(html,function(){
                    if(func)func();
                }); 
                if(options.cache==undefined || html.find(T.settings.mainview).attr("data-cache")==1){
                    caches[options.name] = html;
                } 
                

             }).catch(function(e){
                console.log(e);
                $("#loader").hide();
                window.open(options.url);
             });
          };
          return T;
       })();
    (function() {
    $(window).on('load', init);

    var all_links = $('.transition');
    var all_pages = $('.page');
    var prefix = ['webkit', 'moz', 'o', 'ms', ''];
    var data_prefix = 'data-';
    var is_anim = false;
    var current = 0;

    function set_current_page() {
        $(all_pages[current]).addClass('current-page');
    }

    function transition_js(data_transition,data_reverse) {
         
        var class_in = '';
        var class_out = '';

        if(data_reverse === '' || data_reverse === 'true') {
            data_transition += '-reverse';
        }

        console.log(data_transition);

        switch(data_transition) {
            case 'horizontal':
                class_out = 'slide-to-left';
                class_in = 'slide-from-right';
                break;
            case 'horizontal-reverse':
                class_out = 'slide-to-right';
                class_in = 'slide-from-left';
                break;
            case 'vertical':
                class_out = 'slide-to-top';
                class_in = 'slide-from-bottom';
                break;
            case 'vertical-reverse':
                class_out = 'slide-to-bottom';
                class_in = 'slide-from-top';
                break;
            case 'horizontal-easing':
                class_out = 'slide-to-left-easing';
                class_in = 'slide-from-right';
                break;
            case 'horizontal-easing-reverse':
                class_out = 'slide-to-right-easing';
                class_in = 'slide-from-left';
                break;
            case 'vertical-easing':
                class_out = 'slide-to-top-easing';
                class_in = 'slide-from-bottom';
                break;
            case 'vertical-easing-reverse':
                class_out = 'slide-to-bottom-easing';
                class_in = 'slide-from-top';
                break;
            case 'horizontal-fade':
                class_out = 'slide-to-fade';
                class_in = 'slide-from-right';
                break;
            case 'horizontal-fade-reverse':
                class_out = 'slide-to-fade';
                class_in = 'slide-from-left';
                break;
            case 'vertical-fade':
                class_out = 'slide-to-fade';
                class_in = 'slide-from-bottom';
                break;
            case 'vertical-fade-reverse':
                class_out = 'slide-to-fade';
                class_in = 'slide-from-top';
                break;
            default:
                class_out = 'slide-to-left';
                class_in = 'slide-from-right';
        }

        return [class_out, class_in];
    }
    function transition(link) {
        var data_transition = $(link).attr(data_prefix + 'transition');
        var data_reverse = $(link).attr(data_prefix + 'reverse');
        var class_in = '';
        var class_out = '';

        if(data_reverse === '' || data_reverse === 'true') {
            data_transition += '-reverse';
        }

        console.log(data_transition);

        switch(data_transition) {
            case 'horizontal':
                class_out = 'slide-to-left';
                class_in = 'slide-from-right';
                break;
            case 'horizontal-reverse':
                class_out = 'slide-to-right';
                class_in = 'slide-from-left';
                break;
            case 'vertical':
                class_out = 'slide-to-top';
                class_in = 'slide-from-bottom';
                break;
            case 'vertical-reverse':
                class_out = 'slide-to-bottom';
                class_in = 'slide-from-top';
                break;
            case 'horizontal-easing':
                class_out = 'slide-to-left-easing';
                class_in = 'slide-from-right';
                break;
            case 'horizontal-easing-reverse':
                class_out = 'slide-to-right-easing';
                class_in = 'slide-from-left';
                break;
            case 'vertical-easing':
                class_out = 'slide-to-top-easing';
                class_in = 'slide-from-bottom';
                break;
            case 'vertical-easing-reverse':
                class_out = 'slide-to-bottom-easing';
                class_in = 'slide-from-top';
                break;
            case 'horizontal-fade':
                class_out = 'slide-to-fade';
                class_in = 'slide-from-right';
                break;
            case 'horizontal-fade-reverse':
                class_out = 'slide-to-fade';
                class_in = 'slide-from-left';
                break;
            case 'vertical-fade':
                class_out = 'slide-to-fade';
                class_in = 'slide-from-bottom';
                break;
            case 'vertical-fade-reverse':
                class_out = 'slide-to-fade';
                class_in = 'slide-from-top';
                break;
            default:
                class_out = 'slide-to-left';
                class_in = 'slide-from-right';
        }

        return [class_out, class_in];
    }

    function set_current_index(new_current_page) {
        for(var i = 0, len = all_pages.length; i < len; i++) {
            if($(all_pages[i]).attr('id') === new_current_page.attr('id')) {
                current = i;
                return true;
            }
        }
    }

    function reset_classes(old_page, new_page, classes) {
        old_page.attr('class', classes[0]).removeClass('current-page');
        new_page.attr('class', classes[1]).addClass('current-page');
    }

    var animationend = "webkitanimationend mozanimationend oanimationend msanimationend animationend";
    function apply_animations_js(current_page, next_page, animation,func) {
        var class_out = animation[0];
        var class_in = animation[1];
        var classes = [current_page.attr('class'), next_page.attr('class')];

         
        $(".page").off(animationend);
        current_page.addClass(class_out).on(animationend, function() {
           current_page.removeClass('current-page '+class_out);
        });
        next_page.addClass(class_in+' current-page').on(animationend, function() {
              next_page.removeClass(class_in);
            is_anim = false;
            if(func)func();
        }); 
    }

    function apply_animations(current_page, next_page, animation) {
        var class_out = animation[0];
        var class_in = animation[1];
        var classes = [current_page.attr('class'), next_page.attr('class')];

  

        current_page.addClass(class_out);
        next_page.addClass(class_in);

        for(var i = 0, len = prefix.length; i < len; i++) {
            all_pages.on(prefix[i] + 'animationend', function() {
                all_pages.off(prefix[i] + 'animationend');
                is_anim = false;
                reset_classes(current_page, next_page, classes);
            });
        }
    }

    function pages(link) {
        var current_page = $(all_pages[current]); 
        var next_page = $('#' + $(link).attr(data_prefix + 'to'));
        var animation = transition(link);

        if(!is_anim) {
            is_anim = true;
            apply_animations(current_page, next_page, animation);
        }
    }

    function link_clicked() {
        all_links.on('click', function(e) {
            e.preventDefault();
            pages(this);
        });
    }

    window.goTo = function(to,options){
        var current_page = $(".page.current-page");
        var next_page = typeof to=="object"?to:$(to);
        var animation = transition_js(options&&options.transition||"horizontal-easing");

        if(!is_anim) {
            is_anim = true;
            apply_animations_js(current_page, next_page, animation,function(){
                if(options && options.onReady)options.onReady(next_page);
            });
        }
    };
    $(document).on("click","[data-back]",function(){
       var page = $(this).attr("data-back");
       if(page){
         //clear
         window.goTo(page);
       }else{
         window.goBack();
       }
    });
    window.goBack = function(options){
        var current_page = $(".page.current-page");
        if($(".page").length<=1){
            return;
        }
        var next_page = current_page.prevAll('.page').first();
        
        var animation = transition_js(options&&options.transition||"horizontal-easing");

        if(!is_anim) {
            is_anim = true;
            apply_animations_js(current_page, next_page, animation,function(){
                if(options && options.onReady)options.onReady(next_page);
                current_page.remove();
            });
        }
    }

    function init() {
        $("body").append(`<style>.slide-to-left{-webkit-animation:.5s both slide-to-left;animation:.5s both slide-to-left}.slide-to-right{-webkit-animation:.5s both slide-to-right;animation:.5s both slide-to-right}.slide-from-left{-webkit-animation:.5s both slide-from-left;animation:.5s both slide-from-left}.slide-from-right{-webkit-animation:.5s both slide-from-right;animation:.5s both slide-from-right}.slide-to-top{-webkit-animation:.5s both slide-to-top;animation:.5s both slide-to-top}.slide-to-bottom{-webkit-animation:.5s both slide-to-bottom;animation:.5s both slide-to-bottom}.slide-from-top{-webkit-animation:.5s both slide-from-top;animation:.5s both slide-from-top}.slide-from-bottom{-webkit-animation:.5s both slide-from-bottom;animation:.5s both slide-from-bottom}@-webkit-keyframes slide-to-left{to{-webkit-transform:translateX(-100%)}}@keyframes slide-to-left{to{-webkit-transform:translateX(-100%);transform:translateX(-100%)}}@-webkit-keyframes slide-to-right{to{-webkit-transform:translateX(100%)}}@keyframes slide-to-right{to{-webkit-transform:translateX(100%);transform:translateX(100%)}}@-webkit-keyframes slide-from-left{from{-webkit-transform:translateX(-100%)}}@keyframes slide-from-left{from{-webkit-transform:translateX(-100%);transform:translateX(-100%)}}@-webkit-keyframes slide-from-right{from{-webkit-transform:translateX(100%)}}@keyframes slide-from-right{from{-webkit-transform:translateX(100%);transform:translateX(100%)}}@-webkit-keyframes slide-to-top{to{-webkit-transform:translateY(-100%)}}@keyframes slide-to-top{to{-webkit-transform:translateY(-100%);transform:translateY(-100%)}}@-webkit-keyframes slide-to-bottom{to{-webkit-transform:translateY(100%)}}@keyframes slide-to-bottom{to{-webkit-transform:translateY(100%);transform:translateY(100%)}}@-webkit-keyframes slide-from-top{from{-webkit-transform:translateY(-100%)}}@keyframes slide-from-top{from{-webkit-transform:translateY(-100%);transform:translateY(-100%)}}@-webkit-keyframes slide-from-bottom{from{-webkit-transform:translateY(100%)}}@keyframes slide-from-bottom{from{-webkit-transform:translateY(100%);transform:translateY(100%)}}.slide-to-left-easing{-webkit-animation:.5s ease-in both slide-to-left;animation:.5s ease-in both slide-to-left;z-index:2}.slide-to-right-easing{-webkit-animation:.5s ease-in both slide-to-right;animation:.5s ease-in both slide-to-right;z-index:2}.slide-to-top-easing{-webkit-animation:.5s ease-in both slide-to-top;animation:.5s ease-in both slide-to-top;z-index:2}.slide-to-bottom-easing{-webkit-animation:.5s ease-in both slide-to-bottom;animation:.5s ease-in both slide-to-bottom;z-index:2}.slide-to-fade{-webkit-animation:.5s both fade;animation:.5s both fade;z-index:0}@-webkit-keyframes fade{to{opacity:.5}}@keyframes fade{to{opacity:.5}}
        .pagetr{    overflow-y: auto;height:100%;position:absolute!important;visibility:hidden;width:100%}.current-page{visibility:visible;z-index:1}</style>`);    
    
        set_current_page();
        link_clicked();
    }
})();