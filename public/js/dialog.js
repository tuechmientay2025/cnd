(function(win){
    win.showLoader = win.showLoader||function(s){
    $.blockUI({message:s||"Đang xử lý..."});

    setTimeout($.unblockUI, 5000); 
};
win.hideLoader = win.hideLoader||function(){
    $.unblockUI();
};

  var old_alert= win.alert;
    win.alert = function(s){
      if(win.toastr){
        toastr.Center(s,"Thông báo","info");
      }else if(win.swal){
        swal.fire(s);
      }else if(win.bootbox){
        bootbox.alert({
            onEscape:true,
            title:"Thông báo",
            className:"bootbox-alert",
            message: s, 
            callback: f
        });
      }else{
        old_alert(s);
      }
   };

   var old_confirm= win.confirm;
   win.confirm = function(s,f,options){
      if(win.bootbox){
        options=  $.extend({onEscape:true},options,true);
        var dialog=bootbox.confirm({
            className:"bootbox-confirm",
            message: s,
            onEscape:true,
            buttons: {
                confirm: {
                    label: options.titleYes||'Xác nhận',
                    className: 'btn-success'
                }
            },
            callback: f
        });
        return new Promise(function(a,b){
            a(dialog);
        });
      }else{
         old_confirm(s,f);
      }
   };
   var old_prompt= win.prompt;
   win.prompt = function(s,v,f,options){
      if(win.bootbox){
        options=  $.extend({},options,true);
        f = typeof v=="function"?v:f;

        bootbox.prompt({
            onEscape:true,
            value:typeof v!="function"?v:"",
            defaultValue:typeof v!="function"?v:"",
            className:"bootbox-prompt",
            title: s, 
            centerVertical: true,
            callback: f
        });
      }else{
        var n= old_prompt(s,v);
        if(f)f(f);
      }
   };


setTimeout(function(){
    if(!win.Toast){
      win.Toast ={};
      win.Toast.Center = function(s){
        alert(s);
      };

      win.Toast.Top = function(s){
        alert(s);
      };
      win.Toast.Bottom = function(s){
        alert(s);
      };
   }
},10*1000);


var loaded  = 0;

win.alertDialog = function(title, message, f) {

    if(loaded==0){
        loaded=1;
        $('body').append(`<style>
            .alertDialog.medium{}
.alertDialog.medium .modal-dialog{
      height: 80%;
    width: 90%;
    top: 10%;
    margin: 0 auto;
}

.alertDialog.small{}
.alertDialog.small .modal-dialog{
      height: 50%;
    width: 90%;
    top: 25%;
    margin: 0 auto;
}</style>`);
    }
    var opts = null;
    if(typeof title=="object"){
       opts =  title;
       opts.className = "modal-flex alertDialog "+(opts.className||"");
       f = opts.callback||function(){};
    }else{
        var str = message || "...";

        opts = {

            icon: null,

            title: title || 'Title',
            textYes :"Xác nhận",
            textNo :"Bỏ qua",
            
            message:str,
            size: 'large',

            className: "modal-flex"

        };
    }
    
    

    if (!opts.buttons && opts.nobutton!=1) {



        opts.buttons = {

            cancel: {

                label: opts.textNo||"Bỏ qua",

                className: 'btn-danger',

                callback: function() {

                    if (f)f(dialog, 0);

                }

            },

            noClose: {

                label: opts.textYes||"Cập nhật",

                className: 'btn-info',

                callback: function() {

                    if (f)f(dialog, 1);
                    return false;
                }

            }

        };

    }

    if(win.Handlebars){
        opts.message = win.Handlebars.compile(opts.message)(opts.bindData||{});
    }

    opts.onEscape= true;

    var dialog = bootbox.dialog(opts);

     
    return new Promise(function(a,b){
        if(dialog.find(".msg").length==0){
            dialog.find(".bootbox-body").append(`<div class="msg"></div>`);
        }
        a(dialog);
    });
};
win.alertDialog.tools= function(options) {

    return $.extend({
                $:null,
        close: function(){
            this.$.modal("hide");
            return this;
        },
        stop : function(s){
            this.$.closest(".bootbox-body").html(s);
            this.$.find(".modal-footer").hide();
            this.$.find(".loadingblock").remove();
            return this;
        },
        hide : function(s){
            this.$.find(".msg").html("");
            this.$.find(".loadingblock").remove();
            return this;
        },
        empty : function(s,icon){
            s=s||'';
            icon = icon||"https://cdn-icons-png.flaticon.com/128/14005/14005478.png";
            icon = icon.includes("https")?`<img width=125 height=125 src="${icon}" />`:icon;
            return this.stop(`<div class="alert-empty">${icon}${s}</div>`);
        },
        loading : function(s,icon,timer){
            s=s||'Đang xử lý...'; 
            icon = icon||`<i class="fa fa-spinner" aria-hidden="true"></i>`;
            icon = icon.includes("https")?`<img width=12 height=12 src="${icon}" />`:icon;
            var a  = $(`<div class="alert-info loadingblock">${icon}${s}</div>`);
            this.$.closest(".bootbox-body").append(a);
            if(timer){
                setTimeout(function(){
                    a.remove();
                },timer*1000);
            }
            return a;
        },
        info : function(s){
            s = typeof s=="object"?(s.error||s.message):s;
            this.$.find(".msg").html(`<div class="alert-info">${s}</div>`);
            return this;
        },
        success : function(s){
            s = typeof s=="object"?(s.message):s;
            this.$.find(".msg").html(`<div class="alert-success">${s}</div>`);
            return this;
        },
        error : function(s){
            s = typeof s=="object"?(s.error||s.message):s;
            this.$.find(".msg").html(`<div class="alert-warning">${s}</div>`);
            return this;
        },
        alert : function(s){
            s = typeof s =="object"?s:{error:s};
            alert(s.message||s.error);
            return this;
        },
        disabled : function(a){
            if(a){
                this.$.find("button,.btn").attr(`disabled`,"disabled");
            }else{
                this.$.find("button,.btn").removeAttr(`disabled`);
            }
            return this;
        }
    },options,true);

};
})(window);