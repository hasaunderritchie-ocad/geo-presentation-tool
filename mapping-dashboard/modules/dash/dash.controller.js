app.controller('dashController', function($scope, data, pubnub, d3Load, d3Chart) {
  // my controller.
  $scope.data;

  data.return(res => {
    pubnub.connect(res, message => {
      if (message) {
        d3Load.loadWithFilter('src/toronto_output.json', message, res => {
          d3Chart.pie(res, '#piechart');
          d3Chart.bar(res), '#barchart';
        })
      }
    })
  });
})
