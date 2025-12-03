//check current is ctv => show popup

$(document).on("Config",function(e,config) {
 	
 	var id_timer = null;
 	var old_time = null;
 	var timer = 40;
 	if(config.isctv){
 		if(window.innerWidth<1015){
            $(".moreaction").append(`<a class="settinghrfinger tieude tips button ladda-button tiped" style="cursor: pointer;"><i class="fa fa-handshake-o" aria-hidden="true"></i> Chấm công<span></span></a>`);
        }


 		 //setup print setting
	       var tabs = ModalTabs({
	         id:"modalhrfinger",
	         init :  function(e){
	            //append to menu header POS Client
	           $("#pos_user_badge .menu_bar").prepend(`<div class="settinghrfinger tieude" style="cursor: pointer;"><i class="fa fa-handshake-o" aria-hidden="true"></i> Chấm công<span></span></div>`)
	           $(document).on("click",".settinghrfinger",function(evt){
	           	evt.preventDefault();
	               e.modal.addClass("md-show");
	           });
	           //
	           e.addTab({
	            name:'Mã chấm công',
	            html:`<div class="woocommerce-checkout printsettingblock" style="overflow: auto;" >
	                <style>
	                
	                </style>
	                <h1><span class="txt">Mã chấm công</span></h1>

					                <div>
					                	<p>Vui lòng dùng ứng dụng WC để Quét mã ghi nhận</p>
					                	<p>Lần đầu tiên là Vào làm việc</p>
					                	<p>Lần cuối quét là tan ca</p>
					                	
					                </div>
				 					<div class="text-center">
				 						<img class="qr" src="https://api.qrserver.com/v1/create-qr-code/?size=125x125&data=a%C4%91" width="125" height="125">
				 					</div>
				 					<div class="result">

				 					</div>
	               </div>`,
	               callback:function(evt){
	                  
	                     
	               },
	               onActive : function(evt){
	                   var evt = this; 
	                   var c = 1;
	                    old_time = Date.now();
	                   var data = JSON.stringify({ac:"finger",time:old_time,token:AhluPos.config._wpnonce});
	                   console.log(data);
	                   evt.tab.find(`.qr`).attr("src","https://api.qrserver.com/v1/create-qr-code/?size=125x125&data="+encodeURIComponent(data));
	                   if(id_timer){
	                   	 clearInterval(id_timer);

	                   }
	                   id_timer = setInterval(function(){
	                   	 if(c++>timer){
	                   	 	  old_time = Date.now();
	                   	 	 data = JSON.stringify({ac:"finger",time:old_time,token:AhluPos.config._wpnonce});
	                   	 	 console.log(data);
	                   	 	evt.tab.find(`.qr`).attr("src","https://api.qrserver.com/v1/create-qr-code/?size=125x125&data="+encodeURIComponent(data));
	                   	 }
	                   },timer*1000); 
	               }
	           }); 
	           //
	           e.addTab({
	            name:'Lịch sử thanh toán',
	            html:`<div class="woocommerce-checkout printsettingblock" style="overflow: auto;" >
	                <style>
	                
	                </style>
	                <h1><span class="txt">Lịch sử thanh toán</span></h1>
	                <div>
	                	<p>Đã trả <span class="total_sale">0</span></p>
	                	<p>Còn lại <span class="total_bonus">0</span></p>
	                	
	                </div>
 					 
 					<div class="table-responsive">
 					 	<table class="table">
                                <thead>
                                    <th>#</th>
                                    <th>Mã</th>   
                                    <th>Tháng</th>   
                                    <th>Giá tiền</th> 
                                    <th>Tổng giờ</th> 
                                    <th>Thời gian thanh toán</th> 
                                    <th>Tình trạng</th> 
                                 </thead>
                                <tbody>
                      </tbody>
                        </table>
 					 </div>
	               </div>`,
	               callback:function(evt){
	                   //request xử lý
	                   	evt.tab.find(".btnrequest").on("click",function(){
	                   			wpajax("wc_hr_finger_payment_request",{},function(res){
	                        	 alert(res.message);
	                        });
	                   	});
	               },
	               onActive : function(evt){
	                   	var evt = this;  
	                   	evt.tab.find(".table tbody").html("");
	           			wpajax("wc_hr_finger_payment",{},function(res){
                			//each outlet
                    		var total_sale = 0;
                    		var total_bonus = 0;
                    		var d = new Date();
							           var months = d.getMonth()+1;
							           var y = d.getFullYear();
                    		evt.tab.find(".table tbody").html(res.data.map(function(n,x){
                            	// var m = (n.order_total*v.bonus_rate);
                            	// total_sale+=parse_money(n.order_total)*1;
                            	// total_bonus+=parse_money(m)*1;
                            	var status = "Đã thanh toán";
                            	if(n.status=="pending"){
                            		 if(n.month!=`${months}-${y}`){
                            		 	  status = "<button class='btnrequest'>Yêu cầu thanh toán</button>";
                            		 }else{
                            		 	  status = "--";
                            		 }
                            	}
                            	return `<tr>
	                                <td>${x+1}</td>
	                                <td>${n.id}</td>
	                                <td>${n.month}</td>
	                                <td>${show_money_none(n.money)}</td>
	                                <td>${show_money_none(n.hour)}</td>
	                                <td>${n.complete_date||"--"}</td>  
	                                <td>${status}</td>  
	                            </tr>`;
                            }).join(""));
                    		// evt.tab.find(".total_sale").html(show_money_none(total_sale));
                    		// evt.tab.find(".total_bonus").html(show_money_none(total_bonus)); 
                    	});
	               }
	           }); 
	           //
	           var d = new Date();
	           var months = d.getMonth()+1;
	           var y = d.getFullYear();
	           var l = [`<option value="">--Chọn tháng --</option> `];
	           for(var i=months;i>0;i--){
	           	 var nn= i<10?"0"+i:i;
	           	 l.push(`<option value="${nn}-${y}">${nn}-${y}</option> `);
	           }
	           e.addTab({
	            name:'Lịch sử chấm công',
	            html:`<div class="woocommerce-checkout printsettingblock" style="overflow: auto;" >
	                <style>
	                
	                </style>
	                <h1><span class="txt">Chấm công</span></h1>
	                <div class="flex-row">
	                	<div class="flex">
		                <p>Hình thức trả lương: <span>Theo giờ</span></p>
		                <p>1 giờ: <span>22,000</span></p>
		                <p>Thông tin tài khoản</p>
		                </div>
		                <div>
			                <div class="result text-center">
							                	<img src="https://cdn-icons-png.flaticon.com/128/2174/2174687.png" width="45" class="qrscan" height="45">
							                	<p>Quét ghi nhận chấm công</p>
						 					</div>
						 					<p>Có vấn đề cập nhật không đúng</p>
						 					<div><button class="btnreload">Tải lại</button></div>
					 					</div>
				 					</div>
 					<p>Lịch sử chấm công</p>
 					<div class="flex-row">
 						<select class="search_date">  
 							${l.join("")}
 						</select>  
 						<button type="button" class="button btnfind">Tìm</button>
 					</div>
 					<div class="table-responsive">
					 					 	<table class="table">
					                                <thead>
					                                    <th>#</th>
					                                    <th>Tình trạng</th>
					                                    <th>Ngày</th>
					                                    <th>Thời gian vào</th>
					                                    <th>Thời gian kết thúc</th> 
					                                    <th>Giá tiền*giờ</th> 
					                                    <th>Thành tiền</th> 
					                                 </thead>
					                                <tbody>
					                      </tbody>
					                        </table>
					 					 </div>
	               </div>`,
	               callback:function(evt){
	                  
	                    evt.tab.find(".btnfind").on("click",function(){
	                        var val = evt.tab.find(".search_date").val();
	                        if(val){
	                        	evt.tab.find(".table tbody").html("");
	                        	wpajax("wc_hr_finger_history_month",{date:val},function(res){
	                        		//each outlet
	                        		var total_sale = 0;
	                        		var total_bonus = 0;
	                        		evt.tab.find(".table tbody").html(res.data.map(function(n,x){
	                                	// var m = (n.order_total*v.bonus_rate);
	                                	// total_sale+=parse_money(n.order_total)*1;
	                                	// total_bonus+=parse_money(m)*1;
	                                	var checkout = JSON.parse(n.checkout);
	                                	return `<tr>
			                                <td>${x+1}</td>
			                                <td>${n.status=='pending'?"Đang xử lý":"Ghi nhận"}</td>
			                                <td>${n.date}</td>
			                                <td>${n.checkin}</td>
			                                <td data-checkout='${n.checkout}'>${checkout.pop()}</td> 
			                                <td>${show_money_none(n.hour)}*${show_money_none(n.rate)}</td>  
			                                <td>${show_money_none(n.money)}</td>  
			                            </tr>`;
	                                }).join(""));
	                        		// evt.tab.find(".total_sale").html(show_money_none(total_sale));
	                        		// evt.tab.find(".total_bonus").html(show_money_none(total_bonus)); 
	                        	});



	                        }
	                    });

	                    //xu ly lai
	                   	evt.tab.find(".btnreload").on("click",function(){
	                   			wpajax("wc_hr_finger_scan",{},function(res){
	                        	 alert(res.message);
	                        });
	                   	});

	                      evt.tab.find(".btnfind").trigger("click");

	                     //scan
 						evt.tab.find(".qrscan").on("click",function(){
 							if(window.MyScan){
 								window.MyScan(function(code){
 									if(code){
 										alert(code);
 										try{
 											code = JSON.parse(code)
 										}catch(e){}
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
 									}
 								});
 							}
 						});
	                      
	               },
	               onActive : function(evt){
	                   var evt = this; 
	                    // var input = evt.tab.find(`.mainaction [value='${printer.action}']`);
	                    // input.closest('li').trigger('click');
	               }
	           }); 
	        }
	    });
 	}
});