(function(win){
	
$.fn.uploadSimple = function(options){
     return this.each(function(){
       var ele = $(this);
       var settings = $.extend({type:{id:"image",width:75,height:75},name:"",desc:"Hình ảnh đại diện",multiple:false,error:"Vui lòng đăng ảnh",onSelect:function(){}},options,true);

       //set up
       //
       var handler = ele.find("label");

       var id = "up"+Date.now();
       if(handler.length==0){
         switch(settings.type.id){
           case "image":
              ele.html(`<div class="img text-center">

              <label for="${id}">

                <img class="image avatar" src="${settings.avatar||""}" ><br/>

                ${settings.desc||""}

             </label>

               <input type="file" value="" ${settings.multiple?"multiple='multiple'":""} title="${settings.error||""}" ${settings.name?'name="'+settings.name+'"':""} id="${id}" accept=".jpg,.png,.jpeg,.gif" style="opacity: 0;position: absolute;">

              </div>`);
           break;
         case "video":
              ele.html(`<div class="img text-center">

              <label for="${id}">

                <video height="${settings.type.height}" width="${settings.type.width}" src="${settings.avatar||""}" ><br/>

                ${settings.desc||""}

             </label>

               <input type="file" value="" ${settings.multiple?"multiple='multiple'":""} title="${settings.error||""}" ${settings.name?'name="'+settings.name+'"':""} id="${id}" accept="video/*" style="opacity: 0;position: absolute;">

              </div>`);
           break;
         }
         

       }else{
         id= handler.attr("id");
       }

       handler.css("position","relative");

        function readURL(input) {

          if (input) {

            var reader = new FileReader();

            

            reader.onload = function(e) {

              ele.find("img").attr('src', e.target.result);

              if(settings.onSelect){
                  settings.onSelect.call(input,e.target.result);
              }
            };
       
            reader.readAsDataURL(input);

          }

        }

        ele.on('change',"input[type='file']", function(){

          readURL(this.files[0]);

        }); 

       var methods = {
          run : function(){
              handler.trigger("click");
          },
          progressBar : {
             show: function(num){
                var progressBar = handler.find(".progressBar");
               if(progressBar.length==0){
                  progressBar = $(`<span class="progressBar" style="    position: absolute;
    top: 45%;
    left: 0;
    z-index: 100000;
    display: inline-block;
    width: 100%;"></span>`);
                  progressBar.appendTo(handler);
               }
               progressBar.html(num); 
             },
             remove : function(){
                handler.find(".progressBar").remove();
             }
          }
       };
       ele.data("uploadSimple",methods);
     });
  };
})(window);

/**
 var uploader = modal.find(".profile").uploadSimple({
          image:res.image,
          onSelect : function(e){
            console.log(e);

            uploadFile({file:this},site_url_ajax("api/upload/file/"),function(r){
               state.image = r.url;
            },{
              headers :{
                shop_id : AppRequest.shop_id,
                "auth-token" : $("meta[name='auth-token']").attr("content"),
              },
              onProgress: function(per){
                 console.log(per);
                 var ele = uploader.data("uploadSimple").progressBar;
                 per = parseInt(per*100);
                 ele.show(per+"%");
                 if(per>=100){
                    ele.remove();
                 }
              }
            });
          }
        });
 */


