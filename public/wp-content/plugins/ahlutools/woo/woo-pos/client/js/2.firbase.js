
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