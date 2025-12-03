(function(win){

	function fallbackCopyTextToClipboard(text) {

	  var textArea = document.createElement("textarea");

	  textArea.value = text;

	  

	  // Avoid scrolling to bottom

	  textArea.style.top = "0";

	  textArea.style.left = "0";

	  textArea.style.position = "fixed";



	  document.body.appendChild(textArea);

	  textArea.focus();

	  textArea.select();



	  try {

	    var successful = document.execCommand('copy');

	    var msg = successful ? 'successful' : 'unsuccessful';

	    console.log('Fallback: Copying text command was ' + msg);

	  } catch (err) {

	    console.error('Fallback: Oops, unable to copy', err);

	  }



	  document.body.removeChild(textArea);

	}

	if(!win.copyText){

		win.copyText = function (text) {

		  if (!navigator.clipboard) {

		    fallbackCopyTextToClipboard(text);

		    return;

		  }

		  navigator.clipboard.writeText(text).then(function() {

		    console.log('Async: Copying to clipboard was successful!');

		  }, function(err) {

		    console.error('Async: Could not copy text: ', err);

		  });

		};

	}





  function gocopy(txt,s){
  		 win.copyText(txt); 
      alert_(s);
  }


  function alert_(s){
  	  if(win.toastr){
        	toastr.info(s);
        }else{
        	alert(s);
        }
  }


  function gopaste(parent,txt,s){
  		 parent.find("input,textarea").val(txt);
        alert_(s);
  }
	

    $(document).on("click","[data-copy],.datacopy",function(){

      var txt = $(this).attr("data-copy");

      var message = $(this).attr("data-copy-message");

      switch(this.nodeName){
      	 case "INPUT":
      	 case "TEXTAREA":
      	 		txt = $(this).val();
      	 break; 
      }

     
      if(txt){
      	gocopy(txt,message?message:'Copied');
      }   

     }).on("click","[data-copy-target]",function(){ 
        var message = $(this).attr("data-copy-message"); 
      	var target = $(this).attr("data-copy-target");
      	var txt = $(this).text();
      	var a = $(this).closest("div").find(target);
      	if(a.length){
      		 switch(a[0].nodeName){
		      	 case "INPUT":
		      	 case "TEXTAREA":
		      	 		txt = a.val();
		      	 break; 
		      	default:
		      		 txt = a.text();
		      	 break; 
		      }
      	}
       

      if(txt){
      	gocopy(txt,message?message:'Copied');
      }   

     }).on("click","[data-paste],.datapaste",function(){

      var parent = $(this).parent();

      var message = $(this).attr("data-paste-message")||"Sao chép thành công";

      var txt = $(this).attr("data-paste");


      switch(this.nodeName){
      	 case "INPUT":
      	 case "TEXTAREA":
      	 		document.execCommand('paste');
      	 break; 
      	default:
      			if(!txt){
		      	navigator.clipboard.readText().then(function(s){
		      		gopaste(parent,s,message);
		      	});
		      }else{
		      	gopaste(parent,txt,message);
		      }

      	 break; 
      } 

     }).on("click","[data-paste-target]",function(){

      
      var target = $(this).attr("data-copy-target");

      var message = $(this).attr("data-paste-message")||"Sao chép thành công";

      var txt = "";

      var a = $(this).closest("div").find(target);

      switch(a[0].nodeName){
      	 case "INPUT":
      	 case "TEXTAREA":
      	 		document.execCommand('paste');
      	 		
      	 break; 
      	default:
      		  navigator.clipboard.readText().then(function(s){
		      		a.text(s);
		      		alert_(s);
		      	});
      	 break; 
      } 

     });

})(window);