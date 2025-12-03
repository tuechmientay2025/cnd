setTimeout(function() {

    jQuery(document).ready(function($){
      $.ajax({
            url: site_url_ajax(),
            type: 'POST',
            data: {action:"notification_new"},
            async: true,
            success: function(num) {
                if(num){
                    $(".woocommerce-MyAccount-navigation-link--notification").append('<span class="notification-style-1">'+num+'</span>');
                }
            }
        });
  });
},3000);