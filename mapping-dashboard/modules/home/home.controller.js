app.controller("homeController", function($scope, scanning, dataFetch){
  // my controller is here.
  $scope.scanning = false;
  $scope.hello = "hello world";
  $scope.beginScanning = function(){
    $scope.scanning = true;
    console.log("clicked");
    scan();
  }
  scan = function(){
    scanning.init();
  }
  $scope.sayData = document.getElementById('result').innerHTML;
  console.log($scope.sayData);
  
});
