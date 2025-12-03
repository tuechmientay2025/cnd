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
String.prototype.loadJS = function(f) {
    loadJS(String(this), f || function() {}
    );
};
String.prototype.loadCSS = function(f) {
    loadCSS(String(this), f || function() {}
    );
};
window.MyLibrary = {};
window.loadJS = function(e, t) {
    if (window.MyLibrary[e])
        t();
    else {
        var n = document.createElement("script");
        n.src = e,
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
//  Formatted version of a popular md5 implementation
//  Original copyright (c) Paul Johnston & Greg Holt.
//  The function itself is now 42 lines long.

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
window.getURLParameters = function(paramName) {
        var sURL = document.location.href;
        if (sURL.indexOf("?") > 0) {
            var arrParams = sURL.split("?");
            var arrURLParams = arrParams[1].split("&");
            var arrParamNames = new Array(arrURLParams.length);
            var arrParamValues = new Array(arrURLParams.length);
            var i = 0;
            for (i = 0; i < arrURLParams.length; i++) {
                var sParam = arrURLParams[i].split("=");
                arrParamNames[i] = sParam[0];
                if (sParam[1] != "")
                    arrParamValues[i] = unescape(sParam[1]);
                else
                    arrParamValues[i] = "No Value";
            }
            for (i = 0; i < arrURLParams.length; i++) {
                if (arrParamNames[i] == paramName) {
                    //alert("Parameter:" + arrParamValues[i]);
                    return arrParamValues[i];
                }
            }
            return null;
        }
    };

window.ModalTabs  = (function(){
    return function(options){
                var ele = null;
               
                options = $.extend({
                    id:"ele"+Date.now(),
                    init : function(){

                    }
                },options,true);

                $("body").append(`<div class="md-modal pos full-width md-dynamicmodal md-menu md-close-by-overlay modalprinter" id="${options.id}">
                    <style>
        #${options.id} {
            display: none;
            padding: 0;
        }

        #${options.id}.md-show{
           display:flex; 
        }
        
         #${options.id} .media-frame-menu{
            width: 200px;
        }

        #${options.id} .md-content {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        #${options.id} .md-close{
                position: absolute;
    right: 10px;
    top: 10px;
    z-index:10000
        }
    </style>
     <span class="md-close" onclick="jQuery('#${options.id}').removeClass('md-show')"></span>
    <div class="media-frame-menu">
        <div class="media-menu">
            
        </div>
       
    </div>
    <div class="md-content">
         
    </div>
      
</div>    
</div>`);
        ele = $("#"+options.id); 
        setTimeout(function(){
           options.init(methods);
           ele.on("click",".media-frame-menu .media-menu a",function(e){
             e.preventDefault();
              var id  = $(this).attr('data-bind');
              if(tabs_action[id]&&tabs_action[id].onActive){
                tabs_action[id].onActive.call(tabs_action[id],e);
              }
              //remove ui block
              $.unblockUI();
           });
        },100);
        var tabs_action={};
        var methods={
                remove: function(){
                    this.modal.remove();
                },
                hide: function(){
                    
                },
                modal :ele,
                addTab : function(setting){
              
                    setting.id = "tabid"+Date.now();
                    var menu = $(`<a href="#${setting.id}" class="${setting.id}" data-bind="${setting.id}">${setting.name}</a>`);
                    var tab = $(`<div id="${setting.id}" class="popup_section full-height" style="display: none;">${setting.html}<div>`);
                    menu.appendTo(ele.find('.media-frame-menu .media-menu')); 
                    tab.appendTo(ele.find('.md-content')); 

                    setting.tab = tab;
                    setting.menu = menu;
                    if(setting.callback)setting.callback.call(setting,setting);

                        //rerender
                    ele.find('.media-frame-menu a').removeClass('active').eq(0).addClass('active');
                    ele.find('.md-content').hide().eq(0).show();
                    //save
                    tabs_action[setting.id] = setting;

                }
           
        };
        window.ModalTabs.tabs[options.id] =  methods;
        return methods;
   };
})();
window.ModalTabs.tabs ={};

/////////////////////////////////////////////////////////////////////////

   setTimeout(function () {
        
!function(e){e(["jquery"],(function(e){return function(){var t,n,o,i=0,s="error",a="info",r="success",d="warning",l={clear:function(n,o){var i=m();t||c(i);u(n,i,o)||function(n){for(var o=t.children(),i=o.length-1;i>=0;i--)u(e(o[i]),n)}(i)},remove:function(n){var o=m();t||c(o);if(n&&0===e(":focus",n).length)return void f(n);t.children().length&&t.remove()},error:function(e,t,n){return g({type:s,iconClass:m().iconClasses.error,message:e,optionsOverride:n,title:t})},getContainer:c,info:function(e,t,n){return g({type:a,iconClass:m().iconClasses.info,message:e,optionsOverride:n,title:t})},options:{},subscribe:function(e){n=e},success:function(e,t,n){return g({type:r,iconClass:m().iconClasses.success,message:e,optionsOverride:n,title:t})},version:"2.1.2",warning:function(e,t,n){return g({type:d,iconClass:m().iconClasses.warning,message:e,optionsOverride:n,title:t})}};return l;function c(n,o){return n||(n=m()),(t=e("#"+n.containerId)).length||o&&(t=function(n){return t=e("<div/>").attr("id",n.containerId).addClass(n.positionClass).attr("aria-live","polite").attr("role","alert"),t.appendTo(e(n.target)),t}(n)),t}function u(t,n,o){var i=!(!o||!o.force)&&o.force;return!(!t||!i&&0!==e(":focus",t).length)&&(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){f(t)}}),!0)}function p(e){n&&n(e)}function g(n){var s=m(),a=n.iconClass||s.iconClass;if(void 0!==n.optionsOverride&&(s=e.extend(s,n.optionsOverride),a=n.optionsOverride.iconClass||a),!function(e,t){if(e.preventDuplicates){if(t.message===o)return!0;o=t.message}return!1}(s,n)){i++,t=c(s,!0);var r=null,d=e("<div/>"),l=e("<div/>"),u=e("<div/>"),g=e("<div/>"),h=e(s.closeHtml),v={intervalId:null,hideEta:null,maxHideTime:null},w={toastId:i,state:"visible",startTime:new Date,options:s,map:n};return n.iconClass&&d.addClass(s.toastClass).addClass(a),n.title&&(l.append(s.escapeHtml?C(n.title):n.title).addClass(s.titleClass),d.append(l)),n.message&&(u.append(s.escapeHtml?C(n.message):n.message).addClass(s.messageClass),d.append(u)),s.closeButton&&(h.addClass("toast-close-button").attr("role","button"),d.prepend(h)),s.progressBar&&(g.addClass("toast-progress"),d.prepend(g)),s.newestOnTop?t.prepend(d):t.append(d),d.hide(),d[s.showMethod]({duration:s.showDuration,easing:s.showEasing,complete:s.onShown}),s.timeOut>0&&(r=setTimeout(T,s.timeOut),v.maxHideTime=parseFloat(s.timeOut),v.hideEta=(new Date).getTime()+v.maxHideTime,s.progressBar&&(v.intervalId=setInterval(b,10))),function(){d.hover(D,O),!s.onclick&&s.tapToDismiss&&d.click(T);s.closeButton&&h&&h.click((function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&!0!==e.cancelBubble&&(e.cancelBubble=!0),T(!0)}));s.onclick&&d.click((function(e){s.onclick(e),T()}))}(),p(w),s.debug&&console&&console.log(w),d}function C(e){return null==e&&(e=""),new String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function T(t){var n=t&&!1!==s.closeMethod?s.closeMethod:s.hideMethod,o=t&&!1!==s.closeDuration?s.closeDuration:s.hideDuration,i=t&&!1!==s.closeEasing?s.closeEasing:s.hideEasing;if(!e(":focus",d).length||t)return clearTimeout(v.intervalId),d[n]({duration:o,easing:i,complete:function(){f(d),s.onHidden&&"hidden"!==w.state&&s.onHidden(),w.state="hidden",w.endTime=new Date,p(w)}})}function O(){(s.timeOut>0||s.extendedTimeOut>0)&&(r=setTimeout(T,s.extendedTimeOut),v.maxHideTime=parseFloat(s.extendedTimeOut),v.hideEta=(new Date).getTime()+v.maxHideTime)}function D(){clearTimeout(r),v.hideEta=0,d.stop(!0,!0)[s.showMethod]({duration:s.showDuration,easing:s.showEasing})}function b(){var e=(v.hideEta-(new Date).getTime())/v.maxHideTime*100;g.width(e+"%")}}function m(){return e.extend({},{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",escapeHtml:!1,target:"body",closeHtml:'<button type="button">&times;</button>',newestOnTop:!0,preventDuplicates:!1,progressBar:!1},l.options)}function f(e){t||(t=c()),e.is(":visible")||(e.remove(),e=null,0===t.children().length&&(t.remove(),o=void 0))}}()}))}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)}),toastr.options={closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,positionClass:"toast-bottom-center",preventDuplicates:!0,showDuration:"300",hideDuration:"1000",timeOut:"5000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut"};
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
        // var title = document.title;
        // window.addEventListener("message", function receiveMessage(e) {
        //     // console.log(e.origin);
        //     if (e.origin.indexOf("socket.ahlustore.com") == -1)
        //         return;
        //     if (e.data.action) {
        //         switch (e.data.action) {
        //             case "begin_print":
        //                 document.title = e.data.new;
        //                 break;
        //             case "end_print":
        //                 document.title = title;
        //                 break;
        //             case "EnterRoom":
        //                 var u = e.data.data;
        //                 if (u.role != 'admin') {
        //                     APP.showNotice("Khách hàng '" + u.name + "' đã ghé thăm cửa hàng của bạn.", 'success');
        //                 }
        //                 break;
        //         }
        //     }
        // }, false);
        // var room = getURLParameters("room");
        // room = (room ? room : 1);
        // var name = getURLParameters("name");
        // // $("body").append('<iframe src="https://socket.ahlustore.com/html/azpos.server.php?t=' + Date.now() + '&room=' + room + "&name=" + (name ? name : document.title) + '" style="display:none;" class="socketiframe"></iframe>');
        // // $(document).on("load",".socketiframe",function() {
        // //     setTimeout(function(){
        // //         $(".socketiframe").attr("src",'https://socket.ahlustore.com/html/azpos.server.php?t='+Date.now()+'&room='+room+"&name="+(name?name:document.title));
        // //     },5*60*1000);
        // // });
    }, 1000);


