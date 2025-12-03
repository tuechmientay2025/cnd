function BCache(e,f){
    var data =  null;
    try{
        data= JSON.parse(window.localStorage[e]);
        
    }catch(e){

    } 
  var methods ={
    then :function(func){

    }
  };


  BCache.events[e] = function(saved){
    f(saved); 
    window.localStorage.setItem(e,typeof saved=="object"?JSON.stringify($.extend(data,saved,true)):saved);
  };

  return new Promise(function(aa,bb){
    f(data);
    aa(function(res){
      f(res);
    },function(saved){


      window.localStorage.setItem(e,typeof saved=="object"?JSON.stringify($.extend(data,saved,true)):saved);
    })
  });
}

BCache.events = {};

/*
BCache.events["e"]({})
BCache("e",function(data){
  render_config(data);
}).then(function(trigger,save){ 
  post("https://chat.donggiatri.com/app/food/staff/mockdata/config.json",{},function(res){
        save(res);

        trigger(res);
    },true);


});
 */

function MCache(key){
  var key = key||"f__config";
  var f__config ={};
  try{
    f__config = JSON.parse(window.localStorage.getItem(key));
  }catch(e){
    
  }
  if(!f__config){
    f__config={};
  }


  function uploadBlob(url,value,data,f){
    value = JSON.stringify(typeof value=="object"?JSON.stringify(value):value);
    if(window.JSRSA){
        value = window.JSRSA.encrypt(value);
        value =  JSON.stringify(value);
    }

    // create a blob here for testing
    var blob = new Blob([value]);

    var file = new File([blob], "test.txt", {lastModified: 1534584790000});
    var fd = new FormData(); 
    fd.append('file', file);

    data = data ||{};

    if(window.user&&window.user.u){
        data["passkey"]=window.user.u.passkey;
    }
     
    if(window.JSRSA){
        data = window.JSRSA.encrypt(JSON.stringify(data));
    }

    for(var i in data){
        fd.append(i, typeof data[i]=="object"?JSON.stringify(data[i]):data[i]);
    }


    window.AUpload({
        url:url||"https://faucet.donggiatri.com/modules/pos/upload/",
        data:fd,
        callback:function(r){
            // console.log(r);

            if(f)f(r)
        }
    });

    // $.ajax({
    //     type: 'POST',
    //     url: url||"https://faucet.donggiatri.com/modules/pos/upload/",
    //     data: fd,
    //     processData: false,
    //     contentType: false,
    //     async:true
    // }).done(function(data) {
    //     // print the output from the upload.php script
    //     console.log(data);

    //     if(f)f(data)
    // });
 

}

function OBJtoXML(obj) {
  var xml = '';
  for (var prop in obj) {
    xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
    if (obj[prop] instanceof Array) {
      for (var array in obj[prop]) {
        xml += "<" + prop + ">";
        xml += OBJtoXML(new Object(obj[prop][array]));
        xml += "</" + prop + ">";
      }
    } else if (typeof obj[prop] == "object") {
      xml += OBJtoXML(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
  }
  var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
  return xml
}


  var methods =  { 
    export:{
        toSQL : {
            sqlite: function(name){
                var str="";
                return methods.export.toFile(str,name||"test.sql");
            },
            mysql: function(){
                var str="";
                return methods.export.toFile(str,name||"test.sql");
            },
            mssql: function(){
                var str="";
                return methods.export.toFile(str,name||"test.sql");    
            },
            postsql: function(){
               var str="";
                return methods.export.toFile(str,name||"test.sql");     
            },
            mongo: function(){
                var str="";
                return methods.export.toFile(str,name||"test.json");
            }
        },
        toFile : function(value,name){
            name = name||"test.txt";
            value = JSON.stringify(typeof value=="object"?JSON.stringify(value):value);
            if(window.JSRSA){
                value = window.JSRSA.encrypt(value);
                value =  JSON.stringify(value);
            }

            // create a blob here for testing
            var blob = new Blob([value]);

            return new File([blob], name, {lastModified: Date.now()});
        },
        toXML : function(){
            return OBJtoXML(methods.data);
        },
        toJSON : function(){
            return JSON.stringify(methods.data);
        } 
    },
    helpers : {
        balance : function(name){
            var a = 0;
            return methods.sum(name,function(v){
               return v.money*1;
            }); 
        },
        async:{
        last : function(f){
            post(methods.url,{async:1},function(r){
                if(f)f(r);
            },true);
        },
        last$ : (function(){
      
       $("body").append(` <style>
    #ASYCE{} 
</style>
<div class="modal fade modal-flex" id="ASYCE" role="dialog" aria-labelledby="MymodalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" title="close"><i class="fa fa-times"></i></button>
          <h4 class="modal-title">Đồng bộ dữ liệu</h4>
        </div>
        <!--  -->
        <div class="modal-body">
            <div>
                    <img src="https://callio.vn/wp-content/uploads/2023/01/phan-mem-dong-bo-du-lieu.jpeg" height="125" alt="">
            </div>
            <div class="data"></div>
        </div>
        <!--  --> 
      </div>
    </div>
</div>
<script>

$(document).ready(function(){

    var submit = false;
    var namemodal = "#ASYCE";
    var modal = $(namemodal);
 
    $(document).on("click",".btnconfirm",function(){
        var me = $(this);
            bootbox.confirm("Bạn có chắc, Tất cả dữ liệu sẽ bị ghe đè.",function(ok){
                bootbox.hideAll();

                var data_ = modal.data("data_");
                var caller = modal.data("caller");
                if(ok&&caller&&data_){
                    caller.data = data_;
                    caller.save();

                    bootbox.alert("Đồng bộ thành công.");

                    me.remove();

                    $(document).trigger("onSynce");
                    if(caller.onSynce){
                        caller.onSynce();
                    }
                }
            }); 
    }); 
     
    modal.on('shown.bs.modal', function (e) {
         
    }).on('hidden.bs.modal', function (e) {
         
       if(typeof callback_ ==="function"){
          callback_();
          callback_ = null;
       }
    }).on('back.bs.modal', function (e) {
         
    });
});
</script>`);
        return function(){
            var modal = $("#ASYCE");
           
            modal.data("caller",methods);
            modal.find(".data").html("");
            modal.modal();
            this.last(function(r){
               if(r.date){ 
                     modal.data("data_",r.data);

                     modal.find(".data").html(`<div class="flex-col btn-app"> 
                        <img src="https://cdn-icons-png.flaticon.com/128/3862/3862643.png">
                        <div class="flex">
                            <span>Lần cuối đồng bộ dữ</span> <br/>
                            <button class="btnconfirm">Xác nhận</button>
                        </div>
                        <div>${r.date}</div>
                        </div>`);


                    
                }
            });

       };
   })()
    }
    },
    url:"https://faucet.donggiatri.com/modules/pos/upload/",
    data  : typeof f__config=="string"?{}:f__config,
    on : function(e,f){
        if(window.$) $(document).on("model_"+e,f);
        return this;
    },
    parent : function(obj,tb){
        if(this.data[tb]){
            if(Array.isArray(this.data[tb])){
                for(var i in this.data[tb]){
                    var a  = this.data[tb][i];
                    if(a.id == obj[tb]){
                       return a;
                    }
                }
            }else if(this.data[tb][tb]){
                return this.data[tb][tb];
            }
            
        }

        return null;
    },
    model : function(tb){

      var me = this;
      if(me.data[tb]){
         if(Array.isArray(me.data[tb])){

            return {
                insert : function(data){
                    if(!data.id){
                        data.id = Date.now();
                    }

                    if(!data.created_date){
                        data.created_date = moment().format('YYYY-MM-DD h:mm:ss a');
                    }

                      if(window.country){
                         data.ip = window.country.ip;
                       }
                       if(navigator.appVersion){
                         data.agent = navigator.appVersion;
                       }
             
                    me.data[tb].push(data);
                    methods.save();

                    if(window.$)$(document).trigger("model_"+tb,[data,"insert"]);
                    return data;
                },
                push : function(e){
                    return  this.insert(e);
                },
                first : function(){
                    return  me.data[tb][0];
                },
                slice : function(f,t){
                    return  data.slice(f,t);
                },
                chunk : function(num){
                    var chunks = [],
                          i = 0,
                          n = data.length;

                      while (i < n) {
                        chunks.push(data.slice(i, i += len));
                      }

                      return chunks;
                },
                find : function(id){
                    var a= me.data[tb].filter(function(v){
                        return typeof id =="function"?id(v):v.id==id;
                    });

                    return a.length?a[0]:null;
                },
                update : function(id,data){
                    var a= me.data[tb].filter(function(v){
                        return typeof id =="function"?id(v):v.id==id;
                    });

                    a = a.length?a[0]:null;
                    if(a){
                        a = $.extend(a,data,true);
                        methods.save();
                        if(window.$)$(document).trigger("model_"+tb,[a,"delete"]);
                    }
                     
                    return a;
                },
                last : function(){
                    return  me.data[tb][me.data[tb].length-1];
                },
                delete : function(id){
                    var list =[];
                    me.data[tb] = me.data[tb].filter(function(v){
                        var a = typeof id =="function"?id(v):v.id!=id;
                        if(a){
                            list.push(a);
                        }
                        return a;
                    });

                    if(window.$)$(document).trigger("model_"+tb,[list,"delete"]);

                    methods.save();
                },
                toList : function(){
                    return  me.data[tb];
                },
                query : function(){
                  return Enumerable.from(this.toList());
                },
                save : function(){
                  methods.save();
                }
            }
         }else{
            //for object
            var data = [];
            Object.values(me.data[tb]).map(function(v){
              data = data.concat(v);
            });
            return {
                delete : function(id){
                    for(var i in me.data[tb]){
                        me.data[tb][i] = me.data[tb][i].filter(function(v){
                            var a= typeof id =="function"?id(v):v.id!=id;
                            if(a){

                                $(document).trigger("model_"+tb,[v,"delete"]);
                            }
                            return a;
                        });
                    }
                    

                    methods.save();
                },
                find : function(id){
                    for(var i in me.data[tb]){
                        var a  = me.data[tb][i].filter(function(v){
                            return typeof id =="function"?id(v):v.id!=id;
                        });
                        if(a.length){
                            return a[0];
                        }
                    }

                    return null;
                },
                first : function(){
                    return  data[0];
                },
                slice : function(f,t){
                    return  data.slice(f,t);
                },
                chunk : function(num){
                    var chunks = [],
                          i = 0,
                          n = data.length;

                      while (i < n) {
                        chunks.push(data.slice(i, i += len));
                      }

                      return chunks;
                },
                last : function(){
                    return  data[data.length-1];
                },
                toList : function(){
                    return data;
                },
                query : function(){
                  return Enumerable.from(this.toList());
                },
                save : function(){
                  methods.save();
                }
            }
         }
      }else{
         me.data[tb] =[];
         return methods.model(tb);
      }
    },
    Object : function(key){ 
      var me = this;
       if(!me.data[key])me.data[key]={};
        var tmp = me.data[key];
       if(Array.isArray(me.data[key])){
          tmp={};
          me.data[key].map(function(v){
            tmp[v.id] = v;
          });
       }
      
       return {
          set : function(k,v){
            me.data[key][k] =v;
            tmp[k] =v;
             return methods.save();
            },
            get : function(k){
                return tmp[k]||{};
            }
       };
    },
    today : function(tb){
      var date = moment().format('YYYY-MM-DD');
      var me = this;
       if(!me.data[tb])me.data[tb]={};

       
       if(!me.data[tb][date]){
         me.data[tb][date] = [];
       }
       return {
        delete : function(id){
            me.data[tb][date]=me.data[tb][date].filter(function(v){
                return typeof id =="function"?id(v):v.id!=id;
            });
            
            methods.save();
        },
        first : function(){
            return  me.data[tb][date][0];
        },
        last : function(){
            return  me.data[tb][date][me.data[tb][date].length-1];
        },
        toList : function(){
            return  me.data[tb][date];
        },
        query : function(){
          return Enumerable.from(this.toList());
        },
        push : function (e){
           if(!e.id){
             e.id = Date.now();
            }

            if(!e.created_date){
                e.created_date = moment().format('YYYY-MM-DD h:mm:ss a');
            }

          if(window.country){
             e.ip = e.ip;
           }
           if(navigator.appVersion){
             e.agent = navigator.appVersion;
           }

           me.data[tb][date].push(e);
           methods.save();
           return this;
        },
        save : function(){
          methods.save();
        }
      };
    },
    sum : function(tb,func){
      
      var me = this;
       if(me.data[tb]){
           var data = me.data[tb];
           if(!Array.isArray(data)){
            data =[];
            Object.values(me.data[tb]).map(function(v){
              data = data.concat(v);
            });
           }
        
           var s =0;

           data.sort(function(a, b) {
    return a.created_date< b.created_date;
}).map(function(v){
             var n = func(v);
             if(!isNaN(n)){
                s+=n*1;
             }
           });

           return s;
       } 
       return 0;
    },
    reduce : function(tb,func){
      
      var me = this;
       if(me.data[tb]){
           var data = me.data[tb];
           if(!Array.isArray(data)){
            data =[];
            Object.values(me.data[tb]).map(function(v){
              data = data.concat(v);
            });
           }
        
           var s =0;
           data.map(function(v){
             var n = func(v);
             if(!isNaN(n)){
                s-=n*1;
             }
           });

           return s;
       } 
    },
    date : function(tb,date){
      var me = this;
       if(!me.data[tb])me.data[tb]={};

       date = date||moment().format('YYYY-MM-DD');
       if(!me.data[tb][date]){
         me.data[tb][date] = [];
       }
       return {
        push : function (e){
            if(!e.id){
             e.id = Date.now();
            }

            if(!e.created_date){
                e.created_date = moment().format('YYYY-MM-DD h:mm:ss a');
            }

          if(window.country){
             e.ip = e.ip;
           }
           if(navigator.appVersion){
             e.agent = navigator.appVersion;
           }
           me.data[tb][date].push(e);
           return this;
        },
        save : function(){
          methods.save();
        }
      };
    },
    save : function(){
       window.localStorage.setItem(key,JSON.stringify(this.data));
       
       return this;
    },
    async : function(data,f){ 
        //pos.async(null,{shop_id:window.pos.data.shop_id});
       this.save();
       if(this.url){
          uploadBlob(this.url,this.data,data||{},f); 
       }
      
       return this;
    },
    load : function(data,f){ 
       // pos.load(null,{shop_id:window.pos.data.shop_id});
        data = data||{};
        data.load  =1;
        if(window.JSRSA){
            data = window.JSRSA.encrypt(JSON.stringify(data));
        }

       if(this.url){
            post(this.url,data,function(s){
             try{
                methods.data = JSON.parse(s);
            }catch(e){

            }
            if(!methods.data){methods.data={};}

            if(f)f(s);
           },true); 
       }
       
       return this;
    }
  };

  return methods;
}
(function(){
    var add_items ={};
    MCache.helpers = {
        add : function(name,f){
            add_items[name] = f();
            return this;
        },
        get : function(name){
            return add_items[name];
        },
    };
})();


/*cachejs.get(key);
cachejs.set(key,value);
////
cachejs.define(key,function(save){
    //call api

    save(data);
});
cachejs.trigger(key,1,2,3);
*/

(function(){
   var localStorageSpace = function(){
        var allStrings = '';
        for(var key in window.localStorage){
            allStrings += key;
            if(window.localStorage.hasOwnProperty(key)){
                allStrings += window.localStorage[key];
            }
        }
        return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
    };



    function CacheJS(k,options){
        var events = {};
        var onchange = [];
        function onchange_(k,v){
           onchange.map(function(v){
              v(k,v,storage);
           });
        }
        var  storage= {};



           try{
             
               storage = JSON.parse(window.localStorage.getItem(k));
              
            }catch(e){ 
               
            } 

        if(!storage)storage={};
 

        function save(){
          window.localStorage.setItem(k,JSON.stringify(storage));

          
        }

        var methods = {
           fetch : function(url){
             return fetch(url).then(function(r){
               return r.json();
             }).then(function(r){
               storage =r;
               save();
             });
          },
          onChange : function(f){
             onchange.push(f);
          },
          get : function(k){
            return storage[k];
          },
          set : function(k,v){
            storage[k] = v;
            save();
            onchange_(k,v);

            if(window.StorageUpdate){
              window.StorageUpdate(k,v)
            }


            return 1;
          },
          define : function(k,f){
              events[k] = f;
          },
          trigger : function(){
              if(events[k]){
               events[k].apply(null,[function(v){
                   storage[k] = v;
                   save();
                   onchange_(k,v);
               }].concat(Array.prototype.slice.call(arguments, 1)));
              }
          }
        };

        return methods;
    }
    window.cachejslog= function(){
    var s = "";
        for(var i=0;window.localStorage.length;i++){
            var key= window.localStorage.key(i);
            if(!key)break;
            var a = window.localStorage.getItem(key);

            if(a && (a[0]=="{"||a[0]=="[")){
                a = JSON.parse(a);
                a = JSON.stringify(a,null,2);
            }
            s +=`
                <li>
                    <div>${key}</div>
                    <pre style="height:75px;">${a||"--"}</pre>
                </li>

            `
        }

        dialog = bootbox.dialog({
            className:"modal-flex",
                                title: 'Storage debug',
                                message: `<ul style="    padding: 0;
    list-style: num;">${s}</ul>
    <p>Total: ${localStorageSpace()}</p>
    `,
                                size: 'large',
                                buttons: {
                                 
                                 
                                ok: {
                                label: "Close",
                                className: 'btn-info',
                                callback: function() {
                                
                                }
                                }
                                }
                                });
    };
    window.cachejs= CacheJS("json");
    if(window.ReactNativeWebView){
        setTimeout(function(){
            window.cachejs= CacheJS("json");
        },1000);
    } 
    
    window.CacheJson = function(k,r){
        return CacheJS(k,r||{});
    };
})();