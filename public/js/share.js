
$(document).on("click","[data-share-message]",function(){
    window.Share({
        title:$(this).attr("data-share-title")?$(this).attr("data-share-title"):document.title,
        message:$(this).attr("data-share-message"),
        text:$(this).attr("data-share-message")
    });
});


if(!window.Share){
   if(navigator.share){

        window.Share = function(data){
               // const shareData = {
               //   title: "MDN",
               //   text: "Learn web development on MDN!",
               //   url: "https://developer.mozilla.org",
               // };
         data = typeof data!="object"?{title:data}:data;
         data.url = data.url || document.URL;
         data.text = data.text || data.title;
          
             navigator.share(data).then(function(r){

             });
        };
      
   }else{
 


  window.Share = (function() {
    function socialWindow(url, width, height) {
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
    window.open(url,"",params);
  }
      
     

      $(document).ready(function(){
         $("body").append(`<div class="share__wrapper">
  <div class="body">
      <p class="share__title">Share this content:</p>
  <ul class="share__list">
    <li class="share__item">
      <a class="share__link  share__link--facebook" target="_blank">
        <i class="fab fa fa-facebook-f fa-2x"></i>
        <span class="sr-only">Share on Facebook</span>
      </a>
    </li>
    <li class="share__item">
      <a class="share__link share__link--twitter" target="_blank">
        <i class="fab fa fa-twitter fa-2x"></i>
        <span class="sr-only">Share on Twitter</span>
      </a>
    </li>
    <li class="share__item">
      <a class="share__link share__link--linkedin" target="_blank">
        <i class="fab fa fa-linkedin fa-2x"></i>
        <span class="sr-only">Share on LinkedIn</span>
      </a>
    </li>
    <li class="share__item">
      <a class="share__link share__link--mail">
        <i class="far fa fa-envelope fa-2x"></i>
        <span class="sr-only">Share via Mail</span>
      </a>
    </li>
    <li class="share__item">
      <a class="share__link share__link--whatsapp">
        <i class="fab fa fa-whatsapp fa-2x"></i>
        <span class="sr-only">Share on WhatsApp</span>
      </a>
    </li>
  </ul>
  </div>
</div>
<style>
.share__wrapper {
     display: none;
    
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 10000000;
    height: 100%;
    background-color: rgb(51 51 51 / 31%);
}
.share__wrapper .body {
        position: absolute;
    bottom: 0;
    background-color: #fff;
    padding: 16px 16px 60px 16px;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    width: 100%;
}
.share__title {
  align-self: flex-end;
  margin-bottom: 0;
  font-size: 1.25rem;
}

.share__list {
  display: flex;
  flex: 1;
  margin: 0;
  list-style: none;
}

.share__item + .share__item {
  margin-left: 1rem;
}

.share__link {
  border: none;
    background-color: #eee;
    width: 45px;
    height: 45px;
    line-height: 55px;
    text-align: center;
    border-radius: 50%;
    display: inline-block;
}
 
</style>`);
      });

      var pageUrl = (document.URL);
      var pageTitle = (document.title);

      $(document).on('click',".share__wrapper", function (event) {  
         
         setTimeout(function(){
           $(".share__wrapper").hide();
         },100);

      });
      return function(data){
        var ele= $(".share__wrapper");

         data = typeof data!="object"?{title:data}:data;
         data.url = data.url || document.URL;
         data.text = data.text || "Share this content:";
 
         pageTitle = data.title;
         pageUrl = data.url||pageUrl;
         if(data.image){
            ele.find(".share__image").attr("src",data.image);
         }
         
         ele.find(".share__title").html(data.text);

         ele.find(".share__link--facebook").attr("href","https://www.facebook.com/sharer.php?u=" + pageUrl);
         ele.find(".share__link--twitter").attr("href","https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + pageTitle);
         ele.find(".share__link--linkedin").attr("href","https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl);
         ele.find(".share__link--whatsapp").attr("href","whatsapp://send?text=" + pageTitle + "%20" + pageUrl);
         ele.find(".share__link--mail").attr("href", "mailto:?subject=%22" + pageTitle + "%22&body=Read%20the%20article%20%22" + pageTitle + "%22%20on%20" + pageUrl);


         ele.show();
      };
    })();
}
}