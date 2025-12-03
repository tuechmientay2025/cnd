(function(win){
   function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
 }


  /*
  this.width, this.height, options.width,options.height
   */
  win.resizeImage =  function(options) {


  const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            
            var a = calculateAspectRatioFit(this.width, this.height, options.width,options.height);
            canvas.width = a.width;
            canvas.height = a.height;
            
            ctx.drawImage(img, 0, 0, a.width,a.height);
            
            const resizedBase64 = canvas.toDataURL("image/jpg");

            options.callback(resizedBase64);
          };
        };
        reader.readAsDataURL(options.file);
       
         
};
  function readURL(input,f) {
   
      var reader = new FileReader();
      
      reader.onload = function(e) {
        if(f)f.call(input,e.target.result);
      };
      
      reader.readAsDataURL(input);
  }
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    var file = new File([u8arr], (filename||Date.now())+"."+mime.split('/')[1], {type:mime});
    file.base64 = dataurl;
    return file;
}
function base64MimeType(encoded) {
    var result = null;
  
    if (typeof encoded !== 'string') {
      return result;
    }
  
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  
    if (mime && mime.length) {
      result = mime[1];
    }
  
    return result;
}
// const uploadFiles = (url, files, onProgress) =>
//   new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.upload.addEventListener('progress', e => onProgress(e.loaded / e.total));
//     xhr.addEventListener('load', () => resolve({ status: xhr.status, body: xhr.responseText }));
//     xhr.addEventListener('error', () => reject(new Error('File upload failed')));
//     xhr.addEventListener('abort', () => reject(new Error('File upload aborted')));
//     xhr.open('POST', url, true);
//     const formData = new FormData();
//     Array.from(files).forEach((file, index) => formData.append(index.toString(), file));
//     xhr.send(formData);
//   });
  // if(!win.uploadFile){
  //   win.uploadFile = function(file,f,id) {
  //     let formData = new FormData(); 
  //       if(id){
  //           formData.append("id", id);
  //       }          
  //       formData.append("file", file);


  //       fetch('https://data.donggiatri.com/upload.php', {
  //         method: "POST", 
  //         body: formData
  //       }).then(function(res){return res.json()}).then(function(r){
  //          try{
  //              r= JSON.parse(r);
  //          }catch(e){}
  //          f(r);
  //       });
  //   };
  // }

  var callback = null;
  var id_ = "upload"+Date.now();
   var uploadinput = null;

  var load = 0;
  function init(){
    if(load)return;
    load =1;

     $("body").append(`<div style="position: absolute;top: -100%;"><label for="${id_}" class="${id_}">anc</label><input id="${id_}" type="file"  /></div>`);
     uploadinput = $("#"+id_).on("change",function(){
       var files = this.files;

       for(var i=0; i<files.length;i++){
           
           var file = files[i];
           
           (function(f){
             f.id = Date.now();
             readURL(f,function(e){
               f.base64 = e;
              callback(f,function(data){
                console.log(data);
              });
              // callback = null;
             });
           })(file);
          
          
       }
       
    });
  }
  win.File = window.File ||{};
  win.File.settings ={
     width:105,
     upload : "https://data.donggiatri.com/databases/upload.php",
     onData : function(data){
       return data;
     },
     onHeader : function(headers){
       return headers;
     }
  };

  File.imgUploads = function(ele,options){

    for(var i=0;i<options.value.length;i++){
        var n  =$('<div class="boxm mb-8"></div>');
        ele.append(n);
  
        File.imgupload(n,{
            index :i,
           value :  options.value[i],
           field :options.field,
           label :`Ảnh`, 
           callback: function(url) {
                if(options.callback){
                  options.callback(url,this.index);
                }
           }
        });
    }
};
File.imgUpload=  function (ele,options){
    if(options.height){
      ele.height(options.height);
    }

    var type = options.type?`accept="${options.type}"`:"";

    var img = options.value?`background-image:url(${options.value})`:"";
    var id ="u"+[1,Date.now()].random();
    ele.html(`
        <input type="hidden" value="${options.value||""}" name="${options.field||""}" class="${options.field||""}">
              <div class="boximage bg" style="position: relative;
    background-color: #dedede;
    color: #333;
    text-align: center;
    display: flex
;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 64px;
    border-radius: 16px;
    width: 90%;
    margin: 0 auto;
    cursor: pointer;
    background-size: contain;
    margin-bottom: 16px;
    max-width: 320px;${img}">
                <label for="${id}" aria-label="camera" class="anticon anticon-camera" style="font-size: 30px; color: rgb(51, 51, 51);">
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="camera" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M864 248H728l-32.4-90.8a32.07 32.07 0 00-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 248H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V328c0-44.2-35.8-80-80-80zm8 536c0 4.4-3.6 8-8 8H160c-4.4 0-8-3.6-8-8V328c0-4.4 3.6-8 8-8h186.7l17.1-47.8 22.9-64.2h250.5l22.9 64.2 17.1 47.8H864c4.4 0 8 3.6 8 8v456zM512 384c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160zm0 256c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"></path></svg>
                </label>
                <input type="file" accept="image/*" ${type} style="opacity:0;position:absolute;top:100%;z-index:-1" id="${id}" />
                <span>${options.label}</span> 

                <div class="badge badge-warning progressbarper" style='position:absolute;bottom:10px'></div>
             </div>
   `);
     ele.find("#"+id).on("change",function(e){
  
          var me =$(this).closest(".boximage");

          // var hRatio = canvas.width / image.width;
          //   var vRatio = canvas.height / image.height;
          //   var ratio = Math.min(hRatio, vRatio);

          resizeImage({
            file:this.files[0],
            width: 320,
            height:680, 
            callback : function(src){
                 var form = $(me).closest("form");
               if(form.length==0){
                  form = $(me).closest("div");
               }
               var parent = $(me).closest("div");
             
               var name = options.name||options.field||"";
               
                $(me).css("background-image","url("+src+")");

                 
                var box  =$(me).parent().find(".progressbarper");
                //

                uploadFile({file:src,name:name},options.url||File.settings.upload,function(r){ 
                   box.html("");
                   var url = typeof r=="string"?r:r.url;
                    form.find("."+options.field).val(url);

                    if(options.callback){
                      options.callback(url);
                    }
                },{
                    onProgress: function(per){
                        per = Math.ceil(per*100);
                        console.log(per);
                        
                        box.html(per+"%");

                    }
                }); 
            }
          });
     });
  };
  /*
    File.pickerImage({ 
      callback:function(file,callback){
          me.src=file.base64;

          form.find('[role="progressbar"]').remove();
          $(me).closest("div").css("position","relative").prepend(`<div role="progressbar"  class='center' aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="--value: 0;--size:30px"></div>`);

          //

          uploadFile({file:file,name:name},"api/upload/file/",function(r){
              form.find('[role="progressbar"]').remove();
              form.find("."+name).val(r);
          },{
              onProgress: function(per){
                  per = Math.ceil(per*100);
                  console.log(per);
                  form.find('[role="progressbar"]').css("--value",per);
              }
          }); 
      }
    });
  */
  win.File.pickerImage = function(options){
     win.uploadFiles("image",options.callback,1);
  };
  win.File.pickerImages = function(options){
     win.uploadFiles("images",options.callback,10);
  };
  win.File.readURL =readURL;

  
  win.uploadFiles = function(type,f,many){
    init();
    callback = f;
    switch (type) {
      case "image":
           uploadinput.attr("accept","image/*").attr("capture","user");
      break;
      case "images":
        uploadinput.attr("accept","image/*").attr("capture","user");
      break;
      case "videos":
        uploadinput.attr("accept","video/*").attr("capture","environment");
      break;
      case "audio":
        uploadinput.attr("accept","audio/*");
      break;
      case "imagesvideos":
        uploadinput.attr("accept","audio/*,video/*").attr("capture","environment");
      break;
      default:
       uploadinput.removeAttr("accept");
      break;
    } 
    uploadinput.removeAttr('multiple');
    if(many>1){
      uploadinput.attr('multiple','multiple');
    }
     
     document.querySelector("."+id_).click();

  };
  /*
    uploadFile({file:file,name:name},"api/upload/file/",function(r){
        
    },{
        headers:{},
        onProgress: function(per){
            per = Math.ceil(per*100);
             
        }
    }); 
    //
    uploadFile({
      data:{file:file,name:name},
      url : "api/upload/file/",
      headers : {},
      callback : function(r){
          
      },
      onProgress: function(per){
        per = Math.ceil(per*100);
        console.log(per);     
      }
    });
  */
  String.prototype.uploadFile = function(options){
    var url = this.toString();
     uploadFile(options.data,url,options.callback,options);
  };
  win.uploadFile = function (data,url,f,options) {

      if(!url){
         data = data.data;
         url = data.url;
         f = data.callback;
         options = data;
      }

      options=$.extend({headers:{}},options,true);


      url = url?url:File.settings.upload;

      let formData = new FormData();  

      //action on hook
      File.settings.onData(data);

      for(var i in data){
         if(typeof data[i] !="function"){
           formData.append(i, data[i]);
         } 
      }       



    var xhr = new XMLHttpRequest();

    

     
    


    xhr.upload.addEventListener('progress', function(e){
       if(options.onProgress)options.onProgress(e.loaded / e.total,e);
    });
    xhr.addEventListener('load', function(){
      var r = xhr.responseText;
      //{ status: xhr.status, body: xhr.responseText }
      try{
           r= JSON.parse(r);
       }catch(e){}
       f(r);
    });
    xhr.addEventListener('error', function(){
      // reject(new Error('File upload failed'))
    });
    xhr.addEventListener('abort', function(){
      // reject(new Error('File upload aborted'))
    });
    xhr.open('POST', url, true);


    var headers = options.headers||{};
 
    //action on hook
    File.settings.onHeader(headers);
    for(var ii in headers){
       xhr.setRequestHeader(ii, headers[ii]);
    }  
          
    // const formData = new FormData();
    // Array.from(files).forEach((file, index) => formData.append(index.toString(), file));
    xhr.send(formData);
      
      // fetch(url?url:'https://donggiatri.com/chat/upload.php', {
      //   method: "POST", 
      //   body: formData
      // }).then(function(res){return res.json()}).then(function(r){
      //    try{
      //        r= JSON.parse(r);
      //    }catch(e){}
      //    f(r);
      // });
  };

  win.File.pickerImageCrop = function(options){
     window.File.pickerImage({
        callback : function(info){ 
          uploadCrop(info.base64,$.extend({},options,true)).then(function(r){ 
            if(options.callback)options.callback(dataURLtoFile(r),info);
          }); 
        }
      });
  };
  String.prototype.pickerImageCrop = function(options){
      options.name = this.toString();
      File.pickerImageCrop(options);
  };
  
  win.File.uploadFile = win.uploadFile;
  win.File.pickerImageResize = function(options){

      window.File.pickerImage({
        callback : function(info){ 
          options = $.extend({},options,true);

             const resize_width =options.width||600;

              var MAX_WIDTH = options.width||300;
              var MAX_HEIGHT = options.height||300;

            
           
            const img = new Image();
            img.src = info.base64;
            
            img.onload = function(el) {
              const elem = document.createElement('canvas');

              const scaleResize = resize_width / el.target.width;
              elem.width = resize_width;
              elem.height = el.target.height * scaleResize;

              // var width = img.width;
              // var height = img.height;

              // // Change the resizing logic
              // if (width > height) {
              //     if (width > MAX_WIDTH) {
              //         height = height * (MAX_WIDTH / width);
              //         width = MAX_WIDTH;
              //     }
              // } else {
              //     if (height > MAX_HEIGHT) {
              //         width = width * (MAX_HEIGHT / height);
              //         height = MAX_HEIGHT;
              //     }
              // }


              const ctx = elem.getContext('2d');
              // ctx.mozImageSmoothingEnabled = false;
              // ctx.webkitImageSmoothingEnabled = false;
              // ctx.msImageSmoothingEnabled = false;
              // ctx.imageSmoothingEnabled = false;
              ctx.drawImage(el.target, 0, 0,elem.width, elem.height);

              const srcEncoded = ctx.canvas.toDataURL('image/jpeg', 1);

               if(options.callback)options.callback(srcEncoded,info);
            }
        }
      });
      
 
  };

 
/*
    $(".logoshop").on("click",function(){
       var me = this;
      "logo".pickerImageResize({
        width:105, 
        ready : function(src,file){
           me.src = src;
        },
        callback:function(src,ac){
          me.src=src;
          
          if(ac=="end"){
            //update data
               post(site_url_ajax("api/store/update_kv/"),{v:src,k:"logo"},function(){

               },true);
          } 
        }
      });
    });
*/
String.prototype.pickerImageResize = function(options){
  options = $.extend({width:File.settings.width}, options,true);

  var name = this.toString();

  File.pickerImageResize({
        width:options.width,
        ready : options.ready, 
        callback:function(src){

          if(options.ready){
            options.ready(src.base64,src);
          }

          var url = options.url||File.settings.upload;
          
          options.callback(src,"begin");
          File.uploadFile({image_base64:src,name:name},url,function(r){
             options.callback(r.url,"end");
          },{
            onProgress : options.onProgress
          });
           
        }
    });
};

})(window);

  // modal.find(".imgroombg").on("click",function(){
  //     window.uploadFiles("images",function(file){
        
  //        uploadFile(file,function(r){
  //          if(r.code){
  //            //find id to update
  //            window.roomActive.avatar = r.url; 

  //            modal.find(".imgroom").attr("src",window.roomActive.avatar);
  //          } 
            
  //        });
  //    });
  // });

  
$.fn.FileDrop = function(options){

      this.each(function(){
          $(this).data("FileDrop",this);
          var dropArea = this;
          var settings = $.extend({
            url:'https://api.cloudinary.com/v1_1/joezimim007/image/upload',
            headers:{},
            handleFiles: function(files){

            },
            updateProgress: function(i,per){

            },
            complete: function(xhr,file,i){

            },
            error: function(xhr,file,i){

            }
          },options,true);
          // Prevent default drag behaviors
          ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
          })

          // Highlight drop area when item is dragged over it
          ;['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
          });

          ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
          });

          // Handle dropped files
          dropArea.addEventListener('drop', handleDrop, false);

          function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
          }

          function highlight(e) {
            dropArea.classList.add('highlight');
          }

          function unhighlight(e) {
            dropArea.classList.remove('active');
          }

          function handleDrop(e) {
            var dt = e.dataTransfer;
            var files = dt.files;

            handleFiles(files);
             dropArea.classList.add('highlight');
          }

         

          function handleFiles(files) {
            files = [...files]; 
            files.forEach(uploadFile);
            

            settings.handleFiles(files);
          }

         
          function uploadFile(file, i) {
            var url = settings.url;
            var xhr = new XMLHttpRequest();
            xhr.file  =file;
            var formData = new FormData();


            
            xhr.open('POST', url, true);
            for(var i in settings.headers){
              xhr.setRequestHeader(i,settings.headers[i]);
            }
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            // Update progress (can be used to show progress indicator)
            xhr.upload.addEventListener("progress", function (e) {
              settings.updateProgress(i, e.loaded * 100.0 / e.total || 100,xhr.file);
            });

            xhr.addEventListener('readystatechange', function (e) {
              if (xhr.readyState == 4 && xhr.status == 200) {
                settings.updateProgress(i, 100,this.file);
                var txt = xhr.responseText;
                try{
                  txt= JSON.parse(txt)
                }catch(e){}

                settings.complete(txt,file,i,this.file);
              } else
              if (xhr.readyState == 4 && xhr.status != 200) {
                settings.error(xhr,file,i,this.file);
              }
            });

            formData.append('upload_preset', 'ujpu6gyk');
            formData.append('file', file);
            xhr.send(formData);
            
          }
      });
 };

$(document).ready(function () {
 $(document).on("click","[image-resize]",function(){
       var me = this;
       var form = $(me).closest("form");
       if(form.length==0){
          form = $(me).closest("div");
       }
       var parent = $(me).closest("div");
       var name = $(me).attr("image-resize");
       console.log(name);

       var bar = null;

       name.pickerImageResize({
        url : site_url_ajax("api/upload/base64/"),
        width:$(me).attr("image-size")||105, 
        ready : function(src,file){
            me.src=src;
            bar = $.progressCircle({parent:parent,size:40});
        },
        onProgress : function(per){
            per = Math.ceil(per*100);
            bar.update(per);
        },
        callback:function(src,ac){
 
          if(ac=="end"){
            bar.remove();
            form.find("."+name).val(src);
          } 
        }
      });
    }).on("click","[image-picker-name]",function(){
       var me = this;
       //  <img class="avatar" image-picker-size="75" image-picker-control=".name" image-picker-name="image" image-picker-target="image" src="" ><br/>


       File.pickerImage({ 
        callback:function(src,callback){
            var form = $(me).closest("form");
           if(form.length==0){
              form = $(me).closest("div");
           }
           var parent = $(me).closest("div");
           var field = $(me).attr("image-picker-name");   

           var name = field;
           var control = $(me).attr("image-picker-control"); 
            if(control){
                name = form.find(control).val().make_slug();
            }

            me.src=src.base64;

            var bar =  $.progressCircle({parent:parent,size:40});

            //

            uploadFile({file:src,name:name},File.settings.upload,function(r){
                bar.remove();
                form.find("."+field).val(r.url);
            },{
                onProgress: function(per){
                    per = Math.ceil(per*100);
                    console.log(per);
                    bar.update(per);
                }
            }); 
        }
      });
    });
  });
/*

How to use

 $(document).ready(function () {
function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    let img = document.createElement('img');
    img.src = reader.result;
    document.getElementById('gallery').appendChild(img);
  };
}
let uploadProgress = [];
let progressBar = document.getElementById('progress-bar');

function initializeProgress(numFiles) {
  progressBar.value = 0;
  uploadProgress = [];

  for (let i = numFiles; i > 0; i--) { 
    uploadProgress.push(0);
  } 
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent;
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length;
  progressBar.value = total;
}
  $("#drop-area").FileDrop({
     url:"https://faucet.donggiatri.com/upload/",
     handleFiles: function(files){
        initializeProgress(files.length);
        files.forEach(previewFile);
     },
      updateProgress: function(fileNumber, percent){
          updateProgress(fileNumber, percent)
      }
  });
 });
*/