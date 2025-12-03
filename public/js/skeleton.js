(function(win){
	win.skeleton={
		format : function(name,num){
			var s = "";
			name = name||1;
			num = num||1;
			switch(name){
				case 1:
					for(var i=0;i<num;i++){
						s+=`<li class="blog-post o-media">
					      <div class="o-media__figure">
					        <span class="skeleton-box" style="width:100px;height:80px;"></span>
					      </div>
					      <div class="o-media__body">
					        <div class="o-vertical-spacing">
					          <h3 class="blog-post__headline">
					            <span class="skeleton-box" style="width:55%;"></span>
					          </h3>
					          <p>
					            <span class="skeleton-box" style="width:80%;"></span>
					            <span class="skeleton-box" style="width:90%;"></span>
					            <span class="skeleton-box" style="width:83%;"></span>
					            <span class="skeleton-box" style="width:80%;"></span>
					          </p>
					          <div class="blog-post__meta">
					            <span class="skeleton-box" style="width:70px;"></span>
					          </div>
					        </div>
					      </div>
					    </li>`;
					}
					s = `<ul class="o-vertical-spacing o-vertical-spacing--l">${s}</ul>`;
				break;
			}

			return s;
		}
	}
})(window);