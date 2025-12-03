$(document).ready(function(){
  $("body").append(`<style>button-loader{box-shadow:6px 7px 40px -4px rgba(0,0,0,.2);overflow:hidden;position:relative!important;padding:8px 16px;background:#009579;border:none;outline:0;border-radius:2px;cursor:pointer}.button-loader:active{background:#007a63}.button__text{font:bold 20px Quicksand,san-serif;color:#fff;transition:.2s}.button--loading .button--loading>*{visibility:hidden;opacity:0}.button--loading::after{content:"";position:absolute;width:16px;height:16px;top:0;left:0;right:0;bottom:0;margin:auto;border:4px solid transparent;border-top-color:#fff;border-radius:50%;animation:1s infinite button-loading-spinner}@keyframes button-loading-spinner{from{transform:rotate(0turn)}to{transform:rotate(1turn)}}.button-loader .ripple{position:absolute;border-radius:50%;background-color:rgba(0,0,0,.3);width:100px;height:100px;margin-top:-50px;margin-left:-50px;animation:1s ripple;opacity:0}@keyframes ripple{from{opacity:1;transform:scale(0)}to{opacity:0;transform:scale(10)}}<\/style>`);
  
  $(document).on("click",".button-loader",function(e){
    var me = $(this);
    var timer = me.attr("data-timer");
    timer = timer?timer*1:6;

    me.toggleClass("button--loading");
     let ripple = document.createElement("span");

// Add ripple class to span
ripple.classList.add("ripple");

// Add span to the button 
this.appendChild(ripple);

// Get position of X
let x = e.clientX - e.target.offsetLeft;

// Get position of Y 
let y = e.clientY - e.target.offsetTop;

// Position the span element
ripple.style.left = `${x}px`;
ripple.style.top = `${y}px`;

// Remove span after 0.3s
setTimeout(() => {
    ripple.remove();
    setTimeout(() => {
      me.removeClass("button--loading").removeAttr("disabled");
    }, timer*1000);
}, 300);


// me.attr("disabled","disabled");
  });
  window.loader = {
   add : function(ele){
     ele.addClass("button-loader button--loading");
   },
   remove : function(ele){
     ele.removeClass("button-loader button--loading");
   }
};
window.Buttonloader = {
   add : function(ele){
     ele.addClass("button-loader button--loading");
   },
   remove : function(ele){
     ele.removeClass("button-loader button--loading");
   }
};
/*
How to use
<button onclick="$(this).closest('form').submit();" class="button-loader button--loading" style="    width: 100%;">
    <span class="button__text">Login</span>
</button>
 */
 
});