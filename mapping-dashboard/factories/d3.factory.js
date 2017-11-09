app.factory('d3Load', function() {
  // 'src/toronto_output.json'
  return {
    load: (src, callback) => {
      let data = src;
      d3.json(data, output => {
        if (callback) {
          for (k in output) {
            callback(output[k]);
          }
        }
      });
    },
    loadWithFilter: (src, filter, callback) => {
      let data = src;
      let condition = filter;
      d3.json(data, output => {
        let res = []
        for (k in output) {
          if (output[k]['location'] == condition) {
            res.push(output[k]);
          }
        }
        if (callback) {
          callback(res);
        }
      });
    }

  }
});

app.factory('d3Chart', function(){
  return {
    pie: (data, target, callback) => {
      d3.json(data, (d)=>{
        //
      });
    },
    bar: (data, target, callback) => {
      d3.json(data, (d)=>{
        //
      });
    }

  }
})
