function format_money(price, decimal) {
    if (decimal === undefined)
        decimal = 0;
    price = price.toString();
    var a = price.replace(/[^0-9\.]/ig, "");
    return decimal ? parseFloat(a).toFixed(decimal) : a;
}
function money_split(price, thousand) {
    if (!thousand)
        thousand = ",";
    price = price.split('').reverse().join('');
    var i = 0;
    var res = [];
    while (i < price.length) {
        res.push(price.slice(i, i + 3));
        i += 3;
    }
    return res.join(thousand).split("").reverse().join("");
}

function parse_money(price) {
    if(!price)return "0";
    return price.toString().replace(/[^0-9\.\-]/ig, "");
}
function show_money_none(price, thousand, decimal) {
    price = parse_money(price);
    if (!thousand)
        thousand = ",";
    if (decimal === undefined)
        decimal = 0;
    price = price.toString();
    var a = price.replace(/[^0-9\.]/ig, "");
    if (a.length <= 3) {
        return format_money(a);
    }
    //spilt
    a = format_money(a, decimal);
    if (a.indexOf('.') != -1) {
        var left = a.substr(0, a.indexOf('.'));
        var right = a.substr(a.indexOf('.') + 1);
        if (left.length <= 3) {
            return left + "." + right;
        }
        return money_split(left) + "." + right;
    }
    return money_split(price);
}

function show_money(price, thousand, decimal) {
    if (!price)
        return price;
    if (!thousand)
        thousand = ",";
    if (decimal === undefined)
        decimal = 0;
    price = price.toString();
    var a = price.replace(/[^0-9\.]/ig, "");
    if (a.length <= 3) {
        return format_money(a) + CURRENCY;
    }

    //spilt
    a = format_money(a, decimal);
    if (a.indexOf('.') != -1) {
        var left = a.substr(0, a.indexOf('.'));
        var right = a.substr(a.indexOf('.') + 1);
        if (left.length <= 3) {
            return left + "." + right ;
        }
        return money_split(left) + "." + right ;
    }
    return "" + money_split(a) ;
}

var make_slug=function(){var e=function(u,e){return"string"!=typeof u?u:(e||(e="-"),function(u){var e={A:/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g,AA:/[\uA732]/g,AE:/[\u00C6\u01FC\u01E2]/g,AO:/[\uA734]/g,AU:/[\uA736]/g,AV:/[\uA738\uA73A]/g,AY:/[\uA73C]/g,B:/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g,C:/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g,D:/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g,DZ:/[\u01F1\u01C4]/g,Dz:/[\u01F2\u01C5]/g,E:/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g,F:/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g,G:/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g,H:/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g,I:/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g,J:/[\u004A\u24BF\uFF2A\u0134\u0248]/g,K:/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g,L:/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g,LJ:/[\u01C7]/g,Lj:/[\u01C8]/g,M:/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g,N:/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g,NJ:/[\u01CA]/g,Nj:/[\u01CB]/g,O:/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g,OI:/[\u01A2]/g,OO:/[\uA74E]/g,OU:/[\u0222]/g,P:/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g,Q:/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g,R:/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g,S:/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g,T:/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g,TZ:/[\uA728]/g,U:/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g,V:/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g,VY:/[\uA760]/g,W:/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g,X:/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g,Y:/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g,Z:/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g,a:/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g,aa:/[\uA733]/g,ae:/[\u00E6\u01FD\u01E3]/g,ao:/[\uA735]/g,au:/[\uA737]/g,av:/[\uA739\uA73B]/g,ay:/[\uA73D]/g,b:/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g,c:/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g,d:/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g,dz:/[\u01F3\u01C6]/g,e:/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g,f:/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g,g:/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g,h:/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g,hv:/[\u0195]/g,i:/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g,j:/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g,k:/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g,l:/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g,lj:/[\u01C9]/g,m:/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g,n:/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g,nj:/[\u01CC]/g,o:/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g,oi:/[\u01A3]/g,ou:/[\u0223]/g,oo:/[\uA74F]/g,p:/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g,q:/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g,r:/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g,s:/[\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g,ss:/[\u00DF]/g,t:/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g,tz:/[\uA729]/g,u:/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g,v:/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g,vy:/[\uA761]/g,w:/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g,x:/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g,y:/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g,z:/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g};for(var t in e)u=u.replace(e[t],t);return u}(u.toLowerCase()).replace(/[^0-9a-zA-Z]/gi," ").replace(/\s+/g,e))};return String.prototype.make_slug=function(u){return e(String(this),u)},e}();
String.prototype.loadJS = function(f,defer) {
    loadJS(String(this), f || function() {},defer
    );
};
String.prototype.loadCSS = function(f) {
    loadCSS(String(this), f || function() {}
    );
};
window.MyLibrary = {};
window.loadJS = function(e, t,defer) {
    if (window.MyLibrary[e])
        t();
    else {
        var n = document.createElement("script");
        n.src = e;
        if(defer){
            n.defer = "defer";
        }
        n.async = !0,
        n.onload = function() {
            window.MyLibrary[e] = e,
            t instanceof Function && t()
        }
        ,
        n.onreadystatechange = function() {
            t instanceof Function && t()
        }
        ,
        document.getElementsByTagName("head")[0].appendChild(n)
    }
};
window.loadCSS = function(e, t) {
    if (window.MyLibrary[e])
        t instanceof Function && t();
    else {
        var n = document.createElement("link");
        n.setAttribute("rel", "stylesheet"),
        n.setAttribute("type", "text/css"),
        n.setAttribute("href", e),
        n.setAttribute("async", !0),
        n.onload = function() {
            window.MyLibrary[e] = e,
            t instanceof Function && t()
        }
        ,
        n.onreadystatechange = function() {
            t instanceof Function && t()
        }
        ,
        document.getElementsByTagName("head")[0].appendChild(n)
    }
};
function md5(inputString) {
    var hc="0123456789abcdef";
    function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
    function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
    function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
    function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
    function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
    function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
    function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
    function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
    function sb(x) {
        var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
        for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
        blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
    }
    var i,x=sb(""+inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
    for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
        a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
        b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
        c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
        d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
        a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
        b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
        c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
        d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
        a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
        b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
        c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
        d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
        a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
        b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
        c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
        d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
        a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
        b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
        c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
        d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
        a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
        b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
    }
    return rh(a)+rh(b)+rh(c)+rh(d);
}

(function(win,key){
    var mixedcache= win.localStorage.getItem(key);
    try{
        mixedcache = JSON.parse(mixedcache);
    }catch(e){}
    if(!mixedcache){
        mixedcache = {};
    }
     
    // if(!document.location.pathname.includes("/wp-admin/")){
    //      jQuery.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    //        if (originalOptions.url.includes("/wp-admin/admin-ajax")) {
    //         // if (options.cache) {
    //             var success = originalOptions.success || function(){},
    //                 url = originalOptions.url;
                    
    //             options.mixed_data = md5(url+"_"+(typeof originalOptions.data==="object"?JSON.stringify(originalOptions.data):originalOptions.data));
            
    //             options.cache = false; //remove jQuery cache as we have our own localStorage
    //             options.beforeSend = function () {
    //                 if (mixedcache[this.mixed_data]) {
    //                     success(mixedcache[this.mixed_data]);
    //                     // return false;
    //                 }
    //                 // return true;
    //             };
    //             options.success = function (data, textStatus) {
    //                 try{
    //                     var b = JSON.parse(data);
    //                     mixedcache[this.mixed_data] = b;
    //                 }catch(e){}
                   

    //                 win.localStorage.setItem(key, JSON.stringify(mixedcache));
    //                 var responseData = data?(typeof data==="object"?JSON.stringify(data):data.toString()):"";
                    
    //                 if (typeof success ==="function") success(data,textStatus);
    //             };
    //         // }
    //             }
    //     });
    // }
})(window,"a"+document.location.host.replace(".",""));

window.wpajax = function(ac,data,f) {
  if(typeof data=="function"){
    f = data;
    data = {};
  }
  if(f){
      jQuery.ajax({
        url: "/wp-admin/admin-ajax.php?action="+ac,
        async: true,  
        type:"POST",
        data: data||{},
        success: function (json) {
          try{
              json= JSON.parse(json);
          }catch(e){
              
          }
          f(json); 
        },
        error: function(a,b,c){
            this.success(a.responseText);
        }
      });
      return;
  }
  return new Promise(function(ok,no){
      jQuery.ajax({
        url: "/wp-admin/admin-ajax.php?action="+ac,
        async: true,  
        data: data||{},
        type:"POST",
        success: function (json) {
          try{
              json= JSON.parse(json);
          }catch(e){
              
          } 
          ok(json);
        },
        error: function(a,b,c){
            this.success(a.responseText);
        }
      }); 
  });
  
}
window.$ = jQuery;
setTimeout(function(){
     
    /*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){if(a(b.target).is(this))return b.handleObj.handler.apply(this,arguments)}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.7",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a("#"===f?[]:f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.7",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c).prop(c,!0)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c).prop(c,!1))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target).closest(".btn");b.call(d,"toggle"),a(c.target).is('input[type="radio"], input[type="checkbox"]')||(c.preventDefault(),d.is("input,button")?d.trigger("focus"):d.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(a>this.$items.length-1||a<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.7",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.7",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){document===a.target||this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue())return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);if(this.$element.trigger(g),!g.isDefaultPrevented())return f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.7",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.7",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){
this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.7",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return e<c&&"top";if("bottom"==this.affixed)return null!=c?!(e+this.unpin<=f.top)&&"bottom":!(e+g<=a-d)&&"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&e<=c?"top":null!=d&&i+j>=a-d&&"bottom"},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
    !function(t,e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):t.bootbox=e(t.jQuery)}(this,function e(c,p){"use strict";var r,n,i,l;Object.keys||(Object.keys=(r=Object.prototype.hasOwnProperty,n=!{toString:null}.propertyIsEnumerable("toString"),l=(i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"]).length,function(t){if("function"!=typeof t&&("object"!=typeof t||null===t))throw new TypeError("Object.keys called on non-object");var e,o,a=[];for(e in t)r.call(t,e)&&a.push(e);if(n)for(o=0;o<l;o++)r.call(t,i[o])&&a.push(i[o]);return a}));var u={};u.VERSION="5.5.2";var s={en:{OK:"OK",CANCEL:"Cancel",CONFIRM:"OK"}},d={dialog:'<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="bootbox-body"></div></div></div></div></div>',header:'<div class="modal-header"><h5 class="modal-title"></h5></div>',footer:'<div class="modal-footer"></div>',closeButton:'<button type="button" class="bootbox-close-button close" aria-hidden="true">&times;</button>',form:'<form class="bootbox-form"></form>',button:'<button type="button" class="btn"></button>',option:"<option></option>",promptMessage:'<div class="bootbox-prompt-message"></div>',inputs:{text:'<input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />',textarea:'<textarea class="bootbox-input bootbox-input-textarea form-control"></textarea>',email:'<input class="bootbox-input bootbox-input-email form-control" autocomplete="off" type="email" />',select:'<select class="bootbox-input bootbox-input-select form-control"></select>',checkbox:'<div class="form-check checkbox"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>',radio:'<div class="form-check radio"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',date:'<input class="bootbox-input bootbox-input-date form-control" autocomplete="off" type="date" />',time:'<input class="bootbox-input bootbox-input-time form-control" autocomplete="off" type="time" />',number:'<input class="bootbox-input bootbox-input-number form-control" autocomplete="off" type="number" />',password:'<input class="bootbox-input bootbox-input-password form-control" autocomplete="off" type="password" />',range:'<input class="bootbox-input bootbox-input-range form-control-range" autocomplete="off" type="range" />'}},b={locale:"en",backdrop:"static",animate:!0,className:null,closeButton:!0,show:!0,container:"body",value:"",inputType:"text",swapButtonOrder:!1,centerVertical:!1,multiple:!1,scrollable:!1,reusable:!1};function f(t,e,o){return c.extend(!0,{},t,function(t,e){var o=t.length,a={};if(o<1||2<o)throw new Error("Invalid argument length");return 2===o||"string"==typeof t[0]?(a[e[0]]=t[0],a[e[1]]=t[1]):a=t[0],a}(e,o))}function m(t,e,o,a){a&&a[0]&&(i=a[0].locale||b.locale,(a[0].swapButtonOrder||b.swapButtonOrder)&&(e=e.reverse()));var r,n,i={className:"bootbox-"+t,buttons:function(t,e){for(var o={},a=0,r=t.length;a<r;a++){var n=t[a],i=n.toLowerCase(),n=n.toUpperCase();o[i]={label:function(t,e){e=s[e];return(e||s.en)[t]}(n,e)}}return o}(e,i)};return o=f(i,a,o),n={},w(r=e,function(t,e){n[e]=!0}),w(o.buttons,function(t){if(n[t]===p)throw new Error('button key "'+t+'" is not allowed (options are '+r.join(" ")+")")}),o}function h(t){return Object.keys(t).length}function w(t,o){var a=0;c.each(t,function(t,e){o(t,e,a++)})}function g(t){t.data.dialog.find(".bootbox-accept").first().trigger("focus")}function v(t){t.target===t.data.dialog[0]&&t.data.dialog.remove()}function y(t){t.target===t.data.dialog[0]&&(t.data.dialog.off("escape.close.bb"),t.data.dialog.off("click"))}function x(t,e,o){t.stopPropagation(),t.preventDefault(),c.isFunction(o)&&!1===o.call(e,t)||e.modal("hide")}function k(t){return/([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(t)}function E(t){return/(\d{4})-(\d{2})-(\d{2})/.test(t)}return u.locales=function(t){return t?s[t]:s},u.addLocale=function(t,o){return c.each(["OK","CANCEL","CONFIRM"],function(t,e){if(!o[e])throw new Error('Please supply a translation for "'+e+'"')}),s[t]={OK:o.OK,CANCEL:o.CANCEL,CONFIRM:o.CONFIRM},u},u.removeLocale=function(t){if("en"===t)throw new Error('"en" is used as the default and fallback locale and cannot be removed.');return delete s[t],u},u.setLocale=function(t){return u.setDefaults("locale",t)},u.setDefaults=function(){var t={};return 2===arguments.length?t[arguments[0]]=arguments[1]:t=arguments[0],c.extend(b,t),u},u.hideAll=function(){return c(".bootbox").modal("hide"),u},u.init=function(t){return e(t||c)},u.dialog=function(t){if(c.fn.modal===p)throw new Error('"$.fn.modal" is not defined; please double check you have included the Bootstrap JavaScript library. See https://getbootstrap.com/docs/4.4/getting-started/javascript/ for more details.');t=function(a){var r,n;if("object"!=typeof a)throw new Error("Please supply an object of options");if(!a.message)throw new Error('"message" option must not be null or an empty string.');(a=c.extend({},b,a)).backdrop?a.backdrop="string"!=typeof a.backdrop||"static"!==a.backdrop.toLowerCase()||"static":a.backdrop=!1!==a.backdrop&&0!==a.backdrop&&"static";a.buttons||(a.buttons={});return r=a.buttons,n=h(r),w(r,function(t,e,o){if(c.isFunction(e)&&(e=r[t]={callback:e}),"object"!==c.type(e))throw new Error('button with key "'+t+'" must be an object');e.label||(e.label=t),e.className||(t=!1,t=a.swapButtonOrder?0===o:o===n-1,e.className=n<=2&&t?"btn-primary":"btn-secondary btn-default")}),a}(t),c.fn.modal.Constructor.VERSION?(t.fullBootstrapVersion=c.fn.modal.Constructor.VERSION,i=t.fullBootstrapVersion.indexOf("."),t.bootstrap=t.fullBootstrapVersion.substring(0,i)):(t.bootstrap="2",t.fullBootstrapVersion="2.3.2",console.warn("Bootbox will *mostly* work with Bootstrap 2, but we do not officially support it. Please upgrade, if possible."));var o=c(d.dialog),e=o.find(".modal-dialog"),a=o.find(".modal-body"),r=c(d.header),n=c(d.footer),i=t.buttons,l={onEscape:t.onEscape};if(a.find(".bootbox-body").html(t.message),0<h(t.buttons)&&(w(i,function(t,e){var o=c(d.button);switch(o.data("bb-handler",t),o.addClass(e.className),t){case"ok":case"confirm":o.addClass("bootbox-accept");break;case"cancel":o.addClass("bootbox-cancel")}o.html(e.label),n.append(o),l[t]=e.callback}),a.after(n)),!0===t.animate&&o.addClass("fade"),t.className&&o.addClass(t.className),t.size)switch(t.fullBootstrapVersion.substring(0,3)<"3.1"&&console.warn('"size" requires Bootstrap 3.1.0 or higher. You appear to be using '+t.fullBootstrapVersion+". Please upgrade to use this option."),t.size){case"small":case"sm":e.addClass("modal-sm");break;case"large":case"lg":e.addClass("modal-lg");break;case"extra-large":case"xl":e.addClass("modal-xl"),t.fullBootstrapVersion.substring(0,3)<"4.2"&&console.warn('Using size "xl"/"extra-large" requires Bootstrap 4.2.0 or higher. You appear to be using '+t.fullBootstrapVersion+". Please upgrade to use this option.")}if(t.scrollable&&(e.addClass("modal-dialog-scrollable"),t.fullBootstrapVersion.substring(0,3)<"4.3"&&console.warn('Using "scrollable" requires Bootstrap 4.3.0 or higher. You appear to be using '+t.fullBootstrapVersion+". Please upgrade to use this option.")),t.title&&(a.before(r),o.find(".modal-title").html(t.title)),t.closeButton&&(r=c(d.closeButton),t.title?3<t.bootstrap?o.find(".modal-header").append(r):o.find(".modal-header").prepend(r):r.prependTo(a)),t.centerVertical&&(e.addClass("modal-dialog-centered"),t.fullBootstrapVersion<"4.0.0"&&console.warn('"centerVertical" requires Bootstrap 4.0.0-beta.3 or higher. You appear to be using '+t.fullBootstrapVersion+". Please upgrade to use this option.")),t.reusable||o.one("hide.bs.modal",{dialog:o},y),t.onHide){if(!c.isFunction(t.onHide))throw new Error('Argument supplied to "onHide" must be a function');o.on("hide.bs.modal",t.onHide)}if(t.reusable||o.one("hidden.bs.modal",{dialog:o},v),t.onHidden){if(!c.isFunction(t.onHidden))throw new Error('Argument supplied to "onHidden" must be a function');o.on("hidden.bs.modal",t.onHidden)}if(t.onShow){if(!c.isFunction(t.onShow))throw new Error('Argument supplied to "onShow" must be a function');o.on("show.bs.modal",t.onShow)}if(o.one("shown.bs.modal",{dialog:o},g),t.onShown){if(!c.isFunction(t.onShown))throw new Error('Argument supplied to "onShown" must be a function');o.on("shown.bs.modal",t.onShown)}return!0===t.backdrop&&o.on("click.dismiss.bs.modal",function(t){o.children(".modal-backdrop").length&&(t.currentTarget=o.children(".modal-backdrop").get(0)),t.target===t.currentTarget&&o.trigger("escape.close.bb")}),o.on("escape.close.bb",function(t){l.onEscape&&x(t,o,l.onEscape)}),o.on("click",".modal-footer button:not(.disabled)",function(t){var e=c(this).data("bb-handler");e!==p&&x(t,o,l[e])}),o.on("click",".bootbox-close-button",function(t){x(t,o,l.onEscape)}),o.on("keyup",function(t){27===t.which&&o.trigger("escape.close.bb")}),c(t.container).append(o),o.modal({backdrop:t.backdrop,keyboard:!1,show:!1}),t.show&&o.modal("show"),o},u.alert=function(){var t=m("alert",["ok"],["message","callback"],arguments);if(t.callback&&!c.isFunction(t.callback))throw new Error('alert requires the "callback" property to be a function when provided');return t.buttons.ok.callback=t.onEscape=function(){return!c.isFunction(t.callback)||t.callback.call(this)},u.dialog(t)},u.confirm=function(){var t=m("confirm",["cancel","confirm"],["message","callback"],arguments);if(!c.isFunction(t.callback))throw new Error("confirm requires a callback");return t.buttons.cancel.callback=t.onEscape=function(){return t.callback.call(this,!1)},t.buttons.confirm.callback=function(){return t.callback.call(this,!0)},u.dialog(t)},u.prompt=function(){var e,r,t,o=c(d.form),n=m("prompt",["cancel","confirm"],["title","callback"],arguments);if(n.value||(n.value=b.value),n.inputType||(n.inputType=b.inputType),t=(n.show===p?b:n).show,n.show=!1,n.buttons.cancel.callback=n.onEscape=function(){return n.callback.call(this,null)},n.buttons.confirm.callback=function(){var t;if("checkbox"===n.inputType)t=r.find("input:checked").map(function(){return c(this).val()}).get();else if("radio"===n.inputType)t=r.find("input:checked").val();else{if(r[0].checkValidity&&!r[0].checkValidity())return!1;t="select"===n.inputType&&!0===n.multiple?r.find("option:selected").map(function(){return c(this).val()}).get():r.val()}return n.callback.call(this,t)},!n.title)throw new Error("prompt requires a title");if(!c.isFunction(n.callback))throw new Error("prompt requires a callback");if(!d.inputs[n.inputType])throw new Error("Invalid prompt type");switch(r=c(d.inputs[n.inputType]),n.inputType){case"text":case"textarea":case"email":case"password":r.val(n.value),n.placeholder&&r.attr("placeholder",n.placeholder),n.pattern&&r.attr("pattern",n.pattern),n.maxlength&&r.attr("maxlength",n.maxlength),n.required&&r.prop({required:!0}),n.rows&&!isNaN(parseInt(n.rows))&&"textarea"===n.inputType&&r.attr({rows:n.rows});break;case"date":case"time":case"number":case"range":if(r.val(n.value),n.placeholder&&r.attr("placeholder",n.placeholder),n.pattern&&r.attr("pattern",n.pattern),n.required&&r.prop({required:!0}),"date"!==n.inputType&&n.step){if(!("any"===n.step||!isNaN(n.step)&&0<parseFloat(n.step)))throw new Error('"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.');r.attr("step",n.step)}!function(t,e,o){var a=!1,r=!0,n=!0;if("date"===t)e===p||(r=E(e))?o===p||(n=E(o))||console.warn('Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your max value may not be enforced by this browser.'):console.warn('Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your min value may not be enforced by this browser.');else if("time"===t){if(e!==p&&!(r=k(e)))throw new Error('"min" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.');if(o!==p&&!(n=k(o)))throw new Error('"max" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.')}else{if(e!==p&&isNaN(e))throw r=!1,new Error('"min" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-min for more information.');if(o!==p&&isNaN(o))throw n=!1,new Error('"max" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.')}if(r&&n){if(o<=e)throw new Error('"max" must be greater than "min". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.');a=!0}return a}(n.inputType,n.min,n.max)||(n.min!==p&&r.attr("min",n.min),n.max!==p&&r.attr("max",n.max));break;case"select":var i={},a=n.inputOptions||[];if(!c.isArray(a))throw new Error("Please pass an array of input options");if(!a.length)throw new Error('prompt with "inputType" set to "select" requires at least one option');n.placeholder&&r.attr("placeholder",n.placeholder),n.required&&r.prop({required:!0}),n.multiple&&r.prop({multiple:!0}),w(a,function(t,e){var o=r;if(e.value===p||e.text===p)throw new Error('each option needs a "value" property and a "text" property');e.group&&(i[e.group]||(i[e.group]=c("<optgroup />").attr("label",e.group)),o=i[e.group]);var a=c(d.option);a.attr("value",e.value).text(e.text),o.append(a)}),w(i,function(t,e){r.append(e)}),r.val(n.value);break;case"checkbox":var l=c.isArray(n.value)?n.value:[n.value];if(!(a=n.inputOptions||[]).length)throw new Error('prompt with "inputType" set to "checkbox" requires at least one option');r=c('<div class="bootbox-checkbox-list"></div>'),w(a,function(t,o){if(o.value===p||o.text===p)throw new Error('each option needs a "value" property and a "text" property');var a=c(d.inputs[n.inputType]);a.find("input").attr("value",o.value),a.find("label").append("\n"+o.text),w(l,function(t,e){e===o.value&&a.find("input").prop("checked",!0)}),r.append(a)});break;case"radio":if(n.value!==p&&c.isArray(n.value))throw new Error('prompt with "inputType" set to "radio" requires a single, non-array value for "value"');if(!(a=n.inputOptions||[]).length)throw new Error('prompt with "inputType" set to "radio" requires at least one option');r=c('<div class="bootbox-radiobutton-list"></div>');var s=!0;w(a,function(t,e){if(e.value===p||e.text===p)throw new Error('each option needs a "value" property and a "text" property');var o=c(d.inputs[n.inputType]);o.find("input").attr("value",e.value),o.find("label").append("\n"+e.text),n.value!==p&&e.value===n.value&&(o.find("input").prop("checked",!0),s=!1),r.append(o)}),s&&r.find('input[type="radio"]').first().prop("checked",!0)}return o.append(r),o.on("submit",function(t){t.preventDefault(),t.stopPropagation(),e.find(".bootbox-accept").trigger("click")}),""!==c.trim(n.message)&&(a=c(d.promptMessage).html(n.message),o.prepend(a)),n.message=o,(e=u.dialog(n)).off("shown.bs.modal",g),e.on("shown.bs.modal",function(){r.focus()}),!0===t&&e.modal("show"),e},u});
       
!function(e){e(["jquery"],(function(e){return function(){var t,n,o,i=0,s="error",a="info",r="success",d="warning",l={clear:function(n,o){var i=m();t||c(i);u(n,i,o)||function(n){for(var o=t.children(),i=o.length-1;i>=0;i--)u(e(o[i]),n)}(i)},remove:function(n){var o=m();t||c(o);if(n&&0===e(":focus",n).length)return void f(n);t.children().length&&t.remove()},error:function(e,t,n){return g({type:s,iconClass:m().iconClasses.error,message:e,optionsOverride:n,title:t})},getContainer:c,info:function(e,t,n){return g({type:a,iconClass:m().iconClasses.info,message:e,optionsOverride:n,title:t})},options:{},subscribe:function(e){n=e},success:function(e,t,n){return g({type:r,iconClass:m().iconClasses.success,message:e,optionsOverride:n,title:t})},version:"2.1.2",warning:function(e,t,n){return g({type:d,iconClass:m().iconClasses.warning,message:e,optionsOverride:n,title:t})}};return l;function c(n,o){return n||(n=m()),(t=e("#"+n.containerId)).length||o&&(t=function(n){return t=e("<div/>").attr("id",n.containerId).addClass(n.positionClass).attr("aria-live","polite").attr("role","alert"),t.appendTo(e(n.target)),t}(n)),t}function u(t,n,o){var i=!(!o||!o.force)&&o.force;return!(!t||!i&&0!==e(":focus",t).length)&&(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){f(t)}}),!0)}function p(e){n&&n(e)}function g(n){var s=m(),a=n.iconClass||s.iconClass;if(void 0!==n.optionsOverride&&(s=e.extend(s,n.optionsOverride),a=n.optionsOverride.iconClass||a),!function(e,t){if(e.preventDuplicates){if(t.message===o)return!0;o=t.message}return!1}(s,n)){i++,t=c(s,!0);var r=null,d=e("<div/>"),l=e("<div/>"),u=e("<div/>"),g=e("<div/>"),h=e(s.closeHtml),v={intervalId:null,hideEta:null,maxHideTime:null},w={toastId:i,state:"visible",startTime:new Date,options:s,map:n};return n.iconClass&&d.addClass(s.toastClass).addClass(a),n.title&&(l.append(s.escapeHtml?C(n.title):n.title).addClass(s.titleClass),d.append(l)),n.message&&(u.append(s.escapeHtml?C(n.message):n.message).addClass(s.messageClass),d.append(u)),s.closeButton&&(h.addClass("toast-close-button").attr("role","button"),d.prepend(h)),s.progressBar&&(g.addClass("toast-progress"),d.prepend(g)),s.newestOnTop?t.prepend(d):t.append(d),d.hide(),d[s.showMethod]({duration:s.showDuration,easing:s.showEasing,complete:s.onShown}),s.timeOut>0&&(r=setTimeout(T,s.timeOut),v.maxHideTime=parseFloat(s.timeOut),v.hideEta=(new Date).getTime()+v.maxHideTime,s.progressBar&&(v.intervalId=setInterval(b,10))),function(){d.hover(D,O),!s.onclick&&s.tapToDismiss&&d.click(T);s.closeButton&&h&&h.click((function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&!0!==e.cancelBubble&&(e.cancelBubble=!0),T(!0)}));s.onclick&&d.click((function(e){s.onclick(e),T()}))}(),p(w),s.debug&&console&&console.log(w),d}function C(e){return null==e&&(e=""),new String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function T(t){var n=t&&!1!==s.closeMethod?s.closeMethod:s.hideMethod,o=t&&!1!==s.closeDuration?s.closeDuration:s.hideDuration,i=t&&!1!==s.closeEasing?s.closeEasing:s.hideEasing;if(!e(":focus",d).length||t)return clearTimeout(v.intervalId),d[n]({duration:o,easing:i,complete:function(){f(d),s.onHidden&&"hidden"!==w.state&&s.onHidden(),w.state="hidden",w.endTime=new Date,p(w)}})}function O(){(s.timeOut>0||s.extendedTimeOut>0)&&(r=setTimeout(T,s.extendedTimeOut),v.maxHideTime=parseFloat(s.extendedTimeOut),v.hideEta=(new Date).getTime()+v.maxHideTime)}function D(){clearTimeout(r),v.hideEta=0,d.stop(!0,!0)[s.showMethod]({duration:s.showDuration,easing:s.showEasing})}function b(){var e=(v.hideEta-(new Date).getTime())/v.maxHideTime*100;g.width(e+"%")}}function m(){return e.extend({},{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",escapeHtml:!1,target:"body",closeHtml:'<button type="button">&times;</button>',newestOnTop:!0,preventDuplicates:!1,progressBar:!1},l.options)}function f(e){t||(t=c()),e.is(":visible")||(e.remove(),e=null,0===t.children().length&&(t.remove(),o=void 0))}}()}))}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)}),toastr.options={closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,positionClass:"toast-bottom-center",preventDuplicates:!0,showDuration:"300",hideDuration:"1000",timeOut:"5000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut"};


        
        jQuery("body").append(`<link rel="stylesheet" href="https://faucet.donggiatri.com/css/kit.css?t=${Date.now()}" />
        <script src="https://faucet.donggiatri.com/js/kit.js?t=${Date.now()}" ></script>`);
        if(window.innerWidth<1015){
            $('body').append(`<style>.bads{background: url(https://placehold.co/215x325/cecece/333/png) no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;}</style>`);
    
            var l = $("#tab-description").children().length;
            var e = $("#tab-description").children().eq(Math.ceil(l/2));
            $('<div class="bads"></div>').height(window.innerHeight).width(window.innerWidth).insertAfter(e);
        }

        $(document).ready(function(){

            $("#wpbody table").wrap( "<div class='table-responsive'></div>" );

        });
        $(document).ready(function(){

    function fallbackCopyTextToClipboard(text) {

      var textArea = document.createElement("textarea");

      textArea.value = text;

      

      // Avoid scrolling to bottom

      textArea.style.top = "0";

      textArea.style.left = "0";

      textArea.style.position = "fixed";



      document.body.appendChild(textArea);

      textArea.focus();

      textArea.select();



      try {

        var successful = document.execCommand('copy');

        var msg = successful ? 'successful' : 'unsuccessful';

        console.log('Fallback: Copying text command was ' + msg);

      } catch (err) {

        console.error('Fallback: Oops, unable to copy', err);

      }



      document.body.removeChild(textArea);

    }

    if(!window.copyText){

        window.copyText = function (text) {

          if (!navigator.clipboard) {

            fallbackCopyTextToClipboard(text);

            return;

          }

          navigator.clipboard.writeText(text).then(function() {

            console.log('Async: Copying to clipboard was successful!');

          }, function(err) {

            console.error('Async: Could not copy text: ', err);

          });

        };

    }

    

    $(document).on("click","[data-copy]",function(){

      var txt = $(this).attr("data-copy");

      var message = $(this).attr("data-copy-message");

        window.copyText(txt);

        alert(message?message:'Copied');

     });

});

         //shopw image
            $(document).on("click",'body.single #content img',function() {

              var items = [];
              


               $('.body.single #content img').each(function() {
                  var me = $(this);
                  if(me.find(".type").length && me.find(".type").attr("data-url")){
                    items.push({
                        src: `<video controls playsinline>
                      <source src="${me.find(".type").attr("data-url")}">
                      Désolé, votre navigateur ne supporte pas les vidéos.
                    </video>`
                         
                      } );
                  }else{
                     items.push({
                        src: me.find(".image").attr("src"),
                        type: 'image',
                      } );
                  }
                  
              });
              
              // items.push( {
              //   src: '<div class="mfp-figure" style="visibility: visible;"><button style="top:-40px" title="Close (Esc)" type="button" class="mfp-close">×</button><figure><iframe frameborder="0" src="https://www.youtube.com/embed/snUZGstF2Ww?autoplay=1" height="350" style="width: 100%;"></iframe></figure></div>', 
              // } );
           

              // console.log(items);
              $.magnificPopup.open({
                items:items,
                mainClass: 'mfp-with-zoom',
                gallery: {
                  enabled: true },


                zoom: {
                  enabled: true,

                  duration: 300, // duration of the effect, in milliseconds
                  easing: 'ease-in-out', // CSS transition easing function

                  opener: function (openerElement) {
                    // console.log(openerElement);
                    return $("<img src='"+openerElement.src+"' />");
                    // console.log(openerElement);
                    // return openerElement.is('img') ? openerElement : openerElement.find('img');
                  } 
                }
              });

              if(items.length >1){
                setTimeout(function(){
                  $(".mfp-wrap").swipe( {
                    threshold:60,
                    //Generic swipe handler for all directions
                    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                      
                      switch(direction){
                         case "right":
                            $(".mfp-arrow-right").click();
                         break;
                         case "left":
                            $(".mfp-arrow-left").click();
                         break;
                      }
                    }
                  });
                },1000);
              }
            });




        //for product trick 
        wpajax("config",function(r){
            if(typeof r=="object"){
                wpajax.config= $.extend(wpajax.config,r,true);
            }
        });
 
},100);

 var uploadFile = (function(){
    var file_frame;
    var callback = null;
    return function (options){
        var wp_media_post_id = wp.media.model.settings.post.id; // Store the old id
        callback = options.callback;
        var set_to_post_id = options.id_post||0; // Set this
      
        if ( file_frame ) {
            // Set the post ID to what we want
            file_frame.uploader.uploader.param( 'post_id', set_to_post_id );
            // Open frame
            file_frame.open();
            return;
        } else {
            // Set the wp.media post id so the uploader grabs the ID we want when initialised
            wp.media.model.settings.post.id = set_to_post_id;
        }
        if(!file_frame){
            // Create the media frame.
            file_frame = wp.media.frames.file_frame = wp.media({
                title: 'Chọn 1 hình ảnh',
                button: {
                    text: 'Xác nhận',
                },
                multiple: false
            });
        }
        
        // When an image is selected, run a callback.
        file_frame.on( 'select', function() {
            // We set multiple to false so only get one image from the uploader
            var attachment = file_frame.state().get('selection').first().toJSON();

            if(callback){
                callback(attachment);
            }
            
            wp.media.model.settings.post.id = wp_media_post_id;
        });
        // Finally, open the modal
        file_frame.open();

        // Restore the main ID when the add media button is pressed
        jQuery( 'a.add_media' ).on( 'click', function() {
            wp.media.model.settings.post.id = wp_media_post_id;
        });
  };
})();

var uploadFiles = (function(){
    var file_frame;
    
    return function (options){
        var wp_media_post_id = wp.media.model.settings.post.id; // Store the old id
            
            var set_to_post_id = options.id_post||0; // Set this
      // If the media frame already exists, reopen it.
        if ( file_frame ) {
            // Set the post ID to what we want
            file_frame.uploader.uploader.param( 'post_id', set_to_post_id );
            // Open frame
            file_frame.open();
            return;
        } else {
            // Set the wp.media post id so the uploader grabs the ID we want when initialised
            wp.media.model.settings.post.id = set_to_post_id;
        }
        if(!file_frame){
            // Create the media frame.
            file_frame = wp.media.frames.file_frame = wp.media({
                title: 'Chọn nhiều hình ảnh',
                button: {
                    text: 'Xác nhận',
                },
                multiple: true
            });
        }
        
        // When an image is selected, run a callback.
        file_frame.on( 'select', function() {
            // We set multiple to false so only get one image from the uploader
            var attachment = file_frame.state().get('selection').first().toJSON();

            if(options.callback){
                options.callback(attachment);
            }
             
            wp.media.model.settings.post.id = wp_media_post_id;
        });
        // Finally, open the modal
        file_frame.open();
        // Restore the main ID when the add media button is pressed
        jQuery( 'a.add_media' ).on( 'click', function() {
            wp.media.model.settings.post.id = wp_media_post_id;
        });
  };
})();


(function(win){
    
        setTimeout(function(){
    //         if(win.top==win.self){
    //             var items = jQuery(".items a,.iframewindow");
    //             var l = items.length;
                

    //             function next(i){
    //                 var a = items.eq(i);
    //                 if(a.length){
    //                     iframeWindow({url:a[0].href,callback:function(){
    //                         if(i<l){
    //                             next(i+1);
    //                         }
    //                     }});
    //                 }
                    
    //             }

    //             next(0);
    //         }else{
    // //             if(jQuery(".btnbackmove").length==0){
    // //                  jQuery(`<div class="">
    // //     <a class="button btnbackmove" onclick="window.history.back()"> Quay lại</a>
    // // </div>`).prependTo('#wpbody-content');
    // //             }
               
    //         }
            var nn = win.$||win.jQuery;
            if(nn){
                nn(document).on("onBack",function(e,info){
                    if(nn(".iframewindpow.active").length){
                        //stop back
                        info.data =0;
                        nn(".iframewindpow.active").last().removeClass("active");
                    }
                });
            }
        },2*1000);
    
    var iframes ={};
    var iframeWindowload = 0;
    var lists = {};
    var history =[];
    win.iframeWindow= function (options){
         if(iframeWindowload==0){
            iframeWindowload =1;
            jQuery("body").append(`<style>
                body.iframewindowactive{
    overflow:hidden;
}
.iframewindpow {
    height: 100%;
    width: 100%;
    visibility: hidden !important;
    z-index: 10000000000000;
    -webkit-transition: .3s ease-in;
    -o-transition: .3s ease-in;
    transition: .3s ease-in;
    background-color: rgb(51 51 51 / 19%);
    -webkit-transform: translateY(100%);
    -ms-transform: translateY(100%);
    transform: translateY(100%);
}
.iframewindpow .body {
    height: 95%;
    border-radius: 24px 24px 0 0;
    padding: 0;
    width: 100%;
    background-color: #fff;
    color: #333;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}

.iframewindpow, .iframewindpow .body {
    position: absolute;
    bottom: 0;
    left: 0;
}
.iframewindpow.active {
    z-index: 10000000000001;
    visibility: visible !important;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
}
.iframewindpow .flex {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.iframewindpow .btnok {
    width: 100%;
    text-align: center;


}
.iframewindpow .ac{
        text-align: right;
    position: relative;
    right: 10px;
}
.iframewindpow iframe{
            width: 100%;
    height: 100%;
    }
            </style>`);
         }
         options = typeof options=="object"?options:{url:options};
         var id = md5(options.url);

         if(lists[id]){
            lists[id].open();
            return;
         }

        

         var frame = jQuery("#"+id);
         if(frame.length==0){
            jQuery("body").append(`<div id="${id}" class="iframewindpow">

                   <div class="body">

                     <div class="ac" style="text-align: right;">

                      <span onclick="$(this).closest('.iframewindpow').removeClass(&quot;active&quot;)">Đóng</span>

                     </div>

                     <div class="flex">
                        <iframe  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen src="${options.url}" name="${id}" />
                     </div>
                     <div>

                         <button class="btn btn-primary btnok">Chọn</button>

                     </div>

                  </div>

                </div>`);
             frame = jQuery("#"+id);   
             frame.find("iframe").load(function(){
                frame.window = this.contentWindow;
                if(options.callback)options.callback();
                if(win.ADevice){
                    var aaa = encodeURIComponent("adevice:"+JSON.stringify(ADevice));
                    frame.window.postMessage(aaa,"*");
                }
             });
         }
        frame.callbacks ={};
         var methods={
            open : function(){
                 history.push(id);
                setTimeout(function(){
                    frame.addClass("active");
                    if(frame.window){
                        frame.window.postMessage(encodeURIComponent("onfocus:"+Date.now()),"*");
                    }
                    jQuery("body").addClass("iframewindowactive");
                },500);
                return this;
            },
            close : function(){
                frame.removeClass("active");
                jQuery("body").removeClass("iframewindowactive");
                return this;
            },
            remove : function(){
                frame.remove();
                jQuery("body").removeClass("iframewindowactive");
                delete iframes["frame"+id];
                delete lists[id];
                return this;
            },
            send:function(e,data,f){
                if(frame.window){
                    data.id =e+Date.now();
                    data.bridge = "frame"+id;
                    data.ac = e;
                    data.data = data;
                    data.callback = f||function(){};
                    frame.callbacks[data.id] = data; 
                    frame.window.postMessage(encodeURIComponent(JSON.stringify(data||{})),"*");
                }
            }
         };

         iframes["frame"+id] = frame;
         lists[id] = methods;
         return methods;
     };

      win.addEventListener("message",function(e){
        var data = decodeURIComponent(e.data);
        if(typeof data =="string"&&data.includes("iframewindow:")){
            
            //check in level top 0
            if(win.top==win.self){
                var url = decodeURIComponent(data.replace("iframewindow:",""));
                // alert(document.location.href+" OK: "+url);
                iframeWindow(url).open();
            }
            
            return;   
        }
        try{
            data = JSON.parse(data);
        }catch(eee){}

        if(typeof data =="object"&& data.bridge){
            
            if(iframes[data.bridge]){
               
               //callback
               if(iframes[data.bridge].callbacks[data.id]){
                  iframes[data.bridge].callbacks[data.id].callback(data.response);
               }
       
            }
        }
    });
     /**
      * Tell sub sub iframe tel open window
      * @param  {[type]} url [description]
      * @return {[type]}     [description]
      */
     win.openWindow = function(url){
         if(win.top==win.self){
            url = decodeURIComponent(url);
            iframeWindow(url).open();
         }else{
            (win.opener||win.parent).postMessage(encodeURIComponent("iframewindow:"+url),"*");
         }
         
     };
     openWindow.reset = function(idframe){
        history=[idframe];
        $(".iframewindpow").removeClass("active");
        $("#"+idframe).removeClass("active");
     };
     openWindow.navigate = function(idframe){
        history.push(idframe);
         $("#"+idframe).addClass("active"); 
     };
     openWindow.back = function(){
        if(history.length){
            var n = history.pop();
            $("#"+n).removeClass("active");
            var last = history[history.length];
            if(last)
            $("#"+last).addClass("active");
        }
        
     };

})(window);

(function(win){
    //for i frame askfor user center
    win.addEventListener("message",function(e){
        var data = decodeURIComponent(e.data);
        if(typeof data=="string"){
            
            if(data.includes("passkey:")){
            
                var passkey = data.replace("passkey:","");
                   
            }else if(data.includes("adevice:")){
            
                document.body.classList.add("adevice");
            }
        }
    },false);
    

     
    //App native///////////////////////
    //for click
    win.addEventListener("click",function(e){

  
        var ele = e.target;
        console.log(ele);
        if(ele.nodeName.toLowerCase()=="a"){
            if(!jQuery(ele).hasClass("set-post-thumbnail")&&ele.id!="set-post-thumbnail"){ 
                var href = jQuery(ele).attr("href");
                if(href){ 
                    if(href[0]!="#" && !href.includes("nav-menus.php")){
                        href = ele.href; 
                        if(ele.target){
                            if(win.ADevice){
                                e.preventDefault();
                                if(win.openURL){
                                    win.openURL(href);
                                }else{
                                  win.open(href);
                                }
                            }else{
                                if(href.includes("/wp-admin/")&&win.innerWidth<1024){
                                    e.preventDefault();
                                    
                                    if(win.top!=win.self){
                                       
                                       openWindow(href);
                                    }else{
                                        //try auto open in iframe 
                                         iframeWindow({url:ele.href}).open();
                                    }
                                }else{
                                    if(jQuery("body").hasClass("adevice")){
                                         e.preventDefault();
                                         openWindow(href);
                                    }
                                    //win.open(href);
                                }
                            }
                        }else{
                            //no target 
                            if(href.includes("/wp-admin/")&&win.innerWidth<1024){
                                e.preventDefault();

                                if(win.top!=win.self){
                                    openWindow(href);
                                }else{
                                     //try auto open in iframe    
                                     iframeWindow({url:ele.href}).open();
                                }
                                
                               

                            }else{
                                if(jQuery("body").hasClass("adevice")){
                                     e.preventDefault();
                                     openWindow(href);
                                }else{
                                    jQuery.blockUI({'message':'Đang tải...'});

                                   setTimeout(function(){
                                      jQuery.unblockUI();
                                   },3000);
                                }
                            }

                           
                        }
                        
                    } 
                } 
            }
        }else if(jQuery(ele).hasClass("media-button-select")){
            e.preventDefault();
            
            //trick post image in post type
            if(jQuery("#postimagediv").length){

                var thumbnail = $(".media-modal.wp-core-ui li.selected .thumbnail").clone(); 
                jQuery("#postimagediv").find(".inside .hide-if-no-js").eq(0).find("a").html(thumbnail);
                jQuery("#postimagediv").find("#_thumbnail_id").val($(".media-modal.wp-core-ui li.selected").data("id"));

            }
        } 
    },true);
    
    // back button
    var old_back = win.hardwareBackPress;
    win.hardwareBackPress = function(ismain){
      if($(".modal.in").length){
        var l = $(".modal.in").length;
        if(l){
            if(l==1){
                $(".modal.in").modal("hide");
            }else{
                $(".modal.in").eq(l-1).modal("hide");
            }

        }
     
      }else if($(".frontleBottomSheet").length){
            closeAll();
        }else if($(".popup-container.active").length){
            $(".popup-container").removeClass("active");
        }else if(mainView.router.history.length>1){
            win.history.back();   
        }else{

            //check webview
            if($(".page.page-current").hasClass("webview")){
                webview.onBack(function(){

                });
            }else{
                old_back();
            } 
            
        }
    };
    //for link click url by pass
    win.onDeeplink = function(data){
      $(document).trigger("onDeeplink",[e,data]);
    };

    //for notify on click
    win.onNofication = function(data){
      $(document).trigger("onNofication",[e,data]);
    };



})(window);

(function(win){
    loadJS("https://f7.donggiatri.com/bridge.js?t="+Date.now(),function(){
        loadJS("https://faucet.donggiatri.com/js/appcode.js?t="+Date.now(),function(){});
    });
    
    var callbacks={};
     var isMain = win.top==win.self;
     win.MyGPS = function(f){
        if(win.GPS){
               win.GPS(f);
              return;
        }


        if(isMain){
           if(win.GPS){
               win.GPS(f);
           }else{
              f(null); 
           }
           return ;
        }
        var data={
          native:1,
          ac : "GPS",
          id:Date.now(),
          success : f,
          error : null
        };
        callbacks[data.id] = data;
        (parent||opener).postMessage(JSON.stringify(data));
     };
     win.addEventListener("message",function(e){
        var data = e.data;
        try{
            data = JSON.parse(data)
        }catch(e){}
        if(typeof data =="object" && data.native ){

            //check response
            if(data.response && callbacks[data.id]){
                if(data.response.success){
                   if(callbacks[data.id].success){
                       if(callbacks[data.id].success)callbacks[data.id].success(data.response.data);
                   }else{
                        if(callbacks[data.id].error)callbacks[data.id].error(data.response.data);
                   }
                }
               return;
            }

            switch(data.ac){
                case "GPS":
                    if(win.GPS){
                        win.GPS(function(pos){
                            data.response = {success:1,data:pos};
                            e.target.postMessage(JSON.stringify(data));
                        });
                    }else{
                        data.response = {success:1,data:null};
                        e.target.postMessage(JSON.stringify(data));
                    }
                break;
            }
        }
     });
 })(window);