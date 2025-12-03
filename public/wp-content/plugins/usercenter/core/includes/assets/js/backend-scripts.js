/*------------------------ 
Backend related javascript
------------------------*/

/**
 * HELPER COMMENT START
 * 
 * This file contains all of the backend related javascript. 
 * With backend, it is meant the WordPress admin area.
 * 
 * You can add the localized variables in here as followed: usercenter.plugin_name
 * These variables are defined within the localization function in the following file:
 * core/includes/classes/class-usercenter-run.php
 * 
 * HELPER COMMENT END
 */

jQuery(document).ready(function($){
    $(".btnsync").on("click",function(e){
        var dialog= bootbox.dialog({ 
            message: `
            <form class='forminvest'>
             
            <p>Đồng bộ tài khoản lên hệ thống user trung tâm</p>
            <p>Thông tin tài khoản</p>
            <div class="lr">
                <span>Họ và tên</span>
                <div></div>
            </div>
            <div class="lr">
                <span>Số điện thoại</span>
                <div></div>
            </div>
            <div class="lr">
                <span>Email</span>
                <div></div>
            </div>
            <div class="lr">
                <span>Tên tài khoản</span>
                <div></div>
            </div>

            </hr>

            <div class="">
               Bạn có thể tham khảo hệ thống user trung tâm
            </div>
             <div class="action text-center">
                <button type='button' class="button btn-danger" onclick="bootbox.hideAll()">Huỷ</button>
                <button class="button stakenow">Xác nhận</button>
            </div>
            <div class="msg"></div>
            </form>
            
            `, 
            closeButton: false 
        });
        dialog.init(function(){
            dialog.find(".stakenow").on("click",function(e){

            });
        });
    });
});