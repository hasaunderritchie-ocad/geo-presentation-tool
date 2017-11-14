app.controller("homeController", function($scope, $window, scanning, pubnub){
  pubnub.connect('testChannel')
  // my controller is here.
  $scope.scanning = false;
  $scope.hello = "hello world";
  var val
  $scope.val;

    pubnub.connect('testChannel', res => {
      console.log("message received as "+ res);
    })
  $scope.quickSolution = function(){
    $window.location.href="#!dashboard";
  }
  // this starts the QR scanner.
  $scope.beginScanning = function(){
    $scope.scanning = true;
    console.log("clicked");
    scanning.init();
    scanning.beginScan(res=>{
      // call pubnub.connect(res)
      // route to the Dashboard
      scanning.stopScan()
      $scope.val = res;
      data.store(res);
      $window.location.href="#!dashboard";

    });
  };
  $scope.checkVal = function(){
    console.log($scope.val);
  }
});
