(function(win){
   win.picker = win.picker||{};

   win.picker.mapGoolge = {
   	  key : "",
   	  geocode : function(options){
   	  	var geocoder = new google.maps.Geocoder();
   	  	geocoder.geocode(options.data, function (results, status) {
		     options.callback(results, status);
		});
		return this;
   	  },
   	  image : function(options,ishtml){
   	  	var key = options.key||this.key;
   	  	var icon = encodeURIComponent(`icon:http://www.google.com/mapfiles/arrow.png|${options.lat}&visible=${options.lat}|${options.lng}`);
   	  	 var url =`https://maps.googleapis.com/maps/api/staticmap?size=${options.width||600}x${options.height||400}}&markers=${icon}&key=${key}`;

   	  	 return ishtml?`<img src='${url}' />`:url;
   	  },
   	  imagePackage : function(options,ishtml){
   	  	var key = options.key||this.key;
   	  	var zoom = options.zoom||14;
   	  	var center = options.center||options.markers[0];
   	  	var markers = (options.markers).map(function(v){
   	  		return `markers=color:blue|label:S|${v.lat},${v.lng}`;
   	  	}).join("&");
   	  	  var url =`http://maps.google.com/maps/api/staticmap?
				center=${center}
				&zoom=${zoom}
				&size=${options.width||600}x${options.height||400}
				&maptype=roadmap
				&${markers}
				&sensor=false
				&key=${key}`;

   	  	 return ishtml?`<img src='${url}' />`:url;
   	  },
   	  GPS : function(f){
   	  	 if(win.AppCode){
				AppCode.GPS().then(function(gps){
					f(gps);
				});
			}else if(win.GPS){
				GPS(function(gps){
					f(gps)
				});
			}else if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(function (position) { 
		        	f({
		                lat: position.coords.latitude,
		                lng: position.coords.longitude
		            });
		        }, function () {
		             
		        });
		    }
		 return this;
   	  },
   	  createMarker : function(settings,map){
   	  	   var a = {
   	  	   	  map : map,
					  position: new google.maps.LatLng(settings.lat, settings.lng),
					  draggable: settings.draggable||false };
			 if(settings.icon){
			 	a.icon = {
				    url: settings.icon, // url
				    scaledSize: new google.maps.Size(50, 50), // scaled size
				    origin: new google.maps.Point(0,0), // origin
				    anchor: new google.maps.Point(0, 0) // anchor
				};
			 }
   	  	   var myMarker = new google.maps.Marker(a);
 
   	  	   return myMarker;
   	  },
   	  create : function(options){
   	  	  return new Promise(function(a,b){
   	  	  	  var go = function(){
	   	  	  	var settings = $.extend({
	   	  	  		ele:null,
	   	  	  		lat:win.country&&win.country.latitude?win.country.latitude:14.444546,
	   	  	  		lng:win.country&&win.country.longitude?win.country.longitude:120.99387360000003,
	   	  	  		zoom:16
	   	  	  	},options,true);
	   	  	  	  var map = new google.maps.Map(settings.ele, {
					  zoom: 16,
					  gestureHandling: "greedy",
					  center: new google.maps.LatLng(settings.lat, settings.lng),
					  mapTypeId: google.maps.MapTypeId.ROADMAP });

					
					var myMarker = picker.mapGoolge.createMarker({lat:settings.lat,lng:settings.lng, draggable: true },map);


					var me = {reset: function(options){
						settings = $.extend(settings,options,true);
						this.map.setOptions(options);
						return this;
					},map:map,marker:myMarker,center:function(lat,lng){
						var location = {
			                lat: lat,
			                lng: lng
			            }; 
                   		 myMarker.setPosition(location); 
                   		 map.setCenter(location);
                   return this;
					},gps:function(){
						return { lat: myMarker.getPosition().lat(), lng: myMarker.getPosition().lng() };
					}};


					google.maps.event.addListener(myMarker, 'dragend', function (evt) {
					  // document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';

					  var latlng = { lat: evt.latLng.lat(), lng: evt.latLng.lng() };
					  picker.mapGoolge.geocode({data:{ 'location': latlng }, callback:function (results, status) {
					    if (status === 'OK') {
					      if (results[0]) {
					      	latlng.address = results[0].formatted_address;
					        // console.log(results[0].formatted_address);
					        
					      } else {
					      	 
					        console.log('No results found');
					      }
					    } else {
					      console.log('Geocoder failed due to: ' + status);
					       
					    }
					    if(settings.onChange)settings.onChange.call(me,latlng);
					  }});

					});

					google.maps.event.addListener(myMarker, 'dragstart', function (evt) {
					  // document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
					});

					
				 	picker.mapGoolge.GPS(function(gps){
				 		me.center(gps);
				 	});
					
				 a(me); 
	   	  	  };
	   	  	 if(!google || !google.maps){
	   	  	 	loadJS("https://maps.google.com/maps/api/js?sensor=false",go);
	   	  	 }else{
	   	  	 	go();
	   	  	 } 
   	  	  });
   	  }
   };

   win.picker.mapGoolge.popup = (function(options){
   	function init(){
   		$("body").append(`<style>.mapsheet,.mapsheet .body{position:absolute;bottom:0;left:0}.boxcountry .cstate{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.boxcountry .cstate>*{width:33%}@media screen and (max-width:920px){.boxcountry .cstate>*{width:100%}}.mapsheet{height:100%;width:100%;visibility:hidden!important;z-index:10000000000000;-webkit-transition:.3s ease-in;-o-transition:.3s ease-in;transition:.3s ease-in;background-color:rgb(51 51 51 / 19%);-webkit-transform:translateY(100%);-ms-transform:translateY(100%);transform:translateY(100%)}.mapsheet.active{visibility:visible!important;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}.mapsheet .body{height:55%;border-radius:24px 24px 0 0;padding:14px;width:100%;background-color:#fff;color:#333;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.mapsheet .btnok{width:100%;text-align:center}.mapsheet .flex{-webkit-box-flex:1;-ms-flex:1;flex:1}</style>
		  <div class="mapsheet">

		       <div class="body">

		         <div class="ac" style="text-align: right;">

		          <span onclick='$(".mapsheet").removeClass("active")'>Đóng</span>

		         </div> 
		         <div class="countrymap"></div>
		         <div>

		             <button class="btn btn-primary btnok">Chọn</button>

		         </div>

		      </div>

		    </div>`);
 
   	}
   	var ele = null
   	return function(){
   		if(!ele){
   			init();
				ele =$(".mapsheet .countrya"); 
		   }
		   $(".mapsheet .btnok").off("click").on("click",function(){



	        if(options.callback){
	          var info = {};
	          var infomap = $(".mapsheet").data("map");
	          if(infomap){
	             info.gps = infomap.gps();
	          }

	          options.callback(info);

	        }

	        methods.close();

	     });



	     var methods= {

	        open : function(){

	           $(".mapsheet").addClass("active");
	           var camvas = $(".mapsheet .countrymap");
	           camvas.height(250);
	           camvas.css("width","100%");
	           var infomap = $(".mapsheet").data("map");
	           if(!infomap){
	              if(!picker.mapGoolge.key){
	                camvas.html("Please enter api key maps.... picker.mapGoolge.key='your_key'");
	                return;
	              }
	              win.picker.mapGoolge.create({
	                ele: camvas[0]
	              }).then(function(info){
	                $(".mapsheet").data("map",info);
	             });
	           }else{
	              if(google&&google.maps)google.maps.event.trigger(infomap.map, "resize");
	           }
	           

	           return this;

	        },

	        close : function(){

	           $(".mapsheet").removeClass("active");

	           return this;

	        }

	     };

	     return methods.open();
   	};

   })();

   /*
   Show map tracking package move
   var info = picker.mapGoolge.shipPackage({
	  ele:"",
	  user:{lat:14.444546,lng:120.99387360000003},
	  shop:{lat:14.444546,lng:120.99387360000003}
   });

   setInterval(function(){
		 info.updateGPS(14.444546,120.99387360000003,"come here place");
   },2000);
    */
   win.picker.mapGoolge.shipPackage = function(options){
   	var settings = $.extend({
   		user:null,
   		shop:null,
  	  		ele:null,
  	  		lat:win.country&&win.country.latitude?win.country.latitude:14.444546,
  	  		lng:win.country&&win.country.longitude?win.country.longitude:120.99387360000003,
  	  		zoom:16
  	  	},options,true);
  	  	var infowindow = new google.maps.InfoWindow({
	        content: "Package here"
	   });
  	  	var bounds = new google.maps.LatLngBounds();
   	var info = this.create(settings);
   	var map = info.map;

   	//marker defaul is shipper
   	//add marker A,B
   	info.user = picker.mapGoolge.createMarker(settings.user,map);
   	info.shop = picker.mapGoolge.createMarker(settings.shop,map);

   	info.marker.open = function(content){
   		 if(content)infowindow.setContent(content);
   		 infowindow.open(map,this);
   	};

   	bounds.extend(info.marker.getPosition());
   	bounds.extend(info.user.getPosition());
   	bounds.extend(info.shop.getPosition());
		map.fitBounds(bounds);


		google.maps.event.addListener(info.marker, 'click', function() {
	     infowindow.open(map,info.marker);
	   });

		//more options
		
		info.packageGPS  = function(lat,lng,content){
			var gps = {lat:lat,lng:lng};
			this.marker.setPosition(gps);
			bounds.extend({lat:lat,lng:lng});
		   map.fitBounds(bounds);

		   if(content)infowindow.setContent(content);
		};

		if(options.callback){
			options.callback(info);
		}

		return info;
   };
})(window);