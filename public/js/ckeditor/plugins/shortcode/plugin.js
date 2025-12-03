// Register a new CKEditor plugin.
// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.resourceManager.html#add
CKEDITOR.shortcode={
	ele : null,
	data :"[]",
	tmp:"",
	reset : function(){
		this.data = "";
	},
	save : function(editor){
		var pre = editor.document.createElement( 'pre' );
		pre.setHtml( this.data );
		//add to editoder
		editor.insertElement( pre );
	}
};
CKEDITOR.plugins.add( 'shortcode',
{
	// The plugin initialization logic goes inside this method.
	// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.pluginDefinition.html#init
	init: function( editor )
	{
				// Create an editor command that stores the dialog initialization command.
		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.command.html
		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialogCommand.html
		editor.addCommand( 'shortcode', new CKEDITOR.dialogCommand( 'shortcode' ) );
		
		if (editor.addMenuItem) {
		  // A group menu is required
		  // order, as second parameter, is not required
		  editor.addMenuGroup('testgroup');
		 
		  // Create a manu item
		  editor.addMenuItem('testitem', {
			label: 'Edit Shortcode',
			command: 'shortcode',
			group: 'testgroup'
		  });
		}
		  /*
		if (editor.contextMenu) {
		  editor.contextMenu.addListener(function(element, selection) {
			return { testitem: CKEDITOR.TRISTATE_ON };
		  });
		}
		*/
		
		editor.contextMenu.addListener(function(element, selection) {
		  // Get elements parent, strong parent first
		  var parents = element.getParents("pre");
		  // Check if it's strong
		  if (parents[0].getName() != "pre")
			return null; // No item
		  
          //detect value
			var html = parents[0].$.innerHTML;
			//store data
			CKEDITOR.shortcode.data= html;
			//checking
			if(html.match(/<pre>\[(.*)\]/gi)){
			
			}
			//store current
			CKEDITOR.shortcode.ele = parents[0];
			
			//reset data
		  // Show item
		  return { testitem: CKEDITOR.TRISTATE_ON };
		});
		
		

		
		
		
		// Create a toolbar button that executes the plugin command defined above.
		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.html#addButton
		editor.ui.addButton( 'Shortcode',
		{
			// Toolbar button tooltip.
			label: 'Insert a shortcode',
			// Reference to the plugin command name.
			command: 'shortcode',
			// Button's icon file path.
			icon: this.path + 'images/icon.png'
		} );
 
		// Add a new dialog window definition containing all UI elements and listeners.
		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.html#.add
		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.dialogDefinition.html
		CKEDITOR.dialog.add( 'shortcode', function( editor )
		{
			var ok =null;
			return {
				// Basic properties of the dialog window: title, minimum size.
				// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.dialogDefinition.html
				title : 'Link Properties',
				minWidth : 400,
				minHeight : 200,
				// Dialog window contents.
				// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.definition.content.html
				contents :
				[
					{
						// Definition of the Settings dialog window tab (page) with its id, label and contents.
						// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.contentDefinition.html
						id : 'general',
						label : 'Settings',
						elements :
						[
							// Dialog window UI element: HTML code field.
							// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.html.html
							{
								
								type : 'html',
								// HTML code to be shown inside the field.
								// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.html.html#constructor
								html : 'This shortcode allows you to embed in your website.',
								
							},
							// Dialog window UI element: a selection field with link styles.
							// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.select.html
							{
								type : 'select',
								id : 'style',
								label : 'Get a shortcode',
								// Items that will appear inside the selection field, in pairs of displayed text and value.
								// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.select.html#constructor
								items : 
								[
									[ '<none>', '' ],
								],
								commit : function( data )
								{
									data.style = this.getValue();
								}
							},
							{
								onShow : function(){
									// Create an element based on a native DOM element.
									var element = $("#"+this.domId).closest("tr");
									
									if(!element.hasClass("ready")){
										element.find('span').css({"display":"block","width":"100%"});
										var text = element.find("textarea.tmp");
										text.focus();
										//button click
										
										element.find(".decode").click(function(e){
											e.preventDefault();
											text.val(atob(text.val().replace(/\$/ig,'=')));
										});
										element.find(".encode").click(function(e){
											e.preventDefault();
											text.val(btoa(text.val()).replace(/=/ig,'$'));
										});
										
										element.addClass("ready");
									}
								},
								type : 'html',
								html : '<span>Decode & Encode HTML</span><br /><textarea class="tmp cke_dialog_ui_input_textarea" style="width:100%;height:100px;"></textarea><br /><a class="decode cke_dialog_ui_button" style="padding: 5px 20px;" href="#">Decode</a> <a class="encode cke_dialog_ui_button" style="padding: 5px 20px;" href="#">Encode</a>',
								commit : function( data )
								{
									//assign data
									data.tmp = encodeURIComponent(this.getValue());
								}
							},
							// Dialog window UI element: a textarea field for the link text.
							// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.textarea.html
							{
								onShow : function(){
									// Create an element based on a native DOM element.
									var element = $("#"+this._.inputId);
									element.val(CKEDITOR.shortcode.data).focus();
									//var el = editor.document.$.getElementById(this._.inputId);
									//console.log(el);
								
								},
								type : 'textarea',
								id : 'contents',
								// Text that labels the field.
								// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.labeledElement.html#constructor
								label : 'Enter your shortcode',
								// Validation checking whether the field is not empty.
								validate : CKEDITOR.dialog.validate.notEmpty( 'The Displayed Text field cannot be empty.' ),
								// This field is required.
								required : true,
								// Function to be run when the commitContent method of the parent dialog window is called.
								// Get the value of this field and save it in the data object attribute.
								// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dom.element.html#getValue
								commit : function( data )
								{
									var val = this.getValue();
											var key = val.matches(/(([a-z]+)=\s?['"](.*?)['"]\s?)/g,2);
											var items = val.matches(/(([a-z]+)=\s?['"](.*?)['"]\s?)/g,3);
										for(var i in items){
											var a = items[i];
											if(a instanceof Function) break;
											if(/<[a-z\][\s\S]*>/i.test(a)){
												val = val.replace(a,btoa(a).replace(/=/ig,'$'));
											}
											
										}
									//assign data
									data.contents = val;
								}
							}
						]
					}
				],
				onOk : function()
				{
					//delete current element
					if(CKEDITOR.shortcode.ele)
					CKEDITOR.shortcode.ele.remove();
									
					// Create a link element and an object that will store the data entered in the dialog window.
					// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dom.document.html#createElement
					var dialog = this,
						data = {};
					// Populate the data object with data entered in the dialog window.
					// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.html#commitContent
					this.commitContent( data );

					CKEDITOR.shortcode.data= data.contents;
					CKEDITOR.shortcode.save(editor);
					CKEDITOR.shortcode.reset();
				},
				onCancel: function() {
				
				}
			};
		} );
	}
} );