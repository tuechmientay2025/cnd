(function(win){
     win.hardwareBackPress = function(){
  if($(".modal.in").length){
    var l = $(".modal.in").length;
    if(l==1){
        $(".modal.in").modal("hide");
    }else{
        $(".modal.in").eq(l-1).modal("hide");
    }
  }else if($(".md-modal.md-show").length){
    var l = $(".md-modal.md-show").length;
    if(l==1){
        $(".md-modal.md-show").removeClass("md-show");
    }else{
        $(".md-modal.md-show").eq(l-1).removeClass("md-show");
    }
  }else{
     win.close();
  }
};
win.beforeClick = function(e){

};

 
win.AhluPos.ui={
    menubar : {
        add : function(options){
            var a =$(options.html);
            a.prependTo($(".menu_bar"));

            if(options.callback){
                ptions.callback(a);
            }
        }
    }
};

$(document).on("Config",function () {
  
     
   $(document).on("click",".md-modal.pos .media-menu a",function(e){
        var modal = $(this).closest(".md-modal");
        // console.log(e);
        e.preventDefault();
        var a = $(this).data("bind") ;
        modal.find(".popup_section").hide();
        modal.find("[data-bind]").removeClass("active");
        
       $(this).addClass("active");
       $("#"+a).show();

       
    });

    // $(document).on("click",".moreaction>*",function(e){
    //     e.preventDefault();
    //     $(".moreaction .close_x").trigger("click");
    // });

    
        
});
$(document).ready(function ($) {
     //override 
    
    win.localhost.init($);
     
    //add new button
    $('<div type="button" class="wc_pos_register_print page-title-action">In</div>').insertAfter($(".wc_pos_register_pay"));

    $(document).on('keydown', function(e) {
        if((e.ctrlKey || e.metaKey) && (e.key == "p" || e.charCode == 16 || e.charCode == 112 || e.keyCode == 80) ){
            
            wc_pos_register_print();
        }  
    });

    $(".wc_pos_register_print").on("click",function(e){
        e.cancelBubble = true;
        e.preventDefault();

        e.stopImmediatePropagation();

        wc_pos_register_print();
        
    });
    
    //$("body").attr("data-theme",this.value);
    $(document).on("click",".chon_them_ra input",function(){
        $("body").attr("data-theme",this.value);
        win.AhluPos.settings.data_theme = his.value;
        win.AhluPos.settings.save();
    });
    
setTimeout(function(){
 
        if(win.ADevice){
            win.addEventListener("click",function(e){

          
                var ele = e.target;
                if(ele.nodeName.toLowerCase()=="a"){
                    var href = jQuery(ele).attr("href");
                    if(href&&href!="#"){
                        href = ele.href;
                       
                        if(win.openURL){ e.preventDefault();win.open(href);}
                    } 
                } 
            });
        }

        
        
        
        
        //save direction
        $(".pos_register_user_panel").attr('href','/wp-admin/admin.php?page=posmanager');
        

        $("#sync_data").on("click",function(e){
            e.preventDefault();
            e.stopPropagation();

            return false;
        });

        


        //auto open table if this app is restaurant
        openModal('modal-tabs');

        $("body").append('<audio style="opacity:0;position:absolute;z-index:-1;" controls="controls" id="tts-audio" src="'+document.location.origin+'/wp-content/plugins/woocommerce-point-of-sale/assets/sound/co-don-hang-moi.vi.mp3"></audio>');

        $("body").append(`<span class="floatbtninv"><i class="fa fa-shopping-cart my-float"></i></span>`);
        $(".floatbtninv").draggable();
        
        
        $("#close_register").html(`<i class="fa fa-sign-out" aria-hidden="true"></i> Đăng xuất`).appendTo('.moreaction');
         $(`<div id="menumobile"><i class="fa fa-bars"></i></div>`).prependTo("#regiser_top_bar #pos_register_buttons");


         var abc = $("#wc-pos-actions").clone().addClass("menuone");
            $("#wc-pos-actions").addClass("opmenumain");
            //get one for menu bar
            abc.insertBefore("#wc-pos-register-grids");
            
            $("#wc-pos-actions.menuone").prepend(`<div class="moreaction">
            <div class="moreactionhead"></div>
            <div class="close_x">
                    <i class="fas fa-times" onclick=" "></i>
                </div>
            </div>`).find("a").appendTo(".moreaction");
            
            
            $("#postbox-container-2").prepend('<div class="abccontainer234"></div>');
 
        
        //search product
        $(document).on("keyup",".add_items input",function(){
            var val = this.value.toLowerCase();
            var lis = $("#grid_layout_cycle li");
            if(val){
                vals = val.make_slug().split("-");
                
                lis.each(function(){
                    var slug = $(this).attr("date-slug");
                    var id = $(this).attr("date-id");
                    var sku = $(this).attr("date-sku");
                    
                    if(vals.includes(slug) || val.includes(id)|| val.includes(sku) || $(this).text().trim().toLowerCase().includes(val)){
                        $(this).show();
                    }else{
                        $(this).hide();
                    }
                    
                });
            }else{
                lis.show();
            }
            
        });
        
        

        var resize = function(){
            var h = $(".tab-tabs").height()+$(".wc_pos_register_subtotals.tbr").height()+20;
            $(".woocommerce_order_items_wrapper.tbr").height($("#bill_screen").height()-h);
            if(win.innerWidth<1015){
                $(".floatbtninv").show();

                $(".pos_register_user_panel").prependTo(".moreactionhead");

                $(".moreaction .wc_pos_register_notes,.moreaction #add_shipping_to_register,.moreaction .wc_pos_register_discount").hide();
                $(".opmenumain #add_shipping_to_register,.opmenumain #add_product_to_register").hide();

                $("#wc-pos-register-search-products,#wc-pos-actions").insertAfter(".abccontainer234");
            }else{
                $("#wc-pos-register-search-products,#wc-pos-actions").appendTo(".abccontainer234");


                $(".pos_register_user_panel").insertAfter("#menumobile");
                $(".floatbtninv").hide();

                $(".moreaction .wc_pos_register_notes,.moreaction #add_shipping_to_register,.moreaction .wc_pos_register_discount").show();
                $(".opmenumain #add_shipping_to_register,.opmenumain #add_product_to_register").show();
            }
        };
        resize();
        $(win).bind("resize",resize);
        $(document).on("Config",function(){
            setTimeout(function(){
                resize();
            },1300);
        });
        
        $(".floatbtninv").on("click",function(e){
            $("#postbox-container-1").toggleClass("active"); 
            
        });
        
        $("#menumobile").on("click",function(e){
            $("#wc-pos-actions.menuone").toggleClass("active");
            
        });
        $(".moreaction .close_x").on("click",function(e){
            $("#wc-pos-actions.menuone").removeClass("active");
        });

        //cai dat bang order
        if(win.innerWidth<1024){
            $(".woocommerce_order_items_wrapper,.wc_pos_register_subtotals").width(win.innerWidth);
        }
        
        
        

    },1000);
});



})(window);