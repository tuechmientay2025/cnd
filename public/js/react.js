(function(){
	if(!window.ReactNativeWebView){
		var abc = window.open;
		window.open = function(a){
			if(typeof a=='object')a=a.url;
			abc(a);
		}
	}
})();