jQuery(document).ready(function($) {
	$(document).on("click","[tracker]",function(e){

		var id = $(this).data("id");
		var key = $(this).data("keyword");

		 $.ajax({
            url: "https://acua.donggiatri.com/wp-admin/admin-ajax.php?",
            global: false,
            type: 'POST',
            data: {action:"tracker_click",keyword:keyword,id:id},
            async: true,
            success: function() {}
        });
	});

    window.AhluTracker = function(id,keyword){
        $.ajax({
            url: "https://acua.donggiatri.com/wp-admin/admin-ajax.php?",
            global: false,
            type: 'POST',
            data: {action:"tracker_click",keyword:keyword,id:id},
            async: true,
            success: function() {}
        });
    };
});