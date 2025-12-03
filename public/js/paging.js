  /**
 * jquery-rpmPagination - v2.0
 * A jQuery plugin for simple dynamic frontend pagination with Bootstrap CSS
 * https://github.com/sabbir-rupom/pagination-jquery
 *
 * Copyright 2019, Sabbir Hossain Rupom
 */

/* jshint esversion: 6 */
(function ($) {
    "use strict";
    /**
     * Plugin root function rpmPagination()
     *
     * @param object options Option parameter for intializing pagination plugin
     * *-----* {property} limit         Pagination item limit, [ optional ] default is 10
     * *-----* {property} total         Pagination item count in total [ optional ]
     * *-----* {property} currentPage   Current/Active page number of pagination
     * *-----* {property} domElement    Html element [tag/class] which will be count as Pagination item
     * *-------------------------------[ must be provided for dynamic pagination without page refresh, optional otherwise ]
     * *-----* {property} refresh       Page refresh flag, if enabled- page will be refreshed with query/get/post parameters [ optional ]
     * *-----* {property} link          Page refresh link [ must be provided if refresh flag is enabled, optional otherwise ]
     * *-----* {property} formElement   Pagination item filter form identity element [ optional ]
     * *-------------------------------[ If page has custom item search filter form, the pagination function will use the form to refresh the page with limit/offset parameters ]
     *
     * @returns boolean true
     */
     var tmp_table =`
<div class="row" style="margin-bottom: 8px;">
          <div class="col-md-2 col-sm-12">
             <select class="form-control paging">
               <option value="10">10</option>
               <option value="50">50</option>
               <option value="100">100</option>
            </select>
          </div>
          <div class="col-md-7 col-sm-12">
                  <div class="text-center">
                        <!-- parent element for pagination menu list -->
                        <ul class="pagination custom-pagination"></ul>

                    </div>
          </div>
          <div class="col-md-3 col-sm-12" style="position: relative;">
                  <input type="text" class="form-control search input-sm" placeholder="Tìm kiếm">
                  <img src="https://cdn-icons-png.flaticon.com/128/54/54481.png" onclick="$(this).parent().find('input').trigger('change')" style="
                      width: 25px; cursor: pointer; position: absolute;  right: 23px; top: 20%;" />
              </div>
    </div>
        <table class="table table-bordered table-striped">
           

          </table>
                    `;
     var tmp_div =`
<div class="row" style="margin-bottom: 8px;">
          <div class="col-md-2 col-sm-12">
             <select class="form-control paging">
               <option value="10">10</option>
               <option value="50">50</option>
               <option value="100">100</option>
            </select>
          </div>
          <div class="col-md-7 col-sm-12">
                  <div class="text-center">
                        <!-- parent element for pagination menu list -->
                        <ul class="pagination custom-pagination"></ul>

                    </div>
          </div>
          <div class="col-md-3 col-sm-12" style="position: relative;">
                  <input type="text" class="form-control search input-sm" placeholder="Tìm kiếm">
                  <img src="https://cdn-icons-png.flaticon.com/128/54/54481.png" onclick="$(this).parent().find('input').trigger('change')" style="
                      width: 25px; cursor: pointer; position: absolute;  right: 23px; top: 20%;" />
              </div>
    </div>
        <div class="table">
            
          </div> `;
    var bsVersion = 3;
    if(typeof $.fn.tooltip !== 'undefined') {
        bsVersion = $.fn.tooltip.Constructor.VERSION.split('.')[0];
    }
    var rpmListClass = 'page-item',
            rpmAnchorClass = 'page-link', rpmHideClass = 'hide';

    $.fn.rpmPagination = function (options) {
        var settings = $.extend({
            display:"table",
            limit: 10,
            total: 0,
            currentPage: 1,
            domElement: '.p-item',
            refresh: false,

            beforeSend:function(a){},
            link: null,
            renderItem: null,
            formElement: null
        }, options);
        var tablepaging = null;
        if($(this).hasClass('tablepaging')){
           tablepaging = $(this) ;    
        }else{
          tablepaging = $(this).closest('.tablepaging'); 
        }
        

        var tmp_ = settings.display=="div"?tmp_div:tmp_table;

        var table = null;
        if(settings.display=="div"){
            table = tablepaging.find("div.table");
            if(table.length==0){
                tablepaging.html(tmp_);
                table = tablepaging.find("div.table");
            }
        }else{
             table = tablepaging.find("table.table").clone();
            if(table.length==0){
                tablepaging.html(tmp_);
                table = tablepaging.find("table.table");
            }

            //now replace
            tablepaging.html(tmp_table).find('table.table').replaceWith(table);
        }
 
     
        var $this = tablepaging.find(".custom-pagination"),
                pages = 1,
                rpmPageNext = settings.limit,
                rpmPageTotal = settings.total,
                tBool = false,
                rpmPageDomElem = settings.domElement, rpmCustomDomElem = 'p-' + Math.random().toString(36).substr(2, 6),
                version = bsVersion[0];

        if (version == 4) {
            rpmListClass = 'page-item ' + rpmListClass;
            rpmHideClass = 'd-none', rpmAnchorClass = 'page-link';
        }

        if (rpmPageTotal <= 0) {
            tBool = true;
        }

        if(settings.renderItem==null){
            settings.renderItem= function(r,i){
                if(settings.display=="div"){
                    return `<div class="${rpmPageDomElem.replace("#","").replace(".",'')}">
                    ${JSON.stringify(r)} 
                  </div>`;
                }
                return `<tr class="${rpmPageDomElem.replace("#","").replace(".",'')}">
                    <th scope="row">${JSON.stringify(r)}</th> 
                  </tr>`
            }
        }



        if (settings.refresh === true && settings.link) {

            var abc = {
                url:settings.link,
                limit:settings.limit,
            };
            settings.beforeSend(abc);
             tablepaging.find(".loading").removeClass("hide");
            refreshPageforItems(abc,$this, settings.currentPage, abc.limit, abc.url, settings.formElement,function(res){
                tablepaging.find(".loading").addClass("hide");
                cache_request = res;
                if(res){
                    var trs = res.data.map(function(v,i){
                        return settings.renderItem(v,i);
                    }).join("\n"); 
                    if(settings.display=="div"){
                        table.html(trs);
                    }else{
                        table.find("tbody").html(trs);
                    }
                    

                   tablepaging.find('[data-i]') .each(function (i, obj) {
                        $(this).removeClass($(this).attr("data-i"));
                    }); 

                    tablepaging.find(rpmPageDomElem) .each(function (i, obj) {
                        if (tBool) {
                            rpmPageTotal = i + 1;
                        }
                        
                        $(obj).addClass(rpmCustomDomElem);
                        var a = rpmCustomDomElem + '-' + parseInt(i + 1);
                        $(obj).addClass(a).attr("data-i",a);
                    });
                    var len = res.total;

                      pages = parseInt((len/settings.limit) + 1);
                      preparePageMenus(settings.currentPage, pages, $this);

                    var reduce = 0;
                    if($(rpmPageDomElem).not(".hide").length==0){
                       if(settings.currentPage>1){
                            reduce = 1;
                       }
                    }

                    cache_request.current = 1;

                    [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage - reduce, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-item');
         
                }
            });
        }else{
            tablepaging.find(rpmPageDomElem).each(function (i, obj) {
                if (tBool) {
                    rpmPageTotal = i + 1;
                }
                $(obj).addClass(rpmCustomDomElem);
                var a = rpmCustomDomElem + '-' + parseInt(i + 1);
                $(obj).addClass(a).attr("data-i",a);
            });

            if (rpmPageTotal > settings.limit) {
                pages = parseInt((rpmPageTotal / settings.limit) + 1);
            }

            preparePageMenus(settings.currentPage, pages, $this);

            [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-item');

            if (settings.refresh && $('.' + rpmCustomDomElem).length > 0) {
                tablepaging.find('.' + rpmCustomDomElem).removeClass(rpmHideClass)
            }
        }

        tablepaging.on('change',".search",function(){
            if (settings.refresh === true && settings.link) {

                var abc = {
                    url:settings.link,
                    limit:settings.limit,
                    search : this.value
                };
                settings.beforeSend(abc);
                 tablepaging.find(".loading").removeClass("hide");
                refreshPageforItems(abc,$this, settings.currentPage, abc.limit, abc.url, settings.formElement,function(res){
                    tablepaging.find(".loading").addClass("hide");
                    cache_request = res;
                    if(res){
                        var trs = res.data.map(function(v,i){
                            return settings.renderItem(v,i);
                        }).join("\n"); 
                        if(settings.display=="div"){
                            table.html(trs);
                        }else{
                            table.find("tbody").html(trs);
                        }

                       tablepaging.find('[data-i]') .each(function (i, obj) {
                            $(this).removeClass($(this).attr("data-i"));
                        }); 

                        tablepaging.find(rpmPageDomElem) .each(function (i, obj) {
                            if (tBool) {
                                rpmPageTotal = i + 1;
                            }
                            
                            $(obj).addClass(rpmCustomDomElem);
                            var a = rpmCustomDomElem + '-' + parseInt(i + 1);
                            $(obj).addClass(a).attr("data-i",a);
                        });
                        var len = res.total;

                          pages = parseInt((len/settings.limit) + 1);
                          preparePageMenus(settings.currentPage, pages, $this);

                        var reduce = 0;
                        if($(rpmPageDomElem).not(".hide").length==0){
                           if(settings.currentPage>1){
                                reduce = 1;
                           }
                        }

                        cache_request.current = 1;

                        [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage - reduce, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-item');
             
                    }
                });
            }else{
                methods.search(this.value);
            }
          
        });  

        var methods ={
          html : function(tr){
            if(settings.display=="div"){
                table.html(tr);
            }else{
                table.find("tbody").html(tr);
            } 

            tablepaging.find('[data-i]').each(function (i, obj) {
                $(this).removeClass($(this).attr("data-i"));
            }); 

            tablepaging.find(rpmPageDomElem).removeClass("hide").each(function (i, obj) {
                if (tBool) {
                    rpmPageTotal = i + 1;
                }
                
                $(obj).addClass(rpmCustomDomElem);
                var a = rpmCustomDomElem + '-' + parseInt(i + 1);
                $(obj).addClass(a).attr("data-i",a);
            });

            $this.html("");

            var len = tablepaging.find(rpmPageDomElem).length;

                  pages = parseInt((len/settings.limit) + 1);
                  preparePageMenus(settings.currentPage, pages, $this);

                var reduce = 0;
                if(tablepaging.find(rpmPageDomElem).not(".hide").length==0){
                   if(settings.currentPage>1){
                        reduce = 1;
                   }
                }

                [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage - reduce, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-item');
     
 
          },
          prepend : function(tr){
            // var tr = $(tr).addClass(settings.domElement+" "+rpmCustomDomElem+" "+rpmCustomDomElem + '-' + parseInt($(rpmPageDomElem).length + 1));
            table.find("tbody").prepend(tr);

            tablepaging.find('[data-i]') .each(function (i, obj) {
                $(this).removeClass($(this).attr("data-i"));
            }); 

            tablepaging.find(rpmPageDomElem) .each(function (i, obj) {
                if (tBool) {
                    rpmPageTotal = i + 1;
                }
                
                $(obj).addClass(rpmCustomDomElem);
                var a = rpmCustomDomElem + '-' + parseInt(i + 1);
                $(obj).addClass(a).attr("data-i",a);
            });
            this.refresh();
 
          },
          filters : function(cls){
            var all = table.find(cls);
            tablepaging.find('[data-i]') .each(function (i, obj) {
                $(this).removeClass($(this).attr("data-i"));
            });

            $this.html("");

            if(all.length>0){ 

                all.each(function (i, obj) {

                    if (tBool) {
                        rpmPageTotal = i + 1;
                    }
                    
                    $(obj).addClass(rpmCustomDomElem);
                    var a = rpmCustomDomElem + '-' + parseInt(i + 1);
                    $(obj).addClass(a).attr("data-i",a);
                });
                var len = all.length;

                  pages = parseInt((len/settings.limit) + 1);
                  preparePageMenus(settings.currentPage, pages, $this);

                var reduce = 0;
                if(all.not(".hide").length==0){
                   if(settings.currentPage>1){
                        reduce = 1;
                   }
                }

                [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage - reduce, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-item');
     
            }else if(cls==""){
                if( settings.link){
                    this.reloadAjax()
                }else{
                    tablepaging.find(rpmPageDomElem).removeClass('hide').each(function (i, obj) {
                    if (tBool) {
                        rpmPageTotal = i + 1;
                    }
                    
                    tablepaging.find(obj).addClass(rpmCustomDomElem);
                        var a = rpmCustomDomElem + '-' + parseInt(i + 1);
                        $(obj).addClass(a).attr("data-i",a);
                    });

                    var len = tablepaging.find(rpmPageDomElem).length;
                    pages = parseInt((len/settings.limit) + 1);
                    preparePageMenus(settings.currentPage, pages, $this);

                    var reduce = 0;
                    if(tablepaging.find(rpmPageDomElem).not(".hide").length==0){
                       if(settings.currentPage>1){
                            reduce = 1;
                       }
                    }

                    [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage - reduce, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-item');
     
                }
                
            }else{
                tablepaging.find(rpmPageDomElem) .each(function (i, obj) {
                    if (tBool) {
                        rpmPageTotal = i + 1;
                    }
                    
                    tablepaging.find(obj).addClass(rpmCustomDomElem+" hide");
                    var a = rpmCustomDomElem + '-' + parseInt(i + 1);
                    $(obj).addClass(a).attr("data-i",a);
                });

                var len = 0;
                pages = 1;
                preparePageMenus(settings.currentPage, pages, $this);

                 
            }
 
          },
           append : function(tr){
            // var tr = $(tr).addClass(settings.domElement+" "+rpmCustomDomElem+" "+rpmCustomDomElem + '-' + parseInt($(rpmPageDomElem).length + 1));
            if(settings.display=="div"){
                table.html(tr);
            }else{
                table.find("tbody").html(tr);
            }

            $('[data-i]') .each(function (i, obj) {
                $(this).removeClass($(this).attr("data-i"));
            }); 

            tablepaging.find(rpmPageDomElem) .each(function (i, obj) {
                if (tBool) {
                    rpmPageTotal = i + 1;
                }
                
                $(obj).addClass(rpmCustomDomElem);
                var a = rpmCustomDomElem + '-' + parseInt(i + 1);
                $(obj).addClass(a).attr("data-i",a);
            });
            this.refresh();
 
          },
          reloadAjax: function(){
            // cache_request.url=settings.link;

            settings.beforeSend(cache_request);

            if(settings.display=="div"){
                        table.html("");
            }else{
                table.find("tbody").html("");
            } 

            refreshPageforItems(cache_request,$this, cache_request.current, cache_request.limit, settings.link, settings.formElement,function(res){
                tablepaging.find(".loading").addClass("hide");
                if(res){
                    var trs = res.data.map(function(v,i){
                        return settings.renderItem(v,i);
                    }).join("\n"); 
                    if(settings.display=="div"){
                        table.html(trs);
                    }else{
                        table.find("tbody").html(trs);
                    }

                    $('[data-i]') .each(function (i, obj) {
                        $(this).removeClass($(this).attr("data-i"));
                    }); 

                    tablepaging.find(rpmPageDomElem) .each(function (i, obj) {
                        if (tBool) {
                            rpmPageTotal = i + 1;
                        }
                        
                        $(obj).addClass(rpmCustomDomElem);
                        var a = rpmCustomDomElem + '-' + parseInt(i + 1);
                        $(obj).addClass(a).attr("data-i",a);
                    });
                    var len = res.total;

                      pages = parseInt((len/settings.limit) + 1);
                      // preparePageMenus(settings.currentPage, pages, $this);

                    var reduce = 0;
                    if(tablepaging.find(rpmPageDomElem).not(".hide").length==0){
                       if(settings.currentPage>1){
                            reduce = 1;
                       }
                    }

                     var current =  parseInt((res.offset/res.limit) + 1); 
                     cache_request.current =  parseInt((res.offset/res.limit) + 1); 

                    [settings.currentPage, rpmPageNext] = preparePageItems(cache_request.current, rpmPageNext, res.limit, rpmCustomDomElem, 'page-item');
                    

                    tablepaging.find(rpmPageDomElem).removeClass("hide");

                    preparePageMenus(cache_request.current, pages, $this);
                }
            });
          },
          refresh : function(){

            var len = tablepaging.find(rpmPageDomElem).length;

              pages = parseInt((len/settings.limit) + 1);
              preparePageMenus(settings.currentPage, pages, $this);

            var reduce = 0;
            if(tablepaging.find(rpmPageDomElem).not(".hide").length==0){
               if(settings.currentPage>1){
                    reduce = 1;
               }
            }

            [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage - reduce, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-item');
 
          },
          limit : function(num){
            tablepaging.find(rpmPageDomElem).each(function (i, obj) {
                if (tBool) {
                    rpmPageTotal = i + 1;
                }
                $(obj).addClass(rpmCustomDomElem);
                $(obj).addClass(rpmCustomDomElem + '-' + parseInt(i + 1));
            });

            if (rpmPageTotal > settings.limit) {
                pages = parseInt((rpmPageTotal / settings.limit) + 1);
            }

            preparePageMenus(settings.currentPage, pages, $this);

            [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-item');

            if (settings.refresh && $('.' + rpmCustomDomElem).length > 0) {
                $('.' + rpmCustomDomElem).removeClass(rpmHideClass)
            }
        
             settings.limit = num;
              var len = tablepaging.find(rpmPageDomElem).length;

              pages = parseInt((len/settings.limit) + 1);
              preparePageMenus(settings.currentPage, pages, $this);

            var reduce = 0;
            if(tablepaging.find(rpmPageDomElem).not(".hide").length==0){
               if(settings.currentPage>1){
                    reduce = 1;
               }
            }

            [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage - reduce, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-item');
          },
          search : function(value,callback){
            tablepaging.find('.' + rpmCustomDomElem).removeClass(rpmHideClass)
            if(value){
              var old = value.toLowerCase();
              value= old.split(" ");
                value.map(function(v){
                   tablepaging.find(rpmPageDomElem).each(function(i,k){
                      var val = callback?callback.call(k,old):$(this).text().trim().toLowerCase().replace(/\s+/," ").includes(v);
                      if(val){
                        $(k).addClass("f");
                      }else{
                        $(k).removeClass("f");
                      }
                   });
                });

               var len = tablepaging.find(rpmPageDomElem+".f").length;

                pages = parseInt((len/settings.limit) + 1);
                  preparePageMenus(settings.currentPage, pages, $this);

      
                

                [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-item');  

                tablepaging.find(rpmPageDomElem).not(".f").addClass("hide");
                tablepaging.find(rpmPageDomElem+".f").removeClass("hide f").show();

            }else{
              tablepaging.find(rpmPageDomElem).removeClass("f");
              this.refresh();
            }
            
          }
        };
        $(this).data("rpmPagination",methods);

        var cache_request = {limit:20};
 
        /**
         * Process html pagination on pagination-menu click
         */
        tablepaging.on('click', '.page-item > a', function (e) {
            e.preventDefault();

            if ($(this).parent().hasClass('disabled') || $(this).parent($this).length === 0) {
                return false;
            } else {
                if (settings.refresh === true && settings.link) {
                    var abc = {
                        url:settings.link,
                        limit:settings.limit,
                    };
                    settings.beforeSend(abc);

                    var page = $(this).attr("data-page_no")*1;

                    tablepaging.find(".loading").removeClass("hide");

                    refreshPageforItems(abc,$this, page, abc.limit, abc.url, settings.formElement,function(res){
                        tablepaging.find(".loading").addClass("hide");

                        cache_request = res;
                        if(res){
                            var trs = res.data.map(function(v,i){
                                return settings.renderItem(v,i);
                            }).join("\n"); 
                            if(settings.display=="div"){
                                table.html(trs);
                            }else{
                                table.find("tbody").html(trs);
                            }

                            tablepaging.find('[data-i]') .each(function (i, obj) {
                                $(this).removeClass($(this).attr("data-i"));
                            }); 

                             tablepaging.find(rpmPageDomElem) .each(function (i, obj) {
                                if (tBool) {
                                    rpmPageTotal = i + 1;
                                }
                                
                                $(obj).addClass(rpmCustomDomElem);
                                var a = rpmCustomDomElem + '-' + parseInt(i + 1);
                                $(obj).addClass(a).attr("data-i",a);
                            });
                            var len = res.total;

                              pages = parseInt((len/settings.limit) + 1);
                              // preparePageMenus(settings.currentPage, pages, $this);

                            var reduce = 0;
                            if(tablepaging.find(rpmPageDomElem).not(".hide").length==0){
                               if(settings.currentPage>1){
                                    reduce = 1;
                               }
                            }
                            var current =  parseInt((res.offset/res.limit) + 1); 
                            cache_request.current =  parseInt((res.offset/res.limit) + 1); 
                            settings.currentPage = cache_request.current;
                            // preparePageItems(settings.currentPage - reduce, rpmPageNext, res.limit, rpmCustomDomElem, 'page-item');
                            
                            

                            preparePageMenus(cache_request.current, pages, $this);
                        }
                    });
                } else {
                    if ($(this).parent().hasClass('prev')) {
                        [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage, rpmPageNext, settings.limit, rpmCustomDomElem, 'prev');
                    } else if ($(this).parent().hasClass('next')) {
                        [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage, rpmPageNext, settings.limit, rpmCustomDomElem, 'next');
                    } else {
                        let cl = $(this).data('page_no');
                        settings.currentPage = parseInt(cl);
                        [settings.currentPage, rpmPageNext] = preparePageItems(settings.currentPage, rpmPageNext, settings.limit, rpmCustomDomElem, 'page-item');
                    }

                    preparePageMenus(settings.currentPage, pages, $this);
                }

                
            }

        });

        return true;
    };

    /**
     *
     * @param {obj} obj Pagination item anchor object
     * @param {int} current Current page number
     * @param {int} limit Pagination item limit
     * @param {string} url Custom source url for passing query parameters
     * @param {string} form Query-Element-String to determined existing form
     * @returns {} nothing
     */

    function refreshPageforItems(abc,obj, current, limit, url, form,callback) {
        let offset = 0;
        if(obj){
            if (obj.parent().hasClass('prev')) {
                offset = limit * (current - 2);
            } else if (obj.parent().hasClass('next')) {
                offset = limit * current;

            } else {
                let cl = obj.data('page_no');
                var a = parseInt(cl);
                current = isNaN(a)?current:a;
                offset = limit * (current - 1);
            }
        }
        

        var re = {limit:limit,offset : isNaN(offset)?0:offset};
        var n = $.extend(abc,re,true);
        if(n.data){
            delete n.data;
        }
        post(url,n,function(res){
            if(res){
                res = $.extend(re,res,true);
            }
            callback(res);
        });

        // let ap;
        // if (form === null || form === '' || $(form).length <= 0) {
        //     ap = '?';
        //     if (url.includes('?')) {
        //         ap = '&';
        //     }

        //     window.location.href = url + ap + 'limit=' + limit + '&offset=' + offset;
        // } else {
        //     form = $(form);
        // }

        // form.append($("<input />").attr("type", "hidden").attr("name", "limit").attr("value", limit));
        // form.append($("<input />").attr("type", "hidden").attr("name", "offset").attr("value", offset)).submit();

        return;
    }
    function post(url,data,func){
         

          $.ajax({
            url: url,
            async: true, 
            data:data,
            success: function (json) {
              try{
                json = JSON.parse(json);
              }catch(e){}
              func(json)
            }
          });

     
    }
    /**
     * Show / Hide pagination items based on current page-menu
     *
     * @param {num} current_page Current page number
     * @param {num} next Number of next pagination item
     * @param {num} limit Pagination item limit to show in frontend
     * @param {string} element Pagination item element
     * @param {string} type Type of pagination menu
     * @returns {Array} [ Current page number and Number of next pagination item  ]
     */
    var preparePageItems = function (current_page, next, limit, element, type) {

        $('.' + element).addClass(rpmHideClass)

        var current = 0;

        if (type === 'prev') {
            next = next - limit;
            current = next - limit + 1;
            for (let i = current; i <= next; i++) {
                $('.' + element + '-' + i).removeClass(rpmHideClass);
            }
            current_page--;

        } else if (type === 'next') {
            current = next + 1;
            next = next + limit;
            for (let i = current; i <= next; i++) {
                $('.' + element + '-' + i).removeClass(rpmHideClass);
            }
            current_page++;
        } else if (type === 'page-item') {
            current = (limit * (current_page - 1)) + 1;
            next = (limit * (current_page - 1)) + limit;
            for (let i = current; i <= next; i++) {
                $('.' + element + '-' + i).removeClass(rpmHideClass);
            }
        }


        // if($('.' + element).hasClass("f")){
        //   $('.' + element).addClass(rpmHideClass);
        // }


        return [current_page, next];
    };

    /**
     * Rearrage pagination menu after each pagination item list transition
     *
     * @param {num} current_page
     * @param {num} pages
     * @param {string} element
     * @returns {boolean} true
     */
    var preparePageMenus = function (current_page, pages, element) {
        if(pages<2){
          return false;
        }
        $(element).html('');
        let pageArray = [], fp = 1, lp = (pages - 1);
        let menuHtml = '';

        if (Math.abs(current_page - fp) < 3) {
            pageArray = [1, 2, 3, 4, '...', lp];
        } else if (Math.abs(current_page - lp) < 3) {
            pageArray = [1, '...', lp - 3, lp - 2, lp - 1, lp];
        } else if (lp <= 6) {
            for (let i = 1; i <= lp; i++) {
                pageArray.push(i);
            }
        } else {
            pageArray = [1, '...', current_page - 1, current_page, current_page + 1, '...', lp];
        }

        menuHtml = '<li class="' + rpmListClass + ' prev ' + (current_page === fp ? 'disabled' : '') + '"><a class="' + rpmAnchorClass + '" href="#">Trang trước</a></li>';
        for (let i = 0; i < pageArray.length; i++) {
            if (lp <= i) {
                break;
            } else {

                if (pageArray[i] === '...') {
                    menuHtml += '<li class="' + rpmListClass + ' page-inf disabled"><a class="' + rpmAnchorClass + '" data-page_no="..." href="#">...</a></li>';
                } else {
                    menuHtml += '<li class="' + rpmListClass + ' page-' + pageArray[i] + ' ' + (pageArray[i] === current_page ? 'disabled' : '') + '"><a class="' + rpmAnchorClass + '" data-page_no="' + pageArray[i] + '" href="#">' + pageArray[i] + '</a></li>';
                }
            }
        }
        menuHtml += '<li class="' + rpmListClass + ' next ' + (current_page === lp ? 'disabled' : '') + '"><a class="' + rpmAnchorClass + '" href="#">Kê tiếp</a></li>';
        $(element).append(menuHtml);


        return true;
    };

})(jQuery);