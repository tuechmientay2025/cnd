(function(win){
     $.fn.SelectPicker= function(){
    return this.each(function(){
         SelectPicker(this);

         $(this).on("click",function(){
            $(".SelectPicker").addClass("active");
         });
    });
 };
  window.SelectPicker = function (select){
    var id ="ss"+(select.id || (Date.now()+"s"));

    $(select).addClass(id);

    var multiple = select.multiple;

     var SelectPicker = $(".SelectPicker").attr("data-id",id).attr("data-multiple",multiple?1:0); 

     var ul = SelectPicker.find("ul").html("");

     SelectPicker.find(".head .title").html(select.placeholder||"Tìm kiếm");
     if(multiple){
       SelectPicker.find(".head .done").show();
     }
    

    var selectHtml="";
    var options = select.options;
     for(var i = 0; i < options.length; i++) {

        selectHtml +=  `<li class="ripple" data-value="${options[i].value}">${options[i].text}</li>`;

    }
      ul.html(selectHtml);

  };
  $(document).on("click",".SelectPicker li",function(){
    var b = $(this).closest(".SelectPicker");
      var multiple = b.attr("data-multiple");
      var select = $("."+b.attr("data-id"));

      select.val($(this).attr("data-value"));
      if(multiple==0){
        $(".SelectPicker").removeClass("active");
      } 
  });

  $(document).on("keyup",".SelectPicker .search input",function(){
    var b = $(this).closest(".SelectPicker");

    var val = this.value; 
    var lis = b.find(".infobody li");
    console.log(val);
    if(val){
      val = val.toLowerCase();
       lis.each(function(i,v){
        if($(v).text().toLowerCase().includes(val)){
           $(v).show();
        }else{
           $(v).hide();
        }
       });
    }else{
       lis.show();
    } 
  });

  $(document).on("click",".SelectPicker .search .xclose",function(){
    var b = $(this).closest(".SelectPicker");

    var v = this.value;
    var lis = b.find(".infobody li");
    lis.show();
  });


  $("body").append(`
<style>
.SelectPicker{    position: fixed;
    bottom: 100%;
        z-index: 1000000000001;
    width: 100%;
    background-color: rgb(51 51 51 / 37%);
    height: 100%;
    display:none;
    }
.SelectPicker.active{display:block;    bottom: 0;}

.SelectPicker .infobody{
      padding: 16px;
          display: flex;
    flex-direction: column;
      position: absolute;
    bottom: 0;
    left: 0;
  height: 50%;
  border-radius: 16px 16px 0 0;
    background-color: #fff;
     width: 100%;
}
.SelectPicker .infobody .body{
  flex: 1;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
.SelectPicker .infobody li{
  padding: 16px 8px;
    border-bottom: 1px solid #eee;
}
.SelectPicker .head{
     display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.SelectPicker .infobody .search{
  position: relative;
}
.SelectPicker .infobody .search span{
      position: absolute;
    top: 17%;
    right: 16px;
    z-index: 1;
}
</style>
    <div class="SelectPicker">
     <div class='infobody'>
      <div class="head">
        <span class="title"></span>
        <div>
            <span class="done" style = 'display:none'>Done</span>
            <span class="btn-close" onclick='$(".SelectPicker").removeClass("active")'>Đóng</span>
        </div>

      </div>
      <div class="search">
        <input type='text' placeholder="Tìm kiếm" autocomplete="false" class="form-control" />
        <span onclick='$(this).closest(".search").find("input").trigger("keyup")'>Xoá</span>
      </div>
      <div class="body">
        <ul></ul>
      </div>
      </div>
    </div>`);
  
  // $(document).on("click","select",function(){
  //   // $(this).attr("disabled","disabled");
  //    SelectPicker(this);
  //     $(".SelectPicker").addClass("active");

  // });
})(window);