$(document).on("Config",function (e,config) {
      
 
    //append
    var gateway =config.gateway.map(function(v){

        if(!["basc","cod"].includes(v.id)){
        
        $("#modal-order_payment .media-frame-menu .media-menu").append(`<a href="#${v.id}" class="payment_methods payment_method_${v.id}" data-bind="${v.id}">
                        <input id="payment_method_${v.id}" type="radio" class="select_payment_method" name="payment_method" value="${v.id}" style="display: none;">
                        ${v.title}                    </a>`);

        $("#modal-order_payment .woocommerce-checkout ").append(`<div id="${v.id}" class="popup_section full-height" style="display: none;">

                            <div class="media-frame-wrap">
                                <div class="payment_box payment_method_${v.id}">
                                    <p>${v.description}</p>

                                </div>
                                </div>
                            </div>  `);
        }
    });


    $("#modal-order_payment .media-frame-menu .media-menu").on("click","a",function(e){
        e.preventDefault();
        var id = $(this).attr("href");
        console.log(id);
        $(this).addClass("active").siblings().removeClass("active");
        $(this).find(".select_payment_method")[0].cheched = true;

        $("#modal-order_payment  .payment_method").val(id.replace("#",""));

        $("#modal-order_payment .woocommerce-checkout .popup_section").hide();
        $("#modal-order_payment .woocommerce-checkout "+id).show();

        $("#modal-order_payment .woocommerce-checkout h1 .txt").html($(this).text());
      

    });

    $(document).on("onBeforeOrder",function(e,cart){
      //check payment method
      var id=  $("#modal-order_payment  .payment_method").val();
      if(id){ 
          var gateway = wpajax.config.gateway.filter(function(v){
                return v.id==id;
            });
            if(gateway&&gateway.length){
                gateway = gateway[0];
                cart.payment_method = gateway.id;
                cart.payment_method_title = gateway.title;
            }
        }
       
    });

    $(document).on("Order_complete",function(e,order){
       window.lastOrder = order;  
    });

    $(document).on('PrintReceipt',function(e,newHTML){
      
      var order = window.lastOrder;
      console.log(newHTML,order);

      if(order){

        var gateway = wpajax.config.gateway.filter(function(v){
            return v.id==order.payment_method;
        });
        if(gateway&&gateway.length){
            gateway = gateway[0];
            
        }
         switch(order.payment_method){
            case "bacs":
                console.log(gateway);
                var account = gateway.account_details[0];
                var url = `https://img.vietqr.io/image/${account.sort_code}-${account.account_number}-compact2.jpg?amount=${order.total}&addInfo=${order.id} ${order.total}&accountName=${account.account_name}`;
                console.log(url);
                var d = $(`<div style="text-align:center;margin:16px 0;">
                    <p>----Vui lòng chuyển khoản-----</p>
                    <div><img width="150" src="${url}" /></div>
                    </div>`);

                d.insertBefore( newHTML.find("#pos_receipt_footer"));   
            break;
            case "apoint":
                console.log(gateway);
                
                var data ={t:Date.now(),faucetpayment:"tranfer",note:`${order.id} ${order.total}`,merchant_id:gateway.settings.merchant_id,order_id:order.id,total:order.total,ipn:gateway.settings.ipn};
                var url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(JSON.stringify(data))}&size=125x125`;
                var d = $(`<div style="text-align:center;margin:16px 0;">
                    <p>----Vui lòng mở ứng dụng Faucet để thanh toán-----</p>
                    <div><img width="125" height="125" src="${url}" /></div>
                    </div>`);

                d.insertBefore( newHTML.find("#pos_receipt_footer"));   
            break;

            case "usdtbep20":
                console.log(gateway); 
                
                var d = $(`<div style="text-align:center;margin:16px 0;">
                    <p>----Vui lòng mở ứng dụng App hỗ trợ USDT Bep-20 để thanh toán-----</p>
                    <div>
                        <img width="125" height="125" src="${gateway.settings.image}" /><br/>
                        <p>Địa chỉ ví: ${gateway.settings.wallet_address}</p>
                    </div>
                    </div>`);

                d.insertBefore( newHTML.find("#pos_receipt_footer"));   
            break;
         }
      }

      setTimeout(function(){
         if(window.innerWidth<1023){
            $(".floatbtninv").trigger("click");
         }
      },2000);
      window.lastOrder = null;

   });
});