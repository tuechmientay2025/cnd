(function(win){

	$(document).on("Config",function(){
        $("#regiser_top_bar #pos_register_buttons").append(`<span class=" scanqrcode" style="margin: 0 8px;font-size: 20px;"><i class="fa fa-qrcode" aria-hidden="true"></i></span>`);
		$("#bill_screen .opmenumain").append(`<a class="button wc_pos_qrcode_cus scanqrcode" style="cursor: pointer;"><i class="fa fa-qrcode"></i> Qrcode</a>`);
        var resize = function(){
            
            if(win.innerWidth<1015){
                $(".wc_pos_qrcode,.scanqrcode").show();
                
            }else{
              $(".wc_pos_qrcode,.scanqrcode").hide();
              $(".wc_pos_qrcode,.scanqrcode").hide();
            }
        };
        resize();
        $(win).bind("resize",resize);
        //qrcode for customer
        var abc = $(`<a class="button wc_pos_qrcode scanqrcode" style="cursor:pointer"><i class="fa fa-qrcode"></i> Qrcode</a>`);
        abc.insertBefore("#add_customer_to_register");
        abc.click(function(e){
            e.preventDefault();
            if(!win.ADevice){ 
                $(".add_items input").focus();
            }
            
        });

        $(document).on("click",".scanqrcode",function(e,data){
            if(win.MyScan){
                win.MyScan(function(code){

                    alert(code);
                    try{
                        code = JSON.parse(decodeURIComponent(code));
                    }catch(e){}


                    $(document).trigger("Qrcode",[code]);
                    //barcode
                    //user
                    //payment
                    //...
                });
            }
            

        });
    });


    //listen Qrcode
    $(document).on("Qrcode",function(e,info){

    	
    	if(typeof info=="object" && info.ac=="cus"){
    		var data = info.data;
    		//append to 
    	}

    });
    
})(window);