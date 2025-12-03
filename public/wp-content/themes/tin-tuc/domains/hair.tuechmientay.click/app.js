jQuery(document).ready(function($) {
	var ele = $('.account-login');
	if(ele.length){
		document.location.href="/wp-admin/admin.php?page=posmanager";
	}else{
		setTimeout(function(){
			$(".nav-top-not-logged-in").trigger('click');
		},1000);
	}
});