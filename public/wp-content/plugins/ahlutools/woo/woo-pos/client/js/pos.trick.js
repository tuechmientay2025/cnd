window.wc_pos_register_print = function(){
    if($(".woocommerce_order_items_wrapper .tbc.active table tbody tr").length>0){
            $(".wc_pos_register_pay").trigger("click");
            $(".go_payment").trigger("click");
            
    }
};

 
setTimeout(function(){
    var abc = window.POS_APP.checkPOSUserLogin;
    window.POS_APP.checkPOSUserLogin = function(data){
        if ( ! data.register_status_data || data.register_status_data === false ) {
            return;
        }

        if(!AhluPos.config.isctv){
            var loggedInUser = !empty(data.register_status_data.display_name) ? data.register_status_data.display_name : data.register_status_data.user_nicename;
            openModal("modal-locked-register");

            //trick a.k.a

            $("#modal-locked-register").find('.md-content').html("").html("<div>" + loggedInUser + " has taken over this register.</div>");
            setTimeout(function () {
                location.href = wc_pos_params.admin_url + "admin.php?page=wc_pos_registers&close=" + pos_register_data.ID + '&forced=true';
            }, 1500);

        }else{
            closeModal("modal-locked-register");
        }
        // abc();
    };


    var abc_stock = window.POS_APP.checkStock;
    window.POS_APP.checkStock= function (product_data, quantity, cart_item_key) {
    try {
         return true;
         
        var product_id = typeof product_data.variation_id != 'undefined' ? parseInt(product_data.variation_id) : parseInt(product_data.product_id);

        if (product_data.in_stock === false && product_data.backorders_allowed === false) {
            throw new Error(sprintf(pos_i18n[3], product_data.title));
        }
        if (CART.has_enough_stock(product_data, quantity) === false) {
            throw new Error(sprintf(pos_i18n[4], product_data.title, product_data.stock_quantity));
        }
        // Stock check - this time accounting for whats already in-cart
        if (product_data.managing_stock === true) {
            var managing_stock = product_data.managing_stock;
            var products_qty_in_cart = CART.get_cart_item_quantities();
            var check_qty = typeof products_qty_in_cart[product_id] != 'undefined' ? products_qty_in_cart[product_id] : 0;

            /**
             * Check stock based on all items in the cart
             */
            if (CART.has_enough_stock(product_data, check_qty + quantity) === false) {
                throw new Error(sprintf(pos_i18n[5], product_data.stock_quantity, check_qty));
            }

            if (product_data.stock_quantity < check_qty + quantity && product_data.backorders_allowed) {
                if (cart_item_key != 'undefined') {
                    var view = $('tr#' + cart_item_key + ' td.name .view');
                    if (!view.find('.backorders_allowed').length) {
                        view.append('<span class="register_stock_indicator backorders_allowed">' + pos_i18n[40] + ' </span>');
                    }
                }
            } else if (cart_item_key != 'undefined') {
                $('tr#' + cart_item_key + ' td.name .view .backorders_allowed').remove();
            }
        }
        return true;
    } catch (e) {
        console.log(e);
        APP.showNotice(e.message, 'error');
        return false;
    }
};
},1000);