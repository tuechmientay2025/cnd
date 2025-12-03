(function(win){
    win.datasrc= function(ele){
        (ele||$("[data-src]")).each(function(v){
            this.src=$(this).attr("data-src");
            $(this).removeAttr("data-src");
        });
    };

    win.isInViewport = (function() {

        $.fn.isInViewport = function(options) {
            return this.each(function() {
                var settings = $.extend({
                    ele: ">*"
                }, options, true);
                var $this = this;
                var ele = $($this);
                ele.on("scroll", function() {
                    ele.find(typeof options.ele=="string"?options.ele:options.ele()).each(function() {
                        if (!this.loaded) {
                            isInViewport(this, $this, function(target) {
                                if (options.callback)
                                    options.callback.call(target, target);
                            });
                        }
                    });
                });

            });
        };

        return function(ele, parent, f) {
            var pos = ele.getBoundingClientRect();
            var top = pos.top
              , bottom = pos.bottom;

            var vHeight = parent.innerHeight || $(parent).height() || document.body.innerHeight;
            var ok = ((top > 0 || bottom > 0) && top < vHeight);
            if (ok) {
                ele.loaded == 1;
                $(ele).addClass('loaded');
                if (f)
                    f(ele);
            }
            return ok;

        };
    })();


    

     //<div class="fastimage" src="https://img.freepik.com/free-vector/flat-geometric-background_23-2148957201.jpg?size=626&ext=jpg"> </div>
    var cls = ".fastimage[src]";
    function loader(me) {
        var ll = me.find(".ll");
        if (ll.length == 0) {
            me.html('<div class="ll"> <div class="l green"></div></div>');
            ll = me.find(".ll");
        }

        return ll;
    } 

    win.fastimage = {
        lists:["[data-src]",".fastimage"],
        append : function(a){
            if(!this.lists.includes(a)){
                this.lists.push(a);
            }
            return this;
        },
        init : function(){
            this.run("body,div.scoll,.canscroll,.modal-body");
        },
        run : function(ele){
            (typeof ele=="object"?ele:$(ele)).isInViewport({
                ele:function(){
                    return fastimage.lists.join(',');
                },
                callback : function(ele){
                    var src = $(this).attr("data-src")||$(this).attr("fastimage")||"https://static.thenounproject.com/png/210732-200.png";
                    if(this.nodeName=="IMG"){
                        this.onerror = function(){
                            this.src = fastimage.image;
                        };
                        this.src = src;
                        $(this).removeAttr("data-src").removeAttr("fastimage").removeClass("fastimage");
                    }else{
                        $(this).css("background-image", "url(" + src + ")");
                    }
                }
            });
        },
        image: "https://static.thenounproject.com/png/210732-200.png",
        refresh: function(ele) {
            (ele ? ele.find(cls) : $(cls)).each(function(i, v) {
                if (v.loading) {
                    return;
                }
                var me = $(this);
                v.loading = true;
                var ll = loader(me);
                ll.show();

                var src = me.attr("src");
                me.removeAttr("src");
                var img = new Image();
                img.async = true;
                img.onload = function() {
                    v.loading = false;
                    me.css("background-image", "url(" + this.src + ")");
                    ll.delay(300).remove();
                }
                ;
                img.onerror = function() {
                    v.loading = false;
                    me.css("background-image", "url(" + window.fastimage.image + ")");
                    ll.remove();
                }
                ;
                img.src = src;

            });
        }
    };

    $(document).ready(function(){
        fastimage.init();
    });


     if(win.Handlebars){
      function img (s,w,h) {
          w = w||55;
          w = h||55;
          return new Handlebars.SafeString(`<div style="width:${w}px;height:${h}px" class="bg" data-src="${s}"></div>`);
      }
      Handlebars.registerHelper('fastimage',img);
      Handlebars.registerHelper('img',img);
    }

})(window);


(function(win){
    var MyBlobBuilder = function() {
  this.parts = [];
}

MyBlobBuilder.prototype.append = function(part) {
  this.parts.push(part);
  this.blob = undefined; // Invalidate the blob
};

MyBlobBuilder.prototype.write = function(part) {
  this.append(part);
}

MyBlobBuilder.prototype.getBlob = function(atype) {
  if (!this.blob) {
    this.blob = new Blob(this.parts, {
      type: !atype ? "text/plain" : atype
    });
  }
  return this.blob;
};
 
function convertToIco(imgSize, imgBlob) {
  let file = new MyBlobBuilder(),
    buff;

  // Write out the .ico header [00, 00]
  // Reserved space
  buff = new Uint8Array([0, 0]).buffer;
  file.write(buff, 'binary');

  // Indiciate ico file [01, 00]
  buff = new Uint8Array([1, 0]).buffer;
  file.write(buff, 'binary');

  // Indiciate 1 image [01, 00]
  buff = new Uint8Array([1, 0]).buffer;
  file.write(buff, 'binary');

  // Image is 50 px wide [32]
  buff = new Uint8Array([img.width < 256 ? img.width : 0]).buffer;
  file.write(buff, 'binary');

  // Image is 50 px tall [32]
  buff = new Uint8Array([img.height < 256 ? img.height : 0]).buffer;
  file.write(buff, 'binary');

  // Specify no color palette [00]
  // TODO: Not sure if this is appropriate
  buff = new Uint8Array([0]).buffer;
  file.write(buff, 'binary');

  // Reserved space [00]
  // TODO: Not sure if this is appropriate
  buff = new Uint8Array([0]).buffer;
  file.write(buff, 'binary');

  // Specify 1 color plane [01, 00]
  // TODO: Not sure if this is appropriate
  buff = new Uint8Array([1, 0]).buffer;
  file.write(buff, 'binary');

  // Specify 32 bits per pixel (bit depth) [20, 00]
  // TODO: Quite confident in this one
  buff = new Uint8Array([32, 0]).buffer;
  file.write(buff, 'binary');

  // Specify image size in bytes
  // DEV: Assuming LE means little endian [84, 01, 00, 00] = 388 byte
  // TODO: Semi-confident in this one
  buff = new Uint32Array([imgSize]).buffer;
  file.write(buff, 'binary');

  // Specify image offset in bytes
  // TODO: Not that confident in this one [16]
  buff = new Uint32Array([22]).buffer;
  file.write(buff, 'binary');

  // Dump the .png
  file.write(imgBlob, 'binary');

  return file.getBlob('image/vnd.microsoft.icon');
}

 

win.IconFromUrl = function (url,f) {
  
  var img = new Image();
  img.src=url;
  img.onload = e => {
    fetch(img.src).then(resp => resp.blob()).then(blob => {
        imgBlob = blob;
        imgSize = blob.size;
        var ico = convertToIco(imgSize, imgBlob);

        var url = window.URL.createObjectURL(ico);
        if(f)f(url);
    });
  };
};

win.IconFromFile = function (file,f) {
  var fileReader = new FileReader();
  fileReader.onloadend = function(e) {
    var arrayBuffer = e.target.result;
    const blobFile = new Blob([arrayBuffer]);
    const ico = convertToIco(blobFile.size, blobFile);
    var url = window.URL.createObjectURL(ico);
    if(f)f(url);
  };
  fileReader.readAsArrayBuffer(file);
};

})(window);


