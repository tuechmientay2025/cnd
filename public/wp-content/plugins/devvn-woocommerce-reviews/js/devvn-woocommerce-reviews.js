    jQuery(document).ready(function () 
						   {
        var n = parseInt(devvn_reviews.number_img_upload);
        //Function Kiểm tra độ dài nội dung comment
        function e() 
		{
            var e = jQuery("#countContent"),
                t = jQuery("#comment").val();
            if (0 != (t = jQuery.trim(t)).length) {
                t.split(/\W/);
                e.text(t.length + " ký tự (tối thiểu " + devvn_reviews.cmt_length + ")")
            } else e.text("0 ký tự (tối thiểu " + devvn_reviews.cmt_length + ")")
        }
       
			
                jQuery("body p.stars a").each(function (e) {
                    switch (e) {
                    case 0:
                        jQuery(this).html("Rất tệ");
                        break;
                    case 1:
                        jQuery(this).html("Tệ");
                        break;
                    case 2:
                        jQuery(this).html("Bình thường");
                        break;
                    case 3:
                        jQuery(this).html("Tốt");
                        break;
                    case 4:
                        jQuery(this).html("Rất tốt")
                    }
                });
				 jQuery("body").on("click", "#respond p.stars a", function () {
                    var e = jQuery(this),
                        t = jQuery(this).closest("#respond").find("#rating");
                    jQuery(this).closest(".stars");
                    switch (e.text()) {
                    case "Rất tệ":
                        t.val(1);
                        break;
                    case "Tệ":
                        t.val(2);
                        break;
                    case "Bình thường":
                        t.val(3);
                        break;
                    case "Tốt":
                        t.val(4);
                        break;
                    case "Rất tốt":
                        t.val(5)
                    }
                });
			 jQuery("body p.stars a.star-5").trigger("click");
             jQuery("#comment").keyup(function () {
                e();
            })
			 e();
		    jQuery.validator.addMethod("vietnamphone", function (e, t) {
                return /^0+(\d{9,10})$/.test(e)
            }, "Hãy điền đúng số điện thoại");
		    jQuery.validator.addMethod("customemail", function (e, t) {
                return "" == e || /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e)
            }, "Định dạng email không đúng.");
		    jQuery("#commentform").validate({
                invalidHandler: function (e, t) {
                    t.numberOfInvalids() ? jQuery("dijQuery.error").show() : jQuery("dijQuery.error").hide()
                },
                rules: {
                    author: {
                        required: true,
                        minlength: 2
                    },
                    phone: {
                        required: {
                            depends: function () {
                                return jQuery(this).val(jQuery.trim(jQuery(this).val())), true
                            }
                        },
                        vietnamphone: true,
                        minlength: 2
                    },
                    email: {
                        customemail: true
                    },
                    comment: {
                        required: true,
                        minlength: devvn_reviews.cmt_length
                    }
                },
                messages: {
                    author: "Hãy nhập họ tên",
                    email: "Hãy nhập đúng email",
                    phone: "Hãy nhập số điện thoại",
                    comment: {
                        required: "Hãy nhập nội dung tin nhắn",
                        minlength: "Tối thiểu " + devvn_reviews.cmt_length + " ký tự"
                    }
                },
                errorElement: "div",
                errorPlacement: function (e, t) {
                    t.after(e)
                }
            });
			jQuery(".btn-reviews-now").on("click", function () 
										  {
                if (jQuery("ol.commentlist .comment-respond").length <= 0) jQuery.magnificPopup.open({
                    items: {
                        src: "#review_form_wrapper",
                        type: "inline"
                    },
                    showCloseBtn: false,
                    closeOnBgClick: false,
                    modal: true,
                    mainClass: "devvn-reviews-popup"
                });
                else {
                    var e = jQuery(".commentlist #respond").offset().top;
                    jQuery("html, body").animate({
                        scrollTop: e - 44
                    }, 500)
                }
            });
			jQuery(document).on("click", ".fancybox-close-small", function (e) {
                e.preventDefault(), jQuery.magnificPopup.close()
            });
			
			if( jQuery("#commentform").length > 0 ) {
            jQuery("#commentform")[0].encoding = "multipart/form-data";
            var a = jQuery(".devvn_attach_view"),
                i = jQuery(".list_attach");
			}
            function r() {
                jQuery("li", a).length <= n - 1 && 0 < jQuery("li", a).length ? i.addClass("show-btn") : i.removeClass("show-btn")
            }
            jQuery("body").on("change", '[name="attach[]"]', function (e) 
			{
                if (!e.target.files) return;
                var t = e.target.files[0],
                    n = jQuery(this);
                if (t) {
                    var a = new FileReader;
                    a.onload = function (t) {
                        return function (e) {
                            ! function (e, t) {
                                return 0 != function (e) {
                                    return "image/jpeg" == e || ("image/png" == e || ("image/x-png" == e || "image/gif" == e))
                                }(t.type) ? 0 != function (e) {
                                    return e < devvn_reviews.img_size
                                }(t.size) || (alert("Tập tin (" + t.name + ") quá lớn. Chỉ cho phép tải ảnh nhỏ hơn " + devvn_reviews.img_size_text), false) : (alert("Tập tin (" + t.name + ") không đúng định dạng. Chỉ được tải lên file jpg/png/gif"), false)
                            }(0, t) || function (e, t, n) {
                                var a = n.closest("li"),
                                    i = '<img class="thumb" src="' + e.target.result + '" title="' + encodeURI(t.name) + '" data-id="' + t.name + '"/>';
                                jQuery(".img-wrap-box", a).html(i), a.removeClass("li_file_hide"), r()
                            }(e, t, n)
                        }
                    }(t), a.readAsDataURL(t)
                }
            });
			jQuery("body").on("click", ".devvn_insert_attach", function () 
			{
                jQuery(this).closest("#commentform");
                if (0 == function () {
                        jQuery(".devvn_attach_view li").each(function () {
                            jQuery("input", this).val() ? jQuery(this).removeClass("li_file_hide") : jQuery(this).remove()
                        });
                        var e = jQuery("li", a).length;
                        return n <= e ? (i.removeClass("show-btn"), false) : (i.addClass("show-btn"), true)
                    }()) alert("Chỉ được phép tải lên " + n + " ảnh");
                else {
                    var e = jQuery.now(),
                        t = '<li id="li_files_' + e + '" class="li_file_hide"><div class="img-wrap"><span class="close">&times;</span><div class="img-wrap-box"></div></div><div class="' + e + '"><input type="file" name="attach[]" id="files_' + e + '" accept="image/jpeg, image/png, image/gif, image/x-png"></div></li>';
                    a.append(t), r(), jQuery("#files_" + e).trigger("click")
                }
                return false
            });
			jQuery("body").on("click", ".img-wrap .close", function () {
                jQuery(this).closest("li").remove(), r()
            });
        
        var l = false,
            t = jQuery("#devvn_cmt"),
            s = jQuery(".devvn_prod_cmt");
        t.validate({
            onclick: false,
            onkeyup: false,
            onfocusout: false,
            rules: {
                devvn_cmt_name: {
                    required: true,
                    minlength: 2
                },
                devvn_cmt_email: {
                    customemail: true
                },
                devvn_cmt_content: {
                    required: true,
                    minlength: devvn_reviews.cmt_length
                }
            },
            messages: {
                devvn_cmt_name: {
                    required: "Hãy nhập họ tên",
                    minlength: "Họ tên tối thiểu 2 ký tự"
                },
                devvn_cmt_email: "Hãy nhập đúng email",
                devvn_cmt_content: {
                    required: "Hãy nhập nội dung tin nhắn",
                    minlength: "Nội dùng bình luận tối thiểu " + devvn_reviews.cmt_length + " ký tự"
                }
            },
            errorPlacement: function (e, t) {
                alert(e.text())
            },
            submitHandler: function (t) {
                if (!l) {
                    var e = jQuery(t).serialize(),
                        n = jQuery("#devvn_cmt_content", t).val(),
                        a = jQuery('input[name="devvn_cmt_gender"]', t).val(),
                        i = jQuery("#devvn_cmt_name", t).val(),
                        r = jQuery("#devvn_cmt_email", t).val();
                    return jQuery.ajax({
                        type: "post",
                        dataType: "json",
                        url: devvn_reviews.ajax_url,
                        data: {
                            action: "devvn_cmt_submit",
                            cmt_data: e,
                            content: n,
                            gender: a,
                            name: i,
                            email: r
                        },
                        context: this,
                        beforeSend: function () {
                            l = true, s.addClass("devvn_loading")
                        },
                        success: function (e) {
                            e.success ? (e.data.result && e.data.fragments && jQuery.each(e.data.fragments, function (e, t) {
                                jQuery(e).html(t)
                            }), alert(e.data.messages), jQuery("#devvn_cmt_content", t).val("")) : alert(e.data), l = false, s.removeClass("devvn_loading")
                        },
                        error: function (e, t, n) {
                            alert(e.responseText), l = false, s.removeClass("devvn_loading")
                        }
                    }), false
                }
            }
        });
        var c = wp.template("reply-devvn-cmt");
        jQuery("body").on("click", ".devvn_cmt_reply", function () 
						  {
			
            jQuery(".devvn_cmt_list_box #devvn_cmt_reply").remove();
            var e = jQuery(this).closest("li"),
                t = jQuery(this).attr("data-cmtid"),
                n = "@" + jQuery(this).attr("data-authorname") + ": ";
            0 < jQuery(".devvn_cmt_child", e).length ? jQuery(".devvn_cmt_child li:nth-child(1)", e).prepend(c({
                parent_id: t,
                authorname: n
            })) : e.append(c({
                parent_id: t,
                authorname: n
            }));
            var a = jQuery(".devvn_cmt_list_box #devvn_cmt_reply #devvn_cmt_replycontent"),
                i = a.val();
            return a.val("").focus().val(i), jQuery(".devvn_cmt_list_box #devvn_cmt_reply").validate({
                onclick: false,
                onkeyup: false,
                onfocusout: false,
                rules: {
                    devvn_cmt_replyname: {
                        required: true,
                        minlength: 2
                    },
                    devvn_cmt_replyemail: {
                        customemail: true
                    },
                    devvn_cmt_replycontent: {
                        required: true,
                        minlength: devvn_reviews.cmt_length
                    }
                },
                messages: {
                    devvn_cmt_replyname: {
                        required: "Hãy nhập họ tên",
                        minlength: "Họ tên tối thiểu 2 ký tự"
                    },
                    devvn_cmt_replyemail: "Hãy nhập đúng email",
                    devvn_cmt_replycontent: {
                        required: "Hãy nhập nội dung tin nhắn",
                        minlength: "Nội dùng bình luận tối thiểu " + devvn_reviews.cmt_length + " ký tự"
                    }
                },
                errorPlacement: function (e, t) {
                    alert(e.text())
                },
                submitHandler: function (t) {
                    if (!l) {
                        var e = jQuery(t).serialize(),
                            n = jQuery("#devvn_cmt_replycontent", t).val(),
                            a = jQuery('input[name="devvn_cmt_replygender"]', t).val(),
                            i = jQuery("#devvn_cmt_replyname", t).val(),
                            r = jQuery("#devvn_cmt_replyemail", t).val();
                        return jQuery.ajax({
                            type: "post",
                            dataType: "json",
                            url: devvn_reviews.ajax_url,
                            data: {
                                action: "devvn_cmt_submit",
                                cmt_data: e,
                                content: n,
                                gender: a,
                                name: i,
                                email: r
                            },
                            context: this,
                            beforeSend: function () {
                                l = true, s.addClass("devvn_loading")
                            },
                            success: function (e) {
                                e.success ? (e.data.result && e.data.fragments && jQuery.each(e.data.fragments, function (e, t) {
                                    jQuery(e).html(t)
                                }), alert(e.data.messages), jQuery("#devvn_cmt_content", t).val("")) : alert(e.data), jQuery(".devvn_cmt_list_box #devvn_cmt_reply").remove(), l = false, s.removeClass("devvn_loading")
                            },
                            error: function (e, t, n) {
                                alert(e.responseText), l = false, s.removeClass("devvn_loading")
                            }
                        }), false
                    }
                }
            }), false
        });
		jQuery("body").on("click", ".devvn_cancel_cmt", function () {
            jQuery(this).closest("#devvn_cmt_reply").remove()
        });
		jQuery("body").on("submit", "#devvn_cmt_search_form", function () {
            var e = jQuery("#devvn_cmt_search", this).val(),
                t = jQuery(this).serialize();
            return l || jQuery.ajax({
                type: "post",
                dataType: "json",
                url: devvn_reviews.ajax_url,
                data: {
                    action: "devvn_cmt_search",
                    search: e,
                    formData: t
                },
                context: this,
                beforeSend: function () {
                    l = true, s.addClass("devvn_loading")
                },
                success: function (e) {
                    e.success ? e.data.result && e.data.fragments && jQuery.each(e.data.fragments, function (e, t) {
                        jQuery(e).html(t)
                    }) : alert(e.data), l = false, s.removeClass("devvn_loading")
                },
                error: function (e, t, n) {
                    alert(e.responseText), l = false, s.removeClass("devvn_loading")
                }
            }), false
        });
		// if(jQuery(".cmt_attachment_img").length) {
			
  //           jQuery(".cmt_attachment_img").magnificPopup({
  //               delegate: "a",
  //               type: "image",
               
  //               gallery: {
		// 	enabled: true,
		// 	navigateByImgClick: true,
		// 	preload: 1 ,
		// 	arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', 
  //           tPrev: 'Previous (Left arrow key)', 
  //           tNext: 'Next (Right arrow key)', 
  //           tCounter: '<span class="mfp-counter">%curr% of %total%</span>' 		
		//      },
		// 		 mainClass: "devvn-reviews-popup mfp-img-mobile",
				
		// image: {
		// 	tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		// 	titleSrc: function(item) {
		// 		return item.el.attr('title');
		// 	}
		// }
  //           });
  //       }
        var o = false;
        jQuery("body").on("click", ".cmtlike", function (e) {
            if (e.preventDefault(), !o && !jQuery(this).hasClass("liked")) {
                var t = parseInt(jQuery(this).data("id")),
                    a = parseInt(jQuery(this).data("like")) || 0,
                    i = jQuery(".cmt_count", this);
                jQuery.ajax({
                    type: "post",
                    dataType: "json",
                    url: devvn_reviews.ajax_url,
                    data: {
                        action: "devvn_like_cmt",
                        id: t
                    },
                    context: this,
                    beforeSend: function () {
                        o = true, i.html(a + 1)
                    },
                    success: function (e) {
                        e.success ? jQuery(this).addClass("liked") : i.html(a), o = false
                    },
                    error: function (e, t, n) {
                        o = false, i.html(a)
                    }
                })
            }
        })


    });
