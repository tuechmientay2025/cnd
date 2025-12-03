(function(){
  var callbacks = [];
  var n =0;
 var load = function() {
    
    if(callbacks){
      callbacks.map(function(v){
        v();
      });
      callbacks=null;
    }
  }
  window.MyChart= function(){
      return new Promise(function(resolve,reject){
        if(window.Chart){
          resolve();
          return;
        }
        callbacks.push(resolve);
        if(n==0){
          n=1;
          loadJS("https://cdn.jsdelivr.net/npm/chart.js",load);
        }
      });
  };
 
})();