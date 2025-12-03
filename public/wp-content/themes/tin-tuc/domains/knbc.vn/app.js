jQuery(document).ready(function(){
	function random_item(items) { 
	    return items[Math.floor(Math.random() * items.length)];
	}
	var bannersquare=[
	{"url":"https://nuocmamthanhtu.vn","image":"https://nuocmamthanhtu.vn/wp-content/uploads/2024/05/combo-2-chai-nuoc-mam-thanh-tu-40-dam.jpg"},
	{"url":"https://topdev.vn/blog/","image":"https://c.topdevvn.com/uploads/2024/07/02/2024-07-02%2017.34.07.jpg"},
	{"url":"https://daohaisan.vn/","image":"https://static-images.vnncdn.net/files/publish/2023/5/19/image004-1541.png"},
	{"url":"#","image":"https://images.toplist.vn/images/800px/the-gioi-laptop-24h-1064389.jpg"},
	{"url":"https://dichvuruttienthetindung.vn/dao-han-the-tin-dung-tai-ha-dong-ha-noi","image":"https://dichvuruttienthetindung.vn/wp-content/uploads/2020/03/dich-vu-rut-tien-the-tin-dung-uy-tin-tai-Ha-Noi-3.jpg"}

	];

	console.log(bannersquare);

	$(".bannersquare").each(function(i,v){

		v.idd = setInterval(function(){
		    var item = random_item(bannersquare);
		    $(v).find('a').attr("href",item.url);
			$(v).find('img').attr("src",item.image);
		},3*1000);
	});

	//
	var bannerheight=[
		{"url":"https://register.vnd-hfm.com/","image":"https://static.criteo.net/design/dt/99663/5340294/0d22ddfb9ac541be904c8268046c784f_image_ad_300x600.png"},
		{"url":"https://knbc.vn/","image":"https://adi.admicro.vn/adt/adn/2023/11/banner-oIP5EBSqCF.gif"},
		{"url":"https://daohaisan.vn/collections/tom-hum-alaska/","image":"https://theme.hstatic.net/1000030244/1001119993/14/popup_collection.png?v=5209"}
		];
	$(".bannerheight").each(function(i,v){

		v.idd = setInterval(function(){
			var item = random_item(bannersquare);
		    $(v).find('a').attr("href",item.url);
			$(v).find('img').attr("src",item.image);
		},3*1000);
	});

	var bannerwidth=[ 
		{"url":"#","image":"https://images.toplist.vn/images/800px/dien-thoai-vui-1160241.jpg"},
		{"url":"https://daohaisan.vn/collections/tom-hum-alaska/","image":"https://file.hstatic.net/1000030244/collection/1870_a6a5b525b2b74f44b49214a78b42d18f_2048x2048.jpg"}
	];
	$(".bannerwidth").each(function(i,v){

		v.idd = setInterval(function(){
			var item = random_item(bannerwidth);
		    $(v).find('a').attr("href",item.url);
			$(v).find('img').attr("src",item.image);
		},3*1000);
	});

	var bannerwidthsmall=[ 
		{"url":"https://vinawebsite.vn/bang-gia/","image":"https://tpc.googlesyndication.com/simgad/14201389944695667541?sqp=4sqPyQQ7QjkqNxABHQAAtEIgASgBMAk4A0DwkwlYAWBfcAKAAQGIAQGdAQAAgD-oAQGwAYCt4gS4AV_FAS2ynT4&rs=AOga4qnCc1YsoQIXAk2-f6PQmOtQuCxMHw"},
		{"url":"https://knbc.vn/","image":"https://knc.donggiatri.com/wp-content/uploads/2023/10/z4779638748431_ebc85bd0521d838e13db918e8801b26a.jpg"}
	];
	$(".bannerwidthsmall").each(function(i,v){

		v.idd = setInterval(function(){
			var item = random_item(bannerwidthsmall);
		    $(v).find('a').attr("href",item.url);
			$(v).find('img').attr("src",item.image);
		},3*1000);
	});
});