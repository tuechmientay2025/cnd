 function readURL(input,f) {

    if (input) {

      var reader = new FileReader();

      

      reader.onload = function(e) {

        f(e.target.result);

      };

      

      reader.readAsDataURL(input); // convert to base64 string

    }

  }


if(!window.AUpload){
  window.AUpload =function(options){

    options = $.extend({data:{}},options,true);

   

    $.ajax({

          type: 'POST',

          url: options.url||"https://faucet.donggiatri.com/upload/",

          data: options.data,

          processData: false,

          contentType: false,

          async:true

      }).done(function(data) {

          // print the output from the upload.php script

          console.log(data);



          if(options.callback)options.callback(data);

      });

  };
}


setTimeout(function(){

  $.fn.formValidate = function(options) {
      return this.each(function(){
          var settings = $.extend({},options,true);
          settings.submitHandler = function(form){
            var me = $(form);
             if(window.CKEDITOR){
                for(var i in CKEDITOR.instances){
                    var a  = me.find("#"+i);
                    if(a.length){
                      CKEDITOR.instances[i].updateElement();
                      // a.val(encodeURIComponent(a.val()));
                    }
                }
             }

             form.url = me.attr("action");
             form.error = me.attr("data-error")||"Có lỗi xảy ra";
             form.success = me.attr("data-success")||"Xử lý thành công."; 

             form.data = me.serializeObject();
             var buttons = me.find("button,.btn,input[type='submit']").attr("disabled","disabled");
             if(options.submitHandler)options.submitHandler(form);
             setTimeout(function(){
                buttons.removeAttr("disabled");;
             },4000);
          };
          $(this).validate(settings);
      });
  };

    

   $.bindData = function(ele,data){
     (typeof ele=="string"?$(ele):ele).bindData(data);
   };

   $.fn.bindData  = function(settings) {
      return this.each(function(){
        var form = $(this);
         for(var i in settings){
          if(i){
              
              var e = form.find("."+i);
              if(e.length==0){
                e = form.find("[name='"+i+"']");
              }
              if(e.length==0){
                e = form.find("[value='"+i+"']");
              }
              if(e.length){
                  if(e[0].nodeName=="INPUT"){

                      if(e[0].type=="checkbox" || this.type=='radio'){


                          if(settings[i] == e[0].value){
                              e.attr("checked","checked");
                          }else{
                              e.removeAttr("checked");
                          } 
                      }else{
                          e.val(settings[i]);
                      }
                  }else if(e[0].nodeName=="TEXTAREA"){
                    

                    //check embed ckeditor
                    if(e.attr("data-ckeditor")&&window.CKEDITOR_GO){
                      CKEDITOR_GO(e[0],settings[i],{
                       callback: function(){
                        
                       }
                     });
                    }else{
                      e.val(settings[i]);
                    }

                  }else if(e[0].nodeName=="IMG"){
                    e.attr("src",settings[i]);
                  }else if(e[0].nodeName=="SELECT"){
                     e.val(settings[i]);
                  }else if(e[0].nodeName=="A"){
                    e.attr("href",settings[i]).html(settings[i]);
                  }else{
                      e.html(settings[i]);
                  }
              }
          }


         }
      });
   };

   $(document).on("keyup",".display_money",delay(function(){

            this.value = show_money_none(this.value.replace(",",""));

    },700));
   /**
    * Modal auto submit
    * @param  {[type]} ) [description]
    * @return {[type]}     [description]
    */
    $(document).on("click",".modalsubmit",function(){ 
      $(this).closest('.modal').find('form').submit();
    }).on("submit","form.ajax",function(e){

        e.preventDefault();
        if(this.action){ 
          var f = this;

          var form = new FormData(f);

          postForm(this.action,form,function(res){

      

              $(f).trigger("onAjax",[res]);

          });

         }else{
          console.log("Can not find action url",f);
         }

        return false;

     });

function inputclose_allow(me){
  return ["INPUT","TEXTAREA"].includes(me.nodeName) && !["ccheckbox","radio","select"].includes(me.type);
}
$(document).on('click','.groupactive>*',function(){
    // console.log(this);
    var ele = $(this);
    ele.addClass('active').siblings().removeClass('active');
});

    
 
 

window.renderData = function(u,modal){ 
    for(var i in u){
      var a = modal.find('.'+i);
      if(a.length==0){
        a = modal.find(`[name="${i}"]`);
      }
      if(a.length){
          switch(a[0].nodeName.toLowerCase()){
            case 'input':
                if(a[0].type=='radio' || a[0].type=='checkbox' ){
                    a[0].checked = a[0].value==u[i];
                }else{
                  a.val(u[i]);
                }
            break;
            case 'select':
            case 'textarea':
                a.val(u[i]);    
            break;
            default:
                a.html(u[i]);   
            break;
          }
          
        }
    }   
};
$(document).on("click",".inputclose",function(){
 
  var me = $(this);
  me.parent().find(".form-control").val("");
  me.remove();
  
}).on("focus",".form-control",function(){
  // console.log(this);
  if(inputclose_allow(this)){

  
    var me = $(this).parent().css("position","relative");
    if(this.value){
      if(!this.span && me.closest(".form-control").length){
     
        var offset = me.position();
        me.find(".inputclose").remove();
        var span = $(`<span class="inputclose">x</span>`);
        span.css({position:"absolute",top: (offset.top-8)+"px",left:(me.width()-18)+"px","z-index":10,padding:"8px"});
        span.insertAfter(me);
        span.on("click",function(){
           me.val("");
           me[0].span = null;
        });
        this.span = span;
      }
    } 
  } 
  
}).on("keyup",".form-control",function(){
  if(inputclose_allow(this)){
    var me = $(this);
    if(this.value){
      if(!this.span && me.closest(".form-control").length){
     
        var offset = me.position();
        me.find(".inputclose").remove();
        var span = $(`<span class="inputclose">x</span>`);
        span.css({position:"absolute",top: (offset.top-8)+"px",left:(me.width()-18)+"px","z-index":10,padding:"8px"});
        span.insertAfter(me);
        span.on("click",function(){
           me.val("");
           me[0].span = null;
        });
        this.span = span;
      }
    } 
  } 
  
}).on("blur",".form-control",delay(function(){
  if(inputclose_allow(this)){
    var me = $(this);
    if(this.span && me.closest(".form-control").length){
      me.parent().find(".inputclose").remove();
      this.span = null;
    }
  }
},500));



/*
    <div class="formdiv">

      <label for="fname">Enter amount</label>

      <input id="fname" type="text" class="cool"/>

    </div>

 */

 
 $(document).on('focusin','.formdiv input', function() {


  $(this).parent().find('label').addClass('active');

   

}).on('focusout','.formdiv input', function() {

  if (!this.value) {

    $(this).parent().find('label').removeClass('active');

  }

}).on("focusout",".input-bt-effect input",function () {
  if ($(this).val() != "") {
    $(this).addClass("has-content");
  } else {
    $(this).removeClass("has-content");
  }
});
/*
<div class="input-bt-effect">
    <input class="bt-effect-24" type="text" placeholder="">
      <label>First Name</label>
      <span class="focus-bg"></span>
  </div>
 */


window.formdiv = function(ele){

  return {

     active : function(v){

      if(ele[0].nodeName=="INPUT"){

          ele.closest(".formdiv").find('label').addClass('active');

          ele.val(v||"");

      }else{

         ele.find('label').addClass('active');

          ele.find('input').val(v||"");

      }

     },

    unactive : function(v){

      if(ele[0].nodeName=="INPUT"){

          ele.closest(".formdiv").find('label').removeClass('active');

          ele.val(v||"");

      }else{

        ele.find('label').addClass('active');

          ele.find('input').val(v||"");

      }

     }

  }

};

//////

},100);