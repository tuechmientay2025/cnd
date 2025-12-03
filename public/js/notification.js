(function(win){
    var callbacks ={};
    var loaded = 0;
    function init(){
        if(loaded==0){
            loaded = 1;
        $("body").append(`<ul class="ios-notifications"></ul><style>.socials {display: flex;justify-content: space-between;align-items: center;font-size: 12px;}i.fa-whatsapp {color: green;font-weight: 600;}.text-name {font-weight: 600;font-size: 14px;margin-top: 4px;}.text-msg {font-size: 14px;margin-bottom: 4px;}.text-more {font-size: 12px;}i.fa-facebook-f {color: transparent;}i.fa-instagram {color: transparent;}i.fa-twitter {color: transparent;}ul {padding: 0;margin: 0;list-style-type: none;}
            .ios-notifications {position: absolute;transform-style: preserve-3d;perspective: 800px;cursor: pointer;top: 64px;width: 90%;left: 5%;z-index: 1000000;}
            @media (min-width: 1024px) {
  .ios-notifications{
         width: 300px;
         left: calc(100% - 300px);
  }
}
            .ios-notification_item {position: relative;color: #333;width: 100%;padding: 0.75rem;background: #fff;border-radius: 20px;box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);-webkit-backdrop-filter: saturate(130%) blur(20px);backdrop-filter: saturate(130%) blur(20px);transition: ease-in-out, transform 0.5s ease-in-out;}.ios-notification_item:nth-child(2) {position: absolute;top: 0;left: 0;z-index: -1;color: transparent;transform: translateY(1rem) translateZ(-3rem);background: rgba(255, 255, 255, 0.6);}.ios-notification_item:nth-child(3) {position: absolute;top: 0;left: 0;z-index: -2;color: transparent;transform: translateY(2rem) translateZ(-6rem);background: rgba(255, 255, 255, 0.5);}.ios-notification_item:nth-child(4) {position: absolute;top: 0;left: 0;z-index: -3;color: transparent;transform: translateY(3rem) translateZ(-9rem);background: transparent;box-shadow: none;}.ios-notifications.unfolded .ios-notification_item {color: black;background: #fff;}.ios-notifications.unfolded .ios-notification_item .more {display: none;}.ios-notifications.unfolded .ios-notification_item:nth-child(2) {transform: translateY(calc(100% + 0.5rem));transition: opacity 1s ease-in-out, transform 1s ease-in-out;}.ios-notifications.unfolded .ios-notification_item:nth-child(3) {transform: translateY(calc(200% + 1rem));transition: opacity 1s ease-in-out, transform 1s ease-in-out;}.ios-notifications.unfolded .ios-notification_item:nth-child(4) {transform: translateY(calc(300% + 1.5rem));transition: opacity 1s ease-in-out, transform 1s ease-in-out;}.ios-notifications.unfolded .ios-notification_item:nth-child(2) .fa-facebook-f {color: blue;}.ios-notifications.unfolded .ios-notification_item:nth-child(3) .fa-instagram {color: red;}.ios-notifications.unfolded .ios-notification_item:nth-child(4) .fa-twitter {color: #00acee;}</style>`);
         }
    }
    var getFavicon = function(){
        var favicon = undefined;
            var nodeList = document.getElementsByTagName("link");
            for (var i = 0; i < nodeList.length; i++)
            {
                if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
                {
                    favicon = nodeList[i].getAttribute("href");
                }
            }
            return favicon;        
    };

  
    

    function requested(f){
        if (Notification.permission === 'granted') {
            // show notification here 
            f(1);
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                   
                    f(1);
                } else {
                    console.log('User blocked notifications.');
                    f(0);
                }
            }).catch(function (err) {
                console.error(err);
                f(0);
            });
        }
    }

    if(win.Notification){
        requested(function(ok){
           
        });
    }

    var sound = new Audio("https://bigsoundbank.com/UPLOAD/mp3/1111.mp3?v=m");
    win.showNotificationRemove = function(){
        $(".ios-notifications li").fadeOut().remove();
    };
    // showNotification(
    //     {title:"alo",
    //     body:"ai dang noi xau kia",
    //     onclick:function(){alert(1);}
    // });
    win.showNotification = function(data){
        init();
        requested(function(ok){
            if(ok){
                var notify = new Notification(data.title||data.name||'Hi there!', $.extend({
                    body: 'How are you doing?',
                    icon: getFavicon(),
                },data,true));
                notify.onclick = function(){
                    if(data.onclick){
                        data.onclick(data);
                    }

                     notify.close();
                }
            }else{
                
               var icon = data.icon||`<i class="fa fa-whatsapp"></i>`;
               icon = icon.includes("https://")?`<img src="${icon}" width="12" height="12" />`:icon;
                var nameapp = data.app||document.title;
                var time = data.date||`Gần đây`;

                var id ="no"+Date.now();
               $(".ios-notifications").append(`<li data-id="${id}" data-info='${JSON.stringify(data)}' class="ios-notification_item">
                <div class="socials">
                  <div>
                    ${icon}
                    <span>${nameapp}</span>
                  </div>
                  <div>${time}</div>
                </div>
                <div class="text-name">${data.title||data.name}</div>
                <div class="text-msg">${data.text||data.message||data.body||"--"}</div>
                <div class="text-more more hide">3 more messages</div>
              </li>`);
               //play sound
               sound.play();


               if(data.onclick)callbacks[id] = data.onclick;

               setTimeout(function(){
                  win.showNotificationRemove();
               },data.timeout?data.timeout*1000:6000);
            }
        }); 
        
    };

    $(document).on("click",".ios-notification_item",function(){
        $(".ios-notifications").toggleClass('unfolded');
        //show action
        var id = $(this).attr("data-id");
        var data = $(this).data("info");
        $(document).trigger("notification",[data,$(this)]); 
        if(callbacks[id]){
            callbacks[id] = callbacks[id](data);
            delete callbacks[id];
        } 
    });
   
  })(window);
    