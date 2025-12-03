window.CURRENCY= "$";
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
  return price.toString().replace(/[^0-9\.\-]/ig,"").replace(",","");
}
function show_money_none(price,thousand,decimal){
  if(!thousand) thousand=",";
  if(decimal===undefined) decimal=0;
  price = price.toString();
  var a = parse_money(price);
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