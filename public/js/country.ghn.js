(function(){
  fetch( "https://ip.nf/me.json").then(function(r){return r.json()}).then(function( data ) {
    window.country = data.ip;
    // $("#ip").html(data.ip.ip);
    if(window.$&&$(".ipcountry").length){
      $(".ipcountry").html(window.country.ip+"<br/>"+window.country.city + " (" + window.country.country_code + ")");
    }
    
});

$(document).ready(function(){
  $("body").append(`<style>
.boxcountry{}
.boxcountry .cstate{
  display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.boxcountry .cstate>*{
   width:33%;
}

@media screen and (max-width: 920px) {
  .boxcountry .cstate>*{
   width:100%;
}
}
  </style>`);
});
$.fn.countryGHN= function(options){

            return this.each(function(){
                var settings = $.extend({
                  type:"address",
                  init : function(){

                  },
                  name:""
                },options,true);



                var modal = $(this).html(`<div class="boxcountry">
                    
                  ${settings.type=="address"?`<div class="form-group">
                        <label for="streetssss">Số nhà - Đường - Khu phố</label>
                        <input type="text" name="${name?`${name}[street]`:"street"}" title="Vui lòng nhập Số nhà - Đường - Khu phố" class="form-control required street" id="streetssss" style="text-transform: capitalize;" />
                      </div>`:""}
                     
                     <div class="cstate">
                          <div class="form-group">
                        <label for="sddsdfsad">Tỉnh/TP</label>
                        <select name="province_id" class="form-control required province_id" title="Vui lòng chọn Tỉnh/TP" id="sddsdfsad"></select>
                        <input type="hidden" name="${name?`${name}[province]`:"province"}" class="province">
                      </div>      
                     
                      <div class="form-group">
                        <label for="adasss">Quận/Huyện</label>
                        <select name="district_id" class="form-control required district_id" title="Vui lòng chọn Quận/Huyện" id="adasss"></select>
                        <input type="hidden" name="${name?`${name}[district]`:"district"}" class="district">
                      </div>                                      
                    
                      <div class="form-group">
                        <label for="wardsss">Phường/Xã</label>
                        <select name="ward_id" class="form-control required ward_id" title="Vui lòng chọn Phường/Xã" id="wardsss"></select> 
                        <input type="hidden" name="${name?`${name}[ward]`:"ward"}" class="ward">
                      </div>    
                     </div>
                </div>`);

                $(this).data("country",this);

                this.bindData = function(data){
                  if(!data)return;
                    var province_id= data.province_id,district_id= data.district_id,ward_id=data.ward_id,street=data.street;

                    if(street){

                      modal.find('input.street').val(street);
                    }

                    if(province_id){
                      modal.find('select.province_id').val(province_id).trigger("change");
                      setTimeout(function(){
                          if(district_id){
                             modal.find('select.district_id').val(district_id).trigger("change");
                            setTimeout(function(){
                                if(ward_id){
                                   modal.find('select.ward_id').val(ward_id).trigger("change");
                                }
                            },1000);
                          }
                      },1000);
                    }
                };

                var me = this;

                var token = 'd6e3dccb-6289-11ea-8b85-c60e4edfe802';
                
                var url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/";
                    fetch(`${url}province/`,{
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Token':token
                      },
                      body: JSON.stringify({})
                    }).then(function(r){return r.json()}).then(function(res){
                      me.province = res;
                      settings.init(res);
                      var select = modal.find('select.province_id').data("province",res);
                      select.append('<option value="">--Chọn--</option>');
                      $.each(res,function(i,v){
                        select.append('<option value="'+v.code+'">'+v.name+'</option>');
                      });
                      //get district
                      select.on("change",function(e){
                        var province_id = this.value;
                        modal.find('input.province').val(this.options[this.selectedIndex].text);
                        fetch(`${url}district/`,{
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Token':token
                      },
                      body: JSON.stringify({province_id:this.value})
                    }).then(function(r){return r.json()}).then(function(res){
                          var district = modal.find('select.district_id').data("district",res.districts);
                          district.html("").append('<option value="">--Chọn--</option>');
                          $.each(res.districts,function(i,v){
                            district.append('<option value="'+v.code+'">'+v.name+'</option>');
                          });
                          //get ward
                          district.on("change",function(e){
                            modal.find('.district').val(this.options[this.selectedIndex].text);
                            fetch(`${url}ward/?district_id`,{
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Token':token
                      },
                      body: JSON.stringify({district_id:this.value})
                    }).then(function(r){return r.json()}).then(function(res){
                              var ward = modal.find('select.ward_id').data("ward",res.wards);
                              ward.html("").append('<option value="">--Chọn--</option>');
                              $.each(res.wards,function(i,v){
                                ward.append('<option value="'+v.code+'">'+v.name+'</option>');
                              });
                              //get pot
                              ward.on("change",function(e){
                                modal.find('.ward').val(this.options[this.selectedIndex].text);
                              });
                            },true);
                          });
                        },true);
                      });

                      me.bindData(options);

                    });
            });
        };
     
})(window);