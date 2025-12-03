
setTimeout(function() {
	jQuery(document).ready(function($) {

	});
	window.cron = function(name){
		jQuery.ajax({
	        url: document.location.origin+"/ahlu_cron.php?a="+name,
	        type: 'POST',
	        data: {},
	        async: true,
	        success: function() {}
	    });
	};
},1000);