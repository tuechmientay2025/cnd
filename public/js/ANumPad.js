  window.ANumPad = (function(){

  var CURRENCY= "đ";

  function format_money(price,decimal){

    if(decimal===undefined)decimal =0;

    price = price.toString();

    var a = price.replace(/[^0-9\.]/ig,"");

    return decimal?parseFloat(a).toFixed(decimal):a;

  }

  function money_split(price,thousand){

  if(!thousand) thousand=",";

  price = price.split('').reverse().join('');

      var i = 0;

      var res=[];

      while(i<price.length){

        res.push(price.slice(i,i+3));

          i+=3;

      }

  return res.join(thousand).split("").reverse().join("");

}



function parse_money(price){

    if(!price)return 0;

  return price.toString().replace(/[^0-9\.\-]/ig,"").replace(",","");

}

function show_money_none(price,thousand,decimal){

  if(!thousand) thousand=",";

  if(decimal===undefined) decimal=0;

  price = price.toString();

  var a = price.replace(/[^0-9\.]/ig,"");

  if(a.length<=3){

    return format_money(a);

  }

  //spilt

  a = format_money(a,decimal);

  if(a.indexOf('.')!=-1){

    var left = a.substr(0,a.indexOf('.'));

    var right = a.substr(a.indexOf('.')+1);

    if(left.length<=3){

      return left+"."+right;

    }

    return money_split(left)+"."+right;

  }

  return money_split(price);

}



function show_money(price,thousand,decimal){

  if(!price) return price;

  if(!thousand) thousand=",";

  if(decimal===undefined) decimal=0;

  price = price.toString();

  var a = price.replace(/[^0-9\.]/ig,"");

  if(a.length<=3){

    return format_money(a)+CURRENCY;

  }



  //spilt

  a = format_money(a,decimal);

  if(a.indexOf('.')!=-1){

    var left = a.substr(0,a.indexOf('.'));

    var right = a.substr(a.indexOf('.')+1);

    if(left.length<=3){

      return left+"."+right+CURRENCY;

    }

    return money_split(left)+"."+right+CURRENCY;

  }

  return ""+money_split(a)+CURRENCY;

}

var loaded =0;
function init(){
    if(loaded==0){
        loaded =1;
        $("body").append('<style>#PINcode{display:none;top: 0;left: 0;overflow: hidden;z-index:1000000;position:absolute;width:100%;height:100%;font-size:14px;transform:translateY(100%);transition:transform 0.3s ease}#PINcode.active{transform:translateY(0);display:block;}#PINcode::before{position:absolute;content:" ";width:100%;height:100%;background-color:rgb(19 17 17 / 50%)}#PINform .c{cursor:pointer;position: absolute;font-size: 2em;top: 0;right: 5px;z-index: 10;}#PINform input:focus, #PINform select:focus, #PINform textarea:focus, #PINform button:focus{outline:none}#PINform{background:#ededed;position:absolute;width:90%;padding:10px;-webkit-box-shadow:0px 5px 5px 0px rgba(0,0,0,0.3);-moz-box-shadow:0px 5px 5px -0px rgba(0,0,0,0.3);box-shadow:0px 5px 5px 0px rgba(0,0,0,0.3);bottom:50px;margin:0 5% 0}#PINbox{background:#ededed;width:100%;font-size:2rem;border:1px solid #d5d5d5;height:60px;line-height:60px;text-align:center;margin-top:16px}.PINbutton:hover,.PINbutton:active,.PINbutton.active{background-color:#fafafa;}.PINbutton{background:#ededed;color:#7e7e7e;border:none;border-radius:50%;font-size:1.5em;text-align:center;width:60px;height:60px;padding:0}.clear,.enter{font-size:1em}.PINbutton:hover{box-shadow:#506CE8 0 0 1px 1px}.PINbutton:active{background:#506CE8;color:#fff}.clear:hover{box-shadow:#ff3c41 0 0 1px 1px}.clear:active{background:#ff3c41;color:#fff}.enter:hover{box-shadow:#47cf73 0 0 1px 1px}.enter:active{background:#47cf73;color:#fff}.shadow{-webkit-box-shadow:0px 5px 5px -0px rgba(0,0,0,0.3);-moz-box-shadow:0px 5px 5px -0px rgba(0,0,0,0.3);box-shadow:0px 5px 5px -0px rgba(0,0,0,0.3)}.line_number{display:flex;justify-content:space-between;flex-direction:row}.money_number{display:flex;width:100%;overflow:scroll;padding:8px 0}.money_number .PINbutton{box-shadow:0 0 0 1px #cecece;width:auto;height:auto;padding:4px 10px;border-radius:8px;font-size:inherit;margin:0 16px 0 0}@media only screen and (max-device-width:768px){}</style><div id="PINcode"><div id="PINform"><div class="c">x</div><div id="PINbox">0</div><div class="line_number"> <input type="button" class="PINbutton" name="1" value="1" > <input type="button" class="PINbutton" name="2" value="2" > <input type="button" class="PINbutton" name="3" value="3" > <input type="button" class="PINbutton delete" value="<-" ></div><div class="line_number"> <input type="button" class="PINbutton" name="4" value="4" > <input type="button" class="PINbutton" name="5" value="5" > <input type="button" class="PINbutton" name="6" value="6" > <input type="button" class="PINbutton clear" name="-" value="Xoá" ></div><div class="line_number"> <input type="button" class="PINbutton" name="7" value="7" > <input type="button" class="PINbutton" name="8" value="8" > <input type="button" class="PINbutton" name="9" value="9" > <input type="button" class="PINbutton" name="-/+" value="-/+" ></div><div class="line_number"> <input type="button" class="PINbutton enter" name="OK" value="OK" value="OK" style="border: 1px solid #ccc;"> <input type="button" class="PINbutton" name="0" value="0" id="0" > <input type="button" class="PINbutton" name="000" value="000" > <input type="button" class="PINbutton" name="+" value="." ></div></div></div>');
    
 
    
     var pincode= $("#PINcode");

     var PINbox= $("#PINbox");

     function beforeChange(val){

       if(typeof callback==="object"){

          if(typeof callback.validate ==="function"){

             var a = callback.validate.call(pincode,val);

             val = a?a:val;

          }

       }



       PINbox.text(val);

     }



     AClick("#PINcode .c",function(e){

        methods.close();

     });



     AClick("#PINcode .PINbutton",function(e){

        var me = $(this);

        var val = this.value;

        if((val[0]=="0" && val.length==1))val="0";



       

        // console.log(val);

       

        var old = PINbox.text();

        if(old[0]=="0" || !old)old="";


        var label = val.toLowerCase();
        switch(label){

           case "del":

            old = old.slice(0, -1);

            if(old[0]=="0" || !old)old="0";



            beforeChange(old);

           break;

           case "clear": 
           case "xoá":

            beforeChange("0");

           break;

           case "done":
           case "ok":
           case "accept":

             if(typeof callback==="object"){

              if(typeof callback.done ==="function") callback.done.call(pincode,PINbox.text());

               $("#PINcode").removeClass("active");

               if(typeof callback.after ==="function")callback.after.call(pincode);



               callback = null;

             }

           break;
       		case "huỷ":
       		case "cancel":
           case "no":
           case "denied":

             if(typeof callback==="object"){ 
               $("#PINcode").removeClass("active"); 
               callback = null;

             }

           break;

           case "-/+":

              if(old.indexOf("-")!=-1){

                  beforeChange(old.replace("-",""));

              }else{

                 beforeChange("-"+old);

              }

              

           break;

           case "<-":

              if(!old){

                  beforeChange("0");

              }else{

                 beforeChange(old.substr(0,old.length-1));

              }

              

           break;

           case "+":

              beforeChange(old.replace("-",""));

           break;

           default:

               val= parse_money(val);

              if(typeof methods.parser[val]==="function"){

                 var a = methods.parser[val].call(this,old,val);

                 val = a?a:val;



                 beforeChange(val);

              }else{

                beforeChange(old+val);

              }

              

           break;

        }

     });


     }
  }

  var methods = {

     parser : {},

     

     open: function(options){
        init();


       var ANumPad = $("#PINcode");



        ANumPad.find("#PINbox").text(0);

        CURRENCY = options.currency?options.currency:CURRENCY





        // ANumPad.find();

        if(typeof options.before ==="function") options.before.call(ANumPad);

        ANumPad.addClass("active");



        callback = options;

     },



     open_discount: function(info){

        var ANumPad = $("#PINcode");



        ANumPad.find("#PINbox").text(0);



        var CURRENCY_ = info.currency?info.currency:CURRENCY;

        info.total = parse_money(info.total);

        var actions = {

         info:info,

         before: function(){

           var form =  this.find("#PINform");

           form.find(".money_number.more,.discount-block").remove();

           form.prepend('<div class="discount-block more text-center"> <p>Phương thức giảm giá</p><input type="button" class="btn btn-primary" data-key="%" value="Theo %"> <input type="button" class="btn" data-key="cash" value="Theo tiền mặt"><div class="text-left">Tổng tiền: <span>'+show_money(actions.info.total)+'</span></div><div class="text-left">Tiền tạm tính: <span class="sub">'+show_money(actions.info.total)+'</span></div></div>');



            var str="";

            var cash = info.label_cash||[1000,2000,5000,10000,20000,50000,100000,200000,500000,1000000,1500000,2000000];

            $.each(cash,function(i,v){

                str+='<input type="button" class="PINbutton" name="'+v+'" value="'+show_money_none(v)+CURRENCY_+'">';

                methods.parser[v+""] = function(old,val){

                   return parse_money(val);

                };

            });

            form.append('<div class="money_number more">'+str+'</div>');



            str="";
            var percent = info.label_percent||[3,5,10,25,30,40,50,75];

            $.each(percent,function(i,v){

                str+='<input type="button" class="PINbutton" name="'+v+'%" value="'+v+'%">';



                methods.parser[v+"%"] = function(old,val){

                   return parse_money(val);

                };



            });



            form.append('<div class="money_number more">'+str+'</div>');



            AClick("#PINform .discount-block input",function(){

                var v = $(this).data("key");

                $(this).closest(".discount-block").find("input").removeClass("btn-primary");

                $(this).addClass("btn-primary");

            });

         },

         validate : function(val){

          if(val<0)val=-val;



          var box = this.find("#PINform");

           var type_discount =  box.find(".btn.btn-primary").data('key');

           switch(type_discount){

             case "%":

               if(parseInt(val)>100){

                 val =100;

               }

               if(parseInt(val)<0) val=0;



               box.find(".sub").text(show_money(val?Math.ceil(parse_money(actions.info.total)-((parse_money(actions.info.total)*val)/100)):val));

 

             break;

             case "cash":

              val = parse_money(val);

               var a = actions.info.total-val;

               if(a<0) a = actions.info.total;

               // val =a;

               box.find(".sub").text(show_money(a));

             break;

           }

           return show_money_none(val);

         },

         done:function(num){

           if(typeof info.done==="function")

            var box = this.find("#PINform");

        	 var type_discount =  box.find(".btn.btn-primary").data('key');



            var b = parse_money(box.find(".sub").text());

             info.done.call(this,{

                num : num,

                per:type_discount=="%"? num:parseInt((b/actions.info.total)*100),

                total: actions.info.total,

                method: box.find(".btn.btn-primary").data('key'),

                subtotal : b,

                money : actions.info.total-b

             });

         }

       };

        window.ANumPad.open(actions);

     },



     open_fee: function(info){

        var ANumPad = $("#PINcode");



        ANumPad.find("#PINbox").text(0);



        CURRENCY = info.currency?info.currency:CURRENCY;

        info.total = parse_money(info.total);

        var actions = {

         info:info,

         before: function(){

           var form =  this.find("#PINform");

           form.find(".money_number.more,.discount-block").remove();

           form.prepend('<div class="discount-block more text-center"> <p>Thêm phí</p><input type="button" class="btn btn-primary" data-key="+" value="Thêm thu"> <input type="button" class="btn" data-key="+" value="Thêm chi"><div class="text-left">Tổng tiền: <span>'+show_money(actions.info.total)+'</span></div><div class="text-left">Tiền tạm tính: <span class="sub">'+show_money(actions.info.total)+'</span></div></div>');



            // var str="";

            // var list = {};

            // for(var i in list){

            //     var v= list[i];

            //     str+='<input type="button" class="PINbutton" name="'+i+'" value="'+v+'">';



            //     methods.parser[v] = function(old,val){

            //        return parse_money(val);

            //     };



            // }



            $('<div class="money_number more"><input type="text" class="form-control name_fee" name="name_fee" placeholder="Nhập tên phí"></div>').insertAfter(form.find(".discount-block"));

            var str="";

            $.each([1000,2000,5000,10000,20000,50000,100000,200000,500000,1000000,1500000,2000000],function(i,v){

                str+='<input type="button" class="PINbutton" name="'+v+'" value="'+show_money(v)+'">';

                methods.parser[v+""] = function(old,val){

                   return parse_money(val);

                };

            });

            form.append('<div class="money_number more">'+str+'</div>');

            

            AClick("#PINform .discount-block input",function(){

                var v = $(this).data("key");

                $(this).closest(".discount-block").find("input").removeClass("btn-primary");

                $(this).addClass("btn-primary");

            });



            form.find('[name="name_fee"]').on("change",function(){

              

            });



            form.find('[name="name_fee"]').focus();

         },

         done:function(num){

           if(typeof info.done==="function")

            var box = this.find("#PINform");

            var b = parse_money(box.find(".sub").text());



            var data = {

                num : num,

                total: actions.info.total,

                method: box.find(".btn.btn-primary").data('key'),

                subtotal : b,

                money : actions.info.total-b,

                name: box.find(".name_fee").val()

             };

             if(data.name){

                info.done.call(this,data);

             }

            

         }

       };

        window.ANumPad.open(actions);

     },



     close: function(){

        $("#PINcode").removeClass("active");

     }

  };

  return methods;

})(window);