(function(win){
   function getSearchOrHashBased(url) {
    if(!url) url = location.href;
    var question = url.indexOf("?");
    var hash = url.indexOf("#");
    if(hash==-1 && question==-1) return "";
    if(hash==-1) hash = url.length;
    return question==-1 || hash==question+1
      ? url.substring(hash)
      : url.substring(question+1, hash);
  }

  // use query = getSearchOrHashBased(location.href)
  // or query = location.search.substring(1)
  function getJsonFromUrl(query) {
    var result = {};
    query.split("&").forEach(function(part) {
      if(!part) return;
      part = part.replaceAll("+", " ");
      var eq = part.indexOf("=");
      var key = eq>-1 ? part.substring(0,eq) : part;
      var val = eq>-1 ? decodeURIComponent(part.substring(eq+1)) : "";
      var from = key.indexOf("[");
      if(from==-1) result[decodeURIComponent(key)] = val;
      else {
        var to = key.indexOf("]",from);
        var index = decodeURIComponent(key.substring(from+1,to));
        key = decodeURIComponent(key.substring(0,from));
        if(!result[key]) result[key] = [];
        if(!index) result[key].push(val);
        else result[key][index] = val;
      }
    });
    return result;
  }

  function isIndexArray(data){
    if(data.length==0)return true;
    return !isNaN(data[0]);
  }
  function convert(data){
    var a={};
    for(var i in data){
        
       if(typeof data[i]!="function"){
          a[i] =  data[i];
       }
    }
    data.map(function(v,i){
       a[i]= v;
    });
    return a;
  }

  win.parse_string = function(str){
    var data = getJsonFromUrl(str);
    for(var i in data){
       //check is array index or no
       if(!isIndexArray(Object.keys(data[i]))){
          data[i] = convert(data[i]);
       }
    }
    return data;
  };

   String.prototype.parse_string  = function(){  
        return parse_string(String(this));
   };
})(window);

function randomArray(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
};


function downloadText(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


function save(filename, data) {
    const blob = new Blob([data], {type: 'text/text'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}


function uploadBlob(url,value){
    // create a blob here for testing
    var blob = new Blob([typeof value=="object"?JSON.stringify(value):value]);
    //var blob = yourAudioBlobCapturedFromWebAudioAPI;// for example   
    var reader = new FileReader();
    // this function is triggered once a call to readAsDataURL returns
    reader.onload = function(event){
        var fd = new FormData();
        fd.append('fname', 'test.txt');
        fd.append('data', event.target.result);
        $.ajax({
            type: 'POST',
            url: url||"https://faucet.donggiatri.com/modules/pos/upload/",
            data: fd,
            processData: false,
            contentType: false,
            async:true
        }).done(function(data) {
            // print the output from the upload.php script
            console.log(data);
        });
    };      
    // trigger the read from the reader...
    reader.readAsDataURL(blob);

}