
$.fn.rateStars= function (options) {
  $(document).ready(function(){
   $("body").append(`<style> 
.front-stars, .back-stars, .star-rating {
  display: flex;
}

.star-rating {
  align-items: center;
  font-size: 3em;
  justify-content: center;
  margin-top: 50px;
}

.back-stars {
  color: #bb5252;
  position: relative;
  text-shadow: 4px 4px 10px #843a3a;
}

.front-stars {
  color: #FFBC0B;
  overflow: hidden;
  position: absolute;
  text-shadow: 2px 2px 5px #d29b09;
  top: 0;
  transition: all 0.5s;
}`);

  });
   return this.each(function(){
      var settings = $.extend({
        value: 70,
        onChange: function(){}
      },options,true);
      var starRatingWrapper = this;
      var ele= $(this);


      ele.addClass("star-rating").attr("title",settings.value).html(`<div class="back-stars">
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        
        <div class="front-stars" style="width: ${settings.value}%">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
        </div>
    </div>`);


  
    var frontStars = starRatingWrapper.querySelector('.front-stars');


      function cal(percentage){
         starRatingWrapper.title = percentage;
            frontStars.style.width = percentage+"%"; 
          settings.onChange(percentage);
      }

        $(".back-stars>i").on("click",function(){
          var percentage=($(this).index()+1)*20;
           cal(percentage);
        });
        $(".front-stars>i").on("click",function(){
          var percentage=($(this).index()+1)*20;
          cal(percentage); 
        });

      var methods = {
          set: function(percentage){
            percentage = parseFloat(percentage);
            starRatingWrapper.title = percentage;
            frontStars.style.width = percentage+"%"; 
          },
          get: function(){
             return parseFloat(frontStars.style.width);
          }
      };



      ele.data("rateStars",methods);
   });
};
/**
 
$(document).ready(function(){


  $(".star-rating").rateStars({
     onChange : function (percentage) {
        numberInput.value = percentage;
     }
  });
   
const numberInput = document.querySelector('input');
const rate = e => {
  const percentage = e.target.value + '%';

  $(".star-rating").data("rateStars").set(percentage);
};

numberInput.addEventListener('click', rate);
numberInput.addEventListener('keyup', rate);


});
 */

