app.controller('sessionController', function($scope, $window, mapping, data, pubnub){
  // my session
    $scope.newSession = "testChannel";
  $scope.scanning = false;
  $scope.startScan = function(){
    console.log("start scan with "+ $scope.scanning);
    if(!$scope.scanning){
        $scope.scanning = true;
    } else {
        $scope.scanning = false;
    }
  }
  session = 'testChannel';
  pubnub.connect(session);
  mapping.mapFunction('mapview', (response)=>{
    // msg = ['Trinity-Bellwoods', '2014']
    data = [response, '2014']
  //  data.send(data);
    pubnub.send(session, data, function(response){
      console.log(response);
    })
  })
})
