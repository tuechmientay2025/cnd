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