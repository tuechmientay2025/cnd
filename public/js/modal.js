

/**

 * bootbox.js v4.0.0

 *

 * http://bootboxjs.com/license.txt

 */

window.bootbox=window.bootbox||function a(b,c){"use strict";function d(a){var b=s[q.locale];return b?b[a]:s.en[a]}function e(a,c,d){a.preventDefault();var e=b.isFunction(d)&&d(a)===!1;e||c.modal("hide")}function f(a){var b,c=0;for(b in a)c++;return c}function g(a,c){var d=0;b.each(a,function(a,b){c(a,b,d++)})}function h(a){var c,d;if("object"!=typeof a)throw new Error("Please supply an object of options");if(!a.message)throw new Error("Please specify a message");return a=b.extend({},q,a),a.buttons||(a.buttons={}),a.backdrop=a.backdrop?"static":!1,c=a.buttons,d=f(c),g(c,function(a,e,f){if(b.isFunction(e)&&(e=c[a]={callback:e}),"object"!==b.type(e))throw new Error("button with key "+a+" must be an object");e.label||(e.label=a),e.className||(e.className=2>=d&&f===d-1?"btn-primary":"btn-default")}),a}function i(a,b){var c=a.length,d={};if(1>c||c>2)throw new Error("Invalid argument length");return 2===c||"string"==typeof a[0]?(d[b[0]]=a[0],d[b[1]]=a[1]):d=a[0],d}function j(a,c,d){return b.extend(!0,{},a,i(c,d))}function k(a,b,c){return n(j(m.apply(null,a),b,c),a)}function l(){for(var a={},b=0,c=arguments.length;c>b;b++){var e=arguments[b],f=e.toLowerCase(),g=e.toUpperCase();a[f]={label:d(g)}}return a}function m(){return{buttons:l.apply(null,arguments)}}function n(a,b){var d={};return g(b,function(a,b){d[b]=!0}),g(a.buttons,function(a){if(d[a]===c)throw new Error("button key "+a+" is not allowed (options are "+b.join("\n")+")")}),a}var o={dialog:"<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>",header:"<div class='modal-header'><h4 class='modal-title'></h4></div>",footer:"<div class='modal-footer'></div>",closeButton:"<button type='button' class='bootbox-close-button close'>&times;</button>",form:"<form class='bootbox-form'></form>",inputs:{text:"<input class='bootbox-input form-control' autocomplete=off type=text />"}},p=b("body"),q={locale:"en",backdrop:!0,animate:!0,className:null,closeButton:!0,show:!0},r={};r.alert=function(){var a;if(a=k(["ok"],arguments,["message","callback"]),a.callback&&!b.isFunction(a.callback))throw new Error("alert requires callback property to be a function when provided");return a.buttons.ok.callback=a.onEscape=function(){return b.isFunction(a.callback)?a.callback():!0},r.dialog(a)},r.confirm=function(){var a;if(a=k(["cancel","confirm"],arguments,["message","callback"]),a.buttons.cancel.callback=a.onEscape=function(){return a.callback(!1)},a.buttons.confirm.callback=function(){return a.callback(!0)},!b.isFunction(a.callback))throw new Error("confirm requires a callback");return r.dialog(a)},r.prompt=function(){var a,d,e,f,g,h;if(f=b(o.form),d={buttons:l("cancel","confirm"),value:""},a=n(j(d,arguments,["title","callback"]),["cancel","confirm"]),h=a.show===c?!0:a.show,a.message=f,a.buttons.cancel.callback=a.onEscape=function(){return a.callback(null)},a.buttons.confirm.callback=function(){return a.callback(g.val())},a.show=!1,!a.title)throw new Error("prompt requires a title");if(!b.isFunction(a.callback))throw new Error("prompt requires a callback");return g=b(o.inputs.text),g.val(a.value),f.append(g),f.on("submit",function(a){a.preventDefault(),e.find(".btn-primary").click()}),e=r.dialog(a),e.off("shown.bs.modal"),e.on("shown.bs.modal",function(){g.focus()}),h===!0&&e.modal("show"),e},r.dialog=function(a){a=h(a);var c=b(o.dialog),d=c.find(".modal-body"),f=a.buttons,i="",j={onEscape:a.onEscape};if(g(f,function(a,b){i+="<button data-bb-handler='"+a+"' type='button' class='btn "+b.className+"'>"+b.label+"</button>",j[a]=b.callback}),d.find(".bootbox-body").html(a.message),a.animate===!0&&c.addClass("fade"),a.className&&c.addClass(a.className),a.title&&d.before(o.header),a.closeButton){var k=b(o.closeButton);a.title?c.find(".modal-header").prepend(k):k.css("margin-top","-10px").prependTo(d)}return a.title&&c.find(".modal-title").html(a.title),i.length&&(d.after(o.footer),c.find(".modal-footer").html(i)),c.on("hidden.bs.modal",function(a){a.target===this&&c.remove()}),c.on("shown.bs.modal",function(){c.find(".btn-primary:first").focus()}),c.on("escape.close.bb",function(a){j.onEscape&&e(a,c,j.onEscape)}),c.on("click",".modal-footer button",function(a){var d=b(this).data("bb-handler");e(a,c,j[d])}),c.on("click",".bootbox-close-button",function(a){e(a,c,j.onEscape)}),c.on("keyup",function(a){27===a.which&&c.trigger("escape.close.bb")}),p.append(c),c.modal({backdrop:a.backdrop,keyboard:!1,show:!1}),a.show&&c.modal("show"),c},r.setDefaults=function(a){b.extend(q,a)},r.hideAll=function(){b(".bootbox").modal("hide")};var s={br:{OK:"OK",CANCEL:"Cancelar",CONFIRM:"Sim"},da:{OK:"OK",CANCEL:"Annuller",CONFIRM:"Accepter"},de:{OK:"OK",CANCEL:"Abbrechen",CONFIRM:"Akzeptieren"},en:{OK:"OK",CANCEL:"Cancel",CONFIRM:"OK"},es:{OK:"OK",CANCEL:"Cancelar",CONFIRM:"Aceptar"},fi:{OK:"OK",CANCEL:"Peruuta",CONFIRM:"OK"},fr:{OK:"OK",CANCEL:"Annuler",CONFIRM:"D'accord"},it:{OK:"OK",CANCEL:"Annulla",CONFIRM:"Conferma"},nl:{OK:"OK",CANCEL:"Annuleren",CONFIRM:"Accepteren"},pl:{OK:"OK",CANCEL:"Anuluj",CONFIRM:"Potwierdź"},ru:{OK:"OK",CANCEL:"Отмена",CONFIRM:"Применить"},zh_CN:{OK:"OK",CANCEL:"取消",CONFIRM:"确认"},zh_TW:{OK:"OK",CANCEL:"取消",CONFIRM:"確認"}};return r.init=function(c){window.bootbox=a(c||b)},r}(window.jQuery);

/*

 bootbox.addLocale("vi",

    {

        OK : 'Dồng ý',

        CANCEL : 'Huỷ bỏ',

        CONFIRM : 'Xác nhận',

        CLOSE : 'Đóng'

    }

  );

  */

  bootbox.setDefaults({

    locale: "vi"

  });

function alertbox(title,message,buttons,f){

    var call_ok = null;

    var call_no =null;





    var str = message||"...";

    



    var opts = {

        icon:null,

        title: title||'Title',

        message: str,

        size: 'large',

        className:"modal-flex"

        

    };









    if(!buttons){

        opts.buttons= {

            cancel: {

                label: "Cancel",

                className: 'btn-danger',

                callback: function() {

                    if(call_ok)call_ok(call_no,0);

                }

            }, 

            ok: {

                label: "Ok",

                className: 'btn-info',

                callback: function() {

                    if(call_ok)call_ok(dialog,1);

                }

            }

        };

    }

    var dialog = bootbox.dialog(opts);

   if(f){

     call_ok = f;

     return;

   }

   return  new Promise(function(a,b){

       call_no=a;

       call_ok=b;

   });

}

(function(){

    function initmodal(me){

        if(!me._template){

            me._template = $(me).find(".modal-body").eq(0).html();



            me.template = function(data){

                var s = Handlebars.compile(this._template);



                $(this).find(".modal-body").eq(0).html(s(data));

            }; 

        }

        

           

    }



    //https://codepen.io/nhembram/pen/PzyYLL

    function testAnim(x) {

      $('.modal .modal-dialog').attr('class', 'modal-dialog  ' + x + '  animated');

    };

  var prev = null;
  var routers=[];
  $(document).on('show.bs.modal',".modal:not(.bootbox)", function (e) {
       $(this).addClass("active");

       if(prev){
          prev.removeClass("active in");
       }
       prev = $(this);
 

      var anim = $(this).attr("data-entrance")||$(this).attr("data-in");

      if(anim)testAnim(anim);



      initmodal(this);



      if(!this.loaded){

        this._template = $(this).html();

        this.template = function(data){



            $(this).html(Handlebars.compile(this._template)(data));

        };

        this.render = function(){

            this.template({});

        };

        $(this).trigger('init.bs.modal',[e]);

        $(document).trigger(this.id+"_Init",[this]);

        this.loaded=1;

      }





  }).on('shown.bs.modal',".modal:not(.bootbox)", function (e) {
     routers.push(this.id);

   

       //bg

     $(this).find('[data-setbg]').each(function () {

        var me = $(this);

          var bg = me.attr('data-setbg');

          if(parseInt(this.style.height)<75 && window.innerWidth<1050){

                    me.css("height","125px");

          }



          if(this.nodeName=="IMG"){

            this.src=bg;

          }else{

             me.css('background-image', 'url(' + bg + ')');

          }

         me.removeAttr('data-setbg');

      });

     $(this).find('[data-src]').each(function () {

        var me = $(this);

          var bg = me.attr('data-src');

          if(parseInt(this.style.height)<75 && window.innerWidth<1050){

                    me.css("height","125px");

          }



          if(this.nodeName=="IMG"){

            this.src=bg;

          }else{

             me.css('background-image', 'url(' + bg + ')');

          }

         me.removeAttr('data-src');

      });

    //repeat

    $(this).find('[data-repeat]').each(function () {

        var me = $(this);

        var num = me.attr("data-repeat")*1; 

        var s = me.attr("data-repeat-template")?$(me.attr("data-repeat-template")).html():me.html();

        s = Handlebars.compile(s);

        // console.log(s);

        for(var i=0;i<num;i++){

             me.append(s({id:i,name:"Name "+i}));

        } 

    }); 



    $(document).trigger("ModalShow_"+e.target.id);



    $(document).trigger(this.id+"_Before",[this]);


   


  }).on('hidden.bs.modal',".modal:not(.bootbox)", function (e) {
     $(this).removeClass("in active");

    var last = routers[routers.length-1];
    console.log(last);

     if(this.id==last){ 
        routers = routers.slice(0, -1);
        last = routers[routers.length-1];
        if(last){
             $("#"+last).addClass("active in").trigger('focus.bs.modal'); 
        }

        
     }

     

    var anim = $(this).attr("data-exit")||$(this).attr("data-out");

    if(anim)testAnim(anim);



    $(document).trigger("ModalLeave_"+e.target.id);

    $(document).trigger(this.id+"_After",[this]);


    

  });







})();

(function(){





 var zoom_percent = "100";

    function zoom(zoom_percent){

        $(".mfp-figure figure").click(function(){

            switch(zoom_percent){

                case "100":

                    zoom_percent = "120";

                    break;

                case "120":

                    zoom_percent = "150";

                    break;

                case "150":

                    zoom_percent = "200";

                    $(".mfp-figure figure").css("cursor", "zoom-out");

                    break;

                case "200":

                    zoom_percent = "100";

                    $(".mfp-figure figure").css("cursor", "zoom-in");

                    break;

            }

            $(this).css("zoom", zoom_percent+"%");

        });

    }

 

  window.zoomImage = function(img){

     $.magnificPopup.open({

          items:[

              {src:img}

          ],

          type: 'image',

          callbacks: {

            open: function() {

                $(".mfp-figure figure").css("cursor", "zoom-in");

                $(".mfp-figure  .mfp-img").width(window.innerWidth>340?window.innerWidth/2:window.innerWidth).css("max-width", "initial");

                zoom(zoom_percent);

            },

            close: function() {

              // Will fire when popup is closed

            }

            // e.t.c.

          }

      });   

 };

})();







(function(){



 $(document).ready(function(){

    $('body').append(`<style>



    .modalsuccess {

background-color: #fff;

    padding: 2em 3em;

    text-align: center;

    border-radius: 0.5em;

      position: fixed;

    z-index: 100000;

    background-color: #fff;

    width: 400px;

    top: 0;

    left: 0;

}



 



.modalsuccess .modal-image {

  width: 40px;

  height: 40px;

  margin: 0 auto;

  border-radius: 50%;

  box-shadow: 0 0 0 2px #48DB71;

  padding: 11px 10px 2px;

  margin-bottom: 2em;

}



.modalsuccess h1 {

  font-size: 1.5em;

  font-weight: bold;

  margin-bottom: 0.5em;

}



.modalsuccess p {

  margin-bottom: 2em;

  color: #666;

}



.modalsuccess .btn-open {

  display: none;

}

.modalsuccess .btn-open.is-active {

  display: block;

}



.modalsuccess button {

  font-size: 1.25em;

  font-weight: bold;

  background-color: #000;

  border: none;

  padding: 0.5em 1em;

  color: #fff;

  box-shadow: 0 0 0 2px #000 inset;

  border-radius: 0.25em;

  cursor: pointer;

  transition: background 0.4s ease, color 0.4s ease;

}

.modalsuccess button:hover {

  box-shadow: 0 0 0 2px #000 inset;

  color: #000;

  background-color: transparent;

}



    </style>`);

 });

 var tlp = function(data){

    return  `

        <div class="modalSuccess">

            <div class="modal-image">

              <svg viewBox="0 0 32 32" style="fill:#48DB71"><path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z"></path></svg>

            </div>

            <h1>Nice job!</h1>

            <p>To dismiss click the button below</p>

            <button class="js-close">Dismiss</button>

          </div>

         `;

 };

  window.modalSuccess = function(options){

    

   var ele =  $(tlp(options));

   $('body').append(ele);

   ele.find('.js-close').on('click',function(){

     ele.remove();

     if(options.callback){

      options.callback();

     }

   });

 };

})();