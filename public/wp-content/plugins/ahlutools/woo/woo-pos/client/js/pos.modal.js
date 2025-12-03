var date_str = new Date().toJSON().split("T")[0];
(function(win){
    var storage = win.localStorage;
    var cached = null;
    try{
        cached =JSON.parse(storage.getItem("__localhost"));
    }catch(ee){}
    if(!cached){
        cached={};
    }
    win.localhost = win.localhost||{
        sendmail:function(data){
            wpajax("sendmail",data||{},function(r){});
            return this;
        },
        save : function(){
            storage.setItem("__localhost",JSON.stringify(cached));
            return this;
        },
       cache : function(k){
            return cached[k]||cached;  
       },
    server : {
        fetch : function(data){
            wpajax("wc_ping",data||{},function(r){
                cached.wc_ping = r;
            });
            
            wpajax("wp_ping",data||{},function(r){
                cached.wp_ping = r;
            });
            return this;
        },
        cache : function(k,name,data,f){
            return wpajax(name,data,function(r){
                cached[k] = r;
                if(f)f(r);
            });
            return this;
        },
        ping : function(){
            wpajax("wc_ping",pos_register_data||{},function(r){
                 cached.wc_ping = r;
            });
            $(document).trigger("Ping");
            return this;
        }, 
        ping_report : function(){
            wpajax("wc_ping_report",pos_register_data||{},function(r){
                 cached.wc_ping_report = r;
            });
            return this;
        },
        ping_html : function(){
            var cookies = win.localhost.listCookies();
            var ky = `pos${pos_register_data.outlet}_${pos_register_data.ID}`;
            if(!cookies["pos_station"]){ 
                setcookie("pos_station",ky); 
            }
            
             $.ajax({
                url: document.location.href,
                async: true,  
                data: {},
                type:"GET",
                success: function (html) {
                    // console.log(html);
                    wpajax("cachehtml",{save:1,name:ky,html:html},function(e){ 
                        
                    });
                },
                error: function(a,b,c){
                    this.success(a.responseText);
                }
              }); 
        }
    },
    init : function($){
        var authCode =null;

        wpajax("wc_pos_init",{},function(r){
            if(r){
                console.log("config",r);
                wpajax.config = r;
                win.AhluPos.config = r;
                authCode = r.key;
                //
                for(var i in r.html){
                    $("#"+i).html(r.html[i]);
                }
                
                //
                win.localhost.order.get();

                $(document).trigger('Config',[r]);
            }
         });
         $(document).on("Order_complete",function(e,order){
             console.log(order);
             if(wpajax.config){
                 win.localhost.order.save(order);
                 win.localhost.server.ping_report();
             }
         });

       
         $.ajaxSetup({
          async: true, 
          beforeSend:function(xhr,options){
             
              var auth =$('[name="auth-token"]').attr("content");
              if(authCode){
                xhr.setRequestHeader( 'Authorization','Basic '+authCode);
              } 
               
          }
        });
       

        
        this.server.ping_html();
       
           
      
        return this;
    },
    listCookies:function (filter) {
        var data ={};
        var cookies = document.cookie.split(/;/);
        for (var i = 0, len = cookies.length; i < len; i++) {
           var cookie = cookies[i].split(/=/);
        //   console.log("key: " + cookie[0] + ", value: " + cookie[1]);
           data[trim(cookie[0])] = trim(cookie[1]);
           
           if(filter){filter(cookie[0],cookie[1]);}
        }
        return data;
    },
    order : {
        modal : function(){
            var modal = jQuery("#modal-ordertoday");
            if(modal.length==0){
                
                var me = this;
                var tabs = ModalTabs({
                     id:"modal-ordertoday",
                     init :  function(e){
                        //append to menu header POS Client
                      // $("#pos_user_badge .menu_bar").prepend(`<div class="settingprinter tieude" style="cursor: pointer;"><i class="fa fa-print"></i> Máy in <span></span></div>`)
                       // $(document).on("click",".settingprinter",function(){
                       //     e.modal.addClass("md-show");
                       // });
                        
                       e.addTab({
                        name:'Hôm nay',
                        html:`<div class="flex-col">
                     <h1><span class="txt"> Danh thu (<span class="total">0</span> </span>)</h1>
                    <div class="media-frame-wrap scroll">
                        <div class="payment_box payment_method_bacs">
                            <table class="table">
                                <thead>
                                    <th>#</th>
                                    <th>Tiền</th>
                                    <th>Ngày</th>
                                    <th>Thanh toán</th>
                                    <th>Vị trí</th> 
                                    <th>Vận Chuyển</th> 
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    </div>`,
                    onAcive:function(e){
                        var evt = this;
                        //list  
                        var total = 0;
                        evt.tab.find(".table tbody").html(me.today().reverse().map(function(v){
                            total+= v.total*1;
                            var meta = {};
                            for(var i in v.meta_data){
                                meta[v.meta_data[i].key] = v.meta_data[i].value;
                            }

                            var shipper = `<a class="button shipaccess" data-id="${v.id}">Cài đặt</a>`;

                            if(meta.shipper){
                                shipper=`
                                <div>Đơn vị vận chuyển: ${meta.shipper.name}</div>
                                <div>Mã Vận chuyển: ${meta.shipper.id}</div>
                                <div>Tổng tiền: ${meta.shipper.total}</div>
                                <div>Theo dõi: <a href="${meta.shipper.map}" target="_blank"> trên google</a></div>
                                `;
                            }


                            return `<tr>
                                <td><a href="/wp-admin/post.php?post=${v.id}&action=edit" target="_blank">${v.id}</a></td>
                                <td>${show_money_none(v.total)}</td>
                                <td>${v.date_paid.split("T").join(" ")}</td>
                                <td>${v.payment_method_title}</td> 
                                <td>${meta.order_tab=="main"?"Mang đi": meta.order_tab}</td> 
                                <td>${shipper}</td> 
                                <td><a href="${v.print_url}" onclick="posPrintReceipt('${v.print_url}');return false;">In bill</a></td>
                            </tr>`;
                        }));
                        evt.tab.find(".total").html(show_money_none(total));

                    },
                    callback: function(evt){
                            
                        //ask for shipping
                        evt.tab.on("click",".shipaccess",function(e){
                            e.preventDefault();
                            var div = $(this).closest("td");
                            var order_id = $(this).attr("data-id");

                            var sheetchooser= openSheet({
                                data:`
                                <form class="boxchooser "><p>Thông tin vận chuyển</p>
                                    <div class="flex">
                                        <select name="shipper[name]" class="form-control">
                                            <option value="grab">Grab</span>
                                            <option value="bee">Bee</span>
                                            <option value="ahamove">Ahamove</span>
                                            <option value="shoppee">Express</span> 
                                        </select>
                                        <div class="flex-row">
                                            <div class="form-group">
                                                 <label for="xxx">Mã đơn hàng</label>
                                                 <input type="text" id="xxx" name="shipper[barcode]" class="form-control required" value="" /> 
                                            </div>
                                            <div class="form-group">
                                                 <label for="xxx">Thành tiền</label>
                                                 <input type="text" id="xxx" name="shipper[total]" class="form-control required" value="" /> 
                                            </div>
                                        </div>
                                        <hr/>
                                        <div class="flex-row">
                                            <div class="form-group">
                                                 <label for="xxx">Tên khách hàng</label>
                                                 <input type="text" id="xxx" name="customer[fullname]" class="form-control required" value="" /> 
                                            </div>
                                            <div class="form-group">
                                                 <label for="xxx">SĐT</label>
                                                 <input type="text" id="xxx" name="fullname[phone]" class="form-control required" value="" /> 
                                            </div>
                                            
                                        </div>
                                        <div class="country">
                                                  
                                            </div>
                                    </div>
                                    <div><button class="btnconfirm button">Xác nhận</button></div>
                                </form>
                                `,
                                beforeOpen:function(sheetId){
                                    var element = $("#"+sheetId);
                                    window.AShip.country(element.find(".country"),{

                                      type:"address",

                                      init : function(){



                                      }, 

                                    });
                                    // console.log(element);
                                     element.find("form").validate({
                                        submitHandler : function(form){
                                             var data  = $(form).serializeObject();
                                            data.order_id = order_id;
                                             
                                            wpajax("wc_pos_update_ship_order",data,function(r){
                                                console.log(r);
                                                if(r){
                                                    //update local & ui
                                                    div.html(`
                                                    <div>Đơn vị vận chuyển: ${data.shipper.name}</div>
                                                    <div>Mã Vận chuyển: ${data.shipper.barcode}</div>
                                                    <div>Tổng tiền: ${data.shipper.total}</div>
                                                    <div>Theo dõi: <a href="${data.shipper.map}" target="_blank"> trên google</a></div>
                                                    `);
                                                    me.today().map(function(v){
                                                        if(v.id==order_id){
                                                            v.meta_data['shipper'] = {
                                                                key:'_shipper',
                                                                value : data,
                                                                id:1000
                                                            };
                                                        }
                                                    });
                                                    me.save();
                                                }
                                             }); 
                                             sheetchooser.close();
                                        }
                                     });
 
                                }
                            });
                        });

                    }
                   });   
                       e.addTab({
                        name:'Tìm kiếm',
                        html:`<div class="flex-col">
                     <div>
                        <h1><span class="txt"> Danh thu (<span class="total">0</span>)</h1>
                         <div>
                            <input type="date" class="search" placeholder="Tìm kiếm" />
                         </div>
                     </div>
                    <div class="media-frame-wrap scroll">
                        <div class="payment_box payment_method_bacs">
                            <table class="table">
                                <thead>
                                   <th>#</th>
                                    <th>Tiền</th>
                                    <th>Ngày</th>
                                    <th>Thanh toán</th>
                                    <th>Vị trí</th> 
                                    <th>Vận Chuyển</th> 
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    </div>`,
                    onAcive:function(e){
                        this.tab.find(".search").trigger('change');
                    },
                    callback:function(evt){
                             evt.tab.on("change",".search",function(){
                                evt.tab.find(".table tbody").html("");
                                //load
                                me.date({
                                    data:{date:this.value},
                                    callback : function(r){
                                        var total = 0;
                                         
                                        evt.tab.find(".table tbody").html(r.reverse().map(function(v){
                                            total+= v.order_total*1;
 
                                            return `<tr>
                                                <td><a href="/wp-admin/post.php?post=${v.order_id}&action=edit" target="_blank">${v.order_number}</a></td>
                                                <td>${show_money_none(v.order_total)}</td>
                                                <td>${v.order_date.split("T").join(" ")}</td>
                                                <td>${v.payment_method_title}</td> 
                                                <td>${v.order_tab=="main"?"Mang đi":v.order_tab}</td> 
                                                <td></td>
                                                <td><a href="${v.print_url}" onclick="posPrintReceipt('${v.print_url}');return false;">In bill</a></td>

                                            </tr>`;
                                        }));

                                        evt.tab.find(".total").html(show_money_none(total));
                                    }
                                });

                            });

                             //ask for shipping
                            evt.tab.on("click",".shipaccess",function(e){
                                e.preventDefault();
                                var div = $(this).closest("td");
                                var order_id = $(this).attr("data-id");
                                var sheetchooser= openSheet({
                                    data:`
                                    <form class="boxchooser "><p>Thông tin vận chuyển</p>
                                        <div class="flex">
                                            <select name="shipper[name]" class="form-control">
                                                <option value="grab">Grab</span>
                                                <option value="bee">Bee</span>
                                                <option value="ahamove">Ahamove</span>
                                                <option value="shoppee">Express</span> 
                                            </select>
                                            <div class="flex-row">
                                                <div class="form-group">
                                                     <label for="xxx">Mã đơn hàng</label>
                                                     <input type="text" id="xxx" name="shipper[id]" class="form-control required" value="" /> 
                                                </div>
                                                <div class="form-group">
                                                     <label for="xxx">Thành tiền</label>
                                                     <input type="text" id="xxx" name="shipper[total]" class="form-control required" value="" /> 
                                                </div>
                                            </div>
                                            <hr/>
                                            <div class="flex-row">
                                                <div class="form-group">
                                                     <label for="xxx">Tên khách hàng</label>
                                                     <input type="text" id="xxx" name="shipper[customer_name]" class="form-control required" value="" /> 
                                                </div>
                                                <div class="form-group">
                                                     <label for="xxx">SĐT</label>
                                                     <input type="text" id="xxx" name="shipper[customer_phone]" class="form-control required" value="" /> 
                                                </div>
                                            </div>
                                        </div>
                                        <div><button class="btnconfirm button">Xác nhận</button></div>
                                    </form>
                                    `,
                                    beforeOpen:function(sheetId){
                                        var element = $("#"+sheetId);
                                        // console.log(element);
                                         element.find("form").validate({
                                            submitHandler : function(form){
                                                 var data  = $(form).serializeObject();
                                                data.order_id = order_id;
                                                wpajax("wc_pos_update_ship_order",data,function(r){
                                                    if(r){
                                                        //update local & ui
                                                        div.html(`
                                                        <div>Đơn vị vận chuyển: ${data.shipper.name}</div>
                                                        <div>Mã Vận chuyển: ${data.shipper.barcode}</div>
                                                        <div>Tổng tiền: ${data.shipper.total}</div>
                                                        <div>Theo dõi: <a href="${data.shipper.map}" target="_blank"> trên google</a></div>
                                                        `);
                                                    }
                                                 }); 
                                                 sheetchooser.close();
                                            }
                                         });
     
                                    }
                                });
                            });
                       }
                    });

                     
                       e.addTab({
                            name:'Đơn hàng online',
                            html:`<div class="flex-col">
                         <div>
                            <h1><span class="txt"> Đơn hàng online (<span class="total">0</span>)</h1>
                             <div>
                               Đơn hàng từ dịch vụ bên thứ 3 cần được xử lý, ví dụ: Từ App, wwebsite,...
                             </div>
                         </div>
                        <div class="media-frame-wrap scroll">
                            <div class="payment_box payment_method_bacs">
                                <table class="table">
                                    <thead>
                                       <th>#</th>
                                        <th>Tiền</th>
                                        <th>Ngày</th>
                                        <th>Thanh toán</th>
                                        <th>Vị trí</th> 
                                        <th>Vận Chuyển</th> 
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        </div>`,
                        callback: function(evt){
                                 evt.tab.on("change",".search",function(){
                                    evt.tab.find(".table tbody").html("");
                                    //load
                                    me.date({
                                        data:{date:this.value},
                                        callback : function(r){
                                            var total = 0;
                                             
                                            evt.tab.find(".table tbody").html(r.reverse().map(function(v){
                                                total+= v.order_total*1;

                                                var print_url = '/wp-admin/admin.php?print_pos_receipt=true&oder_id='+v.order_id+'&_wpnonce='+wpajax.config._wpnonce;

                                                return `<tr>
                                                    <td><a href="/wp-admin/post.php?post=${v.order_id}&action=edit" target="_blank">${v.order_number}</a></td>
                                                    <td>${show_money_none(v.order_total)}</td>
                                                    <td>${v.order_date.split("T").join(" ")}</td>
                                                    <td>${v.payment_method_title}</td> 
                                                    <td>${v.order_tab=="main"?"Mang đi":v.order_tab}</td> 
                                                    <td></td> 
                                                    <td><a href="${print_url}" onclick="posPrintReceipt('${print_url}');return false;">In bill</a></td>

                                                </tr>`;
                                            }));

                                            evt.tab.find(".total").html(show_money_none(total));
                                        }
                                    });

                                });
                           },
                           onAcive:function(e){
                              //ask new online
                           }
                        });
                   }
                }); 
            }
            
            
            $("#modal-ordertoday").addClass("md-show");



        },
        get : function(){
            this.data = storage.getItem("_"+wpajax.config.session);
             try{
                  this.data= JSON.parse(this.data);
              }catch(e){
                  
              } 
             if(!this.data){
                 this.data={};
                this.data[date_str]  =[];
             }
             return this.data;
        },
        today : function(){
            return this.data[date_str]||[];
        },
        date : function(options){
            wpajax("wc_pos_staff_order_date",options.data,function(r){
                if(r){
                     options.callback(r);
                }
             });
        },
        yesterday : function(){


            var date = new Date();
            date.setDate(date.getDate() - 1);
            return this.data[date_str]||[];
        },
        save : function(a){ 
            if(a){
                if(!this.data[date_str]){
                    this.data[date_str] =[];
                }
                this.data[date_str].push(a);
            }
            
            storage.setItem("_"+wpajax.config.session,JSON.stringify(this.data));
            return this;
        }
    }
};
})(window);