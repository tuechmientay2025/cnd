(function(win){
    win.faucet = win.faucet||{};
    win.faucet.editinline = function(url,key,f){
        var dialog = bootbox.dialog({
            title: "Cập nhật",
            buttons: {
                cancel: {
                    label: "Huỷ",
                    className: 'btn-danger',
                    callback: function(){
                          
                    }
                },
                ok: {
                    label: "Xác nhận",
                    className: 'btn-info',
                    callback: function() {
                        var val = dialog.find("input").val();
                        if(!val){
                            val = dialog.find("textarea").val();
                        }

                        if(val){
                            // "https://faucet.donggiatri.com/modules/user/update_key/"
                            post(url,{k:key,v:val},function(r){
                                if(f)f(r);
                                if(r.code){
                                    alert(r.message);
                                }else{
                                    alert(r.error);
                                }
                            },true);
                        }
                    }
                }
            },
                message: `
                <div class="form-group">
                    
                     <input type="text"  class="form-control" value="" /> 
                </div>
                `
            });    
    };
    $(document).on("click","[data-edit]",function(e){
        var key = $(this).attr("data-edit");
        var url = $(this).attr("data-url");


        if(url){
             win.faucet.editinline(url,key,function(){

             });
        } 
    });

})(window);

