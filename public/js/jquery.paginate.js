/*
    jquery.paginate
    ^^^^^^^^^^^^^^^

    Description: Add a pagination to everything.
    Version: Version 0.3.0
    Author: Kevin Eichhorn (https://github.com/neighbordog)
*/

(function( $ ) {

function chunk (arr, len) {

  var chunks = [],
      i = 0,
      n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}

    $.paginate = function(element, options) {

        /*
            #Defaults
        */
        var defaults = {
            data:null,
            onRenderItem : function(v){},
            perPage:                3,              //how many items per page
            autoScroll:             true,           //boolean: scroll to top of the container if a user clicks on a pagination link
            scope:                  '>*',             //which elements to target
            paginatePosition:       ['bottom'],     //defines where the pagination will be displayed
            containerTag:           'nav',
            paginationTag:          'ul',
            itemTag:                'li',
            linkTag:                'a',
            useHashLocation:        true,           //Determines whether or not the plugin makes use of hash locations
            onPageClick:            function() {}   //Triggered when a pagination link is clicked

        };

        var plugin = this;
        var plugin_index = $('.paginate').length;

        plugin.settings = {};

        var $element = $(element);

        var curPage, items, offset, maxPage;

        function getData(){
            return plugin.settings.data.filter(function(v){
                return v.opacity===undefined || v.opacity==1;
            });
        }

        function getMaxPage(){
            if(plugin.settings.data){
                return Math.ceil(getData().length / plugin.settings.perPage);
            }
            items =  $element.find(plugin.settings.scope);
            return Math.ceil(items.length / plugin.settings.perPage ); //determines how many pages exist
        }

        /*
            #Initliazes plugin
        */
        plugin.init = function() {
            

            curPage = 1;
           
            maxPage = getMaxPage();

            var paginationHTML = generatePagination(); //generate HTML for pageination


            $('.paginate-pagination-' + plugin_index).remove();
            if(maxPage>1){
                if($.inArray('top', plugin.settings.paginatePosition) > -1) {

                $element.before(paginationHTML);
            }

            if($.inArray('bottom', plugin.settings.paginatePosition) > -1) {
                $element.after(paginationHTML);
            }

            $element.addClass("paginate");
            $element.addClass("paginate-" + plugin_index);
            }
            

            var hash = location.hash.match(/\#paginate\-(\d)/i);

            //Check if URL has matching location hash
            if(hash && plugin.settings.useHashLocation) {
                plugin.switchPage(hash[1]);
            } else {
                plugin.switchPage(1); //go to initial page
            }


            $element.on("click","ul a",function(e){
                e.preventDefault();
            });

        };

        /*
            #Switch to Page > 'page'
        */
        plugin.switchPage = function(page) {

            if(page == "next") {
                page = curPage + 1;
            }

            if(page == "prev") {
                page = curPage - 1;
            }

            //If page is out of range return false
            if(page < 1 || page > maxPage) {
                return false;
            }

            if(page > maxPage) {
                $('.paginate-pagination-' + plugin_index).find('.page-next').addClass("deactive");
                return false;
            } else {
                $('.paginate-pagination-' + plugin_index).find('.page-next').removeClass("deactive");
            }

            $('.paginate-pagination-' + plugin_index).find('.active').removeClass('active');
            $('.paginate-pagination-' + plugin_index).find('.page-' + page).addClass('active');

            offset = (page - 1) * plugin.settings.perPage;


            if(plugin.settings.data){

                var aaa =chunk(getData(),plugin.settings.perPage);

                aaa = aaa[page - 1];
                console.log(aaa);

               $element.html(aaa.map(function(v){
                    return plugin.settings.onRenderItem(v);
                }).join(""));
               $( items ).show();
            }else{
                $( items ).hide();

                //Display items of page
                for(i = 0; i < plugin.settings.perPage; i++) {
                    if($( items[i + offset] ).length)
                        $( items[i + offset] ).fadeTo(100, 1);
                }    
            }
            

            //Deactive prev button
            if(page == 1) {
                $('.paginate-pagination-' + plugin_index).find('.page-prev').addClass("deactive");
            } else {
                $('.paginate-pagination-' + plugin_index).find('.page-prev').removeClass("deactive");
            }

            //Deactive next button
            if(page == maxPage) {
                $('.paginate-pagination-' + plugin_index).find('.page-next').addClass("deactive");
            } else {
                $('.paginate-pagination-' + plugin_index).find('.page-next').removeClass("deactive");
            }

            curPage = page;

            return curPage;

        };

        /*
        #Kills plugin
        */
        plugin.kill = function() {

            $( items ).show();
            $('.paginate-pagination-' + plugin_index).remove();
            $element.removeClass('paginate');
            $element.removeData('paginate');

        };

        plugin.reset = function(s) {

            plugin.settings.data.map(function(v){
                v.opacity=1;
            });
            plugin.init();
        };

        plugin.search = function(s) {

            if(!s){

                plugin.settings.data.map(function(v){
                    v.opacity=1;
                 
                });
                plugin.init();
            }else{
                s = Array.isArray(s)?s:s.split("-");
                plugin.filters(function(v){
                    v.opacity =0;
                    var kk = v.title.make_slug();
                    for(var i in n){
                      if(kk.includes(n[i])){
                         v.opacity = 1;
                        break;
                      }
                    }    
                   
                });
            } 
        };

        plugin.filters = function(f) {
            plugin.settings.data.map(f);
            
            plugin.init();
        };

        plugin.prepend = function(newdata) {

            plugin.settings.data = [newdata].concat(plugin.settings.data);
            plugin.switchPage(1);
          
        };
        plugin.append = function(newdata) { 
            plugin.settings.data.push(newdata);
 
            plugin.switchPage(1);
            
        };


        plugin.paging = function(num) {
            plugin.settings.perPage = num;


            plugin.init();

            

            // maxPage = Math.ceil( items.length / plugin.settings.perPage ); //determines how many pages exist

            // var paginationHTML = generatePagination(); //generate HTML for pageination

            // if($.inArray('top', plugin.settings.paginatePosition) > -1) {
            //     $element.before(paginationHTML);
            // }

            // if($.inArray('bottom', plugin.settings.paginatePosition) > -1) {
            //     $element.after(paginationHTML);
            // }

            // $element.addClass("paginate");
            // $element.addClass("paginate-" + plugin_index);

            // var hash = location.hash.match(/\#paginate\-(\d)/i);

            // //Check if URL has matching location hash
            // if(hash && plugin.settings.useHashLocation) {
            //     plugin.switchPage(hash[1]);
            // } else {
            //     plugin.switchPage(1); //go to initial page
            // }

        };

        function render_page_link(i){
            var paginationEl = '<' + plugin.settings.itemTag + '>';
            paginationEl += '<' + plugin.settings.linkTag + ' href="#paginate-' + i + '" data-page="' + i + '" class="page '+ (curPage==i?"active":"")+' page-' + i + '">' + i + '</' + plugin.settings.linkTag + '>';
            paginationEl += '</' + plugin.settings.itemTag + '>';

            return paginationEl;
        }
        /*
        #Generates HTML for pagination (nav)
        */
        var generatePagination = function() {

            var paginationEl = '<' + plugin.settings.containerTag + ' class="paginate-pagination paginate-pagination-' + plugin_index + '" data-parent="' + plugin_index + '">';
            
            paginationEl += '<' + plugin.settings.paginationTag + '>';

            paginationEl += '<' + plugin.settings.itemTag + '>';
            paginationEl += '<' + plugin.settings.linkTag + ' href="#" data-page="prev" class="page page-prev">&laquo;</' + plugin.settings.linkTag + '>';
            paginationEl += '</' + plugin.settings.itemTag + '>';
            paginationEl += '</' + plugin.settings.paginationTag + '>';


            // if(maxPage>8){
            //     for(i = 1; i <= curPage+3; i++) {
            //         paginationEl += render_page_link(i);
            //     }
            //     paginationEl += '<' + plugin.settings.itemTag + '>';
            //     paginationEl += '<span>...</span>';
            //     paginationEl += '</' + plugin.settings.itemTag + '>';
            //     for(i = curPage+8; i <= curPage+8+2; i++) {
            //         paginationEl += render_page_link(i);
            //     }
            //     paginationEl += '<' + plugin.settings.itemTag + '>';
            //     paginationEl += '<span>...</span>';
            //     paginationEl += '</' + plugin.settings.itemTag + '>';

            //     for(i = maxPage-4; i >0; i--) {
            //         paginationEl += render_page_link(i);
            //     }
            paginationEl += '<' + plugin.settings.paginationTag + ' class="second">';
            // }else{
                for(i = 1; i <= maxPage; i++) {
                    paginationEl += render_page_link(i);
                }
            // }
             paginationEl += '</' + plugin.settings.paginationTag + '>';
            
            paginationEl += '<' + plugin.settings.paginationTag + '>';
            paginationEl += '<' + plugin.settings.itemTag + '>';
            paginationEl += '<' + plugin.settings.linkTag + ' href="#" data-page="next" class="page page-next">&raquo;</' + plugin.settings.linkTag + '>';
            paginationEl += '</' + plugin.settings.itemTag + '>';
            paginationEl += '</' + plugin.settings.paginationTag + '>';

           
            paginationEl += '</' + plugin.settings.containerTag + '>';

            //Adds event listener for the buttons
            $(document).on('click', '.paginate-pagination-' + plugin_index + ' .page', function(e) {
                e.preventDefault();

                var page = $(this).data('page');
                var paginateParent = $(this).parents('.paginate-pagination').data('parent');

                //Call onPageClick callback function
                $('.paginate-' + paginateParent).data('paginate').settings.onPageClick();

                page = $('.paginate-' + paginateParent).data('paginate').switchPage(page);

                if(page) {
                    if(plugin.settings.useHashLocation)
                        location.hash = '#paginate-' + page; //set location hash

                    if(plugin.settings.autoScroll)
                        $('html, body').animate({scrollTop: $('.paginate-' + paginateParent).offset().top}, 'slow');

                }

            });

            return paginationEl;

        };

        //go
        plugin.settings = $.extend({}, defaults, options);
        plugin.init();

    };

    $.fn.paginate = function(options) {

        return this.each(function() {
            if (undefined === $(this).data('paginate')) {
                var plugin = new $.paginate(this, options);
                    $(this).data('paginate', plugin);
            }
        });

    };

}( jQuery ));