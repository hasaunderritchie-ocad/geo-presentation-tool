app.factory('data', function(pubnub){
  var dataStore;
  return {
    store: function(data){
      dataStore = data;
    },
    return: function(res){
      if(res){
        res(dataStore);
      }
    },
    newData: function(data, res){
    }
  }
})
