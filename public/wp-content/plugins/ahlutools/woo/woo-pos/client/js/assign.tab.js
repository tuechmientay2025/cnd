jQuery(document).on('Config',function(e,config){
     setTimeout(function() {
   
          //assign to tab who will be done
          var ele = jQuery(`<div>Hoa hồng cho <select class="staff_open"><option value="">-- Chọn nhân viên --</option></select></div>`);

          ele.prependTo(".tab_open_number");

          ele.find('select').on("change",function(e){

          });

          //now ask server to know any staff cashier
          wpajax("wc_list_staff",{},function(r){
             ele.find('select').append(r.map(function(v){
               return  `<option value="${v.ID}">${v.display_name?v.display_name:v.user_login}</option>`;    
             }).join(""));
          });


          //listen before send order

     },1000);

     $(document).on("onBeforeOrder",function(e,cart){

          cart.meta_data.push({
                 "key": "id_staff_hh",
                 "value": staff_serve_by()
         });
        
     });
});

window.staff_serve_by = function(){
     var active_tab = active_tab||jQuery('.tab-tabs .tab.active');
     return active_tab.data("staff");
};