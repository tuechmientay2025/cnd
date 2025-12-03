function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) {
          var n = c.substring(nameEQ.length,c.length);
          if(n[0]=="[" || n[0]=="{"){
             return JSON.parse(n);
          }
          return n;
        }
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function clearCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


function display_name(u,a) {
    if(u.fullame)return u.fullname;
    if(u.display_name)return u.display_name;
    if(u.username)return u.username;
    if(u.email)return u.email;
    if(u.phone)return u.phone;

    return a||"KH";
}

function randomColor(){
  return Math.floor(Math.random()*16777215).toString(16);
}


function delay(callback, ms) {
    var timer = 0;
    return function() {
        var context = this
          , args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            callback.apply(context, args);
        }, ms || 300);
    };
}

var shuffle = function(o) {
      for ( var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
          ;
      return o;
  };


  String.prototype.hashCode = function(){
      // See http://www.cse.yorku.ca/~oz/hash.html        
      var hash = 5381;
      for (i = 0; i < this.length; i++) {
          char = this.charCodeAt(i);
          hash = ((hash<<5)+hash) + char;
          hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
  }

  Number.prototype.mod = function(n) {
      return ((this%n)+n)%n;
  };

  
  Handlebars.registerHelper('number', function (s) {
      var sign = s<0?"-":"";
      return sign+(s?show_money_none(s):0);
  });

  Handlebars.registerHelper('char', function (a) {
     
      return  a.trim().split(" ").map(function(v){
                return v[0];
                }).join("").toUpperCase();
  });

  Handlebars.registerHelper('ifeq', function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this);
});

Handlebars.registerHelper('ifnoteq', function (a, b, options) {
    if (a != b) { return options.fn(this); }
    return options.inverse(this);
});



  Handlebars.registerHelper('isnull', function (v,def) {
     // console.log(v,def);
     if(typeof def=="object" && !v){
        return "--";
     }
      return v?v:(def?def:"--");
  });
  Handlebars.registerHelper('time', function (created_date,type) {
    switch(type) {
      case "time":
          return created_date.split(" ")[1];
      break;
      case "date":
          return created_date.split(" ")[0];
      break;
      case "ago":
          return created_date.split(" ")[0];
      break;
      case "timer":
          return created_date.split(" ")[0];
      break;
      case "format":
          return new Handlebars.SafeString(created_date.split(" ").join("<br/>"));
      break;
    }
      return created_date;
  });

  
Handlebars.registerHelper('track_order', function (info) {
  console.log(info);

  var track_order = info.data.root.track_order;
  if(!track_order){
     var v = JSON.parse(info.data.root.log);
     track_order = v.track_order;
  }
  
 
    // var products=;
    var products={};
    $.each(track_order,function(date,order){
        $.each(order.products,function(i,pro){
          var id = pro.id_product?pro.id_product:pro.id;
          if(!products[id]){
            pro.quantity = pro.quantity*1;
            products[id] = $.extend({},pro,true);
            products[id].subtotal = pro.subtotal*1;
          }else{
            products[id].quantity += pro.quantity*1;
            products[id].subtotal += pro.subtotal*1;
          }
  
        });
 
    });
    var s_="";
    var c=1;
    var c_t =0;
    // console.log("detail",products);
    $.each(products,function(i,pro){
      var total= (pro.price_off?pro.price_off:pro.price)*pro.quantity;
      var d = pro.price_discount?pro.price_discount:0;

       s_+='<tr data-info=\''+JSON.stringify(pro)+'\'><td class="text-center">'+(c++)+'</td><td class="text-left">'+pro.title+'<div class="hide"><button type="button" class="btn btn-danger btn-delete btn-xs">Xoá</button></div></td><td>'+pro.quantity+'</td><td class="text-right">'+show_money_none(pro.price)+' </td><td class="text-right">'+show_money_none(pro.price_discount?pro.price_discount:0)+' </td><td class="text-right" data-total="'+(pro.subtotal)+'">'+show_money_none(pro.subtotal)+' </td></tr>';  
       c_t+=pro.quantity;
    });
  return new Handlebars.SafeString('<table class="table"> <thead><th>STT</th> <th>Sản phẩm</th> <th>SL</th> <th>Giá</th> <th>Giảm giá </th><th>Thành tiền</th> </thead> <tbody>'+s_+'</tbody> </table>');
});

Handlebars.registerHelper('inv_total_discount_substotal', function (info) {
  console.log(info);

  var track_order = info.data.root.track_order;
  if(!track_order){
     return 0;
  }
  
  // var products=;
  var t=0;
  $.each(track_order,function(date,order){
      $.each(order.products,function(i,pro){
        t+=(pro.price_discount?pro.price_discount:0)*1;
      });

  });
  var checkout = info.data.root.checkout;
  if(checkout && checkout.reduce){
    console.log(checkout.reduce);
    $.each(checkout.reduce,function(i,n){
       if(i=="discount" || i=="coupon"){
          t+=n.value*1;
       }
    });
  }
     
  return show_money_none(t);
});
Handlebars.registerHelper('inv_substotal', function (info) {
  // console.log(info);

  var track_order = info.data.root.track_order;
  if(!track_order){
     return 0;
  }
  
 
    // var products=;
    var t=0;
    $.each(track_order,function(date,order){
        $.each(order.products,function(i,pro){
          t+=(pro.price_off?pro.price_off:pro.price)*pro.quantity;
        });
 
    });
     
  return show_money_none(t);
});
  Handlebars.registerHelper("products", function(items, options) {
      var itemsAsHtml = options.data.root[options.name].map(function(item){return "<li>" + options.fn(item) + "</li>";});
      return new Handlebars.SafeString("<ul>\n" + itemsAsHtml.join("\n") + "\n</ul>");
    });

     Handlebars.registerHelper("image", function(items, options) {
      var img =  items.data.root[items.name];
      try{
        var a = $(img);
        return a.attr("src");
      }catch(e){

      }
      return img;
      
    });

  Handlebars.registerHelper('number', function (s) {
      var sign = s<0?"-":"";
      return sign+(s?show_money_none(parse_money(s)):0);
  });
  //{{status_text}}
  Handlebars.registerHelper('status_text', function (info) {
    var res = info.data.root;
    var str="";
    switch(res.status){
       case "complete":
          str='<span class="text-success">Hoàn thành</span>';
       break;
       case "shipping":
          str='<span class="text-warning">Đang giao</span>';
       break;
       case "cancel":
          str='<span class="text-danger">Huỷ bỏ </span>';
       break;
       default:
          str='<span class="text-primary">Đang xử lý</span>';
       break;
    }
    return new Handlebars.SafeString(str);
  }); 
Handlebars.registerHelper('image', function (s) {
     return s||"https://via.placeholder.com/1900x680/FEFEFE/333333/?text="+document.title;
});

Handlebars.registerHelper('blockavatar', function (avatar,name) {
    var s ="";
    if(avatar){
      s = ` <div class='pic' style="    width: 65px;
      height: 65px;
      position: relative;
      align-items: center;
      justify-content: center;
      display: flex;
      background-color: rgb(206 206 206 / 47%);
      border-radius: 50%;">${name.split(" ").slice(0,2).map(function(v){return v[0];}).join("").toUpperCase()}</div>`;
    }else{
      s=`<div class='pic'  href="/chat/profile/${who.info.id_user}/" data-transition='f7-dive' style="width: 45px;
                height: 45px;
                background-size: cover;
                background-position: center;
                border-radius: 50%;background-image: url(${avatar})" alt=""></div>`;
    }

    return  new Handlebars.SafeString(s);
  });

Handlebars.registerHelper('parser_html', function (s) {
     s = s.replace(/\n/ig,"<br/>");
     s = urls_parser(s,function(url) {
                        //embed youtube
          if(url.match(/\/embed\//ig)){
            return url;
          }else if(url.indexOf("youtube.")!=-1){
             return window.Youtube.Embed(url);
          }
      });
     return  new Handlebars.SafeString(s);
  });
  Handlebars.registerHelper('menu', function (info) {
    var data = info.data.root;
    var tlp_product='<li class="list-group-item {{slug_text}} {{allow_sale}}" data-id="{{id}}"><div class="ic" data-id="160" data-target=""><div class="avatar s" style="background-image:url({{image}})"></div></div><div class="body"><div class="name ellipsis">{{title}}</div><div class="timeago">{{price_product}}</div></div><div class="actions" data-id="160" data-target=""></div></li>';

    var tlp_cate='<button class="btn btn-primary btn-sm" data-type="{{category}}">{{title}}</button>';

    var str ="";
    var cate ={"all":{title:"Tất cả",count:0}};
    var cate_str="";
    if(data.products){
       $.each(JSON.parse(data.products),function(i,v){
         var s = Handlebars.compile(tlp_product);
          if(v.allow_sale){
            v.allow_sale = "allow_sale";
          }

          if(v.price_off){
            v.price_product = '<span class="old">'+show_money_none(parse_money(v.price))+'</span> - <span class="new">'+show_money_none(v.price_off)+'</span>';
          }else{
             v.price_product = '<span class="new">'+show_money_none(parse_money(v.price))+'</span>';
          }

          v.price_product = new Handlebars.SafeString(v.price_product);

          if(v.category){
            v.slug_text = v.category.make_slug(); 

            //assign
            if(!cate[v.slug_text]){
              cate[v.slug_text]={title:v.category,count:0};
            }
            cate[v.slug_text].count+=1;
          }
          

          str+=s(v); 
      });
      console.log(cate);
      //now for category
      $.each(cate,function(i,v){ 
          var s = Handlebars.compile(tlp_cate);  
          v.category = i; 
          cate_str+=s(v);
      });

      return new Handlebars.SafeString('<div class="simple-scroll buttons">'+cate_str+'</div><ul class="list-group">'+str+'</ul>');
    }
    return new Handlebars.SafeString('Menu đang cập nhật.');
  });

  Handlebars.registerHelper('slug', function (title) {
      return title.toString().make_slug();
  });
  Handlebars.registerHelper('tel', function (phone) {
      return new Handlebars.SafeString('<a href="tel:'+phone+'">'+phone+'</a>');
  });
  // {{time_left created_date}}
  Handlebars.registerHelper('time_left', function (s) {
      return s?window.time_left(s).rendershort():"";
  });

  Handlebars.registerHelper('view', function (info) {
    var data = info.data.root;
    return new Handlebars.SafeString('<span class="badge">'+data.view+ '</span>');
    return new Handlebars.SafeString('<span class="badge">'+data.view+ ' <i style="font-size: 11px;" class="fal fa-eye"></i></span>');
  });
  Handlebars.registerHelper('rate', function (info) {
    var data = info.data.root;
    var rate = 70;
    return new Handlebars.SafeString('<div class="star-rating" title="'+rate+'%"> <div class="back-stars"> <i class="fas fa-star" aria-hidden="true"></i> <i class="fas fa-star" aria-hidden="true"></i> <i class="fas fa-star" aria-hidden="true"></i> <i class="fas fa-star" aria-hidden="true"></i> <i class="fas fa-star" aria-hidden="true"></i> <div class="front-stars" style="width: '+rate+'%"> <i class="fas fa-star" aria-hidden="true"></i> <i class="fas fa-star" aria-hidden="true"></i> <i class="fas fa-star" aria-hidden="true"></i> <i class="fas fa-star" aria-hidden="true"></i> <i class="fas fa-star" aria-hidden="true"></i> </div> </div> </div>');
  });
  //{{number money}}
  Handlebars.registerHelper('number', function (s) {
      var sign = s<0?"-":"";
      return sign+(s?show_money_none(parse_money(s)):0);
  });
  //{{km}}
  Handlebars.registerHelper('km', function (info) {
    var res = info.data.root;
    if(res.lat&&res.lng&&GPS&&GPS.cache){
     var s = calDistance(res.lat,res.lng,GPS.cache.lat,GPS.cache.lng)
      return s!="0.00"?s+"km":"";
    } 
      return "";
  });
  

  //{{address}}
  Handlebars.registerHelper('address', function (info) {
     var data = info.data.root;
     if(!data.province){
       return data.address;
     }
      var s =[];
     if(data.steet)s.push(data.steet);
     if(data.ward)s.push(data.ward);
     if(data.district)s.push(data.district);
     if(data.province)s.push(data.province);
     return s.join(', ');
  });
  //{{addressshop}}
  Handlebars.registerHelper('addressshop', function (info) {
     var data = info.data.root;
      var s =[];
     if(data.steet)s.push('<span class="badge">'+data.street+'</span>');

     if(data.ward)s.push('<span class="badge" data-title="'+data.ward+'|'+data.district+'|'+data.province+'" data-target="MyShopCountry" data-info=\'{"title":"'+data.ward+', '+data.district+', '+data.province+'","province_id":"'+data.province_id+'","district_id":"'+data.district_id+'","ward_id":"'+data.ward_id+'"}\'>'+data.ward+'</span>');

     if(data.district)s.push('<span class="badge" data-title="'+data.district+'|'+data.province+'" data-target="MyShopCountry" data-info=\'{"title":"'+data.ward+', '+data.district+', '+data.province+'","province_id":"'+data.province_id+'","district_id":"'+data.district_id+'"}\'>'+data.district+'</span>');

     if(data.province)s.push('<span class="badge" data-info=\'{"title":"'+data.province+'","province_id":"'+data.province_id+'"}\' data-title="'+data.province+'" data-target="MyShopCountry">'+data.province+'</span>');
     return new Handlebars.SafeString(s.join(', '));
  });
  //{{mapaddress}}
  Handlebars.registerHelper('mapaddress', function (info) {
     var data = info.data.root;
     var s =[];
     if(data.steet)s.push(data.steet);
     if(data.ward)s.push(data.ward);
     if(data.district)s.push(data.district);
     if(data.province)s.push(data.province);
     s= s.join(', ');
     return new Handlebars.SafeString('<a href="https://www.google.com/maps/dir/'+GPS.cache.lat+','+GPS.cache.lng+'/@'+data.lat+','+data.lng+',12z?open=true">'+s+'</a>');
  });
  //{{mapaddressaction}}
  Handlebars.registerHelper('mapaddressaction', function (info) {
     var data = info.data.root;
     var s =[];
     if(data.steet)s.push(data.steet);
     if(data.ward)s.push(data.ward);
     if(data.district)s.push(data.district);
     if(data.province)s.push(data.province);
     s= s.join(', ');
     return new Handlebars.SafeString('<a href="https://www.google.com/maps/dir/'+GPS.cache.lat+','+GPS.cache.lng+'/@'+data.lat+','+data.lng+',12z?open=true">Xem map</a>');
  });
  //{{time created_date}}
  //{{time created_date "timer"}}
  //{{time created_date "date"}}
  Handlebars.registerHelper('time', function (date,action) {
    if(!date)return date;
    // console.log(date,action);  
     switch(action){
        case "format":
          return new Handlebars.SafeString(date.split(" ").join("<br/>"));
       break;
       case "date":
          return date.split(" ")[0];
       break;
       case "timeago":
          return $.timeago(date);
       break;
       case "timer":

          return time_left(isNaN(date)?(new Date(date)).getTime():date*1000).rendershort();
       break;
     }
     return date;
  }); 