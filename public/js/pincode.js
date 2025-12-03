 var PinCode = (function(){
  var loaded =0;
  function init() {
    $("body").append(`<style>#fields,#numbers{padding:0 20px;display:block}#fields .numberfield,#pincode,#pincode .cell{text-align:center}#pincode .table{display:table;height:100%;width:100%;position:relative}#pincode .cell{display:table-cell;vertical-align:middle;position:relative;width:100%}#pincode.active{transform:translateY(0)}#pincode{position:fixed;overflow:hidden;width:320px;z-index:9999;background-color:#33444e;background-image:url(https://hd.unsplash.com/photo-1471047283799-ebd97acc0bc3);background-size:cover;background-position:center;color:#fff;border-radius:0;-webkit-box-shadow:0 0 30px 0 rgba(0,0,0,.6);-moz-box-shadow:0 0 30px 0 rgba(0,0,0,.6);box-shadow:0 0 30px 0 rgba(0,0,0,.6);bottom:0;left:0;transition:.3s ease-out;transform:translateY(100%)}#fields,#numbers{position:relative}#numbers{max-width:300px;margin:0 auto;-webkit-transition:1s ease-out;-moz-transition:1s ease-out;transition:1s ease-out;opacity:1}#numbers.hide{opacity:.3}#pincode button{width:70px;height:70px;margin-bottom:10px;background-color:rgba(0,0,0,.35);border:1px solid #33444e;color:#fff;font-size:25px;line-height:50px;border-radius:100%;opacity:1;outline:0}#pincode button:active{background-color:rgba(0,0,0,.6);outline:0}#fields{max-width:200px;margin:50px auto}#fields .numberfield span{height:10px;width:10px;border:2px solid #fff;background-color:transparent;border-radius:100%;position:relative;display:inline-block;text-align:center}#fields .numberfield.active span{background-color:#fff}#fields .numberfield.right span{background-color:#33444e;border-color:#33444e;transition:.5s ease-in-out;-webkit-transition:.5s ease-in-out}#fields .grid{display:flex}#pincode .grid{list-style:none;margin-left:-20px}.grid__col--1-of-3,.grid__col--2-of-6,.grid__col--4-of-12{width:33.33333%}.grid__col--1-of-4,.grid__col--2-of-8,.grid__col--3-of-12{width:25%}.grid__col{box-sizing:border-box;display:inline-block;margin-right:-.25em;min-height:1px;padding-left:20px;vertical-align:top}.grid__col--centered{display:block;margin-left:auto;margin-right:auto}.grid--no-gutter,.grid--no-gutter .grid__col--span-all{margin-left:0;width:100%}.grid__col--d-first{float:left}.grid__col--d-last{float:right}.grid--no-gutter .grid__col{padding-left:0}.grid__col--ab{vertical-align:bottom}.grid__col--am{vertical-align:middle}#pincode .miss{-webkit-animation:.8s ease-out miss;animation:.8s ease-out miss}@-webkit-keyframes miss{0%,100%{-webkit-transform:translate(0,0);transform:translate(0,0)}10%{-webkit-transform:translate(-25px,0);transform:translate(-25px,0)}20%{-webkit-transform:translate(25px,0);transform:translate(25px,0)}30%{-webkit-transform:translate(-20px,0);transform:translate(-20px,0)}40%{-webkit-transform:translate(20px,0);transform:translate(20px,0)}50%{-webkit-transform:translate(-10px,0);transform:translate(-10px,0)}60%{-webkit-transform:translate(10px,0);transform:translate(10px,0)}70%{-webkit-transform:translate(-5px,0);transform:translate(-5px,0)}80%{-webkit-transform:translate(5px,0);transform:translate(5px,0)}}@keyframes miss{0%,100%{-webkit-transform:translate(0,0);transform:translate(0,0)}10%{-webkit-transform:translate(-25px,0);transform:translate(-25px,0)}20%{-webkit-transform:translate(25px,0);transform:translate(25px,0)}30%{-webkit-transform:translate(-20px,0);transform:translate(-20px,0)}40%{-webkit-transform:translate(20px,0);transform:translate(20px,0)}50%{-webkit-transform:translate(-10px,0);transform:translate(-10px,0)}60%{-webkit-transform:translate(10px,0);transform:translate(10px,0)}70%{-webkit-transform:translate(-5px,0);transform:translate(-5px,0)}80%{-webkit-transform:translate(5px,0);transform:translate(5px,0)}}</style>
      <div id="pincode">
    <div class="table">
      <div class="cell">

        <div id="anleitung">
          <p>
            <strong>Please enter the correct PIN-Code.</strong><br> It is: 1234 / Also try a wrong code
          </p>
        </div>

        <div id="fields">
          <div class="grid">
            <div class="grid__col grid__col--1-of-4 numberfield"><span></span></div>
            <div class="grid__col grid__col--1-of-4 numberfield"><span></span></div>
            <div class="grid__col grid__col--1-of-4 numberfield"><span></span></div>
            <div class="grid__col grid__col--1-of-4 numberfield"><span></span></div>
          </div>
        </div>

        <div id="numbers">
          <div class="grid">
            <div class="grid__col grid__col--1-of-3"><button>1</button></div>
            <div class="grid__col grid__col--1-of-3"><button>2</button></div>
            <div class="grid__col grid__col--1-of-3"><button>3</button></div>

            <div class="grid__col grid__col--1-of-3"><button>4</button></div>
            <div class="grid__col grid__col--1-of-3"><button>5</button></div>
            <div class="grid__col grid__col--1-of-3"><button>6</button></div>

            <div class="grid__col grid__col--1-of-3"><button>7</button></div>
            <div class="grid__col grid__col--1-of-3"><button>8</button></div>
            <div class="grid__col grid__col--1-of-3"><button>9</button></div>

            <div class="grid__col grid__col--1-of-3"></div>
            <div class="grid__col grid__col--1-of-3"><button>0</button></div>
            <div class="grid__col grid__col--1-of-3"></div>

          </div>
        </div>

      </div>
    </div>
  </div>
  `);
}
    return function(options){
     if(loaded==0){
      loaded =1;
      init();
     }

      options = $.extend({
         number:3,
         message:`<strong>Please enter the correct PIN-Code.</strong><br> It is: 1234 / Also try a wrong code`,
         onResult: function(code){

         }
      },options,true);
      var pincode = $("#pincode");

      var fields = pincode.find('#fields .grid');
      var s="";
      for(var i=0;i<options.number;i++){
        s+=`<div class="grid__col grid__col--1-of-4 numberfield"><span></span></div>`;
      }
      fields.html(s);
      

      var methods ={
          showPin:function () {
            pincode.addClass("active");
            enterCode = "";
           pincode.find("#fields .numberfield").removeClass("active");
            pincode.find("#fields .numberfield").removeClass("right");
            pincode.find("#numbers").removeClass("hide");
            pincode.find("#anleitung p").html(options.message);
          },

          hidePin: function () {
            pincode.removeClass("active");
            enterCode = "";
            pincode.find("#fields .numberfield").removeClass("active");
            pincode.find("#fields .numberfield").removeClass("right");
            pincode.find("#numbers").removeClass("hide");
            pincode.find("#anleitung p").html(options.message);
          }  
      };
       // http://www.jsfuck.com/
        
        var enterCode = ""; 

        pincode.on("click","#numbers button",function () {

          var clickedNumber = $(this).text().toString();
          enterCode = enterCode + clickedNumber;
          var lengthCode = parseInt(enterCode.length);
          lengthCode--;
          $("#fields .numberfield:eq(" + lengthCode + ")").addClass("active");

          if (lengthCode == options.number) {

            options.onResult(enterCode,function(r){

                if(r==1){
                    // Right PIN!
                    pincode.find("#fields .numberfield").addClass("right");
                   pincode.find("#numbers").addClass("hide");
                    pincode.find("#anleitung p").html("Amazing!<br>You entered the correct Code!");
                }else if(r=="close" || r=="x"){
                     methods.hidePin();
                }else{
                  // Wrong PIN!
                  pincode.find("#fields").addClass("miss");
                  enterCode = "";
                  setTimeout(function () {
                    pincode.find("#fields .numberfield").removeClass("active");
                  }, 200);
                  setTimeout(function () {
                    pincode.find("#fields").removeClass("miss");
                  }, 500);
                }

            });
 

          } 

        });
      return methods;
    }
  })();

  /*
   $("#restartbtn").click(function () {
        PinCode({
         number:6,
         message:`<strong>Please enter the correct PIN-Code.</strong><br> It is: 1234 / Also try a wrong code`,
         onResult: function(code,next){
            console.log(code)
            if(code=="0000000"){
              //ask server
                next("close"); 
            }else{
              next(0);
            }
         }
      }).showPin();
    });
   */