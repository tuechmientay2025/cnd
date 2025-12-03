function getURLParameters(paramName,href) {
	var sURL = href?href:document.location.href;
	if (sURL.indexOf("?") > 0) {
	    var arrParams = sURL.split("?");
	    var arrURLParams = arrParams[1].split("&");
	    var arrParamNames = new Array(arrURLParams.length);
	    var arrParamValues = new Array(arrURLParams.length);
	    var i = 0;
	    for (i = 0; i < arrURLParams.length; i++) {
	        var sParam = arrURLParams[i].split("=");
	        arrParamNames[i] = sParam[0];
	        if (sParam[1] != "")
	            arrParamValues[i] = unescape(sParam[1]);
	        else
	            arrParamValues[i] = "No Value";
	    }
	    for (i = 0; i < arrURLParams.length; i++) {
	        if (arrParamNames[i] == paramName) {
	            //alert("Parameter:" + arrParamValues[i]);
	            return arrParamValues[i];
	        }
	    }
	    return null;
	}
}
function googleTranslateElementInit(){

	var id = "google_translate_element";
	new google.translate.TranslateElement({autoDisplay: false,pageLanguage: "{$default}",includedLanguages: 'vi,ar,en,es,jv,ko,pa,pt,ru,zh-CN,th,fr,ja,lo,ms',layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT}, id);
		setTimeout(function(){
     
	      jQuery("#"+id).removeClass("hid");

	      var a = jQuery("#"+id).find(".skiptranslate.goog-te-gadget > div").eq(0);
	      a.insertBefore(jQuery("#"+id).find(".skiptranslate.goog-te-gadget"));

	      	var b = function(){
				if(window.innerWidth<1000 && jQuery(".translate_mobile").length>0){
					jQuery("#"+id).appendTo(jQuery(".translate_mobile").eq(0));
				}else{
					if(jQuery(".google_translate #"+id).length==0)
					jQuery("#"+id).appendTo(jQuery(".google_translate"));
				}
		  	};	
			$(window).bind("resize",b);
			b();	

     },500);
     
	$(window).on("scroll",function(){
		var scroll = $(window).scrollTop();
		if(window.innerWidth<1000){
			if(scroll>10 && $(".whb-sticky-header").hasClass("whb-sticked")){
				jQuery("#"+id).appendTo(jQuery(".translate_mobile").eq(1));
			}else{
				jQuery("#"+id).appendTo(jQuery(".translate_mobile").eq(0));
			}
		}else{

		}
	});	
}

//language
jQuery(document).ready(function($){

  	$("body").append("<script src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'><\/script>");
});
