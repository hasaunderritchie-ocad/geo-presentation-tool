app.controller("homeController", function($scope, scanning){
  // my controller is here.
  $scope.scanning = false;
  $scope.hello = "hello world";
  var val
  $scope.val;
  // this starts the QR scanner.
  $scope.beginScanning = function(){
    $scope.scanning = true;
    console.log("clicked");
    scanning.init();
    scanning.beginScan(res=>{
      $scope.val = res;
    });
  };
  $scope.checkVal = function(){
    console.log($scope.val);
  }
});
