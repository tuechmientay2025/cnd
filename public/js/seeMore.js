
/*
var ele = $("div").seeMore({
      max:20,
      data:(config.menus||config.product||[]),
      renderItem : function(v){
         return tlp(v);
      },
      slideChange:function(page){
         console.log(page)
      }
    });
 
 */
$.fn.seeMore = function(options){
   return this.each(function(){
    var me = this;
      var ele = $(me);
      var settings = $.extend({
        delay :0,
        type:"more",
        max:20,data:[],
        msg:{
            not_found:"Items Not Found"
        },
        renderItem : function(v){
          return v.title||v.name;
        },
        renderMore : function(){
          return `<div class="menupage text-center"  data-p="0"><span class="btn btn-primary btnmore no w100">Tải thêm</span></div>`;
        },
        changeSlide : function(){
          
        }
      },options,true);
       var max = settings.max;
      var menus = settings.data;
      var menu = null;
      var parts = null;
      var from =0;
      var pages = Math.ceil(menus.length/max);
      if(pages>1){
         parts = menus.chunk(max);
         menu = parts[from];
      }else{
        menu = menus;
      }

      var _id = "d"+Date.now();
      $('<div class="blockacmore '+_id+'"></div>').insertAfter(ele);

      function getData(page){
         return parts?parts[page]:menus;
      }
      function render_page(){
        var elepart = null;
        if(settings.type=="more"){
            elepart = $(settings.renderMore()).attr("data-p",0);
            elepart.appendTo('.'+_id);
            elepart.on("click",function(e){
                e.preventDefault();
                var page = $(this).attr("data-p")*1;
                if(page<pages){
                   page++;
                  me.goTo(page);
                }else{
                   $(this).hide();
                }
           });
        }else{
            var s='';
            for(var i=1;i<=pages;i++){
                s+`<span ${i==me.activePage?'class="active"':''} data-p="${i}">${i>9?i:"0"+i}</span>`;
            }
            elepart = $(`<div class="pagemore">${s}</div>`).attr("data-p",0);
            elepart.appendTo('.'+_id);

            elepart.on("click","[data-p]",function(e){
                e.preventDefault();
                var page = $(this).attr("data-p")*1;
                me.goTo(page);
           });
        }

        

        
      }

     if(settings.delay){
      setTimeout(function(){
         ele.html(menu.map(function(v){
           return settings.renderItem(v);
        }).join(""));
       },settings.delay*1000);
     }else{
       ele.html(menu.map(function(v){
           return settings.renderItem(v);
        }).join(""));
     }

       me.reset = function(data){
          if(typeof data=="object"){
             menus = data;   
             from =0;
              pages = Math.ceil(menus.length/max);
              if(pages>1){
                 parts = menus.chunk(max);
                 menu = parts[from];
              }else{
                menu = menus;
              } 
          }
          page = 1;
          me.goTo(1);
       };

     
       me.download = function(f){
         var data = f?menus.filter(function(v){
            return f(v);
         }):menus;
         return data;
       };
       
       me.filter = function(f){
         var data = menus.filter(function(v){
            return f(v);
         });
         //render
         if(data.length){
            ele.html(data.map(function(v){
                 return settings.renderItem(v);
            }).join(""));
         }else{
            ele.html(`<div class='empty'>${settings.msg.not_found}<div>`);
         }
       };
       me.search = function(s){
         var data = menus.filter(function(v){
            return (v.title||v.name||v.fullname||v.label).includes(s);
         });
         //render
         if(data.length){
            ele.html(data.map(function(v){
                 return settings.renderItem(v);
            }).join(""));
         }else{
            ele.html(`<div class='empty'>${settings.msg.not_found}<div>`);
         }
       };
       me.goTo = function(page){
          var list = getData(page);
          // console.log(list,page);
          ele.html(list.map(function(v){
             return settings.renderItem(v);
          }).join(""));

          me.activePage = page;
          elepart.attr("data-p",page);
          if(settings.slideChange){ 
            settings.slideChange.call(me,page,list);
          }  
          render_page();
          return this;
       };
       me.remove = function(f){
         menus.map(function(v,index){
            if(f(v)){
                menus.splice(index);
            }
         }); 
         return this;
       };
       me.append = function(data){
         menus = menus.concat(typeof data=="object"?data:[data]);
         page =1;
         return me.goTo(page);
       };
       me.prepend = function(data){
         menus = (typeof data=="object"?data:[data]).concat(menus);
         page =1;
         return me.goTo(page);
       };

       ele.data("seeMore",me);

   });
};