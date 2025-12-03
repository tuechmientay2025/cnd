(function(win){
	$.EmptyTable = function(ele,data){
     (typeof ele=="string"?$(ele):ele).bindData(data);
   };
   $.fn.EmptyTable  = function(settings) {
      return this.each(function(){
        var table = $(this);
        
        var tr = table.find('thead tr');
        if(tr.length==0){
          tr = table.find('thead');
        }
        var l = tr.children().length;
        table.find('tbody').html(`<tr><td colspan="${l}"><div nodata="${settings||'Đang cập nhật dữ liệu.'}">${settings||'Đang cập nhật dữ liệu.'}</div></td></tr>`);
      
      });
   };
})(window);