$(document).on("Config",function(e,config) {

	
   $(document).on("ProductLoad",function(e,products){

   });      
         
 //show grid/list
 	$("#wc-pos-register-grids h3.hndle").wrap('<div class="title-grid-col"></div>');
 		 $(".title-grid-col").append(`<i class="fa fa-th showgrid" aria-hidden="true"></i>`);
    var  showgrid =window.localStorage.getItem("showgrid");
    var pro_block = $("#grid_layout_cycle").addClass("showgrid");
    if(showgrid=="grid"){
    	$(".showgrid").addClass("fa-th").removeClass("fa-list");
    }else{
    	$(".showgrid").addClass("fa-list").removeClass("fa-th");
    }
    

	if(window.innerWidth<1015){
		         
      $("#wc-pos-register-search-products").wrap(`<div class="productmodile"></div>`);
      // $('.productmodile').append(`<span class="qrcodeproduct scanqrcode"><i class="fa fa-qrcode" aria-hidden="true"></i></span>`);
      $(".title-grid-col").appendTo('.productmodile');
 
    }
   
    $(document).on("click",".title-grid-col .showgrid",function(){
        pro_block.toggleClass("grid");
        if(pro_block.hasClass("grid")){
        	window.localStorage.setItem("showgrid","grid");
        	$(this).addClass("fa-th").removeClass("fa-list");
        }else{
        	window.localStorage.setItem("showgrid",'normal');
        	$(this).addClass("fa-list").removeClass("fa-th");
        }
    });

    $(document).on("Qrcode",function(e,code){

    	if(typeof code=="object"&&code.ac=="finger"){

				//check time
				var time = code.time;
				var now = Date.now();
				var fire = timer*1000;
				if(now-old_time<fire){
					wpajax("wc_hr_finger_checkin",code,function(res){
              		if(res.code){
              			alert(res.message);
              		}else{
              			alert(res.error);
              		}
              	});
				} 
			}

    }); 
});