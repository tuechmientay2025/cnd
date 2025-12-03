(function(win){
    
    var loaded =0;
    window.CKEDITOR_GO = function(id,data,options){

            if(typeof win.CKEDITOR!="object"){
                if(loaded==0){
                    loaded=1;
                    loadJS("https://faucet.donggiatri.com/js/ckeditor/ckeditor.js",function(){

                    });
                }
                var id1 = setInterval(function(){
                    if(win.CKEDITOR){
                        CKEDITOR_GO(id,data,options);
                        clearInterval(id1);
                    }
                },1000);
                return;
            }

            if(win.CKEDITOR.instances[id]){
               win.CKEDITOR.instances[id].destroy();
            }
            var a = win.CKEDITOR.replace(id,$.extend({
                // Define the toolbar groups as it is a more accessible solution.
                toolbarGroups: [
                    {"name":"basicstyles","groups":["basicstyles"]},
                    {"name":"links","groups":["links"]},
                    {"name":"paragraph","groups":["list","blocks"]},
                    {"name":"document","groups":["mode"]},
                    {"name":"insert","groups":["insert"]},
                    {"name":"styles","groups":["styles"]},
                    {"name":"about","groups":["about"]}
                ],
                // Remove the redundant buttons from toolbar groups defined above.
                removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
            },options,true) );
        if(data)win.CKEDITOR.instances["html_print"].setData(data);

        if(options&&options.callback){
            options.callback();
        }
        return a;
      };
    
})(window);