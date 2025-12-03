(function(win){
	$(document).on('click','.scrollable>*', function(e) {

	  e.preventDefault(); 
	  var me = $(this);
	  var scrollable = me.closest(".scrollable");
	  var x = scrollable.css("overflow-x");
	  var y = scrollable.css("overflow-y");
	  if(x=="auto" || x=="scroll"){
	    scrollable.animate({scrollLeft: me.position().left}, 750);
	  }
	  
	  if(x=="auto" || y=="scroll"){
	    scrollable.animate({scrollTop: me.position().top}, 750);
	  }

	});
})(window);