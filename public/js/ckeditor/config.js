/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or https://ckeditor.com/license
*/

/*
CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	
	   config.filebrowserBrowseUrl = '/kcfinder/browse.php?type=files';
   config.filebrowserImageBrowseUrl = '/kcfinder/browse.php?type=images';
   config.filebrowserFlashBrowseUrl = '/kcfinder/browse.php?type=flash';
   config.filebrowserUploadUrl = '/kcfinder/upload.php?type=files';
   config.filebrowserImageUploadUrl = '/kcfinder/upload.php?type=images';
   config.filebrowserFlashUploadUrl = '/kcfinder/upload.php?type=flash';
			config.filebrowserWindowWidth = '1000';
			config.filebrowserWindowHeight = '700';
    config.entities = false;
    config.entities_greek = false;
    
    config.height = 350;
};
*/
(function() {
  var getScriptURL = function(){
      var scripts = document.getElementsByTagName( 'script' );
        var len = scripts.length;
        for(var i =0; i < len; i++) {
            if(scripts[i].src.search("/ckeditor/config.js") > 0) {
                return scripts[i].src;
            }
        }
  }

  var current_url = getScriptURL();
  var urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(current_url);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}
CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.extraPlugins = 'video,autogrow,shortcode,youtube,insertpre,boxwidget,imagepaste,dragresize,emojione,pastebase64';
	config.autoGrow_minHeight = 200;
	config.autoGrow_maxHeight = 600;
	config.autoGrow_bottomSpace = 50;
	
	config.extraAllowedContent = '*(*)';
	config.allowedContent = true;
	config.contentsCss = ['/assets/css/core.min.css','/theme/assets/css/main.css'];
	
	var token = urlParam("token");
	token = token?token:"theme/upload/";
	config.filebrowserBrowseUrl = "/filemanager/index.php?dir="+token;
			config.filebrowserImageBrowseUrl = "/filemanager/index.php?dir="+token;
			config.filebrowserFlashBrowseUrl = "/filemanager/index.php?dir="+token;
			config.filebrowserUploadUrl = "/filemanager/index.php?dir="+token;
			config.filebrowserImageUploadUrl = "/filemanager/index.php?dir="+token;
			config.filebrowserFlashUploadUrl = "/filemanager/index.php?dir="+token;
			config.filebrowserWindowWidth = '1000';
			config.filebrowserWindowHeight = '700';
    

    config.entities = false;
    config.entities_greek = false;
	
	
	
	config.protectedSource.push( /<\?[\s\S]*?\?>/g );   
config.protectedSource.push( /<cf[\s\S]*?>/gi ) ; // ColdFusion cf tags - OPEN.
config.protectedSource.push( /<\/cf[\s\S]*?>/gi ) ; // ColdFusion cf tags - CLOSE

	/*
    config.protectedSource.push(/[^<]*(<h1>([^<]+)<\/h1>)/g);
    config.protectedSource.push( /<cfscript[\s\S]*?\/cfscript>/g ); 
    config.protectedSource.push( /<br[\s\S]*?\/>/g );   // BR Tags
    config.protectedSource.push( /<img[\s\S]*?\/>/g );   // IMG Tags
    config.protectedSource.push( /{exp:[\s\S]*?{\/exp:[^\}]+}/g );    // Expression Engine style server side code 
    config.protectedSource.push( /{.*?}/g);
    config.protectedSource.push( /<span[\s\S]*?\/span>/g);
    config.protectedSource.push( /<tex[\s\S]*?\/tex>/g);
    config.protectedSource.push( /<object[\s|\S]+?<\/object>/g); // Protects <OBJECT> tags 
    config.protectedSource.push( /<style[\s\S]*?\/style>/g); // Protects <STYLE> tags
    config.protectedSource.push( /<cfoutput[\s\S]*?\/cfoutput>/g); // Protects <CFOUTPUT> tags
    config.protectedSource.push( /<pre[\s\S]*?\/pre>/g);
    config.protectedSource.push( /<code[\s\S]*?\/code>/g);
    config.protectedSource.push( /<cfinclude[\s\S]*?\/cfinclude>/g);
    config.protectedSource.push( /<cfloop[\s\S]*?\/cfloop>/g);    
    config.protectedSource.push( /<cfset[\s\S]*?\/cfset/g);
    */

};

CKEDITOR.globalConfig ={
		    filebrowserBrowseUrl : "/filemanager/index.php?dir=theme/upload/",
			filebrowserImageBrowseUrl : "/filemanager/index.php?dir=theme/upload/",
			filebrowserFlashBrowseUrl : "/filemanager/index.php?dir=theme/upload/",
			filebrowserUploadUrl : "/upload/?dir=/cnd/",
			filebrowserImageUploadUrl : "/filemanager/index.php?dir=theme/upload/",
			filebrowserFlashUploadUrl : "/filemanager/index.php?dir=theme/upload/",
			filebrowserWindowWidth : '1000',
			filebrowserWindowHeight : '700'
}
/*
var head = CKEDITOR.instances.metas.document.getHead();
head.append( CKEDITOR.dom.element.createFromHtml( '<script type="text/javascript" data-cke-saved-src="' + myScriptPath + '"></script>
 */

// from  https://help.pixelandtonic.com/brandonkelly/topics/how_do_i_set_output_formatting_writer_rules?from_gsfn=true 
/*CKEDITOR.on( 'instanceReady', function( ev ) {

var blockTags = ['div','h1','h2','h3','h4','h5','h6','p','pre','ul','li'];
var rules = {
indent : false,
breakBeforeOpen : true,
breakAfterOpen : false,
breakBeforeClose : false,
breakAfterClose : true
};

for (var i=0; i<blockTags.length; i++) {
ev.editor.dataProcessor.writer.setRules( blockTags[i], rules );
}

});
*/

})();