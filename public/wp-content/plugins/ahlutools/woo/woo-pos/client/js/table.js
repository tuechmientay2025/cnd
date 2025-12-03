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