jQuery(document).ready(function($){
	function getURLParameters(paramName,href)
{
    var sURL = href?href:document.location.href;
    if (sURL.indexOf("?") > 0)
    {
        var arrParams = sURL.split("?");
        var arrURLParams = arrParams[1].split("&");
        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);

        var i = 0;
        for (i = 0; i<arrURLParams.length; i++)
        {
            var sParam =  arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "No Value";
        }

        for (i=0; i<arrURLParams.length; i++)
        {
            if (arrParamNames[i] == paramName)
            {
                //alert("Parameter:" + arrParamValues[i]);
                return arrParamValues[i];
            }
        }
        return null;
    }
}

	var r_ = getURLParameters("r");
	$('a[href]').each(function(){
	    var href = this.href;
	    var r = getURLParameters("r",href);
	    if(!r && r_){
	    	href = href+(href.indexOf('?') !== -1?'&':'?')+"r="+r_;
	    	$(this).attr('href', href);
	    }

	    
	});

	$.ajaxSetup({
        beforeSend: function(xhr, settings) {
        	var href = settings.url;
        	var r = getURLParameters("r",href);
		    if(!r && r_){
		    	href = href+(href.indexOf('?') !== -1?'&':'?')+"r="+r_;
		    	settings.url=href;
		    }
            // xhr.setRequestHeader('Authorization', authorization);
        }
    });

//     $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {

//     // Add data to ajax option
//     if (options.url.match(/www\.example\.com/i) !== null) {
//         originalOptions.data.token = 'i_am_token'
//     }

// });
    
});