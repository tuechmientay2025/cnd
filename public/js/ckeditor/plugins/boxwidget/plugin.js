// Register a new CKEditor plugin.

// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.resourceManager.html#add

CKEDITOR.boxwidget={

	ele : null,
	data : {
		FOOTER_HERE : "",
		CONTENT_HERE : "",
		TITLE_HERE : ""
	},

	data_tmp :"<div class=\"widget useful-links\">\n\t<div class=\"widget_header\"><span>TITLE_HERE</span></div>\n\t<div class=\"widget_content\">\n\t\tCONTENT_HERE\n\t</div>\n</div>\n",

	tmp:"",

	reset : function(){

		this.data ={
			FOOTER_HERE : "",
			CONTENT_HERE : "",
			TITLE_HERE : ""
		};

	},

	save : function(editor){

		//add to editoder

		var tmp = this.data_tmp;
		for(var i in this.data){
			tmp = tmp.replace(i,this.data[i]);
		}


		editor.insertHtml(tmp);

	}

};

CKEDITOR.plugins.add( 'boxwidget',

{

	// The plugin initialization logic goes inside this method.

	// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.pluginDefinition.html#init

	init: function( editor )

	{

				// Create an editor command that stores the dialog initialization command.

		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.command.html

		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialogCommand.html

		editor.addCommand( 'boxwidget', new CKEDITOR.dialogCommand( 'boxwidget' ) );

		

		if (editor.addMenuItem) {

		  // A group menu is required

		  // order, as second parameter, is not required

		  editor.addMenuGroup('testgroup');

		 

		  // Create a manu item

		  editor.addMenuItem('testitem', {

			label: 'Edit Widget Box',

			command: 'boxwidget',

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

		  var parents = element.getParents("div");

		  // Check if it's strong

		  if (parents[0].getName() != "div")

			return null; // No item

		  

			//detect value

			if($(parents[0].$).hasClass("widget_content")){	

				CKEDITOR.boxwidget.ele = $(parents[0].$).closest(".widget")[0];	

				//store data

				CKEDITOR.boxwidget.data= CKEDITOR.boxwidget.ele.outerHTML;

				//store current

			}



			

			//reset data

		  // Show item

		  return { testitem: CKEDITOR.TRISTATE_ON };

		});

		

		



		

		

		

		// Create a toolbar button that executes the plugin command defined above.

		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.html#addButton

		editor.ui.addButton( 'Boxwidget',

		{

			// Toolbar button tooltip.

			label: 'Insert a widget box',

			// Reference to the plugin command name.

			command: 'boxwidget',

			// Button's icon file path.

			icon: this.path + 'images/iconX16X16.png'

		} );

 

		// Add a new dialog window definition containing all UI elements and listeners.

		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.html#.add

		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.dialogDefinition.html

		CKEDITOR.dialog.add( 'boxwidget', function( editor )

		{

			var ok =null;

			return {

				// Basic properties of the dialog window: title, minimum size.

				// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.dialogDefinition.html

				title : 'widget box Properties',

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

								html : 'This SNIPPETS allows you to embed BOX HTML.',

								

							},
							{

								onShow : function(){

									// Create an element based on a native DOM element.

									var element = $("#"+this._.inputId);


									element.val(CKEDITOR.boxwidget.data.TITLE_HERE).focus();


									//var el = editor.document.$.getElementById(this._.inputId);

									//console.log(el);

								},

								type : 'text',

								id : 'TITLE_HERE',

								// Text that labels the field.

								// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.labeledElement.html#constructor

								label : 'Enter Header box',
								// This field is required.

								required : true,

								// Function to be run when the commitContent method of the parent dialog window is called.

								// Get the value of this field and save it in the data object attribute.

								// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dom.element.html#getValue

								commit : function( data )

								{

									var val = this.getValue();

									//assign data

									data.TITLE_HERE = val;

								}

							},
							
							{

								onShow : function(){

									// Create an element based on a native DOM element.

									var element = $("#"+this._.inputId);


									element.val(CKEDITOR.boxwidget.data.CONTENT_HERE).focus();

									element.height(250);
									element.ckeditor();

									//var el = editor.document.$.getElementById(this._.inputId);

									//console.log(el);

								},

								type : 'textarea',

								id : 'CONTENT_HERE',

								// Text that labels the field.

								// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.labeledElement.html#constructor

								label : 'Enter widget box',

								// This field is required.

								required : true,

								// Function to be run when the commitContent method of the parent dialog window is called.

								// Get the value of this field and save it in the data object attribute.

								// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dom.element.html#getValue

								commit : function( data )

								{

									//var val = this.getValue();
									//assign data

									data.CONTENT_HERE = CKEDITOR.instances[this._.inputId].getData();

								}

							},{

								onShow : function(){

									// Create an element based on a native DOM element.

									var element = $("#"+this._.inputId);

									element.val(CKEDITOR.boxwidget.data.FOOTER_HERE).focus();


									//var el = editor.document.$.getElementById(this._.inputId);

									//console.log(el);

								},

								type : 'text',

								id : 'FOOTER_HERE',

								// Text that labels the field.

								// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.labeledElement.html#constructor

								label : 'Enter Footer box',

								// This field is required.

								required : true,

								// Function to be run when the commitContent method of the parent dialog window is called.

								// Get the value of this field and save it in the data object attribute.

								// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dom.element.html#getValue

								commit : function( data )

								{

									var val = this.getValue();

									//assign data

									data.FOOTER_HERE = val;

								}

							}

						]

					}

				],

				onOk : function()

				{

					//delete current element

					if(CKEDITOR.boxwidget.ele)

					CKEDITOR.boxwidget.ele.remove();

									

					// Create a link element and an object that will store the data entered in the dialog window.

					// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dom.document.html#createElement

					var dialog = this,

						data = {};

					// Populate the data object with data entered in the dialog window.

					// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.html#commitContent

					this.commitContent( data );



					CKEDITOR.boxwidget.data= data;

					CKEDITOR.boxwidget.save(editor);

					CKEDITOR.boxwidget.reset();

				},

				onCancel: function() {

				

				}

			};

		} );

	}

} );