//https://rudrastyh.com/woocommerce/rest-api-create-update-remove-products.html
function WooCommerceRestApi(t){if(!(this instanceof WooCommerceRestApi))return new WooCommerceRestApi(t);if(!(t=t||{}).url)throw"url is required";if(!t.consumerKey)throw"consumerKey is required";if(!t.consumerSecret)throw"consumerSecret is required";this.classVersion="1.0.1",this._setDefaultsOptions=function(t){this.url=t.url,this.wpAPIPrefix=t.wpAPIPrefix||"wp-json",this.version=t.version||"wc/v3",this.isHttps=/^https/i.test(this.url),this.consumerKey=t.consumerKey,this.consumerSecret=t.consumerSecret,this.encoding=t.encoding||"utf8",this.queryStringAuth=t.queryStringAuth||!1,this.port=t.port||"",this.timeout=t.timeout,this.axiosConfig=t.axiosConfig||{}},this._getUrl=function(t,e){let s=this.wpAPIPrefix+"/",i="/"===this.url.slice(-1)?this.url:this.url+"/";return i=i+s+this.version+"/"+t,!this.isHttps&&e&&(i=(-1==i.indexOf("?")?"?":"&")+$.param(e)),i};var e=function(){let t={consumer:{key:this.consumerKey,secret:this.consumerSecret},signature_method:"HMAC-SHA256",hash_function:function(t,e){}};return new _oauth.default(t)};this._request=function(t,s,i,r={}){let n=this._getUrl(s,r),o={Accept:"application/json"};"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)&&(o["User-Agent"]="WooCommerce REST API - JS Client/"+this.classVersion);let u={url:n,method:t,responseEncoding:this.encoding,timeout:this.timeout,responseType:"json",dataType:"json",async:!0,headers:o};return this.isHttps?(this.queryStringAuth?u.params={consumer_key:this.consumerKey,consumer_secret:this.consumerSecret}:u.auth={username:this.consumerKey,password:this.consumerSecret},u.params=$.extend(u.params,r,!0)):u.params=e().authorize({url:n,method:t}),i&&(u.headers["Content-Type"]="application/json;charset=utf-8",u.data=JSON.stringify(i)),new Promise(function(t,e){u.success=function(e,s,i){t(e,s,i)},u.error=function(t,s,i){e(t,s,i)},u.cache=1,$.ajax(u)})},this.get=function(t,e={}){return this._request("get",t,null,e)},this.post=function(t,e,s={}){return this._request("post",t,e,s)},this.put=function(t,e,s={}){return this._request("put",t,e,s)},this.delete=function(t,e={}){return this._request("delete",t,null,e)},this.options=function(t,e={}){return this._request("options",t,null,e)},this._setDefaultsOptions(t)}
// var $ = jQuery;
// function addnewproduct_script() {

   
  
// }

// $(function() { addnewproduct_script(); })

//       
!(function (e) {
  "function" == typeof define && define.amd ? define("auth", e) : e();
})(function () {
  "use strict";

    (window.render_auth = () => {
      Array.from(document.querySelectorAll(".create-post-form")).forEach((e) => {
        var t, i;
        e.__vue_app__ ||
          ((i = e),
          (t = Vue.createApp({
            el: i,
            data() {
              return {
                widget: "auth",
                pending: !1,
                resendCodePending: !1,
                screen: null,
                config: null,
                login: { username: null, password: null, remember: !1 },
               
              };
            },
            created() {
            	this.woo= new WooCommerceRestApi({ 
			      url: "https://wp.donggiatri.com/", 
			      consumerKey: "ck_8950725a8a6d6dbad227c7ec38b1afcc7c27b56a1338df76ad28813638b136e2",
			      consumerSecret: "cs_0be7ca961ed5acadcab971402cd04d844eb72a5b",
			      version: "wc/v3"
			    });
              // (this.config = JSON.parse(this.$options.el.dataset.config)),
              //   (this.screen = this.config.screen),
              //   (this.activeRole = this.config.registration.default_role
              //     ? this.config.registration.roles[
              //         this.config.registration.default_role
              //       ]
              //     : Object.values(this.config.registration.roles)[0]),
              //   Object.values(this.config.registration.roles).forEach((e) => {
              //     this.setupConditions(e.fields);
              //   });
              // var e = getSearchParam("err");
              // e &&
              //   this.config.errors[e] &&
              //   (alert(this.config.errors[e].message, "error"),
              //   deleteSearchParam("err")),
              //   i.classList.remove("hidden");
           		// this.el.querySelector(".btnsubmit").onclick = this.methods.createProduct;
            	// console.log(this.$refs.myform);
            },
            methods: {
               show_msg : function(msg,form){
               		form.querySelector(".msg").innerHTML=msg;
               	 	setTimeout(function(){
               	 		form.querySelector(".msg").innerHTML="";
               	 	},3000);
               },
               createProduct: function(submitEvent){
               	 submitEvent.preventDefault();

               	 var me = this;
               	 var form = submitEvent.target;

               	 var title = submitEvent.target.elements.title.value;
               	 var price = submitEvent.target.elements.price.value;
               	 var product_type = submitEvent.target.elements.product_type.value;
             
               	 //ajax to sen woo api
               	 
               	 me.show_msg(`Đang xử lý...`,form);
               	 this.woo.post("products",{name:title,regular_price:price,status:'publish',product_type}).then(function(res){
               	 	console.log(res);
               	 	me.show_msg("Thêm sản phẩm thành công");
               	 }).catch(function(r){
               	 	var data =r.responseJSON; 
               	 	me.show_msg(data.message,form);
               	 });
              
               	 return false;
               }
            },
            computed: {
              register_username() {
                return (
                  this.activeRole?.fields["auth-username"]?.value || null
                );
              },
              register_email() {
                return this.activeRole?.fields["auth-email"].value;
              },
              register_password() {
                return this.activeRole?.fields["auth-password"].value;
              },
            },
          })),
    
          t.mount(e));
      });
    });
    window.render_auth();
});