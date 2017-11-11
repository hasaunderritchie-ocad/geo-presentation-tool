app.factory('scanning',function(){
  let storeData;
  let scanner = new Instascan.Scanner({ video: document.getElementById('viewFinder') });
  return {
    init: function(){
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          if(cameras.length > 1) {
            scanner.start(cameras[1]);
          } else {
            scanner.start(cameras[0]);

          }
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
        } else {
          return "There is nothing!";
        }
      });
    },
    stopScan: function(res){
      scanner.stop()
    }
  }
})
