 
function getGPS(f){
    if(window.GPS){
        window.GPS(f);
    }else{

    }
    navigator.geolocation.getCurrentPosition(function(location) {
        f({lat:location.coords.latitude,lng:location.coords.longitude});
    },function(p) {
        f(0);
    });
}
 
 


setTimeout(function(){
    //override 
    window.beforeClick = function(e){};
},1000);

window.hardwareBackPress = function(){
  if($(".modal.in").length){
    var l = $(".modal.in").length;
    if(l==1){
        $(".modal.in").modal("hide");
    }else{
        $(".modal.in").eq(l-1).modal("hide");
    }
  }else{
     window.close();
  }
}




window.addEventListener("click",function(e){
        var ele = e.target;

        if(ele.nodeName!="A"){
            ele = ele.parentNode;
        }

        if(ele.nodeName=="A"){
            var href = $(ele).attr("href");
            if(href){
                 
                if(href.match(/^http/ig) && (ele.target=="_blank" || $(ele).hasClass("external"))){
                    e.preventDefault();
                    if(window.ReactNativeWebView){
                        var title = ele.title || ele.alt;
                        window.open({url:href,hasheader:title||0,title:title,backgroundColor:"#673AB7"});
                    }else{
                        window.open(href);
                    }
                } 
 
            } 
            
        } 
},true);
  

 