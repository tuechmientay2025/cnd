$(document).on("Config",function(e,config) {
   $("body").append(`<style>
      #regiser_top_bar .floatbtn{
         position: relative;
       width: 24px;
       height: 24px;
       right: 0;
       bottom: 0;
       display: block;
           left: 0;
    margin: 0 8px;
      }
      #regiser_top_bar .floatbtn img{
         width: 24px;
       height: 24px;
      }
   </style>`);
	 
	if(window.innerWidth<1015){
		
           
          var resize = function(){
            
            if(window.innerWidth<1015){
                $(".floatbtn").draggable( 'disable' ).appendTo("#regiser_top_bar #pos_register_buttons");
            }else{
              $(".floatbtn").draggable( 'enable' ).appendTo("body");
            }
        };
        resize();
        $(window).bind("resize",resize);
 
    }
   
    
    
});