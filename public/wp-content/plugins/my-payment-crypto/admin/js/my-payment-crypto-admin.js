(function( $ ) {
	 

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	var value = $("#woocommerce_usdtbep20_image").hide().val();
	var ele = $(`<div class='image-preview-wrapper'>
                                <img id='image-preview' class="upload_image_button1" src='${value||"https://placehold.co/400?text=QR%20Image"}' width='125' height="125">
                            </div>
                            <input  type="button" class="button upload_image_button1" value="Tải hình ảnh" />
        
								  	`);
	
	$("#woocommerce_usdtbep20_image").closest("fieldset").prepend(ele);

	$(".upload_image_button1").on("click",function(event){
		 event.preventDefault();
         
        // When an image is selected, run a callback.
        uploadFile({
            callback:function(attachment) {
                $( '#image-preview' ).attr( 'src', attachment.url ).css( 'width', 'auto' );
                $( '#woocommerce_usdtbep20_image' ).val( attachment.url );
            }
        }); 
	});

	$(".qrcode_usdt_user").on("click",function(event){
		 event.preventDefault();
        var me = $(this);
        // When an image is selected, run a callback.
        uploadFile({
            callback:function(attachment) {
                me.attr( 'src', attachment.url );
                $( '#wallet_usdt_qrcode' ).val( attachment.url );
            }
        }); 
	});

})( jQuery );
