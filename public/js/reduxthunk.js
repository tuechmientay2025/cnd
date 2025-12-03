(function(win){
	var data_={};
	var __key__ = "ReduxThunk";
	var events={};
	
	win.ReduxThunk = function(e,options){
		events[e] = $.extends({},options,true);	
    };
    win.ReduxThunk.type = "localStorage";
    win.ReduxThunk.trigger = function(e,data){
    	if(events[e]){
    		events[e].run(e,data,{
    			save : function(s){
    				data_[e] =s;
    			},
    			get : function(s){
    				return data_[s];
    			}
    		})
    	}
    };

    win.ReduxThunk.fetch = function(e){
    	return data_[e]||{};
    };

    win.ReduxThunk.upload = function(url,f){
    	var a = $.extends({__key__:__key__},data_,true);	

    	post(url,a,function(e){
    		if(f)f();
    	},true);
    };
    win.ReduxThunk.download = function(url,f){
    	post(url,{__key__:__key__},function(e){
    		if(f)f();
    	},true);
    };
    win.ReduxThunk.help = function(){
    	console.log(`
//define
window.ReduxThunk("abc",{ 
	run : function(id,request,state){
	 	//get state.get("...");
		post("",{},function(e){
			state.save(e)
		},true);
	}
});
//how to use
window.ReduxThunk.trigger("abc",{});
window.ReduxThunk.fetch("abc");`)
    };
    setTimeout(function(){
    	if(win.localStorage){
    		data_ = win.localStorage.getItem(__key__);
    		try{
    			data_ = JSON.parse(a);
    		}catch(e){

    		}
    		if(!data_){
    			data_={};
    		}
    	}
    },1200);
})(window);
