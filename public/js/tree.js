;(function ( $, window, document, undefined ) {
  /*
  $('.treeview_container').Ahlutree({
           languages:{
            en:{
                refresh: "Refresh"
            }
          },
          lang : "en",

          render : function(data){
            return "<a data-id='"+data.id+"' href='javascript:void(0)'><strong>"+data.fullname+"</strong>"+(data.hasChild!='0'?`(${data.hasChild})`:'')+" </a> <a class='detail btn btn-primary btn-xs pickerProfile' data-info='"+JSON.stringify(data)+"' href='#'>Chi tiết</a>";
          },
          data: function(callback){ 
            showLoader(2);
            win.user.wait(function(){ 
                userSDK.tree.treeF(0,function(data){
                  callback(Object.values(data));
                  // console.log(data);
                },true);
            });
          },
          onDemandData: function (id,callback) {
            showLoader(2);
            userSDK.tree.treeF(id,function(res){
                 callback(Object.values(res));
            },true);
          }
        });
   */
    var loaded = 0; 

    /*
    [{"id":"6","displayName":"test","hasChild":"0"}]
     */
    var pluginName = "Ahlutree",

        defaults={
      data: function () { },
      onDemandData: function () { },
      render : null,
      languages:{
        en:{
            refresh: "Refresh"
        }
      },
      lang : "en"
    };

    function Plugin( element, options ) {

        if(loaded==0){
          loaded=1;
           $("body").append('<style type="text/css">.a-tree{position: relative;max-width: 400px;}.a-tree .refresh{position: absolute;right: 0;top: 0;}.tree-list{min-height: 200px;box-shadow: 0 0 0 1px #cecece;padding:8px;border-radius: 8px;}.a-tree>ul{padding-left: 0;}.a-tree ul{list-style: none;}.a-tree .refresh{position: absolute;right: 10px;top: -10px;z-index: 1;}<\/style>');
        }

        this.element = element;

        this.$elem = $(this.element);

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;

        this._name = pluginName;
        var that = this;
        var settings = this.options;
        this.$elem.data(pluginName,this);

        this.$elem.addClass("a-tree");

        function lang(k){
            var lang = settings.lang?settings.lang:"en";
            return settings.languages[lang][k]?settings.languages[lang][k]:k;
        }


        var btn_refresh = this.$elem.find(".refresh");
        if(btn_refresh.length==0){
            btn_refresh = $('<div class="refresh"><button type="button" class="btn btn-primary btn-xs"><i class="fa fa-refresh" aria-hidden="true"></i> '+lang('refresh')+'</button></div>');
            this.$elem.append(btn_refresh);
        }
        
        function GetData(f) {
          return settings.data(f);
        }
        
        function createTree(data, ulClassName) {
          var parentUl = document.createElement('ul');
          parentUl.className = ulClassName;
          data.forEach(function(element){
            var liElement = document.createElement('li');
            liElement.setAttribute('data-hasChild', parseInt(element.hasChild)?true:false);
            liElement.setAttribute('data-id', element.id);
            liElement.setAttribute('data-isLoaded', element.isLoaded?true:false);
            if (element.hasChild!=0) {
              var spanElement = document.createElement('span');
              spanElement.innerHTML = typeof settings.render==="function"? settings.render(element):element.displayName;
              spanElement.className = 'tv-caret';
              liElement.append(spanElement);

                if(element.children&&element.children.length>0){
                liElement.append(createTree(element.children, 'tv-nested'));
              }
            } else {
              liElement.innerHTML = typeof settings.render==="function"? settings.render(element):element.displayName;
            }

            
            parentUl.append(liElement);
          });
          return parentUl;
        }
        var me = this.$elem;
        
        
        me.off('click','.tv-caret').on('click','.tv-caret', function () {
          var $this = $(this);
          var li = $this.parent('li');
          var id  = li.data("id");
          var active = li.data("isloaded");
          if (!active && id) {
            // fetch data
            settings.onDemandData(id,function(data){
              if(typeof data==="object" && data.length>0){
            var a = createTree(data, 'tv-nested');
                // Append the data
                li.append(a);
                // Set isloaded to true
                li.data("isloaded",true);
                li.find('.tv-nested').toggleClass("active");
                $this.toggleClass("tv-caret-down");
              }
              
            });
          }else{
            li.find('.tv-nested').eq(0).toggleClass("active");
             $this.toggleClass("tv-caret-down");
          }

        });
        me.append('<div class="tree-list"></div>');
        
        me.off('click','.refresh button').on('click','.refresh button', function () {
            me.find('.tree-list').html("");
            GetData(function(data){
              if(typeof data==="object" && data.length>0){
                me.find('.tree-list').append(createTree(data, 'tv-ul'));
              }
            });
        });
        me.find('.refresh button').trigger('click');

        // GetData(function(data){
        //   if(typeof data==="object" && data.length>0){
        //     me.append(createTree(data, 'tv-ul'));
        //   }
        // });
    }   


$.fn[pluginName] = function ( options ) {
      var lists  = this,
            retval = this;
        var params =   arguments;
        lists.each(function()
        {
            var plugin = $(this).data(pluginName);
            if (!plugin) {
                $(this).data(pluginName, new Plugin(this, options));
                $(this).data(pluginName+"-id", new Date().getTime());
            }else {
                if (typeof options === 'string' && typeof plugin[options] === 'function') {
                    retval = plugin[options].apply(plugin,Array.prototype.slice.call(params,1));
                }
            }
        });
        return retval || lists;
    };
})( jQuery, window, document );
(function(win){
	win.listToTree=function (data, options) {
  options = options || {};
  var ID_KEY = options.idKey || 'id';
  var PARENT_KEY = options.parentKey || 'parent';
  var CHILDREN_KEY = options.childrenKey || 'children';

  var tree = [],
    childrenOf = {};
  var item, id, parentId;

  for (var i = 0, length = data.length; i < length; i++) {
    item = data[i];
    id = item[ID_KEY];
    parentId = item[PARENT_KEY] || 0;
    // every item may have children
    childrenOf[id] = childrenOf[id] || [];
    // init its children
    item[CHILDREN_KEY] = childrenOf[id];
    if (parentId != 0) {
      // init its parent's children object
      childrenOf[parentId] = childrenOf[parentId] || [];
      // push it into its parent's children object
      childrenOf[parentId].push(item);
    } else {
      tree.push(item);
    }
  };

  return tree;
};

Array.prototype.tree = function(idKey,parentKey,childrenKey){
    return listToTree(this, {
      idKey: idKey||'id',
      parentKey: parentKey||'parentId',
      childrenKey: childrenKey||'children'
    });
};
String.prototype.tree = function(list){
    var txt = this.ToString().split(",");
    return list.tree(txt[0],txt[1],'children');
};

// var list = [{
//   "id": "12",
//   "parentId": "0",
//   "text": "Man",
//   "level": "1",
//   "children": null
// }, {
//   "id": "6",
//   "parentId": "12",
//   "text": "Boy",
//   "level": "2",
//   "children": null
// }, {
//   "id": "7",
//   "parentId": "12",
//   "text": "Other",
//   "level": "2",
//   "children": null
// }, {
//   "id": "9",
//   "parentId": "0",
//   "text": "Woman",
//   "level": "1",
//   "children": null
// }, {
//   "id": "11",
//   "parentId": "9",
//   "text": "Girl",
//   "level": "2",
//   "children": null
// }];

// var tree = listToTree(list, {
//   idKey: 'id',
//   parentKey: 'parentId',
//   childrenKey: 'children'
// });
 
})(window);