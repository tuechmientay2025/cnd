setTimeout(function(){
    var $ = jQuery;
    function getQuery(q) {
       return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
    }
    var ref = getQuery("ref");
    if(ref){
         
         $(`<a href="#" class="button alt btn-payquick wplightbox" data-width="800" data-height="600">Thanh toán nhanh</button>`).insertAfter(".single_add_to_cart_button");
         
         $(".btn-payquick").on("click",function(e){
            e.preventDefault();
            // $("#youtubediv").fadeIn();
            
            $(".single_add_to_cart_button").trigger("click");
            
            setTimeout(function(){
                document.location.href="/thanh-toan/?ref="+ref;    
            },1000);
            
            
         });
    }
},1000);