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