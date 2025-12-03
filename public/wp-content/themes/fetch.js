
(function(){
    if(document.location.host.includes("reactnativeexample.com")){
         var ele =  $(".site-content article.post").clone();
ele.find("pre").each(function(i,v) {
    $(v).html($(v).text())
});
var tags = []
$(".post-tags").find("a").each(function(i,v){
    tags.push($(v).text());
});
 

var info = {
    post_title: ele.find("header.post-header .post-title").eq(0).text(),
    post_content: ele.find(".post-content").html() +  `<div>Source : <a href="${document.location.href}" target="_blank">React Native Example</a></div>`,
    post_tag: tags,
    post_type:"post",
    post_status :"publish",
    post_category:["React Native"],
    image : ele.find(".post-content img").eq(0).attr("src")
};

        /*var insert = `insert into shop(${Object.keys(model).join(",")}) values(${Object.values(model).map(function(v){
            return `'${(typeof v=="object"?JSON.stringify(v):v)}'`;
        }).join(",")})`;
        */


        function extract(fun){
             $.ajax({
            type:'POST',
    url: "https://blog.3tkm.com/wp-admin/admin-ajax.php?action=insert_post",
    data:info,
    async: true, 
    dataType: 'json',
            success: function (json) {
                fun(json)
              
            }
          });
        }


        $("body").append(`<style>
        .foodypopup{

                position: fixed;
    right: 0;
    background-color: #fff;
    padding: 20px;
    z-index: 10000;
    bottom: 0;
    width: 300px;
}
.foodypopup .btn-extract{
        background: #03ae03;
    text-align: center;
}
        </style><div class="foodypopup">
        <p>Extract data</p>
        <div><button class="btn btn-extract">Extrach</button></div>
        <div class="msg"></div>
        </div>`);
        $(".btn-extract").on("click",function(){
            $(".msg").html("extract data");
            extract(function(res){
                console.log(res);
                $(".msg").html(`<div>Fetch success - <a href="${res.url}" target="_blank">Preview</a></div><p>close in 5s</p><div class="_sec"></div>`);
                var c =5;
                setInterval(function(){
                    if(c--<1){
                        window.close();
                    }
                    $(".msg ._sec").html("close in "+c+"s");
                },1000);
                
            });
        });

    }


    

})();