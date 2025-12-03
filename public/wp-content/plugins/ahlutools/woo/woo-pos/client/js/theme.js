$(document).on("Config",function(e,config) {

	if(window.innerWidth<1015){
            $(".moreaction").append(`<a class="settingtheme tieude tips button ladda-button tiped" style="cursor: pointer;"><i class="fa fa-cog" aria-hidden="true"></i> Cài đặt<span></span></a>`);
        }
 		 //setup print setting
	       var tabs = ModalTabs({
	         id:"modaltheme",
	         init :  function(e){
	            //append to menu header POS Client
	           $("#pos_user_badge .menu_bar").prepend(`<div class="settingtheme tieude" style="cursor: pointer;"><i class="fa fa-cog" aria-hidden="true"></i> Cài đặt <span></span></div>`)
	           $(document).on("click",".settingtheme",function(evt){
	           		evt.preventDefault();
	               e.modal.addClass("md-show");
	           });
	         
	           e.addTab({
	            name:'Giao diện',
	            html:`<div class="woocommerce-checkout printsettingblock" style="overflow: auto;" >
	                <style>
	                
	                </style>
	                <h1><span class="txt">Mẫu giao diện</span></h1>
 
		              <div class="chon_them_ra">
		                 <!-- <label>
		                  <input type="radio" value="color_md" data-theme="color_system" name="dl_theme" checked>
		                  <span class="design md"></span>
		                  <span class="text">Mặc Định</span>
		                </label> -->

		                <label>
		                  <input type="radio" value="color_cam" data-theme="color_cam" name="dl_theme" checked="">
		                  <span class="design cam"></span>
		                  <span class="text mau_cam">Màu Cam</span>
		                </label>

		                <label>
		                  <input type="radio" value="color_xanh" name="dl_theme">
		                  <span class="design xanh"></span>
		                  <span class="text mau_xanh">Màu Xanh</span>
		                </label>

		                <label>
		                  <input type="radio" value="color_xam" name="dl_theme">
		                  <span class="design xam"></span>
		                  <span class="text mau_xam">Màu Xám</span>
		                </label>

		                 <label>
		                  <input type="radio" value="color_do" name="dl_theme">
		                  <span class="design do"></span>
		                  <span class="text mau_do">Màu Đỏ</span>
		                </label>
		                <label>
		                  <input type="radio" value="color_cafe" name="dl_theme">
		                  <span class="design cafe"></span>
		                  <span class="text mau_do">Cafe</span>
		                </label>
		              </div>
		              <!--  -->
		              <div class="thoigian_in">
		                <div class="title">
		                  Thời gian In
		              </div>
		              <div>
		                <label for="asyn_timer">Thời gian đồng bộ in ấn(thời gian)</label>
		                <input type="text" id="asyn_timer" value="10" min="10" max="1000" placeholder="">
		              </div>
		              </div>
		          
		              <!--  -->
		              <div class="sound_time">
		                  <div class="title">
		                  Âm thanh
		              </div>
		                <div class="detail_sound">
		                <form method="post" name="quangcao" class="quangcaonew" id="quangcaoform" target="create_ads" enctype="multipart/form-data" action="">
		                  <label for="sound_coming">Âm thanh khi có đơn hàng mới</label>
		                 <input type="file" id="sound_coming" name="sound_coming">
		                 <button>Tải lên</button>
		                 <div class="video_ads_show hide">
		                  <p>Review in https://fpt.ai/tts</p>
		                  <audio src="" controls="" playsinline=""></audio>
		                 </div>
		                </form>
		                <iframe src="" name="create_ads" class="create_ads"></iframe>
		                <script>
		                  setTimeout(function(){
		                    jQuery(document).ready(function($){
		                       $(".file_video").on("change",function(){
		                        var fileUrl =   URL.createObjectURL(this.files[0]);
		                         $(".video_ads_show").removeClass("hide").find("audo").attr("src", fileUrl);
		                      });
		                    });
		                  },3000);
		                </script>
		              </div>
		              </div>
		          
	               </div>`,
	               callback:function(evt){
	                    var theme= window.AhluPos.settings.data_theme;
				        if(theme){
				            $("body").attr("data-theme",theme); 
				            $(".chon_them_ra input[value='"+theme+"']").attr("checked","checked");
				        }

				        evt.tab.find("[name=dl_theme]").on("click",function(){
	                   		$("#themstyle").remove();
	                   		$("body").append(`<link media="all" type="text/css" href="/wp-content/plugins/ahlutools/woo/woo-pos/theme/${this.value}.css" id="themstyle" rel="stylesheet">`);
	                   	});

	                     
	               },
	               onActive : function(evt){
	                   
	                    // var input = evt.tab.find(`.mainaction [value='${printer.action}']`);
	                    // input.closest('li').trigger('click');
	               }
	           }); 
	           
	        }
	    });
 	
	 
        // $(".wc_pos_register_pay").clone().html("In")
        // .removeClass("wc_pos_register_pay").addClass("wc_pos_register_pay_fast").css("width","calc(25% - 60px) !important")
        // .insertAfter($(".wc_pos_register_pay").css("width","auto"));
        // $(".wc_pos_register_pay_fast").on("click",function(){
        //     openConfirm({
        //         content: '<h3>Bạn có muốn thanh toán '+$('.tab-tabs .tab.active span').eq(0).text()+'?</h3><strong>NOTE:</strong> Sau khi xoá bàn dữ liệu không thể hồi phục lại đươc.',
        //         confirm: function(){
        //             $('#payment_method_cod').attr("checked","checked");
        //             $(".go_payment").trigger("click");
        //         },
        //         cancel: function(){
                   
        //         },
        //         notSign: true
        //     });
            
        // });
        //choose theme
        

        // choose timer
        // if(window.localStorage && window.localStorage["asyn_timer"]){
        //     $("#asyn_timer").val(window.localStorage["asyn_timer"]);
        //     window.AhluPos.remotePrint.timer = window.localStorage["asyn_timer"];
        // }
        // $(document).on("change","#asyn_timer",function(){
        //     if(window.localStorage && window.localStorage["asyn_timer"]){
        //         window.localStorage["asyn_timer"] = this.value;
        //     }
        //     //
        //     window.AhluPos.remotePrint.timer = this.value;
        //     window.AhluPos.remotePrint.update();
        // });
        // window.AhluPos.init();
        

        //try to catch product
        // setTimeout(function(){

        // },10*1000);
        // 
        // 
});