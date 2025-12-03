(function(){
window.$ = jQuery;

window.ADOM = document;
window.JDOM = jQuery(ADOM);
/*1.js*/
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



/*2.firbase.js*/

(function(win){
    
    
   
   win.setupiofirebase = function(options){
        var fb = new Firebase(options.host);
        var socket = {};
        socket.create = function(r,a){
            a = a?a:fb;
           return {
             io : a.child(r),
             send : function(data){
                data = typeof data=="object"?data:{
                    text : data
                };

                if(!data._id)data._id = Date.now(); 

                this.io.push(data); 
             }
           }
        };
       
        
        
         
        return socket;
    };

    //by hand socket io
    win.setupio = function(options){
        // var io = io(options.host);


        return win.mychanel;
    };
    //////////////////////////////////////////////////
    $(document).on('Config',function(e,config){

       
         
            win.PrintService.ready = 1;

            //load confgig
            
            var ip = win.AhluPos.settings.printer.ip;
            if(!ip || ip.includes('127.0.0.1')){
                ip = config.firbase?config.firbase.io:"https://tu-ech-default-rtdb.firebaseio.com";
            }
            win.AhluPos.settings.printer.ip = ip;
            if(ip){
                if(ip.includes("firebase")){
                    var socket = setupiofirebase({host:ip});
                     /*
                     setup socket include shop_id,id_outlet
                        1. clear all message
                        2. reinit again
                    r == shop_id,id_outlet
                    */
                    socket.setupPOS = function(shop_id,id_outlet){
                        var r = shop_id+id_outlet;
                        var room =socket.create(r);
                        return {
                            root:room,
                            kitchen : socket.create('kitchen',room.io),
                            chat : socket.create('chat',room.io),
                            printer : socket.create('printer',room.io),
                            notify : socket.create('notify',room.io),
                            table : socket.create('table',room.io),
                            activity : socket.create('table',room.io)
                        };
                    };

                    win.mychanel = socket.setupPOS(document.location.host.replace(/\./ig,''),win.AhluPos.config.outlet,win.AhluPos.config.ID);
                }else{
                    setupio({host:ip});
                }
                //trigger global
                $(document).trigger('SokcetIO',[win.mychanel]);
            }
            
            
    });
})(window);
/*aship.js*/
(function(win){
    
    win.AShip ={
        country : function(ele,options){
            ele.country(options);
        },
        create : function(options){

        },
        fee : function(options){

        }
    };
    //////////////////////////////////////////////////
    $(document).on('Config',function(e,config){

            
             
             
              
    });
})(window);
/*assign.tab.js*/
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
/*atalk.js*/
$(document).on("Config",function(e,config) {
   $("body").append(`<style>
      #regiser_top_bar .floatbtn{
         position: relative;
       width: 24px;
       height: 24px;
       right: 0;
       bottom: 0;
       display: block;
           left: 0;
    margin: 0 8px;
      }
      #regiser_top_bar .floatbtn img{
         width: 24px;
       height: 24px;
      }
   </style>`);
	 
	if(window.innerWidth<1015){
		
           
          var resize = function(){
            
            if(window.innerWidth<1015){
                $(".floatbtn").draggable( 'disable' ).appendTo("#regiser_top_bar #pos_register_buttons");
            }else{
              $(".floatbtn").draggable( 'enable' ).appendTo("body");
            }
        };
        resize();
        $(window).bind("resize",resize);
 
    }
   
    
    
});
/*chamcong.js*/
//check current is ctv => show popup

$(document).on("Config",function(e,config) {
 	
 	var id_timer = null;
 	var old_time = null;
 	var timer = 40;
 	if(config.isctv){
 		if(window.innerWidth<1015){
            $(".moreaction").append(`<a class="settinghrfinger tieude tips button ladda-button tiped" style="cursor: pointer;"><i class="fa fa-handshake-o" aria-hidden="true"></i> Chấm công<span></span></a>`);
        }


 		 //setup print setting
	       var tabs = ModalTabs({
	         id:"modalhrfinger",
	         init :  function(e){
	            //append to menu header POS Client
	           $("#pos_user_badge .menu_bar").prepend(`<div class="settinghrfinger tieude" style="cursor: pointer;"><i class="fa fa-handshake-o" aria-hidden="true"></i> Chấm công<span></span></div>`)
	           $(document).on("click",".settinghrfinger",function(evt){
	           	evt.preventDefault();
	               e.modal.addClass("md-show");
	           });
	           //
	           e.addTab({
	            name:'Mã chấm công',
	            html:`<div class="woocommerce-checkout printsettingblock" style="overflow: auto;" >
	                <style>
	                
	                </style>
	                <h1><span class="txt">Mã chấm công</span></h1>

					                <div>
					                	<p>Vui lòng dùng ứng dụng WC để Quét mã ghi nhận</p>
					                	<p>Lần đầu tiên là Vào làm việc</p>
					                	<p>Lần cuối quét là tan ca</p>
					                	
					                </div>
				 					<div class="text-center">
				 						<img class="qr" src="https://api.qrserver.com/v1/create-qr-code/?size=125x125&data=a%C4%91" width="125" height="125">
				 					</div>
				 					<div class="result">

				 					</div>
	               </div>`,
	               callback:function(evt){
	                  
	                     
	               },
	               onActive : function(evt){
	                   var evt = this; 
	                   var c = 1;
	                    old_time = Date.now();
	                   var data = JSON.stringify({ac:"finger",time:old_time,token:AhluPos.config._wpnonce});
	                   console.log(data);
	                   evt.tab.find(`.qr`).attr("src","https://api.qrserver.com/v1/create-qr-code/?size=125x125&data="+encodeURIComponent(data));
	                   if(id_timer){
	                   	 clearInterval(id_timer);

	                   }
	                   id_timer = setInterval(function(){
	                   	 if(c++>timer){
	                   	 	  old_time = Date.now();
	                   	 	 data = JSON.stringify({ac:"finger",time:old_time,token:AhluPos.config._wpnonce});
	                   	 	 console.log(data);
	                   	 	evt.tab.find(`.qr`).attr("src","https://api.qrserver.com/v1/create-qr-code/?size=125x125&data="+encodeURIComponent(data));
	                   	 }
	                   },timer*1000); 
	               }
	           }); 
	           //
	           e.addTab({
	            name:'Lịch sử thanh toán',
	            html:`<div class="woocommerce-checkout printsettingblock" style="overflow: auto;" >
	                <style>
	                
	                </style>
	                <h1><span class="txt">Lịch sử thanh toán</span></h1>
	                <div>
	                	<p>Đã trả <span class="total_sale">0</span></p>
	                	<p>Còn lại <span class="total_bonus">0</span></p>
	                	
	                </div>
 					 
 					<div class="table-responsive">
 					 	<table class="table">
                                <thead>
                                    <th>#</th>
                                    <th>Mã</th>   
                                    <th>Tháng</th>   
                                    <th>Giá tiền</th> 
                                    <th>Tổng giờ</th> 
                                    <th>Thời gian thanh toán</th> 
                                    <th>Tình trạng</th> 
                                 </thead>
                                <tbody>
                      </tbody>
                        </table>
 					 </div>
	               </div>`,
	               callback:function(evt){
	                   //request xử lý
	                   	evt.tab.find(".btnrequest").on("click",function(){
	                   			wpajax("wc_hr_finger_payment_request",{},function(res){
	                        	 alert(res.message);
	                        });
	                   	});
	               },
	               onActive : function(evt){
	                   	var evt = this;  
	                   	evt.tab.find(".table tbody").html("");
	           			wpajax("wc_hr_finger_payment",{},function(res){
                			//each outlet
                    		var total_sale = 0;
                    		var total_bonus = 0;
                    		var d = new Date();
							           var months = d.getMonth()+1;
							           var y = d.getFullYear();
                    		evt.tab.find(".table tbody").html(res.data.map(function(n,x){
                            	// var m = (n.order_total*v.bonus_rate);
                            	// total_sale+=parse_money(n.order_total)*1;
                            	// total_bonus+=parse_money(m)*1;
                            	var status = "Đã thanh toán";
                            	if(n.status=="pending"){
                            		 if(n.month!=`${months}-${y}`){
                            		 	  status = "<button class='btnrequest'>Yêu cầu thanh toán</button>";
                            		 }else{
                            		 	  status = "--";
                            		 }
                            	}
                            	return `<tr>
	                                <td>${x+1}</td>
	                                <td>${n.id}</td>
	                                <td>${n.month}</td>
	                                <td>${show_money_none(n.money)}</td>
	                                <td>${show_money_none(n.hour)}</td>
	                                <td>${n.complete_date||"--"}</td>  
	                                <td>${status}</td>  
	                            </tr>`;
                            }).join(""));
                    		// evt.tab.find(".total_sale").html(show_money_none(total_sale));
                    		// evt.tab.find(".total_bonus").html(show_money_none(total_bonus)); 
                    	});
	               }
	           }); 
	           //
	           var d = new Date();
	           var months = d.getMonth()+1;
	           var y = d.getFullYear();
	           var l = [`<option value="">--Chọn tháng --</option> `];
	           for(var i=months;i>0;i--){
	           	 var nn= i<10?"0"+i:i;
	           	 l.push(`<option value="${nn}-${y}">${nn}-${y}</option> `);
	           }
	           e.addTab({
	            name:'Lịch sử chấm công',
	            html:`<div class="woocommerce-checkout printsettingblock" style="overflow: auto;" >
	                <style>
	                
	                </style>
	                <h1><span class="txt">Chấm công</span></h1>
	                <div class="flex-row">
	                	<div class="flex">
		                <p>Hình thức trả lương: <span>Theo giờ</span></p>
		                <p>1 giờ: <span>22,000</span></p>
		                <p>Thông tin tài khoản</p>
		                </div>
		                <div>
			                <div class="result text-center">
							                	<img src="https://cdn-icons-png.flaticon.com/128/2174/2174687.png" width="45" class="qrscan" height="45">
							                	<p>Quét ghi nhận chấm công</p>
						 					</div>
						 					<p>Có vấn đề cập nhật không đúng</p>
						 					<div><button class="btnreload">Tải lại</button></div>
					 					</div>
				 					</div>
 					<p>Lịch sử chấm công</p>
 					<div class="flex-row">
 						<select class="search_date">  
 							${l.join("")}
 						</select>  
 						<button type="button" class="button btnfind">Tìm</button>
 					</div>
 					<div class="table-responsive">
					 					 	<table class="table">
					                                <thead>
					                                    <th>#</th>
					                                    <th>Tình trạng</th>
					                                    <th>Ngày</th>
					                                    <th>Thời gian vào</th>
					                                    <th>Thời gian kết thúc</th> 
					                                    <th>Giá tiền*giờ</th> 
					                                    <th>Thành tiền</th> 
					                                 </thead>
					                                <tbody>
					                      </tbody>
					                        </table>
					 					 </div>
	               </div>`,
	               callback:function(evt){
	                  
	                    evt.tab.find(".btnfind").on("click",function(){
	                        var val = evt.tab.find(".search_date").val();
	                        if(val){
	                        	evt.tab.find(".table tbody").html("");
	                        	wpajax("wc_hr_finger_history_month",{date:val},function(res){
	                        		//each outlet
	                        		var total_sale = 0;
	                        		var total_bonus = 0;
	                        		evt.tab.find(".table tbody").html(res.data.map(function(n,x){
	                                	// var m = (n.order_total*v.bonus_rate);
	                                	// total_sale+=parse_money(n.order_total)*1;
	                                	// total_bonus+=parse_money(m)*1;
	                                	var checkout = JSON.parse(n.checkout);
	                                	return `<tr>
			                                <td>${x+1}</td>
			                                <td>${n.status=='pending'?"Đang xử lý":"Ghi nhận"}</td>
			                                <td>${n.date}</td>
			                                <td>${n.checkin}</td>
			                                <td data-checkout='${n.checkout}'>${checkout.pop()}</td> 
			                                <td>${show_money_none(n.hour)}*${show_money_none(n.rate)}</td>  
			                                <td>${show_money_none(n.money)}</td>  
			                            </tr>`;
	                                }).join(""));
	                        		// evt.tab.find(".total_sale").html(show_money_none(total_sale));
	                        		// evt.tab.find(".total_bonus").html(show_money_none(total_bonus)); 
	                        	});



	                        }
	                    });

	                    //xu ly lai
	                   	evt.tab.find(".btnreload").on("click",function(){
	                   			wpajax("wc_hr_finger_scan",{},function(res){
	                        	 alert(res.message);
	                        });
	                   	});

	                      evt.tab.find(".btnfind").trigger("click");

	                     //scan
 						evt.tab.find(".qrscan").on("click",function(){
 							if(window.MyScan){
 								window.MyScan(function(code){
 									if(code){
 										alert(code);
 										try{
 											code = JSON.parse(code)
 										}catch(e){}
 										if(typeof code=="object"&&code.ac=="finger"){

 											//check time
 											var time = code.time;
 											var now = Date.now();
 											var fire = timer*1000;
 											if(now-old_time<fire){
 												wpajax("wc_hr_finger_checkin",code,function(res){
					                        		if(res.code){
					                        			alert(res.message);
					                        		}else{
					                        			alert(res.error);
					                        		}
					                        	});
 											} 
 										}
 									}
 								});
 							}
 						});
	                      
	               },
	               onActive : function(evt){
	                   var evt = this; 
	                    // var input = evt.tab.find(`.mainaction [value='${printer.action}']`);
	                    // input.closest('li').trigger('click');
	               }
	           }); 
	        }
	    });
 	}
});
/*ctv.bonus.js*/
//check current is ctv => show popup

$(document).on("Config",function(e,config) {
 	
 	if(config.isctv){
 		if(window.innerWidth<1015){
            $(".moreaction").append(`<a class="settingmodalctv tieude tips button ladda-button tiped" style="cursor: pointer;"><i class="fa fa-percent" aria-hidden="true"></i> Hoa hồng<span></span></a>`);
        }
 		 //setup print setting
	       var tabs = ModalTabs({
	         id:"modalctv",
	         init :  function(e){
	            //append to menu header POS Client
	           $("#pos_user_badge .menu_bar").prepend(`<div class="settingmodalctv tieude" style="cursor: pointer;"><i class="fa fa-percent" aria-hidden="true"></i> Hoa hồng <span></span></div>`)
	           $(document).on("click",".settingmodalctv",function(evt){
	           		evt.preventDefault();
	               e.modal.addClass("md-show");
	           });
	         
	           e.addTab({
	            name:'Hoa hồng',
	            html:`<div class="woocommerce-checkout printsettingblock" style="overflow: auto;" >
	                <style>
	                
	                </style>
	                <h1><span class="txt">Lịch sử Hoa hồng</span></h1>
	                <div>
	                	<p>Danh thu <span class="total_sale">0</span></p>
	                	<p>Hoa hồng <span class="total_bonus">0</span></p>
	                	
	                </div>
 					<div class="flex-row">
 						<input type="date" class="search_date" value="" placeholder="Tìm kiếm" />  <button type="button" class="button btnfind">Tìm</button>
 					</div>
 					<div class="result">

 					</div>
	               </div>`,
	               callback:function(evt){
	                  
	                    evt.tab.find(".btnfind").on("click",function(){
	                        var val = evt.tab.find(".search_date").val();
	                        if(val){
	                        	wpajax("wc_ctv_bonus_staff_date",{date:val},function(res){
	                        		//each outlet
	                        		var total_sale = 0;
	                        		var total_bonus = 0;
	                        		evt.tab.find(".result").html(res.data.map(function(v,x){
	                        			var inv = v.inv?JSON.parse(v.inv):[];


	                        			return `
	                        			<p>${v.name} - ${v.name_register}</p>
	                        			<p>Tình trạng thanh toán: <span class="total_status">${v.bonus_complete}</span></p>
	                        			<div class="table-responsive">
					 					 	<table class="table">
					                                <thead>
					                                    <th>#</th>
					                                    <th>Hoá đơn</th>
					                                    <th>Ngày</th>
					                                    <th>Tổng tiền</th> 
					                                    <th>HH</th> 
					                                 </thead>
					                                <tbody>${inv.map(function(n){
					                                	var m = (n.order_total*v.bonus_rate);
					                                	total_sale+=parse_money(n.order_total)*1;
					                                	total_bonus+=parse_money(m)*1;
					                                	return `<tr>
							                                <td>${x+1}</td>
							                                <td>${n.order_id}</td>
							                                <td>${show_money_none(n.order_total)}</td>
							                                <td>${n.order_date}</td> 
							                                <td>${show_money_none(m)}</td>  
							                            </tr>`;
					                                }).join("")}
					                           </tbody>
					                        </table>
					 					 </div>`;
	                        		}).join(""));
	                        		evt.tab.find(".total_sale").html(show_money_none(total_sale));
	                        		evt.tab.find(".total_bonus").html(show_money_none(total_bonus)); 
	                        	});



	                        }
	                    });

	                      evt.tab.find(".btnfind").trigger("click");
	               },
	               onActive : function(evt){
	                   
	                    var input = evt.tab.find(`.mainaction [value='${printer.action}']`);
	                    input.closest('li').trigger('click');
	               }
	           }); 
	           
	        }
	    });
 	}
});
/*customer.js*/
$(document).on("Config",function (e,config) {
	$("body").append(`<style>
	#wc-pos-customer-data{
		    z-index: 10000;
	}
	.cusblock{position:relative;}
	.cusblock .add_items{display:none;}
	.cusblock .results{display: none;
		position:absolute;
		    top: 100%;
		left:0;
		width:100%;
		min-height:75px;
		background-color: white;
	    padding: 8px;
	    border-radius: 8px;
    }
    .cusblock .results .item{cursor: pointer;}
    </style>`);

	var p = $("#customer_user").parent().parent().addClass("cusblock");
	
	wpajax("customer_list",{},function(r) {
    	
    	//set global
    	store.customers = r||[];
    	p.find('.select2').remove();
		p.append(`<input type="text" placeholder="Tìm kiếm..." class="text" /><div class="results"></div>`);


		////
    	var results = p.find(".results");
    	var input =  p.find('input');
    	input.on("keyup",function(e){
    		var val =this.value.trim();
    		console.log(val);
    		if(val){
    			if(val.length>2){
    				var data = (store.customers||[]).filter(function(v){

	    				return v.fullname.toLowerCase().includes(val);
	    			});

	    			results.html(data.map(function(v){
	    				return `<div class="item" data-info='${JSON.stringify(v)}'>${v.fullname}</div>`;
	    			}).join("")).show();
    			}else{
    				results.html(`Nhập ít nhất 3 kí tự`).show();
    			}
    			
    		}else{
    		   results.hide();
    		}
    	}).on("focus",function(e){
    		var val =this.value.trim(); 
    		if(!val&&results.find('.item').length){
    			results.show(); 
    		}else{
    			results.hide(); 
    		}
    	});

    	p.on("click",".results .item",function(e){
    		var customer  = $(this).data("info");
    		if(customer){
    			var ele = $("#customer_items_list");
    			ele.find(".avatar img").attr("src",customer.avatar);
    			ele.find(".name").html(customer.fullname);

    			POS_APP.setCustomer(customer);
    			input.val("");
    			results.hide();


    		}
    	});	
	});
});
/*inv.js*/
$(document).on("Config",function () {
     $(document).on("click",".saletoday",function(e){
        e.preventDefault();
            localhost.order.modal();
    });  
    
    if(window.innerWidth<1015){
        $(".moreaction").append(`<a class="saletoday tieude tips button ladda-button tiped"><i class="fa fa-cart-arrow-down"></i> Đơn hàng<span></span></a>`);
    }

    //append to header menu
    AhluPos.ui.menubar.add({html:`<div class="saletoday tieude" style="cursor: pointer;"><i class="fa fa-cart-arrow-down"></i> Đơn hàng <span></span></div>`});


    $(document).on("Order_complete",function(e,order){
        console.log(order);   
    });


  
});
/*kitchen.io.js*/
$(document).on('SokcetIO',function(e,chanel){
            

        /*
            win.mychanel.kitchen.send({user:{_id:win.AhluPos.user._id},ID:win.AhluPos.config.ID,outlet:win.AhluPos.config.outlet,name:win.AhluPos.config.name,text:{ac:'print_html',data:'helllo'}})
        */
        chanel.kitchen.io.once("value", function (data) { 
            /*
            
            log all message
            $messages.append(`<div class="date">${date}</div>`);

            data.forEach(function(snap){
                var msg = snap.val(); 
                append(msg);
            });
             */


        }); 
        
        var loaded =0;
       chanel.kitchen.io.limitToLast(1).on("child_added", function (snap) {
            
            if(loaded==0){ 
                return;
            }
            var msg = snap.val();
            console.log("socketIO:",msg);
            //check the same oulet
            if(msg.outlet==win.AhluPos.config.outlet || msg.outlet ==pos_register_data.outlet){
                 //check i am host from ui
                // var action = win.AhluPos.settings.printer.action;
                // if(action=="is_host"){
                //     print(msg);
                // }else if(win.AhluPos.user._id!=msg.user._id){
                    
                //     print(msg);
                // } 
                
                
            } 
            
        });  

        setTimeout(function(){
            loaded =1;
        },2000);
            
    });
/*native.js*/
(function(win){
    //for i frame askfor user center
     win.addEventListener("message",function(e){
        var data = e.data;
        if(typeof data=="string"&&data.includes("passkey:")){
            
            var passkey = data.replace("passkey:","");
               
        }
    },false);
    //App native///////////////////////
    //for click
    win.addEventListener("click",function(e){

   var ele = e.target;
        if(ele.nodeName.toLowerCase()=="a"){
            if(!jQuery(ele).hasClass("set-post-thumbnail")){ 
                var href = jQuery(ele).attr("href");
                if(href){ 
                    if(href.includes("http")){
                     
                        if(ele.target){
                            if(win.ADevice){
                                e.preventDefault();
                                //check the dame or not
                                // var auth_token = localStorage.getItem('auth_token');
                                // if(auth_token){
                                //     ele.href = href+(href.includes("?")?"&":"?")+'auth_token='+auth_token;
                                // }else{
                                //     if(href.includes(document.location.host)){
                                //         document.location.href=href;
                                //     }else{
                                //          win.open(href);
                                //     }
                                // }
                                
                                if(href.includes(document.location.host)){
                                     jQuery.blockUI({'message':'Đang tải...'});

                                        document.location.href=href;
                                    }else{
                                         win.open(href);
                                    }
                            }
                        }else{
                            // if(win.ADevice){
                            //     e.preventDefault();
                            //     //check the dame or not
                            //     var auth_token = localStorage.getItem('auth_token');
                            //     if(auth_token){
                            //         href = href+(href.includes("?")?"&":"?")+'auth_token='+auth_token;
                            //     } 
                                 
                            //      win.open(href);
                            // }else{
                            //     jQuery.blockUI({'message':'Đang tải...'});

                            //    setTimeout(function(){
                            //       jQuery.unblockUI();
                            //    },4000);
                            // }

                             jQuery.blockUI({'message':'Đang tải...'});

                               setTimeout(function(){
                                  jQuery.unblockUI();
                               },4000);
                        }
                        
                    } 
                } 
            } 
        } 
    },true);

    // jQuery(document).on("click","a",function(e){
    //     e.preventDefault();
    //     console.log(this);
    // });
    
    setTimeout(function(){
         var old_open = window.open;
        window.open = function(data) {
             if(typeof data=="string"&&data.includes(document.location.host)){
             jQuery.blockUI({'message':'Đang tải...'});

                document.location.href=data;
            }else{
                 old_open.open(data);
            }
        };
         var old_open_url = window.openURL;
         window.openURL = function(data) {
                if(typeof data=="string"&&data.includes(document.location.host)){
             jQuery.blockUI({'message':'Đang tải...'});

                document.location.href=data;
            }else{
                 old_open_url.open(data);
            }
        };
        // back button
        var old_back = window.hardwareBackPress;
        window.hardwareBackPress = function(ismain){
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
            }else{

                old_back();
                
            }
        };
        if(win.hardwareStopPressback)win.hardwareStopPressback();
        //for link click url by pass
        window.onDeeplink = function(data){
          $(document).trigger("onDeeplink",[e,data]);
        };

        //for notify on click
        window.onNofication = function(data){
          $(document).trigger("onNofication",[e,data]);
        };
    },2000);



})(window);
/*notify.io.js*/
$(document).on('SokcetIO',function(e,chanel){
            

        /*
            win.mychanel.notify.send({user:{_id:win.AhluPos.user._id},ID:win.AhluPos.config.ID,outlet:win.AhluPos.config.outlet,name:win.AhluPos.config.name,text:{ac:'print_html',data:'helllo'}})
        */
        chanel.notify.io.once("value", function (data) { 
            /*
            
            log all message
            $messages.append(`<div class="date">${date}</div>`);

            data.forEach(function(snap){
                var msg = snap.val(); 
                append(msg);
            });
             */


        }); 
        
        var loaded =0;
       chanel.notify.io.limitToLast(1).on("child_added", function (snap) {
            
            if(loaded==0){ 
                return;
            }
            var msg = snap.val();
            console.log("socketIO:",msg);
            //check the same oulet
            if(msg.outlet==win.AhluPos.config.outlet || msg.outlet ==pos_register_data.outlet){
                 //check i am host from ui
                // var action = win.AhluPos.settings.printer.action;
                // if(action=="is_host"){
                //     print(msg);
                // }else if(win.AhluPos.user._id!=msg.user._id){
                    
                //     print(msg);
                // } 
                
                
            } 
            
        });  

        setTimeout(function(){
            loaded =1;
        },2000);
            
    });
/*pay.js*/
$(document).on("Config",function (e,config) {
      
 
    //append
    var gateway =config.gateway.map(function(v){

        if(!["basc","cod"].includes(v.id)){
        
        $("#modal-order_payment .media-frame-menu .media-menu").append(`<a href="#${v.id}" class="payment_methods payment_method_${v.id}" data-bind="${v.id}">
                        <input id="payment_method_${v.id}" type="radio" class="select_payment_method" name="payment_method" value="${v.id}" style="display: none;">
                        ${v.title}                    </a>`);

        $("#modal-order_payment .woocommerce-checkout ").append(`<div id="${v.id}" class="popup_section full-height" style="display: none;">

                            <div class="media-frame-wrap">
                                <div class="payment_box payment_method_${v.id}">
                                    <p>${v.description}</p>

                                </div>
                                </div>
                            </div>  `);
        }
    });


    $("#modal-order_payment .media-frame-menu .media-menu").on("click","a",function(e){
        e.preventDefault();
        var id = $(this).attr("href");
        console.log(id);
        $(this).addClass("active").siblings().removeClass("active");
        $(this).find(".select_payment_method")[0].cheched = true;

        $("#modal-order_payment  .payment_method").val(id.replace("#",""));

        $("#modal-order_payment .woocommerce-checkout .popup_section").hide();
        $("#modal-order_payment .woocommerce-checkout "+id).show();

        $("#modal-order_payment .woocommerce-checkout h1 .txt").html($(this).text());
      

    });

    $(document).on("onBeforeOrder",function(e,cart){
      //check payment method
      var id=  $("#modal-order_payment  .payment_method").val();
      if(id){ 
          var gateway = wpajax.config.gateway.filter(function(v){
                return v.id==id;
            });
            if(gateway&&gateway.length){
                gateway = gateway[0];
                cart.payment_method = gateway.id;
                cart.payment_method_title = gateway.title;
            }
        }
       
    });

    $(document).on("Order_complete",function(e,order){
       window.lastOrder = order;  
    });

    $(document).on('PrintReceipt',function(e,newHTML){
      
      var order = window.lastOrder;
      console.log(newHTML,order);

      if(order){

        var gateway = wpajax.config.gateway.filter(function(v){
            return v.id==order.payment_method;
        });
        if(gateway&&gateway.length){
            gateway = gateway[0];
            
        }
         switch(order.payment_method){
            case "bacs":
                console.log(gateway);
                var account = gateway.account_details[0];
                var url = `https://img.vietqr.io/image/${account.sort_code}-${account.account_number}-compact2.jpg?amount=${order.total}&addInfo=${order.id} ${order.total}&accountName=${account.account_name}`;
                console.log(url);
                var d = $(`<div style="text-align:center;margin:16px 0;">
                    <p>----Vui lòng chuyển khoản-----</p>
                    <div><img width="150" src="${url}" /></div>
                    </div>`);

                d.insertBefore( newHTML.find("#pos_receipt_footer"));   
            break;
            case "apoint":
                console.log(gateway);
                
                var data ={t:Date.now(),faucetpayment:"tranfer",note:`${order.id} ${order.total}`,merchant_id:gateway.settings.merchant_id,order_id:order.id,total:order.total,ipn:gateway.settings.ipn};
                var url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(JSON.stringify(data))}&size=125x125`;
                var d = $(`<div style="text-align:center;margin:16px 0;">
                    <p>----Vui lòng mở ứng dụng Faucet để thanh toán-----</p>
                    <div><img width="125" height="125" src="${url}" /></div>
                    </div>`);

                d.insertBefore( newHTML.find("#pos_receipt_footer"));   
            break;

            case "usdtbep20":
                console.log(gateway); 
                
                var d = $(`<div style="text-align:center;margin:16px 0;">
                    <p>----Vui lòng mở ứng dụng App hỗ trợ USDT Bep-20 để thanh toán-----</p>
                    <div>
                        <img width="125" height="125" src="${gateway.settings.image}" /><br/>
                        <p>Địa chỉ ví: ${gateway.settings.wallet_address}</p>
                    </div>
                    </div>`);

                d.insertBefore( newHTML.find("#pos_receipt_footer"));   
            break;
         }
      }

      setTimeout(function(){
         if(window.innerWidth<1023){
            $(".floatbtninv").trigger("click");
         }
      },2000);
      window.lastOrder = null;

   });
});
/*pos.core.js*/

(function(win){
    var storage = win.localStorage;
    window.wpajax = function(ac,data,f) {
   data = data||{};
    if(pos_register_data){
        data.ID = pos_register_data.ID;
        data.outlet = pos_register_data.outlet;
    }
  
  if(f){
      return $.ajax({
        url: "/wp-admin/admin-ajax.php?action="+ac,
        async: true,  
        type:"POST",
        data: data,
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
  }
  return new Promise(function(ok,no){
      $.ajax({
        url: "/wp-admin/admin-ajax.php?action="+ac,
        async: true,  
        data: data,
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
  
};
window.wppost = function(url,data,f) {
    data = data||{};
    if(pos_register_data){
        data.ID = pos_register_data.ID;
        data.outlet = pos_register_data.outlet;
    }
 
  if(f){
      $.ajax({
        url: url,
        async: true,  
        type:"POST",
        data: data,
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
      $.ajax({
        url: url,
        async: true,  
        data: data,
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
	win.AhluPos = $.extend(win.AhluPos||{},{
        settings:(function(){
            var data = storage.getItem('_ahlupos');
            var data = data?JSON.parse(data):{
                printer :{
                    ip:""

                }
            };

            data.save = function(){
                storage.getItem('_ahlupos',JSON.stringify(this));
            }

            return data;
        })(),
        status: function (ok) {
            var room = getURLParameters("room");
            var r = getURLParameters("r");
            jQuery.ajax({
                async: true,
                type: 'post',
                url: 'https://azpos.ahlupos.com/api/outlet/status/' + (ok ? 1 : 0),
                data: {
                    id: room,
                    r :r
                },
                success: function (res) {
                }
            });
        },
        remotePrint : (function(){
            
            
            $(document).on("change",'.modalprinter input,.modalprinter textarea,.modalprinter select',function(){
                var printer = win.AhluPos.settings.printer; 
                if(this.type=='checkbox'){
                    if(this.checked){
                        printer[this.name] = this.value;
                    }else{
                        printer[this.name] = null;
                    }
                    
                }else{
                    printer[this.name] = this.value;
                }
                win.AhluPos.settings.save();
            });


                
            $(document).on("Config",function (e,config) {
                var printer = win.AhluPos.settings.printer; 
                 
                    //setup print setting
                   var tabs = ModalTabs({
                     id:"modalprinter",
                     init :  function(e){
                        //append to menu header POS Client
                       $("#pos_user_badge .menu_bar").prepend(`<div class="settingprinter tieude" style="cursor: pointer;"><i class="fa fa-print"></i> Máy in <span></span></div>`)
                       $(document).on("click",".settingprinter",function(){
                           e.modal.addClass("md-show");
                       });
                     
                       e.addTab({
                        name:'Máy in',
                        html:`<form class="woocommerce-checkout printsettingblock" method="post" onsubmit="return false;">
                            <style>
                            .printsettingblock{}
                            .printsettingblock .mainaction{}
                            .printsettingblock .mainaction ul{
                                    display: flex;
    justify-content: space-between;
    padding: 0;
                            }
                            .printsettingblock .mainaction li{
                                border-radius: 8px;
    border: 1px solid #ddd;
    margin-top: 16px;
    align-items: center;
    padding: 8px; 
    width: 31%;
    justify-content: center;
    flex-direction: column;
                            }
                            .printsettingblock .mainaction li.active{
                                 background-color: #f3f3f3;
                            }
                            </style>
                            <h1><span class="txt">Cài máy in mạng Wifi/Lan/USB </span></h1>

                                <div class="row">
                                    <div class="col-md-6">
                                    <div style="    text-align: center;
    border-radius: 8px;
    border: 1px solid #ddd;
    margin-top: 16px;">
                                        <p>Thông tin</p>

                                            <p>Cửa hàng: ${pos_register_data.name}</p> 
                                        </div>
                                    </div>
                                    <div class="col-md-6" style="">
                                        <div class="media-frame-wrap">
                                            <label for="printer_ip">Địa chỉ máy In</label>
                                             <input type="text" class="ip" name="printer_ip" readonly placeholder="127.0.0.1" value="${printer.ip||""}" />
                                        </div>
                                    </div>
                                </div>
                                    
                                    <p>Lựa chọn các tính năng:</p>
                                    <ul class="mainaction">
                                        <li class="lr" data-id="default">
                                            <div>
                                                Mặc định <br/>
                                                <img src="https://cdn-icons-png.flaticon.com/128/1497/1497542.png" width=24 height=24 />
                                            </div>
                                            <div  class="flex"> 
                                                <p>Bật tính năng này nếu bạn muốn hoạt động như máy trạm thông thường là chỉ in bill</p>
                                                <input class='hide' type="radio" name="action"  ${printer.action=="default"?'checked':''} value="default" />
                                            </div>
                                        </li>
                                        <li class="lr " data-id="sendto">
                                            <div >
                                                Gởi đến máy in bill<br/>
                                                <img src="https://cdn-icons-png.flaticon.com/128/1183/1183626.png" width=24 height=24 />
                                            </div>
                                            <div class="flex">
                                                <div>
                                                    <input class="hide" type="radio" name="action" ${printer.action=="send_to_printer"?'checked':''} value="send_to_printer" />
                                                </div>
                                                <p>Bật tính năng này nếu bạn muốn:</p>
                                                <p>Không cho phép in tại thiết bị này. </p>
                                                <p>Gởi bản in cho máy chủ trong cửa hàng ${pos_register_data.name}.</p> 
                                            </div>
                                        </li>
                                        <li class="lr " data-id="sendto">
                                            <div>
                                               Làm host in Bill <br/>
                                               <img src="https://cdn-icons-png.flaticon.com/128/2291/2291786.png" width=24 height=24 />
                                            </div>
                                            <div  class="flex">
                                                <div>
                                                    <input class="hide" type="radio" name="action"  ${printer.action=="is_host"?'checked':''} value="is_host" />
                                                </div>
                                                <p>Bật tính năng này nếu bạn muốn:</p>
                                                <p>In tại thiết bị này.</p>  
                                                <p>Làm điểm Server tiếp các lệnh in bill từ xa từ các thiết bị trong cửa hàng ${pos_register_data.name} thông qua các thiết bị di động, laptop,... (chú ý: Tốt nhất chỉ có một điểm bán hàng trong một cửa hàng làm máy chủ.)</p> 
                                            </div>
                                        </li>
                                    </ul>
                                     
                                    <div class="media-frame-wrap">
                                        <p>Mỗi lần In bao nhiêu bản</p>
                                        <input type="tel" name="copy" value="${printer.copy||"1"}" />
                                    </div>

                           </form>`,
                           callback:function(evt){
                               var printer = win.AhluPos.settings.printer; 
                                evt.tab.find(".mainaction li").on("click",function(){
                                    var ele = $(this).addClass('active');
                                    ele.siblings().removeClass('active');
                                    var input = ele.find('[name="action"]')[0];
                                    input.checked=true;
                                    input.click(); 
                                    
                                    printer[input.name] = input.value;
                                    win.AhluPos.settings.save();
                                });

                                var input = evt.tab.find(`.mainaction [value='${printer.action}']`);
                                input.closest('li').addClass('active');
                           },
                           onActive : function(evt){
                               
                                var input = evt.tab.find(`.mainaction [value='${printer.action}']`);
                                input.closest('li').trigger('click');
                           }
                       }); 
                       e.addTab({
                        name:'Máy in từ xa',
                        html:`<form class="woocommerce-checkout" method="post" onsubmit="return false;">
                          <h1><span class="txt"> Server remote</span></h1>
                                <div class="media-frame-wrap">
                                    <div>
                                        <p>Danh sách máy chủ</p>
                                        <p>Khi bạn chọn tính năng này đồng nghĩa tính năng Máy in nội bộ sẽ không hoạt động.</p>
                                    </div>
                                    <div class="list"></div>
                                </div>
                       </form>`,
                        callback:function(evt){

                       }});


                  
               }
            });
        });
           
           return function(ac){

                this.open = function(){
                     $("#modalprinter").addClass("md-show");
                };
                this.tabs = tabs;
                var abc = $("#modalprinter  [value='send_to_printer']");
                abc=abc[0];
                var printer = win.AhluPos.settings.printer; 
               //check if this is mobile
               if(window.ADevice || window.innerHTML<1024){
                  //auto active sendt to server 
                  if(!abc.checked){
                    abc.click();
                  }  
                  printer.action='send_to_printer';
               }else{
                  if(abc.checked){
                    abc.click();
                  } 
               }

               //now try to call to server to refresh
               if(window.socket){
                    var data = $.extend({shop_id:"",id_outlet:""},pos_register_data,true);
                     window.socket.emit("printerremote",data,function(list){
                        modal.find(".list").html(list.map(function(v){
                            return `<div class="item" data-id="${v.id}">${v.name}</div>`;
                        }));
                     });
                     modal.off("click",".item").on("click",".item",function(){

                     });
               } 
           };
        })(),
        remotePrintLocal : function(){
           
            
            var id_= null;
            var runner_timer = function(){
                id_ = setInterval(runner,methods.timer*1000);
            };

            var methods = {
                timer : 30,
                update : function(){
                    if(id_)clearInterval(id_);
                    id_=null;
                    runner_timer();
                }
            };

            var r = getURLParameters("r");
            var delete_file = function(name){
                jQuery.ajax({
                    async: true,
                    type: 'post',
                    url: document.location.origin+'/wp-admin/admin-ajax.php?print'+(r?"&r="+r:""),
                    // url: 'https://hcm.ahlupos.com/azpay/print.php'+(r?"&r="+r:""),
                    data: {
                        action:"remote_print_delete",
                        name:name
                    },
                    success: function (res) {
                        
                    }
                });
            }

            var stores = {};
            var sound =null;

            // $("#asyn_timer").val()
            var runner = function(){
                if(!sound){
                    //https://fpt.ai/vi/tts-vi#
                    sound = document.getElementById("tts-audio");
                }
                jQuery.ajax({
                    async: true,
                    type: 'post',
                    url: document.location.origin+'/wp-admin/admin-ajax.php?print'+(r?"&r="+r:""),
                    // url: 'https://hcm.ahlupos.com/azpay/print.php'+(r?"&r="+r:""),
                    data: {
                        action:"remote_print"
                    },
                    success: function (res) {
                        try{
                            res = JSON.parse(res);
                        }catch(ex){}
                        if(typeof res==="object"){
                             
                            if(stores[res.name]===undefined){

                                
                                // ion.sound.play("succesful_order");
                                stores[res.name] = 1;
                                delete_file(res.name);
                                if(res.type=="html"){
                                    //now print and delete
                                    window.printJS(res.data,function(){
                                        if(sound)sound.play();
                                        setTimeout(function(){
                                            if(sound)sound.play();
                                        },2*1000);
                                    });
                                }
                            }else{
                                //now delete
                                delete_file(res.name);
                            }
                            //repeat
                            // runner_timer();
                        }
                    },
                    error:function(a,b,c){
                        this.success(a.responseText);
                    }
                });
            };

            
            runner_timer();
            return methods;
        }
    },true);
})(window);
/*pos.modal.js*/
var date_str = new Date().toJSON().split("T")[0];
(function(win){
    var storage = win.localStorage;
    var cached = null;
    try{
        cached =JSON.parse(storage.getItem("__localhost"));
    }catch(ee){}
    if(!cached){
        cached={};
    }
    win.localhost = win.localhost||{
        sendmail:function(data){
            wpajax("sendmail",data||{},function(r){});
            return this;
        },
        save : function(){
            storage.setItem("__localhost",JSON.stringify(cached));
            return this;
        },
       cache : function(k){
            return cached[k]||cached;  
       },
    server : {
        fetch : function(data){
            wpajax("wc_ping",data||{},function(r){
                cached.wc_ping = r;
            });
            
            wpajax("wp_ping",data||{},function(r){
                cached.wp_ping = r;
            });
            return this;
        },
        cache : function(k,name,data,f){
            return wpajax(name,data,function(r){
                cached[k] = r;
                if(f)f(r);
            });
            return this;
        },
        ping : function(){
            wpajax("wc_ping",pos_register_data||{},function(r){
                 cached.wc_ping = r;
            });
            $(document).trigger("Ping");
            return this;
        }, 
        ping_report : function(){
            wpajax("wc_ping_report",pos_register_data||{},function(r){
                 cached.wc_ping_report = r;
            });
            return this;
        },
        ping_html : function(){
            var cookies = win.localhost.listCookies();
            var ky = `pos${pos_register_data.outlet}_${pos_register_data.ID}`;
            if(!cookies["pos_station"]){ 
                setcookie("pos_station",ky); 
            }
            
             $.ajax({
                url: document.location.href,
                async: true,  
                data: {},
                type:"GET",
                success: function (html) {
                    // console.log(html);
                    wpajax("cachehtml",{save:1,name:ky,html:html},function(e){ 
                        
                    });
                },
                error: function(a,b,c){
                    this.success(a.responseText);
                }
              }); 
        }
    },
    init : function($){
        var authCode =null;

        wpajax("wc_pos_init",{},function(r){
            if(r){
                console.log("config",r);
                wpajax.config = r;
                win.AhluPos.config = r;
                authCode = r.key;
                //
                for(var i in r.html){
                    $("#"+i).html(r.html[i]);
                }
                
                //
                win.localhost.order.get();

                $(document).trigger('Config',[r]);
            }
         });
         $(document).on("Order_complete",function(e,order){
             console.log(order);
             if(wpajax.config){
                 win.localhost.order.save(order);
                 win.localhost.server.ping_report();
             }
         });

       
         $.ajaxSetup({
          async: true, 
          beforeSend:function(xhr,options){
             
              var auth =$('[name="auth-token"]').attr("content");
              if(authCode){
                xhr.setRequestHeader( 'Authorization','Basic '+authCode);
              } 
               
          }
        });
       

        
        this.server.ping_html();
       
           
      
        return this;
    },
    listCookies:function (filter) {
        var data ={};
        var cookies = document.cookie.split(/;/);
        for (var i = 0, len = cookies.length; i < len; i++) {
           var cookie = cookies[i].split(/=/);
        //   console.log("key: " + cookie[0] + ", value: " + cookie[1]);
           data[trim(cookie[0])] = trim(cookie[1]);
           
           if(filter){filter(cookie[0],cookie[1]);}
        }
        return data;
    },
    order : {
        modal : function(){
            var modal = jQuery("#modal-ordertoday");
            if(modal.length==0){
                
                var me = this;
                var tabs = ModalTabs({
                     id:"modal-ordertoday",
                     init :  function(e){
                        //append to menu header POS Client
                      // $("#pos_user_badge .menu_bar").prepend(`<div class="settingprinter tieude" style="cursor: pointer;"><i class="fa fa-print"></i> Máy in <span></span></div>`)
                       // $(document).on("click",".settingprinter",function(){
                       //     e.modal.addClass("md-show");
                       // });
                        
                       e.addTab({
                        name:'Hôm nay',
                        html:`<div class="flex-col">
                     <h1><span class="txt"> Danh thu (<span class="total">0</span> </span>)</h1>
                    <div class="media-frame-wrap scroll">
                        <div class="payment_box payment_method_bacs">
                            <table class="table">
                                <thead>
                                    <th>#</th>
                                    <th>Tiền</th>
                                    <th>Ngày</th>
                                    <th>Thanh toán</th>
                                    <th>Vị trí</th> 
                                    <th>Vận Chuyển</th> 
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    </div>`,
                    onAcive:function(e){
                        var evt = this;
                        //list  
                        var total = 0;
                        evt.tab.find(".table tbody").html(me.today().reverse().map(function(v){
                            total+= v.total*1;
                            var meta = {};
                            for(var i in v.meta_data){
                                meta[v.meta_data[i].key] = v.meta_data[i].value;
                            }

                            var shipper = `<a class="button shipaccess" data-id="${v.id}">Cài đặt</a>`;

                            if(meta.shipper){
                                shipper=`
                                <div>Đơn vị vận chuyển: ${meta.shipper.name}</div>
                                <div>Mã Vận chuyển: ${meta.shipper.id}</div>
                                <div>Tổng tiền: ${meta.shipper.total}</div>
                                <div>Theo dõi: <a href="${meta.shipper.map}" target="_blank"> trên google</a></div>
                                `;
                            }


                            return `<tr>
                                <td><a href="/wp-admin/post.php?post=${v.id}&action=edit" target="_blank">${v.id}</a></td>
                                <td>${show_money_none(v.total)}</td>
                                <td>${v.date_paid.split("T").join(" ")}</td>
                                <td>${v.payment_method_title}</td> 
                                <td>${meta.order_tab=="main"?"Mang đi": meta.order_tab}</td> 
                                <td>${shipper}</td> 
                                <td><a href="${v.print_url}" onclick="posPrintReceipt('${v.print_url}');return false;">In bill</a></td>
                            </tr>`;
                        }));
                        evt.tab.find(".total").html(show_money_none(total));

                    },
                    callback: function(evt){
                            
                        //ask for shipping
                        evt.tab.on("click",".shipaccess",function(e){
                            e.preventDefault();
                            var div = $(this).closest("td");
                            var order_id = $(this).attr("data-id");

                            var sheetchooser= openSheet({
                                data:`
                                <form class="boxchooser "><p>Thông tin vận chuyển</p>
                                    <div class="flex">
                                        <select name="shipper[name]" class="form-control">
                                            <option value="grab">Grab</span>
                                            <option value="bee">Bee</span>
                                            <option value="ahamove">Ahamove</span>
                                            <option value="shoppee">Express</span> 
                                        </select>
                                        <div class="flex-row">
                                            <div class="form-group">
                                                 <label for="xxx">Mã đơn hàng</label>
                                                 <input type="text" id="xxx" name="shipper[barcode]" class="form-control required" value="" /> 
                                            </div>
                                            <div class="form-group">
                                                 <label for="xxx">Thành tiền</label>
                                                 <input type="text" id="xxx" name="shipper[total]" class="form-control required" value="" /> 
                                            </div>
                                        </div>
                                        <hr/>
                                        <div class="flex-row">
                                            <div class="form-group">
                                                 <label for="xxx">Tên khách hàng</label>
                                                 <input type="text" id="xxx" name="customer[fullname]" class="form-control required" value="" /> 
                                            </div>
                                            <div class="form-group">
                                                 <label for="xxx">SĐT</label>
                                                 <input type="text" id="xxx" name="fullname[phone]" class="form-control required" value="" /> 
                                            </div>
                                            
                                        </div>
                                        <div class="country">
                                                  
                                            </div>
                                    </div>
                                    <div><button class="btnconfirm button">Xác nhận</button></div>
                                </form>
                                `,
                                beforeOpen:function(sheetId){
                                    var element = $("#"+sheetId);
                                    window.AShip.country(element.find(".country"),{

                                      type:"address",

                                      init : function(){



                                      }, 

                                    });
                                    // console.log(element);
                                     element.find("form").validate({
                                        submitHandler : function(form){
                                             var data  = $(form).serializeObject();
                                            data.order_id = order_id;
                                             
                                            wpajax("wc_pos_update_ship_order",data,function(r){
                                                console.log(r);
                                                if(r){
                                                    //update local & ui
                                                    div.html(`
                                                    <div>Đơn vị vận chuyển: ${data.shipper.name}</div>
                                                    <div>Mã Vận chuyển: ${data.shipper.barcode}</div>
                                                    <div>Tổng tiền: ${data.shipper.total}</div>
                                                    <div>Theo dõi: <a href="${data.shipper.map}" target="_blank"> trên google</a></div>
                                                    `);
                                                    me.today().map(function(v){
                                                        if(v.id==order_id){
                                                            v.meta_data['shipper'] = {
                                                                key:'_shipper',
                                                                value : data,
                                                                id:1000
                                                            };
                                                        }
                                                    });
                                                    me.save();
                                                }
                                             }); 
                                             sheetchooser.close();
                                        }
                                     });
 
                                }
                            });
                        });

                    }
                   });   
                       e.addTab({
                        name:'Tìm kiếm',
                        html:`<div class="flex-col">
                     <div>
                        <h1><span class="txt"> Danh thu (<span class="total">0</span>)</h1>
                         <div>
                            <input type="date" class="search" placeholder="Tìm kiếm" />
                         </div>
                     </div>
                    <div class="media-frame-wrap scroll">
                        <div class="payment_box payment_method_bacs">
                            <table class="table">
                                <thead>
                                   <th>#</th>
                                    <th>Tiền</th>
                                    <th>Ngày</th>
                                    <th>Thanh toán</th>
                                    <th>Vị trí</th> 
                                    <th>Vận Chuyển</th> 
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    </div>`,
                    onAcive:function(e){
                        this.tab.find(".search").trigger('change');
                    },
                    callback:function(evt){
                             evt.tab.on("change",".search",function(){
                                evt.tab.find(".table tbody").html("");
                                //load
                                me.date({
                                    data:{date:this.value},
                                    callback : function(r){
                                        var total = 0;
                                         
                                        evt.tab.find(".table tbody").html(r.reverse().map(function(v){
                                            total+= v.order_total*1;
 
                                            return `<tr>
                                                <td><a href="/wp-admin/post.php?post=${v.order_id}&action=edit" target="_blank">${v.order_number}</a></td>
                                                <td>${show_money_none(v.order_total)}</td>
                                                <td>${v.order_date.split("T").join(" ")}</td>
                                                <td>${v.payment_method_title}</td> 
                                                <td>${v.order_tab=="main"?"Mang đi":v.order_tab}</td> 
                                                <td></td>
                                                <td><a href="${v.print_url}" onclick="posPrintReceipt('${v.print_url}');return false;">In bill</a></td>

                                            </tr>`;
                                        }));

                                        evt.tab.find(".total").html(show_money_none(total));
                                    }
                                });

                            });

                             //ask for shipping
                            evt.tab.on("click",".shipaccess",function(e){
                                e.preventDefault();
                                var div = $(this).closest("td");
                                var order_id = $(this).attr("data-id");
                                var sheetchooser= openSheet({
                                    data:`
                                    <form class="boxchooser "><p>Thông tin vận chuyển</p>
                                        <div class="flex">
                                            <select name="shipper[name]" class="form-control">
                                                <option value="grab">Grab</span>
                                                <option value="bee">Bee</span>
                                                <option value="ahamove">Ahamove</span>
                                                <option value="shoppee">Express</span> 
                                            </select>
                                            <div class="flex-row">
                                                <div class="form-group">
                                                     <label for="xxx">Mã đơn hàng</label>
                                                     <input type="text" id="xxx" name="shipper[id]" class="form-control required" value="" /> 
                                                </div>
                                                <div class="form-group">
                                                     <label for="xxx">Thành tiền</label>
                                                     <input type="text" id="xxx" name="shipper[total]" class="form-control required" value="" /> 
                                                </div>
                                            </div>
                                            <hr/>
                                            <div class="flex-row">
                                                <div class="form-group">
                                                     <label for="xxx">Tên khách hàng</label>
                                                     <input type="text" id="xxx" name="shipper[customer_name]" class="form-control required" value="" /> 
                                                </div>
                                                <div class="form-group">
                                                     <label for="xxx">SĐT</label>
                                                     <input type="text" id="xxx" name="shipper[customer_phone]" class="form-control required" value="" /> 
                                                </div>
                                            </div>
                                        </div>
                                        <div><button class="btnconfirm button">Xác nhận</button></div>
                                    </form>
                                    `,
                                    beforeOpen:function(sheetId){
                                        var element = $("#"+sheetId);
                                        // console.log(element);
                                         element.find("form").validate({
                                            submitHandler : function(form){
                                                 var data  = $(form).serializeObject();
                                                data.order_id = order_id;
                                                wpajax("wc_pos_update_ship_order",data,function(r){
                                                    if(r){
                                                        //update local & ui
                                                        div.html(`
                                                        <div>Đơn vị vận chuyển: ${data.shipper.name}</div>
                                                        <div>Mã Vận chuyển: ${data.shipper.barcode}</div>
                                                        <div>Tổng tiền: ${data.shipper.total}</div>
                                                        <div>Theo dõi: <a href="${data.shipper.map}" target="_blank"> trên google</a></div>
                                                        `);
                                                    }
                                                 }); 
                                                 sheetchooser.close();
                                            }
                                         });
     
                                    }
                                });
                            });
                       }
                    });

                     
                       e.addTab({
                            name:'Đơn hàng online',
                            html:`<div class="flex-col">
                         <div>
                            <h1><span class="txt"> Đơn hàng online (<span class="total">0</span>)</h1>
                             <div>
                               Đơn hàng từ dịch vụ bên thứ 3 cần được xử lý, ví dụ: Từ App, wwebsite,...
                             </div>
                         </div>
                        <div class="media-frame-wrap scroll">
                            <div class="payment_box payment_method_bacs">
                                <table class="table">
                                    <thead>
                                       <th>#</th>
                                        <th>Tiền</th>
                                        <th>Ngày</th>
                                        <th>Thanh toán</th>
                                        <th>Vị trí</th> 
                                        <th>Vận Chuyển</th> 
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        </div>`,
                        callback: function(evt){
                                 evt.tab.on("change",".search",function(){
                                    evt.tab.find(".table tbody").html("");
                                    //load
                                    me.date({
                                        data:{date:this.value},
                                        callback : function(r){
                                            var total = 0;
                                             
                                            evt.tab.find(".table tbody").html(r.reverse().map(function(v){
                                                total+= v.order_total*1;

                                                var print_url = '/wp-admin/admin.php?print_pos_receipt=true&oder_id='+v.order_id+'&_wpnonce='+wpajax.config._wpnonce;

                                                return `<tr>
                                                    <td><a href="/wp-admin/post.php?post=${v.order_id}&action=edit" target="_blank">${v.order_number}</a></td>
                                                    <td>${show_money_none(v.order_total)}</td>
                                                    <td>${v.order_date.split("T").join(" ")}</td>
                                                    <td>${v.payment_method_title}</td> 
                                                    <td>${v.order_tab=="main"?"Mang đi":v.order_tab}</td> 
                                                    <td></td> 
                                                    <td><a href="${print_url}" onclick="posPrintReceipt('${print_url}');return false;">In bill</a></td>

                                                </tr>`;
                                            }));

                                            evt.tab.find(".total").html(show_money_none(total));
                                        }
                                    });

                                });
                           },
                           onAcive:function(e){
                              //ask new online
                           }
                        });
                   }
                }); 
            }
            
            
            $("#modal-ordertoday").addClass("md-show");



        },
        get : function(){
            this.data = storage.getItem("_"+wpajax.config.session);
             try{
                  this.data= JSON.parse(this.data);
              }catch(e){
                  
              } 
             if(!this.data){
                 this.data={};
                this.data[date_str]  =[];
             }
             return this.data;
        },
        today : function(){
            return this.data[date_str]||[];
        },
        date : function(options){
            wpajax("wc_pos_staff_order_date",options.data,function(r){
                if(r){
                     options.callback(r);
                }
             });
        },
        yesterday : function(){


            var date = new Date();
            date.setDate(date.getDate() - 1);
            return this.data[date_str]||[];
        },
        save : function(a){ 
            if(a){
                if(!this.data[date_str]){
                    this.data[date_str] =[];
                }
                this.data[date_str].push(a);
            }
            
            storage.setItem("_"+wpajax.config.session,JSON.stringify(this.data));
            return this;
        }
    }
};
})(window);
/*pos.trick.js*/
window.wc_pos_register_print = function(){
    if($(".woocommerce_order_items_wrapper .tbc.active table tbody tr").length>0){
            $(".wc_pos_register_pay").trigger("click");
            $(".go_payment").trigger("click");
            
    }
};

 
setTimeout(function(){
    var abc = window.POS_APP.checkPOSUserLogin;
    window.POS_APP.checkPOSUserLogin = function(data){
        if ( ! data.register_status_data || data.register_status_data === false ) {
            return;
        }

        if(!AhluPos.config.isctv){
            var loggedInUser = !empty(data.register_status_data.display_name) ? data.register_status_data.display_name : data.register_status_data.user_nicename;
            openModal("modal-locked-register");

            //trick a.k.a

            $("#modal-locked-register").find('.md-content').html("").html("<div>" + loggedInUser + " has taken over this register.</div>");
            setTimeout(function () {
                location.href = wc_pos_params.admin_url + "admin.php?page=wc_pos_registers&close=" + pos_register_data.ID + '&forced=true';
            }, 1500);

        }else{
            closeModal("modal-locked-register");
        }
        // abc();
    };


    var abc_stock = window.POS_APP.checkStock;
    window.POS_APP.checkStock= function (product_data, quantity, cart_item_key) {
    try {
         return true;
         
        var product_id = typeof product_data.variation_id != 'undefined' ? parseInt(product_data.variation_id) : parseInt(product_data.product_id);

        if (product_data.in_stock === false && product_data.backorders_allowed === false) {
            throw new Error(sprintf(pos_i18n[3], product_data.title));
        }
        if (CART.has_enough_stock(product_data, quantity) === false) {
            throw new Error(sprintf(pos_i18n[4], product_data.title, product_data.stock_quantity));
        }
        // Stock check - this time accounting for whats already in-cart
        if (product_data.managing_stock === true) {
            var managing_stock = product_data.managing_stock;
            var products_qty_in_cart = CART.get_cart_item_quantities();
            var check_qty = typeof products_qty_in_cart[product_id] != 'undefined' ? products_qty_in_cart[product_id] : 0;

            /**
             * Check stock based on all items in the cart
             */
            if (CART.has_enough_stock(product_data, check_qty + quantity) === false) {
                throw new Error(sprintf(pos_i18n[5], product_data.stock_quantity, check_qty));
            }

            if (product_data.stock_quantity < check_qty + quantity && product_data.backorders_allowed) {
                if (cart_item_key != 'undefined') {
                    var view = $('tr#' + cart_item_key + ' td.name .view');
                    if (!view.find('.backorders_allowed').length) {
                        view.append('<span class="register_stock_indicator backorders_allowed">' + pos_i18n[40] + ' </span>');
                    }
                }
            } else if (cart_item_key != 'undefined') {
                $('tr#' + cart_item_key + ' td.name .view .backorders_allowed').remove();
            }
        }
        return true;
    } catch (e) {
        console.log(e);
        APP.showNotice(e.message, 'error');
        return false;
    }
};
},1000);
/*print.io.js*/
(function(win){
     function print(msg){
        //now go
            if(msg.text.ac=='print_html'){
                PrintService.print.html(msg.text.data);
               
            }else if(msg.text.ac=='print_json'){
                PrintService.print.json(msg.text.data);
            }
    } 
    $(document).on('SokcetIO',function(e,chanel){
            

        /*
            win.mychanel.printer.send({user:{_id:win.AhluPos.user._id},ID:win.AhluPos.config.ID,outlet:win.AhluPos.config.outlet,name:win.AhluPos.config.name,text:{ac:'print_html',data:'helllo'}})
        */
        chanel.printer.io.once("value", function (data) { 
            /*
            
            log all message
            $messages.append(`<div class="date">${date}</div>`);

            data.forEach(function(snap){
                var msg = snap.val(); 
                append(msg);
            });
             */


        }); 
        
        var loaded =0;
       chanel.printer.io.limitToLast(1).on("child_added", function (snap) {
            
            if(loaded==0){ 
                return;
            }
            var msg = snap.val();
            console.log("socketIO:",msg);
            //check the same oulet
            if(msg.outlet==win.AhluPos.config.outlet || msg.outlet ==pos_register_data.outlet){
                 //check i am host from ui
                var action = win.AhluPos.settings.printer.action;
                if(action=="is_host"){
                    print(msg);
                }else if(win.AhluPos.user._id!=msg.user._id){
                    
                    print(msg);
                } 
                
                
            } 
            
        });  

        setTimeout(function(){
            loaded =1;
        },2000);
            
    });
})(window);
/*print.js*/
(function(win){
  (function () {
   var dom, win, doc, where, iframe;

   iframe = document.createElement('iframe');
   iframe.id = "print_frame";
   iframe.src = "javascript:false";
   iframe.style.display = "none";
   // iframe.style.display='none';

   // where = document.getElementsByTagName('script')[0];
   // where.parentNode.insertBefore(iframe, where);
   $("body").append(iframe);

   win = iframe.contentWindow || iframe;
   doc = iframe.contentDocument || iframe.contentwin.document;

   doc.open();
   doc._l = (function (w, d) {
     return function () {
       w.vanishing_global = new Date().getTime();
     };
   })(win, doc);

   doc.write('<head><style type="text/css" media="screen,print">*{font-size:12px;line-height:14px;font-family: arial,sans-serif;}p{margin:0;}@page{size: auto;margin: 0;}body{margin:0;padding:0;width:100%;}table{width:100%;}@media print { div.page-break { display: block; page-break-before: always; } }</style></head>');
   doc.write('<body onload="document._l();"></body>');
   doc.close();

   var popup;
  if (win.dialogArguments) {
      popup = win.dialogArguments;
  } else if (opener) {
      popup = opener;
  } else if (parent) {
      popup = parent;
  }
   function send(data){
     if(popup)
     popup.postMessage(data,"*");
   }


    win.printJS = function(html,callback){
        $(doc).find("body").html(html);
        var title_ = document.title;
      document.title= "Printing...";
      
      
      setTimeout(function(){
         win.focus();
        win.print();
        if(callback){
          callback();
        }

        send({action:"end_print","old":document.title,"new":title_});
        document.title= title_;
      },500);

    };
 })();

  win.PrintService = {
    beforePrint : function(data,type){

    },
    print:{
        html : function(html){ 
            var html = $(`<div>${html}</div>`);
            if(typeof PrintService=="object"){
              PrintService.beforePrint(html,'html');
            }
            
            win.printJS(html[0].innerHTML,function(){

            });
        },
        json : function(json){
            if(typeof PrintService=="object"){
               PrintService.beforePrint(json,'json');
            }
            
            var html= '';
            //parse html
            //
             win.printJS(html,function(){

            });
        }
    }
}; 


$(document).on("Config",function(e,config) {
  if(win.innerWidth<1015){
      $(".moreaction").append(`<a class="settingprinter tieude tips button ladda-button tiped"><i class="fa fa-print"></i> Máy in<span></span></a>`);
  }
});
})(window);
/*product.js*/
$(document).on("Config",function(e,config) {

	
   $(document).on("ProductLoad",function(e,products){

   });      
         
 //show grid/list
 	$("#wc-pos-register-grids h3.hndle").wrap('<div class="title-grid-col"></div>');
 		 $(".title-grid-col").append(`<i class="fa fa-th showgrid" aria-hidden="true"></i>`);
    var  showgrid =window.localStorage.getItem("showgrid");
    var pro_block = $("#grid_layout_cycle").addClass("showgrid");
    if(showgrid=="grid"){
    	$(".showgrid").addClass("fa-th").removeClass("fa-list");
    }else{
    	$(".showgrid").addClass("fa-list").removeClass("fa-th");
    }
    

	if(window.innerWidth<1015){
		         
      $("#wc-pos-register-search-products").wrap(`<div class="productmodile"></div>`);
      // $('.productmodile').append(`<span class="qrcodeproduct scanqrcode"><i class="fa fa-qrcode" aria-hidden="true"></i></span>`);
      $(".title-grid-col").appendTo('.productmodile');
 
    }
   
    $(document).on("click",".title-grid-col .showgrid",function(){
        pro_block.toggleClass("grid");
        if(pro_block.hasClass("grid")){
        	window.localStorage.setItem("showgrid","grid");
        	$(this).addClass("fa-th").removeClass("fa-list");
        }else{
        	window.localStorage.setItem("showgrid",'normal');
        	$(this).addClass("fa-list").removeClass("fa-th");
        }
    });

    $(document).on("Qrcode",function(e,code){

    	if(typeof code=="object"&&code.ac=="finger"){

				//check time
				var time = code.time;
				var now = Date.now();
				var fire = timer*1000;
				if(now-old_time<fire){
					wpajax("wc_hr_finger_checkin",code,function(res){
              		if(res.code){
              			alert(res.message);
              		}else{
              			alert(res.error);
              		}
              	});
				} 
			}

    }); 
});
/*qrcode.js*/
(function(win){

	$(document).on("Config",function(){
        $("#regiser_top_bar #pos_register_buttons").append(`<span class=" scanqrcode" style="margin: 0 8px;font-size: 20px;"><i class="fa fa-qrcode" aria-hidden="true"></i></span>`);
		$("#bill_screen .opmenumain").append(`<a class="button wc_pos_qrcode_cus scanqrcode" style="cursor: pointer;"><i class="fa fa-qrcode"></i> Qrcode</a>`);
        var resize = function(){
            
            if(win.innerWidth<1015){
                $(".wc_pos_qrcode,.scanqrcode").show();
                
            }else{
              $(".wc_pos_qrcode,.scanqrcode").hide();
              $(".wc_pos_qrcode,.scanqrcode").hide();
            }
        };
        resize();
        $(win).bind("resize",resize);
        //qrcode for customer
        var abc = $(`<a class="button wc_pos_qrcode scanqrcode" style="cursor:pointer"><i class="fa fa-qrcode"></i> Qrcode</a>`);
        abc.insertBefore("#add_customer_to_register");
        abc.click(function(e){
            e.preventDefault();
            if(!win.ADevice){ 
                $(".add_items input").focus();
            }
            
        });

        $(document).on("click",".scanqrcode",function(e,data){
            if(win.MyScan){
                win.MyScan(function(code){

                    alert(code);
                    try{
                        code = JSON.parse(decodeURIComponent(code));
                    }catch(e){}


                    $(document).trigger("Qrcode",[code]);
                    //barcode
                    //user
                    //payment
                    //...
                });
            }
            

        });
    });


    //listen Qrcode
    $(document).on("Qrcode",function(e,info){

    	
    	if(typeof info=="object" && info.ac=="cus"){
    		var data = info.data;
    		//append to 
    	}

    });
    
})(window);
/*staff.js*/
$(document).on("Config",function(e,config) {
 

});
/*table.io.js*/
$(document).on("Config",function(e,config) {
   
    
    
});
$(document).on('SokcetIO',function(e,chanel){
            

        /*
            win.mychanel.table.send({user:{_id:win.AhluPos.user._id},ID:win.AhluPos.config.ID,outlet:win.AhluPos.config.outlet,name:win.AhluPos.config.name,text:{ac:'print_html',data:'helllo'}})
        */
        chanel.table.io.once("value", function (data) { 
            /*
            
            log all message
            $messages.append(`<div class="date">${date}</div>`);

            data.forEach(function(snap){
                var msg = snap.val(); 
                append(msg);
            });
             */


        }); 
        
        var loaded =0;
       chanel.table.io.limitToLast(1).on("child_added", function (snap) {
            
            if(loaded==0){ 
                return;
            }
            var msg = snap.val();
            console.log("socketIO:",msg);
            //check the same oulet
            if(msg.outlet==win.AhluPos.config.outlet || msg.outlet ==pos_register_data.outlet){
                 //check i am host from ui
                // var action = win.AhluPos.settings.printer.action;
                // if(action=="is_host"){
                //     print(msg);
                // }else if(win.AhluPos.user._id!=msg.user._id){
                    
                //     print(msg);
                // } 
                
                
            } 
            
        });  

        setTimeout(function(){
            loaded =1;
        },2000);
            
    });
/*table.js*/
(function(win){
    jQuery(document).on("Config",function(e,config){
         //auto open table if this app is restaurant
        if(config.tables && config.tables.length>0){
            openModal('modal-tabs');
        }
        
        //action on table
        //
        
        $(document).on("click","#move_table",function(){
            win.openSheet({
                data:`<h2>Chuyển bàn</h2> 
                <form class="screen">
                    <div class="one">
                          
                            <div class="form-group">
                                 <label for="xxx">Từ</label>
                               <select id="select_from" name="from" class="form-control" ></select>
                                 
                            </div>
                            <div class="form-group">
                                 <label for="xxx">Đến</label>
                               <select id="select_to" name="to" class="form-control" ></select>
                                 
                            </div>
                        
                    </div>
                    <div class="two">
                        <button>Đồng ý</button>
                    </div>
                </form>
                `,
                beforeOpen: function(sheetId) {
                   var me = $("#"+sheetId);
                   me.find("form").validate({
                     submitHandler : function(form){
                        var data = $(form).serializeObject();
                     }
                   });
                }
            });
        });
         $(document).on("click","#merge_table",function(){
            win.openSheet({
                data:`<h2>Nhập bàn</h2> 
                <form class="screen">
                    <div class="one">
                          
                            <div class="form-group">
                                 <label for="xxx">Chon các bàn cần nhập</label>
                               <select id="select_from" name="from" multiple="multiple" class="form-control" ></select>
                                 
                            </div>
                            <div class="form-group">
                                 <label for="xxx">Đến bàn</label>
                               <select id="select_to" name="to" class="form-control" ></select>
                                 
                            </div>
                        
                    </div>
                    <div class="two">
                        <button>Đồng ý</button>
                    </div>
                </form>
                `,
                beforeOpen: function(sheetId) {
                   var me = $("#"+sheetId);
                   me.find("form").validate({
                     submitHandler : function(form){
                        var data = $(form).serializeObject();
                     }
                   });
                }
            });
        });
    }); 
})(window);
/*theme.js*/
$(document).on("Config",function(e,config) {

	if(window.innerWidth<1015){
            $(".moreaction").append(`<a class="settingtheme tieude tips button ladda-button tiped" style="cursor: pointer;"><i class="fa fa-cog" aria-hidden="true"></i> Cài đặt<span></span></a>`);
        }
 		 //setup print setting
	       var tabs = ModalTabs({
	         id:"modaltheme",
	         init :  function(e){
	            //append to menu header POS Client
	           $("#pos_user_badge .menu_bar").prepend(`<div class="settingtheme tieude" style="cursor: pointer;"><i class="fa fa-cog" aria-hidden="true"></i> Cài đặt <span></span></div>`)
	           $(document).on("click",".settingtheme",function(evt){
	           		evt.preventDefault();
	               e.modal.addClass("md-show");
	           });
	         
	           e.addTab({
	            name:'Giao diện',
	            html:`<div class="woocommerce-checkout printsettingblock" style="overflow: auto;" >
	                <style>
	                
	                </style>
	                <h1><span class="txt">Mẫu giao diện</span></h1>
 
		              <div class="chon_them_ra">
		                 <!-- <label>
		                  <input type="radio" value="color_md" data-theme="color_system" name="dl_theme" checked>
		                  <span class="design md"></span>
		                  <span class="text">Mặc Định</span>
		                </label> -->

		                <label>
		                  <input type="radio" value="color_cam" data-theme="color_cam" name="dl_theme" checked="">
		                  <span class="design cam"></span>
		                  <span class="text mau_cam">Màu Cam</span>
		                </label>

		                <label>
		                  <input type="radio" value="color_xanh" name="dl_theme">
		                  <span class="design xanh"></span>
		                  <span class="text mau_xanh">Màu Xanh</span>
		                </label>

		                <label>
		                  <input type="radio" value="color_xam" name="dl_theme">
		                  <span class="design xam"></span>
		                  <span class="text mau_xam">Màu Xám</span>
		                </label>

		                 <label>
		                  <input type="radio" value="color_do" name="dl_theme">
		                  <span class="design do"></span>
		                  <span class="text mau_do">Màu Đỏ</span>
		                </label>
		                <label>
		                  <input type="radio" value="color_cafe" name="dl_theme">
		                  <span class="design cafe"></span>
		                  <span class="text mau_do">Cafe</span>
		                </label>
		              </div>
		              <!--  -->
		              <div class="thoigian_in">
		                <div class="title">
		                  Thời gian In
		              </div>
		              <div>
		                <label for="asyn_timer">Thời gian đồng bộ in ấn(thời gian)</label>
		                <input type="text" id="asyn_timer" value="10" min="10" max="1000" placeholder="">
		              </div>
		              </div>
		          
		              <!--  -->
		              <div class="sound_time">
		                  <div class="title">
		                  Âm thanh
		              </div>
		                <div class="detail_sound">
		                <form method="post" name="quangcao" class="quangcaonew" id="quangcaoform" target="create_ads" enctype="multipart/form-data" action="">
		                  <label for="sound_coming">Âm thanh khi có đơn hàng mới</label>
		                 <input type="file" id="sound_coming" name="sound_coming">
		                 <button>Tải lên</button>
		                 <div class="video_ads_show hide">
		                  <p>Review in https://fpt.ai/tts</p>
		                  <audio src="" controls="" playsinline=""></audio>
		                 </div>
		                </form>
		                <iframe src="" name="create_ads" class="create_ads"></iframe>
		                <script>
		                  setTimeout(function(){
		                    jQuery(document).ready(function($){
		                       $(".file_video").on("change",function(){
		                        var fileUrl =   URL.createObjectURL(this.files[0]);
		                         $(".video_ads_show").removeClass("hide").find("audo").attr("src", fileUrl);
		                      });
		                    });
		                  },3000);
		                </script>
		              </div>
		              </div>
		          
	               </div>`,
	               callback:function(evt){
	                    var theme= window.AhluPos.settings.data_theme;
				        if(theme){
				            $("body").attr("data-theme",theme); 
				            $(".chon_them_ra input[value='"+theme+"']").attr("checked","checked");
				        }

				        evt.tab.find("[name=dl_theme]").on("click",function(){
	                   		$("#themstyle").remove();
	                   		$("body").append(`<link media="all" type="text/css" href="/wp-content/plugins/ahlutools/woo/woo-pos/theme/${this.value}.css" id="themstyle" rel="stylesheet">`);
	                   	});

	                     
	               },
	               onActive : function(evt){
	                   
	                    // var input = evt.tab.find(`.mainaction [value='${printer.action}']`);
	                    // input.closest('li').trigger('click');
	               }
	           }); 
	           
	        }
	    });
 	
	 
        // $(".wc_pos_register_pay").clone().html("In")
        // .removeClass("wc_pos_register_pay").addClass("wc_pos_register_pay_fast").css("width","calc(25% - 60px) !important")
        // .insertAfter($(".wc_pos_register_pay").css("width","auto"));
        // $(".wc_pos_register_pay_fast").on("click",function(){
        //     openConfirm({
        //         content: '<h3>Bạn có muốn thanh toán '+$('.tab-tabs .tab.active span').eq(0).text()+'?</h3><strong>NOTE:</strong> Sau khi xoá bàn dữ liệu không thể hồi phục lại đươc.',
        //         confirm: function(){
        //             $('#payment_method_cod').attr("checked","checked");
        //             $(".go_payment").trigger("click");
        //         },
        //         cancel: function(){
                   
        //         },
        //         notSign: true
        //     });
            
        // });
        //choose theme
        

        // choose timer
        // if(window.localStorage && window.localStorage["asyn_timer"]){
        //     $("#asyn_timer").val(window.localStorage["asyn_timer"]);
        //     window.AhluPos.remotePrint.timer = window.localStorage["asyn_timer"];
        // }
        // $(document).on("change","#asyn_timer",function(){
        //     if(window.localStorage && window.localStorage["asyn_timer"]){
        //         window.localStorage["asyn_timer"] = this.value;
        //     }
        //     //
        //     window.AhluPos.remotePrint.timer = this.value;
        //     window.AhluPos.remotePrint.update();
        // });
        // window.AhluPos.init();
        

        //try to catch product
        // setTimeout(function(){

        // },10*1000);
        // 
        // 
});
/*ui.js*/
(function(win){
     win.hardwareBackPress = function(){
  if($(".modal.in").length){
    var l = $(".modal.in").length;
    if(l==1){
        $(".modal.in").modal("hide");
    }else{
        $(".modal.in").eq(l-1).modal("hide");
    }
  }else if($(".md-modal.md-show").length){
    var l = $(".md-modal.md-show").length;
    if(l==1){
        $(".md-modal.md-show").removeClass("md-show");
    }else{
        $(".md-modal.md-show").eq(l-1).removeClass("md-show");
    }
  }else{
     win.close();
  }
};
win.beforeClick = function(e){

};

 
win.AhluPos.ui={
    menubar : {
        add : function(options){
            var a =$(options.html);
            a.prependTo($(".menu_bar"));

            if(options.callback){
                ptions.callback(a);
            }
        }
    }
};

$(document).on("Config",function () {
  
     
   $(document).on("click",".md-modal.pos .media-menu a",function(e){
        var modal = $(this).closest(".md-modal");
        // console.log(e);
        e.preventDefault();
        var a = $(this).data("bind") ;
        modal.find(".popup_section").hide();
        modal.find("[data-bind]").removeClass("active");
        
       $(this).addClass("active");
       $("#"+a).show();

       
    });

    // $(document).on("click",".moreaction>*",function(e){
    //     e.preventDefault();
    //     $(".moreaction .close_x").trigger("click");
    // });

    
        
});
$(document).ready(function ($) {
     //override 
    
    win.localhost.init($);
     
    //add new button
    $('<div type="button" class="wc_pos_register_print page-title-action">In</div>').insertAfter($(".wc_pos_register_pay"));

    $(document).on('keydown', function(e) {
        if((e.ctrlKey || e.metaKey) && (e.key == "p" || e.charCode == 16 || e.charCode == 112 || e.keyCode == 80) ){
            
            wc_pos_register_print();
        }  
    });

    $(".wc_pos_register_print").on("click",function(e){
        e.cancelBubble = true;
        e.preventDefault();

        e.stopImmediatePropagation();

        wc_pos_register_print();
        
    });
    
    //$("body").attr("data-theme",this.value);
    $(document).on("click",".chon_them_ra input",function(){
        $("body").attr("data-theme",this.value);
        win.AhluPos.settings.data_theme = his.value;
        win.AhluPos.settings.save();
    });
    
setTimeout(function(){
 
        if(win.ADevice){
            win.addEventListener("click",function(e){

          
                var ele = e.target;
                if(ele.nodeName.toLowerCase()=="a"){
                    var href = jQuery(ele).attr("href");
                    if(href&&href!="#"){
                        href = ele.href;
                       
                        if(win.openURL){ e.preventDefault();win.open(href);}
                    } 
                } 
            });
        }

        
        
        
        
        //save direction
        $(".pos_register_user_panel").attr('href','/wp-admin/admin.php?page=posmanager');
        

        $("#sync_data").on("click",function(e){
            e.preventDefault();
            e.stopPropagation();

            return false;
        });

        


        //auto open table if this app is restaurant
        openModal('modal-tabs');

        $("body").append('<audio style="opacity:0;position:absolute;z-index:-1;" controls="controls" id="tts-audio" src="'+document.location.origin+'/wp-content/plugins/woocommerce-point-of-sale/assets/sound/co-don-hang-moi.vi.mp3"></audio>');

        $("body").append(`<span class="floatbtninv"><i class="fa fa-shopping-cart my-float"></i></span>`);
        $(".floatbtninv").draggable();
        
        
        $("#close_register").html(`<i class="fa fa-sign-out" aria-hidden="true"></i> Đăng xuất`).appendTo('.moreaction');
         $(`<div id="menumobile"><i class="fa fa-bars"></i></div>`).prependTo("#regiser_top_bar #pos_register_buttons");


         var abc = $("#wc-pos-actions").clone().addClass("menuone");
            $("#wc-pos-actions").addClass("opmenumain");
            //get one for menu bar
            abc.insertBefore("#wc-pos-register-grids");
            
            $("#wc-pos-actions.menuone").prepend(`<div class="moreaction">
            <div class="moreactionhead"></div>
            <div class="close_x">
                    <i class="fas fa-times" onclick=" "></i>
                </div>
            </div>`).find("a").appendTo(".moreaction");
            
            
            $("#postbox-container-2").prepend('<div class="abccontainer234"></div>');
 
        
        //search product
        $(document).on("keyup",".add_items input",function(){
            var val = this.value.toLowerCase();
            var lis = $("#grid_layout_cycle li");
            if(val){
                vals = val.make_slug().split("-");
                
                lis.each(function(){
                    var slug = $(this).attr("date-slug");
                    var id = $(this).attr("date-id");
                    var sku = $(this).attr("date-sku");
                    
                    if(vals.includes(slug) || val.includes(id)|| val.includes(sku) || $(this).text().trim().toLowerCase().includes(val)){
                        $(this).show();
                    }else{
                        $(this).hide();
                    }
                    
                });
            }else{
                lis.show();
            }
            
        });
        
        

        var resize = function(){
            var h = $(".tab-tabs").height()+$(".wc_pos_register_subtotals.tbr").height()+20;
            $(".woocommerce_order_items_wrapper.tbr").height($("#bill_screen").height()-h);
            if(win.innerWidth<1015){
                $(".floatbtninv").show();

                $(".pos_register_user_panel").prependTo(".moreactionhead");

                $(".moreaction .wc_pos_register_notes,.moreaction #add_shipping_to_register,.moreaction .wc_pos_register_discount").hide();
                $(".opmenumain #add_shipping_to_register,.opmenumain #add_product_to_register").hide();

                $("#wc-pos-register-search-products,#wc-pos-actions").insertAfter(".abccontainer234");
            }else{
                $("#wc-pos-register-search-products,#wc-pos-actions").appendTo(".abccontainer234");


                $(".pos_register_user_panel").insertAfter("#menumobile");
                $(".floatbtninv").hide();

                $(".moreaction .wc_pos_register_notes,.moreaction #add_shipping_to_register,.moreaction .wc_pos_register_discount").show();
                $(".opmenumain #add_shipping_to_register,.opmenumain #add_product_to_register").show();
            }
        };
        resize();
        $(win).bind("resize",resize);
        $(document).on("Config",function(){
            setTimeout(function(){
                resize();
            },1300);
        });
        
        $(".floatbtninv").on("click",function(e){
            $("#postbox-container-1").toggleClass("active"); 
            
        });
        
        $("#menumobile").on("click",function(e){
            $("#wc-pos-actions.menuone").toggleClass("active");
            
        });
        $(".moreaction .close_x").on("click",function(e){
            $("#wc-pos-actions.menuone").removeClass("active");
        });

        //cai dat bang order
        if(win.innerWidth<1024){
            $(".woocommerce_order_items_wrapper,.wc_pos_register_subtotals").width(win.innerWidth);
        }
        
        
        

    },1000);
});



})(window);
/*bridge.js*/
(function(win){
    function post(e,t,n,r){$.ajax({url:e,type:"POST",data:t,async:r||!1,success:function(e){try{e=JSON.parse(e.trim())}catch(e){}n(e)},error:function(e,t,n){this.success(e.responseText)}})}
    document.location.replaceUrlParam=function(e,t,n){return replaceUrlParam(n||this.href,e,t)};

    function postForm(url,form,func,a){
      $.ajax({
            
            type: "POST",
            url: url,
            global: false,
            data: form,
            processData: false,
            contentType: false,
            beforeSend:function(xhr,options){
         
              var auth =$('[name="auth-token"]').attr("content");
              if(auth){
                xhr.setRequestHeader( 'auth-token',auth);
              }
               
            },
            async: a==true?true:false,
            success:function(data){
                try{
                  data =  JSON.parse(data);
                }catch(e){}

                func(data);
            },
            error :function(a,b,c){
               this.success(a.responseText);
            }
        });
    };
    String.prototype.post= function(data,f){
        post(String(this),data,f,true);
    };
    String.prototype.form= function(options){
        
        var settings = $.extend({url:String(this),data:{},f:function(){}},options,true);

        return {
            url:function(url){
                settings.url = url;
                return this;
            },
            data:function(d){
                settings.data = d;
                return this;
            },
            post : function(f){
                f = f?f:settings.f;
                post(settings.url,settings.data,f,true);
                return this;
            }
        }
    };


    String.prototype.postForm= function(form,f){
        postForm(String(this),form,f,true);
    };

    HTMLElement.prototype.toggle = function () { 
        this.style.display = this.style.display == 'none' ? '' : 'none';
    };


    HTMLElement.prototype.post = function (f,url) { 
        if(this.nodeName=="FORM"){
            url = url?url:(this.action?this.action:document.location.href);
            postForm(url,this,f,true);
        }
    };
})(window);

//bride
function permission(name){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            if($("body").hasClass("android")&& window.WebViewJavascriptBridge && typeof window.WebViewJavascriptBridge=="object"){
             if(window.WebViewJavascriptBridge.hasPermissions(name)=="1"){
                resolve(1);
             }else{
                reject(0);
             }
            }else{
                //debug or something
                resolve(1);
            }
        },500);
    });
}

 
(function(win){
    if(!window.webViewBridge){
    var parent = window.self!=window.top?window.parent:null;
 
    var promiseChain = Promise.resolve();

        var callbacks = {};

      

        var guid = function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
        };
 
            win.webViewBridge = {
                /**
                 * send message to the React-Native WebView onMessage handler
                 * @param targetFunc - name of the function to invoke on the React-Native side
                 * @param data - data to pass
                 * @param success - success callback
                 * @param error - error callback
                 */
                send: function(targetFunc, data, success, error) {

                    var msgObj = {
                        targetFunc: targetFunc,
                        data: data || {}
                    };

                    if (success || error) {
                        msgObj.msgId = guid();
                    }

                    var msg = JSON.stringify(msgObj);

                    promiseChain = promiseChain.then(function () {
                        return new Promise(function (resolve, reject) {
                            console.log("sending message " + msgObj.targetFunc);

                            if (msgObj.msgId) {
                                callbacks[msgObj.msgId] = {
                                    onsuccess: success,
                                    onerror: error
                                };
                            }
                            if(win.ReactNativeWebView)win.ReactNativeWebView.postMessage(msg);

                            resolve();
                        })
                    }).catch(function (e) {
                        if(error){
                            error(null);
                        }
                        // console.log('rnBridge send failed ' + e.message);
                    });
                },


            };
             
           
     
            win.addEventListener('message', function(e) {
              // alert(1);
                // if (event.origin !== "__"){
         
                  if(e.data=="close_app"){
                    go_to_home();
                    return;
                  }
                    // console.log("message received from react native");
                    
                    try {
                        var message = JSON.parse(e.data);

                         if (message.args && callbacks[message.msgId]) {
                            // alert(typeof message.args==='object'?JSON.stringify(message.args):message.args);
                            if (message.isSuccessfull) {
                                callbacks[message.msgId].onsuccess.apply(null, message.args);
                            }
                            else {
                                callbacks[message.msgId].onerror.apply(null, message.args);
                            }
                            
                            setTimeout(function(){
                                delete callbacks[message.msgId];
                            },30*1000);
                        }
                        
                    }
                    catch(err) {
                        console.log("failed to parse message from react-native " + err,e.data);
                      // if(callbacks[message.msgId]){

                      //   callbacks[message.msgId].onerror.apply(null, [e.data]);
                      // }
                        
                        
                        return;
                    }

                    
                // } 
            });
        
    }
})(window);
 setTimeout(function(){
   var location = window.ALocation;
  if(location){
    var loc = location.loc.split(",");
    window.GPS.cache={lat: loc[0]*1, lng: loc[1]*1};
  } 
  if(window.$){
    $(document).on("page::back", function(e) {

      var info = {
        exit :1
      };


      $(document).trigger("close", [info]);

      if(info.exit){
        window.close();
      }
        
    });
    $(document).trigger('bride_ready');

    (function($) {
        var currSeconds = 0;

          /* Increment the idle time
              counter every second */
          var idleInterval = setInterval(function () {
              currSeconds = currSeconds + 1;
              if(currSeconds>30){
                //reset
                 currSeconds = 0;
                 console.log("onIdle");
                 $(document).trigger('onIdle');
              }
          }, 2000);
          $(document).on("mousemove keypress touchmove",function() { 
              currSeconds = 0;
          });
      })($);

      if(window.ADevice){
          if(window.ADevice.iphonex){
              $("body").addClass("iphonex");
          }
      }
  }
    
  },4000);
(function(win){
    
    var callbacks={};
     var isMain = win.top==win.self;

     win.MyGPS = function(f){
        // if(win.GPS){
        //        win.GPS(f);
        //       return;
        // }


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
        (parent||opener).postMessage(JSON.stringify(data),"*");
     };
     win.MyScan = function(f){
        

        if(isMain){
           if(win.Scan){
               win.Scan(f);
           }else{
              f(null); 
           }
           return ;
        }
        var data={
          native:1,
          ac : "Scan",
          id:Date.now(),
          success : f,
          error : null
        };
        callbacks[data.id] = data;
        (parent||opener).postMessage(JSON.stringify(data),"*");
     };
     win.addEventListener("message",function(e){
        var data = e.data;
     
        
        if(typeof data=="string"){
            
            if(data.includes("passkey:")){
            
                var passkey = data.replace("passkey:","");
                   
            }else if(data.includes("adevice:")){
            
                document.body.classList.add("adevice");
                return;
            }
        }
 
        try{
            data = JSON.parse(data)
        }catch(e){}
        if(typeof data =="object" && data.native ){

            //check response
             if(data.response){
                if(callbacks[data.id]){
                    if(data.response.success){
                       if(callbacks[data.id].success){
                           if(callbacks[data.id].success)callbacks[data.id].success(data.response.data);
                       }else{
                            if(callbacks[data.id].error)callbacks[data.id].error(data.response.data);
                       }
                    }
                 
                }
                return;
            }

            switch(data.ac){
                case "GPS":
                    if(win.GPS){
                        win.GPS(function(pos){
                            data.response = {success:1,data:pos};
                            e.source.postMessage(JSON.stringify(data),"*");
                        });
                    }else{
                        data.response = {success:1,data:null};
                        e.source.postMessage(JSON.stringify(data),"*");
                    }
                break;
                case "Scan":
                    if(win.Scan){
                        win.Scan(function(d){
                            data.response = {success:1,data:d};
                            e.source.postMessage(JSON.stringify(data),"*");
                        });
                    }else{
                        data.response = {success:1,data:null};
                        e.source.postMessage(JSON.stringify(data),"*");
                    }
                break;
            }
        }
     });


 })(window);


(function(win){
         win.update_core  = function(func){
          window.webViewBridge.send('update_core', {}, func, function(err) { });
        };

        win.AAppReady  = function(func){
          window.webViewBridge.send('app_ready', {}, func, function(err) { });
        };
        win.go_to_home =function(){
           $(".modal").modal('hide').hide().removeClass("in");
           $(".modal-backdrop").remove();
        }

        win.AContacts=function(func){
            window.webViewBridge.send('contacts', {}, func, function(err) { });
        };

        win.deviceToken=function(func){
            window.webViewBridge.send('deviceToken', {}, func, function(err) { });
        };

        win.AShare=function(s){
            if(parent){
                var msgObj = {
                    targetFunc: 'share',
                    data: s
                }; 
                msgObj.msgId = guid();
                callbacks[msgObj.msgId] = {
                    onsuccess: success,
                    onerror: error
                };

                var msg = JSON.stringify(msgObj);
                parent.postMessage(msg,"child");
                return;
            }
            if(window.ReactNativeWebView){
                window.webViewBridge.send('share', s, function(res) { }, function(err) { });
            }else if(navigator.share){
                navigator.share({
                  title: document.title,
                  text: s,
                  url: document.location.href,
                });
            }
            
        };
        win.ABack=function(){
            window.webViewBridge.send('back', {}, function(res) { }, function(err) { });
        };

         win.AExit=function(){
            window.webViewBridge.send('close', {}, function(res) { }, function(err) { });
        };
        window.Picker = {
            mapbox : (function(){
                var gps=null;var marker=null;var map=null;var geocoder=null;
                
                 


                  return function(options,callback){

                    options = $.extend({onChange:function(){},center:[106.6867623,10.8127808],accessToken:'pk.eyJ1IjoiYWhsdSIsImEiOiJjbHRwdDZjc3UwZ21tMnZudGNycHR6Mm9iIn0.bRUbKUDE8SEDLXDb_N1hMg'},options,true);
                        

                    var methods = {
                        show: function(){
                            $("body").css("overflow","hidden"); 
                            $(".popupmap").show(); 
                        },
                        hide: function(){
                            $("body").css("overflow","auto"); 
                            $(".popupmap").hide(); 
                        }
                    };

                    if(map==null){
                        var width = window.innerWidth<1015?window.innerWidth:414;
                        $("body").append(`<style>
                            .popupmap{position:fixed;top:0;left:0;height:100%;width:100%;display:none;z-index: 100000000000;    background-color: rgb(59 54 54 / 44%);}
                            .popupmap .body{
    
       background-color: #fff; 
    margin: 5% auto;
    height: 90%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
     
    width: ${width}px;
     }
    .popupmap .c{
         cursor: pointer;
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 10;
    padding: 8px;
    font-size: 24px;
    height: 44px;
    background-color: #fff;
    border-radius: 50%;
    width: 44px;
    display: FLEX;
    justify-content: center;
    align-items: center;
    }
   
    .popupmap .mapb{flex:1;height:100%;}
    .popupmap .mapb{flex:1;height:100%;}
    .popupmap .result .lr{
        padding: 8px;
  
    display: flex;
    flex-direction: row;
    }
    .popupmap .mapboxgl-ctrl-top-right{
            left: 0;
    top: 44px;
    }
    .popupmap .mapboxgl-ctrl-geocoder--icon{
            right: 0;
    left: inherit;
    }
                            </style><div class="popupmap">
                            
    <div class="body">
        <div class="c">x</div>
        <div class="mapb"></div>    
        <div class="result">
            
        </div> 
        <div class="">
            <button type="button" class="btnok">Xác nhận </button>
            <button type="button" class="btnno">Huỷ bỏ </button>
        </div>                    
    </div>
               
                        </div>`);
                        if(options.accessToken) mapboxgl.accessToken = options.accessToken;
                        function load(){
                              var center = options.center;
                              map = new mapboxgl.Map({
                                container: $(".popupmap .mapb")[0],
                                style: 'mapbox://styles/mapbox/streets-v12',
                                center: center,
                                zoom: 16
                              });
             
              
                              map.on('load', function () {
                                // map.addSource('single-point', {
                                //   'type': 'geojson',
                                //   'data': {
                                //     'type': 'FeatureCollection',
                                //     'features': []
                                //   }
                                // });

                                // map.addLayer({
                                //   'id': 'point',
                                //   'source': 'single-point',
                                //   'type': 'circle',
                                //   'paint': {
                                //     'circle-radius': 10,
                                //     'circle-color': '#448ee4'
                                //   }
                                // });

                                
                              });
             
                         
                              marker = new mapboxgl.Marker({
                                draggable: true
                              })
                              .setLngLat(center)
                              .addTo(map);

                              if(window.GPS){
                                window.GPS(function(p){
                                     map.setCenter([p.lng,p.lat]);
                                    marker.setLngLat([p.lng,p.lat]);
                                });
                              }
                               
                              function onDragEnd() {
                                var e = marker.getLngLat();
                                // console.log(e);
                                var l = JSON.stringify(marker.getLngLat());
                                $(".popupmap .result").html(`
                                    <div class="lr"><span class="data" style="flex: 1;">${l}</span><span data-copy='${l}'>Copy</span></div>
                                    <div class="lr"><span class="data" style="flex: 1;">${l}</span><span data-copy='${l}'>Copy</span></div>
                                `);

                                post(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lng},${e.lat}.json?types=address&access_token=`+mapboxgl.accessToken,{},function(e){
                                     console.log(e);
                                },true);

                                if(options.onChange)options.onChange(marker.getLngLat());
                              }
                               
                              marker.on('dragend', onDragEnd);

                              $(".popupmap .c,.popupmap .btnno").on("click",function(){
                                methods.hide();
                                $(".popupmap .result").text("");
                              });
                              $(".popupmap .btnok").on("click",function(){
                                methods.hide();
                                $(".popupmap .result").text("");

                                if(callback)callback(marker.getLngLat());
                              });
                              

                            methods.show();


                            loadJS("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js",function(){

                                loadCSS("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css",function(){
                                     geocoder  = new MapboxGeocoder({
                                        country: 'vn',
                                    // Initialize the geocoder
                                    accessToken: mapboxgl.accessToken, // Set the access token
                                    mapboxgl: mapboxgl, // Set the mapbox-gl instance
                                    marker: false, // Do not use the default marker style
                                    placeholder: 'Tìm kiêm...', // Placeholder text for the search bar
                                    // bbox: [-59.8920050976494, 12.958016032319861, -59.24930490233564, 13.427986048198505], // Boundary for Berkeley
                                    // proximity: {
                                    //   longitude: 13.193114,
                                    //   latitude: -59.570655
                                    // } // Coordinates of UC Berkeley
                                  });

                                    map.addControl(geocoder);
                                    // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
                                    //  Add a marker at the result's coordinates
                                    geocoder.on('result', function (e) {
                                        console.log(e.result);
                                        map.setCenter(e.result.center);
                                       marker.setLngLat(e.result.geometry.coordinates);
                                    });
                                });
 
                            });
                        }
                        if(!window.mapboxgl){
                            loadJS("https://api.tiles.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.js",function(){
                                loadCSS("https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.css",load);
                            });
                        }else{
                           load();
                        }
                        

                    }else{
                       
                       if(options.center){
                         map.setCenter(options.center);
                         marker.setLngLat(options.center);
                       } 

                      if(window.GPS){
                        window.GPS(function(p){
                            map.setCenter([p.lng,p.lat]);
                            marker.setLngLat([p.lng,p.lat]);
                        });
                      }
                               
                       methods.show();
                    }

                    return methods;

                  }
            })()
        };
        window.Picker.document = (function(){
            if(!window.ReactNativeWebView){
                setTimeout(function(){
                    $("body").append(`<div style="display:none">
                        <input class="picker_all" multiple type="file" />
                        <input class="picker_image"  accept="image/*;capture=camera" type="file" />
                        <input class="picker_video"  accept="video/*;capture=camera" type="file" />
                     </div>`);
                },2000);
            }
            return {
                file : function(options,callback){
                    if(!options)options={};
                    options.type = "file";
                    if(window.ReactNativeWebView){
                         window.webViewBridge.send('ImagePicker', options, callback, function(err) {callback(null)});
                     }else{
                        $(".picker_all").off("change").on("change",function(){
                            
                            callback(this.files);
                        }).trigger("click");
                     }
                   
                },
                camera : function(options,callback){
                    if(!options)options={};
                    options.type = "camera";
                    if(window.ReactNativeWebView){
                         window.webViewBridge.send('ImagePicker', options, function(res){
                            var reader = new FileReader();
                               reader.readAsDataURL(res.uri);
                               reader.onload = function () {
                                res.base64 = reader.result;
                                if(callback)callback(res);
                               };
                               reader.onerror = function (error) {
                                 console.log('Error: ', error);
                               }; 
                            
                        }, function(err) {callback(null)});
                     }else{
                        $(".picker_all").off("change").on("change",function(){
                            // var blob_url = window.URL.createObjectURL(file);
                            // 
                            var file = this.files[0];
                            var reader = new FileReader();
                               reader.readAsDataURL(file);
                               reader.onload = function () {
                                file.base64 = reader.result;
                                if(callback)callback(file);
                               };
                               reader.onerror = function (error) {
                                 console.log('Error: ', error);
                               }; 
                        }).trigger("click");
                     }
                   
                },
                image : function(options,callback){
                    if(!options)options={};
                    options.type = "image";
                    if(window.ReactNativeWebView){
                         window.webViewBridge.send('ImagePicker', options, function(res){
                            var reader = new FileReader();
                               reader.readAsDataURL(res.uri);
                               reader.onload = function () {
                                res.base64 = reader.result;
                                if(callback)callback(res);
                               };
                               reader.onerror = function (error) {
                                 console.log('Error: ', error);
                               }; 
                            
                        }, function(err) {callback(null)});
                     }else{
                        $(".picker_image").off("change").on("change",function(){
                            // var blob_url = window.URL.createObjectURL(file);

                            var file = this.files[0];

                             var reader = new FileReader();
                           reader.readAsDataURL(file);
                           reader.onload = function () {
                            file.base64 = reader.result;

                            if(options.cropping && window.uploadCrop){
                                //show cropper
                                window.uploadCrop(file,options.width||75,options.height||75,function(a){
                                     file.base64 = a;
                               
                                    if(callback)callback(file);
                                });
                            }else{
                                    
                               if(callback)callback(file);
                            }


                            
                           };
                           reader.onerror = function (error) {
                             console.log('Error: ', error);
                           }; 


                           
                        }).trigger("click");
                     }
                },
                video : function(options,callback){
                    if(!options)options={};
                     options.type = "video";
                    if(window.ReactNativeWebView){
                         window.webViewBridge.send('ImagePicker', options, function(res){
                            var reader = new FileReader();
                               reader.readAsDataURL(res.uri);
                               reader.onload = function () {
                                res.base64 = reader.result;
                                if(callback)callback(res);
                               };
                               reader.onerror = function (error) {
                                 console.log('Error: ', error);
                               }; 
                            
                        }, function(err) {callback(null)});
                     }else{
                        $(".picker_video").off("change").on("change",function(){
                            // var blob_url = window.URL.createObjectURL(file);
                            // 
                         var file = this.files[0];    
                        var reader = new FileReader();
                           reader.readAsDataURL(file);
                           reader.onload = function () {
                            file.base64 = reader.result;
                            if(callback)callback(file);
                           };
                           reader.onerror = function (error) {
                             console.log('Error: ', error);
                           }; 
                                
                             
                        }).trigger("click");
                     }
                }
            }
        })();

        win.sqlite = {
            backup : function(url,callback,name){
                window.webViewBridge.send('exportdb', {name:name},function(str){
                    
                });
            },
            restore : function(url,callback,name){
                fetch(url).then(function(r){return r.text()}).then(function(str){
                    str.split(";").map(function(sql){
                        window.webViewBridge.send('db', {sql:sql.trim(),name:name},callback);
                    }); 
                    callback(str);
                }); 
            },
            clear : function(callback,name){
                window.webViewBridge.send('db', {sql:"SELECT name FROM sqlite_master WHERE type='table'",action:"query",name:name}, function(data){
                    data.map(function(tb){
                        window.webViewBridge.send('db', {sql:"DROP TABLE IF EXISTS "+tb,action:"query",name:name});
                    });
                    callback(data);
                }, function(err) {callback(null)});
            },
            query : function(sql, callback,name){
                 window.webViewBridge.send('db', {sql:sql,action:"query",name:name}, callback, function(err) {callback(null)});
            },
            query_first : function(sql, callback,name){
                window.webViewBridge.send('db', {sql:sql,action:"query_first",name:name}, callback, function(err) {callback(null)});
            }
        };

        win.query_sqlite=function(sql, callback,name){
            window.webViewBridge.send('db', {sql:sql,action:"query",name:name}, callback, function(err) {callback(null)});
        };
        win.query_first_sqlite=function(sql, callback,name){
            window.webViewBridge.send('db', {sql:sql,action:"query_first",name:name}, callback, function(err) {callback(null)});
        };
        win.Model = (function(){
           // if(!Object.extend){
            var modal = {
               __construct:function(){

               },
               _columns:{},
               insert: function(data){
                  var keys = [],values=[];
                  for(var i in data){
                    keys.push(i);
                    values.push("'"+(typeof data[i]=="object"?JSON.stringify(data[i]):data[i])+"'");
                  }
                  var sql="insert into "+this.table+"("+keys.join(",")+") values("+values.join(",")+")";
                  this.query(sql);
               },
               update: function(data){
                  var keys = [],values=[];
                  for(var i in data){ 
                    if(this.primary_key!=i){
                       values.push(i+"='"+(typeof data[i]=="object"?JSON.stringify(data[i]):data[i])+"'");
                    }
                  }
                  var sql= "";
                  if(this.primary_key){
                    var id = data[this.primary_key];
                    if(id){
                      sql = "update "+this.table+" set "+values.join(",")+" where "+this.primary_key+"='"+id+"'";
                    }else{
                      sql = "update "+this.table+" set "+values.join(",");
                    }
                    
                  }else{
                    sql = "update "+this.table+" set "+values.join(",");
                  }
                  
                  this.query(sql);
               },
               updateWhere: function(data,where){
                  var keys = [],values=[];
                  for(var i in data){ 
                    values.push(i+"='"+(typeof data[i]=="object"?JSON.stringify(data[i]):data[i])+"'");
                  }
                  var sql= "";
                  if(this.primary_key){
                    var id = data[this.primary_key];
                    if(id){
                     
                    }else{
                      sql = "update "+this.table+" set "+values.join(",");
                    }
                    
                  }else{
                    sql = "update "+this.table+" set "+values.join(",");
                  }
                  var wheres = [];
                  for(var i in where){ 
                    wheres.push(i+"='"+data[i]+"'");
                  }
                  var sql = "update "+this.table+" set "+values.join(",")+" where "+wheres.join(" and ");
                  
                  this.query(sql);
               },
               delete: function(){
                  query_sqlite(sql);
               },
               query: function(sql,func){
                  console.log(sql);
                  query_sqlite(sql,func);
               }
            };
            
            // Model.extend("abc",{}).then((model)=>{
            // console.log(modal);
            // });
            return {
              extend:function(tb,obj){
                return new Promise(function(resolve,reject){


                    var b= $.extend(modal,obj,true);
                    b.table = tb;
                    query_first_sqlite("select (select '[' || group_concat('\"'||name||'\"', ',') || ']'  from pragma_table_info('"+tb+"')) as cols,(SELECT l.name FROM pragma_table_info('"+tb+"') as l WHERE l.pk = 1) as primary_key",function(data){
                 
                      try{
                         console.log("Rows ==> ",data);

                         if(!data.cols){
                           reject("No table "+tb);
                           return;
                         }
                       // var data = JSON.parse(res);
                       b._columns = data.cols;
                       b.primary_key = data.primary_key;

                      }catch(e){
                         alert(e.message);
                      }
                      

                       resolve(b);
                    }); 
                    b.__construct();
                    // db.query("INSERT INTO users(name) values('hello')").query("select * from users",function(data){
                    //   alert(JSON.stringify(data));
                    //     // console.log();
                    // });
                    
                }); 
              }
            };
          })();
        //https://www.sqlitetutorial.net/sqlite-create-table/
        win.sqlite=function(name) {
            var db = name;
            return new Promise(function(resolve, reject) {
                resolve({
                    tables : function(func){
                        this.query("SELECT name FROM  sqlite_master  WHERE  type ='table' AND  name NOT LIKE 'sqlite_%'",function(data){
                            if(func)func(data);
                        });
                    },
                    insert: function(data){
                        var sql="";

                        this.query(sql);

                        return this;
                    },
                    update: function(data){
                        var sql="";

                        this.query(sql);
                        return this;
                    }, 
                    delete: function(data){
                        var sql="";

                        this.query(sql);
                        return this;
                    },
                    query: function(sql,func){
                        win.webViewBridge.send('db', {db:db,ac:"query",sql:sql,args:[]}, function(res) {
                            if(func)func(res);
                        }, function(err) { });
                        return this;
                    },
                    query_first: function(sql,func){
                        this.query(sql,function(data){
                            if(func)func(data&&data.length>0?data[0]:null);
                        });
                        return this;
                    },
                    table : function(name,sql,func){
                         win.webViewBridge.send('db', {db:db,ac:"table",tb:name,sql:sql,args:[]}, function(res) {
                            if(func)func(res);
                        }, function(err) { });
                         return this;
                    }
                });
            });
        };
        var dbdefault = null;
        win.sqlite("dbdefault").then(function(db){
            dbdefault = db;
        });

        function filtercolumnnintb(cols,data){
            for(var i in data){
                if(cols[i]){
                    cols[i]=data[i];
                }
            }
        }


        setTimeout(function(){
            if(window.loadJS)
            loadJS("https://cdnjs.cloudflare.com/ajax/libs/squel/5.13.0/squel.min.js",function(){
             });
        },2000);
        function SqliteModel(db,tb,options){
            var database = db?db:dbdefault;
            var methods ={
                primaryKey:"_id",
                columns : options.columns||{},
                query:dbdefault.query,
                builder: function(){
                    return {
                        sql: squel.select().from(tb),
                        excute: function(){
                            methods.query(next.toString());
                        }
                    };
                },
                insert: function(data){

                    var cols = filtercolumnnintb(this.columns,data);

                    var sql=`insert into ${tb}(${Object.keys(cols).join(",")}) values(${Object.values(cols).map(function(v){
                        return `'${typeof v=="object"?JSON.stringify(v):v}'`;
                    }).join(",")})`;

                    database.query(sql);

                    return this;
                },
                update: function(data){
                    var cols = filtercolumnnintb(this.columns,data);
                    var keys = Object.keys(cols);
                    var sql=`update ${tb} set ${Object.values(cols).map(function(v,i){
                        return `${keys[i]}='${typeof v=="object"?JSON.stringify(v):v}'`;
                    }).join(",")} where ${this.primaryKey}=${cols[this.primaryKey]}`;

                    database.query(sql);

                    return this;
                }, 
                delete : function(id){ 
                    var keys = Object.keys(data);
                    var sql=`delete from ${tb}  where ${this.primaryKey}=${id}`;

                    database.query(sql);

                    return this;
                }
            };

            return methods;
        }
        String.prototype.SqliteModel = function(options){
            var tb = String(this);

            return SqliteModel(tb,options);
        };

        Storage.prototype.values = function(){
            var values = {},
              keys = Object.keys(this),
              i = keys.length;
              while ( i-- ) {
                  values[keys[i]]=  this.getItem(keys[i]);
              }

            return values;
        };

        Storage.prototype.keys = function(){
             
            return Object.keys(this);
        };
        if(win.ReactNativeWebView){
            // var host = document.location.host;

            win.AlocalStorage ={
             init : function(){
                     var values = win.localStorage.values();


                 return new Promise(function(func,b){
                     win.webViewBridge.send('localStorage', {"ac":"init",values:values}, function(res) {
                       console.log("localStorage syc ok");

                       func();
                       //now get back
                       // win.webViewBridge.send('localStorage', {"ac":"all"}, function(res) {
                       //     console.log("localStorage syc ok",res);
                           
                       //     for(var i in res)
                       //     {
                       //       win.localStorage.setItem(i,res[i]);
                       //     }
                           
                       //  }, function(err) {
                             
                       //  }); 
                    }, function(err) {
                         console.log("localStorage syc error", err);
                    }); 
                });

                   
             },
             getItem : function(k,v){ 
               

                return new Promise(function(func,b){
                    win.webViewBridge.send('localStorage', {ac:"get",k:k}, function(res) {
                      if(func)func(res||v);
                    }, function(err) {
                        func(null)
                    });
                });
             },
             removeItem : function(k){ 
               

                return new Promise(function(func,b){
                    win.webViewBridge.send('localStorage', {ac:"remove",k:k}, function(res) {
                      if(func)func(res);
                    }, function(err) {
                        func(null)
                    });
                });
             },
             setItem : function(k,v){
                
                return new Promise(function(func,b){
                    win.webViewBridge.send('localStorage', {"ac":"set",k:k,v:v}, function(res) {
                      if(func)func(res);
                    }, function(err) {
                        func(null)
                    });
                });
             },
             clear: function(k,v){
                return new Promise(function(func,b){
                    win.webViewBridge.send('localStorage', {"ac":"clear"}, function(res) {
                      if(func)func(res);
                    }, function(err) {
                        func(null)
                    });
                });
             },
             keys: function(k,v){
                return new Promise(function(func,b){
                    win.webViewBridge.send('localStorage', {"ac":"keys"}, func, function(err) {
                        func(null)
                    });
                });
             },
             all: function(){
                return new Promise(function(func,b){
                    win.webViewBridge.send('localStorage', {ac:"all"}, func, function(err) {
                        func(null)
                    });
                });
             }
          };

           //run
         win.AlocalStorage.all().then(function(res){
             for(var i in res){
                win.localStorage.setItem(i, decodeURIComponent(res[i]));
             }

             Storage.prototype.setItem = (function(key, value) {
                var me = this;
                // 
                window.AlocalStorage.setItem(key, value).then(function(){
                    me.call(window.localStorage, key, value);
                });

             }).bind(Storage.prototype.setItem);

             Storage.prototype.removeItem = (function(key) {
                var me = this;
                // 
                window.AlocalStorage.removeItem(key).then(function(){
                    me.call(window.localStorage, key);
                });

             }).bind(Storage.prototype.removeItem);

          });
        // Storage.prototype.getItem = (function(key) {
        //     return this.call(localStorage,"prefix" + key);
        // }).bind(Storage.prototype.getItem);

        }
       
        win.AFile=(function() {
          var path_ = window.document_path;


          win.ACache = {
            clear: function(){

            },
            getItem: function(k,func){
                if(!path_){
                 func(window.localStorage[k]);
                return null;
               }
                win.AFile.read("cache/"+k+".json",function(str){

                    try{
                        str = JSON.parse(str);
                    }catch(e){}
                    func(str)
                });
            },
            setItem: function(k,v){
                if(!path_){
                 window.localStorage.setItem(k,typeof v=="object"?JSON.stringify(v):v);
                return null;
               }
                win.AFile.save("cache/"+k+".json",v,function(){ });
            },
            key: function(){},
            value: function(){},
            lenght: function(){},
            removeItem: function(k){
                if(!path_){
                 window.localStorage.removeItem(k);
                return null;
               }
                win.AFile.unlink("cache/"+k+".json",function(str){});
            }
          };


          if(!path_){
            console.log("FileSystem is not supported.");
            return null;
          }

          
          


          return {
             assets : {
               path:win.root_local,
               exists: function(path,func) {
                  win.webViewBridge.send('existsFile', this.path+path, function(res) {
                      if(func)func(res);
                  }, function(err) { });
                  return this;
               },
               read: function(path,func) {
                  win.webViewBridge.send('readFile', this.path+path, function(res) {
                      if(func)func(res);
                  }, function(err) { });
                  return this;
               }
             },
             path : path_,
             exists: function(path,func) {
                win.webViewBridge.send('existsFile', this.path+path, function(res) {
                     
                    if(func)func(res);
                }, function(err) { });
                return this;
             },
             unlink: function(path,func) {
                win.webViewBridge.send('unlink', this.path+path, function(res) {
                    if(func)func(res);
                }, function(err) { });
                return this;
             },
             save: function(path,data,func) {
                win.webViewBridge.send('writeFile', {file:path,text:typeof data=="object"?JSON.stringify(data):data}, function(res) {
                    if(func)func(res);
                }, function(err) { });
                return this;
             },
             read: function(path,func) {
                win.webViewBridge.send('readFile', this.path+path, function(res) {
                    if(func)func(res);
                }, function(err) { 
                   if(func)func("");
                });
                return this;
             },
             folder: function(path) {
                 win.webViewBridge.send('readFolder', this.path+path, function(res) {
                    if(func)func(res);
                }, function(err) { });
                 return this;
             }
           };
        })();

        win.AFileSystem = function(file){
            return new Promise(function(a,b){
                var methods = {
                    string :"",
                    json : function(){
                        try{
                            return JSON.parse(this.string);
                        }catch(e){}
                        return null;
                    },
                    delete : function(){
                        win.AFile.unlink("data/"+file+".json",function(s){
                            
                        });
                        return this;
                    },
                    save : function(s){
                        win.AFile.save("data/"+file+".json",f,function(){
                            
                        });
                        return this;
                    }
                };


                win.AFile.read("data/"+file+".json",function(s){
                    methods.string = s;

                    a(methods)
                });
            });
        };

        win.hasPermission=function(name,func) {
          if(win.ReactNativeWebView){

            window.webViewBridge.send('hasPermission',{name:name},func);
          }else{
             if(func)func();
          }
        };
        win.view=function(name,func) {
            window.webViewBridge.send('view',name,func);
        };
        win.imageViewer=function(data,func) {
          if(data)
            window.webViewBridge.send('imageViewer',data,func);
        };


        win.postAsync = function(url,data,cb,headers){
            if(window.ReactNativeWebView){
                window.webViewBridge.send('postAsync',{url:url,data:data,cache:1,headers:headers},function(res){
                    res = decodeURIComponent(res);
                    try{
                        cb(JSON.parse(res));
                    }catch(e){
                        cb(res);
                    }
                });
            } else if(window.post){
               window.post(url,data,cb,true);
            }else{
                fetch(url,{
                    headers:{
                        method:"POST",
                        data:JSON.stringify(data)
                    }
                }).then(function(res){
                    try{
                        cb(JSON.parse(res));
                    }catch(e){
                        cb(res);
                    }
                });
            }
        };


        win.streamFile = function(file){
            return new Promise(function(a,b){
                if(window.ReactNativeWebView){
                    window.webViewBridge.send('streamFile',file,a);
                } else{
                    a(file);
                }
            });
        };
        //window.streamFile("https://is2-ssl.mzstatic.com/image/thumb/qYEYYvFXN2O4zEuCcBSbjw/738x416.webp").then(function(a){alert(a)})

        win.admode=function(id,func){
            if(parent){
                var msgObj = {
                    targetFunc: 'ads',
                    data: {id:id}
                }; 
                msgObj.msgId = guid();
                if(func){
                    callbacks[msgObj.msgId] = {
                        onsuccess: func,
                        onerror: null
                    };
                }
                

                var msg = JSON.stringify(msgObj);
                parent.postMessage(msg,"*");
                return;
            }

            window.webViewBridge.send('ads', {id:id}, function(res) {
                if(func)func();
            }, function(err) { });
        };
        win.admodefooter=function(show,id){
            window.webViewBridge.send('adsfooter', {id:id,show:show?true:false}, function(res) {
                if(func)func();
            }, function(err) { });
        };

        win.openUrlCache=function(options) {
          options = $.extend({
            url:"",
            name:""
          },options,true);

          if(!options.url){
            return;
          }
          if(!options.name){
            var uri = options.url;
            if(uri.includes("?")){
              uri = uri.split("?")[0];
            }
            options.name = uri.split("/").slice(-1).join().split(".").shift();
          }
          return new Promise(function(resolve, reject){
            if(win.ReactNativeWebView){
              win.AFile.read(options.name,function(res) {
                
                if(res.code==0){
                  post(options.url,options.data,function(e){
                     resolve(e);
                     win.AFile.save(options.name,e);
                  },true);
                }else{
                  resolve(res.code.text);
                }
              }); 
            }else{
               post(options.url,options.data,function(e){
                 resolve(e);

               },true);
            }

          });
        };
        
        if(win.ReactNativeWebView){
            win.open=function(url) {
                
                window.webViewBridge.send('open',url,function(e) {
                    // body...
                });
            };
             win.openPopup=function(data) {
                
                window.webViewBridge.send('modalWebwiew',data,function(e) {
                    // body...
                });
            };
            win.AWebsite=function(data) {
              window.webViewBridge.send('website',data,function(e) { });
            }; 
        }else{
           var old_open =  win.open;

            // win.open=function(url) {
            //     if(window.MyIframe){
            //       window.MyIframe(url,null,true);
            //     }else{
            //         old_open.apply(this,arguments);
            //     }
            
            // };
            win.AWebsite=function(data) {
               if(window.MyIframe){
                  window.MyIframe(data.url,null,true);
                }else{
                    old_open.apply(this,[data.url]);
                }
            };

            
        }

        var old_close =  win.close;
        win.close=function(data){
          
          if(win.ReactNativeWebView){
             if(window.top!=window.self){
                  (window.opener||window.parent).postMessage('close_app',"*");
              }else{

                 window.webViewBridge.send('back', data?data:{}, function(res) { }, function(err) { });
              }
          }else{
             if(window.top!=window.self){
                  (window.opener||window.parent).postMessage('close_app',"*");
              }else{
                 var data={
                    action:"back",
                    data: 1,
                };

                var nn = win.$||win.jQuery;
                if(nn){
                    nn(document).trigger("onBack",[data]);
                    if(data.data==1){
                        old_close();
                    }
                }else{
                    old_close();
                }
                 
              }
          }
            
        };

        win.goback=function(func) {
            win.close();
            // if(parent){
            //     var msgObj = {
            //         targetFunc: 'back',
            //         data: {}
            //     }; 
            //     msgObj.msgId = guid();
            //     if(func){
            //         callbacks[msgObj.msgId] = {
            //             onsuccess: func,
            //             onerror: null
            //         };
            //     }
                
            //     msgObj.source = "child.com";
            //     var msg = JSON.stringify(msgObj);
            //     parent.postMessage(msg,"*");
            //     return;
            // }
            // window.webViewBridge.send('back',{},function(e) {
            //     if(func)func();
            // });
        };
         setTimeout(function(){
            //force in client
            if (win.history) {
                win.history._back11 = window.history.back;
                win.history.back = function(data) {
                    if (win.history.length==1&&!win.ReactNativeWebView) {
                        var data={
                            action:"back",
                            data: 1,
                        };

                        var nn = win.$||win.jQuery;
                        if(nn){
                            nn(document).trigger("onBack",[data]);
                            if(data.data==1){
                                win.history._back11();
                            }
                        }else{
                            win.history._back11();
                        }
                    } else {
                        win.history._back11();
                    }
                };
            }
        },5000);
       


        win.popup=function(data) {
            window.webViewBridge.send('popup',data,function(e) {
                // body...
            });
        };
        win.chat=function(data) {
            /*
            data ={
                api:"",
                name:"",
                avatar:""
                user:{
                  _id:"",
                  avatar:"",
                  fullname:""
                }
            }*/
            window.webViewBridge.send('chat',data,function(e) {
                // body...
            });
        };
        win.view=function(view,data) {
            window.webViewBridge.send('view',{view:view,params:data},function(e) {
                // body...
            });
        };
        
        win.openLink=function(url) {
            if(win.ReactNativeWebView){
                 window.webViewBridge.send('openLink',url,function(e) {
                    // body...
                });

            }else{
                win.open(url);
            }
           
        };


        
        win.GPS=function(fun) { 
            if(win.ReactNativeWebView){
                    win.webViewBridge.send('gps', {}, function(res) {
                        
                        if(!res||res.lat==0){
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition( function(position) {
                                            // Get current cordinates.
                                            res = {"lat": position.coords.latitude, "lng": position.coords.longitude}; 
                                            fun(res);
                                        },
                                        function(error) {
                                             fun({"lat": 0, "lng": 0});
                                        },
                                        {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000}
                                );
                            }else{
                                fun({"lat": 0, "lng": 0});
                            } 
                        }else{
                            fun(res);
                            
                        }
                    }, function(err) {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition( function(position) {
                                    // Get current cordinates.
                                    res = {"lat": position.coords.latitude, "lng": position.coords.longitude}; 
                                    fun(res);
                                },
                                function(error) {
                                     fun({"lat": 0, "lng": 0});
                                },
                                {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000}
                            );
                        }else{
                            fun(null);
                        }
                        // AApp.GPS(fun);
                    });
                
            }else{
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition( function(position) {
                            // Get current cordinates.
                            res = {"lat": position.coords.latitude, "lng": position.coords.longitude}; 
                            fun(res);
                        },
                        function(error) {
                             fun({"lat": 0, "lng": 0});
                        },
                        {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000}
                    );
                }else{
                    var location = win.ALocation;
                  if(location){
                    var loc = location.loc.split(",");
                    fun({lat: loc[0]*1, lng: loc[1]*1});
                  }else{
                    fun(null);
                  }
                }
                
            }
        };
        win.GPS.cache=null;
        
        win.GPS.test = function(){
            win.GPS(function(res){
                alert(typeof res==="object"?JSON.stringify(res):res);
            });
        }; 
        win.ScanCallback = function(f,options){
          options = options?options:{title:win.Scan.desc};
            if(win.ReactNativeWebView){
                win.webViewBridge.send('scan', options, function(res) {
                    fun(res);
                }, function(err) {
                   fun(null);
                });
            }else{
                if(typeof bootbox==="object"){
                  bootbox.prompt("Nháº­p mÃ£ Qrcode",function(res){
                     if(res) fun(res);
                  });
                }else{
                  alert("Scan is not supported.");
                  fun(null);
                }
            }
        };
        win.VideoRecord=function(options,fun) {  
            options = options?options:{url:'',data:{}};

            if(win.ReactNativeWebView){
                win.webViewBridge.send('VideoRecord', options, function(res) {
                  
                    fun(res);
                }, function(err) {
                   
                   fun(null);
                });
            }else{
                alert("Scan is not supported.");
            }
           
        };
        win.Scan=function(fun,options) {  
            options = options?options:{title:win.Scan.desc,desc:"Vui lòng cho phép Camera để quét.",lang:"vi"};
            if(win.ReactNativeWebView){
                win.webViewBridge.send('scan', options, function(res) {
                  
                    fun(res);
                }, function(err) {
                   
                   fun(null);
                });
            }else{
                if(typeof bootbox==="object"){
                  bootbox.prompt("Nháº­p mÃ£ Qrcode",function(res){
                     if(res) fun(res);
                  });
                }else{
                  alert("Scan is not supported.");
                  fun(null);
                }
                
            }
           
        };
        win.Scan.desc = "Quét Qrcode";

        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(registration) { 
              console.log('ServiceWorker registration successful');
            }, function(err) { 
              console.log('ServiceWorker registration failed: ', err);
            });
          });
        }
        win.NotifyAlert = (function() {
           function requestPermission(func){
              if (win.Notification.permission === "granted"){
                 func();
              } else if (win.Notification.permission !== "denied") {
                win.Notification.requestPermission().then(function (permission) {
                  // If the user accepts, let's create a notification
                  if (permission === "granted") {
                    func();
                  }else{
                     requestPermission(func);
                  }
                });
              }
           }
           return function(options,callback){
            // {title,message,userInfo:{},page,playSound:true}
            options.body =  options.body?options.body:options.message;
            options.playSound =  options.playSound?options.playSound:true;
            options.vibrate =  options.vibrate?options.vibrate:true;
            // icon: './img/goodday.png'  vibrate: true
   
            if(typeof win.Notification =="function"){

               requestPermission(function(){
                  //https://www.javascripttutorial.net/web-apis/javascript-notification/
                  var notification = new Notification(options.title,options);
                  notification.options = options;
                  notification.onclick = function(){
                     if(this.options.url){
                        win.openLink(this.options.url);
                     }else if(callback.callback){
                        callback.call(this.options);
                     }
                     this.close();
                  };
                  notification.onshow = function(){
                      
                  };

                  if(options.playSound){
                    //ASound();
                  }
                  // notification.open();
               });
            }else{
              
               win.webViewBridge.send('notification', options, function(res) {
                  if(callback){
                    callback(res);
                  }
                }, function(err) {
                    fun(null);
                });
            }
          };
        })();

          win.ASound = (function(){
             var sound = null;
            if(!win.ReactNativeWebView){
              sound = new Audio();
            }

            return function(options) {
                  options = options?options:{local:false,url:"https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew2.aac"};
                  if(sound){
                    sound.src= options.url;
                    sound.play();
                  }else{
                    win.webViewBridge.send('sound', options, function(res) {
                       fun(res);
                    }, function(err) {
                        fun(null);
                    });
                  } 
                  
              };
          })();
            
          win.AChat = function(user,fun) {  
              win.webViewBridge.send('chat', user, function(res) {
                 fun(res);
              }, function(err) {
                  fun(null);
              });
          };
          win.AChat.test = function(){
              win.AChat({
                  userName: "Mr Demo",
                  userId:20,
                  userPhoto:"https://static.thenounproject.com/png/363640-200.png",
                  code:""
              },function(){

              });
          };

         win.ALogin = {
        Google: function (fun,config) { 
            win.webViewBridge.send('logingoogle', config?config:{}, function(res) {
                fun(res);
            }, function(err) {
                fun(null);
            });
        },
        Facebook: function (fun,config) { 
            win.webViewBridge.send('loginfacebook',config?config:{}, function(res) {
                fun(res);
            }, function(err) {
                fun(null);
            });
        },
        Apple: function (fun,config) { 
            win.webViewBridge.send('loginapple',config?config:{}, function(res) {
                fun(res);
            }, function(err) {
                fun(null);
            });
        }
    };
})(window); 
   


    
 


 


  
/*print.js*/
;(function(){
    function previewFile(file,func) {

  var reader  = new FileReader();

  reader.onloadend = function () {
    func(reader.result); //this is an ArrayBuffer
  }
  reader.readAsArrayBuffer(file);
}
function getBlobFromUrl(myImageUrl,func){
     
        let request = new XMLHttpRequest();
        request.open('GET', myImageUrl, true);
        request.responseType = 'blob';
        request.onload = () => {
            previewFile(request.response,func);
        };
        // request.onerror = reject;
        request.send();
    
}

     
 window.ASound = {

    tableCaller : function(name){
       var a = new Audio("https://chat.donggiatri.com/app/sound/table/"+name+".mp3");
       a.ondurationchange = (event) => {
  console.log(a.currentTime,a.duration,event);
};
       a.onended = (event) => {
         var b = new Audio("https://chat.donggiatri.com/app/sound/khach-hang-goi-nhan-vien.mp3");
         b.play();
      };
      a.play();

  
    }
 };
})();



//////////
;(function() {
    if(window.CefSharp){
    
     //  window.sdk.mockdb = {
     //    save : function(k,data){
     //     pages[k] = data;
     //      window.boundAsync.cache("mockdb",JSON.stringify(pages)); 
     //      return this;
     //    },
     //    reset : function(k){
     //     pages={};
        // window.boundAsync.cache("mockdb","{}"); 
     //      return this;
     //    },
     //    remove : function(k){
     //      window.boundAsync.cacheDelete("mockdb");
     //      return this;
     //    },
     //    delete : function(k){
     //      return this.remove(k);
     //    },
     //    init : function(){
     //     var all = window.boundAsync.cacheRead("mockdb");
     //     pages = all?JSON.stringify(all):{};
     //       return this;
     //    }
     //  }
   
      function po(file,url,data,ok,no){
        $.ajax({
            url: url,
            method:'post',
            data: data,
            dataType: 'json',
            cache:true,
            async: true,
             
            success:  function(data) {
               boundAsync.cache(file,typeof data=="object"?JSON.stringify(data):data).then(function(res){
                console.log(res);
                // boundAsync.print("58B",``)
               });

               ok(data);
               
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(jqXHR.status+",  " + jqXHR.statusText+",  "+textStatus+",  "+errorThrown);
              if(jqXHR.status == 0){
                  
                 no(errorThrown);
              }else{
                 this.success(jqXHR.responseText);
              }
             
                
            }
        });
      }
      var old_post = window.post;

      // window.post = function(url,data,ok,no){
      //  var file = url.make_slug()+"_"+encodeURIComponent(JSON.stringify(data));
      //  po(file,url,data,ok,no);
      // };

      CefSharp.BindObjectAsync("boundAsync", "bound").then(function(){
     
        // window.sdk.mockdb.init();

        setTimeout(function(){
          var old_printJSObject1 = window.BillClounPrinter.local.printJSON;
          window.BillClounPrinter.local.printKitchenJSON = function(json,isServer,callback){

             if(boundAsync.printKitchenSON){
                boundAsync.printKitchenSON(JSON.stringify(json));
              }else{
                old_printJSObject1(json,isServer,callback); 
              } 
          };
          window.BillClounPrinter.local.printJSON = function(json,isServer,callback){
             
             var name = window.BillClounPrinter.local.type_bill||"XP80";
             var copy = window.BillClounPrinter.local.copy||1;

             //try get cofig setting storAGE
             if(window.AClient){
              var settings = window.AClient();
               if(settings.printer_name){
                 name = settings.printer_name;
               }

               if(settings.printer_copy){
                 copy = settings.printer_copy*1;
               }
             }
            

             switch (name) {
              case "XP50":
                  if(boundAsync.print50JSON){
                    boundAsync.print50JSON(JSON.stringify(json));
                  }else{
                    old_printJSObject(json,isServer,callback); 
                  }
                  
                break;
              case "XP80": 
                  if(boundAsync.print80JSON){
                    boundAsync.print80JSON(JSON.stringify(json));
                  }else{
                    old_printJSObject(json,isServer,callback); 
                  }
                  
                break; 
             }
          };
          var old_printJSObject3 = window.BillClounPrinter.local.printTem;
          window.BillClounPrinter.local.printTem = function(json,isServer,callback){
              if(boundAsync.printTemSON){
                boundAsync.printTemSON(JSON.stringify(json));
              }else{
                old_printJSObject3(json,isServer,callback); 
              } 
          };

          var old_printJSObject4 = window.BillClounPrinter.local.printQrcode;
          window.BillClounPrinter.local.printQrcode = function(json,isServer,callback){
              if(boundAsync.printQrcodeJSON){
                boundAsync.printTemSON(JSON.stringify(json));
              }else{
                old_printJSObject4(json,isServer,callback); 
              } 
          };
          
          if(window.printJS){
          	    window.print = function(html){
          	        
          	        if(typeof html=="string"){
          	            window.printJSObject({
          	                data:html
          	            });
          	        }else{
          	            window.printJS(html);
          	        }
          	    };
          	}
        },2000);


        // boundAsync.showMessage('Message from JS');

        boundAsync.cache('now.html','Message from JS').then(function(res){
           console.log(res);
           // boundAsync.print("58B",``)
        });
        window.AD =  function(url,data={},headers={}){

          return new Promise((resolve, reject)=>{

              data = data?data:{};
              var file = url.make_slug()+"_"+encodeURIComponent(JSON.stringify(data));

                boundAsync.cacheRead(file).then(function(res){
                   if(res){
                     try{
                      res = JSON.parse(res);
                     }catch(e){}
                     resolve(res);
                     po(file,url,data,function(res){
                      // console.log(res,"cache loaded and new Data");
                     },reject); 
                     //
                   }else{
                     po(file,url,data,function(res){
                      // console.log(res,"no cache then cached");
                      try{
                        res =JSON.parse(res);
                      }catch(e){}
                    resolve(res);
                     },reject); 
                   }
                   
                });
             
          });
        }
      });
      
    }else{
      // window.sdk.mockdb.init();
    }
  })();


 

window.processPrint = function (v){
    if(!v)return;
     
    console.log(v);
    var str = window.BillClounPrinter.parseHTML(v);
     if(($("body").hasClass("ios") || $("body").hasClass("android")) && window.innerWidth<1015){
          window.BillClounPrinter.local.printFromServer(str);
       }else{
         window.BillClounPrinter.local.printHTML(str);
       }
          
  };
if(!window.$){
    if(window.jQuery){
        window.$ = window.jQuery;
    }
}

window.BillClounPrinter={
    parseHTML : function(v){
        try{
    v.shop = v.shop?v.shop:(window.AppConfig.outlet.name||window.AppConfig.outlet.name_outlet).toUpperCase();
    v.address = v.address?v.address:window.AppConfig.outlet.address;
    v.phone = v.phone?v.phone:(window.AppConfig.outlet.phone?JSON.parse(window.AppConfig.outlet.phone).join(" - "):"");
    v.shop = v.shop.toUpperCase().replace("&AMP;","&");  

    // console.log(v);

    v.fullname_customer = v.fullname_customer?v.fullname_customer:"N/A";
    if(v.caller){
      v.fullname_caller = v.caller.fullname; 
    }else{
      v.fullname_caller = "Quản trị";
    }

    v.created_date = v.created_date;

    v.fullname = v.fullname?v.fullname:"NV";

    v.payment = v.payment?v.payment:"Tiền mặt";

     console.log(v);
     if(v.id && typeof v.id=="string" && v.id.includes("takeaway")){
      v.name = "Takeaway";
     }

     if(!v.barcode){
      v.barcode = v.id;
     }

      
     //
     v.subtotal = show_money_none(parse_money(v.subtotal?v.subtotal:v.total));
     v.total = show_money_none(parse_money(v.total));
     v.after_total = show_money_none(parse_money(v.after_total));
     v.customer_give = show_money_none(parse_money(v.customer_give?v.customer_give:v.after_total));
     v.money_left = show_money_none(parse_money(v.money_left?v.money_left:0));
    
     var tmp =$("#print58mm").html();
     var tmp_product = `<tr class="item" >
              <td style="padding:0.2em;font-weight: bold;" colspan="3">
                 {{title}}
              </td> 
          </tr>
          <tr class="item"  style="border-bottom: 2px solid black;">
              <td style="padding:0.2em; text-align:center;border-right:0;">
                  {{quantity}}
              </td>  
              <td style="padding:0.2em; text-align:center;border-right:0;">
                  <span>{{price}}</span>
              </td> 
              <td style="padding:0.2em; text-align:center;border-right:0;">
                  <span>{{price_discount}}</span>
              </td>
              <td style="text-align:center;border-right:0;">
                <strong>{{subtotal}}</strong>
              </td>
          </tr>`;
 
      // console.log("detail",tmp_product);
     var track_order = v.track_order;
      if(!track_order){
         var v = JSON.parse(info.data.root.log);
         track_order = v.track_order;
      }
      
     
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

        var reduce_total =0;
       
        $.each(products,function(i,pro){
          var s_a = Handlebars.compile(tmp_product);

          var d = pro.price_discount?pro.price_discount:0;
          reduce_total+=d*1;

           s_+=s_a({
              title:pro.title,
              quantity:pro.quantity,
              price:show_money_none(pro.price),
              price_discount:show_money_none(d),
              subtotal:show_money_none((pro.price*pro.quantity)-d),
              stt:c++
           });
           c_t+=pro.quantity;
        });
     v.total_num = c_t;  

     v.productsin = new Handlebars.SafeString(s_); 
 
     if(v.checkout){
        var checkoutplus="";
        for(var i in v.checkout.plus){
         var item = v.checkout.plus[i];
         if(typeof item==="function")break;
         var mo = show_money_none(item.value);
         checkoutplus+=`<tr class="">
                <td style=" ">
                    ${item.label}
                </td>
                <td style="">
                    ${mo}
                </td>
            </tr>`;
       }

       v.checkoutplus = new Handlebars.SafeString(checkoutplus);
      
    
       var checkoutreduce="";
       for(var i in v.checkout.reduce){

         var item = v.checkout.reduce[i];
         if(typeof item==="function")break;
         var mo = show_money_none(item.value);

         if(i=="discount" || i=="coupon"){
            mo = show_money_none((item.value*1)+reduce_total);
          continue;
         }

         checkoutreduce+=`<tr class="">
                <td style="">
                    ${item.label}
                </td>
                <td style="">
                    ${mo}
                </td>
            </tr>`;
         
       } 
       v.checkoutreduce = new Handlebars.SafeString(checkoutreduce);
     }

       var str = Handlebars.compile(tmp);
       return  str(v); 
     }catch(e){
       console.log(e);
     }

     return "";
    },
    demodata : {
        kitchen : function(){
           return JSON.stringify({
              name:"Ban 1",
              created_date: moment().format('yyyy/MM/DD'),
              products:[
                {title:"cafe da",quantity:1},
                {title:"sinh to da",quantity:2}
              ]
           },null,2);
        },
        inv : function(){
           return JSON.stringify({"log":{"14:46:02":{"isBillBep":0,"item":{"id":10,"title":"Cafe Đen 23123","price":30000,"category":"Nước Uống","unit":"Ly","created_date":"2022-08-07 20:26:36","status":"","id_outlet":"","image":"https://access.linkpos.top/databases/customers/A1656151760CAFE_cafe/upload/1659878796_product_cafe-den","type":"","allow_sale":1,"modified_date":"2022-08-07 20:26:36","combo":"","limit_stock":"","barcode":"","weight":"","height":"","length":"","brand":"","original":"","width":"","id_parent":"","price_off":"","cost":"","exhibition":"","barcode_in":"","featured":"","cost_log":"","category_slug":"nuoc-uong","short":"cd2","info":"{\"id\":10,\"title\":\"Cafe Đen 23123\",\"price\":30000,\"category\":\"Nước Uống\",\"unit\":\"Ly\",\"created_date\":\"2022-08-07 20:26:36\",\"status\":\"\",\"id_outlet\":\"\",\"image\":\"https://access.linkpos.top/databases/customers/A1656151760CAFE_cafe/upload/1659878796_product_cafe-den\",\"type\":\"\",\"allow_sale\":1,\"modified_date\":\"2022-08-07 20:26:36\",\"desc\":\"\",\"combo\":\"\",\"limit_stock\":\"\",\"barcode\":\"\",\"weight\":\"\",\"height\":\"\",\"length\":\"\",\"brand\":\"\",\"original\":\"\",\"width\":\"\",\"id_parent\":\"\",\"price_off\":\"\",\"cost\":\"\",\"exhibition\":\"\",\"barcode_in\":\"\",\"featured\":\"\",\"cost_log\":\"\",\"category_slug\":\"nuoc-uong\",\"short\":\"cd2\"}","quantity":1,"subtotal":30000}}},"id":"HD02","name":"HD02","subtotal":60000,"table_id":"HD02","checkout":{"plus":{},"reduce":{}},"track_order":{"14:46:02":{"products":{"9":{"id":9,"title":"Cafe Đen 1213","price":30000,"category":"Nước Uống","unit":"Ly","created_date":"2022-08-07 20:26:36","status":"","id_outlet":"","image":"https://access.linkpos.top/databases/customers/A1656151760CAFE_cafe/upload/1659878796_product_cafe-den","type":"","allow_sale":1,"modified_date":"2022-08-07 20:26:36","combo":"","limit_stock":"","barcode":"","weight":"","height":"","length":"","brand":"","original":"","width":"","id_parent":"","price_off":"","cost":"","exhibition":"","barcode_in":"","featured":"","cost_log":"","category_slug":"nuoc-uong","short":"cd1","quantity":1,"subtotal":30000,"price_discount":0},"10":{"id":10,"title":"Cafe Đen 23123","price":30000,"category":"Nước Uống","unit":"Ly","created_date":"2022-08-07 20:26:36","status":"","id_outlet":"","image":"https://access.linkpos.top/databases/customers/A1656151760CAFE_cafe/upload/1659878796_product_cafe-den","type":"","allow_sale":1,"modified_date":"2022-08-07 20:26:36","combo":"","limit_stock":"","barcode":"","weight":"","height":"","length":"","brand":"","original":"","width":"","id_parent":"","price_off":"","cost":"","exhibition":"","barcode_in":"","featured":"","cost_log":"","category_slug":"nuoc-uong","short":"cd2","quantity":1,"subtotal":30000,"price_discount":0}}}},"total":60000,"status":"complete","payment":"cash","total_discount":0,"ship":"","nvgh":"","kbh":"","id_customer":"","fullname_customer":"","address_customer":"","phone_customer":"","customer_give":"0","money_left":"0"},null,2);
        },
        tem : function(){
            return JSON.stringify([
                {title:"cafe da",barcode:"5678987656",price:'4234',shop:"ABC"}, 
                {title:"cafe da",barcode:"56787656",price:'434',shop:"ABC"}, 
              ],null,2);
        },
        qrocde : function(){
            return JSON.stringify([
                {name:"Shop ABC",address:"--",phone:"--",title:"CT 001",code:"23456543"},    
                {name:"Shop ABC",address:"--",phone:"--",title:"CT 002",code:"2456543"},    
              ],null,2);
        }
      },
    getBarcodeURL : function (s){
     return "https://access.linkpos.top/barcode.php?text="+s;
     },
    getQrcodeURL : function (code,w,h){
     return `https://api.qrserver.com/v1/create-qr-code/?size=${w||150}x${h||150}&data=`+code;
     },
    local : {
      isSocket : 1,
      printHTML : function(html,callback){

        console.log(html);
       //print support by self
         if(window.printer && window.printer.fromHTML){
           //print remote
           window.printer.fromHTML(html);
         }else if(window.printJS){
          window.printJS(html+'<div class="page-break" style="display: block; page-break-before: always;"></div>',{
            title:"print invoice",
            callback:callback
           });
         }
         
      },

      printQrcode: function(json,isServer,callback){
        
         var str = `<div>
          <div style="text-align:center">
          <div>
              <h1>${json.name}</h1>
              <p>${json.addess}</p> 
              <p>${json.phone}</p> 
          </div>
          <img class="qrcodein" src="${window.BillClounPrinter.getQrcodeURL(json.code)}" width="150" height="150" />
          </div>
          <p>${json.deadline?`<i>Ngày hết hạn: ${json.deadline}</i>`:''}</p>
          <div>
          <div>`;

         if(isServer){
            this.printHTML(str,callback);
         }else{
           json.typeof ="billqrcode";
           this.printFromServer(json,callback);
         }
      },
      printQrcodePayment: function(json,isServer,callback){
        
         var url =`https://faucet.donggiatri.com/${json.phone}?n=${json.name}&id=${json.shop_id}&o=${json.id_outlet}&add=${json.addess}&p=${json.price}&hash=`+Date.now();
         var str = `<div>
          <div style="text-align:center">
          <img class="qrcodein" src="${window.BillClounPrinter.getQrcodeURL(url)}" width="150" height="150" />
          </div>
          <p>Vui lòng thanh toán vào mã trên, thời gian hiệu lực là ${json.minute||"2"} phút</p>
          <div>
          <div>`;

         if(isServer){
            this.printHTML(str,callback);
         }else{
           json.typeof ="qrcodepaymentmerchenh";
           this.printFromServer(json,callback);
         }
      },
      printQrcodeUser: function(json,isServer,callback){
        
         var url =`https://faucet.donggiatri.com/${json.phone}?note=${json.note}&p=${json.price}&hash=`+Date.now();
         var str = `<div>
          <div style="text-align:center">
          <img class="qrcodein" src="${window.BillClounPrinter.getQrcodeURL(url)}" width="150" height="150" />
          </div>
          <p>Vui lòng thanh toán vào mã trên, thời gian hiệu lực là ${json.minute||"2"} phút</p>
          <div>
          <div>`;

         if(isServer){
            this.printHTML(str,callback);
         }else{
           json.typeof ="qrcodepaymentmerchenh";
           this.printFromServer(json,callback);
         }
      },

      printTem: function(json,isServer,callback){
        
         var str = '<table style="page-break-after: always;"><tr>'+json.map(function(v){
           var space = parse_money(v.price);
                  var px = '11px';
                  if(space>10000000){
                    space = "";
                    px = '12px';
                    if(v.barcode.length<10){
                      px = '14px';
                      space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                    }
                  }else{
                    space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                  }

                  //   space = space>10000000?"":"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                  // var px = v.barcode.length>10?'8px':'11px';

                  var padd = j>0&&j%2==0?'':'';
                  // var padd = "";  
                  var url_ = window.BillClounPrinter.getBarcodeURL(v.barcode);
             return `<td style="text-align:center;">
                    <div style="position:relative;${padd}">
                      <span style="font-size:11px;font-weight:bold;">${v.shop}</span><br/>
                      <div style="margin-bottom:4px;"><img style="width:130px;height:35px" src="${url_}"></div>
                      <div style="font-size:${px}">
                        ${v.barcode} ${space} <span style="font-weight:bold;">${v.price}đ</span>
                      </div>
                      <div style="font-size:12px;clear:both;">${v.title}</div>
                    </div>
                  </td>`;;
         }).join("")+'</tr></table>';
          
         if(!isServer){
            this.printHTML(str,callback);
         }else{
           json.typeof="tembill";
           this.printFromServer(json,callback);
         }
      },

      printKitchenJSON : function(json,isServer,callback){
        
         var str = `
          <h1>${json.name}</h1>
          <p>${json.created_date}</p> 
          <table>
            ${json.products.map(function(v){
          return `<tr>
              <td>${v.title}</td>
              <td>${v.quantity}</td>
            </tr>`;
         }).join("")}
          </table>
         `;
         if(!isServer){
            this.printHTML(str,callback);
         }else{
          json.typeof="kitchenbill";
           this.printFromServer(json,callback);
         }
      },
     
      printJSON : function(json,isServer,callback){
         var str = window.BillClounPrinter.parseHTML(json);
         if(!isServer){
            this.printHTML(str,callback);
         }else{
           this.printFromServer(str,callback);
         }
      },
      printFromServer : function(html,callback){
        if(this.isSocket){
          post(site_url("action.php?a=print&confirm=add"),{name:Date.now(),data:html,type:"html"},function() {
          showMessageBar("Đã gởi đến máy chủ");
          if(callback)callback();
         },true);
        }else{
            showMessageBar("Đã gởi đến máy chủ");
             window.BillClounPrinter.watcher.socket.client.sendHTML(html,callback);
        }
        
      }
    },
    setup: {
        load : function(){
          var loaded= null;
            if(window.pos && window.pos.data.outlet){
               loaded = window.pos.data.outlet.printer||{};
            }else{
              try{
                loaded = JSON.parse('json',window.localStorage.getItem(storageKey("__printer")));
                  if(!loaded){
                    loaded ={};
                  }
              }catch(e){
                 loaded= {};
              }
            }
            for(var i in loaded){
                window.BillClounPrinter.local[i] = loaded[i];
              }
        },
        save : function(){
            if(window.pos){
              var a = JSON.parse(JSON.stringify(window.BillClounPrinter.local));
              window.pos.data.outlet.printer = $.extend(window.pos.data.outlet.printer,a,true);
              window.pos.save();
            }else{
              window.localStorage.setItem(storageKey("__printer"), JSON.stringify(window.BillClounPrinter.local));
            }
        },
        bill:function(){
          var me = this;
          var list =[
            {id:"XP80",name:"Bill 80"},
            {id:"XP58",name:"Bill 58"}
            
          ];

          //load 
          var loaded = {};
           if(window.pos){
               loaded = window.pos.data.outlet.printer||{};
            }else{
              try{
                loaded = JSON.parse('json',window.localStorage.getItem(storageKey("__printer")));
                  if(!loaded){
                    loaded ={};
                  }
              }catch(e){
                 loaded= {};
              }
            }

          var dialog = bootbox.dialog({
              title: 'Chọn bếp', 
              title:'',
              className:'modal-flex',
              message: `<form>
                <p>Vui lòng địa chỉ máy in/tên máy in:</p><div><input type="text" value="${loaded.ip_share||""}" name="ip_share" placeholder="127.0.0.0 hoặc inbillshare" class="form-control ip_share" /></div>
                <p>Vui lòng chọn loại giấy in bill:</p>
                <div><select name="type_bill" class="form-control">`+list.map(function(v){
                 return  `<option value="${v.id}" ${loaded.type_bill==v.id?'selected':""}>${v.name}</option>`;
              })+`</select></div>
                <p>Số lần copy</p><input type="text" name="copy" value="${loaded.copy||1}" class="form-control input" /></div>
              </form>`,
              size: 'large',
              buttons: {
                   
                  ok: {
                      label: "Xác nhận",
                      className: 'btn-info',
                      callback: function(){
                          var data = dialog.find("form").serializeObject();
                          for(var i in data){
                            window.BillClounPrinter.local[i] = data[i];
                          }
                          
                          me.save();
                      }
                  }
              }
          });
           dialog.init(function(){
            
             dialog.find(".input,.ip_share,.select").on("change",function(){
                window.BillClounPrinter.local[this.name] = this.value;

               
             }); 
          }); 
           return this;
       },
       tem:function(){
          var list =[
            {id:"tem2",name:"Tem 2"},
            {id:"tem3",name:"Tem 3"},
            {id:"tem4",name:"Tem 4"}
          ];

          var dialog = bootbox.dialog({
              title: 'Chọn bếp', 
              title:'',
              className:'modal-flex',
              message: '<div><p>Vui lòng bill in tem:</p><div><select name="tempbill" class="form-control">'+list.map(function(v){
                 return  `<option value="${v.id}">${v.name}</option>`;
              })+'</select></div></div>',
              size: 'large',
              buttons: {
                   
                  ok: {
                      label: "Xác nhận",
                      className: 'btn-info',
                      callback: function(){
                         
                      }
                  }
              }
          });
           dialog.init(function(){
             dialog.find(".select").on("change",function(){
                me.local[this.name] = this.value;
             }); 
          }); 
           return this;
       },
    },
    
    watcher: {
       
       isServer : 0, 
       ajax : function(){
             
 
       },
       socket : {
          client : {
            test:{
                sendJSON: function(){
                   window.BillClounPrinter.watcher.socket.client.sendJSON({"log":{"21:41:13":{"isBillBep":0,"item":{"id":2,"title":"Cafe Đen","price":30000,"category":"Nước Uống","unit":"Ly","created_date":"2022-08-07 20:26:36","status":"","id_outlet":"","image":"https://access.linkpos.top/databases/customers/A1656151760CAFE_cafe/upload/1659878796_product_cafe-den","type":"","allow_sale":1,"modified_date":"2022-08-07 20:26:36","combo":"","limit_stock":"","barcode":"","weight":"","height":"","length":"","brand":"","original":"","width":"","id_parent":"","price_off":"","cost":"","exhibition":"","barcode_in":"","featured":"","cost_log":"","category_slug":"nuoc-uong","short":"cd","info":"{\"id\":2,\"title\":\"Cafe Đen\",\"price\":30000,\"category\":\"Nước Uống\",\"unit\":\"Ly\",\"created_date\":\"2022-08-07 20:26:36\",\"status\":\"\",\"id_outlet\":\"\",\"image\":\"https://access.linkpos.top/databases/customers/A1656151760CAFE_cafe/upload/1659878796_product_cafe-den\",\"type\":\"\",\"allow_sale\":1,\"modified_date\":\"2022-08-07 20:26:36\",\"desc\":\"\",\"combo\":\"\",\"limit_stock\":\"\",\"barcode\":\"\",\"weight\":\"\",\"height\":\"\",\"length\":\"\",\"brand\":\"\",\"original\":\"\",\"width\":\"\",\"id_parent\":\"\",\"price_off\":\"\",\"cost\":\"\",\"exhibition\":\"\",\"barcode_in\":\"\",\"featured\":\"\",\"cost_log\":\"\",\"category_slug\":\"nuoc-uong\",\"short\":\"cd\"}","quantity":1,"subtotal":30000}},"21:41:14":{"isBillBep":0,"item":{"id":3,"title":"Cafe q","price":100000,"category":"Trang mieng","unit":"Ly","created_date":"2022-06-25 18:34:03","status":"","id_outlet":"","image":"https://via.placeholder.com/150x105","type":"","allow_sale":1,"modified_date":"2022-06-25 18:34:03","combo":"","limit_stock":"","barcode":"","weight":"","height":"","length":"","brand":"","original":"","width":"","id_parent":"","price_off":"","cost":"","exhibition":"","barcode_in":"","featured":"","cost_log":"","category_slug":"trang-mieng","short":"cq","info":"{\"id\":3,\"title\":\"Cafe q\",\"price\":100000,\"category\":\"Trang mieng\",\"unit\":\"Ly\",\"created_date\":\"2022-06-25 18:34:03\",\"status\":\"\",\"id_outlet\":\"\",\"image\":\"https://via.placeholder.com/150x105\",\"type\":\"\",\"allow_sale\":1,\"modified_date\":\"2022-06-25 18:34:03\",\"desc\":\"\",\"combo\":\"\",\"limit_stock\":\"\",\"barcode\":\"\",\"weight\":\"\",\"height\":\"\",\"length\":\"\",\"brand\":\"\",\"original\":\"\",\"width\":\"\",\"id_parent\":\"\",\"price_off\":\"\",\"cost\":\"\",\"exhibition\":\"\",\"barcode_in\":\"\",\"featured\":\"\",\"cost_log\":\"\",\"category_slug\":\"trang-mieng\",\"short\":\"cq\"}","quantity":1,"subtotal":100000}},"21:47:47":{"isBillBep":0,"item":{"id":2,"title":"Cafe Đen","price":30000,"category":"Nước Uống","unit":"Ly","created_date":"2022-08-07 20:26:36","status":"","id_outlet":"","image":"https://access.linkpos.top/databases/customers/A1656151760CAFE_cafe/upload/1659878796_product_cafe-den","type":"","allow_sale":1,"modified_date":"2022-08-07 20:26:36","combo":"","limit_stock":"","barcode":"","weight":"","height":"","length":"","brand":"","original":"","width":"","id_parent":"","price_off":"","cost":"","exhibition":"","barcode_in":"","featured":"","cost_log":"","category_slug":"nuoc-uong","short":"cd","quantity":2,"subtotal":60000,"price_discount":0}},"21:47:48":{"isBillBep":0,"item":{"id":1,"title":"Cafe","price":100000,"category":"Trang mieng","unit":"Ly","created_date":"2022-06-25 18:34:03","status":"","id_outlet":"","image":"https://via.placeholder.com/150x105","type":"","allow_sale":1,"modified_date":"2022-06-25 18:34:03","combo":"","limit_stock":"","barcode":"","weight":"","height":"","length":"","brand":"","original":"","width":"","id_parent":"","price_off":"","cost":"","exhibition":"","barcode_in":"","featured":"","cost_log":"","category_slug":"trang-mieng","short":"c","info":"{\"id\":1,\"title\":\"Cafe\",\"price\":100000,\"category\":\"Trang mieng\",\"unit\":\"Ly\",\"created_date\":\"2022-06-25 18:34:03\",\"status\":\"\",\"id_outlet\":\"\",\"image\":\"https://via.placeholder.com/150x105\",\"type\":\"\",\"allow_sale\":1,\"modified_date\":\"2022-06-25 18:34:03\",\"desc\":\"\",\"combo\":\"\",\"limit_stock\":\"\",\"barcode\":\"\",\"weight\":\"\",\"height\":\"\",\"length\":\"\",\"brand\":\"\",\"original\":\"\",\"width\":\"\",\"id_parent\":\"\",\"price_off\":\"\",\"cost\":\"\",\"exhibition\":\"\",\"barcode_in\":\"\",\"featured\":\"\",\"cost_log\":\"\",\"category_slug\":\"trang-mieng\",\"short\":\"c\"}","quantity":1,"subtotal":100000}}},"id":"HD01","name":"HD01","subtotal":260000,"table_id":"HD01","checkout":{"plus":{},"reduce":{}},"track_order":{"21:41:13":{"products":{"1":{"id":1,"title":"Cafe","price":100000,"category":"Trang mieng","unit":"Ly","created_date":"2022-06-25 18:34:03","status":"","id_outlet":"","image":"https://via.placeholder.com/150x105","type":"","allow_sale":1,"modified_date":"2022-06-25 18:34:03","combo":"","limit_stock":"","barcode":"","weight":"","height":"","length":"","brand":"","original":"","width":"","id_parent":"","price_off":"","cost":"","exhibition":"","barcode_in":"","featured":"","cost_log":"","category_slug":"trang-mieng","short":"c","quantity":1,"subtotal":100000,"price_discount":0},"2":{"id":2,"title":"Cafe Đen","price":30000,"category":"Nước Uống","unit":"Ly","created_date":"2022-08-07 20:26:36","status":"","id_outlet":"","image":"https://access.linkpos.top/databases/customers/A1656151760CAFE_cafe/upload/1659878796_product_cafe-den","type":"","allow_sale":1,"modified_date":"2022-08-07 20:26:36","combo":"","limit_stock":"","barcode":"","weight":"","height":"","length":"","brand":"","original":"","width":"","id_parent":"","price_off":"","cost":"","exhibition":"","barcode_in":"","featured":"","cost_log":"","category_slug":"nuoc-uong","short":"cd","quantity":2,"subtotal":60000,"price_discount":0},"3":{"id":3,"title":"Cafe q","price":100000,"category":"Trang mieng","unit":"Ly","created_date":"2022-06-25 18:34:03","status":"","id_outlet":"","image":"https://via.placeholder.com/150x105","type":"","allow_sale":1,"modified_date":"2022-06-25 18:34:03","combo":"","limit_stock":"","barcode":"","weight":"","height":"","length":"","brand":"","original":"","width":"","id_parent":"","price_off":"","cost":"","exhibition":"","barcode_in":"","featured":"","cost_log":"","category_slug":"trang-mieng","short":"cq","quantity":1,"subtotal":100000,"price_discount":0}}}},"total":260000,"status":"complete","payment":"cash","total_discount":0,"ship":"","nvgh":"","kbh":"","id_customer":"","fullname_customer":"","address_customer":"","phone_customer":"","customer_give":"0","money_left":"0"});
                },
                sendHTML: function(){
                   window.BillClounPrinter.watcher.socket.client.sendHTML(`<div>
        <style>
    @media print {
  body,p {
    margin: 0;
    box-shadow: none;
    font-size: 11px;
  }
}
  </style>
        <p style="margin-left:0px;text-align:center;text-transform: uppercase;">
    <strong>HÀU LUỘC QUÁN</strong>
</p>
<br/>
<p style="margin-left:0px;text-align:center;text-transform: capitalize;">
    268 TRẦN HƯNG ĐẠO, Lộc Tấn, Lộc Ninh, Bình Phước
</p>
<p style="margin-left:0px;text-align:center;font-size: 11px;">
    SĐT: 0938482117
</p>
<br/>
<p style="margin-left:0px;text-align:center;font-size: 13px;">
    <strong>HOÁ ĐƠN THANH TOÁN</strong>
</p>
<br/>
<p style="text-transform: uppercase;">
  HD: 1696085276093
</p> 
<p style="">
    Ngày: 2023-09-30 21:47:56
</p>
<p style="">

    Khách hàng: <span style="text-transform: uppercase;">N/A</span>
</p>
<p style="">
    Thu ngân: <span style="text-transform: uppercase;">NV</span>
</p>
<p style="">
    &nbsp;
</p>
<div class="table">
  <p style="font-size: 12px;">
    Danh sách sản phẩm: <strong>(4)</strong>
  </p>
    <table class="pro" style="width:100%;border-collapse: collapse;" border="0">
        <thead style="border-bottom: 2px solid black;">
   
              <th style="padding:0.1em;">
                  SL
              </th> 
              <th style="padding:0.1em;">
                  Đ. giá
              </th>
              <th style="padding:0.1em;">
                  Giảm giá <br/>tiền mặt
              </th> 
              <th style="padding:0.1em;">
                  &nbsp;T. Tiền
              </th>
         
        </thead>
        <tbody>
            <tr class="item" >
              <td style="padding:0.2em;font-size: 12px;" colspan="3">
                 Cafe
              </td> 
          </tr>
          <tr class="item"  style="border-bottom: 2px solid black;">
              <td style="padding:0.2em; text-align:center;border-right:0;">
                  1
              </td>  
              <td style="padding:0.2em; text-align:center;border-right:0;">
                  <span>100,000đ</span>
              </td> 
              <td style="padding:0.2em; text-align:center;border-right:0;">
                  <span>0</span>
              </td>
              <td style="padding:0.2em; text-align:center;border-right:0;">
                <strong>100,000</strong>
              </td>
          </tr><tr class="item" >
              <td style="padding:0.2em;" colspan="3">
                 Cafe Đen
              </td> 
          </tr> 
        </tbody>
    </table>
</div>
<div class="table">
    <table style="width:100%;" border="0">
        <tbody>
            <tr class="a">
                <td style=" ">
              <tr class="a">
                <td style=" ">
                    Tổng tiền
                </td>
                <td style=" ">
                    260,000
                </td>
            </tr>
            
            <tr>
                <td style=" ">
                  Giảm giá
                </td>
                <td style=" ">
                    <strong>0</strong>
                </td>
            </tr>
            
            
            <tr>
                <td style="">
                    <strong>Thành tiền</strong>
                </td>
                <td style="">
                    <strong>260,000</strong>
                </td>
            </tr>
            <tr>
                <td style="">
                    Khách đưa
                </td>
                <td style="">
                    0
                </td>
            </tr>
            <tr>
                <td style="">
                    Tiền thừa
                </td>
                <td style="">
                    0
                </td>
            </tr>
        </tbody>
    </table>
</div>
<div style="text-align:center"><img class="qrcodein" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=1696085276093" width="105" height="105" /></div>

<p style="text-align:center;">
    Xin cảm ơn quý khách!
</p>
<p style="text-align:center;">
    Hẹn gặp lại
</p>
</div>`);
                }
            },
            sendJSON : function(s){

                if(window.socket){
                  var data ={};
                  data.ip = window.country.ip||"--";
                   data.type = "printer_json";
                   data.room = window.shoper.shop_id;
                   data.shop_id = window.shoper.shop_id;
                   data.id_outlet = window.shoper.id_outlet;
                   data.content = s;
                   window.socket.emit("new message",data);
                }
             },
              sendKitchenJSON : function(s){

                if(window.socket){
                  var data ={};
                  data.ip = window.country.ip||"--";
                   data.type = "printer_kitchen_json";
                   data.room = window.shoper.shop_id;
                   data.shop_id = window.shoper.shop_id;
                   data.id_outlet = window.shoper.id_outlet;
                   data.content = s;
                   window.socket.emit("new message",data);
                }
             },
             sendTemJSON : function(s){

                if(window.socket){
                  var data ={};
                  data.ip = window.country.ip||"--";
                   data.type = "printer_tem_json";
                   data.room = window.shoper.shop_id;
                   data.shop_id = window.shoper.shop_id;
                   data.id_outlet = window.shoper.id_outlet;
                   data.content = s;
                   window.socket.emit("new message",data);
                }
             },
             sendQrcodeJSON : function(s){

                if(window.socket){
                  var data ={};
                  data.ip = window.country.ip||"--";
                   data.type = "printer_qrcode_json";
                   data.room = window.shoper.shop_id;
                   data.shop_id = window.shoper.shop_id;
                   data.id_outlet = window.shoper.id_outlet;
                   data.content = s;
                   window.socket.emit("new message",data);
                }
             },
             sendHTML : function(s){

                if(window.socket){
                  var data ={};
                   data.ip = window.country.ip||"--";
                   data.type = "printer_html";
                   data.room = window.shoper.shop_id;
                   data.shop_id = window.shoper.shop_id;
                   data.id_outlet = window.shoper.id_outlet;
                   data.content = s;
                   window.socket.emit("new message",data);
                }
             },
             listen :function(func){
                $(document).on('new_message',function(e,data){
                  console.log("Printer setting...",data);
                  if(typeof data.message==="object" && data.message.room && data.message.room==window.shoper.shop_id){
                        
                         
                        // var name_outlet = args[1];
                        if(data.message.type){

                           var type = data.message.type;
                          delete data.message.type;

                          func(type,data.message);

                          
       
                        }
                      }
                      
                });

             }
           } 
       }
    }
 };
 //fake i am local to listen from any

 setTimeout(function(){
   var soundinternet = new Audio("https://chat.donggiatri.com/app/sound/no-internet.mp3");
   window.addEventListener('offline', (event) => {
      soundinternet.play();
  });
   var soundprinting = new Audio("https://chat.donggiatri.com/app/sound/bep-co-mon-moi.mp3");
   window.BillClounPrinter.setup.load();
   //i am listener
   window.BillClounPrinter.watcher.socket.client.listen(function(e,data){
      
      switch(e){
         case "printer_kitchen_json":
           window.BillClounPrinter.local.printKitchenJSON(data.content);
         break;
         case "printer_qrcode_json":
           window.BillClounPrinter.local.printQrcode(data.content);
         break;
         case "printer_tem_json":
           window.BillClounPrinter.local.printTem(data.content);
         break;
         case "printer_kitchen_json":
           window.BillClounPrinter.local.printKitchenJSON(data.content);
         break;
         case "printer_json":
            
             window.BillClounPrinter.local.printJSON(data.content);
            


            

            
         break; 

         case "printer_html":
         
                
           window.BillClounPrinter.local.printHTML(data.content);

            

            
         break; 
         case "kitchen_tell":
         
                
           // window.BillClounPrinter.local.printHTML(data.content);

            soundprinting.play();
            setTimeout(function(){
                soundprinting.play();
            },1000);

            
         break; 
      }
   });
 },4*1000);
/*validate.js*/
        /*! jQuery Validation Plugin - v1.19.5 - 7/1/2022
 * https://jqueryvalidation.org/
 * Copyright (c) 2022 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.submitButton=b.currentTarget,a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.submitButton&&(c.settings.submitHandler||c.formSubmitted)&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),!(c.settings.submitHandler&&!c.settings.debug)||(e=c.settings.submitHandler.call(c,c.currentForm,b),d&&d.remove(),void 0!==e&&e)}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0],k="undefined"!=typeof this.attr("contenteditable")&&"false"!==this.attr("contenteditable");if(null!=j&&(!j.form&&k&&(j.form=this.closest("form")[0],j.name=this.attr("name")),null!=j.form)){if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(a,b){i[b]=f[b],delete f[b]}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g)),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}});var b=function(a){return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")};a.extend(a.expr.pseudos||a.expr[":"],{blank:function(c){return!b(""+a(c).val())},filled:function(c){var d=a(c).val();return null!==d&&!!b(""+d)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||a.inArray(c.keyCode,d)!==-1||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c="undefined"!=typeof a(this).attr("contenteditable")&&"false"!==a(this).attr("contenteditable");if(!this.form&&c&&(this.form=a(this).closest("form")[0],this.name=a(this).attr("name")),d===this.form){var e=a.data(this.form,"validator"),f="on"+b.type.replace(/^validate/,""),g=e.settings;g[f]&&!a(this).is(g.ignore)&&g[f].call(e,this,b)}}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.currentForm,e=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){e[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=g.check(e)&&h))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)void 0!==a[b]&&null!==a[b]&&a[b]!==!1&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").trigger("focus").trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name"),e="undefined"!=typeof a(this).attr("contenteditable")&&"false"!==a(this).attr("contenteditable");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),e&&(this.form=a(this).closest("form")[0],this.name=d),this.form===b.currentForm&&(!(d in c||!b.objectLength(a(this).rules()))&&(c[d]=!0,!0))})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type,g="undefined"!=typeof e.attr("contenteditable")&&"false"!==e.attr("contenteditable");return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=g?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f,g=a(b).rules(),h=a.map(g,function(a,b){return b}).length,i=!1,j=this.elementValue(b);"function"==typeof g.normalizer?f=g.normalizer:"function"==typeof this.settings.normalizer&&(f=this.settings.normalizer),f&&(j=f.call(b,j),delete g.normalizer);for(d in g){e={method:d,parameters:g[d]};try{if(c=a.validator.methods[d].call(this,j,b,e.parameters),"dependency-mismatch"===c&&1===h){i=!0;continue}if(i=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(k){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",k),k instanceof TypeError&&(k.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),k}}if(!i)return this.objectLength(g)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){"string"==typeof c&&(c={method:c});var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement.call(this,d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return void 0===a?"":a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return!this.dependTypes[typeof a]||this.dependTypes[typeof a](a,b)},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()&&0===this.pendingRequest?(a(this.currentForm).trigger("submit"),this.submitButton&&a("input:hidden[name='"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return c="string"==typeof c&&c||"remote",a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a["date"===b?"dateISO":c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),""===d&&(d=!0),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0===e.param||e.param:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(a,d){b[a]="function"==typeof d&&"normalizer"!==a?d(c):d}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var a;b[this]&&(Array.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(a=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(a[0]),Number(a[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:void 0!==b&&null!==b&&b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})+(?::(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(){var a=!1;return function(b,c){return a||(a=!0,this.settings.debug&&window.console&&console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")),this.optional(c)||!/Invalid|NaN/.test(new Date(b).toString())}}(),dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(a,b,c){var d=Array.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||d>=c},maxlength:function(a,b,c){var d=Array.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||d<=c},rangelength:function(a,b,c){var d=Array.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||d>=c[0]&&d<=c[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e,f=a(c).attr("type"),g="Step attribute on input type "+f+" is not supported.",h=["text","number","range"],i=new RegExp("\\b"+f+"\\b"),j=f&&!i.test(h.join()),k=function(a){var b=(""+a).match(/(?:\.(\d+))?$/);return b&&b[1]?b[1].length:0},l=function(a){return Math.round(a*Math.pow(10,e))},m=!0;if(j)throw new Error(g);return e=k(d),(k(b)>e||l(b)%l(d)!==0)&&(m=!1),this.optional(c)||m},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var c,d={};return a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,c){var e=a.port;"abort"===a.mode&&(d[e]&&d[e].abort(),d[e]=c)}):(c=a.ajax,a.ajax=function(b){var e=("mode"in b?b:a.ajaxSettings).mode,f=("port"in b?b:a.ajaxSettings).port;return"abort"===e?(d[f]&&d[f].abort(),d[f]=c.apply(this,arguments),d[f]):c.apply(this,arguments)}),a});

/*serializeObject.js*/
$.fn.serializeObject=function(){"use strict";var a={},b=function(b,c){var d=a[c.name];"undefined"!=typeof d&&d!==null?$.isArray(d)?d.push(c.value):a[c.name]=[d,c.value]:a[c.name]=c.value};return $.each(this.serializeArray(),b),a};

/*country.js*/
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
/*bottomsheet.min.js*/
/*! For license information please see frontle_bottomsheet.min.js.LICENSE.txt */
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(self,(function(){return function(){var t={9662:function(t,e,n){var r=n(614),o=n(6330),i=TypeError;t.exports=function(t){if(r(t))return t;throw i(o(t)+" is not a function")}},9483:function(t,e,n){var r=n(4411),o=n(6330),i=TypeError;t.exports=function(t){if(r(t))return t;throw i(o(t)+" is not a constructor")}},6077:function(t,e,n){var r=n(614),o=String,i=TypeError;t.exports=function(t){if("object"==typeof t||r(t))return t;throw i("Can't set "+o(t)+" as a prototype")}},1223:function(t,e,n){var r=n(5112),o=n(30),i=n(3070).f,u=r("unscopables"),c=Array.prototype;null==c[u]&&i(c,u,{configurable:!0,value:o(null)}),t.exports=function(t){c[u][t]=!0}},5787:function(t,e,n){var r=n(7976),o=TypeError;t.exports=function(t,e){if(r(e,t))return t;throw o("Incorrect invocation")}},9670:function(t,e,n){var r=n(111),o=String,i=TypeError;t.exports=function(t){if(r(t))return t;throw i(o(t)+" is not an object")}},8533:function(t,e,n){"use strict";var r=n(2092).forEach,o=n(2133)("forEach");t.exports=o?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},8457:function(t,e,n){"use strict";var r=n(9974),o=n(6916),i=n(7908),u=n(3411),c=n(7659),a=n(4411),s=n(6244),f=n(6135),l=n(4121),p=n(1246),v=Array;t.exports=function(t){var e=i(t),n=a(this),h=arguments.length,d=h>1?arguments[1]:void 0,y=void 0!==d;y&&(d=r(d,h>2?arguments[2]:void 0));var m,g,b,x,w,S,E=p(e),O=0;if(!E||this===v&&c(E))for(m=s(e),g=n?new this(m):v(m);m>O;O++)S=y?d(e[O],O):e[O],f(g,O,S);else for(w=(x=l(e,E)).next,g=n?new this:[];!(b=o(w,x)).done;O++)S=y?u(x,d,[b.value,O],!0):b.value,f(g,O,S);return g.length=O,g}},1318:function(t,e,n){var r=n(5656),o=n(1400),i=n(6244),u=function(t){return function(e,n,u){var c,a=r(e),s=i(a),f=o(u,s);if(t&&n!=n){for(;s>f;)if((c=a[f++])!=c)return!0}else for(;s>f;f++)if((t||f in a)&&a[f]===n)return t||f||0;return!t&&-1}};t.exports={includes:u(!0),indexOf:u(!1)}},2092:function(t,e,n){var r=n(9974),o=n(1702),i=n(8361),u=n(7908),c=n(6244),a=n(5417),s=o([].push),f=function(t){var e=1==t,n=2==t,o=3==t,f=4==t,l=6==t,p=7==t,v=5==t||l;return function(h,d,y,m){for(var g,b,x=u(h),w=i(x),S=r(d,y),E=c(w),O=0,j=m||a,T=e?j(h,E):n||p?j(h,0):void 0;E>O;O++)if((v||O in w)&&(b=S(g=w[O],O,x),t))if(e)T[O]=b;else if(b)switch(t){case 3:return!0;case 5:return g;case 6:return O;case 2:s(T,g)}else switch(t){case 4:return!1;case 7:s(T,g)}return l?-1:o||f?f:T}};t.exports={forEach:f(0),map:f(1),filter:f(2),some:f(3),every:f(4),find:f(5),findIndex:f(6),filterReject:f(7)}},1194:function(t,e,n){var r=n(7293),o=n(5112),i=n(7392),u=o("species");t.exports=function(t){return i>=51||!r((function(){var e=[];return(e.constructor={})[u]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},2133:function(t,e,n){"use strict";var r=n(7293);t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){return 1},1)}))}},1589:function(t,e,n){var r=n(1400),o=n(6244),i=n(6135),u=Array,c=Math.max;t.exports=function(t,e,n){for(var a=o(t),s=r(e,a),f=r(void 0===n?a:n,a),l=u(c(f-s,0)),p=0;s<f;s++,p++)i(l,p,t[s]);return l.length=p,l}},206:function(t,e,n){var r=n(1702);t.exports=r([].slice)},7475:function(t,e,n){var r=n(3157),o=n(4411),i=n(111),u=n(5112)("species"),c=Array;t.exports=function(t){var e;return r(t)&&(e=t.constructor,(o(e)&&(e===c||r(e.prototype))||i(e)&&null===(e=e[u]))&&(e=void 0)),void 0===e?c:e}},5417:function(t,e,n){var r=n(7475);t.exports=function(t,e){return new(r(t))(0===e?0:e)}},3411:function(t,e,n){var r=n(9670),o=n(9212);t.exports=function(t,e,n,i){try{return i?e(r(n)[0],n[1]):e(n)}catch(e){o(t,"throw",e)}}},7072:function(t,e,n){var r=n(5112)("iterator"),o=!1;try{var i=0,u={next:function(){return{done:!!i++}},return:function(){o=!0}};u[r]=function(){return this},Array.from(u,(function(){throw 2}))}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i={};i[r]=function(){return{next:function(){return{done:n=!0}}}},t(i)}catch(t){}return n}},4326:function(t,e,n){var r=n(1702),o=r({}.toString),i=r("".slice);t.exports=function(t){return i(o(t),8,-1)}},648:function(t,e,n){var r=n(1694),o=n(614),i=n(4326),u=n(5112)("toStringTag"),c=Object,a="Arguments"==i(function(){return arguments}());t.exports=r?i:function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=c(t),u))?n:a?i(e):"Object"==(r=i(e))&&o(e.callee)?"Arguments":r}},9920:function(t,e,n){var r=n(2597),o=n(3887),i=n(1236),u=n(3070);t.exports=function(t,e,n){for(var c=o(e),a=u.f,s=i.f,f=0;f<c.length;f++){var l=c[f];r(t,l)||n&&r(n,l)||a(t,l,s(e,l))}}},8544:function(t,e,n){var r=n(7293);t.exports=!r((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},8880:function(t,e,n){var r=n(9781),o=n(3070),i=n(9114);t.exports=r?function(t,e,n){return o.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},9114:function(t){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},6135:function(t,e,n){"use strict";var r=n(4948),o=n(3070),i=n(9114);t.exports=function(t,e,n){var u=r(e);u in t?o.f(t,u,i(0,n)):t[u]=n}},8709:function(t,e,n){"use strict";var r=n(9670),o=n(2140),i=TypeError;t.exports=function(t){if(r(this),"string"===t||"default"===t)t="string";else if("number"!==t)throw i("Incorrect hint");return o(this,t)}},8052:function(t,e,n){var r=n(614),o=n(3070),i=n(6339),u=n(3072);t.exports=function(t,e,n,c){c||(c={});var a=c.enumerable,s=void 0!==c.name?c.name:e;if(r(n)&&i(n,s,c),c.global)a?t[e]=n:u(e,n);else{try{c.unsafe?t[e]&&(a=!0):delete t[e]}catch(t){}a?t[e]=n:o.f(t,e,{value:n,enumerable:!1,configurable:!c.nonConfigurable,writable:!c.nonWritable})}return t}},3072:function(t,e,n){var r=n(7854),o=Object.defineProperty;t.exports=function(t,e){try{o(r,t,{value:e,configurable:!0,writable:!0})}catch(n){r[t]=e}return e}},9781:function(t,e,n){var r=n(7293);t.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},317:function(t,e,n){var r=n(7854),o=n(111),i=r.document,u=o(i)&&o(i.createElement);t.exports=function(t){return u?i.createElement(t):{}}},7207:function(t){var e=TypeError;t.exports=function(t){if(t>9007199254740991)throw e("Maximum allowed index exceeded");return t}},8324:function(t){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},8509:function(t,e,n){var r=n(317)("span").classList,o=r&&r.constructor&&r.constructor.prototype;t.exports=o===Object.prototype?void 0:o},7871:function(t,e,n){var r=n(3823),o=n(5268);t.exports=!r&&!o&&"object"==typeof window&&"object"==typeof document},3823:function(t){t.exports="object"==typeof Deno&&Deno&&"object"==typeof Deno.version},1528:function(t,e,n){var r=n(8113),o=n(7854);t.exports=/ipad|iphone|ipod/i.test(r)&&void 0!==o.Pebble},6833:function(t,e,n){var r=n(8113);t.exports=/(?:ipad|iphone|ipod).*applewebkit/i.test(r)},5268:function(t,e,n){var r=n(4326),o=n(7854);t.exports="process"==r(o.process)},1036:function(t,e,n){var r=n(8113);t.exports=/web0s(?!.*chrome)/i.test(r)},8113:function(t,e,n){var r=n(5005);t.exports=r("navigator","userAgent")||""},7392:function(t,e,n){var r,o,i=n(7854),u=n(8113),c=i.process,a=i.Deno,s=c&&c.versions||a&&a.version,f=s&&s.v8;f&&(o=(r=f.split("."))[0]>0&&r[0]<4?1:+(r[0]+r[1])),!o&&u&&(!(r=u.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=u.match(/Chrome\/(\d+)/))&&(o=+r[1]),t.exports=o},748:function(t){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},2109:function(t,e,n){var r=n(7854),o=n(1236).f,i=n(8880),u=n(8052),c=n(3072),a=n(9920),s=n(4705);t.exports=function(t,e){var n,f,l,p,v,h=t.target,d=t.global,y=t.stat;if(n=d?r:y?r[h]||c(h,{}):(r[h]||{}).prototype)for(f in e){if(p=e[f],l=t.dontCallGetSet?(v=o(n,f))&&v.value:n[f],!s(d?f:h+(y?".":"#")+f,t.forced)&&void 0!==l){if(typeof p==typeof l)continue;a(p,l)}(t.sham||l&&l.sham)&&i(p,"sham",!0),u(n,f,p,t)}}},7293:function(t){t.exports=function(t){try{return!!t()}catch(t){return!0}}},2104:function(t,e,n){var r=n(4374),o=Function.prototype,i=o.apply,u=o.call;t.exports="object"==typeof Reflect&&Reflect.apply||(r?u.bind(i):function(){return u.apply(i,arguments)})},9974:function(t,e,n){var r=n(1702),o=n(9662),i=n(4374),u=r(r.bind);t.exports=function(t,e){return o(t),void 0===e?t:i?u(t,e):function(){return t.apply(e,arguments)}}},4374:function(t,e,n){var r=n(7293);t.exports=!r((function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")}))},6916:function(t,e,n){var r=n(4374),o=Function.prototype.call;t.exports=r?o.bind(o):function(){return o.apply(o,arguments)}},6530:function(t,e,n){var r=n(9781),o=n(2597),i=Function.prototype,u=r&&Object.getOwnPropertyDescriptor,c=o(i,"name"),a=c&&"something"===function(){}.name,s=c&&(!r||r&&u(i,"name").configurable);t.exports={EXISTS:c,PROPER:a,CONFIGURABLE:s}},1702:function(t,e,n){var r=n(4374),o=Function.prototype,i=o.bind,u=o.call,c=r&&i.bind(u,u);t.exports=r?function(t){return t&&c(t)}:function(t){return t&&function(){return u.apply(t,arguments)}}},5005:function(t,e,n){var r=n(7854),o=n(614),i=function(t){return o(t)?t:void 0};t.exports=function(t,e){return arguments.length<2?i(r[t]):r[t]&&r[t][e]}},1246:function(t,e,n){var r=n(648),o=n(8173),i=n(8554),u=n(7497),c=n(5112)("iterator");t.exports=function(t){if(!i(t))return o(t,c)||o(t,"@@iterator")||u[r(t)]}},4121:function(t,e,n){var r=n(6916),o=n(9662),i=n(9670),u=n(6330),c=n(1246),a=TypeError;t.exports=function(t,e){var n=arguments.length<2?c(t):e;if(o(n))return i(r(n,t));throw a(u(t)+" is not iterable")}},8173:function(t,e,n){var r=n(9662),o=n(8554);t.exports=function(t,e){var n=t[e];return o(n)?void 0:r(n)}},7854:function(t,e,n){var r=function(t){return t&&t.Math==Math&&t};t.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n.g&&n.g)||function(){return this}()||Function("return this")()},2597:function(t,e,n){var r=n(1702),o=n(7908),i=r({}.hasOwnProperty);t.exports=Object.hasOwn||function(t,e){return i(o(t),e)}},3501:function(t){t.exports={}},842:function(t,e,n){var r=n(7854);t.exports=function(t,e){var n=r.console;n&&n.error&&(1==arguments.length?n.error(t):n.error(t,e))}},490:function(t,e,n){var r=n(5005);t.exports=r("document","documentElement")},4664:function(t,e,n){var r=n(9781),o=n(7293),i=n(317);t.exports=!r&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},8361:function(t,e,n){var r=n(1702),o=n(7293),i=n(4326),u=Object,c=r("".split);t.exports=o((function(){return!u("z").propertyIsEnumerable(0)}))?function(t){return"String"==i(t)?c(t,""):u(t)}:u},9587:function(t,e,n){var r=n(614),o=n(111),i=n(7674);t.exports=function(t,e,n){var u,c;return i&&r(u=e.constructor)&&u!==n&&o(c=u.prototype)&&c!==n.prototype&&i(t,c),t}},2788:function(t,e,n){var r=n(1702),o=n(614),i=n(5465),u=r(Function.toString);o(i.inspectSource)||(i.inspectSource=function(t){return u(t)}),t.exports=i.inspectSource},9909:function(t,e,n){var r,o,i,u=n(4811),c=n(7854),a=n(1702),s=n(111),f=n(8880),l=n(2597),p=n(5465),v=n(6200),h=n(3501),d="Object already initialized",y=c.TypeError,m=c.WeakMap;if(u||p.state){var g=p.state||(p.state=new m),b=a(g.get),x=a(g.has),w=a(g.set);r=function(t,e){if(x(g,t))throw y(d);return e.facade=t,w(g,t,e),e},o=function(t){return b(g,t)||{}},i=function(t){return x(g,t)}}else{var S=v("state");h[S]=!0,r=function(t,e){if(l(t,S))throw y(d);return e.facade=t,f(t,S,e),e},o=function(t){return l(t,S)?t[S]:{}},i=function(t){return l(t,S)}}t.exports={set:r,get:o,has:i,enforce:function(t){return i(t)?o(t):r(t,{})},getterFor:function(t){return function(e){var n;if(!s(e)||(n=o(e)).type!==t)throw y("Incompatible receiver, "+t+" required");return n}}}},7659:function(t,e,n){var r=n(5112),o=n(7497),i=r("iterator"),u=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||u[i]===t)}},3157:function(t,e,n){var r=n(4326);t.exports=Array.isArray||function(t){return"Array"==r(t)}},614:function(t){t.exports=function(t){return"function"==typeof t}},4411:function(t,e,n){var r=n(1702),o=n(7293),i=n(614),u=n(648),c=n(5005),a=n(2788),s=function(){},f=[],l=c("Reflect","construct"),p=/^\s*(?:class|function)\b/,v=r(p.exec),h=!p.exec(s),d=function(t){if(!i(t))return!1;try{return l(s,f,t),!0}catch(t){return!1}},y=function(t){if(!i(t))return!1;switch(u(t)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return h||!!v(p,a(t))}catch(t){return!0}};y.sham=!0,t.exports=!l||o((function(){var t;return d(d.call)||!d(Object)||!d((function(){t=!0}))||t}))?y:d},4705:function(t,e,n){var r=n(7293),o=n(614),i=/#|\.prototype\./,u=function(t,e){var n=a[c(t)];return n==f||n!=s&&(o(e)?r(e):!!e)},c=u.normalize=function(t){return String(t).replace(i,".").toLowerCase()},a=u.data={},s=u.NATIVE="N",f=u.POLYFILL="P";t.exports=u},8554:function(t){t.exports=function(t){return null==t}},111:function(t,e,n){var r=n(614),o="object"==typeof document&&document.all,i=void 0===o&&void 0!==o;t.exports=i?function(t){return"object"==typeof t?null!==t:r(t)||t===o}:function(t){return"object"==typeof t?null!==t:r(t)}},1913:function(t){t.exports=!1},2190:function(t,e,n){var r=n(5005),o=n(614),i=n(7976),u=n(3307),c=Object;t.exports=u?function(t){return"symbol"==typeof t}:function(t){var e=r("Symbol");return o(e)&&i(e.prototype,c(t))}},408:function(t,e,n){var r=n(9974),o=n(6916),i=n(9670),u=n(6330),c=n(7659),a=n(6244),s=n(7976),f=n(4121),l=n(1246),p=n(9212),v=TypeError,h=function(t,e){this.stopped=t,this.result=e},d=h.prototype;t.exports=function(t,e,n){var y,m,g,b,x,w,S,E=n&&n.that,O=!(!n||!n.AS_ENTRIES),j=!(!n||!n.IS_RECORD),T=!(!n||!n.IS_ITERATOR),P=!(!n||!n.INTERRUPTED),I=r(e,E),L=function(t){return y&&p(y,"normal",t),new h(!0,t)},A=function(t){return O?(i(t),P?I(t[0],t[1],L):I(t[0],t[1])):P?I(t,L):I(t)};if(j)y=t.iterator;else if(T)y=t;else{if(!(m=l(t)))throw v(u(t)+" is not iterable");if(c(m)){for(g=0,b=a(t);b>g;g++)if((x=A(t[g]))&&s(d,x))return x;return new h(!1)}y=f(t,m)}for(w=j?t.next:y.next;!(S=o(w,y)).done;){try{x=A(S.value)}catch(t){p(y,"throw",t)}if("object"==typeof x&&x&&s(d,x))return x}return new h(!1)}},9212:function(t,e,n){var r=n(6916),o=n(9670),i=n(8173);t.exports=function(t,e,n){var u,c;o(t);try{if(!(u=i(t,"return"))){if("throw"===e)throw n;return n}u=r(u,t)}catch(t){c=!0,u=t}if("throw"===e)throw n;if(c)throw u;return o(u),n}},3061:function(t,e,n){"use strict";var r=n(3383).IteratorPrototype,o=n(30),i=n(9114),u=n(8003),c=n(7497),a=function(){return this};t.exports=function(t,e,n,s){var f=e+" Iterator";return t.prototype=o(r,{next:i(+!s,n)}),u(t,f,!1,!0),c[f]=a,t}},1656:function(t,e,n){"use strict";var r=n(2109),o=n(6916),i=n(1913),u=n(6530),c=n(614),a=n(3061),s=n(9518),f=n(7674),l=n(8003),p=n(8880),v=n(8052),h=n(5112),d=n(7497),y=n(3383),m=u.PROPER,g=u.CONFIGURABLE,b=y.IteratorPrototype,x=y.BUGGY_SAFARI_ITERATORS,w=h("iterator"),S="keys",E="values",O="entries",j=function(){return this};t.exports=function(t,e,n,u,h,y,T){a(n,e,u);var P,I,L,A=function(t){if(t===h&&R)return R;if(!x&&t in C)return C[t];switch(t){case S:case E:case O:return function(){return new n(this,t)}}return function(){return new n(this)}},N=e+" Iterator",k=!1,C=t.prototype,M=C[w]||C["@@iterator"]||h&&C[h],R=!x&&M||A(h),_="Array"==e&&C.entries||M;if(_&&(P=s(_.call(new t)))!==Object.prototype&&P.next&&(i||s(P)===b||(f?f(P,b):c(P[w])||v(P,w,j)),l(P,N,!0,!0),i&&(d[N]=j)),m&&h==E&&M&&M.name!==E&&(!i&&g?p(C,"name",E):(k=!0,R=function(){return o(M,this)})),h)if(I={values:A(E),keys:y?R:A(S),entries:A(O)},T)for(L in I)(x||k||!(L in C))&&v(C,L,I[L]);else r({target:e,proto:!0,forced:x||k},I);return i&&!T||C[w]===R||v(C,w,R,{name:h}),d[e]=R,I}},3383:function(t,e,n){"use strict";var r,o,i,u=n(7293),c=n(614),a=n(111),s=n(30),f=n(9518),l=n(8052),p=n(5112),v=n(1913),h=p("iterator"),d=!1;[].keys&&("next"in(i=[].keys())?(o=f(f(i)))!==Object.prototype&&(r=o):d=!0),!a(r)||u((function(){var t={};return r[h].call(t)!==t}))?r={}:v&&(r=s(r)),c(r[h])||l(r,h,(function(){return this})),t.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:d}},7497:function(t){t.exports={}},6244:function(t,e,n){var r=n(7466);t.exports=function(t){return r(t.length)}},6339:function(t,e,n){var r=n(7293),o=n(614),i=n(2597),u=n(9781),c=n(6530).CONFIGURABLE,a=n(2788),s=n(9909),f=s.enforce,l=s.get,p=Object.defineProperty,v=u&&!r((function(){return 8!==p((function(){}),"length",{value:8}).length})),h=String(String).split("String"),d=t.exports=function(t,e,n){"Symbol("===String(e).slice(0,7)&&(e="["+String(e).replace(/^Symbol\(([^)]*)\)/,"$1")+"]"),n&&n.getter&&(e="get "+e),n&&n.setter&&(e="set "+e),(!i(t,"name")||c&&t.name!==e)&&(u?p(t,"name",{value:e,configurable:!0}):t.name=e),v&&n&&i(n,"arity")&&t.length!==n.arity&&p(t,"length",{value:n.arity});try{n&&i(n,"constructor")&&n.constructor?u&&p(t,"prototype",{writable:!1}):t.prototype&&(t.prototype=void 0)}catch(t){}var r=f(t);return i(r,"source")||(r.source=h.join("string"==typeof e?e:"")),t};Function.prototype.toString=d((function(){return o(this)&&l(this).source||a(this)}),"toString")},4758:function(t){var e=Math.ceil,n=Math.floor;t.exports=Math.trunc||function(t){var r=+t;return(r>0?n:e)(r)}},5948:function(t,e,n){var r,o,i,u,c,a,s,f,l=n(7854),p=n(9974),v=n(1236).f,h=n(261).set,d=n(6833),y=n(1528),m=n(1036),g=n(5268),b=l.MutationObserver||l.WebKitMutationObserver,x=l.document,w=l.process,S=l.Promise,E=v(l,"queueMicrotask"),O=E&&E.value;O||(r=function(){var t,e;for(g&&(t=w.domain)&&t.exit();o;){e=o.fn,o=o.next;try{e()}catch(t){throw o?u():i=void 0,t}}i=void 0,t&&t.enter()},d||g||m||!b||!x?!y&&S&&S.resolve?((s=S.resolve(void 0)).constructor=S,f=p(s.then,s),u=function(){f(r)}):g?u=function(){w.nextTick(r)}:(h=p(h,l),u=function(){h(r)}):(c=!0,a=x.createTextNode(""),new b(r).observe(a,{characterData:!0}),u=function(){a.data=c=!c})),t.exports=O||function(t){var e={fn:t,next:void 0};i&&(i.next=e),o||(o=e,u()),i=e}},8523:function(t,e,n){"use strict";var r=n(9662),o=TypeError,i=function(t){var e,n;this.promise=new t((function(t,r){if(void 0!==e||void 0!==n)throw o("Bad Promise constructor");e=t,n=r})),this.resolve=r(e),this.reject=r(n)};t.exports.f=function(t){return new i(t)}},30:function(t,e,n){var r,o=n(9670),i=n(6048),u=n(748),c=n(3501),a=n(490),s=n(317),f=n(6200),l="prototype",p="script",v=f("IE_PROTO"),h=function(){},d=function(t){return"<"+p+">"+t+"</"+p+">"},y=function(t){t.write(d("")),t.close();var e=t.parentWindow.Object;return t=null,e},m=function(){try{r=new ActiveXObject("htmlfile")}catch(t){}var t,e,n;m="undefined"!=typeof document?document.domain&&r?y(r):(e=s("iframe"),n="java"+p+":",e.style.display="none",a.appendChild(e),e.src=String(n),(t=e.contentWindow.document).open(),t.write(d("document.F=Object")),t.close(),t.F):y(r);for(var o=u.length;o--;)delete m[l][u[o]];return m()};c[v]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(h[l]=o(t),n=new h,h[l]=null,n[v]=t):n=m(),void 0===e?n:i.f(n,e)}},6048:function(t,e,n){var r=n(9781),o=n(3353),i=n(3070),u=n(9670),c=n(5656),a=n(1956);e.f=r&&!o?Object.defineProperties:function(t,e){u(t);for(var n,r=c(e),o=a(e),s=o.length,f=0;s>f;)i.f(t,n=o[f++],r[n]);return t}},3070:function(t,e,n){var r=n(9781),o=n(4664),i=n(3353),u=n(9670),c=n(4948),a=TypeError,s=Object.defineProperty,f=Object.getOwnPropertyDescriptor,l="enumerable",p="configurable",v="writable";e.f=r?i?function(t,e,n){if(u(t),e=c(e),u(n),"function"==typeof t&&"prototype"===e&&"value"in n&&v in n&&!n[v]){var r=f(t,e);r&&r[v]&&(t[e]=n.value,n={configurable:p in n?n[p]:r[p],enumerable:l in n?n[l]:r[l],writable:!1})}return s(t,e,n)}:s:function(t,e,n){if(u(t),e=c(e),u(n),o)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw a("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},1236:function(t,e,n){var r=n(9781),o=n(6916),i=n(5296),u=n(9114),c=n(5656),a=n(4948),s=n(2597),f=n(4664),l=Object.getOwnPropertyDescriptor;e.f=r?l:function(t,e){if(t=c(t),e=a(e),f)try{return l(t,e)}catch(t){}if(s(t,e))return u(!o(i.f,t,e),t[e])}},1156:function(t,e,n){var r=n(4326),o=n(5656),i=n(8006).f,u=n(1589),c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return c&&"Window"==r(t)?function(t){try{return i(t)}catch(t){return u(c)}}(t):i(o(t))}},8006:function(t,e,n){var r=n(6324),o=n(748).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},5181:function(t,e){e.f=Object.getOwnPropertySymbols},9518:function(t,e,n){var r=n(2597),o=n(614),i=n(7908),u=n(6200),c=n(8544),a=u("IE_PROTO"),s=Object,f=s.prototype;t.exports=c?s.getPrototypeOf:function(t){var e=i(t);if(r(e,a))return e[a];var n=e.constructor;return o(n)&&e instanceof n?n.prototype:e instanceof s?f:null}},7976:function(t,e,n){var r=n(1702);t.exports=r({}.isPrototypeOf)},6324:function(t,e,n){var r=n(1702),o=n(2597),i=n(5656),u=n(1318).indexOf,c=n(3501),a=r([].push);t.exports=function(t,e){var n,r=i(t),s=0,f=[];for(n in r)!o(c,n)&&o(r,n)&&a(f,n);for(;e.length>s;)o(r,n=e[s++])&&(~u(f,n)||a(f,n));return f}},1956:function(t,e,n){var r=n(6324),o=n(748);t.exports=Object.keys||function(t){return r(t,o)}},5296:function(t,e){"use strict";var n={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,o=r&&!n.call({1:2},1);e.f=o?function(t){var e=r(this,t);return!!e&&e.enumerable}:n},7674:function(t,e,n){var r=n(1702),o=n(9670),i=n(6077);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{(t=r(Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set))(n,[]),e=n instanceof Array}catch(t){}return function(n,r){return o(n),i(r),e?t(n,r):n.__proto__=r,n}}():void 0)},288:function(t,e,n){"use strict";var r=n(1694),o=n(648);t.exports=r?{}.toString:function(){return"[object "+o(this)+"]"}},2140:function(t,e,n){var r=n(6916),o=n(614),i=n(111),u=TypeError;t.exports=function(t,e){var n,c;if("string"===e&&o(n=t.toString)&&!i(c=r(n,t)))return c;if(o(n=t.valueOf)&&!i(c=r(n,t)))return c;if("string"!==e&&o(n=t.toString)&&!i(c=r(n,t)))return c;throw u("Can't convert object to primitive value")}},3887:function(t,e,n){var r=n(5005),o=n(1702),i=n(8006),u=n(5181),c=n(9670),a=o([].concat);t.exports=r("Reflect","ownKeys")||function(t){var e=i.f(c(t)),n=u.f;return n?a(e,n(t)):e}},857:function(t,e,n){var r=n(7854);t.exports=r},2534:function(t){t.exports=function(t){try{return{error:!1,value:t()}}catch(t){return{error:!0,value:t}}}},3702:function(t,e,n){var r=n(7854),o=n(2492),i=n(614),u=n(4705),c=n(2788),a=n(5112),s=n(7871),f=n(3823),l=n(1913),p=n(7392),v=o&&o.prototype,h=a("species"),d=!1,y=i(r.PromiseRejectionEvent),m=u("Promise",(function(){var t=c(o),e=t!==String(o);if(!e&&66===p)return!0;if(l&&(!v.catch||!v.finally))return!0;if(!p||p<51||!/native code/.test(t)){var n=new o((function(t){t(1)})),r=function(t){t((function(){}),(function(){}))};if((n.constructor={})[h]=r,!(d=n.then((function(){}))instanceof r))return!0}return!e&&(s||f)&&!y}));t.exports={CONSTRUCTOR:m,REJECTION_EVENT:y,SUBCLASSING:d}},2492:function(t,e,n){var r=n(7854);t.exports=r.Promise},9478:function(t,e,n){var r=n(9670),o=n(111),i=n(8523);t.exports=function(t,e){if(r(t),o(e)&&e.constructor===t)return e;var n=i.f(t);return(0,n.resolve)(e),n.promise}},612:function(t,e,n){var r=n(2492),o=n(7072),i=n(3702).CONSTRUCTOR;t.exports=i||!o((function(t){r.all(t).then(void 0,(function(){}))}))},8572:function(t){var e=function(){this.head=null,this.tail=null};e.prototype={add:function(t){var e={item:t,next:null};this.head?this.tail.next=e:this.head=e,this.tail=e},get:function(){var t=this.head;if(t)return this.head=t.next,this.tail===t&&(this.tail=null),t.item}},t.exports=e},2261:function(t,e,n){"use strict";var r,o,i=n(6916),u=n(1702),c=n(1340),a=n(7066),s=n(2999),f=n(2309),l=n(30),p=n(9909).get,v=n(9441),h=n(7168),d=f("native-string-replace",String.prototype.replace),y=RegExp.prototype.exec,m=y,g=u("".charAt),b=u("".indexOf),x=u("".replace),w=u("".slice),S=(o=/b*/g,i(y,r=/a/,"a"),i(y,o,"a"),0!==r.lastIndex||0!==o.lastIndex),E=s.BROKEN_CARET,O=void 0!==/()??/.exec("")[1];(S||O||E||v||h)&&(m=function(t){var e,n,r,o,u,s,f,v=this,h=p(v),j=c(t),T=h.raw;if(T)return T.lastIndex=v.lastIndex,e=i(m,T,j),v.lastIndex=T.lastIndex,e;var P=h.groups,I=E&&v.sticky,L=i(a,v),A=v.source,N=0,k=j;if(I&&(L=x(L,"y",""),-1===b(L,"g")&&(L+="g"),k=w(j,v.lastIndex),v.lastIndex>0&&(!v.multiline||v.multiline&&"\n"!==g(j,v.lastIndex-1))&&(A="(?: "+A+")",k=" "+k,N++),n=new RegExp("^(?:"+A+")",L)),O&&(n=new RegExp("^"+A+"$(?!\\s)",L)),S&&(r=v.lastIndex),o=i(y,I?n:v,k),I?o?(o.input=w(o.input,N),o[0]=w(o[0],N),o.index=v.lastIndex,v.lastIndex+=o[0].length):v.lastIndex=0:S&&o&&(v.lastIndex=v.global?o.index+o[0].length:r),O&&o&&o.length>1&&i(d,o[0],n,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(o[u]=void 0)})),o&&P)for(o.groups=s=l(null),u=0;u<P.length;u++)s[(f=P[u])[0]]=o[f[1]];return o}),t.exports=m},7066:function(t,e,n){"use strict";var r=n(9670);t.exports=function(){var t=r(this),e="";return t.hasIndices&&(e+="d"),t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.unicodeSets&&(e+="v"),t.sticky&&(e+="y"),e}},2999:function(t,e,n){var r=n(7293),o=n(7854).RegExp,i=r((function(){var t=o("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),u=i||r((function(){return!o("a","y").sticky})),c=i||r((function(){var t=o("^r","gy");return t.lastIndex=2,null!=t.exec("str")}));t.exports={BROKEN_CARET:c,MISSED_STICKY:u,UNSUPPORTED_Y:i}},9441:function(t,e,n){var r=n(7293),o=n(7854).RegExp;t.exports=r((function(){var t=o(".","s");return!(t.dotAll&&t.exec("\n")&&"s"===t.flags)}))},7168:function(t,e,n){var r=n(7293),o=n(7854).RegExp;t.exports=r((function(){var t=o("(?<a>b)","g");return"b"!==t.exec("b").groups.a||"bc"!=="b".replace(t,"$<a>c")}))},4488:function(t,e,n){var r=n(8554),o=TypeError;t.exports=function(t){if(r(t))throw o("Can't call method on "+t);return t}},6340:function(t,e,n){"use strict";var r=n(5005),o=n(3070),i=n(5112),u=n(9781),c=i("species");t.exports=function(t){var e=r(t),n=o.f;u&&e&&!e[c]&&n(e,c,{configurable:!0,get:function(){return this}})}},8003:function(t,e,n){var r=n(3070).f,o=n(2597),i=n(5112)("toStringTag");t.exports=function(t,e,n){t&&!n&&(t=t.prototype),t&&!o(t,i)&&r(t,i,{configurable:!0,value:e})}},6200:function(t,e,n){var r=n(2309),o=n(9711),i=r("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},5465:function(t,e,n){var r=n(7854),o=n(3072),i="__core-js_shared__",u=r[i]||o(i,{});t.exports=u},2309:function(t,e,n){var r=n(1913),o=n(5465);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.25.0",mode:r?"pure":"global",copyright:"© 2014-2022 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.25.0/LICENSE",source:"https://github.com/zloirock/core-js"})},6707:function(t,e,n){var r=n(9670),o=n(9483),i=n(8554),u=n(5112)("species");t.exports=function(t,e){var n,c=r(t).constructor;return void 0===c||i(n=r(c)[u])?e:o(n)}},8710:function(t,e,n){var r=n(1702),o=n(9303),i=n(1340),u=n(4488),c=r("".charAt),a=r("".charCodeAt),s=r("".slice),f=function(t){return function(e,n){var r,f,l=i(u(e)),p=o(n),v=l.length;return p<0||p>=v?t?"":void 0:(r=a(l,p))<55296||r>56319||p+1===v||(f=a(l,p+1))<56320||f>57343?t?c(l,p):r:t?s(l,p,p+2):f-56320+(r-55296<<10)+65536}};t.exports={codeAt:f(!1),charAt:f(!0)}},3111:function(t,e,n){var r=n(1702),o=n(4488),i=n(1340),u=n(1361),c=r("".replace),a="["+u+"]",s=RegExp("^"+a+a+"*"),f=RegExp(a+a+"*$"),l=function(t){return function(e){var n=i(o(e));return 1&t&&(n=c(n,s,"")),2&t&&(n=c(n,f,"")),n}};t.exports={start:l(1),end:l(2),trim:l(3)}},6293:function(t,e,n){var r=n(7392),o=n(7293);t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol();return!String(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&r&&r<41}))},6532:function(t,e,n){var r=n(6916),o=n(5005),i=n(5112),u=n(8052);t.exports=function(){var t=o("Symbol"),e=t&&t.prototype,n=e&&e.valueOf,c=i("toPrimitive");e&&!e[c]&&u(e,c,(function(t){return r(n,this)}),{arity:1})}},2015:function(t,e,n){var r=n(6293);t.exports=r&&!!Symbol.for&&!!Symbol.keyFor},261:function(t,e,n){var r,o,i,u,c=n(7854),a=n(2104),s=n(9974),f=n(614),l=n(2597),p=n(7293),v=n(490),h=n(206),d=n(317),y=n(8053),m=n(6833),g=n(5268),b=c.setImmediate,x=c.clearImmediate,w=c.process,S=c.Dispatch,E=c.Function,O=c.MessageChannel,j=c.String,T=0,P={},I="onreadystatechange";try{r=c.location}catch(t){}var L=function(t){if(l(P,t)){var e=P[t];delete P[t],e()}},A=function(t){return function(){L(t)}},N=function(t){L(t.data)},k=function(t){c.postMessage(j(t),r.protocol+"//"+r.host)};b&&x||(b=function(t){y(arguments.length,1);var e=f(t)?t:E(t),n=h(arguments,1);return P[++T]=function(){a(e,void 0,n)},o(T),T},x=function(t){delete P[t]},g?o=function(t){w.nextTick(A(t))}:S&&S.now?o=function(t){S.now(A(t))}:O&&!m?(u=(i=new O).port2,i.port1.onmessage=N,o=s(u.postMessage,u)):c.addEventListener&&f(c.postMessage)&&!c.importScripts&&r&&"file:"!==r.protocol&&!p(k)?(o=k,c.addEventListener("message",N,!1)):o=I in d("script")?function(t){v.appendChild(d("script"))[I]=function(){v.removeChild(this),L(t)}}:function(t){setTimeout(A(t),0)}),t.exports={set:b,clear:x}},863:function(t,e,n){var r=n(1702);t.exports=r(1..valueOf)},1400:function(t,e,n){var r=n(9303),o=Math.max,i=Math.min;t.exports=function(t,e){var n=r(t);return n<0?o(n+e,0):i(n,e)}},5656:function(t,e,n){var r=n(8361),o=n(4488);t.exports=function(t){return r(o(t))}},9303:function(t,e,n){var r=n(4758);t.exports=function(t){var e=+t;return e!=e||0===e?0:r(e)}},7466:function(t,e,n){var r=n(9303),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},7908:function(t,e,n){var r=n(4488),o=Object;t.exports=function(t){return o(r(t))}},7593:function(t,e,n){var r=n(6916),o=n(111),i=n(2190),u=n(8173),c=n(2140),a=n(5112),s=TypeError,f=a("toPrimitive");t.exports=function(t,e){if(!o(t)||i(t))return t;var n,a=u(t,f);if(a){if(void 0===e&&(e="default"),n=r(a,t,e),!o(n)||i(n))return n;throw s("Can't convert object to primitive value")}return void 0===e&&(e="number"),c(t,e)}},4948:function(t,e,n){var r=n(7593),o=n(2190);t.exports=function(t){var e=r(t,"string");return o(e)?e:e+""}},1694:function(t,e,n){var r={};r[n(5112)("toStringTag")]="z",t.exports="[object z]"===String(r)},1340:function(t,e,n){var r=n(648),o=String;t.exports=function(t){if("Symbol"===r(t))throw TypeError("Cannot convert a Symbol value to a string");return o(t)}},6330:function(t){var e=String;t.exports=function(t){try{return e(t)}catch(t){return"Object"}}},9711:function(t,e,n){var r=n(1702),o=0,i=Math.random(),u=r(1..toString);t.exports=function(t){return"Symbol("+(void 0===t?"":t)+")_"+u(++o+i,36)}},3307:function(t,e,n){var r=n(6293);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},3353:function(t,e,n){var r=n(9781),o=n(7293);t.exports=r&&o((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},8053:function(t){var e=TypeError;t.exports=function(t,n){if(t<n)throw e("Not enough arguments");return t}},4811:function(t,e,n){var r=n(7854),o=n(614),i=r.WeakMap;t.exports=o(i)&&/native code/.test(String(i))},6800:function(t,e,n){var r=n(857),o=n(2597),i=n(6061),u=n(3070).f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});o(e,t)||u(e,t,{value:i.f(t)})}},6061:function(t,e,n){var r=n(5112);e.f=r},5112:function(t,e,n){var r=n(7854),o=n(2309),i=n(2597),u=n(9711),c=n(6293),a=n(3307),s=o("wks"),f=r.Symbol,l=f&&f.for,p=a?f:f&&f.withoutSetter||u;t.exports=function(t){if(!i(s,t)||!c&&"string"!=typeof s[t]){var e="Symbol."+t;c&&i(f,t)?s[t]=f[t]:s[t]=a&&l?l(e):p(e)}return s[t]}},1361:function(t){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},2222:function(t,e,n){"use strict";var r=n(2109),o=n(7293),i=n(3157),u=n(111),c=n(7908),a=n(6244),s=n(7207),f=n(6135),l=n(5417),p=n(1194),v=n(5112),h=n(7392),d=v("isConcatSpreadable"),y=h>=51||!o((function(){var t=[];return t[d]=!1,t.concat()[0]!==t})),m=p("concat"),g=function(t){if(!u(t))return!1;var e=t[d];return void 0!==e?!!e:i(t)};r({target:"Array",proto:!0,arity:1,forced:!y||!m},{concat:function(t){var e,n,r,o,i,u=c(this),p=l(u,0),v=0;for(e=-1,r=arguments.length;e<r;e++)if(g(i=-1===e?u:arguments[e]))for(o=a(i),s(v+o),n=0;n<o;n++,v++)n in i&&f(p,v,i[n]);else s(v+1),f(p,v++,i);return p.length=v,p}})},1038:function(t,e,n){var r=n(2109),o=n(8457);r({target:"Array",stat:!0,forced:!n(7072)((function(t){Array.from(t)}))},{from:o})},6992:function(t,e,n){"use strict";var r=n(5656),o=n(1223),i=n(7497),u=n(9909),c=n(3070).f,a=n(1656),s=n(1913),f=n(9781),l="Array Iterator",p=u.set,v=u.getterFor(l);t.exports=a(Array,"Array",(function(t,e){p(this,{type:l,target:r(t),index:0,kind:e})}),(function(){var t=v(this),e=t.target,n=t.kind,r=t.index++;return!e||r>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:e[r],done:!1}:{value:[r,e[r]],done:!1}}),"values");var h=i.Arguments=i.Array;if(o("keys"),o("values"),o("entries"),!s&&f&&"values"!==h.name)try{c(h,"name",{value:"values"})}catch(t){}},5069:function(t,e,n){"use strict";var r=n(2109),o=n(1702),i=n(3157),u=o([].reverse),c=[1,2];r({target:"Array",proto:!0,forced:String(c)===String(c.reverse())},{reverse:function(){return i(this)&&(this.length=this.length),u(this)}})},7042:function(t,e,n){"use strict";var r=n(2109),o=n(3157),i=n(4411),u=n(111),c=n(1400),a=n(6244),s=n(5656),f=n(6135),l=n(5112),p=n(1194),v=n(206),h=p("slice"),d=l("species"),y=Array,m=Math.max;r({target:"Array",proto:!0,forced:!h},{slice:function(t,e){var n,r,l,p=s(this),h=a(p),g=c(t,h),b=c(void 0===e?h:e,h);if(o(p)&&(n=p.constructor,(i(n)&&(n===y||o(n.prototype))||u(n)&&null===(n=n[d]))&&(n=void 0),n===y||void 0===n))return v(p,g,b);for(r=new(void 0===n?y:n)(m(b-g,0)),l=0;g<b;g++,l++)g in p&&f(r,l,p[g]);return r.length=l,r}})},6078:function(t,e,n){var r=n(2597),o=n(8052),i=n(8709),u=n(5112)("toPrimitive"),c=Date.prototype;r(c,u)||o(c,u,i)},8309:function(t,e,n){var r=n(9781),o=n(6530).EXISTS,i=n(1702),u=n(3070).f,c=Function.prototype,a=i(c.toString),s=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,f=i(s.exec);r&&!o&&u(c,"name",{configurable:!0,get:function(){try{return f(s,a(this))[1]}catch(t){return""}}})},8862:function(t,e,n){var r=n(2109),o=n(5005),i=n(2104),u=n(6916),c=n(1702),a=n(7293),s=n(3157),f=n(614),l=n(111),p=n(2190),v=n(206),h=n(6293),d=o("JSON","stringify"),y=c(/./.exec),m=c("".charAt),g=c("".charCodeAt),b=c("".replace),x=c(1..toString),w=/[\uD800-\uDFFF]/g,S=/^[\uD800-\uDBFF]$/,E=/^[\uDC00-\uDFFF]$/,O=!h||a((function(){var t=o("Symbol")();return"[null]"!=d([t])||"{}"!=d({a:t})||"{}"!=d(Object(t))})),j=a((function(){return'"\\udf06\\ud834"'!==d("\udf06\ud834")||'"\\udead"'!==d("\udead")})),T=function(t,e){var n=v(arguments),r=e;if((l(e)||void 0!==t)&&!p(t))return s(e)||(e=function(t,e){if(f(r)&&(e=u(r,this,t,e)),!p(e))return e}),n[1]=e,i(d,null,n)},P=function(t,e,n){var r=m(n,e-1),o=m(n,e+1);return y(S,t)&&!y(E,o)||y(E,t)&&!y(S,r)?"\\u"+x(g(t,0),16):t};d&&r({target:"JSON",stat:!0,arity:3,forced:O||j},{stringify:function(t,e,n){var r=v(arguments),o=i(O?T:d,null,r);return j&&"string"==typeof o?b(o,w,P):o}})},3706:function(t,e,n){var r=n(7854);n(8003)(r.JSON,"JSON",!0)},2703:function(t,e,n){n(8003)(Math,"Math",!0)},9653:function(t,e,n){"use strict";var r=n(9781),o=n(7854),i=n(1702),u=n(4705),c=n(8052),a=n(2597),s=n(9587),f=n(7976),l=n(2190),p=n(7593),v=n(7293),h=n(8006).f,d=n(1236).f,y=n(3070).f,m=n(863),g=n(3111).trim,b="Number",x=o[b],w=x.prototype,S=o.TypeError,E=i("".slice),O=i("".charCodeAt),j=function(t){var e=p(t,"number");return"bigint"==typeof e?e:T(e)},T=function(t){var e,n,r,o,i,u,c,a,s=p(t,"number");if(l(s))throw S("Cannot convert a Symbol value to a number");if("string"==typeof s&&s.length>2)if(s=g(s),43===(e=O(s,0))||45===e){if(88===(n=O(s,2))||120===n)return NaN}else if(48===e){switch(O(s,1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+s}for(u=(i=E(s,2)).length,c=0;c<u;c++)if((a=O(i,c))<48||a>o)return NaN;return parseInt(i,r)}return+s};if(u(b,!x(" 0o1")||!x("0b1")||x("+0x1"))){for(var P,I=function(t){var e=arguments.length<1?0:x(j(t)),n=this;return f(w,n)&&v((function(){m(n)}))?s(Object(e),n,I):e},L=r?h(x):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),A=0;L.length>A;A++)a(x,P=L[A])&&!a(I,P)&&y(I,P,d(x,P));I.prototype=w,w.constructor=I,c(o,b,I,{constructor:!0})}},9660:function(t,e,n){var r=n(2109),o=n(6293),i=n(7293),u=n(5181),c=n(7908);r({target:"Object",stat:!0,forced:!o||i((function(){u.f(1)}))},{getOwnPropertySymbols:function(t){var e=u.f;return e?e(c(t)):[]}})},489:function(t,e,n){var r=n(2109),o=n(7293),i=n(7908),u=n(9518),c=n(8544);r({target:"Object",stat:!0,forced:o((function(){u(1)})),sham:!c},{getPrototypeOf:function(t){return u(i(t))}})},1539:function(t,e,n){var r=n(1694),o=n(8052),i=n(288);r||o(Object.prototype,"toString",i,{unsafe:!0})},821:function(t,e,n){"use strict";var r=n(2109),o=n(6916),i=n(9662),u=n(8523),c=n(2534),a=n(408);r({target:"Promise",stat:!0,forced:n(612)},{all:function(t){var e=this,n=u.f(e),r=n.resolve,s=n.reject,f=c((function(){var n=i(e.resolve),u=[],c=0,f=1;a(t,(function(t){var i=c++,a=!1;f++,o(n,e,t).then((function(t){a||(a=!0,u[i]=t,--f||r(u))}),s)})),--f||r(u)}));return f.error&&s(f.value),n.promise}})},4164:function(t,e,n){"use strict";var r=n(2109),o=n(1913),i=n(3702).CONSTRUCTOR,u=n(2492),c=n(5005),a=n(614),s=n(8052),f=u&&u.prototype;if(r({target:"Promise",proto:!0,forced:i,real:!0},{catch:function(t){return this.then(void 0,t)}}),!o&&a(u)){var l=c("Promise").prototype.catch;f.catch!==l&&s(f,"catch",l,{unsafe:!0})}},3401:function(t,e,n){"use strict";var r,o,i,u=n(2109),c=n(1913),a=n(5268),s=n(7854),f=n(6916),l=n(8052),p=n(7674),v=n(8003),h=n(6340),d=n(9662),y=n(614),m=n(111),g=n(5787),b=n(6707),x=n(261).set,w=n(5948),S=n(842),E=n(2534),O=n(8572),j=n(9909),T=n(2492),P=n(3702),I=n(8523),L="Promise",A=P.CONSTRUCTOR,N=P.REJECTION_EVENT,k=P.SUBCLASSING,C=j.getterFor(L),M=j.set,R=T&&T.prototype,_=T,F=R,B=s.TypeError,D=s.document,G=s.process,U=I.f,H=U,V=!!(D&&D.createEvent&&s.dispatchEvent),Y="unhandledrejection",z=function(t){var e;return!(!m(t)||!y(e=t.then))&&e},q=function(t,e){var n,r,o,i=e.value,u=1==e.state,c=u?t.ok:t.fail,a=t.resolve,s=t.reject,l=t.domain;try{c?(u||(2===e.rejection&&X(e),e.rejection=1),!0===c?n=i:(l&&l.enter(),n=c(i),l&&(l.exit(),o=!0)),n===t.promise?s(B("Promise-chain cycle")):(r=z(n))?f(r,n,a,s):a(n)):s(i)}catch(t){l&&!o&&l.exit(),s(t)}},$=function(t,e){t.notified||(t.notified=!0,w((function(){for(var n,r=t.reactions;n=r.get();)q(n,t);t.notified=!1,e&&!t.rejection&&J(t)})))},W=function(t,e,n){var r,o;V?((r=D.createEvent("Event")).promise=e,r.reason=n,r.initEvent(t,!1,!0),s.dispatchEvent(r)):r={promise:e,reason:n},!N&&(o=s["on"+t])?o(r):t===Y&&S("Unhandled promise rejection",n)},J=function(t){f(x,s,(function(){var e,n=t.facade,r=t.value;if(K(t)&&(e=E((function(){a?G.emit("unhandledRejection",r,n):W(Y,n,r)})),t.rejection=a||K(t)?2:1,e.error))throw e.value}))},K=function(t){return 1!==t.rejection&&!t.parent},X=function(t){f(x,s,(function(){var e=t.facade;a?G.emit("rejectionHandled",e):W("rejectionhandled",e,t.value)}))},Q=function(t,e,n){return function(r){t(e,r,n)}},Z=function(t,e,n){t.done||(t.done=!0,n&&(t=n),t.value=e,t.state=2,$(t,!0))},tt=function(t,e,n){if(!t.done){t.done=!0,n&&(t=n);try{if(t.facade===e)throw B("Promise can't be resolved itself");var r=z(e);r?w((function(){var n={done:!1};try{f(r,e,Q(tt,n,t),Q(Z,n,t))}catch(e){Z(n,e,t)}})):(t.value=e,t.state=1,$(t,!1))}catch(e){Z({done:!1},e,t)}}};if(A&&(F=(_=function(t){g(this,F),d(t),f(r,this);var e=C(this);try{t(Q(tt,e),Q(Z,e))}catch(t){Z(e,t)}}).prototype,(r=function(t){M(this,{type:L,done:!1,notified:!1,parent:!1,reactions:new O,rejection:!1,state:0,value:void 0})}).prototype=l(F,"then",(function(t,e){var n=C(this),r=U(b(this,_));return n.parent=!0,r.ok=!y(t)||t,r.fail=y(e)&&e,r.domain=a?G.domain:void 0,0==n.state?n.reactions.add(r):w((function(){q(r,n)})),r.promise})),o=function(){var t=new r,e=C(t);this.promise=t,this.resolve=Q(tt,e),this.reject=Q(Z,e)},I.f=U=function(t){return t===_||void 0===t?new o(t):H(t)},!c&&y(T)&&R!==Object.prototype)){i=R.then,k||l(R,"then",(function(t,e){var n=this;return new _((function(t,e){f(i,n,t,e)})).then(t,e)}),{unsafe:!0});try{delete R.constructor}catch(t){}p&&p(R,F)}u({global:!0,constructor:!0,wrap:!0,forced:A},{Promise:_}),v(_,L,!1,!0),h(L)},8674:function(t,e,n){n(3401),n(821),n(4164),n(6027),n(683),n(6294)},6027:function(t,e,n){"use strict";var r=n(2109),o=n(6916),i=n(9662),u=n(8523),c=n(2534),a=n(408);r({target:"Promise",stat:!0,forced:n(612)},{race:function(t){var e=this,n=u.f(e),r=n.reject,s=c((function(){var u=i(e.resolve);a(t,(function(t){o(u,e,t).then(n.resolve,r)}))}));return s.error&&r(s.value),n.promise}})},683:function(t,e,n){"use strict";var r=n(2109),o=n(6916),i=n(8523);r({target:"Promise",stat:!0,forced:n(3702).CONSTRUCTOR},{reject:function(t){var e=i.f(this);return o(e.reject,void 0,t),e.promise}})},6294:function(t,e,n){"use strict";var r=n(2109),o=n(5005),i=n(1913),u=n(2492),c=n(3702).CONSTRUCTOR,a=n(9478),s=o("Promise"),f=i&&!c;r({target:"Promise",stat:!0,forced:i||c},{resolve:function(t){return a(f&&this===s?u:this,t)}})},4916:function(t,e,n){"use strict";var r=n(2109),o=n(2261);r({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},8783:function(t,e,n){"use strict";var r=n(8710).charAt,o=n(1340),i=n(9909),u=n(1656),c="String Iterator",a=i.set,s=i.getterFor(c);u(String,"String",(function(t){a(this,{type:c,string:o(t),index:0})}),(function(){var t,e=s(this),n=e.string,o=e.index;return o>=n.length?{value:void 0,done:!0}:(t=r(n,o),e.index+=t.length,{value:t,done:!1})}))},2443:function(t,e,n){n(6800)("asyncIterator")},4032:function(t,e,n){"use strict";var r=n(2109),o=n(7854),i=n(6916),u=n(1702),c=n(1913),a=n(9781),s=n(6293),f=n(7293),l=n(2597),p=n(7976),v=n(9670),h=n(5656),d=n(4948),y=n(1340),m=n(9114),g=n(30),b=n(1956),x=n(8006),w=n(1156),S=n(5181),E=n(1236),O=n(3070),j=n(6048),T=n(5296),P=n(8052),I=n(2309),L=n(6200),A=n(3501),N=n(9711),k=n(5112),C=n(6061),M=n(6800),R=n(6532),_=n(8003),F=n(9909),B=n(2092).forEach,D=L("hidden"),G="Symbol",U="prototype",H=F.set,V=F.getterFor(G),Y=Object[U],z=o.Symbol,q=z&&z[U],$=o.TypeError,W=o.QObject,J=E.f,K=O.f,X=w.f,Q=T.f,Z=u([].push),tt=I("symbols"),et=I("op-symbols"),nt=I("wks"),rt=!W||!W[U]||!W[U].findChild,ot=a&&f((function(){return 7!=g(K({},"a",{get:function(){return K(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=J(Y,e);r&&delete Y[e],K(t,e,n),r&&t!==Y&&K(Y,e,r)}:K,it=function(t,e){var n=tt[t]=g(q);return H(n,{type:G,tag:t,description:e}),a||(n.description=e),n},ut=function(t,e,n){t===Y&&ut(et,e,n),v(t);var r=d(e);return v(n),l(tt,r)?(n.enumerable?(l(t,D)&&t[D][r]&&(t[D][r]=!1),n=g(n,{enumerable:m(0,!1)})):(l(t,D)||K(t,D,m(1,{})),t[D][r]=!0),ot(t,r,n)):K(t,r,n)},ct=function(t,e){v(t);var n=h(e),r=b(n).concat(lt(n));return B(r,(function(e){a&&!i(at,n,e)||ut(t,e,n[e])})),t},at=function(t){var e=d(t),n=i(Q,this,e);return!(this===Y&&l(tt,e)&&!l(et,e))&&(!(n||!l(this,e)||!l(tt,e)||l(this,D)&&this[D][e])||n)},st=function(t,e){var n=h(t),r=d(e);if(n!==Y||!l(tt,r)||l(et,r)){var o=J(n,r);return!o||!l(tt,r)||l(n,D)&&n[D][r]||(o.enumerable=!0),o}},ft=function(t){var e=X(h(t)),n=[];return B(e,(function(t){l(tt,t)||l(A,t)||Z(n,t)})),n},lt=function(t){var e=t===Y,n=X(e?et:h(t)),r=[];return B(n,(function(t){!l(tt,t)||e&&!l(Y,t)||Z(r,tt[t])})),r};s||(z=function(){if(p(q,this))throw $("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?y(arguments[0]):void 0,e=N(t),n=function(t){this===Y&&i(n,et,t),l(this,D)&&l(this[D],e)&&(this[D][e]=!1),ot(this,e,m(1,t))};return a&&rt&&ot(Y,e,{configurable:!0,set:n}),it(e,t)},P(q=z[U],"toString",(function(){return V(this).tag})),P(z,"withoutSetter",(function(t){return it(N(t),t)})),T.f=at,O.f=ut,j.f=ct,E.f=st,x.f=w.f=ft,S.f=lt,C.f=function(t){return it(k(t),t)},a&&(K(q,"description",{configurable:!0,get:function(){return V(this).description}}),c||P(Y,"propertyIsEnumerable",at,{unsafe:!0}))),r({global:!0,constructor:!0,wrap:!0,forced:!s,sham:!s},{Symbol:z}),B(b(nt),(function(t){M(t)})),r({target:G,stat:!0,forced:!s},{useSetter:function(){rt=!0},useSimple:function(){rt=!1}}),r({target:"Object",stat:!0,forced:!s,sham:!a},{create:function(t,e){return void 0===e?g(t):ct(g(t),e)},defineProperty:ut,defineProperties:ct,getOwnPropertyDescriptor:st}),r({target:"Object",stat:!0,forced:!s},{getOwnPropertyNames:ft}),R(),_(z,G),A[D]=!0},1817:function(t,e,n){"use strict";var r=n(2109),o=n(9781),i=n(7854),u=n(1702),c=n(2597),a=n(614),s=n(7976),f=n(1340),l=n(3070).f,p=n(9920),v=i.Symbol,h=v&&v.prototype;if(o&&a(v)&&(!("description"in h)||void 0!==v().description)){var d={},y=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:f(arguments[0]),e=s(h,this)?new v(t):void 0===t?v():v(t);return""===t&&(d[e]=!0),e};p(y,v),y.prototype=h,h.constructor=y;var m="Symbol(test)"==String(v("test")),g=u(h.valueOf),b=u(h.toString),x=/^Symbol\((.*)\)[^)]+$/,w=u("".replace),S=u("".slice);l(h,"description",{configurable:!0,get:function(){var t=g(this);if(c(d,t))return"";var e=b(t),n=m?S(e,7,-1):w(e,x,"$1");return""===n?void 0:n}}),r({global:!0,constructor:!0,forced:!0},{Symbol:y})}},763:function(t,e,n){var r=n(2109),o=n(5005),i=n(2597),u=n(1340),c=n(2309),a=n(2015),s=c("string-to-symbol-registry"),f=c("symbol-to-string-registry");r({target:"Symbol",stat:!0,forced:!a},{for:function(t){var e=u(t);if(i(s,e))return s[e];var n=o("Symbol")(e);return s[e]=n,f[n]=e,n}})},2165:function(t,e,n){n(6800)("iterator")},2526:function(t,e,n){n(4032),n(763),n(6620),n(8862),n(9660)},6620:function(t,e,n){var r=n(2109),o=n(2597),i=n(2190),u=n(6330),c=n(2309),a=n(2015),s=c("symbol-to-string-registry");r({target:"Symbol",stat:!0,forced:!a},{keyFor:function(t){if(!i(t))throw TypeError(u(t)+" is not a symbol");if(o(s,t))return s[t]}})},6649:function(t,e,n){var r=n(6800),o=n(6532);r("toPrimitive"),o()},9341:function(t,e,n){var r=n(5005),o=n(6800),i=n(8003);o("toStringTag"),i(r("Symbol"),"Symbol")},4747:function(t,e,n){var r=n(7854),o=n(8324),i=n(8509),u=n(8533),c=n(8880),a=function(t){if(t&&t.forEach!==u)try{c(t,"forEach",u)}catch(e){t.forEach=u}};for(var s in o)o[s]&&a(r[s]&&r[s].prototype);a(i)},3948:function(t,e,n){var r=n(7854),o=n(8324),i=n(8509),u=n(6992),c=n(8880),a=n(5112),s=a("iterator"),f=a("toStringTag"),l=u.values,p=function(t,e){if(t){if(t[s]!==l)try{c(t,s,l)}catch(e){t[s]=l}if(t[f]||c(t,f,e),o[e])for(var n in u)if(t[n]!==u[n])try{c(t,n,u[n])}catch(e){t[n]=u[n]}}};for(var v in o)p(r[v]&&r[v].prototype,v);p(i,"DOMTokenList")}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};return function(){"use strict";function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.r(r),n.d(r,{BottomSheet:function(){return l}}),n(2222),n(9653),n(6649),n(6078),n(2526),n(1817),n(1539),n(8674),n(2165),n(6992),n(8783),n(3948),n(2443),n(9341),n(3706),n(2703),n(489),n(4747),n(8309),n(5069),n(7042),n(1038),n(4916);var e=function(e){var n,r=function(e){if(Array.isArray(e))return t(e)}(n=document.querySelectorAll("".concat(e," *")))||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(n)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),o=1;return r.forEach((function(t){var e=document.defaultView.getComputedStyle(t,null).getPropertyValue("z-index");isNaN(e)||(e=Number(e),o=o<e?e:o)})),Number(o)};function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function i(){i=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},u="function"==typeof Symbol?Symbol:{},c=u.iterator||"@@iterator",a=u.asyncIterator||"@@asyncIterator",s=u.toStringTag||"@@toStringTag";function f(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,n){return t[e]=n}}function l(t,e,n,o){var i=e&&e.prototype instanceof h?e:h,u=Object.create(i.prototype),c=new P(o||[]);return r(u,"_invoke",{value:E(t,n,c)}),u}function p(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var v={};function h(){}function d(){}function y(){}var m={};f(m,c,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(I([])));b&&b!==e&&n.call(b,c)&&(m=b);var x=y.prototype=h.prototype=Object.create(m);function w(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function i(r,u,c,a){var s=p(t[r],t,u);if("throw"!==s.type){var f=s.arg,l=f.value;return l&&"object"==o(l)&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){i("next",t,c,a)}),(function(t){i("throw",t,c,a)})):e.resolve(l).then((function(t){f.value=t,c(f)}),(function(t){return i("throw",t,c,a)}))}a(s.arg)}var u;r(this,"_invoke",{value:function(t,n){function r(){return new e((function(e,r){i(t,n,e,r)}))}return u=u?u.then(r,r):r()}})}function E(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return{value:void 0,done:!0}}for(n.method=o,n.arg=i;;){var u=n.delegate;if(u){var c=O(u,n);if(c){if(c===v)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var a=p(t,e,n);if("normal"===a.type){if(r=n.done?"completed":"suspendedYield",a.arg===v)continue;return{value:a.arg,done:n.done}}"throw"===a.type&&(r="completed",n.method="throw",n.arg=a.arg)}}}function O(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,O(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),v;var o=p(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,v;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,v):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,v)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function I(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:L}}function L(){return{value:void 0,done:!0}}return d.prototype=y,r(x,"constructor",{value:y,configurable:!0}),r(y,"constructor",{value:d,configurable:!0}),d.displayName=f(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,f(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},w(S.prototype),f(S.prototype,a,(function(){return this})),t.AsyncIterator=S,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var u=new S(l(e,n,r,o),i);return t.isGeneratorFunction(n)?u:u.next().then((function(t){return t.done?t.value:u.next()}))},w(x),f(x,s,"Generator"),f(x,c,(function(){return this})),f(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=I,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(T),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return u.type="throw",u.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],u=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),a=n.call(i,"finallyLoc");if(c&&a){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!a)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var u=i?i.completion:{};return u.type=t,u.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(u)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),T(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;T(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:I(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),v}},t}function u(t,e,n,r,o,i,u){try{var c=t[i](u),a=c.value}catch(t){return void n(t)}c.done?e(a):Promise.resolve(a).then(r,o)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function c(t){u(i,r,o,c,a,"next",t)}function a(t){u(i,r,o,c,a,"throw",t)}c(void 0)}))}}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,f(r.key),r)}}function s(t,e,n){return(e=f(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t){var e=function(t,e){if("object"!==o(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==o(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===o(e)?e:String(e)}var l=function(){function t(e,n){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),s(this,"status",{}),s(this,"parents",""),s(this,"html",""),s(this,"height",50),s(this,"startY",0),s(this,"sheetClass",""),s(this,"contentsClass",""),s(this,"backgroundClass",""),s(this,"backgroundClickExit",!0),s(this,"beforeOpen",(function(){})),s(this,"afterOpen",(function(){})),s(this,"beforeEnd",(function(){})),s(this,"afterEnd",(function(){})),null===e)throw{message:"parents must be entered"};if(null===n)throw{message:"html must be entered"};this.parents=e,this.html=n}var n,r,o,u,f;return n=t,r=[{key:"open",value:(f=c(i().mark((function n(){var r,o,u,a,s,f,l=this;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=String(t.makeID(32)),o=e(this.parents),u="sheet_"+r,this.status[u]={},this.status[u].mousedown=!1,this.status[u].mouseup=!1,null===document.getElementById("frontleBottomSheetCSS")&&((a=document.createElement("style")).setAttribute("id","frontleBottomSheetCSS"),a.innerHTML="\n        .frontleBottomSheet{\n            position: fixed;\n            width: 100%;\n            height: 100%;\n            top: 0;\n            left: 0;\n        }\n        .frontleBottomSheetBackground{\n            position: relative;\n            width: 100%;\n            height: 100%;\n            top: 0;\n            left: 0;\n            background: #000000;\n            opacity: 0;\n            transition: opacity ease 0.4s 0s;\n        }\n        .frontleBottomSheetContents{\n            position: absolute;\n            width: 100%;\n            bottom: 0vh;\n            margin: 0 auto;\n            padding: 0rem 1.5rem 0rem 1.5rem;\n            border-top-left-radius: 5px;\n            border-top-right-radius: 5px;\n            box-sizing: border-box;\n            background: #ffffff;\n            overflow: hidden;\n        }\n        .frontleBottomSheetBar{\n            position: relative;\n            display: block;\n            padding-top: 0.5rem;\n            padding-bottom: 1rem;\n        }\n        .frontleBottomSheetBarLine{\n            position: relative;\n            display: block;\n            margin: 0 auto;\n            width: 2.5rem;\n            height: 0.3125rem;\n            border-radius: 10px;\n            background: #c4c4c4;\n        }\n        .frontleBottomSheetHtml{\n            position: relative;\n            display: block;\n            width: 100%;\n            height: calc(100% - 2.75rem);\n            overflow: scroll;\n            -ms-overflow-style: none; /* IE and Edge */\n            scrollbar-width: none; /* Firefox */\n        }\n        .frontleBottomSheetHtml::-webkit-scrollbar {\n            display: none; /* Chrome, Safari, Opera*/\n        }\n      ",document.head.insertBefore(a,document.head.childNodes[0])),s='\n      <div class="frontleBottomSheetBackground '.concat(this.backgroundClass,'" style="z-index: ').concat(o+1,'"></div>\n\n      <div class="frontleBottomSheetContents ').concat(this.contentsClass,'" style="\n        max-height: ').concat(this.height,"vh;\n        height: ").concat(this.height,"vh;\n        z-index: ").concat(o+2,";\n        bottom: -").concat(this.height,'vh;\n        transition: bottom ease 0.4s 0s;\n      ">\n        <div class="frontleBottomSheetBar">\n          <div class="frontleBottomSheetBarLine"></div>\n        </div>\n        <div class="frontleBottomSheetHtml">').concat(this.html,"</div>\n      </div>\n    "),(f=document.createElement("div")).setAttribute("id",u),f.className="frontleBottomSheet ".concat(this.sheetClass),f.innerHTML=s,f.style.zIndex=String(o),document.querySelector(this.parents).append(f),n.next=16,this.beforeOpen(u);case 16:return setTimeout((function(){var t=f.querySelector(".frontleBottomSheetBackground");null!==t&&(t.style.opacity="0.4");var e=f.querySelector(".frontleBottomSheetContents");null!==e&&(e.style.bottom="".concat(l.startY,"vh"))}),100),setTimeout(c(i().mark((function t(){var e,n,r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return null!==(e=f.querySelector(".frontleBottomSheetBar"))&&(l.status[u].mouseDownEvent=function(t){t.preventDefault(),l.eventMouseDown(u)},e.addEventListener("mousedown",l.status[u].mouseDownEvent,!1),l.status[u].touchStartEvent=function(){l.eventMouseDown(u)},e.addEventListener("touchstart",l.status[u].touchStartEvent,!1)),n=f.querySelector(".frontleBottomSheetContents"),l.status[u].mouseUpEvent=function(t){t.preventDefault(),l.eventMouseUp(t,u,n)},document.addEventListener("mouseup",l.status[u].mouseUpEvent,!1),l.status[u].touchEndEvent=function(t){l.eventMouseUp(t.changedTouches[0],u,n)},document.addEventListener("touchend",l.status[u].touchEndEvent,!1),l.status[u].mouseMoveEvent=function(t){t.preventDefault(),l.eventMouseMove(t,u,n)},document.addEventListener("mousemove",l.status[u].mouseMoveEvent,!1),l.status[u].touchMoveEvent=function(t){l.eventMouseMove(t.changedTouches[0],u,n)},document.addEventListener("touchmove",l.status[u].touchMoveEvent,!1),!0===l.backgroundClickExit&&null!==(r=f.querySelector(".frontleBottomSheetBackground"))&&r.addEventListener("click",(function(){l.close(u)}),!1),null!==n&&n.style.removeProperty("transition"),t.next=15,l.afterOpen(u);case 15:case"end":return t.stop()}}),t)}))),500),n.abrupt("return",u);case 19:case"end":return n.stop()}}),n,this)}))),function(){return f.apply(this,arguments)})},{key:"close",value:(u=c(i().mark((function t(e){var n,r,o,u=this;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.beforeEnd(e);case 2:n=document.getElementById(e),null!==(r=n.querySelector(".frontleBottomSheetBackground"))&&(r.style.opacity="0"),null!==(o=n.querySelector(".frontleBottomSheetContents"))&&(o.style.transition="bottom ease 0.4s 0s",o.style.bottom="-".concat(this.height,"vh")),setTimeout(c(i().mark((function t(){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return document.removeEventListener("mousedown",u.status[e].mouseDownEvent),document.removeEventListener("touchstart",u.status[e].touchStartEvent),document.removeEventListener("mousemove",u.status[e].mouseMoveEvent),document.removeEventListener("touchmove",u.status[e].touchMoveEvent),document.removeEventListener("mouseup",u.status[e].mouseUpEvent),document.removeEventListener("touchend",u.status[e].touchEndEvent),delete u.status[e],null!==n&&n.remove(),t.next=10,u.afterEnd(e);case 10:case"end":return t.stop()}}),t)}))),400);case 8:case"end":return t.stop()}}),t,this)}))),function(t){return u.apply(this,arguments)})},{key:"eventMouseDown",value:function(t){!1===this.status[t].mouseup&&(this.status[t].mousedown=!0)}},{key:"eventMouseUp",value:function(t,e,n){var r=this;if(this.status[e].mousedown){this.status[e].mousedown=!1,this.status[e].mouseup=!0;var o=window.innerHeight-t.clientY;o<0&&(o=0),o>window.innerHeight&&(o=window.innerHeight);var i,u=o/window.innerHeight*100-Number(this.height);u>=0&&(u=0),Number(u)>=Number(this.startY)?(i=Number(this.startY)/2<=Number(u)?0:this.startY,n.style.transition="bottom ease 0.4s 0s",n.style.bottom="".concat(i,"vh"),setTimeout((function(){n.style.removeProperty("transition"),r.status[e].mouseup=!1}),400)):this.close(e)}}},{key:"eventMouseMove",value:function(t,e,n){if(this.status[e].mousedown){var r=window.innerHeight-t.clientY;r<0&&(r=0),r>window.innerHeight&&(r=window.innerHeight);var o=r/window.innerHeight*100-Number(this.height);o>=0&&(o=0),n.style.bottom="".concat(o,"vh")}}}],o=[{key:"makeID",value:function(t){for(var e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<t;o++)e+=n.charAt(Math.floor(Math.random()*r));return e}}],r&&a(n.prototype,r),o&&a(n,o),Object.defineProperty(n,"prototype",{writable:!1}),t}()}(),r}()}));
//# sourceMappingURL=frontle_bottomsheet.min.js.map

(function(win){
	var first =0;
	win.openSheet = function(options){
		if(first==0){
			first=1;
			$("body").append(`<style>.frontleBottomSheetHtml .fullbody{height:100%;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding-bottom:44px}.frontleBottomSheetHtml .body{-webkit-box-flex:1;-ms-flex:1;flex:1;height:100%;overflow-y:auto;overflow-x:hidden;margin:8px 0}
				.frontleBottomSheetHtml .foot{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.frontleBottomSheetHtml .foot>*{width:100%}
				 @media   (min-width: 1200px) {
				 	.frontleBottomSheetContents{
					width: 50%;
    margin-left: 25%;
				}
				}
				.bottomSheetOpen{
   overflow: hidden;
}
				</style>`);
		}

		options = typeof options=="string"?{data:options}:options;

		var content = typeof options.data =="string"?options.data:(typeof options.data=="function"?options.data(options):options.data);
		if(win.Handlebars && typeof options.bindData=="object"){
			content = win.Handlebars.compile(content)(options.bindData);
		}
		var bottomSheet = new BottomSheet(options.container||"body",content);
		bottomSheet.height = 100;
		bottomSheet.startY = -50;
		bottomSheet.beforeOpen = function(sheetId) { 
		  $('body').addClass('bottomSheetOpen');
		  //overdd
            var old = this.eventMouseUp;
            this.eventMouseUp = function (e, sheetID, element){
                old.call(this,e, sheetID, element);
                //now get bottom
                // element = $(element);
	             setTimeout(function(){ 
	               $("#"+sheetID).trigger("auto");
	            },200);
				 
            };

            $("#"+sheetId).on("auto",function(e){
            	var element = $(this).find(".frontleBottomSheetContents");
	             var a = (element.height()*1)+parseInt(element.css("bottom"));
	              element.find(".frontleBottomSheetHtml").height(a);
            });

            
		  if(options.beforeOpen)options.beforeOpen.call(this,sheetId);
		  
		};
		bottomSheet.afterOpen = function(sheetId) { 
		   
		   $("#"+sheetId).trigger("auto");

		    if(options.afterOpen)options.afterOpen.call(this,sheetId);
		};
		bottomSheet.afterEnd = function(sheetId) { 
		  $('body').removeClass('bottomSheetOpen');
		  if(options.afterEnd)options.afterEnd.call(this,sheetId);
		};
		bottomSheet.open().then(function(r){
			// console.log(r);
			id_sheet = r;
			
			
		});
		return {
			open : bottomSheet.open,
			close : function(){
				bottomSheet.close(id_sheet)	;
			}
		};
	};

	win.closeAll  = function(){
		$(".frontleBottomSheet").remove();
		$(".bottomSheetOpen").removeClass("bottomSheetOpen");
	};

	win.openSheet.demo = function(){
			var settings = {
		        class:"", 
		        title:"Demo Title",
		        onReady: function(sheet){

		        }
		    };

		    var str=`
			//defined
			window.test = function(options){
				options = $.extend({
		        class:"", 
		        title:"Chi tiêt hoá đơn",
		        onReady: function(sheet){

		        }
		      },options,true);

				var open = openSheet({
				data:\`<div class="fullbody \${options.title}">
		              <div class="head">
		                <h4>Title</h4>
		                 
		              </div>

		              <div class="body">
		                 
		              </div>
		              <div class="foot">
		                <button class="btnfoot">Xem thêm</button>
		              </div>
		          </div>\`,
				beforeOpen: function(sheetId) {
				     var sheet = this;
			         var body =  $("#"+sheetId);
			          
			         body.find(".btnfoot").on("click",function(e){
			           
			             
			            open.close();

			            if(settings.onConfirm){
			               settings.onConfirm.call(this,settings);
			            }else{
			              
			            }
			             
			         });

			        if(settings.onReady){
			            settings.onReady.call(open,{setting:settings,ele:body});
			        }
				}
			});
			return open;
		};


		//caller
		picker.test({
			onReady: function(e){
				//this.close();
		    }
		});
		`;

				var open = openSheet({
				data:`<div class="fullbody">
		              <div class="head">
		                <h4>${settings.title}</h4>
		                 
		              </div>

		              <div class="body">
		                 <pre>${str}</pre>
		              </div>
		              <div class="foot">
		                <button class="btnfoot">Đóng</button>
		              </div>
		          </div>`,
				beforeOpen: function(sheetId) {
				     var sheet = this;
			         var body =  $("#"+sheetId);
			          
			         body.find(".btnfoot").on("click",function(e){
			           
			             
			            open.close();

			            if(settings.onConfirm){
			               settings.onConfirm.call(this,settings);
			            }else{
			              
			            }
			             
			         });

			        if(settings.onReady){
			            settings.onReady.call(open,{setting:settings,ele:body});
			        }
				}
			});
	};

	win.openSheet.help = function(){
		return `
			//defined
			window.picker.test = function(options){
				options = $.extend({
		        class:"", 
		        title:"Chi tiêt hoá đơn",
		        onReady: function(sheet){

		        }
		      },options,true);

				var open = openSheet({
				data:\`<div class="fullbody \${options.title}">
		              <div class="head">
		                <h4>Title</h4>
		                 
		              </div>

		              <div class="body">
		                 
		              </div>
		              <div class="foot">
		                <button class="btnfoot">Xem thêm</button>
		              </div>
		          </div>\`,
				beforeOpen: function(sheetId) {
				     var sheet = this;
			         var body =  $("#"+sheetId);
			          
			         body.find(".btnfoot").on("click",function(e){
			           
			             
			            open.close();

			            if(settings.onConfirm){
			               settings.onConfirm.call(this,settings);
			            }else{
			              
			            }
			             
			         });

			        if(settings.onReady){
			            settings.onReady.call(open,{setting:settings,ele:body});
			        }
				}
			});
			return open;
		};


		//caller
		picker.test({
			onReady: function(e){
				//this.close();
		    }
		});
		`;
	};
 
 
})(window);
//https://codepen.io/webexpe/pen/oNqBqNJ
/*firebase.js*/
/*! @license Firebase v2.4.1
    License: https://www.firebase.com/terms/terms-of-service.html */
(function() {var h,n=this;function p(a){return void 0!==a}function aa(){}function ba(a){a.yb=function(){return a.zf?a.zf:a.zf=new a}}
function ca(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function da(a){return"array"==ca(a)}function ea(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function fa(a){return"number"==typeof a}function r(a){return"function"==ca(a)}function ga(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ha(a,b,c){return a.call.apply(a.bind,arguments)}
function ia(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function u(a,b,c){u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ha:ia;return u.apply(null,arguments)}var ja=Date.now||function(){return+new Date};
function ka(a,b){function c(){}c.prototype=b.prototype;a.oh=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.kh=function(a,c,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[c].apply(a,g)}};function la(a){if(Error.captureStackTrace)Error.captureStackTrace(this,la);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}ka(la,Error);la.prototype.name="CustomError";function v(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function ma(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function na(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function oa(a){var b=0,c;for(c in a)b++;return b}function pa(a){for(var b in a)return b}function qa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ra(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function sa(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
function ta(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function ua(a,b){var c=ta(a,b,void 0);return c&&a[c]}function va(a){for(var b in a)return!1;return!0}function wa(a){var b={},c;for(c in a)b[c]=a[c];return b}var xa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function ya(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<xa.length;f++)c=xa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function za(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Aa(){this.Vd=void 0}
function Ba(a,b,c){switch(typeof b){case "string":Ca(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(da(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ba(a,a.Vd?a.Vd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Ca(f,c),
c.push(":"),Ba(a,a.Vd?a.Vd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Da={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ea=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function Ca(a,b){b.push('"',a.replace(Ea,function(a){if(a in Da)return Da[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Da[a]=e+b.toString(16)}),'"')};function Fa(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^ja()).toString(36)};var w;a:{var Ga=n.navigator;if(Ga){var Ha=Ga.userAgent;if(Ha){w=Ha;break a}}w=""};function Ia(){this.Ya=-1};function Ja(){this.Ya=-1;this.Ya=64;this.P=[];this.pe=[];this.eg=[];this.Od=[];this.Od[0]=128;for(var a=1;a<this.Ya;++a)this.Od[a]=0;this.ge=this.ec=0;this.reset()}ka(Ja,Ia);Ja.prototype.reset=function(){this.P[0]=1732584193;this.P[1]=4023233417;this.P[2]=2562383102;this.P[3]=271733878;this.P[4]=3285377520;this.ge=this.ec=0};
function Ka(a,b,c){c||(c=0);var d=a.eg;if(q(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.P[0];c=a.P[1];for(var g=a.P[2],k=a.P[3],m=a.P[4],l,e=0;80>e;e++)40>e?20>e?(f=k^c&(g^k),l=1518500249):(f=c^g^k,l=1859775393):60>e?(f=c&g|k&(c|g),l=2400959708):(f=c^g^k,l=3395469782),f=(b<<
5|b>>>27)+f+m+l+d[e]&4294967295,m=k,k=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.P[0]=a.P[0]+b&4294967295;a.P[1]=a.P[1]+c&4294967295;a.P[2]=a.P[2]+g&4294967295;a.P[3]=a.P[3]+k&4294967295;a.P[4]=a.P[4]+m&4294967295}
Ja.prototype.update=function(a,b){if(null!=a){p(b)||(b=a.length);for(var c=b-this.Ya,d=0,e=this.pe,f=this.ec;d<b;){if(0==f)for(;d<=c;)Ka(this,a,d),d+=this.Ya;if(q(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Ya){Ka(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Ya){Ka(this,e);f=0;break}}this.ec=f;this.ge+=b}};var x=Array.prototype,La=x.indexOf?function(a,b,c){return x.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ma=x.forEach?function(a,b,c){x.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Na=x.filter?function(a,b,c){return x.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=q(a)?
a.split(""):a,k=0;k<d;k++)if(k in g){var m=g[k];b.call(c,m,k,a)&&(e[f++]=m)}return e},Oa=x.map?function(a,b,c){return x.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Pa=x.reduce?function(a,b,c,d){for(var e=[],f=1,g=arguments.length;f<g;f++)e.push(arguments[f]);d&&(e[0]=u(b,d));return x.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Ma(a,function(c,g){e=b.call(d,e,c,g,a)});return e},Qa=x.every?function(a,b,
c){return x.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Ra(a,b){var c=Sa(a,b,void 0);return 0>c?null:q(a)?a.charAt(c):a[c]}function Sa(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Ta(a,b){var c=La(a,b);0<=c&&x.splice.call(a,c,1)}function Ua(a,b,c){return 2>=arguments.length?x.slice.call(a,b):x.slice.call(a,b,c)}
function Va(a,b){a.sort(b||Wa)}function Wa(a,b){return a>b?1:a<b?-1:0};function Xa(a){n.setTimeout(function(){throw a;},0)}var Ya;
function Za(){var a=n.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==w.indexOf("Presto")&&(a=function(){var a=document.createElement("iframe");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=u(function(a){if(("*"==d||a.origin==
d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==w.indexOf("Trident")&&-1==w.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.hb;c.hb=null;a()}};return function(a){d.next={hb:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?function(a){var b=
document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){n.setTimeout(a,0)}};function $a(a,b){ab||bb();cb||(ab(),cb=!0);db.push(new eb(a,b))}var ab;function bb(){if(n.Promise&&n.Promise.resolve){var a=n.Promise.resolve();ab=function(){a.then(fb)}}else ab=function(){var a=fb;!r(n.setImmediate)||n.Window&&n.Window.prototype&&n.Window.prototype.setImmediate==n.setImmediate?(Ya||(Ya=Za()),Ya(a)):n.setImmediate(a)}}var cb=!1,db=[];[].push(function(){cb=!1;db=[]});
function fb(){for(;db.length;){var a=db;db=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.yg.call(c.scope)}catch(d){Xa(d)}}}cb=!1}function eb(a,b){this.yg=a;this.scope=b};var gb=-1!=w.indexOf("Opera")||-1!=w.indexOf("OPR"),hb=-1!=w.indexOf("Trident")||-1!=w.indexOf("MSIE"),ib=-1!=w.indexOf("Gecko")&&-1==w.toLowerCase().indexOf("webkit")&&!(-1!=w.indexOf("Trident")||-1!=w.indexOf("MSIE")),jb=-1!=w.toLowerCase().indexOf("webkit");
(function(){var a="",b;if(gb&&n.opera)return a=n.opera.version,r(a)?a():a;ib?b=/rv\:([^\);]+)(\)|;)/:hb?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:jb&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(w))?a[1]:"");return hb&&(b=(b=n.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var kb=null,lb=null,mb=null;function nb(a,b){if(!ea(a))throw Error("encodeByteArray takes an array as a parameter");ob();for(var c=b?lb:kb,d=[],e=0;e<a.length;e+=3){var f=a[e],g=e+1<a.length,k=g?a[e+1]:0,m=e+2<a.length,l=m?a[e+2]:0,t=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|l>>6,l=l&63;m||(l=64,g||(k=64));d.push(c[t],c[f],c[k],c[l])}return d.join("")}
function ob(){if(!kb){kb={};lb={};mb={};for(var a=0;65>a;a++)kb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),lb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),mb[lb[a]]=a,62<=a&&(mb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function pb(a,b){this.N=qb;this.Rf=void 0;this.Ba=this.Ha=null;this.yd=this.ye=!1;if(a==rb)sb(this,tb,b);else try{var c=this;a.call(b,function(a){sb(c,tb,a)},function(a){if(!(a instanceof ub))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}sb(c,vb,a)})}catch(d){sb(this,vb,d)}}var qb=0,tb=2,vb=3;function rb(){}pb.prototype.then=function(a,b,c){return wb(this,r(a)?a:null,r(b)?b:null,c)};pb.prototype.then=pb.prototype.then;pb.prototype.$goog_Thenable=!0;h=pb.prototype;
h.fh=function(a,b){return wb(this,null,a,b)};h.cancel=function(a){this.N==qb&&$a(function(){var b=new ub(a);xb(this,b)},this)};function xb(a,b){if(a.N==qb)if(a.Ha){var c=a.Ha;if(c.Ba){for(var d=0,e=-1,f=0,g;g=c.Ba[f];f++)if(g=g.o)if(d++,g==a&&(e=f),0<=e&&1<d)break;0<=e&&(c.N==qb&&1==d?xb(c,b):(d=c.Ba.splice(e,1)[0],yb(c,d,vb,b)))}a.Ha=null}else sb(a,vb,b)}function zb(a,b){a.Ba&&a.Ba.length||a.N!=tb&&a.N!=vb||Ab(a);a.Ba||(a.Ba=[]);a.Ba.push(b)}
function wb(a,b,c,d){var e={o:null,Hf:null,Jf:null};e.o=new pb(function(a,g){e.Hf=b?function(c){try{var e=b.call(d,c);a(e)}catch(l){g(l)}}:a;e.Jf=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof ub?g(b):a(e)}catch(l){g(l)}}:g});e.o.Ha=a;zb(a,e);return e.o}h.Yf=function(a){this.N=qb;sb(this,tb,a)};h.Zf=function(a){this.N=qb;sb(this,vb,a)};
function sb(a,b,c){if(a.N==qb){if(a==c)b=vb,c=new TypeError("Promise cannot resolve to itself");else{var d;if(c)try{d=!!c.$goog_Thenable}catch(e){d=!1}else d=!1;if(d){a.N=1;c.then(a.Yf,a.Zf,a);return}if(ga(c))try{var f=c.then;if(r(f)){Bb(a,c,f);return}}catch(g){b=vb,c=g}}a.Rf=c;a.N=b;a.Ha=null;Ab(a);b!=vb||c instanceof ub||Cb(a,c)}}function Bb(a,b,c){function d(b){f||(f=!0,a.Zf(b))}function e(b){f||(f=!0,a.Yf(b))}a.N=1;var f=!1;try{c.call(b,e,d)}catch(g){d(g)}}
function Ab(a){a.ye||(a.ye=!0,$a(a.wg,a))}h.wg=function(){for(;this.Ba&&this.Ba.length;){var a=this.Ba;this.Ba=null;for(var b=0;b<a.length;b++)yb(this,a[b],this.N,this.Rf)}this.ye=!1};function yb(a,b,c,d){if(c==tb)b.Hf(d);else{if(b.o)for(;a&&a.yd;a=a.Ha)a.yd=!1;b.Jf(d)}}function Cb(a,b){a.yd=!0;$a(function(){a.yd&&Db.call(null,b)})}var Db=Xa;function ub(a){la.call(this,a)}ka(ub,la);ub.prototype.name="cancel";var Eb=Eb||"2.4.1";function y(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function z(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function Fb(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])}function Gb(a){var b={};Fb(a,function(a,d){b[a]=d});return b}function Hb(a){return"object"===typeof a&&null!==a};function Ib(a){var b=[];Fb(a,function(a,d){da(d)?Ma(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""}function Jb(a){var b={};a=a.replace(/^\?/,"").split("&");Ma(a,function(a){a&&(a=a.split("="),b[a[0]]=a[1])});return b};function Kb(a,b){if(!a)throw Lb(b);}function Lb(a){return Error("Firebase ("+Eb+") INTERNAL ASSERT FAILED: "+a)};var Mb=n.Promise||pb;pb.prototype["catch"]=pb.prototype.fh;function B(){var a=this;this.reject=this.resolve=null;this.D=new Mb(function(b,c){a.resolve=b;a.reject=c})}function C(a,b){return function(c,d){c?a.reject(c):a.resolve(d);r(b)&&(Nb(a.D),1===b.length?b(c):b(c,d))}}function Nb(a){a.then(void 0,aa)};function Ob(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,Kb(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function Pb(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function D(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function E(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
function F(a,b,c,d){if((!d||p(c))&&!r(c))throw Error(E(a,b,d)+"must be a valid function.");}function Qb(a,b,c){if(p(c)&&(!ga(c)||null===c))throw Error(E(a,b,!0)+"must be a valid context object.");};function Rb(a){return"undefined"!==typeof JSON&&p(JSON.parse)?JSON.parse(a):za(a)}function G(a){if("undefined"!==typeof JSON&&p(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ba(new Aa,a,b);a=b.join("")}return a};function Sb(){this.Zd=H}Sb.prototype.j=function(a){return this.Zd.S(a)};Sb.prototype.toString=function(){return this.Zd.toString()};function Tb(){}Tb.prototype.uf=function(){return null};Tb.prototype.Ce=function(){return null};var Ub=new Tb;function Vb(a,b,c){this.bg=a;this.Oa=b;this.Nd=c}Vb.prototype.uf=function(a){var b=this.Oa.Q;if(Wb(b,a))return b.j().T(a);b=null!=this.Nd?new Xb(this.Nd,!0,!1):this.Oa.w();return this.bg.Bc(a,b)};Vb.prototype.Ce=function(a,b,c){var d=null!=this.Nd?this.Nd:Yb(this.Oa);a=this.bg.qe(d,b,1,c,a);return 0===a.length?null:a[0]};function Zb(){this.xb=[]}function $b(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.cc();null===c||f.ea(c.cc())||(a.xb.push(c),c=null);null===c&&(c=new ac(f));c.add(e)}c&&a.xb.push(c)}function bc(a,b,c){$b(a,c);cc(a,function(a){return a.ea(b)})}function dc(a,b,c){$b(a,c);cc(a,function(a){return a.contains(b)||b.contains(a)})}
function cc(a,b){for(var c=!0,d=0;d<a.xb.length;d++){var e=a.xb[d];if(e)if(e=e.cc(),b(e)){for(var e=a.xb[d],f=0;f<e.xd.length;f++){var g=e.xd[f];if(null!==g){e.xd[f]=null;var k=g.Zb();ec&&fc("event: "+g.toString());gc(k)}}a.xb[d]=null}else c=!1}c&&(a.xb=[])}function ac(a){this.ta=a;this.xd=[]}ac.prototype.add=function(a){this.xd.push(a)};ac.prototype.cc=function(){return this.ta};function J(a,b,c,d){this.type=a;this.Na=b;this.Za=c;this.Oe=d;this.Td=void 0}function hc(a){return new J(ic,a)}var ic="value";function jc(a,b,c,d){this.xe=b;this.be=c;this.Td=d;this.wd=a}jc.prototype.cc=function(){var a=this.be.Mb();return"value"===this.wd?a.path:a.parent().path};jc.prototype.De=function(){return this.wd};jc.prototype.Zb=function(){return this.xe.Zb(this)};jc.prototype.toString=function(){return this.cc().toString()+":"+this.wd+":"+G(this.be.qf())};function kc(a,b,c){this.xe=a;this.error=b;this.path=c}kc.prototype.cc=function(){return this.path};kc.prototype.De=function(){return"cancel"};
kc.prototype.Zb=function(){return this.xe.Zb(this)};kc.prototype.toString=function(){return this.path.toString()+":cancel"};function Xb(a,b,c){this.A=a;this.ga=b;this.Yb=c}function lc(a){return a.ga}function mc(a){return a.Yb}function nc(a,b){return b.e()?a.ga&&!a.Yb:Wb(a,K(b))}function Wb(a,b){return a.ga&&!a.Yb||a.A.Fa(b)}Xb.prototype.j=function(){return this.A};function oc(a){this.pg=a;this.Gd=null}oc.prototype.get=function(){var a=this.pg.get(),b=wa(a);if(this.Gd)for(var c in this.Gd)b[c]-=this.Gd[c];this.Gd=a;return b};function pc(a,b){this.Vf={};this.hd=new oc(a);this.da=b;var c=1E4+2E4*Math.random();setTimeout(u(this.Of,this),Math.floor(c))}pc.prototype.Of=function(){var a=this.hd.get(),b={},c=!1,d;for(d in a)0<a[d]&&y(this.Vf,d)&&(b[d]=a[d],c=!0);c&&this.da.Ye(b);setTimeout(u(this.Of,this),Math.floor(6E5*Math.random()))};function qc(){this.Hc={}}function rc(a,b,c){p(c)||(c=1);y(a.Hc,b)||(a.Hc[b]=0);a.Hc[b]+=c}qc.prototype.get=function(){return wa(this.Hc)};var sc={},tc={};function uc(a){a=a.toString();sc[a]||(sc[a]=new qc);return sc[a]}function vc(a,b){var c=a.toString();tc[c]||(tc[c]=b());return tc[c]};function L(a,b){this.name=a;this.U=b}function wc(a,b){return new L(a,b)};function xc(a,b){return yc(a.name,b.name)}function zc(a,b){return yc(a,b)};function Ac(a,b,c){this.type=Bc;this.source=a;this.path=b;this.Ja=c}Ac.prototype.$c=function(a){return this.path.e()?new Ac(this.source,M,this.Ja.T(a)):new Ac(this.source,N(this.path),this.Ja)};Ac.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ja.toString()+")"};function Cc(a,b){this.type=Dc;this.source=a;this.path=b}Cc.prototype.$c=function(){return this.path.e()?new Cc(this.source,M):new Cc(this.source,N(this.path))};Cc.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function Ec(a,b){this.Pa=a;this.xa=b?b:Fc}h=Ec.prototype;h.Sa=function(a,b){return new Ec(this.Pa,this.xa.Sa(a,b,this.Pa).$(null,null,!1,null,null))};h.remove=function(a){return new Ec(this.Pa,this.xa.remove(a,this.Pa).$(null,null,!1,null,null))};h.get=function(a){for(var b,c=this.xa;!c.e();){b=this.Pa(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
function Gc(a,b){for(var c,d=a.xa,e=null;!d.e();){c=a.Pa(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}h.e=function(){return this.xa.e()};h.count=function(){return this.xa.count()};h.Vc=function(){return this.xa.Vc()};h.jc=function(){return this.xa.jc()};h.ka=function(a){return this.xa.ka(a)};
h.ac=function(a){return new Hc(this.xa,null,this.Pa,!1,a)};h.bc=function(a,b){return new Hc(this.xa,a,this.Pa,!1,b)};h.dc=function(a,b){return new Hc(this.xa,a,this.Pa,!0,b)};h.xf=function(a){return new Hc(this.xa,null,this.Pa,!0,a)};function Hc(a,b,c,d,e){this.Xd=e||null;this.Je=d;this.Ta=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.Je?a.left:a.right;else if(0===e){this.Ta.push(a);break}else this.Ta.push(a),a=this.Je?a.right:a.left}
function Ic(a){if(0===a.Ta.length)return null;var b=a.Ta.pop(),c;c=a.Xd?a.Xd(b.key,b.value):{key:b.key,value:b.value};if(a.Je)for(b=b.left;!b.e();)a.Ta.push(b),b=b.right;else for(b=b.right;!b.e();)a.Ta.push(b),b=b.left;return c}function Jc(a){if(0===a.Ta.length)return null;var b;b=a.Ta;b=b[b.length-1];return a.Xd?a.Xd(b.key,b.value):{key:b.key,value:b.value}}function Kc(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:Fc;this.right=null!=e?e:Fc}h=Kc.prototype;
h.$=function(a,b,c,d,e){return new Kc(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};h.count=function(){return this.left.count()+1+this.right.count()};h.e=function(){return!1};h.ka=function(a){return this.left.ka(a)||a(this.key,this.value)||this.right.ka(a)};function Lc(a){return a.left.e()?a:Lc(a.left)}h.Vc=function(){return Lc(this).key};h.jc=function(){return this.right.e()?this.key:this.right.jc()};
h.Sa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.$(null,null,null,e.left.Sa(a,b,c),null):0===d?e.$(null,b,null,null,null):e.$(null,null,null,null,e.right.Sa(a,b,c));return Mc(e)};function Nc(a){if(a.left.e())return Fc;a.left.ha()||a.left.left.ha()||(a=Oc(a));a=a.$(null,null,null,Nc(a.left),null);return Mc(a)}
h.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.ha()||c.left.left.ha()||(c=Oc(c)),c=c.$(null,null,null,c.left.remove(a,b),null);else{c.left.ha()&&(c=Pc(c));c.right.e()||c.right.ha()||c.right.left.ha()||(c=Qc(c),c.left.left.ha()&&(c=Pc(c),c=Qc(c)));if(0===b(a,c.key)){if(c.right.e())return Fc;d=Lc(c.right);c=c.$(d.key,d.value,null,null,Nc(c.right))}c=c.$(null,null,null,null,c.right.remove(a,b))}return Mc(c)};h.ha=function(){return this.color};
function Mc(a){a.right.ha()&&!a.left.ha()&&(a=Rc(a));a.left.ha()&&a.left.left.ha()&&(a=Pc(a));a.left.ha()&&a.right.ha()&&(a=Qc(a));return a}function Oc(a){a=Qc(a);a.right.left.ha()&&(a=a.$(null,null,null,null,Pc(a.right)),a=Rc(a),a=Qc(a));return a}function Rc(a){return a.right.$(null,null,a.color,a.$(null,null,!0,null,a.right.left),null)}function Pc(a){return a.left.$(null,null,a.color,null,a.$(null,null,!0,a.left.right,null))}
function Qc(a){return a.$(null,null,!a.color,a.left.$(null,null,!a.left.color,null,null),a.right.$(null,null,!a.right.color,null,null))}function Sc(){}h=Sc.prototype;h.$=function(){return this};h.Sa=function(a,b){return new Kc(a,b,null)};h.remove=function(){return this};h.count=function(){return 0};h.e=function(){return!0};h.ka=function(){return!1};h.Vc=function(){return null};h.jc=function(){return null};h.ha=function(){return!1};var Fc=new Sc;function Tc(a,b){return a&&"object"===typeof a?(O(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function Uc(a,b){var c=new Vc;Wc(a,new P(""),function(a,e){c.rc(a,Xc(e,b))});return c}function Xc(a,b){var c=a.C().J(),c=Tc(c,b),d;if(a.L()){var e=Tc(a.Ea(),b);return e!==a.Ea()||c!==a.C().J()?new Yc(e,Q(c)):a}d=a;c!==a.C().J()&&(d=d.ia(new Yc(c)));a.R(R,function(a,c){var e=Xc(c,b);e!==c&&(d=d.W(a,e))});return d};function Zc(){this.Ac={}}Zc.prototype.set=function(a,b){null==b?delete this.Ac[a]:this.Ac[a]=b};Zc.prototype.get=function(a){return y(this.Ac,a)?this.Ac[a]:null};Zc.prototype.remove=function(a){delete this.Ac[a]};Zc.prototype.Af=!0;function $c(a){this.Ic=a;this.Sd="firebase:"}h=$c.prototype;h.set=function(a,b){null==b?this.Ic.removeItem(this.Sd+a):this.Ic.setItem(this.Sd+a,G(b))};h.get=function(a){a=this.Ic.getItem(this.Sd+a);return null==a?null:Rb(a)};h.remove=function(a){this.Ic.removeItem(this.Sd+a)};h.Af=!1;h.toString=function(){return this.Ic.toString()};function ad(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new $c(b)}}catch(c){}return new Zc}var bd=ad("localStorage"),cd=ad("sessionStorage");function dd(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.ob=b;this.lc=c;this.ih=d;this.Rd=e||"";this.ab=bd.get("host:"+a)||this.host}function ed(a,b){b!==a.ab&&(a.ab=b,"s-"===a.ab.substr(0,2)&&bd.set("host:"+a.host,a.ab))}
function fd(a,b,c){O("string"===typeof b,"typeof type must == string");O("object"===typeof c,"typeof params must == object");if(b===gd)b=(a.ob?"wss://":"ws://")+a.ab+"/.ws?";else if(b===hd)b=(a.ob?"https://":"http://")+a.ab+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.ab&&(c.ns=a.lc);var d=[];v(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}dd.prototype.toString=function(){var a=(this.ob?"https://":"http://")+this.host;this.Rd&&(a+="<"+this.Rd+">");return a};var id=function(){var a=1;return function(){return a++}}(),O=Kb,jd=Lb;
function kd(a){try{var b;if("undefined"!==typeof atob)b=atob(a);else{ob();for(var c=mb,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],g=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var m=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==g||null==k||null==m)throw Error();d.push(f<<2|g>>4);64!=k&&(d.push(g<<4&240|k>>2),64!=m&&d.push(k<<6&192|m))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Ua(d,c,
c+8192));b=a}}return b}catch(l){fc("base64Decode failed: ",l)}return null}function ld(a){var b=Ob(a);a=new Ja;a.update(b);var b=[],c=8*a.ge;56>a.ec?a.update(a.Od,56-a.ec):a.update(a.Od,a.Ya-(a.ec-56));for(var d=a.Ya-1;56<=d;d--)a.pe[d]=c&255,c/=256;Ka(a,a.pe);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.P[d]>>e&255,++c;return nb(b)}
function md(a){for(var b="",c=0;c<arguments.length;c++)b=ea(arguments[c])?b+md.apply(null,arguments[c]):"object"===typeof arguments[c]?b+G(arguments[c]):b+arguments[c],b+=" ";return b}var ec=null,nd=!0;
function od(a,b){Kb(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?ec=u(console.log,console):"object"===typeof console.log&&(ec=function(a){console.log(a)})),b&&cd.set("logging_enabled",!0)):r(a)?ec=a:(ec=null,cd.remove("logging_enabled"))}function fc(a){!0===nd&&(nd=!1,null===ec&&!0===cd.get("logging_enabled")&&od(!0));if(ec){var b=md.apply(null,arguments);ec(b)}}
function pd(a){return function(){fc(a,arguments)}}function qd(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+md.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function rd(a){var b=md.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function S(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+md.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
function sd(a){var b="",c="",d="",e="",f=!0,g="https",k=443;if(q(a)){var m=a.indexOf("//");0<=m&&(g=a.substring(0,m-1),a=a.substring(m+2));m=a.indexOf("/");-1===m&&(m=a.length);b=a.substring(0,m);e="";a=a.substring(m).split("/");for(m=0;m<a.length;m++)if(0<a[m].length){var l=a[m];try{l=decodeURIComponent(l.replace(/\+/g," "))}catch(t){}e+="/"+l}a=b.split(".");3===a.length?(c=a[1],d=a[0].toLowerCase()):2===a.length&&(c=a[0]);m=b.indexOf(":");0<=m&&(f="https"===g||"wss"===g,k=b.substring(m+1),isFinite(k)&&
(k=String(k)),k=q(k)?/^\s*-?0x/i.test(k)?parseInt(k,16):parseInt(k,10):NaN)}return{host:b,port:k,domain:c,eh:d,ob:f,scheme:g,bd:e}}function td(a){return fa(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
function ud(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
function yc(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=vd(a),d=vd(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function wd(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+G(b));}
function xd(a){if("object"!==typeof a||null===a)return G(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=G(b[d]),c+=":",c+=xd(a[b[d]]);return c+"}"}function yd(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function zd(a,b){if(da(a))for(var c=0;c<a.length;++c)b(c,a[c]);else v(a,b)}
function Ad(a){O(!td(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
(d="0"+d),c+=d;return c.toLowerCase()}var Bd=/^-?\d{1,10}$/;function vd(a){return Bd.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function gc(a){try{a()}catch(b){setTimeout(function(){S("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function T(a,b){if(r(a)){var c=Array.prototype.slice.call(arguments,1).slice();gc(function(){a.apply(null,c)})}};function Cd(a){var b={},c={},d={},e="";try{var f=a.split("."),b=Rb(kd(f[0])||""),c=Rb(kd(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(g){}return{lh:b,Ec:c,data:d,ah:e}}function Dd(a){a=Cd(a).Ec;return"object"===typeof a&&a.hasOwnProperty("iat")?z(a,"iat"):null}function Ed(a){a=Cd(a);var b=a.Ec;return!!a.ah&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")};function Fd(a){this.Y=a;this.g=a.n.g}function Gd(a,b,c,d){var e=[],f=[];Ma(b,function(b){"child_changed"===b.type&&a.g.Dd(b.Oe,b.Na)&&f.push(new J("child_moved",b.Na,b.Za))});Hd(a,e,"child_removed",b,d,c);Hd(a,e,"child_added",b,d,c);Hd(a,e,"child_moved",f,d,c);Hd(a,e,"child_changed",b,d,c);Hd(a,e,ic,b,d,c);return e}function Hd(a,b,c,d,e,f){d=Na(d,function(a){return a.type===c});Va(d,u(a.qg,a));Ma(d,function(c){var d=Id(a,c,f);Ma(e,function(e){e.Qf(c.type)&&b.push(e.createEvent(d,a.Y))})})}
function Id(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Td=c.wf(b.Za,b.Na,a.g));return b}Fd.prototype.qg=function(a,b){if(null==a.Za||null==b.Za)throw jd("Should only compare child_ events.");return this.g.compare(new L(a.Za,a.Na),new L(b.Za,b.Na))};function Jd(){this.ib={}}
function Kd(a,b){var c=b.type,d=b.Za;O("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");O(".priority"!==d,"Only non-priority child changes can be tracked.");var e=z(a.ib,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.ib[d]=new J("child_changed",b.Na,d,e.Na);else if("child_removed"==c&&"child_added"==f)delete a.ib[d];else if("child_removed"==c&&"child_changed"==f)a.ib[d]=new J("child_removed",e.Oe,d);else if("child_changed"==c&&
"child_added"==f)a.ib[d]=new J("child_added",b.Na,d);else if("child_changed"==c&&"child_changed"==f)a.ib[d]=new J("child_changed",b.Na,d,e.Oe);else throw jd("Illegal combination of changes: "+b+" occurred after "+e);}else a.ib[d]=b};function Ld(a){this.g=a}h=Ld.prototype;h.H=function(a,b,c,d,e,f){O(a.Mc(this.g),"A node must be indexed if only a child is updated");e=a.T(b);if(e.S(d).ea(c.S(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Fa(b)?Kd(f,new J("child_removed",e,b)):O(a.L(),"A child remove without an old child only makes sense on a leaf node"):e.e()?Kd(f,new J("child_added",c,b)):Kd(f,new J("child_changed",c,b,e)));return a.L()&&c.e()?a:a.W(b,c).pb(this.g)};
h.ya=function(a,b,c){null!=c&&(a.L()||a.R(R,function(a,e){b.Fa(a)||Kd(c,new J("child_removed",e,a))}),b.L()||b.R(R,function(b,e){if(a.Fa(b)){var f=a.T(b);f.ea(e)||Kd(c,new J("child_changed",e,b,f))}else Kd(c,new J("child_added",e,b))}));return b.pb(this.g)};h.ia=function(a,b){return a.e()?H:a.ia(b)};h.Ra=function(){return!1};h.$b=function(){return this};function Md(a){this.Fe=new Ld(a.g);this.g=a.g;var b;a.oa?(b=Nd(a),b=a.g.Sc(Od(a),b)):b=a.g.Wc();this.gd=b;a.ra?(b=Pd(a),a=a.g.Sc(Rd(a),b)):a=a.g.Tc();this.Jc=a}h=Md.prototype;h.matches=function(a){return 0>=this.g.compare(this.gd,a)&&0>=this.g.compare(a,this.Jc)};h.H=function(a,b,c,d,e,f){this.matches(new L(b,c))||(c=H);return this.Fe.H(a,b,c,d,e,f)};
h.ya=function(a,b,c){b.L()&&(b=H);var d=b.pb(this.g),d=d.ia(H),e=this;b.R(R,function(a,b){e.matches(new L(a,b))||(d=d.W(a,H))});return this.Fe.ya(a,d,c)};h.ia=function(a){return a};h.Ra=function(){return!0};h.$b=function(){return this.Fe};function Sd(a){this.ua=new Md(a);this.g=a.g;O(a.la,"Only valid if limit has been set");this.ma=a.ma;this.Nb=!Td(a)}h=Sd.prototype;h.H=function(a,b,c,d,e,f){this.ua.matches(new L(b,c))||(c=H);return a.T(b).ea(c)?a:a.Hb()<this.ma?this.ua.$b().H(a,b,c,d,e,f):Ud(this,a,b,c,e,f)};
h.ya=function(a,b,c){var d;if(b.L()||b.e())d=H.pb(this.g);else if(2*this.ma<b.Hb()&&b.Mc(this.g)){d=H.pb(this.g);b=this.Nb?b.dc(this.ua.Jc,this.g):b.bc(this.ua.gd,this.g);for(var e=0;0<b.Ta.length&&e<this.ma;){var f=Ic(b),g;if(g=this.Nb?0>=this.g.compare(this.ua.gd,f):0>=this.g.compare(f,this.ua.Jc))d=d.W(f.name,f.U),e++;else break}}else{d=b.pb(this.g);d=d.ia(H);var k,m,l;if(this.Nb){b=d.xf(this.g);k=this.ua.Jc;m=this.ua.gd;var t=Vd(this.g);l=function(a,b){return t(b,a)}}else b=d.ac(this.g),k=this.ua.gd,
m=this.ua.Jc,l=Vd(this.g);for(var e=0,A=!1;0<b.Ta.length;)f=Ic(b),!A&&0>=l(k,f)&&(A=!0),(g=A&&e<this.ma&&0>=l(f,m))?e++:d=d.W(f.name,H)}return this.ua.$b().ya(a,d,c)};h.ia=function(a){return a};h.Ra=function(){return!0};h.$b=function(){return this.ua.$b()};
function Ud(a,b,c,d,e,f){var g;if(a.Nb){var k=Vd(a.g);g=function(a,b){return k(b,a)}}else g=Vd(a.g);O(b.Hb()==a.ma,"");var m=new L(c,d),l=a.Nb?Wd(b,a.g):Xd(b,a.g),t=a.ua.matches(m);if(b.Fa(c)){for(var A=b.T(c),l=e.Ce(a.g,l,a.Nb);null!=l&&(l.name==c||b.Fa(l.name));)l=e.Ce(a.g,l,a.Nb);e=null==l?1:g(l,m);if(t&&!d.e()&&0<=e)return null!=f&&Kd(f,new J("child_changed",d,c,A)),b.W(c,d);null!=f&&Kd(f,new J("child_removed",A,c));b=b.W(c,H);return null!=l&&a.ua.matches(l)?(null!=f&&Kd(f,new J("child_added",
l.U,l.name)),b.W(l.name,l.U)):b}return d.e()?b:t&&0<=g(l,m)?(null!=f&&(Kd(f,new J("child_removed",l.U,l.name)),Kd(f,new J("child_added",d,c))),b.W(c,d).W(l.name,H)):b};function Yd(a,b){this.me=a;this.og=b}function Zd(a){this.X=a}
Zd.prototype.gb=function(a,b,c,d){var e=new Jd,f;if(b.type===Bc)b.source.Ae?c=$d(this,a,b.path,b.Ja,c,d,e):(O(b.source.tf,"Unknown source."),f=b.source.ef||mc(a.w())&&!b.path.e(),c=ae(this,a,b.path,b.Ja,c,d,f,e));else if(b.type===be)b.source.Ae?c=ce(this,a,b.path,b.children,c,d,e):(O(b.source.tf,"Unknown source."),f=b.source.ef||mc(a.w()),c=de(this,a,b.path,b.children,c,d,f,e));else if(b.type===ee)if(b.Yd)if(b=b.path,null!=c.xc(b))c=a;else{f=new Vb(c,a,d);d=a.Q.j();if(b.e()||".priority"===K(b))lc(a.w())?
b=c.Aa(Yb(a)):(b=a.w().j(),O(b instanceof fe,"serverChildren would be complete if leaf node"),b=c.Cc(b)),b=this.X.ya(d,b,e);else{var g=K(b),k=c.Bc(g,a.w());null==k&&Wb(a.w(),g)&&(k=d.T(g));b=null!=k?this.X.H(d,g,k,N(b),f,e):a.Q.j().Fa(g)?this.X.H(d,g,H,N(b),f,e):d;b.e()&&lc(a.w())&&(d=c.Aa(Yb(a)),d.L()&&(b=this.X.ya(b,d,e)))}d=lc(a.w())||null!=c.xc(M);c=ge(a,b,d,this.X.Ra())}else c=he(this,a,b.path,b.Ub,c,d,e);else if(b.type===Dc)d=b.path,b=a.w(),f=b.j(),g=b.ga||d.e(),c=ie(this,new je(a.Q,new Xb(f,
g,b.Yb)),d,c,Ub,e);else throw jd("Unknown operation type: "+b.type);e=qa(e.ib);d=c;b=d.Q;b.ga&&(f=b.j().L()||b.j().e(),g=ke(a),(0<e.length||!a.Q.ga||f&&!b.j().ea(g)||!b.j().C().ea(g.C()))&&e.push(hc(ke(d))));return new Yd(c,e)};
function ie(a,b,c,d,e,f){var g=b.Q;if(null!=d.xc(c))return b;var k;if(c.e())O(lc(b.w()),"If change path is empty, we must have complete server data"),mc(b.w())?(e=Yb(b),d=d.Cc(e instanceof fe?e:H)):d=d.Aa(Yb(b)),f=a.X.ya(b.Q.j(),d,f);else{var m=K(c);if(".priority"==m)O(1==le(c),"Can't have a priority with additional path components"),f=g.j(),k=b.w().j(),d=d.nd(c,f,k),f=null!=d?a.X.ia(f,d):g.j();else{var l=N(c);Wb(g,m)?(k=b.w().j(),d=d.nd(c,g.j(),k),d=null!=d?g.j().T(m).H(l,d):g.j().T(m)):d=d.Bc(m,
b.w());f=null!=d?a.X.H(g.j(),m,d,l,e,f):g.j()}}return ge(b,f,g.ga||c.e(),a.X.Ra())}function ae(a,b,c,d,e,f,g,k){var m=b.w();g=g?a.X:a.X.$b();if(c.e())d=g.ya(m.j(),d,null);else if(g.Ra()&&!m.Yb)d=m.j().H(c,d),d=g.ya(m.j(),d,null);else{var l=K(c);if(!nc(m,c)&&1<le(c))return b;var t=N(c);d=m.j().T(l).H(t,d);d=".priority"==l?g.ia(m.j(),d):g.H(m.j(),l,d,t,Ub,null)}m=m.ga||c.e();b=new je(b.Q,new Xb(d,m,g.Ra()));return ie(a,b,c,e,new Vb(e,b,f),k)}
function $d(a,b,c,d,e,f,g){var k=b.Q;e=new Vb(e,b,f);if(c.e())g=a.X.ya(b.Q.j(),d,g),a=ge(b,g,!0,a.X.Ra());else if(f=K(c),".priority"===f)g=a.X.ia(b.Q.j(),d),a=ge(b,g,k.ga,k.Yb);else{c=N(c);var m=k.j().T(f);if(!c.e()){var l=e.uf(f);d=null!=l?".priority"===me(c)&&l.S(c.parent()).e()?l:l.H(c,d):H}m.ea(d)?a=b:(g=a.X.H(k.j(),f,d,c,e,g),a=ge(b,g,k.ga,a.X.Ra()))}return a}
function ce(a,b,c,d,e,f,g){var k=b;ne(d,function(d,l){var t=c.o(d);Wb(b.Q,K(t))&&(k=$d(a,k,t,l,e,f,g))});ne(d,function(d,l){var t=c.o(d);Wb(b.Q,K(t))||(k=$d(a,k,t,l,e,f,g))});return k}function oe(a,b){ne(b,function(b,d){a=a.H(b,d)});return a}
function de(a,b,c,d,e,f,g,k){if(b.w().j().e()&&!lc(b.w()))return b;var m=b;c=c.e()?d:pe(qe,c,d);var l=b.w().j();c.children.ka(function(c,d){if(l.Fa(c)){var I=b.w().j().T(c),I=oe(I,d);m=ae(a,m,new P(c),I,e,f,g,k)}});c.children.ka(function(c,d){var I=!Wb(b.w(),c)&&null==d.value;l.Fa(c)||I||(I=b.w().j().T(c),I=oe(I,d),m=ae(a,m,new P(c),I,e,f,g,k))});return m}
function he(a,b,c,d,e,f,g){if(null!=e.xc(c))return b;var k=mc(b.w()),m=b.w();if(null!=d.value){if(c.e()&&m.ga||nc(m,c))return ae(a,b,c,m.j().S(c),e,f,k,g);if(c.e()){var l=qe;m.j().R(re,function(a,b){l=l.set(new P(a),b)});return de(a,b,c,l,e,f,k,g)}return b}l=qe;ne(d,function(a){var b=c.o(a);nc(m,b)&&(l=l.set(a,m.j().S(b)))});return de(a,b,c,l,e,f,k,g)};function se(){}var te={};function Vd(a){return u(a.compare,a)}se.prototype.Dd=function(a,b){return 0!==this.compare(new L("[MIN_NAME]",a),new L("[MIN_NAME]",b))};se.prototype.Wc=function(){return ue};function ve(a){O(!a.e()&&".priority"!==K(a),"Can't create PathIndex with empty path or .priority key");this.gc=a}ka(ve,se);h=ve.prototype;h.Lc=function(a){return!a.S(this.gc).e()};h.compare=function(a,b){var c=a.U.S(this.gc),d=b.U.S(this.gc),c=c.Gc(d);return 0===c?yc(a.name,b.name):c};
h.Sc=function(a,b){var c=Q(a),c=H.H(this.gc,c);return new L(b,c)};h.Tc=function(){var a=H.H(this.gc,we);return new L("[MAX_NAME]",a)};h.toString=function(){return this.gc.slice().join("/")};function xe(){}ka(xe,se);h=xe.prototype;h.compare=function(a,b){var c=a.U.C(),d=b.U.C(),c=c.Gc(d);return 0===c?yc(a.name,b.name):c};h.Lc=function(a){return!a.C().e()};h.Dd=function(a,b){return!a.C().ea(b.C())};h.Wc=function(){return ue};h.Tc=function(){return new L("[MAX_NAME]",new Yc("[PRIORITY-POST]",we))};
h.Sc=function(a,b){var c=Q(a);return new L(b,new Yc("[PRIORITY-POST]",c))};h.toString=function(){return".priority"};var R=new xe;function ye(){}ka(ye,se);h=ye.prototype;h.compare=function(a,b){return yc(a.name,b.name)};h.Lc=function(){throw jd("KeyIndex.isDefinedOn not expected to be called.");};h.Dd=function(){return!1};h.Wc=function(){return ue};h.Tc=function(){return new L("[MAX_NAME]",H)};h.Sc=function(a){O(q(a),"KeyIndex indexValue must always be a string.");return new L(a,H)};h.toString=function(){return".key"};
var re=new ye;function ze(){}ka(ze,se);h=ze.prototype;h.compare=function(a,b){var c=a.U.Gc(b.U);return 0===c?yc(a.name,b.name):c};h.Lc=function(){return!0};h.Dd=function(a,b){return!a.ea(b)};h.Wc=function(){return ue};h.Tc=function(){return Ae};h.Sc=function(a,b){var c=Q(a);return new L(b,c)};h.toString=function(){return".value"};var Be=new ze;function Ce(){this.Xb=this.ra=this.Pb=this.oa=this.la=!1;this.ma=0;this.Rb="";this.ic=null;this.Bb="";this.fc=null;this.zb="";this.g=R}var De=new Ce;function Td(a){return""===a.Rb?a.oa:"l"===a.Rb}function Od(a){O(a.oa,"Only valid if start has been set");return a.ic}function Nd(a){O(a.oa,"Only valid if start has been set");return a.Pb?a.Bb:"[MIN_NAME]"}function Rd(a){O(a.ra,"Only valid if end has been set");return a.fc}
function Pd(a){O(a.ra,"Only valid if end has been set");return a.Xb?a.zb:"[MAX_NAME]"}function Ee(a){var b=new Ce;b.la=a.la;b.ma=a.ma;b.oa=a.oa;b.ic=a.ic;b.Pb=a.Pb;b.Bb=a.Bb;b.ra=a.ra;b.fc=a.fc;b.Xb=a.Xb;b.zb=a.zb;b.g=a.g;return b}h=Ce.prototype;h.Le=function(a){var b=Ee(this);b.la=!0;b.ma=a;b.Rb="";return b};h.Me=function(a){var b=Ee(this);b.la=!0;b.ma=a;b.Rb="l";return b};h.Ne=function(a){var b=Ee(this);b.la=!0;b.ma=a;b.Rb="r";return b};
h.ce=function(a,b){var c=Ee(this);c.oa=!0;p(a)||(a=null);c.ic=a;null!=b?(c.Pb=!0,c.Bb=b):(c.Pb=!1,c.Bb="");return c};h.vd=function(a,b){var c=Ee(this);c.ra=!0;p(a)||(a=null);c.fc=a;p(b)?(c.Xb=!0,c.zb=b):(c.nh=!1,c.zb="");return c};function Fe(a,b){var c=Ee(a);c.g=b;return c}function Ge(a){var b={};a.oa&&(b.sp=a.ic,a.Pb&&(b.sn=a.Bb));a.ra&&(b.ep=a.fc,a.Xb&&(b.en=a.zb));if(a.la){b.l=a.ma;var c=a.Rb;""===c&&(c=Td(a)?"l":"r");b.vf=c}a.g!==R&&(b.i=a.g.toString());return b}
function He(a){return!(a.oa||a.ra||a.la)}function Ie(a){return He(a)&&a.g==R}function Je(a){var b={};if(Ie(a))return b;var c;a.g===R?c="$priority":a.g===Be?c="$value":a.g===re?c="$key":(O(a.g instanceof ve,"Unrecognized index type!"),c=a.g.toString());b.orderBy=G(c);a.oa&&(b.startAt=G(a.ic),a.Pb&&(b.startAt+=","+G(a.Bb)));a.ra&&(b.endAt=G(a.fc),a.Xb&&(b.endAt+=","+G(a.zb)));a.la&&(Td(a)?b.limitToFirst=a.ma:b.limitToLast=a.ma);return b}h.toString=function(){return G(Ge(this))};function Ke(a,b){this.Ed=a;this.hc=b}Ke.prototype.get=function(a){var b=z(this.Ed,a);if(!b)throw Error("No index defined for "+a);return b===te?null:b};function Le(a,b,c){var d=ma(a.Ed,function(d,f){var g=z(a.hc,f);O(g,"Missing index implementation for "+f);if(d===te){if(g.Lc(b.U)){for(var k=[],m=c.ac(wc),l=Ic(m);l;)l.name!=b.name&&k.push(l),l=Ic(m);k.push(b);return Me(k,Vd(g))}return te}g=c.get(b.name);k=d;g&&(k=k.remove(new L(b.name,g)));return k.Sa(b,b.U)});return new Ke(d,a.hc)}
function Ne(a,b,c){var d=ma(a.Ed,function(a){if(a===te)return a;var d=c.get(b.name);return d?a.remove(new L(b.name,d)):a});return new Ke(d,a.hc)}var Oe=new Ke({".priority":te},{".priority":R});function Yc(a,b){this.B=a;O(p(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.ca=b||H;Pe(this.ca);this.Gb=null}var Qe=["object","boolean","number","string"];h=Yc.prototype;h.L=function(){return!0};h.C=function(){return this.ca};h.ia=function(a){return new Yc(this.B,a)};h.T=function(a){return".priority"===a?this.ca:H};h.S=function(a){return a.e()?this:".priority"===K(a)?this.ca:H};h.Fa=function(){return!1};h.wf=function(){return null};
h.W=function(a,b){return".priority"===a?this.ia(b):b.e()&&".priority"!==a?this:H.W(a,b).ia(this.ca)};h.H=function(a,b){var c=K(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;O(".priority"!==c||1===le(a),".priority must be the last token in a path");return this.W(c,H.H(N(a),b))};h.e=function(){return!1};h.Hb=function(){return 0};h.R=function(){return!1};h.J=function(a){return a&&!this.C().e()?{".value":this.Ea(),".priority":this.C().J()}:this.Ea()};
h.hash=function(){if(null===this.Gb){var a="";this.ca.e()||(a+="priority:"+Re(this.ca.J())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+Ad(this.B):a+this.B;this.Gb=ld(a)}return this.Gb};h.Ea=function(){return this.B};h.Gc=function(a){if(a===H)return 1;if(a instanceof fe)return-1;O(a.L(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=La(Qe,b),e=La(Qe,c);O(0<=d,"Unknown leaf type: "+b);O(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
h.pb=function(){return this};h.Mc=function(){return!0};h.ea=function(a){return a===this?!0:a.L()?this.B===a.B&&this.ca.ea(a.ca):!1};h.toString=function(){return G(this.J(!0))};function fe(a,b,c){this.m=a;(this.ca=b)&&Pe(this.ca);a.e()&&O(!this.ca||this.ca.e(),"An empty node cannot have a priority");this.Ab=c;this.Gb=null}h=fe.prototype;h.L=function(){return!1};h.C=function(){return this.ca||H};h.ia=function(a){return this.m.e()?this:new fe(this.m,a,this.Ab)};h.T=function(a){if(".priority"===a)return this.C();a=this.m.get(a);return null===a?H:a};h.S=function(a){var b=K(a);return null===b?this:this.T(b).S(N(a))};h.Fa=function(a){return null!==this.m.get(a)};
h.W=function(a,b){O(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ia(b);var c=new L(a,b),d,e;b.e()?(d=this.m.remove(a),c=Ne(this.Ab,c,this.m)):(d=this.m.Sa(a,b),c=Le(this.Ab,c,this.m));e=d.e()?H:this.ca;return new fe(d,e,c)};h.H=function(a,b){var c=K(a);if(null===c)return b;O(".priority"!==K(a)||1===le(a),".priority must be the last token in a path");var d=this.T(c).H(N(a),b);return this.W(c,d)};h.e=function(){return this.m.e()};h.Hb=function(){return this.m.count()};
var Se=/^(0|[1-9]\d*)$/;h=fe.prototype;h.J=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.R(R,function(f,g){b[f]=g.J(a);c++;e&&Se.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],g;for(g in b)f[g]=b[g];return f}a&&!this.C().e()&&(b[".priority"]=this.C().J());return b};h.hash=function(){if(null===this.Gb){var a="";this.C().e()||(a+="priority:"+Re(this.C().J())+":");this.R(R,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Gb=""===a?"":ld(a)}return this.Gb};
h.wf=function(a,b,c){return(c=Te(this,c))?(a=Gc(c,new L(a,b)))?a.name:null:Gc(this.m,a)};function Wd(a,b){var c;c=(c=Te(a,b))?(c=c.Vc())&&c.name:a.m.Vc();return c?new L(c,a.m.get(c)):null}function Xd(a,b){var c;c=(c=Te(a,b))?(c=c.jc())&&c.name:a.m.jc();return c?new L(c,a.m.get(c)):null}h.R=function(a,b){var c=Te(this,a);return c?c.ka(function(a){return b(a.name,a.U)}):this.m.ka(b)};h.ac=function(a){return this.bc(a.Wc(),a)};
h.bc=function(a,b){var c=Te(this,b);if(c)return c.bc(a,function(a){return a});for(var c=this.m.bc(a.name,wc),d=Jc(c);null!=d&&0>b.compare(d,a);)Ic(c),d=Jc(c);return c};h.xf=function(a){return this.dc(a.Tc(),a)};h.dc=function(a,b){var c=Te(this,b);if(c)return c.dc(a,function(a){return a});for(var c=this.m.dc(a.name,wc),d=Jc(c);null!=d&&0<b.compare(d,a);)Ic(c),d=Jc(c);return c};h.Gc=function(a){return this.e()?a.e()?0:-1:a.L()||a.e()?1:a===we?-1:0};
h.pb=function(a){if(a===re||sa(this.Ab.hc,a.toString()))return this;var b=this.Ab,c=this.m;O(a!==re,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.ac(wc),f=Ic(c);f;)e=e||a.Lc(f.U),d.push(f),f=Ic(c);d=e?Me(d,Vd(a)):te;e=a.toString();c=wa(b.hc);c[e]=a;a=wa(b.Ed);a[e]=d;return new fe(this.m,this.ca,new Ke(a,c))};h.Mc=function(a){return a===re||sa(this.Ab.hc,a.toString())};
h.ea=function(a){if(a===this)return!0;if(a.L())return!1;if(this.C().ea(a.C())&&this.m.count()===a.m.count()){var b=this.ac(R);a=a.ac(R);for(var c=Ic(b),d=Ic(a);c&&d;){if(c.name!==d.name||!c.U.ea(d.U))return!1;c=Ic(b);d=Ic(a)}return null===c&&null===d}return!1};function Te(a,b){return b===re?null:a.Ab.get(b.toString())}h.toString=function(){return G(this.J(!0))};function Q(a,b){if(null===a)return H;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);O(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new Yc(a,Q(c));if(a instanceof Array){var d=H,e=a;v(e,function(a,b){if(y(e,b)&&"."!==b.substring(0,1)){var c=Q(a);if(c.L()||!c.e())d=
d.W(b,c)}});return d.ia(Q(c))}var f=[],g=!1,k=a;Fb(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=Q(k[a]);b.e()||(g=g||!b.C().e(),f.push(new L(a,b)))}});if(0==f.length)return H;var m=Me(f,xc,function(a){return a.name},zc);if(g){var l=Me(f,Vd(R));return new fe(m,Q(c),new Ke({".priority":l},{".priority":R}))}return new fe(m,Q(c),Oe)}var Ue=Math.log(2);
function Ve(a){this.count=parseInt(Math.log(a+1)/Ue,10);this.nf=this.count-1;this.ng=a+1&parseInt(Array(this.count+1).join("1"),2)}function We(a){var b=!(a.ng&1<<a.nf);a.nf--;return b}
function Me(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var l=a[b],t=c?c(l):l;return new Kc(t,l.U,!1,null,null)}var l=parseInt(f/2,10)+b,f=e(b,l),A=e(l+1,d),l=a[l],t=c?c(l):l;return new Kc(t,l.U,!1,f,A)}a.sort(b);var f=function(b){function d(b,g){var k=t-b,A=t;t-=b;var A=e(k+1,A),k=a[k],I=c?c(k):k,A=new Kc(I,k.U,g,null,A);f?f.left=A:l=A;f=A}for(var f=null,l=null,t=a.length,A=0;A<b.count;++A){var I=We(b),Qd=Math.pow(2,b.count-(A+1));I?d(Qd,!1):(d(Qd,!1),d(Qd,!0))}return l}(new Ve(a.length));
return null!==f?new Ec(d||b,f):new Ec(d||b)}function Re(a){return"number"===typeof a?"number:"+Ad(a):"string:"+a}function Pe(a){if(a.L()){var b=a.J();O("string"===typeof b||"number"===typeof b||"object"===typeof b&&y(b,".sv"),"Priority must be a string or number.")}else O(a===we||a.e(),"priority of unexpected type.");O(a===we||a.C().e(),"Priority nodes can't have a priority of their own.")}var H=new fe(new Ec(zc),null,Oe);function Xe(){fe.call(this,new Ec(zc),H,Oe)}ka(Xe,fe);h=Xe.prototype;
h.Gc=function(a){return a===this?0:1};h.ea=function(a){return a===this};h.C=function(){return this};h.T=function(){return H};h.e=function(){return!1};var we=new Xe,ue=new L("[MIN_NAME]",H),Ae=new L("[MAX_NAME]",we);function je(a,b){this.Q=a;this.ae=b}function ge(a,b,c,d){return new je(new Xb(b,c,d),a.ae)}function ke(a){return a.Q.ga?a.Q.j():null}je.prototype.w=function(){return this.ae};function Yb(a){return a.ae.ga?a.ae.j():null};function Ye(a,b){this.Y=a;var c=a.n,d=new Ld(c.g),c=He(c)?new Ld(c.g):c.la?new Sd(c):new Md(c);this.Nf=new Zd(c);var e=b.w(),f=b.Q,g=d.ya(H,e.j(),null),k=c.ya(H,f.j(),null);this.Oa=new je(new Xb(k,f.ga,c.Ra()),new Xb(g,e.ga,d.Ra()));this.$a=[];this.ug=new Fd(a)}function Ze(a){return a.Y}h=Ye.prototype;h.w=function(){return this.Oa.w().j()};h.kb=function(a){var b=Yb(this.Oa);return b&&(He(this.Y.n)||!a.e()&&!b.T(K(a)).e())?b.S(a):null};h.e=function(){return 0===this.$a.length};h.Tb=function(a){this.$a.push(a)};
h.nb=function(a,b){var c=[];if(b){O(null==a,"A cancel should cancel all event registrations.");var d=this.Y.path;Ma(this.$a,function(a){(a=a.lf(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.$a.length;++f){var g=this.$a[f];if(!g.matches(a))e.push(g);else if(a.yf()){e=e.concat(this.$a.slice(f+1));break}}this.$a=e}else this.$a=[];return c};
h.gb=function(a,b,c){a.type===be&&null!==a.source.Lb&&(O(Yb(this.Oa),"We should always have a full cache before handling merges"),O(ke(this.Oa),"Missing event cache, even though we have a server cache"));var d=this.Oa;a=this.Nf.gb(d,a,b,c);b=this.Nf;c=a.me;O(c.Q.j().Mc(b.X.g),"Event snap not indexed");O(c.w().j().Mc(b.X.g),"Server snap not indexed");O(lc(a.me.w())||!lc(d.w()),"Once a server snap is complete, it should never go back");this.Oa=a.me;return $e(this,a.og,a.me.Q.j(),null)};
function af(a,b){var c=a.Oa.Q,d=[];c.j().L()||c.j().R(R,function(a,b){d.push(new J("child_added",b,a))});c.ga&&d.push(hc(c.j()));return $e(a,d,c.j(),b)}function $e(a,b,c,d){return Gd(a.ug,b,c,d?[d]:a.$a)};function bf(a,b,c){this.type=be;this.source=a;this.path=b;this.children=c}bf.prototype.$c=function(a){if(this.path.e())return a=this.children.subtree(new P(a)),a.e()?null:a.value?new Ac(this.source,M,a.value):new bf(this.source,M,a);O(K(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new bf(this.source,N(this.path),this.children)};bf.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function cf(a,b){this.f=pd("p:rest:");this.G=a;this.Kb=b;this.Ca=null;this.ba={}}function df(a,b){if(p(b))return"tag$"+b;O(Ie(a.n),"should have a tag if it's not a default query.");return a.path.toString()}h=cf.prototype;
h.Cf=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.wa());var f=df(a,c),g={};this.ba[f]=g;a=Je(a.n);var k=this;ef(this,e+".json",a,function(a,b){var t=b;404===a&&(a=t=null);null===a&&k.Kb(e,t,!1,c);z(k.ba,f)===g&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};h.$f=function(a,b){var c=df(a,b);delete this.ba[c]};h.O=function(a,b){this.Ca=a;var c=Cd(a),d=c.data,c=c.Ec&&c.Ec.exp;b&&b("ok",{auth:d,expires:c})};h.je=function(a){this.Ca=null;a("ok",null)};
h.Qe=function(){};h.Gf=function(){};h.Md=function(){};h.put=function(){};h.Df=function(){};h.Ye=function(){};
function ef(a,b,c,d){c=c||{};c.format="export";a.Ca&&(c.auth=a.Ca);var e=(a.G.ob?"https://":"http://")+a.G.host+b+"?"+Ib(c);a.f("Sending REST request for "+e);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(d&&4===f.readyState){a.f("REST Response for "+e+" received. status:",f.status,"response:",f.responseText);var b=null;if(200<=f.status&&300>f.status){try{b=Rb(f.responseText)}catch(c){S("Failed to parse JSON response for "+e+": "+f.responseText)}d(null,b)}else 401!==f.status&&404!==
f.status&&S("Got unsuccessful REST response for "+e+" Status: "+f.status),d(f.status);d=null}};f.open("GET",e,!0);f.send()};function ff(a){O(da(a)&&0<a.length,"Requires a non-empty array");this.fg=a;this.Rc={}}ff.prototype.ie=function(a,b){var c;c=this.Rc[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].Dc.apply(c[d].Qa,Array.prototype.slice.call(arguments,1))};ff.prototype.Ib=function(a,b,c){gf(this,a);this.Rc[a]=this.Rc[a]||[];this.Rc[a].push({Dc:b,Qa:c});(a=this.Ee(a))&&b.apply(c,a)};
ff.prototype.mc=function(a,b,c){gf(this,a);a=this.Rc[a]||[];for(var d=0;d<a.length;d++)if(a[d].Dc===b&&(!c||c===a[d].Qa)){a.splice(d,1);break}};function gf(a,b){O(Ra(a.fg,function(a){return a===b}),"Unknown event: "+b)};var hf=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);O(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);O(20===c.length,"nextPushId: Length should be 20.");
return c}}();function jf(){ff.call(this,["online"]);this.oc=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.oc||(a.oc=!0,a.ie("online",!0))},!1);window.addEventListener("offline",function(){a.oc&&(a.oc=!1,a.ie("online",!1))},!1)}}ka(jf,ff);jf.prototype.Ee=function(a){O("online"===a,"Unknown event type: "+a);return[this.oc]};ba(jf);function kf(){ff.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Sb=!0;if(b){var c=this;document.addEventListener(b,
function(){var b=!document[a];b!==c.Sb&&(c.Sb=b,c.ie("visible",b))},!1)}}ka(kf,ff);kf.prototype.Ee=function(a){O("visible"===a,"Unknown event type: "+a);return[this.Sb]};ba(kf);function P(a,b){if(1==arguments.length){this.u=a.split("/");for(var c=0,d=0;d<this.u.length;d++)0<this.u[d].length&&(this.u[c]=this.u[d],c++);this.u.length=c;this.aa=0}else this.u=a,this.aa=b}function lf(a,b){var c=K(a);if(null===c)return b;if(c===K(b))return lf(N(a),N(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
function mf(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=yc(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function K(a){return a.aa>=a.u.length?null:a.u[a.aa]}function le(a){return a.u.length-a.aa}function N(a){var b=a.aa;b<a.u.length&&b++;return new P(a.u,b)}function me(a){return a.aa<a.u.length?a.u[a.u.length-1]:null}h=P.prototype;
h.toString=function(){for(var a="",b=this.aa;b<this.u.length;b++)""!==this.u[b]&&(a+="/"+this.u[b]);return a||"/"};h.slice=function(a){return this.u.slice(this.aa+(a||0))};h.parent=function(){if(this.aa>=this.u.length)return null;for(var a=[],b=this.aa;b<this.u.length-1;b++)a.push(this.u[b]);return new P(a,0)};
h.o=function(a){for(var b=[],c=this.aa;c<this.u.length;c++)b.push(this.u[c]);if(a instanceof P)for(c=a.aa;c<a.u.length;c++)b.push(a.u[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new P(b,0)};h.e=function(){return this.aa>=this.u.length};h.ea=function(a){if(le(this)!==le(a))return!1;for(var b=this.aa,c=a.aa;b<=this.u.length;b++,c++)if(this.u[b]!==a.u[c])return!1;return!0};
h.contains=function(a){var b=this.aa,c=a.aa;if(le(this)>le(a))return!1;for(;b<this.u.length;){if(this.u[b]!==a.u[c])return!1;++b;++c}return!0};var M=new P("");function nf(a,b){this.Ua=a.slice();this.Ka=Math.max(1,this.Ua.length);this.pf=b;for(var c=0;c<this.Ua.length;c++)this.Ka+=Pb(this.Ua[c]);of(this)}nf.prototype.push=function(a){0<this.Ua.length&&(this.Ka+=1);this.Ua.push(a);this.Ka+=Pb(a);of(this)};nf.prototype.pop=function(){var a=this.Ua.pop();this.Ka-=Pb(a);0<this.Ua.length&&--this.Ka};
function of(a){if(768<a.Ka)throw Error(a.pf+"has a key path longer than 768 bytes ("+a.Ka+").");if(32<a.Ua.length)throw Error(a.pf+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+pf(a));}function pf(a){return 0==a.Ua.length?"":"in property '"+a.Ua.join(".")+"'"};function qf(a,b){this.value=a;this.children=b||rf}var rf=new Ec(function(a,b){return a===b?0:a<b?-1:1});function sf(a){var b=qe;v(a,function(a,d){b=b.set(new P(d),a)});return b}h=qf.prototype;h.e=function(){return null===this.value&&this.children.e()};function tf(a,b,c){if(null!=a.value&&c(a.value))return{path:M,value:a.value};if(b.e())return null;var d=K(b);a=a.children.get(d);return null!==a?(b=tf(a,N(b),c),null!=b?{path:(new P(d)).o(b.path),value:b.value}:null):null}
function uf(a,b){return tf(a,b,function(){return!0})}h.subtree=function(a){if(a.e())return this;var b=this.children.get(K(a));return null!==b?b.subtree(N(a)):qe};h.set=function(a,b){if(a.e())return new qf(b,this.children);var c=K(a),d=(this.children.get(c)||qe).set(N(a),b),c=this.children.Sa(c,d);return new qf(this.value,c)};
h.remove=function(a){if(a.e())return this.children.e()?qe:new qf(null,this.children);var b=K(a),c=this.children.get(b);return c?(a=c.remove(N(a)),b=a.e()?this.children.remove(b):this.children.Sa(b,a),null===this.value&&b.e()?qe:new qf(this.value,b)):this};h.get=function(a){if(a.e())return this.value;var b=this.children.get(K(a));return b?b.get(N(a)):null};
function pe(a,b,c){if(b.e())return c;var d=K(b);b=pe(a.children.get(d)||qe,N(b),c);d=b.e()?a.children.remove(d):a.children.Sa(d,b);return new qf(a.value,d)}function vf(a,b){return wf(a,M,b)}function wf(a,b,c){var d={};a.children.ka(function(a,f){d[a]=wf(f,b.o(a),c)});return c(b,a.value,d)}function xf(a,b,c){return yf(a,b,M,c)}function yf(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=K(b);return(a=a.children.get(e))?yf(a,N(b),c.o(e),d):null}
function zf(a,b,c){Af(a,b,M,c)}function Af(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=K(b);return(a=a.children.get(e))?Af(a,N(b),c.o(e),d):qe}function ne(a,b){Bf(a,M,b)}function Bf(a,b,c){a.children.ka(function(a,e){Bf(e,b.o(a),c)});a.value&&c(b,a.value)}function Cf(a,b){a.children.ka(function(a,d){d.value&&b(a,d.value)})}var qe=new qf(null);qf.prototype.toString=function(){var a={};ne(this,function(b,c){a[b.toString()]=c.toString()});return G(a)};function Df(a,b,c){this.type=ee;this.source=Ef;this.path=a;this.Ub=b;this.Yd=c}Df.prototype.$c=function(a){if(this.path.e()){if(null!=this.Ub.value)return O(this.Ub.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Ub.subtree(new P(a));return new Df(M,a,this.Yd)}O(K(this.path)===a,"operationForChild called for unrelated child.");return new Df(N(this.path),this.Ub,this.Yd)};
Df.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Yd+" affectedTree="+this.Ub+")"};var Bc=0,be=1,ee=2,Dc=3;function Ff(a,b,c,d){this.Ae=a;this.tf=b;this.Lb=c;this.ef=d;O(!d||b,"Tagged queries must be from server.")}var Ef=new Ff(!0,!1,null,!1),Gf=new Ff(!1,!0,null,!1);Ff.prototype.toString=function(){return this.Ae?"user":this.ef?"server(queryID="+this.Lb+")":"server"};function Hf(a){this.Z=a}var If=new Hf(new qf(null));function Jf(a,b,c){if(b.e())return new Hf(new qf(c));var d=uf(a.Z,b);if(null!=d){var e=d.path,d=d.value;b=lf(e,b);d=d.H(b,c);return new Hf(a.Z.set(e,d))}a=pe(a.Z,b,new qf(c));return new Hf(a)}function Kf(a,b,c){var d=a;Fb(c,function(a,c){d=Jf(d,b.o(a),c)});return d}Hf.prototype.Ud=function(a){if(a.e())return If;a=pe(this.Z,a,qe);return new Hf(a)};function Lf(a,b){var c=uf(a.Z,b);return null!=c?a.Z.get(c.path).S(lf(c.path,b)):null}
function Mf(a){var b=[],c=a.Z.value;null!=c?c.L()||c.R(R,function(a,c){b.push(new L(a,c))}):a.Z.children.ka(function(a,c){null!=c.value&&b.push(new L(a,c.value))});return b}function Nf(a,b){if(b.e())return a;var c=Lf(a,b);return null!=c?new Hf(new qf(c)):new Hf(a.Z.subtree(b))}Hf.prototype.e=function(){return this.Z.e()};Hf.prototype.apply=function(a){return Of(M,this.Z,a)};
function Of(a,b,c){if(null!=b.value)return c.H(a,b.value);var d=null;b.children.ka(function(b,f){".priority"===b?(O(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=Of(a.o(b),f,c)});c.S(a).e()||null===d||(c=c.H(a.o(".priority"),d));return c};function Pf(){this.V=If;this.pa=[];this.Pc=-1}function Qf(a,b){for(var c=0;c<a.pa.length;c++){var d=a.pa[c];if(d.md===b)return d}return null}h=Pf.prototype;
h.Ud=function(a){var b=Sa(this.pa,function(b){return b.md===a});O(0<=b,"removeWrite called with nonexistent writeId.");var c=this.pa[b];this.pa.splice(b,1);for(var d=c.visible,e=!1,f=this.pa.length-1;d&&0<=f;){var g=this.pa[f];g.visible&&(f>=b&&Rf(g,c.path)?d=!1:c.path.contains(g.path)&&(e=!0));f--}if(d){if(e)this.V=Sf(this.pa,Tf,M),this.Pc=0<this.pa.length?this.pa[this.pa.length-1].md:-1;else if(c.Ja)this.V=this.V.Ud(c.path);else{var k=this;v(c.children,function(a,b){k.V=k.V.Ud(c.path.o(b))})}return!0}return!1};
h.Aa=function(a,b,c,d){if(c||d){var e=Nf(this.V,a);return!d&&e.e()?b:d||null!=b||null!=Lf(e,M)?(e=Sf(this.pa,function(b){return(b.visible||d)&&(!c||!(0<=La(c,b.md)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||H,e.apply(b)):null}e=Lf(this.V,a);if(null!=e)return e;e=Nf(this.V,a);return e.e()?b:null!=b||null!=Lf(e,M)?(b=b||H,e.apply(b)):null};
h.Cc=function(a,b){var c=H,d=Lf(this.V,a);if(d)d.L()||d.R(R,function(a,b){c=c.W(a,b)});else if(b){var e=Nf(this.V,a);b.R(R,function(a,b){var d=Nf(e,new P(a)).apply(b);c=c.W(a,d)});Ma(Mf(e),function(a){c=c.W(a.name,a.U)})}else e=Nf(this.V,a),Ma(Mf(e),function(a){c=c.W(a.name,a.U)});return c};h.nd=function(a,b,c,d){O(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.o(b);if(null!=Lf(this.V,a))return null;a=Nf(this.V,a);return a.e()?d.S(b):a.apply(d.S(b))};
h.Bc=function(a,b,c){a=a.o(b);var d=Lf(this.V,a);return null!=d?d:Wb(c,b)?Nf(this.V,a).apply(c.j().T(b)):null};h.xc=function(a){return Lf(this.V,a)};h.qe=function(a,b,c,d,e,f){var g;a=Nf(this.V,a);g=Lf(a,M);if(null==g)if(null!=b)g=a.apply(b);else return[];g=g.pb(f);if(g.e()||g.L())return[];b=[];a=Vd(f);e=e?g.dc(c,f):g.bc(c,f);for(f=Ic(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=Ic(e);return b};
function Rf(a,b){return a.Ja?a.path.contains(b):!!ta(a.children,function(c,d){return a.path.o(d).contains(b)})}function Tf(a){return a.visible}
function Sf(a,b,c){for(var d=If,e=0;e<a.length;++e){var f=a[e];if(b(f)){var g=f.path;if(f.Ja)c.contains(g)?(g=lf(c,g),d=Jf(d,g,f.Ja)):g.contains(c)&&(g=lf(g,c),d=Jf(d,M,f.Ja.S(g)));else if(f.children)if(c.contains(g))g=lf(c,g),d=Kf(d,g,f.children);else{if(g.contains(c))if(g=lf(g,c),g.e())d=Kf(d,M,f.children);else if(f=z(f.children,K(g)))f=f.S(N(g)),d=Jf(d,M,f)}else throw jd("WriteRecord should have .snap or .children");}}return d}function Uf(a,b){this.Qb=a;this.Z=b}h=Uf.prototype;
h.Aa=function(a,b,c){return this.Z.Aa(this.Qb,a,b,c)};h.Cc=function(a){return this.Z.Cc(this.Qb,a)};h.nd=function(a,b,c){return this.Z.nd(this.Qb,a,b,c)};h.xc=function(a){return this.Z.xc(this.Qb.o(a))};h.qe=function(a,b,c,d,e){return this.Z.qe(this.Qb,a,b,c,d,e)};h.Bc=function(a,b){return this.Z.Bc(this.Qb,a,b)};h.o=function(a){return new Uf(this.Qb.o(a),this.Z)};function Vf(){this.children={};this.pd=0;this.value=null}function Wf(a,b,c){this.Jd=a?a:"";this.Ha=b?b:null;this.A=c?c:new Vf}function Xf(a,b){for(var c=b instanceof P?b:new P(b),d=a,e;null!==(e=K(c));)d=new Wf(e,d,z(d.A.children,e)||new Vf),c=N(c);return d}h=Wf.prototype;h.Ea=function(){return this.A.value};function Yf(a,b){O("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;Zf(a)}h.clear=function(){this.A.value=null;this.A.children={};this.A.pd=0;Zf(this)};
h.zd=function(){return 0<this.A.pd};h.e=function(){return null===this.Ea()&&!this.zd()};h.R=function(a){var b=this;v(this.A.children,function(c,d){a(new Wf(d,b,c))})};function $f(a,b,c,d){c&&!d&&b(a);a.R(function(a){$f(a,b,!0,d)});c&&d&&b(a)}function ag(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}h.path=function(){return new P(null===this.Ha?this.Jd:this.Ha.path()+"/"+this.Jd)};h.name=function(){return this.Jd};h.parent=function(){return this.Ha};
function Zf(a){if(null!==a.Ha){var b=a.Ha,c=a.Jd,d=a.e(),e=y(b.A.children,c);d&&e?(delete b.A.children[c],b.A.pd--,Zf(b)):d||e||(b.A.children[c]=a.A,b.A.pd++,Zf(b))}};var bg=/[\[\].#$\/\u0000-\u001F\u007F]/,cg=/[\[\].#$\u0000-\u001F\u007F]/,dg=/^[a-zA-Z][a-zA-Z._\-+]+$/;function eg(a){return q(a)&&0!==a.length&&!bg.test(a)}function fg(a){return null===a||q(a)||fa(a)&&!td(a)||ga(a)&&y(a,".sv")}function gg(a,b,c,d){d&&!p(b)||hg(E(a,1,d),b,c)}
function hg(a,b,c){c instanceof P&&(c=new nf(c,a));if(!p(b))throw Error(a+"contains undefined "+pf(c));if(r(b))throw Error(a+"contains a function "+pf(c)+" with contents: "+b.toString());if(td(b))throw Error(a+"contains "+b.toString()+" "+pf(c));if(q(b)&&b.length>10485760/3&&10485760<Pb(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+pf(c)+" ('"+b.substring(0,50)+"...')");if(ga(b)){var d=!1,e=!1;Fb(b,function(b,g){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
!0,!eg(b)))throw Error(a+" contains an invalid key ("+b+") "+pf(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);hg(a,g,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+pf(c)+" in addition to actual children.");}}
function ig(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!eg(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(mf);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
function jg(a,b,c){var d=E(a,1,!1);if(!ga(b)||da(b))throw Error(d+" must be an object containing the children to replace.");var e=[];Fb(b,function(a,b){var k=new P(a);hg(d,b,c.o(k));if(".priority"===me(k)&&!fg(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});ig(d,e)}
function kg(a,b,c){if(td(c))throw Error(E(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!fg(c))throw Error(E(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
function lg(a,b,c){if(!c||p(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(E(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function mg(a,b){if(p(b)&&!eg(b))throw Error(E(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
function ng(a,b){if(!q(b)||0===b.length||cg.test(b))throw Error(E(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function og(a,b){if(".info"===K(b))throw Error(a+" failed: Can't modify data under /.info/");}function pg(a,b){if(!q(b))throw Error(E(a,1,!1)+"must be a valid credential (a string).");}function qg(a,b,c){if(!q(c))throw Error(E(a,b,!1)+"must be a valid string.");}
function rg(a,b){qg(a,1,b);if(!dg.test(b))throw Error(E(a,1,!1)+"'"+b+"' is not a valid authentication provider.");}function sg(a,b,c,d){if(!d||p(c))if(!ga(c)||null===c)throw Error(E(a,b,d)+"must be a valid object.");}function tg(a,b,c){if(!ga(b)||!y(b,c))throw Error(E(a,1,!1)+'must contain the key "'+c+'"');if(!q(z(b,c)))throw Error(E(a,1,!1)+'must contain the key "'+c+'" with type "string"');};function ug(){this.set={}}h=ug.prototype;h.add=function(a,b){this.set[a]=null!==b?b:!0};h.contains=function(a){return y(this.set,a)};h.get=function(a){return this.contains(a)?this.set[a]:void 0};h.remove=function(a){delete this.set[a]};h.clear=function(){this.set={}};h.e=function(){return va(this.set)};h.count=function(){return oa(this.set)};function vg(a,b){v(a.set,function(a,d){b(d,a)})}h.keys=function(){var a=[];v(this.set,function(b,c){a.push(c)});return a};function Vc(){this.m=this.B=null}Vc.prototype.find=function(a){if(null!=this.B)return this.B.S(a);if(a.e()||null==this.m)return null;var b=K(a);a=N(a);return this.m.contains(b)?this.m.get(b).find(a):null};Vc.prototype.rc=function(a,b){if(a.e())this.B=b,this.m=null;else if(null!==this.B)this.B=this.B.H(a,b);else{null==this.m&&(this.m=new ug);var c=K(a);this.m.contains(c)||this.m.add(c,new Vc);c=this.m.get(c);a=N(a);c.rc(a,b)}};
function wg(a,b){if(b.e())return a.B=null,a.m=null,!0;if(null!==a.B){if(a.B.L())return!1;var c=a.B;a.B=null;c.R(R,function(b,c){a.rc(new P(b),c)});return wg(a,b)}return null!==a.m?(c=K(b),b=N(b),a.m.contains(c)&&wg(a.m.get(c),b)&&a.m.remove(c),a.m.e()?(a.m=null,!0):!1):!0}function Wc(a,b,c){null!==a.B?c(b,a.B):a.R(function(a,e){var f=new P(b.toString()+"/"+a);Wc(e,f,c)})}Vc.prototype.R=function(a){null!==this.m&&vg(this.m,function(b,c){a(b,c)})};var xg="auth.firebase.com";function yg(a,b,c){this.qd=a||{};this.he=b||{};this.fb=c||{};this.qd.remember||(this.qd.remember="default")}var zg=["remember","redirectTo"];function Ag(a){var b={},c={};Fb(a||{},function(a,e){0<=La(zg,a)?b[a]=e:c[a]=e});return new yg(b,{},c)};function Bg(a,b){this.Ue=["session",a.Rd,a.lc].join(":");this.ee=b}Bg.prototype.set=function(a,b){if(!b)if(this.ee.length)b=this.ee[0];else throw Error("fb.login.SessionManager : No storage options available!");b.set(this.Ue,a)};Bg.prototype.get=function(){var a=Oa(this.ee,u(this.Bg,this)),a=Na(a,function(a){return null!==a});Va(a,function(a,c){return Dd(c.token)-Dd(a.token)});return 0<a.length?a.shift():null};Bg.prototype.Bg=function(a){try{var b=a.get(this.Ue);if(b&&b.token)return b}catch(c){}return null};
Bg.prototype.clear=function(){var a=this;Ma(this.ee,function(b){b.remove(a.Ue)})};function Cg(){return"undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:""}function Dg(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Cg())}function Eg(){return"undefined"!==typeof location&&/^file:\//.test(location.href)}
function Fg(a){var b=Cg();if(""===b)return!1;if("Microsoft Internet Explorer"===navigator.appName){if((b=b.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a}else if(-1<b.indexOf("Trident")&&(b=b.match(/rv:([0-9]{2,2}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a;return!1};function Gg(){var a=window.opener.frames,b;for(b=a.length-1;0<=b;b--)try{if(a[b].location.protocol===window.location.protocol&&a[b].location.host===window.location.host&&"__winchan_relay_frame"===a[b].name)return a[b]}catch(c){}return null}function Hg(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}function Ig(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener&&a.removeEventListener(b,c,!1)}
function Jg(a){/^https?:\/\//.test(a)||(a=window.location.href);var b=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);return b?b[1]:a}function Kg(a){var b="";try{a=a.replace(/.*\?/,"");var c=Jb(a);c&&y(c,"__firebase_request_key")&&(b=z(c,"__firebase_request_key"))}catch(d){}return b}function Lg(){try{var a=document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/,""),a=a.replace(/\?$/,""),a=a.replace(/^#+$/,"");document.location.hash=a}catch(b){}}
function Mg(){var a=sd(xg);return a.scheme+"://"+a.host+"/v2"}function Ng(a){return Mg()+"/"+a+"/auth/channel"};function Og(a){var b=this;this.hb=a;this.fe="*";Fg(8)?this.Uc=this.Cd=Gg():(this.Uc=window.opener,this.Cd=window);if(!b.Uc)throw"Unable to find relay frame";Hg(this.Cd,"message",u(this.nc,this));Hg(this.Cd,"message",u(this.Ff,this));try{Pg(this,{a:"ready"})}catch(c){Hg(this.Uc,"load",function(){Pg(b,{a:"ready"})})}Hg(window,"unload",u(this.Mg,this))}function Pg(a,b){b=G(b);Fg(8)?a.Uc.doPost(b,a.fe):a.Uc.postMessage(b,a.fe)}
Og.prototype.nc=function(a){var b=this,c;try{c=Rb(a.data)}catch(d){}c&&"request"===c.a&&(Ig(window,"message",this.nc),this.fe=a.origin,this.hb&&setTimeout(function(){b.hb(b.fe,c.d,function(a,c){b.mg=!c;b.hb=void 0;Pg(b,{a:"response",d:a,forceKeepWindowOpen:c})})},0))};Og.prototype.Mg=function(){try{Ig(this.Cd,"message",this.Ff)}catch(a){}this.hb&&(Pg(this,{a:"error",d:"unknown closed window"}),this.hb=void 0);try{window.close()}catch(b){}};Og.prototype.Ff=function(a){if(this.mg&&"die"===a.data)try{window.close()}catch(b){}};function Qg(a){this.tc=Fa()+Fa()+Fa();this.Kf=a}Qg.prototype.open=function(a,b){cd.set("redirect_request_id",this.tc);cd.set("redirect_request_id",this.tc);b.requestId=this.tc;b.redirectTo=b.redirectTo||window.location.href;a+=(/\?/.test(a)?"":"?")+Ib(b);window.location=a};Qg.isAvailable=function(){return!Eg()&&!Dg()};Qg.prototype.Fc=function(){return"redirect"};var Rg={NETWORK_ERROR:"Unable to contact the Firebase server.",SERVER_ERROR:"An unknown server error occurred.",TRANSPORT_UNAVAILABLE:"There are no login transports available for the requested method.",REQUEST_INTERRUPTED:"The browser redirected the page before the login request could complete.",USER_CANCELLED:"The user cancelled authentication."};function Sg(a){var b=Error(z(Rg,a),a);b.code=a;return b};function Tg(a){var b;(b=!a.window_features)||(b=Cg(),b=-1!==b.indexOf("Fennec/")||-1!==b.indexOf("Firefox/")&&-1!==b.indexOf("Android"));b&&(a.window_features=void 0);a.window_name||(a.window_name="_blank");this.options=a}
Tg.prototype.open=function(a,b,c){function d(a){g&&(document.body.removeChild(g),g=void 0);t&&(t=clearInterval(t));Ig(window,"message",e);Ig(window,"unload",d);if(l&&!a)try{l.close()}catch(b){k.postMessage("die",m)}l=k=void 0}function e(a){if(a.origin===m)try{var b=Rb(a.data);"ready"===b.a?k.postMessage(A,m):"error"===b.a?(d(!1),c&&(c(b.d),c=null)):"response"===b.a&&(d(b.forceKeepWindowOpen),c&&(c(null,b.d),c=null))}catch(e){}}var f=Fg(8),g,k;if(!this.options.relay_url)return c(Error("invalid arguments: origin of url and relay_url must match"));
var m=Jg(a);if(m!==Jg(this.options.relay_url))c&&setTimeout(function(){c(Error("invalid arguments: origin of url and relay_url must match"))},0);else{f&&(g=document.createElement("iframe"),g.setAttribute("src",this.options.relay_url),g.style.display="none",g.setAttribute("name","__winchan_relay_frame"),document.body.appendChild(g),k=g.contentWindow);a+=(/\?/.test(a)?"":"?")+Ib(b);var l=window.open(a,this.options.window_name,this.options.window_features);k||(k=l);var t=setInterval(function(){l&&l.closed&&
(d(!1),c&&(c(Sg("USER_CANCELLED")),c=null))},500),A=G({a:"request",d:b});Hg(window,"unload",d);Hg(window,"message",e)}};
Tg.isAvailable=function(){var a;if(a="postMessage"in window&&!Eg())(a=Dg()||"undefined"!==typeof navigator&&(!!Cg().match(/Windows Phone/)||!!window.Windows&&/^ms-appx:/.test(location.href)))||(a=Cg(),a="undefined"!==typeof navigator&&"undefined"!==typeof window&&!!(a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i)||a.match(/CriOS/)||a.match(/Twitter for iPhone/)||a.match(/FBAN\/FBIOS/)||window.navigator.standalone)),a=!a;return a&&!Cg().match(/PhantomJS/)};Tg.prototype.Fc=function(){return"popup"};function Ug(a){a.method||(a.method="GET");a.headers||(a.headers={});a.headers.content_type||(a.headers.content_type="application/json");a.headers.content_type=a.headers.content_type.toLowerCase();this.options=a}
Ug.prototype.open=function(a,b,c){function d(){c&&(c(Sg("REQUEST_INTERRUPTED")),c=null)}var e=new XMLHttpRequest,f=this.options.method.toUpperCase(),g;Hg(window,"beforeunload",d);e.onreadystatechange=function(){if(c&&4===e.readyState){var a;if(200<=e.status&&300>e.status){try{a=Rb(e.responseText)}catch(b){}c(null,a)}else 500<=e.status&&600>e.status?c(Sg("SERVER_ERROR")):c(Sg("NETWORK_ERROR"));c=null;Ig(window,"beforeunload",d)}};if("GET"===f)a+=(/\?/.test(a)?"":"?")+Ib(b),g=null;else{var k=this.options.headers.content_type;
"application/json"===k&&(g=G(b));"application/x-www-form-urlencoded"===k&&(g=Ib(b))}e.open(f,a,!0);a={"X-Requested-With":"XMLHttpRequest",Accept:"application/json;text/plain"};ya(a,this.options.headers);for(var m in a)e.setRequestHeader(m,a[m]);e.send(g)};Ug.isAvailable=function(){var a;if(a=!!window.XMLHttpRequest)a=Cg(),a=!(a.match(/MSIE/)||a.match(/Trident/))||Fg(10);return a};Ug.prototype.Fc=function(){return"json"};function Vg(a){this.tc=Fa()+Fa()+Fa();this.Kf=a}
Vg.prototype.open=function(a,b,c){function d(){c&&(c(Sg("USER_CANCELLED")),c=null)}var e=this,f=sd(xg),g;b.requestId=this.tc;b.redirectTo=f.scheme+"://"+f.host+"/blank/page.html";a+=/\?/.test(a)?"":"?";a+=Ib(b);(g=window.open(a,"_blank","location=no"))&&r(g.addEventListener)?(g.addEventListener("loadstart",function(a){var b;if(b=a&&a.url)a:{try{var l=document.createElement("a");l.href=a.url;b=l.host===f.host&&"/blank/page.html"===l.pathname;break a}catch(t){}b=!1}b&&(a=Kg(a.url),g.removeEventListener("exit",
d),g.close(),a=new yg(null,null,{requestId:e.tc,requestKey:a}),e.Kf.requestWithCredential("/auth/session",a,c),c=null)}),g.addEventListener("exit",d)):c(Sg("TRANSPORT_UNAVAILABLE"))};Vg.isAvailable=function(){return Dg()};Vg.prototype.Fc=function(){return"redirect"};function Wg(a){a.callback_parameter||(a.callback_parameter="callback");this.options=a;window.__firebase_auth_jsonp=window.__firebase_auth_jsonp||{}}
Wg.prototype.open=function(a,b,c){function d(){c&&(c(Sg("REQUEST_INTERRUPTED")),c=null)}function e(){setTimeout(function(){window.__firebase_auth_jsonp[f]=void 0;va(window.__firebase_auth_jsonp)&&(window.__firebase_auth_jsonp=void 0);try{var a=document.getElementById(f);a&&a.parentNode.removeChild(a)}catch(b){}},1);Ig(window,"beforeunload",d)}var f="fn"+(new Date).getTime()+Math.floor(99999*Math.random());b[this.options.callback_parameter]="__firebase_auth_jsonp."+f;a+=(/\?/.test(a)?"":"?")+Ib(b);
Hg(window,"beforeunload",d);window.__firebase_auth_jsonp[f]=function(a){c&&(c(null,a),c=null);e()};Xg(f,a,c)};
function Xg(a,b,c){setTimeout(function(){try{var d=document.createElement("script");d.type="text/javascript";d.id=a;d.async=!0;d.src=b;d.onerror=function(){var b=document.getElementById(a);null!==b&&b.parentNode.removeChild(b);c&&c(Sg("NETWORK_ERROR"))};var e=document.getElementsByTagName("head");(e&&0!=e.length?e[0]:document.documentElement).appendChild(d)}catch(f){c&&c(Sg("NETWORK_ERROR"))}},0)}Wg.isAvailable=function(){return"undefined"!==typeof document&&null!=document.createElement};
Wg.prototype.Fc=function(){return"json"};function Yg(a,b,c,d){ff.call(this,["auth_status"]);this.G=a;this.hf=b;this.hh=c;this.Pe=d;this.wc=new Bg(a,[bd,cd]);this.qb=null;this.We=!1;Zg(this)}ka(Yg,ff);h=Yg.prototype;h.Be=function(){return this.qb||null};function Zg(a){cd.get("redirect_request_id")&&$g(a);var b=a.wc.get();b&&b.token?(ah(a,b),a.hf(b.token,function(c,d){bh(a,c,d,!1,b.token,b)},function(b,d){ch(a,"resumeSession()",b,d)})):ah(a,null)}
function dh(a,b,c,d,e,f){"firebaseio-demo.com"===a.G.domain&&S("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");a.hf(b,function(f,k){bh(a,f,k,!0,b,c,d||{},e)},function(b,c){ch(a,"auth()",b,c,f)})}function eh(a,b){a.wc.clear();ah(a,null);a.hh(function(a,d){if("ok"===a)T(b,null);else{var e=(a||"error").toUpperCase(),f=e;d&&(f+=": "+d);f=Error(f);f.code=e;T(b,f)}})}
function bh(a,b,c,d,e,f,g,k){"ok"===b?(d&&(b=c.auth,f.auth=b,f.expires=c.expires,f.token=Ed(e)?e:"",c=null,b&&y(b,"uid")?c=z(b,"uid"):y(f,"uid")&&(c=z(f,"uid")),f.uid=c,c="custom",b&&y(b,"provider")?c=z(b,"provider"):y(f,"provider")&&(c=z(f,"provider")),f.provider=c,a.wc.clear(),Ed(e)&&(g=g||{},c=bd,"sessionOnly"===g.remember&&(c=cd),"none"!==g.remember&&a.wc.set(f,c)),ah(a,f)),T(k,null,f)):(a.wc.clear(),ah(a,null),f=a=(b||"error").toUpperCase(),c&&(f+=": "+c),f=Error(f),f.code=a,T(k,f))}
function ch(a,b,c,d,e){S(b+" was canceled: "+d);a.wc.clear();ah(a,null);a=Error(d);a.code=c.toUpperCase();T(e,a)}function fh(a,b,c,d,e){gh(a);c=new yg(d||{},{},c||{});hh(a,[Ug,Wg],"/auth/"+b,c,e)}
function ih(a,b,c,d){gh(a);var e=[Tg,Vg];c=Ag(c);var f=625;"anonymous"===b||"password"===b?setTimeout(function(){T(d,Sg("TRANSPORT_UNAVAILABLE"))},0):("github"===b&&(f=1025),c.he.window_features="menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width="+f+",top="+("object"===typeof screen?.5*(screen.height-625):0)+",left="+("object"===typeof screen?.5*(screen.width-f):0),c.he.relay_url=Ng(a.G.lc),c.he.requestWithCredential=u(a.uc,a),hh(a,e,"/auth/"+
b,c,d))}function $g(a){var b=cd.get("redirect_request_id");if(b){var c=cd.get("redirect_client_options");cd.remove("redirect_request_id");cd.remove("redirect_client_options");var d=[Ug,Wg],b={requestId:b,requestKey:Kg(document.location.hash)},c=new yg(c,{},b);a.We=!0;Lg();hh(a,d,"/auth/session",c,function(){this.We=!1}.bind(a))}}h.ve=function(a,b){gh(this);var c=Ag(a);c.fb._method="POST";this.uc("/users",c,function(a,c){a?T(b,a):T(b,a,c)})};
h.Xe=function(a,b){var c=this;gh(this);var d="/users/"+encodeURIComponent(a.email),e=Ag(a);e.fb._method="DELETE";this.uc(d,e,function(a,d){!a&&d&&d.uid&&c.qb&&c.qb.uid&&c.qb.uid===d.uid&&eh(c);T(b,a)})};h.se=function(a,b){gh(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=Ag(a);d.fb._method="PUT";d.fb.password=a.newPassword;this.uc(c,d,function(a){T(b,a)})};
h.re=function(a,b){gh(this);var c="/users/"+encodeURIComponent(a.oldEmail)+"/email",d=Ag(a);d.fb._method="PUT";d.fb.email=a.newEmail;d.fb.password=a.password;this.uc(c,d,function(a){T(b,a)})};h.Ze=function(a,b){gh(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=Ag(a);d.fb._method="POST";this.uc(c,d,function(a){T(b,a)})};h.uc=function(a,b,c){jh(this,[Ug,Wg],a,b,c)};
function hh(a,b,c,d,e){jh(a,b,c,d,function(b,c){!b&&c&&c.token&&c.uid?dh(a,c.token,c,d.qd,function(a,b){a?T(e,a):T(e,null,b)}):T(e,b||Sg("UNKNOWN_ERROR"))})}
function jh(a,b,c,d,e){b=Na(b,function(a){return"function"===typeof a.isAvailable&&a.isAvailable()});0===b.length?setTimeout(function(){T(e,Sg("TRANSPORT_UNAVAILABLE"))},0):(b=new (b.shift())(d.he),d=Gb(d.fb),d.v="js-"+Eb,d.transport=b.Fc(),d.suppress_status_codes=!0,a=Mg()+"/"+a.G.lc+c,b.open(a,d,function(a,b){if(a)T(e,a);else if(b&&b.error){var c=Error(b.error.message);c.code=b.error.code;c.details=b.error.details;T(e,c)}else T(e,null,b)}))}
function ah(a,b){var c=null!==a.qb||null!==b;a.qb=b;c&&a.ie("auth_status",b);a.Pe(null!==b)}h.Ee=function(a){O("auth_status"===a,'initial event must be of type "auth_status"');return this.We?null:[this.qb]};function gh(a){var b=a.G;if("firebaseio.com"!==b.domain&&"firebaseio-demo.com"!==b.domain&&"auth.firebase.com"===xg)throw Error("This custom Firebase server ('"+a.G.domain+"') does not support delegated login.");};var gd="websocket",hd="long_polling";function kh(a){this.nc=a;this.Qd=[];this.Wb=0;this.te=-1;this.Jb=null}function lh(a,b,c){a.te=b;a.Jb=c;a.te<a.Wb&&(a.Jb(),a.Jb=null)}function mh(a,b,c){for(a.Qd[b]=c;a.Qd[a.Wb];){var d=a.Qd[a.Wb];delete a.Qd[a.Wb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;gc(function(){f.nc(d[e])})}if(a.Wb===a.te){a.Jb&&(clearTimeout(a.Jb),a.Jb(),a.Jb=null);break}a.Wb++}};function nh(a,b,c,d){this.ue=a;this.f=pd(a);this.rb=this.sb=0;this.Xa=uc(b);this.Xf=c;this.Kc=!1;this.Fb=d;this.ld=function(a){return fd(b,hd,a)}}var oh,ph;
nh.prototype.open=function(a,b){this.mf=0;this.na=b;this.Ef=new kh(a);this.Db=!1;var c=this;this.ub=setTimeout(function(){c.f("Timed out trying to connect.");c.bb();c.ub=null},Math.floor(3E4));ud(function(){if(!c.Db){c.Wa=new qh(function(a,b,d,k,m){rh(c,arguments);if(c.Wa)if(c.ub&&(clearTimeout(c.ub),c.ub=null),c.Kc=!0,"start"==a)c.id=b,c.Mf=d;else if("close"===a)b?(c.Wa.$d=!1,lh(c.Ef,b,function(){c.bb()})):c.bb();else throw Error("Unrecognized command received: "+a);},function(a,b){rh(c,arguments);
mh(c.Ef,a,b)},function(){c.bb()},c.ld);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Wa.ke&&(a.cb=c.Wa.ke);a.v="5";c.Xf&&(a.s=c.Xf);c.Fb&&(a.ls=c.Fb);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.ld(a);c.f("Connecting via long-poll to "+a);sh(c.Wa,a,function(){})}})};
nh.prototype.start=function(){var a=this.Wa,b=this.Mf;a.Fg=this.id;a.Gg=b;for(a.oe=!0;th(a););a=this.id;b=this.Mf;this.kc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.kc.src=this.ld(c);this.kc.style.display="none";document.body.appendChild(this.kc)};
nh.isAvailable=function(){return oh||!ph&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.jh)&&!0};h=nh.prototype;h.Hd=function(){};h.fd=function(){this.Db=!0;this.Wa&&(this.Wa.close(),this.Wa=null);this.kc&&(document.body.removeChild(this.kc),this.kc=null);this.ub&&(clearTimeout(this.ub),this.ub=null)};
h.bb=function(){this.Db||(this.f("Longpoll is closing itself"),this.fd(),this.na&&(this.na(this.Kc),this.na=null))};h.close=function(){this.Db||(this.f("Longpoll is being closed."),this.fd())};h.send=function(a){a=G(a);this.sb+=a.length;rc(this.Xa,"bytes_sent",a.length);a=Ob(a);a=nb(a,!0);a=yd(a,1840);for(var b=0;b<a.length;b++){var c=this.Wa;c.cd.push({Xg:this.mf,gh:a.length,of:a[b]});c.oe&&th(c);this.mf++}};function rh(a,b){var c=G(b).length;a.rb+=c;rc(a.Xa,"bytes_received",c)}
function qh(a,b,c,d){this.ld=d;this.lb=c;this.Te=new ug;this.cd=[];this.we=Math.floor(1E8*Math.random());this.$d=!0;this.ke=id();window["pLPCommand"+this.ke]=a;window["pRTLPCB"+this.ke]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||fc("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
a.contentDocument?a.jb=a.contentDocument:a.contentWindow?a.jb=a.contentWindow.document:a.document&&(a.jb=a.document);this.Ga=a;a="";this.Ga.src&&"javascript:"===this.Ga.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ga.jb.open(),this.Ga.jb.write(a),this.Ga.jb.close()}catch(f){fc("frame writing exception"),f.stack&&fc(f.stack),fc(f)}}
qh.prototype.close=function(){this.oe=!1;if(this.Ga){this.Ga.jb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ga&&(document.body.removeChild(a.Ga),a.Ga=null)},Math.floor(0))}var b=this.lb;b&&(this.lb=null,b())};
function th(a){if(a.oe&&a.$d&&a.Te.count()<(0<a.cd.length?2:1)){a.we++;var b={};b.id=a.Fg;b.pw=a.Gg;b.ser=a.we;for(var b=a.ld(b),c="",d=0;0<a.cd.length;)if(1870>=a.cd[0].of.length+30+c.length){var e=a.cd.shift(),c=c+"&seg"+d+"="+e.Xg+"&ts"+d+"="+e.gh+"&d"+d+"="+e.of;d++}else break;uh(a,b+c,a.we);return!0}return!1}function uh(a,b,c){function d(){a.Te.remove(c);th(a)}a.Te.add(c,1);var e=setTimeout(d,Math.floor(25E3));sh(a,b,function(){clearTimeout(e);d()})}
function sh(a,b,c){setTimeout(function(){try{if(a.$d){var d=a.Ga.jb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){fc("Long-poll script failed to load: "+b);a.$d=!1;a.close()};a.Ga.jb.body.appendChild(d)}}catch(e){}},Math.floor(1))};var vh=null;"undefined"!==typeof MozWebSocket?vh=MozWebSocket:"undefined"!==typeof WebSocket&&(vh=WebSocket);function wh(a,b,c,d){this.ue=a;this.f=pd(this.ue);this.frames=this.Nc=null;this.rb=this.sb=this.ff=0;this.Xa=uc(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.jf=fd(b,gd,a)}var xh;
wh.prototype.open=function(a,b){this.lb=b;this.Kg=a;this.f("Websocket connecting to "+this.jf);this.Kc=!1;bd.set("previous_websocket_failure",!0);try{this.La=new vh(this.jf)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.bb();return}var e=this;this.La.onopen=function(){e.f("Websocket connected.");e.Kc=!0};this.La.onclose=function(){e.f("Websocket connection was disconnected.");e.La=null;e.bb()};this.La.onmessage=function(a){if(null!==e.La)if(a=a.data,e.rb+=
a.length,rc(e.Xa,"bytes_received",a.length),yh(e),null!==e.frames)zh(e,a);else{a:{O(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.ff=b;e.frames=[];a=null;break a}}e.ff=1;e.frames=[]}null!==a&&zh(e,a)}};this.La.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.bb()}};wh.prototype.start=function(){};
wh.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==vh&&!xh};wh.responsesRequiredToBeHealthy=2;wh.healthyTimeout=3E4;h=wh.prototype;h.Hd=function(){bd.remove("previous_websocket_failure")};function zh(a,b){a.frames.push(b);if(a.frames.length==a.ff){var c=a.frames.join("");a.frames=null;c=Rb(c);a.Kg(c)}}
h.send=function(a){yh(this);a=G(a);this.sb+=a.length;rc(this.Xa,"bytes_sent",a.length);a=yd(a,16384);1<a.length&&Ah(this,String(a.length));for(var b=0;b<a.length;b++)Ah(this,a[b])};h.fd=function(){this.Db=!0;this.Nc&&(clearInterval(this.Nc),this.Nc=null);this.La&&(this.La.close(),this.La=null)};h.bb=function(){this.Db||(this.f("WebSocket is closing itself"),this.fd(),this.lb&&(this.lb(this.Kc),this.lb=null))};h.close=function(){this.Db||(this.f("WebSocket is being closed"),this.fd())};
function yh(a){clearInterval(a.Nc);a.Nc=setInterval(function(){a.La&&Ah(a,"0");yh(a)},Math.floor(45E3))}function Ah(a,b){try{a.La.send(b)}catch(c){a.f("Exception thrown from WebSocket.send():",c.message||c.data,"Closing connection."),setTimeout(u(a.bb,a),0)}};function Bh(a){Ch(this,a)}var Dh=[nh,wh];function Ch(a,b){var c=wh&&wh.isAvailable(),d=c&&!(bd.Af||!0===bd.get("previous_websocket_failure"));b.ih&&(c||S("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.jd=[wh];else{var e=a.jd=[];zd(Dh,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function Eh(a){if(0<a.jd.length)return a.jd[0];throw Error("No transports available");};function Fh(a,b,c,d,e,f,g){this.id=a;this.f=pd("c:"+this.id+":");this.nc=c;this.Zc=d;this.na=e;this.Re=f;this.G=b;this.Pd=[];this.kf=0;this.Wf=new Bh(b);this.N=0;this.Fb=g;this.f("Connection created");Gh(this)}
function Gh(a){var b=Eh(a.Wf);a.K=new b("c:"+a.id+":"+a.kf++,a.G,void 0,a.Fb);a.Ve=b.responsesRequiredToBeHealthy||0;var c=Hh(a,a.K),d=Ih(a,a.K);a.kd=a.K;a.ed=a.K;a.F=null;a.Eb=!1;setTimeout(function(){a.K&&a.K.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.Bd=setTimeout(function(){a.Bd=null;a.Eb||(a.K&&102400<a.K.rb?(a.f("Connection exceeded healthy timeout but has received "+a.K.rb+" bytes.  Marking connection healthy."),a.Eb=!0,a.K.Hd()):a.K&&10240<a.K.sb?a.f("Connection exceeded healthy timeout but has sent "+
a.K.sb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function Ih(a,b){return function(c){b===a.K?(a.K=null,c||0!==a.N?1===a.N&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.G.ab.substr(0,2)&&(bd.remove("host:"+a.G.host),a.G.ab=a.G.host)),a.close()):b===a.F?(a.f("Secondary connection lost."),c=a.F,a.F=null,a.kd!==c&&a.ed!==c||a.close()):a.f("closing an old connection")}}
function Hh(a,b){return function(c){if(2!=a.N)if(b===a.ed){var d=wd("t",c);c=wd("d",c);if("c"==d){if(d=wd("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.Uf=c.s;ed(a.G,f);0==a.N&&(a.K.start(),Jh(a,a.K,d),"5"!==e&&S("Protocol version mismatch detected"),c=a.Wf,(c=1<c.jd.length?c.jd[1]:null)&&Kh(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.ed=a.F;for(c=0;c<a.Pd.length;++c)a.Ld(a.Pd[c]);a.Pd=[];Lh(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
a.Re&&(a.Re(c),a.Re=null),a.na=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),ed(a.G,c),1===a.N?a.close():(Mh(a),Gh(a))):"e"===d?qd("Server Error: "+c):"o"===d?(a.f("got pong on primary."),Nh(a),Oh(a)):qd("Unknown control packet command: "+d)}else"d"==d&&a.Ld(c)}else if(b===a.F)if(d=wd("t",c),c=wd("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?Ph(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.F.close(),a.kd!==a.F&&a.ed!==a.F||a.close()):"o"===c&&(a.f("got pong on secondary."),
a.Tf--,Ph(a)));else if("d"==d)a.Pd.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}Fh.prototype.Ia=function(a){Qh(this,{t:"d",d:a})};function Lh(a){a.kd===a.F&&a.ed===a.F&&(a.f("cleaning up and promoting a connection: "+a.F.ue),a.K=a.F,a.F=null)}
function Ph(a){0>=a.Tf?(a.f("Secondary connection is healthy."),a.Eb=!0,a.F.Hd(),a.F.start(),a.f("sending client ack on secondary"),a.F.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.K.send({t:"c",d:{t:"n",d:{}}}),a.kd=a.F,Lh(a)):(a.f("sending ping on secondary."),a.F.send({t:"c",d:{t:"p",d:{}}}))}Fh.prototype.Ld=function(a){Nh(this);this.nc(a)};function Nh(a){a.Eb||(a.Ve--,0>=a.Ve&&(a.f("Primary connection is healthy."),a.Eb=!0,a.K.Hd()))}
function Kh(a,b){a.F=new b("c:"+a.id+":"+a.kf++,a.G,a.Uf);a.Tf=b.responsesRequiredToBeHealthy||0;a.F.open(Hh(a,a.F),Ih(a,a.F));setTimeout(function(){a.F&&(a.f("Timed out trying to upgrade."),a.F.close())},Math.floor(6E4))}function Jh(a,b,c){a.f("Realtime connection established.");a.K=b;a.N=1;a.Zc&&(a.Zc(c,a.Uf),a.Zc=null);0===a.Ve?(a.f("Primary connection is healthy."),a.Eb=!0):setTimeout(function(){Oh(a)},Math.floor(5E3))}
function Oh(a){a.Eb||1!==a.N||(a.f("sending ping on primary."),Qh(a,{t:"c",d:{t:"p",d:{}}}))}function Qh(a,b){if(1!==a.N)throw"Connection is not connected";a.kd.send(b)}Fh.prototype.close=function(){2!==this.N&&(this.f("Closing realtime connection."),this.N=2,Mh(this),this.na&&(this.na(),this.na=null))};function Mh(a){a.f("Shutting down all connections");a.K&&(a.K.close(),a.K=null);a.F&&(a.F.close(),a.F=null);a.Bd&&(clearTimeout(a.Bd),a.Bd=null)};function Rh(a,b,c,d){this.id=Sh++;this.f=pd("p:"+this.id+":");this.Bf=this.Ie=!1;this.ba={};this.sa=[];this.ad=0;this.Yc=[];this.qa=!1;this.eb=1E3;this.Id=3E5;this.Kb=b;this.Xc=c;this.Se=d;this.G=a;this.wb=this.Ca=this.Ma=this.Fb=this.$e=null;this.Sb=!1;this.Wd={};this.Wg=0;this.rf=!0;this.Oc=this.Ke=null;Th(this,0);kf.yb().Ib("visible",this.Ng,this);-1===a.host.indexOf("fblocal")&&jf.yb().Ib("online",this.Lg,this)}var Sh=0,Uh=0;h=Rh.prototype;
h.Ia=function(a,b,c){var d=++this.Wg;a={r:d,a:a,b:b};this.f(G(a));O(this.qa,"sendRequest call when we're not connected not allowed.");this.Ma.Ia(a);c&&(this.Wd[d]=c)};h.Cf=function(a,b,c,d){var e=a.wa(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.ba[f]=this.ba[f]||{};O(Ie(a.n)||!He(a.n),"listen() called for non-default but complete query");O(!this.ba[f][e],"listen() called twice for same path/queryId.");a={I:d,Ad:b,Tg:a,tag:c};this.ba[f][e]=a;this.qa&&Vh(this,a)};
function Vh(a,b){var c=b.Tg,d=c.path.toString(),e=c.wa();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=Ge(c.n),f.t=b.tag);f.h=b.Ad();a.Ia("q",f,function(f){var k=f.d,m=f.s;if(k&&"object"===typeof k&&y(k,"w")){var l=z(k,"w");da(l)&&0<=La(l,"no_index")&&S("Using an unspecified index. Consider adding "+('".indexOn": "'+c.n.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.ba[d]&&a.ba[d][e])===b&&(a.f("listen response",f),"ok"!==m&&Wh(a,d,e),b.I&&
b.I(m,k))})}h.O=function(a,b,c){this.Ca={rg:a,sf:!1,Dc:b,od:c};this.f("Authenticating using credential: "+a);Xh(this);(b=40==a.length)||(a=Cd(a).Ec,b="object"===typeof a&&!0===z(a,"admin"));b&&(this.f("Admin auth credential detected.  Reducing max reconnect time."),this.Id=3E4)};h.je=function(a){this.Ca=null;this.qa&&this.Ia("unauth",{},function(b){a(b.s,b.d)})};
function Xh(a){var b=a.Ca;a.qa&&b&&a.Ia("auth",{cred:b.rg},function(c){var d=c.s;c=c.d||"error";"ok"!==d&&a.Ca===b&&(a.Ca=null);b.sf?"ok"!==d&&b.od&&b.od(d,c):(b.sf=!0,b.Dc&&b.Dc(d,c))})}h.$f=function(a,b){var c=a.path.toString(),d=a.wa();this.f("Unlisten called for "+c+" "+d);O(Ie(a.n)||!He(a.n),"unlisten() called for non-default but complete query");if(Wh(this,c,d)&&this.qa){var e=Ge(a.n);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.Ia("n",c)}};
h.Qe=function(a,b,c){this.qa?Yh(this,"o",a,b,c):this.Yc.push({bd:a,action:"o",data:b,I:c})};h.Gf=function(a,b,c){this.qa?Yh(this,"om",a,b,c):this.Yc.push({bd:a,action:"om",data:b,I:c})};h.Md=function(a,b){this.qa?Yh(this,"oc",a,null,b):this.Yc.push({bd:a,action:"oc",data:null,I:b})};function Yh(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.Ia(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}h.put=function(a,b,c,d){Zh(this,"p",a,b,c,d)};
h.Df=function(a,b,c,d){Zh(this,"m",a,b,c,d)};function Zh(a,b,c,d,e,f){d={p:c,d:d};p(f)&&(d.h=f);a.sa.push({action:b,Pf:d,I:e});a.ad++;b=a.sa.length-1;a.qa?$h(a,b):a.f("Buffering put: "+c)}function $h(a,b){var c=a.sa[b].action,d=a.sa[b].Pf,e=a.sa[b].I;a.sa[b].Ug=a.qa;a.Ia(c,d,function(d){a.f(c+" response",d);delete a.sa[b];a.ad--;0===a.ad&&(a.sa=[]);e&&e(d.s,d.d)})}
h.Ye=function(a){this.qa&&(a={c:a},this.f("reportStats",a),this.Ia("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
h.Ld=function(a){if("r"in a){this.f("from server: "+G(a));var b=a.r,c=this.Wd[b];c&&(delete this.Wd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,c=a.b,this.f("handleServerMessage",b,c),"d"===b?this.Kb(c.p,c.d,!1,c.t):"m"===b?this.Kb(c.p,c.d,!0,c.t):"c"===b?ai(this,c.p,c.q):"ac"===b?(a=c.s,b=c.d,c=this.Ca,this.Ca=null,c&&c.od&&c.od(a,b)):"sd"===b?this.$e?this.$e(c):"msg"in c&&"undefined"!==typeof console&&console.log("FIREBASE: "+c.msg.replace("\n",
"\nFIREBASE: ")):qd("Unrecognized action received from server: "+G(b)+"\nAre you using the latest client?"))}};h.Zc=function(a,b){this.f("connection ready");this.qa=!0;this.Oc=(new Date).getTime();this.Se({serverTimeOffset:a-(new Date).getTime()});this.Fb=b;if(this.rf){var c={};c["sdk.js."+Eb.replace(/\./g,"-")]=1;Dg()?c["framework.cordova"]=1:"object"===typeof navigator&&"ReactNative"===navigator.product&&(c["framework.reactnative"]=1);this.Ye(c)}bi(this);this.rf=!1;this.Xc(!0)};
function Th(a,b){O(!a.Ma,"Scheduling a connect when we're already connected/ing?");a.wb&&clearTimeout(a.wb);a.wb=setTimeout(function(){a.wb=null;ci(a)},Math.floor(b))}h.Ng=function(a){a&&!this.Sb&&this.eb===this.Id&&(this.f("Window became visible.  Reducing delay."),this.eb=1E3,this.Ma||Th(this,0));this.Sb=a};h.Lg=function(a){a?(this.f("Browser went online."),this.eb=1E3,this.Ma||Th(this,0)):(this.f("Browser went offline.  Killing connection."),this.Ma&&this.Ma.close())};
h.If=function(){this.f("data client disconnected");this.qa=!1;this.Ma=null;for(var a=0;a<this.sa.length;a++){var b=this.sa[a];b&&"h"in b.Pf&&b.Ug&&(b.I&&b.I("disconnect"),delete this.sa[a],this.ad--)}0===this.ad&&(this.sa=[]);this.Wd={};di(this)&&(this.Sb?this.Oc&&(3E4<(new Date).getTime()-this.Oc&&(this.eb=1E3),this.Oc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.eb=this.Id,this.Ke=(new Date).getTime()),a=Math.max(0,this.eb-((new Date).getTime()-this.Ke)),a*=Math.random(),this.f("Trying to reconnect in "+
a+"ms"),Th(this,a),this.eb=Math.min(this.Id,1.3*this.eb));this.Xc(!1)};function ci(a){if(di(a)){a.f("Making a connection attempt");a.Ke=(new Date).getTime();a.Oc=null;var b=u(a.Ld,a),c=u(a.Zc,a),d=u(a.If,a),e=a.id+":"+Uh++;a.Ma=new Fh(e,a.G,b,c,d,function(b){S(b+" ("+a.G.toString()+")");a.Bf=!0},a.Fb)}}h.Cb=function(){this.Ie=!0;this.Ma?this.Ma.close():(this.wb&&(clearTimeout(this.wb),this.wb=null),this.qa&&this.If())};h.vc=function(){this.Ie=!1;this.eb=1E3;this.Ma||Th(this,0)};
function ai(a,b,c){c=c?Oa(c,function(a){return xd(a)}).join("$"):"default";(a=Wh(a,b,c))&&a.I&&a.I("permission_denied")}function Wh(a,b,c){b=(new P(b)).toString();var d;p(a.ba[b])?(d=a.ba[b][c],delete a.ba[b][c],0===oa(a.ba[b])&&delete a.ba[b]):d=void 0;return d}function bi(a){Xh(a);v(a.ba,function(b){v(b,function(b){Vh(a,b)})});for(var b=0;b<a.sa.length;b++)a.sa[b]&&$h(a,b);for(;a.Yc.length;)b=a.Yc.shift(),Yh(a,b.action,b.bd,b.data,b.I)}function di(a){var b;b=jf.yb().oc;return!a.Bf&&!a.Ie&&b};var U={zg:function(){oh=xh=!0}};U.forceLongPolling=U.zg;U.Ag=function(){ph=!0};U.forceWebSockets=U.Ag;U.$g=function(a,b){a.k.Va.$e=b};U.setSecurityDebugCallback=U.$g;U.bf=function(a,b){a.k.bf(b)};U.stats=U.bf;U.cf=function(a,b){a.k.cf(b)};U.statsIncrementCounter=U.cf;U.ud=function(a){return a.k.ud};U.dataUpdateCount=U.ud;U.Dg=function(a,b){a.k.He=b};U.interceptServerData=U.Dg;U.Jg=function(a){new Og(a)};U.onPopupOpen=U.Jg;U.Yg=function(a){xg=a};U.setAuthenticationServer=U.Yg;function ei(a,b){this.committed=a;this.snapshot=b};function V(a,b){this.dd=a;this.ta=b}V.prototype.cancel=function(a){D("Firebase.onDisconnect().cancel",0,1,arguments.length);F("Firebase.onDisconnect().cancel",1,a,!0);var b=new B;this.dd.Md(this.ta,C(b,a));return b.D};V.prototype.cancel=V.prototype.cancel;V.prototype.remove=function(a){D("Firebase.onDisconnect().remove",0,1,arguments.length);og("Firebase.onDisconnect().remove",this.ta);F("Firebase.onDisconnect().remove",1,a,!0);var b=new B;fi(this.dd,this.ta,null,C(b,a));return b.D};
V.prototype.remove=V.prototype.remove;V.prototype.set=function(a,b){D("Firebase.onDisconnect().set",1,2,arguments.length);og("Firebase.onDisconnect().set",this.ta);gg("Firebase.onDisconnect().set",a,this.ta,!1);F("Firebase.onDisconnect().set",2,b,!0);var c=new B;fi(this.dd,this.ta,a,C(c,b));return c.D};V.prototype.set=V.prototype.set;
V.prototype.Ob=function(a,b,c){D("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);og("Firebase.onDisconnect().setWithPriority",this.ta);gg("Firebase.onDisconnect().setWithPriority",a,this.ta,!1);kg("Firebase.onDisconnect().setWithPriority",2,b);F("Firebase.onDisconnect().setWithPriority",3,c,!0);var d=new B;gi(this.dd,this.ta,a,b,C(d,c));return d.D};V.prototype.setWithPriority=V.prototype.Ob;
V.prototype.update=function(a,b){D("Firebase.onDisconnect().update",1,2,arguments.length);og("Firebase.onDisconnect().update",this.ta);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;S("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}jg("Firebase.onDisconnect().update",a,this.ta);F("Firebase.onDisconnect().update",2,b,!0);
c=new B;hi(this.dd,this.ta,a,C(c,b));return c.D};V.prototype.update=V.prototype.update;function W(a,b,c){this.A=a;this.Y=b;this.g=c}W.prototype.J=function(){D("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.J()};W.prototype.val=W.prototype.J;W.prototype.qf=function(){D("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.J(!0)};W.prototype.exportVal=W.prototype.qf;W.prototype.xg=function(){D("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};W.prototype.exists=W.prototype.xg;
W.prototype.o=function(a){D("Firebase.DataSnapshot.child",0,1,arguments.length);fa(a)&&(a=String(a));ng("Firebase.DataSnapshot.child",a);var b=new P(a),c=this.Y.o(b);return new W(this.A.S(b),c,R)};W.prototype.child=W.prototype.o;W.prototype.Fa=function(a){D("Firebase.DataSnapshot.hasChild",1,1,arguments.length);ng("Firebase.DataSnapshot.hasChild",a);var b=new P(a);return!this.A.S(b).e()};W.prototype.hasChild=W.prototype.Fa;
W.prototype.C=function(){D("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().J()};W.prototype.getPriority=W.prototype.C;W.prototype.forEach=function(a){D("Firebase.DataSnapshot.forEach",1,1,arguments.length);F("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.L())return!1;var b=this;return!!this.A.R(this.g,function(c,d){return a(new W(d,b.Y.o(c),R))})};W.prototype.forEach=W.prototype.forEach;
W.prototype.zd=function(){D("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.L()?!1:!this.A.e()};W.prototype.hasChildren=W.prototype.zd;W.prototype.name=function(){S("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");D("Firebase.DataSnapshot.name",0,0,arguments.length);return this.key()};W.prototype.name=W.prototype.name;W.prototype.key=function(){D("Firebase.DataSnapshot.key",0,0,arguments.length);return this.Y.key()};
W.prototype.key=W.prototype.key;W.prototype.Hb=function(){D("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Hb()};W.prototype.numChildren=W.prototype.Hb;W.prototype.Mb=function(){D("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.Y};W.prototype.ref=W.prototype.Mb;function ii(a,b,c){this.Vb=a;this.tb=b;this.vb=c||null}h=ii.prototype;h.Qf=function(a){return"value"===a};h.createEvent=function(a,b){var c=b.n.g;return new jc("value",this,new W(a.Na,b.Mb(),c))};h.Zb=function(a){var b=this.vb;if("cancel"===a.De()){O(this.tb,"Raising a cancel event on a listener with no cancel callback");var c=this.tb;return function(){c.call(b,a.error)}}var d=this.Vb;return function(){d.call(b,a.be)}};h.lf=function(a,b){return this.tb?new kc(this,a,b):null};
h.matches=function(a){return a instanceof ii?a.Vb&&this.Vb?a.Vb===this.Vb&&a.vb===this.vb:!0:!1};h.yf=function(){return null!==this.Vb};function ji(a,b,c){this.ja=a;this.tb=b;this.vb=c}h=ji.prototype;h.Qf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ja};h.lf=function(a,b){return this.tb?new kc(this,a,b):null};
h.createEvent=function(a,b){O(null!=a.Za,"Child events should have a childName.");var c=b.Mb().o(a.Za);return new jc(a.type,this,new W(a.Na,c,b.n.g),a.Td)};h.Zb=function(a){var b=this.vb;if("cancel"===a.De()){O(this.tb,"Raising a cancel event on a listener with no cancel callback");var c=this.tb;return function(){c.call(b,a.error)}}var d=this.ja[a.wd];return function(){d.call(b,a.be,a.Td)}};
h.matches=function(a){if(a instanceof ji){if(!this.ja||!a.ja)return!0;if(this.vb===a.vb){var b=oa(a.ja);if(b===oa(this.ja)){if(1===b){var b=pa(a.ja),c=pa(this.ja);return c===b&&(!a.ja[b]||!this.ja[c]||a.ja[b]===this.ja[c])}return na(this.ja,function(b,c){return a.ja[c]===b})}}}return!1};h.yf=function(){return null!==this.ja};function ki(){this.za={}}h=ki.prototype;h.e=function(){return va(this.za)};h.gb=function(a,b,c){var d=a.source.Lb;if(null!==d)return d=z(this.za,d),O(null!=d,"SyncTree gave us an op for an invalid query."),d.gb(a,b,c);var e=[];v(this.za,function(d){e=e.concat(d.gb(a,b,c))});return e};h.Tb=function(a,b,c,d,e){var f=a.wa(),g=z(this.za,f);if(!g){var g=c.Aa(e?d:null),k=!1;g?k=!0:(g=d instanceof fe?c.Cc(d):H,k=!1);g=new Ye(a,new je(new Xb(g,k,!1),new Xb(d,e,!1)));this.za[f]=g}g.Tb(b);return af(g,b)};
h.nb=function(a,b,c){var d=a.wa(),e=[],f=[],g=null!=li(this);if("default"===d){var k=this;v(this.za,function(a,d){f=f.concat(a.nb(b,c));a.e()&&(delete k.za[d],He(a.Y.n)||e.push(a.Y))})}else{var m=z(this.za,d);m&&(f=f.concat(m.nb(b,c)),m.e()&&(delete this.za[d],He(m.Y.n)||e.push(m.Y)))}g&&null==li(this)&&e.push(new X(a.k,a.path));return{Vg:e,vg:f}};function mi(a){return Na(qa(a.za),function(a){return!He(a.Y.n)})}h.kb=function(a){var b=null;v(this.za,function(c){b=b||c.kb(a)});return b};
function ni(a,b){if(He(b.n))return li(a);var c=b.wa();return z(a.za,c)}function li(a){return ua(a.za,function(a){return He(a.Y.n)})||null};function oi(a){this.va=qe;this.mb=new Pf;this.df={};this.qc={};this.Qc=a}function pi(a,b,c,d,e){var f=a.mb,g=e;O(d>f.Pc,"Stacking an older write on top of newer ones");p(g)||(g=!0);f.pa.push({path:b,Ja:c,md:d,visible:g});g&&(f.V=Jf(f.V,b,c));f.Pc=d;return e?qi(a,new Ac(Ef,b,c)):[]}function ri(a,b,c,d){var e=a.mb;O(d>e.Pc,"Stacking an older merge on top of newer ones");e.pa.push({path:b,children:c,md:d,visible:!0});e.V=Kf(e.V,b,c);e.Pc=d;c=sf(c);return qi(a,new bf(Ef,b,c))}
function si(a,b,c){c=c||!1;var d=Qf(a.mb,b);if(a.mb.Ud(b)){var e=qe;null!=d.Ja?e=e.set(M,!0):Fb(d.children,function(a,b){e=e.set(new P(a),b)});return qi(a,new Df(d.path,e,c))}return[]}function ti(a,b,c){c=sf(c);return qi(a,new bf(Gf,b,c))}function ui(a,b,c,d){d=vi(a,d);if(null!=d){var e=wi(d);d=e.path;e=e.Lb;b=lf(d,b);c=new Ac(new Ff(!1,!0,e,!0),b,c);return xi(a,d,c)}return[]}
function yi(a,b,c,d){if(d=vi(a,d)){var e=wi(d);d=e.path;e=e.Lb;b=lf(d,b);c=sf(c);c=new bf(new Ff(!1,!0,e,!0),b,c);return xi(a,d,c)}return[]}
oi.prototype.Tb=function(a,b){var c=a.path,d=null,e=!1;zf(this.va,c,function(a,b){var f=lf(a,c);d=d||b.kb(f);e=e||null!=li(b)});var f=this.va.get(c);f?(e=e||null!=li(f),d=d||f.kb(M)):(f=new ki,this.va=this.va.set(c,f));var g;null!=d?g=!0:(g=!1,d=H,Cf(this.va.subtree(c),function(a,b){var c=b.kb(M);c&&(d=d.W(a,c))}));var k=null!=ni(f,a);if(!k&&!He(a.n)){var m=zi(a);O(!(m in this.qc),"View does not exist, but we have a tag");var l=Ai++;this.qc[m]=l;this.df["_"+l]=m}g=f.Tb(a,b,new Uf(c,this.mb),d,g);
k||e||(f=ni(f,a),g=g.concat(Bi(this,a,f)));return g};
oi.prototype.nb=function(a,b,c){var d=a.path,e=this.va.get(d),f=[];if(e&&("default"===a.wa()||null!=ni(e,a))){f=e.nb(a,b,c);e.e()&&(this.va=this.va.remove(d));e=f.Vg;f=f.vg;b=-1!==Sa(e,function(a){return He(a.n)});var g=xf(this.va,d,function(a,b){return null!=li(b)});if(b&&!g&&(d=this.va.subtree(d),!d.e()))for(var d=Ci(d),k=0;k<d.length;++k){var m=d[k],l=m.Y,m=Di(this,m);this.Qc.af(Ei(l),Fi(this,l),m.Ad,m.I)}if(!g&&0<e.length&&!c)if(b)this.Qc.de(Ei(a),null);else{var t=this;Ma(e,function(a){a.wa();
var b=t.qc[zi(a)];t.Qc.de(Ei(a),b)})}Gi(this,e)}return f};oi.prototype.Aa=function(a,b){var c=this.mb,d=xf(this.va,a,function(b,c){var d=lf(b,a);if(d=c.kb(d))return d});return c.Aa(a,d,b,!0)};function Ci(a){return vf(a,function(a,c,d){if(c&&null!=li(c))return[li(c)];var e=[];c&&(e=mi(c));v(d,function(a){e=e.concat(a)});return e})}function Gi(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!He(d.n)){var d=zi(d),e=a.qc[d];delete a.qc[d];delete a.df["_"+e]}}}
function Ei(a){return He(a.n)&&!Ie(a.n)?a.Mb():a}function Bi(a,b,c){var d=b.path,e=Fi(a,b);c=Di(a,c);b=a.Qc.af(Ei(b),e,c.Ad,c.I);d=a.va.subtree(d);if(e)O(null==li(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=vf(d,function(a,b,c){if(!a.e()&&b&&null!=li(b))return[Ze(li(b))];var d=[];b&&(d=d.concat(Oa(mi(b),function(a){return a.Y})));v(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Qc.de(Ei(c),Fi(a,c));return b}
function Di(a,b){var c=b.Y,d=Fi(a,c);return{Ad:function(){return(b.w()||H).hash()},I:function(b){if("ok"===b){if(d){var f=c.path;if(b=vi(a,d)){var g=wi(b);b=g.path;g=g.Lb;f=lf(b,f);f=new Cc(new Ff(!1,!0,g,!0),f);b=xi(a,b,f)}else b=[]}else b=qi(a,new Cc(Gf,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
(f="The service is unavailable");f=Error(b+" at "+c.path.toString()+": "+f);f.code=b.toUpperCase();return a.nb(c,null,f)}}}function zi(a){return a.path.toString()+"$"+a.wa()}function wi(a){var b=a.indexOf("$");O(-1!==b&&b<a.length-1,"Bad queryKey.");return{Lb:a.substr(b+1),path:new P(a.substr(0,b))}}function vi(a,b){var c=a.df,d="_"+b;return d in c?c[d]:void 0}function Fi(a,b){var c=zi(b);return z(a.qc,c)}var Ai=1;
function xi(a,b,c){var d=a.va.get(b);O(d,"Missing sync point for query tag that we're tracking");return d.gb(c,new Uf(b,a.mb),null)}function qi(a,b){return Hi(a,b,a.va,null,new Uf(M,a.mb))}function Hi(a,b,c,d,e){if(b.path.e())return Ii(a,b,c,d,e);var f=c.get(M);null==d&&null!=f&&(d=f.kb(M));var g=[],k=K(b.path),m=b.$c(k);if((c=c.children.get(k))&&m)var l=d?d.T(k):null,k=e.o(k),g=g.concat(Hi(a,m,c,l,k));f&&(g=g.concat(f.gb(b,e,d)));return g}
function Ii(a,b,c,d,e){var f=c.get(M);null==d&&null!=f&&(d=f.kb(M));var g=[];c.children.ka(function(c,f){var l=d?d.T(c):null,t=e.o(c),A=b.$c(c);A&&(g=g.concat(Ii(a,A,f,l,t)))});f&&(g=g.concat(f.gb(b,e,d)));return g};function Ji(a,b){this.G=a;this.Xa=uc(a);this.hd=null;this.fa=new Zb;this.Kd=1;this.Va=null;b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)?(this.da=new cf(this.G,u(this.Kb,this)),setTimeout(u(this.Xc,this,!0),0)):this.da=this.Va=new Rh(this.G,u(this.Kb,this),u(this.Xc,this),u(this.Se,this));this.dh=vc(a,u(function(){return new pc(this.Xa,this.da)},this));this.yc=new Wf;
this.Ge=new Sb;var c=this;this.Fd=new oi({af:function(a,b,f,g){b=[];f=c.Ge.j(a.path);f.e()||(b=qi(c.Fd,new Ac(Gf,a.path,f)),setTimeout(function(){g("ok")},0));return b},de:aa});Ki(this,"connected",!1);this.na=new Vc;this.O=new Yg(a,u(this.da.O,this.da),u(this.da.je,this.da),u(this.Pe,this));this.ud=0;this.He=null;this.M=new oi({af:function(a,b,f,g){c.da.Cf(a,f,b,function(b,e){var f=g(b,e);dc(c.fa,a.path,f)});return[]},de:function(a,b){c.da.$f(a,b)}})}h=Ji.prototype;
h.toString=function(){return(this.G.ob?"https://":"http://")+this.G.host};h.name=function(){return this.G.lc};function Li(a){a=a.Ge.j(new P(".info/serverTimeOffset")).J()||0;return(new Date).getTime()+a}function Mi(a){a=a={timestamp:Li(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
h.Kb=function(a,b,c,d){this.ud++;var e=new P(a);b=this.He?this.He(a,b):b;a=[];d?c?(b=ma(b,function(a){return Q(a)}),a=yi(this.M,e,b,d)):(b=Q(b),a=ui(this.M,e,b,d)):c?(d=ma(b,function(a){return Q(a)}),a=ti(this.M,e,d)):(d=Q(b),a=qi(this.M,new Ac(Gf,e,d)));d=e;0<a.length&&(d=Ni(this,e));dc(this.fa,d,a)};h.Xc=function(a){Ki(this,"connected",a);!1===a&&Oi(this)};h.Se=function(a){var b=this;zd(a,function(a,d){Ki(b,d,a)})};h.Pe=function(a){Ki(this,"authenticated",a)};
function Ki(a,b,c){b=new P("/.info/"+b);c=Q(c);var d=a.Ge;d.Zd=d.Zd.H(b,c);c=qi(a.Fd,new Ac(Gf,b,c));dc(a.fa,b,c)}h.Ob=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,mh:c});var e=Mi(this);b=Q(b,c);var e=Xc(b,e),f=this.Kd++,e=pi(this.M,a,e,f,!0);$b(this.fa,e);var g=this;this.da.put(a.toString(),b.J(!0),function(b,c){var e="ok"===b;e||S("set at "+a+" failed: "+b);e=si(g.M,f,!e);dc(g.fa,a,e);Pi(d,b,c)});e=Qi(this,a);Ni(this,e);dc(this.fa,e,[])};
h.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Mi(this),f={};v(b,function(a,b){d=!1;var c=Q(a);f[b]=Xc(c,e)});if(d)fc("update() called with empty data.  Don't do anything."),Pi(c,"ok");else{var g=this.Kd++,k=ri(this.M,a,f,g);$b(this.fa,k);var m=this;this.da.Df(a.toString(),b,function(b,d){var e="ok"===b;e||S("update at "+a+" failed: "+b);var e=si(m.M,g,!e),f=a;0<e.length&&(f=Ni(m,a));dc(m.fa,f,e);Pi(c,b,d)});b=Qi(this,a);Ni(this,b);dc(this.fa,a,[])}};
function Oi(a){a.f("onDisconnectEvents");var b=Mi(a),c=[];Wc(Uc(a.na,b),M,function(b,e){c=c.concat(qi(a.M,new Ac(Gf,b,e)));var f=Qi(a,b);Ni(a,f)});a.na=new Vc;dc(a.fa,M,c)}h.Md=function(a,b){var c=this;this.da.Md(a.toString(),function(d,e){"ok"===d&&wg(c.na,a);Pi(b,d,e)})};function fi(a,b,c,d){var e=Q(c);a.da.Qe(b.toString(),e.J(!0),function(c,g){"ok"===c&&a.na.rc(b,e);Pi(d,c,g)})}function gi(a,b,c,d,e){var f=Q(c,d);a.da.Qe(b.toString(),f.J(!0),function(c,d){"ok"===c&&a.na.rc(b,f);Pi(e,c,d)})}
function hi(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(fc("onDisconnect().update() called with empty data.  Don't do anything."),Pi(d,"ok")):a.da.Gf(b.toString(),c,function(e,f){if("ok"===e)for(var m in c){var l=Q(c[m]);a.na.rc(b.o(m),l)}Pi(d,e,f)})}function Ri(a,b,c){c=".info"===K(b.path)?a.Fd.Tb(b,c):a.M.Tb(b,c);bc(a.fa,b.path,c)}h.Cb=function(){this.Va&&this.Va.Cb()};h.vc=function(){this.Va&&this.Va.vc()};
h.bf=function(a){if("undefined"!==typeof console){a?(this.hd||(this.hd=new oc(this.Xa)),a=this.hd.get()):a=this.Xa.get();var b=Pa(ra(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};h.cf=function(a){rc(this.Xa,a);this.dh.Vf[a]=!0};h.f=function(a){var b="";this.Va&&(b=this.Va.id+":");fc(b,arguments)};
function Pi(a,b,c){a&&gc(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function Si(a,b,c,d,e){function f(){}a.f("transaction on "+b);var g=new X(a,b);g.Ib("value",f);c={path:b,update:c,I:d,status:null,Lf:id(),gf:e,Sf:0,le:function(){g.mc("value",f)},ne:null,Da:null,rd:null,sd:null,td:null};d=a.M.Aa(b,void 0)||H;c.rd=d;d=c.update(d.J());if(p(d)){hg("transaction failed: Data returned ",d,c.path);c.status=1;e=Xf(a.yc,b);var k=e.Ea()||[];k.push(c);Yf(e,k);"object"===typeof d&&null!==d&&y(d,".priority")?(k=z(d,".priority"),O(fg(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
k=(a.M.Aa(b)||H).C().J();e=Mi(a);d=Q(d,k);e=Xc(d,e);c.sd=d;c.td=e;c.Da=a.Kd++;c=pi(a.M,b,e,c.Da,c.gf);dc(a.fa,b,c);Ti(a)}else c.le(),c.sd=null,c.td=null,c.I&&(a=new W(c.rd,new X(a,c.path),R),c.I(null,!1,a))}function Ti(a,b){var c=b||a.yc;b||Ui(a,c);if(null!==c.Ea()){var d=Vi(a,c);O(0<d.length,"Sending zero length transaction queue");Qa(d,function(a){return 1===a.status})&&Wi(a,c.path(),d)}else c.zd()&&c.R(function(b){Ti(a,b)})}
function Wi(a,b,c){for(var d=Oa(c,function(a){return a.Da}),e=a.M.Aa(b,d)||H,d=e,e=e.hash(),f=0;f<c.length;f++){var g=c[f];O(1===g.status,"tryToSendTransactionQueue_: items in queue should all be run.");g.status=2;g.Sf++;var k=lf(b,g.path),d=d.H(k,g.sd)}d=d.J(!0);a.da.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(si(a.M,c[f].Da));if(c[f].I){var g=c[f].td,k=new X(a,c[f].path);d.push(u(c[f].I,
null,null,!0,new W(g,k,R)))}c[f].le()}Ui(a,Xf(a.yc,b));Ti(a);dc(a.fa,b,e);for(f=0;f<d.length;f++)gc(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(S("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].ne=d;Ni(a,b)}},e)}function Ni(a,b){var c=Xi(a,b),d=c.path(),c=Vi(a,c);Yi(a,c,d);return d}
function Yi(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Oa(b,function(a){return a.Da}),g=0;g<b.length;g++){var k=b[g],m=lf(c,k.path),l=!1,t;O(null!==m,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)l=!0,t=k.ne,e=e.concat(si(a.M,k.Da,!0));else if(1===k.status)if(25<=k.Sf)l=!0,t="maxretry",e=e.concat(si(a.M,k.Da,!0));else{var A=a.M.Aa(k.path,f)||H;k.rd=A;var I=b[g].update(A.J());p(I)?(hg("transaction failed: Data returned ",I,k.path),m=Q(I),"object"===typeof I&&null!=
I&&y(I,".priority")||(m=m.ia(A.C())),A=k.Da,I=Mi(a),I=Xc(m,I),k.sd=m,k.td=I,k.Da=a.Kd++,Ta(f,A),e=e.concat(pi(a.M,k.path,I,k.Da,k.gf)),e=e.concat(si(a.M,A,!0))):(l=!0,t="nodata",e=e.concat(si(a.M,k.Da,!0)))}dc(a.fa,c,e);e=[];l&&(b[g].status=3,setTimeout(b[g].le,Math.floor(0)),b[g].I&&("nodata"===t?(k=new X(a,b[g].path),d.push(u(b[g].I,null,null,!1,new W(b[g].rd,k,R)))):d.push(u(b[g].I,null,Error(t),!1,null))))}Ui(a,a.yc);for(g=0;g<d.length;g++)gc(d[g]);Ti(a)}}
function Xi(a,b){for(var c,d=a.yc;null!==(c=K(b))&&null===d.Ea();)d=Xf(d,c),b=N(b);return d}function Vi(a,b){var c=[];Zi(a,b,c);c.sort(function(a,b){return a.Lf-b.Lf});return c}function Zi(a,b,c){var d=b.Ea();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.R(function(b){Zi(a,b,c)})}function Ui(a,b){var c=b.Ea();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Yf(b,0<c.length?c:null)}b.R(function(b){Ui(a,b)})}
function Qi(a,b){var c=Xi(a,b).path(),d=Xf(a.yc,b);ag(d,function(b){$i(a,b)});$i(a,d);$f(d,function(b){$i(a,b)});return c}
function $i(a,b){var c=b.Ea();if(null!==c){for(var d=[],e=[],f=-1,g=0;g<c.length;g++)4!==c[g].status&&(2===c[g].status?(O(f===g-1,"All SENT items should be at beginning of queue."),f=g,c[g].status=4,c[g].ne="set"):(O(1===c[g].status,"Unexpected transaction status in abort"),c[g].le(),e=e.concat(si(a.M,c[g].Da,!0)),c[g].I&&d.push(u(c[g].I,null,Error("set"),!1,null))));-1===f?Yf(b,null):c.length=f+1;dc(a.fa,b.path(),e);for(g=0;g<d.length;g++)gc(d[g])}};function aj(){this.sc={};this.ag=!1}aj.prototype.Cb=function(){for(var a in this.sc)this.sc[a].Cb()};aj.prototype.vc=function(){for(var a in this.sc)this.sc[a].vc()};aj.prototype.ze=function(){this.ag=!0};ba(aj);aj.prototype.interrupt=aj.prototype.Cb;aj.prototype.resume=aj.prototype.vc;function Y(a,b,c,d){this.k=a;this.path=b;this.n=c;this.pc=d}
function bj(a){var b=null,c=null;a.oa&&(b=Od(a));a.ra&&(c=Rd(a));if(a.g===re){if(a.oa){if("[MIN_NAME]"!=Nd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.ra){if("[MAX_NAME]"!=Pd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===R){if(null!=b&&!fg(b)||null!=c&&!fg(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(O(a.g instanceof ve||a.g===Be,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
}function cj(a){if(a.oa&&a.ra&&a.la&&(!a.la||""===a.Rb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function dj(a,b){if(!0===a.pc)throw Error(b+": You can't combine multiple orderBy calls.");}h=Y.prototype;h.Mb=function(){D("Query.ref",0,0,arguments.length);return new X(this.k,this.path)};
h.Ib=function(a,b,c,d){D("Query.on",2,4,arguments.length);lg("Query.on",a,!1);F("Query.on",2,b,!1);var e=ej("Query.on",c,d);if("value"===a)Ri(this.k,this,new ii(b,e.cancel||null,e.Qa||null));else{var f={};f[a]=b;Ri(this.k,this,new ji(f,e.cancel,e.Qa))}return b};
h.mc=function(a,b,c){D("Query.off",0,3,arguments.length);lg("Query.off",a,!0);F("Query.off",2,b,!0);Qb("Query.off",3,c);var d=null,e=null;"value"===a?d=new ii(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new ji(e,null,c||null));e=this.k;d=".info"===K(this.path)?e.Fd.nb(this,d):e.M.nb(this,d);bc(e.fa,this.path,d)};
h.Og=function(a,b){function c(k){f&&(f=!1,e.mc(a,c),b&&b.call(d.Qa,k),g.resolve(k))}D("Query.once",1,4,arguments.length);lg("Query.once",a,!1);F("Query.once",2,b,!0);var d=ej("Query.once",arguments[2],arguments[3]),e=this,f=!0,g=new B;Nb(g.D);this.Ib(a,c,function(b){e.mc(a,c);d.cancel&&d.cancel.call(d.Qa,b);g.reject(b)});return g.D};
h.Le=function(a){S("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");D("Query.limit",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limit: First argument must be a positive integer.");if(this.n.la)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");var b=this.n.Le(a);cj(b);return new Y(this.k,this.path,b,this.pc)};
h.Me=function(a){D("Query.limitToFirst",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.n.la)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.n.Me(a),this.pc)};
h.Ne=function(a){D("Query.limitToLast",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.n.la)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.n.Ne(a),this.pc)};
h.Pg=function(a){D("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');ng("Query.orderByChild",a);dj(this,"Query.orderByChild");var b=new P(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
b=new ve(b);b=Fe(this.n,b);bj(b);return new Y(this.k,this.path,b,!0)};h.Qg=function(){D("Query.orderByKey",0,0,arguments.length);dj(this,"Query.orderByKey");var a=Fe(this.n,re);bj(a);return new Y(this.k,this.path,a,!0)};h.Rg=function(){D("Query.orderByPriority",0,0,arguments.length);dj(this,"Query.orderByPriority");var a=Fe(this.n,R);bj(a);return new Y(this.k,this.path,a,!0)};
h.Sg=function(){D("Query.orderByValue",0,0,arguments.length);dj(this,"Query.orderByValue");var a=Fe(this.n,Be);bj(a);return new Y(this.k,this.path,a,!0)};h.ce=function(a,b){D("Query.startAt",0,2,arguments.length);gg("Query.startAt",a,this.path,!0);mg("Query.startAt",b);var c=this.n.ce(a,b);cj(c);bj(c);if(this.n.oa)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");p(a)||(b=a=null);return new Y(this.k,this.path,c,this.pc)};
h.vd=function(a,b){D("Query.endAt",0,2,arguments.length);gg("Query.endAt",a,this.path,!0);mg("Query.endAt",b);var c=this.n.vd(a,b);cj(c);bj(c);if(this.n.ra)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new Y(this.k,this.path,c,this.pc)};
h.tg=function(a,b){D("Query.equalTo",1,2,arguments.length);gg("Query.equalTo",a,this.path,!1);mg("Query.equalTo",b);if(this.n.oa)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.n.ra)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.ce(a,b).vd(a,b)};
h.toString=function(){D("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.aa;c<a.u.length;c++)""!==a.u[c]&&(b+="/"+encodeURIComponent(String(a.u[c])));return this.k.toString()+(b||"/")};h.wa=function(){var a=xd(Ge(this.n));return"{}"===a?"default":a};
function ej(a,b,c){var d={cancel:null,Qa:null};if(b&&c)d.cancel=b,F(a,3,d.cancel,!0),d.Qa=c,Qb(a,4,d.Qa);else if(b)if("object"===typeof b&&null!==b)d.Qa=b;else if("function"===typeof b)d.cancel=b;else throw Error(E(a,3,!0)+" must either be a cancel callback or a context object.");return d}Y.prototype.ref=Y.prototype.Mb;Y.prototype.on=Y.prototype.Ib;Y.prototype.off=Y.prototype.mc;Y.prototype.once=Y.prototype.Og;Y.prototype.limit=Y.prototype.Le;Y.prototype.limitToFirst=Y.prototype.Me;
Y.prototype.limitToLast=Y.prototype.Ne;Y.prototype.orderByChild=Y.prototype.Pg;Y.prototype.orderByKey=Y.prototype.Qg;Y.prototype.orderByPriority=Y.prototype.Rg;Y.prototype.orderByValue=Y.prototype.Sg;Y.prototype.startAt=Y.prototype.ce;Y.prototype.endAt=Y.prototype.vd;Y.prototype.equalTo=Y.prototype.tg;Y.prototype.toString=Y.prototype.toString;var Z={};Z.zc=Rh;Z.DataConnection=Z.zc;Rh.prototype.bh=function(a,b){this.Ia("q",{p:a},b)};Z.zc.prototype.simpleListen=Z.zc.prototype.bh;Rh.prototype.sg=function(a,b){this.Ia("echo",{d:a},b)};Z.zc.prototype.echo=Z.zc.prototype.sg;Rh.prototype.interrupt=Rh.prototype.Cb;Z.dg=Fh;Z.RealTimeConnection=Z.dg;Fh.prototype.sendRequest=Fh.prototype.Ia;Fh.prototype.close=Fh.prototype.close;
Z.Cg=function(a){var b=Rh.prototype.put;Rh.prototype.put=function(c,d,e,f){p(f)&&(f=a());b.call(this,c,d,e,f)};return function(){Rh.prototype.put=b}};Z.hijackHash=Z.Cg;Z.cg=dd;Z.ConnectionTarget=Z.cg;Z.wa=function(a){return a.wa()};Z.queryIdentifier=Z.wa;Z.Eg=function(a){return a.k.Va.ba};Z.listens=Z.Eg;Z.ze=function(a){a.ze()};Z.forceRestClient=Z.ze;function X(a,b){var c,d,e;if(a instanceof Ji)c=a,d=b;else{D("new Firebase",1,2,arguments.length);d=sd(arguments[0]);c=d.eh;"firebase"===d.domain&&rd(d.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");c&&"undefined"!=c||rd("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d.ob||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&S("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
c=new dd(d.host,d.ob,c,"ws"===d.scheme||"wss"===d.scheme);d=new P(d.bd);e=d.toString();var f;!(f=!q(c.host)||0===c.host.length||!eg(c.lc))&&(f=0!==e.length)&&(e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),f=!(q(e)&&0!==e.length&&!cg.test(e)));if(f)throw Error(E("new Firebase",1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');if(b)if(b instanceof aj)e=b;else if(q(b))e=aj.yb(),c.Rd=b;else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
else e=aj.yb();f=c.toString();var g=z(e.sc,f);g||(g=new Ji(c,e.ag),e.sc[f]=g);c=g}Y.call(this,c,d,De,!1);this.then=void 0;this["catch"]=void 0}ka(X,Y);var fj=X,gj=["Firebase"],hj=n;gj[0]in hj||!hj.execScript||hj.execScript("var "+gj[0]);for(var ij;gj.length&&(ij=gj.shift());)!gj.length&&p(fj)?hj[ij]=fj:hj=hj[ij]?hj[ij]:hj[ij]={};X.goOffline=function(){D("Firebase.goOffline",0,0,arguments.length);aj.yb().Cb()};X.goOnline=function(){D("Firebase.goOnline",0,0,arguments.length);aj.yb().vc()};
X.enableLogging=od;X.ServerValue={TIMESTAMP:{".sv":"timestamp"}};X.SDK_VERSION=Eb;X.INTERNAL=U;X.Context=aj;X.TEST_ACCESS=Z;X.prototype.name=function(){S("Firebase.name() being deprecated. Please use Firebase.key() instead.");D("Firebase.name",0,0,arguments.length);return this.key()};X.prototype.name=X.prototype.name;X.prototype.key=function(){D("Firebase.key",0,0,arguments.length);return this.path.e()?null:me(this.path)};X.prototype.key=X.prototype.key;
X.prototype.o=function(a){D("Firebase.child",1,1,arguments.length);if(fa(a))a=String(a);else if(!(a instanceof P))if(null===K(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));ng("Firebase.child",b)}else ng("Firebase.child",a);return new X(this.k,this.path.o(a))};X.prototype.child=X.prototype.o;X.prototype.parent=function(){D("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new X(this.k,a)};X.prototype.parent=X.prototype.parent;
X.prototype.root=function(){D("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.parent();)a=a.parent();return a};X.prototype.root=X.prototype.root;X.prototype.set=function(a,b){D("Firebase.set",1,2,arguments.length);og("Firebase.set",this.path);gg("Firebase.set",a,this.path,!1);F("Firebase.set",2,b,!0);var c=new B;this.k.Ob(this.path,a,null,C(c,b));return c.D};X.prototype.set=X.prototype.set;
X.prototype.update=function(a,b){D("Firebase.update",1,2,arguments.length);og("Firebase.update",this.path);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;S("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}jg("Firebase.update",a,this.path);F("Firebase.update",2,b,!0);c=new B;this.k.update(this.path,a,C(c,b));return c.D};
X.prototype.update=X.prototype.update;X.prototype.Ob=function(a,b,c){D("Firebase.setWithPriority",2,3,arguments.length);og("Firebase.setWithPriority",this.path);gg("Firebase.setWithPriority",a,this.path,!1);kg("Firebase.setWithPriority",2,b);F("Firebase.setWithPriority",3,c,!0);if(".length"===this.key()||".keys"===this.key())throw"Firebase.setWithPriority failed: "+this.key()+" is a read-only object.";var d=new B;this.k.Ob(this.path,a,b,C(d,c));return d.D};X.prototype.setWithPriority=X.prototype.Ob;
X.prototype.remove=function(a){D("Firebase.remove",0,1,arguments.length);og("Firebase.remove",this.path);F("Firebase.remove",1,a,!0);return this.set(null,a)};X.prototype.remove=X.prototype.remove;
X.prototype.transaction=function(a,b,c){D("Firebase.transaction",1,3,arguments.length);og("Firebase.transaction",this.path);F("Firebase.transaction",1,a,!1);F("Firebase.transaction",2,b,!0);if(p(c)&&"boolean"!=typeof c)throw Error(E("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.key()||".keys"===this.key())throw"Firebase.transaction failed: "+this.key()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new B;r(b)&&Nb(d.D);Si(this.k,this.path,a,function(a,c,g){a?
d.reject(a):d.resolve(new ei(c,g));r(b)&&b(a,c,g)},c);return d.D};X.prototype.transaction=X.prototype.transaction;X.prototype.Zg=function(a,b){D("Firebase.setPriority",1,2,arguments.length);og("Firebase.setPriority",this.path);kg("Firebase.setPriority",1,a);F("Firebase.setPriority",2,b,!0);var c=new B;this.k.Ob(this.path.o(".priority"),a,null,C(c,b));return c.D};X.prototype.setPriority=X.prototype.Zg;
X.prototype.push=function(a,b){D("Firebase.push",0,2,arguments.length);og("Firebase.push",this.path);gg("Firebase.push",a,this.path,!0);F("Firebase.push",2,b,!0);var c=Li(this.k),d=hf(c),c=this.o(d);if(null!=a){var e=this,f=c.set(a,b).then(function(){return e.o(d)});c.then=u(f.then,f);c["catch"]=u(f.then,f,void 0);r(b)&&Nb(f)}return c};X.prototype.push=X.prototype.push;X.prototype.lb=function(){og("Firebase.onDisconnect",this.path);return new V(this.k,this.path)};X.prototype.onDisconnect=X.prototype.lb;
X.prototype.O=function(a,b,c){S("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");D("Firebase.auth",1,3,arguments.length);pg("Firebase.auth",a);F("Firebase.auth",2,b,!0);F("Firebase.auth",3,b,!0);var d=new B;dh(this.k.O,a,{},{remember:"none"},C(d,b),c);return d.D};X.prototype.auth=X.prototype.O;X.prototype.je=function(a){D("Firebase.unauth",0,1,arguments.length);F("Firebase.unauth",1,a,!0);var b=new B;eh(this.k.O,C(b,a));return b.D};X.prototype.unauth=X.prototype.je;
X.prototype.Be=function(){D("Firebase.getAuth",0,0,arguments.length);return this.k.O.Be()};X.prototype.getAuth=X.prototype.Be;X.prototype.Ig=function(a,b){D("Firebase.onAuth",1,2,arguments.length);F("Firebase.onAuth",1,a,!1);Qb("Firebase.onAuth",2,b);this.k.O.Ib("auth_status",a,b)};X.prototype.onAuth=X.prototype.Ig;X.prototype.Hg=function(a,b){D("Firebase.offAuth",1,2,arguments.length);F("Firebase.offAuth",1,a,!1);Qb("Firebase.offAuth",2,b);this.k.O.mc("auth_status",a,b)};X.prototype.offAuth=X.prototype.Hg;
X.prototype.hg=function(a,b,c){D("Firebase.authWithCustomToken",1,3,arguments.length);2===arguments.length&&Hb(b)&&(c=b,b=void 0);pg("Firebase.authWithCustomToken",a);F("Firebase.authWithCustomToken",2,b,!0);sg("Firebase.authWithCustomToken",3,c,!0);var d=new B;dh(this.k.O,a,{},c||{},C(d,b));return d.D};X.prototype.authWithCustomToken=X.prototype.hg;
X.prototype.ig=function(a,b,c){D("Firebase.authWithOAuthPopup",1,3,arguments.length);2===arguments.length&&Hb(b)&&(c=b,b=void 0);rg("Firebase.authWithOAuthPopup",a);F("Firebase.authWithOAuthPopup",2,b,!0);sg("Firebase.authWithOAuthPopup",3,c,!0);var d=new B;ih(this.k.O,a,c,C(d,b));return d.D};X.prototype.authWithOAuthPopup=X.prototype.ig;
X.prototype.jg=function(a,b,c){D("Firebase.authWithOAuthRedirect",1,3,arguments.length);2===arguments.length&&Hb(b)&&(c=b,b=void 0);rg("Firebase.authWithOAuthRedirect",a);F("Firebase.authWithOAuthRedirect",2,b,!1);sg("Firebase.authWithOAuthRedirect",3,c,!0);var d=new B,e=this.k.O,f=c,g=C(d,b);gh(e);var k=[Qg],f=Ag(f);"anonymous"===a||"firebase"===a?T(g,Sg("TRANSPORT_UNAVAILABLE")):(cd.set("redirect_client_options",f.qd),hh(e,k,"/auth/"+a,f,g));return d.D};X.prototype.authWithOAuthRedirect=X.prototype.jg;
X.prototype.kg=function(a,b,c,d){D("Firebase.authWithOAuthToken",2,4,arguments.length);3===arguments.length&&Hb(c)&&(d=c,c=void 0);rg("Firebase.authWithOAuthToken",a);F("Firebase.authWithOAuthToken",3,c,!0);sg("Firebase.authWithOAuthToken",4,d,!0);var e=new B;q(b)?(qg("Firebase.authWithOAuthToken",2,b),fh(this.k.O,a+"/token",{access_token:b},d,C(e,c))):(sg("Firebase.authWithOAuthToken",2,b,!1),fh(this.k.O,a+"/token",b,d,C(e,c)));return e.D};X.prototype.authWithOAuthToken=X.prototype.kg;
X.prototype.gg=function(a,b){D("Firebase.authAnonymously",0,2,arguments.length);1===arguments.length&&Hb(a)&&(b=a,a=void 0);F("Firebase.authAnonymously",1,a,!0);sg("Firebase.authAnonymously",2,b,!0);var c=new B;fh(this.k.O,"anonymous",{},b,C(c,a));return c.D};X.prototype.authAnonymously=X.prototype.gg;
X.prototype.lg=function(a,b,c){D("Firebase.authWithPassword",1,3,arguments.length);2===arguments.length&&Hb(b)&&(c=b,b=void 0);sg("Firebase.authWithPassword",1,a,!1);tg("Firebase.authWithPassword",a,"email");tg("Firebase.authWithPassword",a,"password");F("Firebase.authWithPassword",2,b,!0);sg("Firebase.authWithPassword",3,c,!0);var d=new B;fh(this.k.O,"password",a,c,C(d,b));return d.D};X.prototype.authWithPassword=X.prototype.lg;
X.prototype.ve=function(a,b){D("Firebase.createUser",1,2,arguments.length);sg("Firebase.createUser",1,a,!1);tg("Firebase.createUser",a,"email");tg("Firebase.createUser",a,"password");F("Firebase.createUser",2,b,!0);var c=new B;this.k.O.ve(a,C(c,b));return c.D};X.prototype.createUser=X.prototype.ve;
X.prototype.Xe=function(a,b){D("Firebase.removeUser",1,2,arguments.length);sg("Firebase.removeUser",1,a,!1);tg("Firebase.removeUser",a,"email");tg("Firebase.removeUser",a,"password");F("Firebase.removeUser",2,b,!0);var c=new B;this.k.O.Xe(a,C(c,b));return c.D};X.prototype.removeUser=X.prototype.Xe;
X.prototype.se=function(a,b){D("Firebase.changePassword",1,2,arguments.length);sg("Firebase.changePassword",1,a,!1);tg("Firebase.changePassword",a,"email");tg("Firebase.changePassword",a,"oldPassword");tg("Firebase.changePassword",a,"newPassword");F("Firebase.changePassword",2,b,!0);var c=new B;this.k.O.se(a,C(c,b));return c.D};X.prototype.changePassword=X.prototype.se;
X.prototype.re=function(a,b){D("Firebase.changeEmail",1,2,arguments.length);sg("Firebase.changeEmail",1,a,!1);tg("Firebase.changeEmail",a,"oldEmail");tg("Firebase.changeEmail",a,"newEmail");tg("Firebase.changeEmail",a,"password");F("Firebase.changeEmail",2,b,!0);var c=new B;this.k.O.re(a,C(c,b));return c.D};X.prototype.changeEmail=X.prototype.re;
X.prototype.Ze=function(a,b){D("Firebase.resetPassword",1,2,arguments.length);sg("Firebase.resetPassword",1,a,!1);tg("Firebase.resetPassword",a,"email");F("Firebase.resetPassword",2,b,!0);var c=new B;this.k.O.Ze(a,C(c,b));return c.D};X.prototype.resetPassword=X.prototype.Ze;})();



})();