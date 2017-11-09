app.controller('sessionController', function($scope, $window, mapping, data, pubnub){
  // my session
  session = 'testChannel';
  pubnub.connect(session);
  mapping.map('mapview', (response)=>{
    data = response.properties.HOOD
  //  data.send(data);
    pubnub.send(session, data, function(response){
      console.log(response);
    })
  })
})
