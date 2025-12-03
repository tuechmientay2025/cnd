jQuery(document).ready(function($) {
	$(document).on("click","[tracker]",function(e){

		var id = $(this).data("id");
		var key = $(this).data("keyword");

		 $.ajax({
            url: "<?php echo site_url_ajax_tracker() ?>",
            global: false,
            type: 'POST',
            data: {action:"tracker_click",keyword:keyword,id:id},
            async: true,
            success: function() {}
        });
	});

    window.AhluTracker = function(id,keyword){
        $.ajax({
            url: "<?php echo site_url_ajax_tracker() ?>",
            global: false,
            type: 'POST',
            data: {action:"tracker_click",keyword:keyword,id:id},
            async: true,
            success: function() {}
        });
    };
});