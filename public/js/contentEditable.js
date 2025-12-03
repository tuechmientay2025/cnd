(function(win,$){ 
    $.fn.contentEditable = function () {
        return this.each(function () {
            var $this = $(this);
            var htmlOld = $this.html();
            $this.bind('blur keyup paste copy cut mouseup', function () {
                var htmlNew = $this.html();
                if (htmlOld !== htmlNew) {
                    $this.trigger('change');
                    htmlOld = htmlNew;
                }
            })
        })
    }

    $(document).on("blur keyup paste copy cut mouseup","[contentEditable]",delay(function(){
    
         var htmlNew = $(this).html();
          if (this.htmlOld !== htmlNew) {
              $(this).trigger('change');
              this.htmlOld = htmlNew;
          }
    },700)).on("change","[contentEditable]",function(){
      var data = $(this).data();
      if(data.api&&data.k){
         var htmlNew = $(this).text();
         post(site_url_ajax(`api/${data.api}/updatekey/`),{k:data.k,v:htmlNew},function(e){
           if(e.code){
             toastr.success(e.message||"Cập nhật thành công.","Thông báo");
           }else{
              toastr.warning(e.error||"Có lỗi xảy ra.","Thông báo");
           }
         },true);
      }   
    }).on("focus",'[data-toggle="tooltip"]',function(e){
      e.preventDefault();
        if(!this.tooltiped){
           $(this).tooltip();
           this.tooltiped = 1;

      }

      $(this).tooltip('show');
      
   });

 
})(window,jQuery);