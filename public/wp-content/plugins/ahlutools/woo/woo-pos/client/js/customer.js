$(document).on("Config",function (e,config) {
	$("body").append(`<style>
	#wc-pos-customer-data{
		    z-index: 10000;
	}
	.cusblock{position:relative;}
	.cusblock .add_items{display:none;}
	.cusblock .results{display: none;
		position:absolute;
		    top: 100%;
		left:0;
		width:100%;
		min-height:75px;
		background-color: white;
	    padding: 8px;
	    border-radius: 8px;
    }
    .cusblock .results .item{cursor: pointer;}
    </style>`);

	var p = $("#customer_user").parent().parent().addClass("cusblock");
	
	wpajax("customer_list",{},function(r) {
    	
    	//set global
    	store.customers = r||[];
    	p.find('.select2').remove();
		p.append(`<input type="text" placeholder="Tìm kiếm..." class="text" /><div class="results"></div>`);


		////
    	var results = p.find(".results");
    	var input =  p.find('input');
    	input.on("keyup",function(e){
    		var val =this.value.trim();
    		console.log(val);
    		if(val){
    			if(val.length>2){
    				var data = (store.customers||[]).filter(function(v){

	    				return v.fullname.toLowerCase().includes(val);
	    			});

	    			results.html(data.map(function(v){
	    				return `<div class="item" data-info='${JSON.stringify(v)}'>${v.fullname}</div>`;
	    			}).join("")).show();
    			}else{
    				results.html(`Nhập ít nhất 3 kí tự`).show();
    			}
    			
    		}else{
    		   results.hide();
    		}
    	}).on("focus",function(e){
    		var val =this.value.trim(); 
    		if(!val&&results.find('.item').length){
    			results.show(); 
    		}else{
    			results.hide(); 
    		}
    	});

    	p.on("click",".results .item",function(e){
    		var customer  = $(this).data("info");
    		if(customer){
    			var ele = $("#customer_items_list");
    			ele.find(".avatar img").attr("src",customer.avatar);
    			ele.find(".name").html(customer.fullname);

    			POS_APP.setCustomer(customer);
    			input.val("");
    			results.hide();


    		}
    	});	
	});
});