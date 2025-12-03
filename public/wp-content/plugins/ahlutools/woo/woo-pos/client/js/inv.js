$(document).on("Config",function () {
     $(document).on("click",".saletoday",function(e){
        e.preventDefault();
            localhost.order.modal();
    });  
    
    if(window.innerWidth<1015){
        $(".moreaction").append(`<a class="saletoday tieude tips button ladda-button tiped"><i class="fa fa-cart-arrow-down"></i> Đơn hàng<span></span></a>`);
    }

    //append to header menu
    AhluPos.ui.menubar.add({html:`<div class="saletoday tieude" style="cursor: pointer;"><i class="fa fa-cart-arrow-down"></i> Đơn hàng <span></span></div>`});


    $(document).on("Order_complete",function(e,order){
        console.log(order);   
    });


  
});