(function(win){
  var loaded =0;

  function init(){
    $("body").append(`<style>.countrysheet,.countrysheet .body{position:absolute;bottom:0;left:0}.boxcountry .cstate{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.boxcountry .cstate>*{width:33%}@media screen and (max-width:920px){.boxcountry .cstate>*{width:100%}}.countrysheet{height:100%;width:100%;visibility:hidden!important;z-index:10000000000000;-webkit-transition:.3s ease-in;-o-transition:.3s ease-in;transition:.3s ease-in;background-color:rgb(51 51 51 / 19%);-webkit-transform:translateY(100%);-ms-transform:translateY(100%);transform:translateY(100%)}.countrysheet.active{visibility:visible!important;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}.countrysheet .body{height:55%;border-radius:24px 24px 0 0;padding:14px;width:100%;background-color:#fff;color:#333;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.countrysheet .btnok{width:100%;text-align:center}.countrysheet .flex{-webkit-box-flex:1;-ms-flex:1;flex:1}
  
@media (min-width: 1200px) {
  .countrysheet .body{
          width: 50%;
    margin-left: 25%;
  }
}
    </style>
  <div class="countrysheet">

       <div class="body">

         <div class="ac" style="text-align: right;">

          <span onclick='$(".countrysheet").removeClass("active")'>Đóng</span>

         </div>

         <div class="countrya flex"></div>
         <div class="countrymap"></div>
         <div>

             <button class="btn btn-primary btnok">Chọn</button>

         </div>

      </div>

    </div>`);
  }

  
$(document).ready(function(){
   fetch( "https://ip.nf/me.json").then(function(r){return r.json()}).then(function( data ) {

      win.country = data.ip;

      // $("#ip").html(data.ip.ip);

      if(win.$&&$(".ipcountry").length){

        $(".ipcountry").html(win.country.ip+"<br/>"+win.country.city + " (" + win.country.country_code + ")");

      }

      

  }).catch(function(err){

  });

});
//use for address map for user lcoation
var ele =null;
  
  win.openCountry = function(options){
    if(loaded==0){
      loaded=1;
      init();
    }

     var settings = $.extend({ 
       type:"address"

     },options,true);

     //data country
     settings.callback = function(data){
         console.log(data);
         var infomap = $(".countrysheet").data("map");
         if(infomap&&data.ward_id){
             picker.mapGoolge.geocode({data:{ 'address': data.address }, callback:function (results, status) {
              if (status === 'OK') {
                 console.log(results);
                if (results[0]) {
                    // infomap.center({lat:lng:});
                } else {
                   
                  console.log('No results found');
                }
              } else {
                console.log('Geocoder failed due to: ' + status);
                 
              }
               
            }});

          
             
         } 
     };

     if(!ele){

        ele =$(".countrysheet .countrya").country(settings); 

     }
     //detech map
     



     $(".countrysheet .btnok").off("click").on("click",function(){



        if(options.callback){
          var info = ele.data("country").geData();
          var infomap = $(".countrysheet").data("map");
          if(infomap){
             info.gps = infomap.gps();
          }

          options.callback(info);

        }

        methods.close();

     });



     var methods= {

        open : function(){

           $(".countrysheet").addClass("active");
           var camvas = $(".countrysheet .countrymap");
           camvas.height(150);
           camvas.css("width","100%");
           var infomap = $(".countrysheet").data("map");
           if(!infomap){
              if(!picker.mapGoolge.key){
                console.log("Please enter api key maps.... picker.mapGoolge.key='your_key'");
                return;
              }
              win.picker.mapGoolge.create({
                ele: camvas[0]
              }).then(function(info){
                $(".countrysheet").data("map",info);
             });
           }else{
              if(google&&google.maps)google.maps.event.trigger(infomap.map, "resize");
           }
           

           return this;

        },

        close : function(){

           $(".countrysheet").removeClass("active");

           return this;

        }

     };

     return methods.open();

  };

$.fn.country= function(options){
 
            return this.each(function(){
                var settings = $.extend({
                  type:"address",
                  init : function(){

                  },
                  name:""
                },options,true);


                var me = this;
                var modal = $(this).html(`<div class="boxcountry">
                    
                  ${settings.type=="address"?`<div class="design-group">
                        <label for="streetssss">Số nhà - Đường - Khu phố</label>
                        <input type="text"  name="${name?`${name}[street]`:"street"}" title="Vui lòng nhập Số nhà - Đường - Khu phố" class="street required form-control" id="streetssss" style="text-transform: capitalize;" />
                      </div>`:""}
                     
                     <div class="cstate">
                          <div class="design-group">
                        <label for="sddsdfsad">Tỉnh/TP</label>
                        <select name="province_id" class="required form-control province_id" title="Vui lòng chọn Tỉnh/TP" id="sddsdfsad"></select>
                        <input type="hidden" name="${name?`${name}[province]`:"province"}" class="province">
                      </div>      
                     
                      <div class="design-group">
                        <label for="adasss">Quận/Huyện</label>
                        <select name="district_id" class="required form-control district_id" title="Vui lòng chọn Quận/Huyện" id="adasss"></select>
                        <input type="hidden" name="${name?`${name}[district]`:"district"}" class="district">
                      </div>                                      
                    
                      <div class="design-group">
                        <label for="wardsss">Phường/Xã</label>
                        <select name="ward_id" class="required ward_id form-control" title="Vui lòng chọn Phường/Xã" id="wardsss"></select> 
                        <input type="hidden" name="${name?`${name}[ward]`:"ward"}" class="ward">
                      </div>    
                     </div>
                </div>`);

                $(this).data("country",this);

                this.getProvinces = function(){
                  return all.map(function(v){
                     return {
                        province_id:v.province_id,
                        name:v.name
                     }
                  });
                };
                this.getDistricts = function(province_id){
                  return all["p"+province_id].district.map(function(v){
                     return {
                        district_id:v.district_id,
                        name:v.name
                     }
                  });
                };
                this.getWards = function(province_id,district_id){
                  return all["p"+province_id].district["w"+district_id].ward.map(function(v){
                     return {
                        ward_id:v.ward_id,
                        name:v.name
                     }
                  });
                };
                this.geData = function(){
                  return{
                    province: modal.find('input.province').val(),
                    province_id: modal.find('select.province_id').val(),
                    district_id: modal.find('select.district_id').val(),
                    district: modal.find('input.district').val(),
                    ward_id: modal.find('select.ward_id').val(),
                    ward: modal.find('input.ward').val(),
                    street: modal.find('.street').val(),
                  }
                };

                
                var onChange   = function(){
                    if(settings.callback){
                      settings.callback(me.geData());
                    }
                };


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

                    //auto detech city
                    if(window.country){
                       var city = window.country.city||window.country.state;
                       if(city){
                          switch(city){
                            case "Ho Chi Minh City":
                              modal.find('select.province_id').val(50).trigger('change');
                            break;
                          } 
                       }
                    }
                };

                var me = this;
                var all = null;

                var url = "https://data.donggiatri.com/country/vn/all.json?t=2";
                    fetch(url).then(function(r){return r.json()}).then(function(res){
                      all = res;

                      settings.init.call(me,res);
                      var select = modal.find('select.province_id').data("province",res);
                      select.append('<option value="">--Chọn--</option>');
                      $.each(res,function(i,v){
                        select.append('<option value="'+v.province_id+'">'+v.name+'</option>');
                      });
                      //get district
                      select.on("change",function(e){
                        //
                        modal.find('select.ward_id').html("");

                        var province_id = this.value;
                        modal.find('input.province').val(this.options[this.selectedIndex].text);
                        var districts= all["p"+province_id].district;
                          var district = modal.find('select.district_id').data("district",districts);
                          district.html("").append('<option value="">--Chọn--</option>');
                          $.each(districts,function(i,v){
                            district.append('<option value="'+v.district_id+'">'+v.name+'</option>');
                          });
                          //get ward
                          district.on("change",function(e){
                            var district_id = this.value;
                            if(district_id){
                            var l = modal.find('select.district_id').data("district");
                            var wards= l["d"+district_id].ward;
                            modal.find('.district').val(this.options[this.selectedIndex].text);
                            
                             
                              var ward = modal.find('select.ward_id').data("ward",wards);
                              ward.html("").append('<option value="">--Chọn--</option>');
                              $.each(wards,function(i,v){
                                ward.append('<option value="'+v.ward_id+'">'+v.name+'</option>');
                              });
                              //get pot
                              ward.on("change",function(e){
                                var l = modal.find('select.ward_id').data("ward");
                                var ward_id = this.value;
                                var streets= l["w"+ward_id].street;
                                modal.find('.ward').val(this.options[this.selectedIndex].text);
                                
                                onChange();
                              });
                                }

                              onChange();
                          });
                       
                        
                          onChange();
                      });

                      me.bindData(options);

                    });
            });
        };
     

})(window);