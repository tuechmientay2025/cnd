(function ($) {
    'use strict';

    // Document ready
    $(function () {
        /* Carousel reviews */
        // $('.reviews-carousel').owlCarousel({
        //     loop: true,
        //     dots: false,
        //     nav: false,
        //     items: 1,
        // });

        /* Gallery all comment */
        var order = '';
        var container = [];
        $('.devvn_list_item').each(function() {
            var item = {
                src: $(this).find('.devvn_reviews_detail').html(),
            };
            container.push(item);
        });
        
        $('.devvn-reviews-img-popup').click(function(e) { 
            order = parseInt($(this).attr('data-order'))-1;
        });

        $('.devvn-reviews-img-popup').magnificPopup({
            type: 'inline',
            items: container,
            mainClass: 'devvn-shortcode-reviews-popup',
            gallery:{
                enabled:true
            },
            callbacks: {
                open: function() {
                    $(this).magnificPopup('goTo', order);

                    // $('.reviews-carousel').owlCarousel({
                    //     loop: true,
                    //     dots: true,
                    //     nav: false,
                    //     items: 1
                    // });

                    $('.reviews-carousel').flickity({
                        // options
                        cellAlign: 'left',
                        contain: true,
                        wrapAround: true,
                        pauseAutoPlayOnHover: true,
                        prevNextButtons: false,
                        pageDots: true,
                    });

                    $('.mfp-arrow').click(function(e) {  
                        // $('.reviews-carousel').owlCarousel({
                        //     loop: true,
                        //     dots: true,
                        //     nav: false,
                        //     items: 1
                        // });

                        $('.reviews-carousel').flickity({
                        // options
                        cellAlign: 'left',
                        contain: true,
                        wrapAround: true,
                        pauseAutoPlayOnHover: true,
                        prevNextButtons: false,
                        pageDots: true,
                    });
                    });
                }
            }
        });

        /* Gallery image comment */
        $('.cmt_attachment_img a').click(function(e) {
            e.preventDefault();
            var container = [];
            var pswp_cmt = $(this).attr('data-pswp');
            $('#cmt_attachment_img_'+pswp_cmt).find('li').each(function() {
                var $link = $(this).find('a'),
                item = {
                    src: $link.data('link'),
                    w: $link.data('width'),
                    h: $link.data('height'),
                    title: $link.data('caption')
                };
                container.push(item);
            });
            
            var $pswp = $('.pswp')[0],
            options = {
                index: $(this).parent('li').index(),
                bgOpacity: 0.85,
                showHideOpacity: true
            };
            var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
            gallery.init();
        });
    });

    // On window load
    $(window).on('load', function () {

    });

})(jQuery);