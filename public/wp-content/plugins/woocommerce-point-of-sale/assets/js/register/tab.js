var Tab = (function () {
    function Tab(id) {
        this.id = id;
        this._setDefaultData();
    }
    Tab.prototype._setDefaultData = function () {
        this.cart = {
            cart_contents: {},
            coupons: {},
            applied_coupons: [],
            chosen_shipping_methods: { price: '', title: '' },
            fees: [],
            fee_total: 0,
            cart_session_data: {
                'cart_contents_total': 0,
                'cart_contents_weight': 0,
                'cart_contents_count': 0,
                'total': 0,
                'subtotal': 0,
                'subtotal_ex_tax': 0,
                'tax_total': 0,
                'taxes': {},
                'shipping_taxes': {},
                'discount_cart': 0,
                'discount_cart_tax': 0,
                'shipping_total': 0,
                'shipping_tax_total': 0,
                'coupon_discount_amounts': {},
                '_coupon_discount_amounts': {},
                'coupon_discount_tax_amounts': {},
                '_coupon_discount_tax_amounts': {},
                'fee_total': 0,
                'fees': []
            }
        };
        this.customer = false;
    };
    Tab.prototype.setCart = function (key, value) {
        this.cart[key] = value;
    };
    //Should be global cart variable
    Tab.prototype.getCart = function () {
        CART.cart_contents = this.cart.cart_contents;
        CART.coupons = this.cart.coupons;
        CART.applied_coupons = this.cart.applied_coupons;
        CART.chosen_shipping_methods = this.cart.chosen_shipping_methods;
        CART.fees = this.cart.fees;
        CART.fee_total = this.cart.fee_total;
        CART.cart_session_data = this.cart.cart_session_data;
        if (this.customer) {
            CUSTOMER = Object.assign({}, this.customer);
            APP.setCustomer(CUSTOMER.id);
        }
        else {
            APP.setGuest();
            CUSTOMER.id = 0; //TODO: Fix this. Should be in the customer file.
        }
        console.log(CART);
    };
    Tab.prototype.clear = function () {
        this._setDefaultData();
    };
    Tab.prototype.setCustomer = function (CUSTOMER) {
        this.customer = Object.assign({}, CUSTOMER);
    };
    return Tab;
})();
// var arr_tab = new Array() ; 
// function loadTabAvailable() {
//     jQuery("#modal-tabs .left-col .box-tab").each(function(){
//         if ( jQuery.isNumeric(jQuery(this).data('tab_id')) == false ) {
//             arr_tab.push(jQuery(this).data('tab_number'));
//         }
//         if (  jQuery.isNumeric(jQuery(this).data('tab_order_id')) == true ) { 
//             jQuery(this).find('.tab-key').text('');
//         }
//     });
// }
// //get all avaible table for now
function showTabAvailable() {
    var select = jQuery("#select").html("");
    jQuery('.box-tab').each(function (i, v) {
        var me = jQuery(v);
        if (!me.hasClass("active")) {
            var name = me.data('tab_number');
            var title = me.data('tab_title');
            select.append('<option value="' + name + '">' + title + '</option>');
        }
    });
}


jQuery(document).ready(function ($) {
    $("#select").css("width", "100%");
    // loadTabAvailable();
    // showTabAvailable();
    // $('#tab-task').show();
    // jQuery.fn.select2.amd.require([
    //     'select2/data/array',
    //     'select2/utils'
    // ], function (ArrayData, Utils) {
    //     function CustomerData($element, options) {
    //         CustomerData.__super__.constructor.call(this, $element, options);
    //     }
    //     Utils.Extend(CustomerData, ArrayData);
    //     CustomerData.prototype.query = function (params, callback) {
    //         APP.search_customer_wc_3(params, callback);
    //     };
    //     jQuery("#tab-customer").select2({
    //         minimumInputLength: 3,
    //         multiple: false,
    //         dataAdapter: CustomerData
    //     }).change(function () {
    //         let customer_id = jQuery(this).val();
    //         jQuery('.box-tab.active').data('tab_customer', customer_id);
    //     });
    // });
    // click on table
    $(document).on('click','.box-tab', function () {
        var me = $(this);
        $('.box-tab.active').removeClass('active');
        $(this).addClass("active");
        var id = me.data('tab_order_id');
        var tab_number = me.data('tab_number');
        console.log(this);
        // if (!id){
        //     jQuery('#tab-task').hide();
        // }else{
        //     jQuery('#tab-task').show();
        // }
        var saved = $(this).hasClass("saved");
        var active = $(this).hasClass("active");
        //make an order or not
        if (active && saved) {
            // $('#tab-task').show();
            $('#open_tab').hide();
            showTabAvailable();
        }
        else {
            // $('#tab-task').hide();
            $('#open_tab').show();
        }
        jQuery('.select-tab').hide();
        jQuery('.tab-form').show();
        jQuery('#tab-title').val(me.find(".tab-title").text());
        jQuery('#tab-limit').val(me.data('tab_limit'));
        jQuery('#tab-money').val(me.data('tab_money'));
        jQuery('#tab-time').val(me.data('time'));
        jQuery('#tab-number').val(me.data('tab_number'));
        jQuery('#tab-order_id').val(me.data('tab_order_id'));
        // jQuery('#tab-customer').val(jQuery(this).data('tab_customer'));
        // let order_id  = this.getAttribute('data-tab_order_id');
        // if ( parseInt(order_id) == parseInt(jQuery(this).data('tab_order_id')) ) {
        //         console.log(jQuery(`.opened-amount`).text());
        // }
        var customer_id = $(this).data('tab_customer');
        if (jQuery('#tab-customer option[value = "' + customer_id + '"]').length == 0) {
            jQuery.ajax({
                type: 'POST',
                url: wc_pos_params.ajax_url,
                data: {
                    action: 'wc_pos_get_customer_html',
                    customer_id: customer_id
                },
                success: function (responce) {
                    jQuery('#tab-customer').append(responce);
                    jQuery('#tab-customer').val(customer_id).trigger('change');
                }
            });
        }
        else {
            $('#tab-customer').val(customer_id).trigger('change');
        }
        if ($(this).data('tab_register') != 0) {
            $('#tab-register').prop('checked', true);
        }
        else {
            $('#tab-register').prop('checked', false);
        }
        $('#modal-tabs .right-col .tab-number').text($(this).find('.tab-key').text());

        //check visable
        if($("#modal-tabs .md-content .right-col").is(':hidden')){
            $('#open_tab').trigger('click');
            $(this).removeClass("active");
        }else{
             $('#open_tab').trigger('click');
        }

        //check monile
        if(window.innerWidth<1024){
            $("#modal-tabs .right-col").addClass("active");
        }
        
    }).on("click","#modal-tabs .showinmobile span ",function(){
         $("#modal-tabs .right-col").removeClass("active");
    });
    

    //add any tab in ui
    $(document).on("click","#open_new_tab",function(){
        var title = $('#tab-title').val();
        if (title.length < 3) {
            APP.showNotice(pos_i18n[52], 'error');
            return false;
        }

        var id_staff = $(".staff_open").val();


        addnewtab({id:$(".tab_open_number .tab-number").text().trim(),title:title,tab_limit:$("#tab-limit").val(),id_staff:id_staff});
    });
    

    //create new tab from table
    $('#open_tab').on('click', function () {
        $("#modal-tabs .right-col").removeClass("active");  

        
        //check table exist
        var active_tab = jQuery('.box-tab.active');
        if (active_tab.length > 0) {
            console.log(active_tab.data());

            //check already assigned
            if (jQuery('.tab-tabs .tab[data-tab_id="' + active_tab.data('tab_id') + '"]').length > 0) {
                APP.showNotice(pos_i18n[49], 'error');
                return false;
            }
            //if new table
            var title = jQuery('#tab-title').val();
            if (title.length < 3) {
                APP.showNotice(pos_i18n[52], 'error');
                return false;
            }
            var source = jQuery('#tmpl-tabs-head').html();
            var template = Handlebars.compile(source);
            active_tab.data('tab_limit', jQuery('#tab-limit').val());
            active_tab.data('tab_title', title);
            active_tab.find('.tab-title').text(title);
            active_tab.find('.tab-timer').timer();
            var data = {
                id: active_tab.data('tab_id'),
                title: title,
                customer: active_tab.data('tab_customer'),
                limit: active_tab.data('tab_limit'),
                order_id: active_tab.data('tab_order_id'),
                tab_number: active_tab.data('tab_number')
            };
            var html = template(data);
            $('div.tab-tabs').append(html);
            source = jQuery('#tmpl-tabs-tab').html();
            template = Handlebars.compile(source);
            html = template(data);
            $('#bill_screen .woocommerce_order_items_wrapper').append(html);
            $('.md-close').click();
            $('.tab[data-tab_id="' + data.id + '"]').click();
            if (active_tab.data('tab_order_id')) {
                APP.loadOrder(active_tab.data('tab_order_id'));
            }
            active_tab.find('span.status').text(pos_i18n[50]);
            $('#tab-title').val('');
            $('#tab-limit').val('');
            active_tab.addClass("saved");
        }
        else {
            APP.showNotice(pos_i18n[46], 'error');
        }
    });
    $(".tab-key").each(function (i, v) {
        var root = $(v).closest(".box-tab");
        $(v).parent().hide();
        // root.find(".status").hide();
        var tab_id = root.data("tab_number");


    });
    $("#tabs_page").html("Bàn");

    $(".tablimitblock").hide();

    $(".select-tab").hide();
    // //load init
    // $('.box-tab.saved').removeClass('saved');
    // $('.box-tab.saved').each(function () {
    //     $(this).find('.tab-timer').timer({ seconds: $(this).data('time') });
    // });
    $(document).keypress(function (e) {
        var key = e.which;
        if (key == 13 && $('#modal-tabs').hasClass('md-show') && $('.box-tab.active').length > 0) {
            $('#open_tab').click();
            return false;
        }
    });
    //change table
    $('#move_table').on('click', function () {

        $(".tab-action>div").addClass("hide");
        $(".move_table").removeClass("hide");

         $("#confirm_tab").hide();

        if(jQuery('.box-tab.active').length<2){
            return;
        }




        //remove old
        var old_tb = $('#modal-tabs .active.saved');
        old_tb.removeClass('saved');
        var obj_old_tb = {
            id: old_tb.data("tab_number"),
            id_order: old_tb.data("tab_order_id"),
            tab_money: old_tb.find('.opened-amount').html(),
            tab_time: old_tb.find('.tab-timer').text(),
            tab_id: old_tb.data("tab_id"),
            title: old_tb.data("tab_title")
        };
        //remove ref in old table
        removeSavedTab({ order_id: old_tb.data("tab_order_id"), tab_number: obj_old_tb.id });
        old_tb.find(".opened-amount").text("");
        //add new table with tab number
        var number = $('#select').val();
        var new_ = $(".box-tab[data-tab_number='" + number + "']");
        new_.find('.status').text(pos_i18n[50]);
        new_.data("tab_order_id", obj_old_tb.id_order).attr("data-tab_order_id",obj_old_tb.id_order);

        //change ui order tab
        var title= new_.attr("data-tab_title");
        console.log(title);
        var old_ui = $(".tab-tabs .tab[data-tab_id='" + obj_old_tb.id + "']").data("tab_id",number).attr("data-tab_id",number);
        $(".tab-tabs .tab[data-tab_id='" + number + "'] .title").html(title);
        $(".woocommerce_order_items_wrapper .tbc[data-tab_id='" + obj_old_tb.tab_id + "']").attr("id", 'tab-' + number).attr("data-tab_id", number).data("tab_id", number).attr("data-tab_number", number).data("tab_number", number);
        $(".box-tab[data-tab_number='" + number + "']").addClass("saved");


        showTabAvailable();

        
    });
    //merge table
    $('#merge_table').on('click', function () {

       $(".tab-action>div").addClass("hide");
        $(".merge_table").removeClass("hide");
         $("#confirm_tab").hide();

        if($('.box-tab.active').length==0){
            return;
        }

        //chon ban tu
        var select = $("#select_from").html("");
        $('.box-tab.active').each(function (i, v) {
            var me = $(v);
            var name = me.data('tab_number');
            var title = me.data('tab_title');
            select.append('<option value="' + name + '">' + title + '</option>');
        });

        var select = $("#select_to").html("");
        $('.box-tab').each(function (i, v) {
            var me = $(v);
            var name = me.data('tab_number');
            var title = me.data('tab_title');
            select.append('<option value="' + name + '">' + title + '</option>');
        });

    });
    //remove table and tab
    $(document).on('click', '.tab-tabs .close', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
        var me = $(this);
        //confirm
        openConfirm({
            content: '<h3>Bạn có muốn xoá bàn không?</h3><strong>NOTE:</strong> Sau khi xoá bàn dữ liệu không thể hồi phục lại đươc.',
            confirm: function(){
                var tab = me.closest(".tab");
                if (tab.hasClass("saved")) {
                    var tab_data = {
                        order_id: tab.data('tab_order_id'),
                        tab_id: tab.data('tab_id'),
                        tab_number: tab.data('tab_number')
                    };
                    var tab_box = $('.box-tab[data-tab_id="' + tab_data.tab_id + '"]');
                    tab_box.find('.opened-amount').text('');
                    removeSavedTab(tab_data);
                    //remove ui
                    $(".tab-tabs .tab[data-tab_id='" + tab_data.tab_id + "']").remove();
                    $(".woocommerce_order_items_wrapper .tbc[data-tab_id='" + tab_data.tab_id + "']").remove();
                    //try to active ux in pre bill
                    $(".tab-tabs .tab").eq($(".tab-tabs .tab").length - 1).trigger("click");

                    tab.remove();
                }
            },
            cancel: function(){
               
            },
            notSign: true
        });

        
    });
    ///close table
    $(document).on('click', '.tab-tabs .tab .close', function () {
        var me = $(this);
        var id = me.closest(".tab").data("tab_id");

        //confirm
        openConfirm({
            content: '<h3>Bạn có muốn xoá bàn không?</h3><strong>NOTE:</strong> Sau khi xoá bàn dữ liệu không thể hồi phục lại đươc.',
            confirm: function(){
                var tab = $('.box-tab[data-tab_id="' + id + '"]');
                if (tab.hasClass("saved")) {
                    var tab_data = {
                        order_id: tab.data('tab_id'),
                        tab_id: tab.data('tab_id'),
                        tab_number: tab.data('tab_number')
                    };
                    var tab_box = $('.box-tab[data-tab_id="' + tab_data.tab_id + '"]');
                    tab_box.find('.opened-amount').text('');
                    removeSavedTab(tab_data);
                    //remove ui
                    me.closest(".tab").remove();
                    $(".woocommerce_order_items_wrapper .tbc[data-tab_id='" + id + "']").remove();
                    //try to active ux in pre bill
                    $(".tab-tabs .tab").eq($(".tab-tabs .tab").length - 1).trigger("click");
                }
            },
            cancel: function(){
               
            },
            notSign: true
        });
        
    });

    //show demo table
    $(document).on('click', '.btntabdemo', function () {
         var demo =[
            {
                name:"Ngoài trời",
                id:1,
                child:[
                    {
                        name:"Bàn 1",
                        id:1
                    },
                    {
                        name:"Bàn 6",
                        id:2
                    },
                    {
                        name:"Bàn 7",
                        id:3
                    },
                    {
                        name:"Bàn 8",
                        id:4
                    },
                    {
                        name:"Bàn 9",
                        id:5
                    },
                    {
                        name:"Bàn 10",
                        id:6
                    }

                ]
             },
              {
                name:"Phòng lạnh",
                id:2,
                child:[
                    {
                        name:"PL 1",
                        id:1
                    },
                    {
                        name:"PL 2",
                        id:2
                    },
                    {
                        name:"PL 3",
                        id:3
                    },
                    {
                        name:"PL 4",
                        id:4
                    },
                    {
                        name:"PL 5",
                        id:5
                    },
                    {
                        name:"PL 6",
                        id:6
                    }

                ]
             }
         ];


         $("#Tabsetting textarea").val(JSON.stringify(demo,null,4));
    }).on("click","#confirm_tab_save",function(){
        //save to data
        var data = $.extend({}, pos_register_data,true);
        data.tables =  JSON.parse($("#Tabsetting textarea").val());

        render_tab_html(data.tables);
        

        //send sever
        jQuery.ajax({
            url: document.location.origin+'/wp-admin/admin-ajax.php?action=save_table_synce_save',
            type: 'POST',
            data: data,
            async: true, //blocks window close
            success: function(res) {
                try{res = JSON.JSON.parse(res)}catch(e){}
                f(res);
                if(typeof res==='object'){
                    
                    // if(window.AhluTable.STOP==0)f(res);
                    // setTimeout(function(){
                    //     run_load(f);
                    // },2000);
                }
            }
        });
    }).on("click",'.tabactionlink a',function(e){
        e.preventDefault();

        var href = $(this).attr("href");
        $(".table_region-tab").hide();
        $(href).show();

        $('.tabactionlink a').removeClass("active");
        $(this).addClass("active");
    });

    $('.tabactionlink a').eq(0).trigger("click");





});
function render_tab_html(data) {
    if(data.length==0){
        render_tab(`Chưa cài đặt bàn ghế. Vui lòng liên hệ quản trị để xử lý.`);
        return;
    }

    // window.localStorage.setItem("__tabs"+pos_register_data.ID+pos_register_data.outlet,JSON.stringify(data));
   //render tables
    var tab_region = [];
    var s = data.map(function(v){

        tab_region.push(`<a href="#table_region_${v.id}" class="button wp-button-large">${v.name}</a>`);

        var abc = (v.child||v.children);

        return `<div id="table_region_${v.id}" class="table_region-tab">
        ${(abc||[]).map(function(n){
            return `<div class="box-tab"
                     data-tab_title="${n.name}" data-tab_limit="3000000"
                     data-tab_register="" data-tab_id="${n.id}" data-tab_order_id=""
                     data-tab_number="${n.id}">
                    <p>
                        <span class="tab-timer"></span>
                    </p>
                    <p style="display: none;">
                        <span class="tab-key">${n.id}</span>
                    </p>
                    <p>
                        <span class="tab-title">${n.name}</span>
                    </p>
                    <p>
                        <span class="status">Còn trống</span>
                    </p>
                    <p>
                        <span class="opened-amount"></span>
                    </p>

                    <span class="close">x</span>
                </div>`;
        }).join("")}
        </div>`;
    }).join(""); 
    render_tab(`<div class="tabactionlink">${tab_region.join("")}</div>${s}`);

    $(".tabactionlink a").trigger("click");       
}
function render_tab_html_cache(){
    // var __tabs = window.localStorage.getItem("__tabs"+pos_register_data.ID+pos_register_data.outlet);
    // try{
    //     __tabs = JSON.parse(__tabs);
    //     render_tab_html(__tabs);

    //     //update ui
    //     $("#Tabsetting textarea").val(JSON.stringify(__tabs,null,4));
    // }catch(e){}
    if(wpajax.config){
        
        render_tab_html(  wpajax.config&&wpajax.config.tables?wpajax.config.tables:[]);
    }
}
function render_tab(html) {

    if(html){

        jQuery("#Tablist").html(html);
    }
}

function addnewtab(data,active_tab){
        var active_tab = active_tab||jQuery('.tab-tabs .tab.active');

        var source = jQuery('#tmpl-tabs-head').html();
            var template = Handlebars.compile(source);

            var tab_number = active_tab.data('tab_number')?(active_tab.data('tab_number')*1)+1:data.id;

            var tab_id = active_tab.data('tab_id')?(active_tab.data('tab_id')*1)+1:data.id;
            
            data = $.extend({
                id: tab_id,
                title: data.title,
                customer: "",
                limit: 30000000,
                order_id: active_tab.data('tab_order_id'),
                tab_number: tab_number
            },data,true);

            //tab html
            var html = template(data);
            $('div.tab-tabs').append(html);
            active_tab = $('div.tab-tabs .tab').last();
            if(data.id_staff)active_tab.data("staff",data.id_staff);

            active_tab.addClass("saved active");
            // active_tab.data('tab_limit', jQuery('#tab-limit').val());
            // active_tab.data('tab_title', title);
            // active_tab.find('.tab-title').text(title);
            // active_tab.find('.tab-timer').timer();

            //order html
            source = jQuery('#tmpl-tabs-tab').html();
            template = Handlebars.compile(source);
            html = template(data);
            $('#bill_screen .woocommerce_order_items_wrapper').append(html);
            var order_tab = $('#bill_screen .woocommerce_order_items_wrapper .tbc').last();
            $('.md-close').click();
            $('.tab[data-tab_id="' + data.id + '"]').click();
            if (active_tab.data('tab_order_id')) {
                APP.loadOrder(active_tab.data('tab_order_id'));
            }
            active_tab.find('span.status').text(pos_i18n[50]);
            $('#tab-title').val('');
            $('#tab-limit').val('');
            


            order_tab.addClass("active");

    }

function closeActiveTab(saved) {
    jQuery('.select-tab').show();
    jQuery('.tab-form').hide();
    var tab_id = jQuery('.tab.active').data('tab_id');
    var tab_box = jQuery('.box-tab[data-tab_id="' + tab_id + '"]');
    jQuery('.tab.active:not(.main)').remove();
    tab_box.removeClass('active');
    if (!saved) {
        tab_box.find('.opened-amount').text('');
        tab_box.find('.tab-timer').timer('remove').text('');
        tab_box.find('.status').text(pos_i18n[51]);
        // tab_box.find('.tab-title').text('');
        // tab_box.data('tab_title', '');
    }
    jQuery('.tab:not(.active)').first().click();
}
function addSavedTab(tab_data) {
    var tab_box = jQuery('.box-tab[data-tab_id="' + tab_data.tab_id + '"]');
    tab_box.find('.tab-title').text(tab_data.title);
    tab_box.data('tab_title', tab_data.title);
    tab_box.data('tab_limit', tab_data.limit);
    tab_box.data('tab_order_id', tab_data.order_id);
    tab_box.addClass('saved');
    tab_box.find('.status').text(pos_i18n[50]);
    tab_box.find('.opened-amount').text(currency_symbol + CART.total.toFixed(2));
}
function removeSavedTab(tab_data) {
    console.log(tab_data);
    var tab_box = jQuery('.box-tab[data-tab_id="' + tab_data.tab_id + '"]');
    // 
    tab_box.data('tab_limit', '');
    tab_box.data('tab_order_id', '');
    tab_box.removeClass('saved');
    tab_box.find('.tab-timer').timer('remove').text('');
    tab_box.find('.status').text(pos_i18n[51]);
    tab_box.removeClass('active');
}
wp.hooks.addAction('wc_pos_end_calculate_totals', function(cart){
    var table = jQuery(".tab-tabs .tab.active");
    var id = table.data('tab_id');
    var data={
        product:cart,
        name: table.find(".title").length>0?table.find(".title").text().trim():table.text().trim(), 
        id: id
    }
    console.log(data);
    var r = getURLParameters("r");
    jQuery.ajax({
        url: document.location.origin+'/wp-admin/admin-ajax.php?action=client_table_synce_save'+(r?"&r="+r:""),
        type: 'POST',
        data: data,
        async: true, //blocks window close
        success: function() {}
    });
});

//auto load synce tbale
window.AhluTable = {
    STOP : 0,
    reset : function(){
        this.StOP =0;
    }
};
function run_load(f) {
    var r = getURLParameters("r");
    jQuery.ajax({
        url: document.location.origin+'/wp-admin/admin-ajax.php?action=load_table_synce_save'+(r?"&r="+r:""),
        type: 'POST',
        data: pos_register_data,
        async: true, //blocks window close
        success: function(res) {
            try{res = JSON.JSON.parse(res)}catch(e){}
            f(res);
            if(typeof res==='object'){
                
                // if(window.AhluTable.STOP==0)f(res);
                // setTimeout(function(){
                //     run_load(f);
                // },2000);
            }
        }
    });
}

jQuery(document).on('Config',function(e,config){
     //render from local
    render_tab_html_cache();
    // console.log('render');
     run_load(function(res){
        console.log(res);
        render_tab(res);
    });
});
setTimeout(function() {
   
   
},1000);