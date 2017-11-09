app.factory('data', function(){
  return {
    send: function(data, result){
      if(data){
        console.log(data);
        if(result){
          result(data);
        }
      }
    }
  }
})
