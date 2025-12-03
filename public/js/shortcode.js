(function(win){
	function run(model,page){
		model.find("[data-shortcode]").each(function(){
			var me = $(this);
			var data = me.data();
			var name = me.attr("data-shortcode");
			delete data.shortcode;

			var str = Handlebars.compile(name)(data);
			if(!str || str==name){
				//find system
				str = f7Shortcode.do(name,data,page||null);
			}
			if(!str){
				//check debug
				if(document.location.href.includes("localhost")){
					me.attr("style",me.attr("style")+`;display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ccc;`);
					str=`<div>Shortcode ${name} not found</div>`;
				}
				
			}
			if(str)$(this).html(str);
		});
	}
	var loaded =0;
	function init(){
		if(loaded==0){
			loaded =1;
			$(document).on("shown.bs.modal",".modal",function(e){ 
				var page = $(e.currentTarget);
				run(page,page);
			});
		}
	}
	


	//https://raw.githubusercontent.com/nicinabox/shortcode.js/refs/heads/master/src/Shortcode.js
	//
	//need you handlerbar
	var shortcode = {};
	win.f7Shortcode = {
		 
		add : function(name,f){
			init();
			shortcode[name] =f;
			return this;
		},
		do : function(name,data,context){
			if(shortcode[name]){
				return shortcode[name].call(context,data);
			}
			return "";
		},
		remove : function(str){
			delete shortcode[name];
			return this;
		},
		try : function(){
			 
			run($(".page.page-current"));
		}
	};
})(window);