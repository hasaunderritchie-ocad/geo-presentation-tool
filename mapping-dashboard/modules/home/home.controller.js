app.controller("homeController", function($scope, scanning, dataFetch){
  // my controller is here.
  $scope.scanning = false;
  $scope.hello = "hello world";
  $scope.beginScanning = function(){
    $scope.scanning = true;
    console.log("clicked");
    scanning.init();
    scanning.beginScan(res=>{
      console.log(res);
    });
    // dataFetch.give(response=>{
    //   console.log("i got the response of " + response);
    // });
  }

  // $scope.sayData = document.getElementById('result').innerHTML;
  // console.log($scope.sayData);

});
