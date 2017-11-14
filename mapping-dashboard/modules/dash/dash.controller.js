app.controller('dashController', function($scope, data, pubnub, d3Load, d3Chart) {
  // my controller.
  $scope.location = 'No Neighbourhood Selected'
  $scope.dataPoints = [{
    'id': 'properties_sold',
    'name': 'Properties Sold'
  },{
    'id': 'avg_price',
    'name': 'Average Cost (per sqft)'
  },{
    'id': 'avg_sqr_ft',
    'name': 'Average Size Sold (sqft)'
  },{
    'id': 'walk_score',
    'name': 'Walk Score'
  },{
    'id': 'interest_score',
    'name': 'Interest Score'
  },{
    'id': 'pop_increase',
    'name': 'Local Population Increase'
  },{
    'id': 'city_investment',
    'name': 'Investment from City and Affiliates'
  },{
    'id': 'private_investment',
    'name': 'Investment from Private Organizations'
  }];
  $scope.click=function(){
    return $scope.dataPoints
  }

  //data.return(res => {
  let res="testChannel"
  let src = 'src/toronto_fake_data_1.csv'
    pubnub.connect(res, message => {
      // msg = ['Trinity-Bellwoods', '2014']
      // message will have both name and year
      if (message) {
        console.log(message.text[0]);
        d3Load.csv(src, res => {
          $scope.$apply(function(){
            $scope.location = message.text[0];
          });
          for(i in $scope.dataPoints){
            let filter = {
              'location'  : message.text[0],
              'year'      : message.text[1],
              'yval'      : $scope.dataPoints[i]['id']
            }
            d3Chart.clear('#'+$scope.dataPoints[i]['id']);
            d3Chart.bar(res, '#'+$scope.dataPoints[i]['id'], filter, output=>{
              console.log('d3 chart ran');
            })
          }
        });
      }
    });
  //});
  // let src = 'src/toronto_fake_data_1.csv'
  // d3Load.csv(src, res=>{
  //   let target = "#properties_sold";
  //   let filter = {
  //     'location': 'Trinity-Bellwoods',
  //     'year'    : 'year',
  //     'var1'    : 'month',
  //     'var2'    : 'properties_sold'
  //   }
  //   d3Chart.bar(res, target, message, output=>{
  //     console.log("d3 chart ran");
  //   })
  // });

  // let message = ['Trinity-Bellwoods', '2014']
  // message will have both name and year


  // if (message) {
  //   d3Load.csv('src/toronto_fake_data.csv', res => {
  //     for(i in $scope.dataPoints){
  //       let filter = {
  //         'location'  : message[0],
  //         'year'      : message[1],
  //         'yval'      : $scope.dataPoints[i]['id']
  //       }
  //       d3Chart.bar(res, '#'+$scope.dataPoints[i]['id'], filter, output=>{
  //         console.log('d3 chart ran');
  //       })
  //     }
  //   });
  // }

})
