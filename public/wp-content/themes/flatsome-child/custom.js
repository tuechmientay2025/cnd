
    jQuery(document).ready(function () {
		try {
		var mega_menu_height = (jQuery(".manhphuc-menu-left-primary").length?jQuery(".manhphuc-menu-left-primary").height():jQuery("#mega_menu").height());
		//alert(mega_menu_height);
		
		//jQuery("#mega_menu > li.has-child > ul.sub-menu").css('height', jQuery("#mega_menu").height());
        jQuery("#mega-menu-title").click(function () {

            jQuery("#mega_menu").toggleClass("active")

        });
            jQuery("body").click(function (e) {

                var i = jQuery(e.target);
                "mega-menu-title" != i.attr("id") && jQuery("#mega_menu.active").removeClass("active")

            });
			
            jQuery("#mega_menu > li").hover(function (e) 
			{   
			    
				 if(jQuery('.header-wrapper').hasClass('stuck')){
					 
					 mega_menu_height = jQuery("#mega_menu").height();
				 }
				 else{
					 if(jQuery(".manhphuc-menu-left-primary").length){
					  mega_menu_height = jQuery(".manhphuc-menu-left-primary").height();
					 }
					 
					 
				 }
		         var _position = jQuery(this).position();
				 
                 jQuery(this).children(".sub-menu").css('height', (mega_menu_height + 1) + "px");
                 jQuery(this).children(".sub-menu").css("top",  -(_position.top +1) +"px");
				
             });

         }
catch(err) {
  alert(err.message);
}   

    });
