//check current is ctv => show popup

$(document).on("Config",function(e,config) {
 	
 	if(config.isctv){
 		if(window.innerWidth<1015){
            $(".moreaction").append(`<a class="settingmodalctv tieude tips button ladda-button tiped" style="cursor: pointer;"><i class="fa fa-percent" aria-hidden="true"></i> Hoa hồng<span></span></a>`);
        }
 		 //setup print setting
	       var tabs = ModalTabs({
	         id:"modalctv",
	         init :  function(e){
	            //append to menu header POS Client
	           $("#pos_user_badge .menu_bar").prepend(`<div class="settingmodalctv tieude" style="cursor: pointer;"><i class="fa fa-percent" aria-hidden="true"></i> Hoa hồng <span></span></div>`)
	           $(document).on("click",".settingmodalctv",function(evt){
	           		evt.preventDefault();
	               e.modal.addClass("md-show");
	           });
	         
	           e.addTab({
	            name:'Hoa hồng',
	            html:`<div class="woocommerce-checkout printsettingblock" style="overflow: auto;" >
	                <style>
	                
	                </style>
	                <h1><span class="txt">Lịch sử Hoa hồng</span></h1>
	                <div>
	                	<p>Danh thu <span class="total_sale">0</span></p>
	                	<p>Hoa hồng <span class="total_bonus">0</span></p>
	                	
	                </div>
 					<div class="flex-row">
 						<input type="date" class="search_date" value="" placeholder="Tìm kiếm" />  <button type="button" class="button btnfind">Tìm</button>
 					</div>
 					<div class="result">

 					</div>
	               </div>`,
	               callback:function(evt){
	                  
	                    evt.tab.find(".btnfind").on("click",function(){
	                        var val = evt.tab.find(".search_date").val();
	                        if(val){
	                        	wpajax("wc_ctv_bonus_staff_date",{date:val},function(res){
	                        		//each outlet
	                        		var total_sale = 0;
	                        		var total_bonus = 0;
	                        		evt.tab.find(".result").html(res.data.map(function(v,x){
	                        			var inv = v.inv?JSON.parse(v.inv):[];


	                        			return `
	                        			<p>${v.name} - ${v.name_register}</p>
	                        			<p>Tình trạng thanh toán: <span class="total_status">${v.bonus_complete}</span></p>
	                        			<div class="table-responsive">
					 					 	<table class="table">
					                                <thead>
					                                    <th>#</th>
					                                    <th>Hoá đơn</th>
					                                    <th>Ngày</th>
					                                    <th>Tổng tiền</th> 
					                                    <th>HH</th> 
					                                 </thead>
					                                <tbody>${inv.map(function(n){
					                                	var m = (n.order_total*v.bonus_rate);
					                                	total_sale+=parse_money(n.order_total)*1;
					                                	total_bonus+=parse_money(m)*1;
					                                	return `<tr>
							                                <td>${x+1}</td>
							                                <td>${n.order_id}</td>
							                                <td>${show_money_none(n.order_total)}</td>
							                                <td>${n.order_date}</td> 
							                                <td>${show_money_none(m)}</td>  
							                            </tr>`;
					                                }).join("")}
					                           </tbody>
					                        </table>
					 					 </div>`;
	                        		}).join(""));
	                        		evt.tab.find(".total_sale").html(show_money_none(total_sale));
	                        		evt.tab.find(".total_bonus").html(show_money_none(total_bonus)); 
	                        	});



	                        }
	                    });

	                      evt.tab.find(".btnfind").trigger("click");
	               },
	               onActive : function(evt){
	                   
	                    var input = evt.tab.find(`.mainaction [value='${printer.action}']`);
	                    input.closest('li').trigger('click');
	               }
	           }); 
	           
	        }
	    });
 	}
});