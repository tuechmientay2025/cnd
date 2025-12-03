
(function(win){
    var storage = win.localStorage;
    window.wpajax = function(ac,data,f) {
   data = data||{};
    if(pos_register_data){
        data.ID = pos_register_data.ID;
        data.outlet = pos_register_data.outlet;
    }
  
  if(f){
      return $.ajax({
        url: "/wp-admin/admin-ajax.php?action="+ac,
        async: true,  
        type:"POST",
        data: data,
        success: function (json) {
          try{
              json= JSON.parse(json);
          }catch(e){
              
          }
          f(json); 
        },
        error: function(a,b,c){
            this.success(a.responseText);
        }
      }); 
  }
  return new Promise(function(ok,no){
      $.ajax({
        url: "/wp-admin/admin-ajax.php?action="+ac,
        async: true,  
        data: data,
        type:"POST",
        success: function (json) {
          try{
              json= JSON.parse(json);
          }catch(e){
              
          } 
          ok(json);
        },
        error: function(a,b,c){
            this.success(a.responseText);
        }
      }); 
  });
  
};
window.wppost = function(url,data,f) {
    data = data||{};
    if(pos_register_data){
        data.ID = pos_register_data.ID;
        data.outlet = pos_register_data.outlet;
    }
 
  if(f){
      $.ajax({
        url: url,
        async: true,  
        type:"POST",
        data: data,
        success: function (json) {
          try{
              json= JSON.parse(json);
          }catch(e){
              
          }
          f(json); 
        },
        error: function(a,b,c){
            this.success(a.responseText);
        }
      });
      return;
  }
  return new Promise(function(ok,no){
      $.ajax({
        url: url,
        async: true,  
        data: data,
        type:"POST",
        success: function (json) {
          try{
              json= JSON.parse(json);
          }catch(e){
              
          } 
          ok(json);
        },
        error: function(a,b,c){
            this.success(a.responseText);
        }
      }); 
  });
  
}
	win.AhluPos = $.extend(win.AhluPos||{},{
        settings:(function(){
            var data = storage.getItem('_ahlupos');
            var data = data?JSON.parse(data):{
                printer :{
                    ip:""

                }
            };

            data.save = function(){
                storage.getItem('_ahlupos',JSON.stringify(this));
            }

            return data;
        })(),
        status: function (ok) {
            var room = getURLParameters("room");
            var r = getURLParameters("r");
            jQuery.ajax({
                async: true,
                type: 'post',
                url: 'https://azpos.ahlupos.com/api/outlet/status/' + (ok ? 1 : 0),
                data: {
                    id: room,
                    r :r
                },
                success: function (res) {
                }
            });
        },
        remotePrint : (function(){
            
            
            $(document).on("change",'.modalprinter input,.modalprinter textarea,.modalprinter select',function(){
                var printer = win.AhluPos.settings.printer; 
                if(this.type=='checkbox'){
                    if(this.checked){
                        printer[this.name] = this.value;
                    }else{
                        printer[this.name] = null;
                    }
                    
                }else{
                    printer[this.name] = this.value;
                }
                win.AhluPos.settings.save();
            });


                
            $(document).on("Config",function (e,config) {
                var printer = win.AhluPos.settings.printer; 
                 
                    //setup print setting
                   var tabs = ModalTabs({
                     id:"modalprinter",
                     init :  function(e){
                        //append to menu header POS Client
                       $("#pos_user_badge .menu_bar").prepend(`<div class="settingprinter tieude" style="cursor: pointer;"><i class="fa fa-print"></i> Máy in <span></span></div>`)
                       $(document).on("click",".settingprinter",function(){
                           e.modal.addClass("md-show");
                       });
                     
                       e.addTab({
                        name:'Máy in',
                        html:`<form class="woocommerce-checkout printsettingblock" method="post" onsubmit="return false;">
                            <style>
                            .printsettingblock{}
                            .printsettingblock .mainaction{}
                            .printsettingblock .mainaction ul{
                                    display: flex;
    justify-content: space-between;
    padding: 0;
                            }
                            .printsettingblock .mainaction li{
                                border-radius: 8px;
    border: 1px solid #ddd;
    margin-top: 16px;
    align-items: center;
    padding: 8px; 
    width: 31%;
    justify-content: center;
    flex-direction: column;
                            }
                            .printsettingblock .mainaction li.active{
                                 background-color: #f3f3f3;
                            }
                            </style>
                            <h1><span class="txt">Cài máy in mạng Wifi/Lan/USB </span></h1>

                                <div class="row">
                                    <div class="col-md-6">
                                    <div style="    text-align: center;
    border-radius: 8px;
    border: 1px solid #ddd;
    margin-top: 16px;">
                                        <p>Thông tin</p>

                                            <p>Cửa hàng: ${pos_register_data.name}</p> 
                                        </div>
                                    </div>
                                    <div class="col-md-6" style="">
                                        <div class="media-frame-wrap">
                                            <label for="printer_ip">Địa chỉ máy In</label>
                                             <input type="text" class="ip" name="printer_ip" readonly placeholder="127.0.0.1" value="${printer.ip||""}" />
                                        </div>
                                    </div>
                                </div>
                                    
                                    <p>Lựa chọn các tính năng:</p>
                                    <ul class="mainaction">
                                        <li class="lr" data-id="default">
                                            <div>
                                                Mặc định <br/>
                                                <img src="https://cdn-icons-png.flaticon.com/128/1497/1497542.png" width=24 height=24 />
                                            </div>
                                            <div  class="flex"> 
                                                <p>Bật tính năng này nếu bạn muốn hoạt động như máy trạm thông thường là chỉ in bill</p>
                                                <input class='hide' type="radio" name="action"  ${printer.action=="default"?'checked':''} value="default" />
                                            </div>
                                        </li>
                                        <li class="lr " data-id="sendto">
                                            <div >
                                                Gởi đến máy in bill<br/>
                                                <img src="https://cdn-icons-png.flaticon.com/128/1183/1183626.png" width=24 height=24 />
                                            </div>
                                            <div class="flex">
                                                <div>
                                                    <input class="hide" type="radio" name="action" ${printer.action=="send_to_printer"?'checked':''} value="send_to_printer" />
                                                </div>
                                                <p>Bật tính năng này nếu bạn muốn:</p>
                                                <p>Không cho phép in tại thiết bị này. </p>
                                                <p>Gởi bản in cho máy chủ trong cửa hàng ${pos_register_data.name}.</p> 
                                            </div>
                                        </li>
                                        <li class="lr " data-id="sendto">
                                            <div>
                                               Làm host in Bill <br/>
                                               <img src="https://cdn-icons-png.flaticon.com/128/2291/2291786.png" width=24 height=24 />
                                            </div>
                                            <div  class="flex">
                                                <div>
                                                    <input class="hide" type="radio" name="action"  ${printer.action=="is_host"?'checked':''} value="is_host" />
                                                </div>
                                                <p>Bật tính năng này nếu bạn muốn:</p>
                                                <p>In tại thiết bị này.</p>  
                                                <p>Làm điểm Server tiếp các lệnh in bill từ xa từ các thiết bị trong cửa hàng ${pos_register_data.name} thông qua các thiết bị di động, laptop,... (chú ý: Tốt nhất chỉ có một điểm bán hàng trong một cửa hàng làm máy chủ.)</p> 
                                            </div>
                                        </li>
                                    </ul>
                                     
                                    <div class="media-frame-wrap">
                                        <p>Mỗi lần In bao nhiêu bản</p>
                                        <input type="tel" name="copy" value="${printer.copy||"1"}" />
                                    </div>

                           </form>`,
                           callback:function(evt){
                               var printer = win.AhluPos.settings.printer; 
                                evt.tab.find(".mainaction li").on("click",function(){
                                    var ele = $(this).addClass('active');
                                    ele.siblings().removeClass('active');
                                    var input = ele.find('[name="action"]')[0];
                                    input.checked=true;
                                    input.click(); 
                                    
                                    printer[input.name] = input.value;
                                    win.AhluPos.settings.save();
                                });

                                var input = evt.tab.find(`.mainaction [value='${printer.action}']`);
                                input.closest('li').addClass('active');
                           },
                           onActive : function(evt){
                               
                                var input = evt.tab.find(`.mainaction [value='${printer.action}']`);
                                input.closest('li').trigger('click');
                           }
                       }); 
                       e.addTab({
                        name:'Máy in từ xa',
                        html:`<form class="woocommerce-checkout" method="post" onsubmit="return false;">
                          <h1><span class="txt"> Server remote</span></h1>
                                <div class="media-frame-wrap">
                                    <div>
                                        <p>Danh sách máy chủ</p>
                                        <p>Khi bạn chọn tính năng này đồng nghĩa tính năng Máy in nội bộ sẽ không hoạt động.</p>
                                    </div>
                                    <div class="list"></div>
                                </div>
                       </form>`,
                        callback:function(evt){

                       }});


                  
               }
            });
        });
           
           return function(ac){

                this.open = function(){
                     $("#modalprinter").addClass("md-show");
                };
                this.tabs = tabs;
                var abc = $("#modalprinter  [value='send_to_printer']");
                abc=abc[0];
                var printer = win.AhluPos.settings.printer; 
               //check if this is mobile
               if(window.ADevice || window.innerHTML<1024){
                  //auto active sendt to server 
                  if(!abc.checked){
                    abc.click();
                  }  
                  printer.action='send_to_printer';
               }else{
                  if(abc.checked){
                    abc.click();
                  } 
               }

               //now try to call to server to refresh
               if(window.socket){
                    var data = $.extend({shop_id:"",id_outlet:""},pos_register_data,true);
                     window.socket.emit("printerremote",data,function(list){
                        modal.find(".list").html(list.map(function(v){
                            return `<div class="item" data-id="${v.id}">${v.name}</div>`;
                        }));
                     });
                     modal.off("click",".item").on("click",".item",function(){

                     });
               } 
           };
        })(),
        remotePrintLocal : function(){
           
            
            var id_= null;
            var runner_timer = function(){
                id_ = setInterval(runner,methods.timer*1000);
            };

            var methods = {
                timer : 30,
                update : function(){
                    if(id_)clearInterval(id_);
                    id_=null;
                    runner_timer();
                }
            };

            var r = getURLParameters("r");
            var delete_file = function(name){
                jQuery.ajax({
                    async: true,
                    type: 'post',
                    url: document.location.origin+'/wp-admin/admin-ajax.php?print'+(r?"&r="+r:""),
                    // url: 'https://hcm.ahlupos.com/azpay/print.php'+(r?"&r="+r:""),
                    data: {
                        action:"remote_print_delete",
                        name:name
                    },
                    success: function (res) {
                        
                    }
                });
            }

            var stores = {};
            var sound =null;

            // $("#asyn_timer").val()
            var runner = function(){
                if(!sound){
                    //https://fpt.ai/vi/tts-vi#
                    sound = document.getElementById("tts-audio");
                }
                jQuery.ajax({
                    async: true,
                    type: 'post',
                    url: document.location.origin+'/wp-admin/admin-ajax.php?print'+(r?"&r="+r:""),
                    // url: 'https://hcm.ahlupos.com/azpay/print.php'+(r?"&r="+r:""),
                    data: {
                        action:"remote_print"
                    },
                    success: function (res) {
                        try{
                            res = JSON.parse(res);
                        }catch(ex){}
                        if(typeof res==="object"){
                             
                            if(stores[res.name]===undefined){

                                
                                // ion.sound.play("succesful_order");
                                stores[res.name] = 1;
                                delete_file(res.name);
                                if(res.type=="html"){
                                    //now print and delete
                                    window.printJS(res.data,function(){
                                        if(sound)sound.play();
                                        setTimeout(function(){
                                            if(sound)sound.play();
                                        },2*1000);
                                    });
                                }
                            }else{
                                //now delete
                                delete_file(res.name);
                            }
                            //repeat
                            // runner_timer();
                        }
                    },
                    error:function(a,b,c){
                        this.success(a.responseText);
                    }
                });
            };

            
            runner_timer();
            return methods;
        }
    },true);
})(window);