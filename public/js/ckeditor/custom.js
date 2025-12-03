(function() {
  var getScriptURL = function(){
      var scripts = document.getElementsByTagName( 'script' );
        var len = scripts.length;
        for(var i =0; i < len; i++) {
            if(scripts[i].src.search("/ckeditor/custom.js") > 0) {
                return scripts[i].src;
            }
        }
  }

  var current_url = getScriptURL();
  var urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(current_url);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}
CKEDITOR.on( 'instanceReady', function( ev ) {
  
  ev.editor.on('blur', function(e){
    // var element = ev.editor.getSelection().getStartElement();
    // console.log(element);
  });
});



function CK_jQ() {
  for ( var instance in CKEDITOR.instances ) { 
    CKEDITOR.instances[instance].updateElement(); 

    var ele = $("#"+instance);
    ele.val(encodeURIComponent(ele.val()));
    ele.trigger("change");
  }
}

function init(){
  $(".ckeditor").each(function(i,v){
    if(v.loaded_editor)return;
    v.loaded_editor = true;
    v.id = v.id?v.id:"cke"+(new Date()).getTime();

    var id = v.id;
    CKEDITOR.replace(v.id);
    CKEDITOR.instances[v.id].on("instanceReady", function() {
        this.document.on("keyup", CK_jQ);
        this.document.on("paste", CK_jQ);
        this.document.on("keypress", CK_jQ);
        this.document.on("blur", CK_jQ);
        this.document.on("change", CK_jQ);
      });
    document.getElementById(v.id).setData = function(v){
      CKEDITOR.instances[id].setData(v);

      $("#"+id).val(encodeURIComponent(v));
    };
  });
  $(".ckeditor-inline").each(function(i,v){
    if(v.loaded_editor)return;
    v.loaded_editor = true;

    var ele = this;
    var me = $(ele);
    
    var name = me.attr("name")?me.attr("name"):"default";
    /*Create input hidden*/
    var id = "editable_"+name.replace(/[^a-z0-9\_]+/igm,'_');
    //check exsit
    if($("[name='"+name+"']")[0].nodeName!="TEXTAREA"){
      me.closest("form").prepend('<input type="hidden" class="'+id+'" name="'+name+'" value="'+encodeURIComponent(me.html())+'" />');
    }
    var callback = me.attr("data-callback");

    CKEDITOR.inline(v, {
      on: {
        blur: function( event ) {
           if (event.editor.checkDirty()){
              var data = event.editor.getData();
              data = encodeURIComponent(data);
              $("."+id).val(data);
              
              if(window[callback]!=undefined){
                window[callback](data);
              }else{
               eval("(function(){var data=null;try{data=JSON.parse("+JSON.stringify(data)+");}catch(e){data=decodeURIComponent('"+data+"')};var callback = "+callback+";if(callback instanceof Function){callback.call($('."+id+"')[0],data);}else{(function(data){"+callback+"})(data); } })();");
             }
          
           }
        }
      }
    });
    
    $("form").submit(function(){
      me.val(encodeURIComponent(me.val()));
    });
  });
}


$('body').on('DOMNodeInserted',"#content", function(e) {
    init();
});


$("body").on("submit","form",function(){
  CKEDITOR.updateHTML();
});
    //check plugin 
        CKEDITOR.on('instanceReady', function(evt){ 
            if(CKEDITOR.imagepaste!=undefined){
            CKEDITOR.imagepaste.config.upload = site_url("filemanager.php?upload&token="+urlParam("token"));

          }
        } );
        
window.addEventListener("message", function receiveMessage(event)
{
  
  var data = event.data;
  if(data.source && data.source==="filemanager"){
    console.log("ckeditor",event.data);
    var a = CKEDITOR.dialog.getCurrent();
     if(data.action && a){
        a.setValueOf("info", "txtUrl", location.protocol+"//"+location.host+"/"+data.data[0]);      
     }
  }
  // if (event.origin !== "http://example.org:8080")
  //   return;

}, false);
       
      CKEDITOR.disableAutoInline = true;
      init();
 CKEDITOR.updateHTML = function() {for (var instance in CKEDITOR.instances){CKEDITOR.instances[instance].updateElement();if($){$('#'+CKEDITOR.instances[instance].name).val(encodeURIComponent($('#'+CKEDITOR.instances[instance].name).val()));}}};

})();