app.controller("mainController", function($scope){
  // my controller has things
  $scope.state = false;
  $scope.changeState = ()=>{
    console.log("clicked ");
    if(!$scope.state){
      return $scope.state = true;
    } else {
      return $scope.state = false;
    }
  }
})
