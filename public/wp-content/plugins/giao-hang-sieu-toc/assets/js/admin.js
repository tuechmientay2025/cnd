(function( $ ) {
    'use strict';

    jQuery(document).ready(function($) {
        jQuery("#woocommerce_ghst_shipping_sender_city, #woocommerce_ghst_shipping_sender_district, #woocommerce_ghst_shipping_sender_ward, #service_type").select2();

        if ( jQuery('#woocommerce_ghst_shipping_sender_city').length > 0 ) {
            jQuery('#woocommerce_ghst_shipping_sender_city').on('change', function() {
                jQuery.ajax({
                    type: 'POST',
                    url: ghst_admin_params.ajax.url,
                    data: {
                        city_id: jQuery(this).val(),
                        action: 'aha_admin_update_shipping_method_district'
                    }
                }).done(function(result) {
                    jQuery('#woocommerce_ghst_shipping_sender_district').html(result);
                });
            });
        }

        if ( jQuery('#woocommerce_ghst_shipping_sender_district').length > 0 ) {
            jQuery('#woocommerce_ghst_shipping_sender_district').on('change', function() {
                jQuery.ajax({
                    type: 'POST',
                    url: ghst_admin_params.ajax.url,
                    data: {
                        district_id: jQuery(this).val(),
                        action: 'aha_admin_update_shipping_method_ward'
                    }
                }).done(function(result) {
                    jQuery('#woocommerce_ghst_shipping_sender_ward').html(result);
                });
            });
        }

        if ( jQuery('button#handle-create-order').length > 0 ) {
            jQuery('button#handle-create-order').on('click', function () {
                jQuery('.response').html();
                jQuery.ajax({
                    type: 'POST',
                    url: ghst_admin_params.ajax.url,
                    data: {
                        action                  : 'create_order_handler',
                        order_id                : jQuery(this).data('order_id'),
                        sender_name             : jQuery(this).data('sender_name'),
                        sender_phone            : jQuery(this).data('sender_phone'),
                        sender_address          : jQuery(this).data('sender_address'),
                        customer_name           : jQuery(this).data('customer_name'),
                        customer_phone          : jQuery(this).data('customer_phone'),
                        customer_address        : jQuery(this).data('customer_address'),
                        cod_value               : jQuery('input[name="cod_value"]').val(),
                        service_id              : jQuery('select[name="service_type"]').val(),
                        promo_code              : jQuery('input[name="coupon_code"]').val(),
                        remarks                 : jQuery('textarea[name="remarks"]').val(),
                    },
                    beforeSend: function( xhr ) {
                        jQuery('button#handle-create-order').html('ĐANG XỬ LÝ ...');
                        jQuery('button#handle-create-order').attr('disabled','disabled');
                    }
                }).done(function(result) {
                    jQuery('button#handle-estimate-fee').remove();
                    jQuery('button#handle-create-order').remove();
                    jQuery('.response').html(result);
                });
            });
        }

        if ( jQuery('button#handle-estimate-fee').length > 0 ) {
            jQuery('button#handle-estimate-fee').on('click', function () {
                jQuery('.response').html();
                jQuery('#distance').html();
                jQuery('input#estimate_fee').val(0);
                jQuery.ajax({
                    type: 'POST',
                    url: ghst_admin_params.ajax.url,
                    data: {
                        action                  : 'estimate_fee_handler',
                        sender_name             : jQuery(this).data('sender_name'),
                        sender_phone            : jQuery(this).data('sender_phone'),
                        sender_address          : jQuery(this).data('sender_address'),
                        customer_name           : jQuery(this).data('customer_name'),
                        customer_phone          : jQuery(this).data('customer_phone'),
                        customer_address        : jQuery(this).data('customer_address'),
                        service_id              : jQuery('select[name="service_type"]').val(),
                        promo_code              : jQuery('input[name="coupon_code"]').val(),
                    },
                    beforeSend: function( xhr ) {
                        jQuery('button#handle-estimate-fee').html('ĐANG XỬ LÝ ...');
                        jQuery('button#handle-estimate-fee').attr('disabled','disabled');
                    }
                }).done(function(result) {
                    if (result.hasOwnProperty('status')) {
                        if (result.status == 'failed') {
                            let errMsg = result.hasOwnProperty('message') ? result.message : 'Lỗi hệ thống';
                            let html = '<div class="error notice">';
                            html += '<p>Có lỗi xảy ra: ' + errMsg + '</p>';
                            html += '</div>';
                            jQuery('.response').html(html);
                        } else {
                            let total_fee = result.hasOwnProperty('total_fee') ? result.total_fee : 0;
                            let distance = result.hasOwnProperty('distance') ? result.distance : 0;
                            jQuery('input#estimate_fee').val(total_fee);
                            jQuery('#distance').html('<span> (' + distance + ' km)</span>');
                        }
                    }
                    jQuery('.response').html();
                    jQuery('button#handle-estimate-fee').html('KIỂM TRA PHÍ GIAO HÀNG');
                    jQuery('button#handle-estimate-fee').removeAttr('disabled');
                });
            });
        }
    });
})( jQuery );
