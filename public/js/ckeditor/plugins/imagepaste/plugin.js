/*
Get Selected Element

var sel = editor.getSelection();
var element = sel.getStartElement();
sel.selectElement(element);

Set Range or Cursor

var ranges = editor.getSelection().getRanges();
ranges[0].setStart(element.getFirst(), 0);
ranges[0].setEnd(element.getFirst(), 0 + 5); //range
sel.selectRanges([ranges[0]]);

or

var ranges = editor.getSelection().getRanges();
ranges[0].setStart(element.getFirst(), 0);
ranges[0].setEnd(element.getFirst(), 0); //cursor
 

after that call

editor.insertHtml()
 */

 // Handles image pasting in Firefox
CKEDITOR.imagepaste={
	config:{
			upload:CKEDITOR.globalConfig.filebrowserUploadUrl
	},
	override : (function(){
		var hanlders = {};
		return {
		  add : function(e,f){
			if(f instanceof Function)
			  hanlders[e] = f;
			  
			return this;
		  },
		  has : function(e){
			return hanlders[e]!=undefined;
		  },
		  apply : function(e/*,*/){
			var data = Array.prototype.slice.call(arguments,1);
			if(hanlders[e]!=undefined){
			  return hanlders[e].apply(null,data);
			}
			return data.join(" ");;
		  }
		}
	  })(),
	events : (function(){

		var fired = {};

			 var handlers = {};
			return {
				init: function () {
				},
				getHandlers : function() {
					return handlers;
				},
				has : function(name){
					if(typeof(name)!=="string") return false;
					return handlers[name] !=undefined;
				},
				on : function(name, method) {  
			//
					this.listen(name, method);
					return this;
				},
				listen : function(name, method) {
					if(handlers === undefined) {
						handlers = {};
					}
					if(handlers[name] === undefined) {
						handlers[name] = [method];
					}else{

								 handlers[name].push(method);
						}
						
				  //check fire imediately becuase it is called in delay
				if(fired[name] != undefined  && handlers[name]){
					
					method.apply(null,fired[name].params);

					return this;
				}      
		 },
				trigger : function(name, txt) {
					  if(handlers === undefined) {
						  handlers = {};
					  }
										//check fire
					  if(fired[name] == undefined){
						fired[name] = {
						  params : Array.prototype.slice.call(arguments, 1),
						};
					  }
					  if(handlers[name]) {
								  var a = Array.prototype.slice.call(arguments, 1);
								  var len = handlers[name].length;
								  for(var i=0;i<len;i++){
										if(handlers[name][i] instanceof Function)
											handlers[name][i].apply(null,a);
								  }
					  }
				}
			};
	})()
}
CKEDITOR.plugins.add( 'imagepaste',
{
	init : function( editor )
	{
		var root_path = this.path;


		function getsrc(returndata){
			 if(typeof returndata=="string"){
			 	  return returndata;
			 }

			 return "//" +editor.document.$.location.host+returndata[0];
		}		
		////
		//embed image
		CKEDITOR.imagepaste.beforeUpload = function(formData){
			if(window.$){
					$(document).trigger('CKEDITOR_UPLOAD',[formData]);
			}
		};

		CKEDITOR.imagepaste.override.add("onImage",function(file){
			
			
			
			var obj = {
				id:"img-upload-"+(new Date()).getTime(),
				load : function(editor){
					var me = this;
					var formData = new FormData();
					// Main magic with files here
					formData.append('image',file); 
					CKEDITOR.imagepaste.beforeUpload(formData);

			
					 $.ajax({
						url: CKEDITOR.imagepaste.config.upload,
						type: 'POST',
						data: formData,
						async: true,
						cache: false,
						contentType: false,
						processData: false,
						success: function (returndata) {
							try{
								returndata=JSON.parse(returndata.trim());
							}catch(ex){}
							if(returndata){
								//save
								console.log("true");
								
								var id_ =setInterval(function() {
									var ele  =editor.document.$.getElementById(me.id);
									if(ele){
										clearInterval(id_);
										// ele.setAttribute("src",editor.document.$.location.protocol + "//" +editor.document.$.location.host+returndata[0]);
										ele.setAttribute("src",getsrc(returndata));
										ele.removeAttribute("id");
										ele.setAttribute( 'data-cke-saved-src',getsrc(returndata));
								
									}
								}, 1000);
							}
							else{
								console.log(false);
							}
						}
					  });
				},
				render : function(){
					return '<img src="'+root_path+ '/images/loading.gif" id="'+this.id+'" />';
				}
			};

			return obj
		});
		
		//embed video
		CKEDITOR.imagepaste.override.add("onVideo",function(file,ext){

			var obj = {
				id:"onVideo-upload-"+(new Date()).getTime(),
				load : function(){
					var me = this;
					var formData = new FormData();
					// Main magic with files here
					formData.append('image',file); 
			
					 $.ajax({
						url: CKEDITOR.imagepaste.config.upload,
						type: 'POST',
						data: formData,
						async: true,
						cache: false,
						contentType: false,
						processData: false,
						success: function (returndata) {
							if(returndata){
								//save
								console.log("true");
								
								var ele =editor.document.$.getElementById(me.id);
								if(ele){
									var div = document.createElement('div')
									
									switch(ext){
										case "wmv":
										case "x-ms-wmv":
										case "x-ms-wma":
										case "x-ms-mp2":
											div.innerHTML='<object classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" width="480" height="360" codebase="http//www.microsoft.com/Windows/MediaPlayer/">'+
'<param name="Filename" value="'+"//" +editor.document.$.location.host+"/API/stream.php?file="+returndata[0]+'">'+
'<param name="AutoStart" value="true">'+
'<param name="ShowControls" value="true">'+
'<param name="BufferingTime" value="2">'+
'<param name="ShowStatusBar" value="true">'+
'<param name="AutoSize" value="true">'+
'<param name="InvokeURLs" value="false">'+
'<embed src="' + "//" +editor.document.$.location.host+"/API/stream.php?file="+returndata[0]+'" type="application/x-mplayer2" autostart="1" enabled="1" showstatusbar="1" showdisplay="1" showcontrols="1" pluginspage="http//www.microsoft.com/Windows/MediaPlayer/" CODEBASE="http//activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,0,0,0" width="480" height="360"></embed>'+
'</object>';
										break;
										default:
											div.innerHTML='<video id="my-video" class="video-js" controls preload="auto" width="640" height="264"'+
  'poster="MY_VIDEO_POSTER.jpg" data-setup="{}">'+
    '<source src="'+ "//" +editor.document.$.location.host+"/API/stream.php?file="+returndata[0]+'" type="video/'+ext+'">'+
    '<p class="vjs-no-js">'+
      'To view this video please enable JavaScript, and consider upgrading to a web browser that'+
      '<a href="http//videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>'+
    '</p>'+
  '</video>';
										break;
										
									}

									ele.parentNode.insertBefore(div, ele);
									ele.parentNode.removeChild(ele);
								}
							}
							else{
								console.log("flase");
							}
						}
					  });
				},
				render : function(){
					return '<img src="'+root_path+ '/images/loading.gif" id="'+this.id+'" />';
				}
			};

			return obj;
		});
		
		//embed audio
		CKEDITOR.imagepaste.override.add("onAudio",function(file,ext){

			var obj = {
				id:"onAudio-upload-"+(new Date()).getTime(),
				load : function(){
					var me = this;
					var formData = new FormData();
					// Main magic with files here
					formData.append('image',file); 
			
					 $.ajax({
						url: CKEDITOR.imagepaste.config.upload,
						type: 'POST',
						data: formData,
						async: true,
						cache: false,
						contentType: false,
						processData: false,
						success: function (returndata) {
							if(returndata){
								//save
								console.log("true");
								
								var ele =editor.document.$.getElementById(me.id);
								if(ele){
									var div = document.createElement('div')
									
									switch(ext){
										case "wmv":
										case "x-ms-wmv":
										case "x-ms-wma":
										case "x-ms-mp2":
											div.innerHTML='<object classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" width="480" height="360" codebase="http//www.microsoft.com/Windows/MediaPlayer/">'+
'<param name="Filename" value="'+ "//" +editor.document.$.location.host+"/API/stream.php?file="+returndata[0]+'">'+
'<param name="AutoStart" value="true">'+
'<param name="ShowControls" value="true">'+
'<param name="BufferingTime" value="2">'+
'<param name="ShowStatusBar" value="true">'+
'<param name="AutoSize" value="true">'+
'<param name="InvokeURLs" value="false">'+
'<embed src="'+"//" +editor.document.$.location.host+"/API/stream.php?file="+returndata[0]+'" type="application/x-mplayer2" autostart="1" enabled="1" showstatusbar="1" showdisplay="1" showcontrols="1" pluginspage="http//www.microsoft.com/Windows/MediaPlayer/" CODEBASE="http//activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,0,0,0" width="480" height="360"></embed>'+
'</object>';
										break;
										case "mp3":
											div.innerHTML='<audio src="'+ "//" +editor.document.$.location.host+"/API/stream.php?file="+returndata[0]+'" controls="true" loop="true" autoplay="false"></audio>'+
											'<br /><a href="'+  "//" +editor.document.$.location.host+"/API/stream.php?file="+returndata[0]+'" target="_blank" download >Download</a>';
										break;
										default:
											div.innerHTML='<video id="my-video" class="video-js" controls preload="auto" width="640" height="264"'+
  'poster="MY_VIDEO_POSTER.jpg" data-setup="{}">'+
    '<source src="'+ "//" +editor.document.$.location.host+"/API/stream.php?file="+returndata[0]+'" type="video/'+ext+'">'+
    '<p class="vjs-no-js">'+
      'To view this video please enable JavaScript, and consider upgrading to a web browser that'+
      '<a href="http//videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>'+
    '</p>'+
  '</video>';
										break;
										
									}

									ele.parentNode.insertBefore(div, ele);
									ele.parentNode.removeChild(ele);
								}
							}
							else{
								console.log("flase");
							}
						}
					  });
				},
				render : function(){
					return '<img src="'+root_path+ '/images/loading.gif" id="'+this.id+'" />';
				}
			};

			return obj;
		});
		
		//embed unknown
		CKEDITOR.imagepaste.override.add("onUnknown",function(file){

			var obj = {
				id:"onUnknown-upload-"+(new Date()).getTime(),
				load : function(){
					var me = this;
					var formData = new FormData();
					// Main magic with files here
					formData.append('image',file); 
			
					 $.ajax({
						url: CKEDITOR.imagepaste.config.upload,
						type: 'POST',
						data: formData,
						async: true,
						cache: false,
						contentType: false,
						processData: false,
						success: function (returndata) {
							if(returndata){
								//save
								console.log("true");
								
								var ele =editor.document.$.getElementById(me.id);
								if(ele){
									var a = document.createElement('a')
									
									a.href= "//" +editor.document.$.location.host+returndata[0];
									a.target= "_blank";
									a.innerHTML = a.href.split(/(\\|\/)/g).pop();	
									ele.parentNode.insertBefore(a, ele);
									ele.parentNode.removeChild(ele);
								}
							}
							else{
								console.log("flase");
							}
						}
					  });
				},
				render : function(){
					return '<img src="'+root_path+ '/images/loading.gif" id="'+this.id+'" />';
				}
			};

			return obj;
		});
		///
		function getMatches(string, regex, index) {
		  index || (index = 1); // default to the first capturing group
		  var matches = [];
		  var match;
		  while (match = regex.exec(string)) {
			matches.push(match[index]);
		  }
		  return matches;
		}
		
		function chkImg(ev) {
			// don't execute code if the editor is readOnly
			if (editor.readOnly) {
				return;
			}
		   
		   ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		//get element
		
		var sel = editor.getSelection();
		var range = sel.getRanges()[0];
		var current_pos = range.startOffset;
		var element = sel.getStartElement();
		sel.selectElement(element);
		
		//
		var img_loading="";
		for(var i in ev.dataTransfer.files){
			if(ev.dataTransfer.files[i] instanceof Function || isNaN(i))break;

			//create image loading for each item
			var matches = null;
			if((matches = getMatches(ev.dataTransfer.files[i].type, /image\/(.*)/ig, 1)).length>0){
				var obj = CKEDITOR.imagepaste.override.apply("onImage",ev.dataTransfer.files[i],matches[0]);
			}else if((matches = getMatches(ev.dataTransfer.files[i].type, /video\/(.*)/ig, 1)).length>0){
				var obj = CKEDITOR.imagepaste.override.apply("onVideo",ev.dataTransfer.files[i],matches[0]);
			}else if((matches = getMatches(ev.dataTransfer.files[i].type, /audio\/(.*)/ig, 1)).length>0){
				var obj = CKEDITOR.imagepaste.override.apply("onAudio",ev.dataTransfer.files[i],matches[0]);
			}else{
				var obj = CKEDITOR.imagepaste.override.apply("onUnknown",ev.dataTransfer.files[i]);
			}
			
			img_loading+=obj.render();
			obj.load(editor);
		}
		var text = img_loading;
		//now insert into document
		var value = element.$.innerHTML;
		value = value.substring(0, current_pos)+text+value.substring(current_pos,value.length);
		element.$.innerHTML = value;
		var ranges = editor.getSelection().getRanges();
		ranges[0].setStart(element.getFirst(), current_pos+ text.length);
		ranges[0].setEnd(element.getFirst(), current_pos+ text.length); //range
		editor.getSelection().selectRanges([ranges[0]]);
			 
		//ev.target.appendChild(document.getElementById(data));
		// editor.updateElement();

		
		}
		editor.on('contentDom', function() {
			editor.document.$.ondrop=chkImg;
		});
		function dataURLtoFile(dataurl,filename) {
		    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		    while(n--){
		        u8arr[n] = bstr.charCodeAt(n);
		    }
		    switch(mime){
		    	case "image/png":
		    		filename = "file-"+(new Date()).getTime()+".png";
		    	break;
		    	case "image/jpg":
		    	case "image/jpeg":
		    		filename = "file-"+(new Date()).getTime()+".jpg";
		    	break;
		    	case "image/gif":
		    		filename = "file-"+(new Date()).getTime()+".gif";
		    	break;
		    	case "image/png":
		    		filename = "file-"+(new Date()).getTime()+".png";
		    	break;
		    	default:
		    	filename = "file-"+(new Date()).getTime();
		    	break;
		    }
		    return new File([u8arr], filename, {type:mime});
		}

		// Paste from clipboard:
		editor.on( 'paste', function(e) {
			var data = e.data,
				html = (data.html || ( data.type && data.type=='html' && data.dataValue));
			if (!html)
				return;

			// strip out webkit-fake-url as they are useless:
			if (CKEDITOR.env.webkit && (html.indexOf("webkit-fake-url")>0) )
			{
				alert("Sorry, the images pasted with Safari aren't usable");
				window.open("https//bugs.webkit.org/show_bug.cgi?id=49141");
				html = html.replace( /<img src="webkit-fake-url:.*?">/g, "");
			}

			// Replace data: images in Firefox and upload them
			var _html = $("<div>"+html+"</div>");
			var imgs = [];
			//find all image link from enternal url
			_html.find("img").each(function(i,v){
				var me =this;
				var src= $(this).attr("data-original")?$(this).attr("data-original"):($(this).attr("data-lazy")?$(this).attr("data-lazy"):me.src);

				var id = "leech-img-"+Math.floor((Math.random() * (new Date()).getTime()) + 1);

				for (var i = this.attributes.length -1; i >= 0 ; i--) {
	        $(this).removeAttr(this.attributes[i].name);
	      }

				me.setAttribute('id',id);
				//change image to loading
				me.src = root_path+ '/images/loading.gif';
				
				//inline resource
				if(src.indexOf("data:image\/")!=-1){
					imgs.push({
						src: src,
						id : id,
						load : function(){
							var me = this;
							//save image to server

							var formData = new FormData();
							// Main magic with files here
							//formData.append('image',dataURLtoFile(src)); 
							formData.append('image_base64',this.src); 
							
							CKEDITOR.imagepaste.beforeUpload(formData);
							 $.ajax({
								url: CKEDITOR.imagepaste.config.upload,
								type: 'POST',
								data: formData,
								async: true,
								cache: false,
								contentType: false,
								processData: false,
								success: function (html) {
									 
									if(html){
										var ele =editor.document.$.getElementById(me.id);
										ele.src = html;
										ele.setAttribute( 'data-cke-saved-src', html);
										ele.removeAttribute("id");

										me.src=ele.src;
									}
								}
							  });
						}
					});
				}else{
					//store
					imgs.push({
						src: src,
						id : id,
						load : function(){
							var me = this;
	 
							var formData = new FormData(); 
							
							CKEDITOR.imagepaste.beforeUpload(formData);
							 $.ajax({
								url: editor.document.$.location.protocol + "//" +editor.document.$.location.host+"/download/?url="+encodeURIComponent(src),
								type: 'POST',
								data: formData,
								async: true,
								cache: false,
								contentType: false,
								processData: false,
								success: function (html) {
									 
									if(html){
										var ele =editor.document.$.getElementById(me.id);
										ele.src = html;
										ele.setAttribute( 'data-cke-saved-src', html);
										ele.removeAttribute("id");

										me.src=ele.src;
									}
								}
							 }); 
						}
					});
				}
			});

			//find all link to go direct link or not


			html = _html.html();

			if (e.data.html)
				e.data.html = html;
			else
				e.data.dataValue = html;


			setTimeout(function(){
				for(var i in imgs){
					if(imgs[i] instanceof Function)break;
					imgs[i].load();
				}
			},100);
		});

	} //Init
} );
