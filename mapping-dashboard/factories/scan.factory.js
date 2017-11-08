app.factory('scanning',['dataFetch', function(dataFetch){
  let storeData;
  let scanner = new Instascan.Scanner({ video: document.getElementById('viewFinder') });
  return {
    init: function(){
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
    },
    beginScan: function(res){
      let scan = scanner.addListener('scan', function (content) {
        if(content){
          console.log(content);
          if(res){
            res(content)
          }
          // return storeData = content
          // dataFetch.fetch(content)
          // document.getElementById('result').innerHTML = content
        } else {
          return "There is nothing!";
          // document.getElementById('result').innerHTML = content
        }
      });
      // if(res){
      //   if(scan){
      //     res(scan);
      //   }
      // }
    }
  }
}])

app.factory('dataFetch', function(){
  var storeData;
  return {
    fetch: function(data){
      console.log("fetch started with "+data);
      if(data){
        storeData = data;
      }
    },
    give: function(callback){
      if(storeData){
        if(callback){
          callback(storeData)
        };
      }
    }
  }
})
