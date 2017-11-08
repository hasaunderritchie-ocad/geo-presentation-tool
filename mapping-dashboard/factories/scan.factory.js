app.factory('scanning',['dataFetch', function(dataFetch){
  return {
    init: function(){
      let scanner = new Instascan.Scanner({ video: document.getElementById('viewFinder') });
      scanner.addListener('scan', function (content) {
        if(content){
          console.log(content);
          document.getElementById('result').innerHTML = content
          
        } else {
          console.log("There is nothing!");
          document.getElementById('result').innerHTML = content
        }
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
    }
  }
}])

app.factory('dataFetch', function(){
  var storeData;
  return {
    fetch: function(data){
      if(data){
        storeData = data;
      } else {
        return storeData;
      }
    },
    give: function(){
      return storeData;
    }
  }
})
