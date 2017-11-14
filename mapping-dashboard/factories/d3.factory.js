app.factory('d3Load', function() {
  // 'src/toronto_output.json'
  return {
    csv: (src, callback) => {
      let data = src;
      d3.csv(data, (err, d)=>{
        if(err){
          callback(err);
        }
        callback(d);
      })
    },
    json: (src, callback)=>{
      let data = src;
      d3.json(data, (err, d)=>{
        if(err){
          callback(err);
        }
        callback(d)
      })
    }
  }
});

app.factory('d3Chart', function() {
  return {
    clear: (id)=>{
      d3.select(id + '>svg').remove()
    },
    pie: (src, target, callback) => {
      data = src
      d3.csv(data, (d) => {
        //
      });
    },
    bar: (data, target, filter, callback) => {
      //from Controller
      // let filter = {
      //   'location'  : message[0],
      //   'year'      : message[1],
      //   'yval'      : dataPoints[i]
      // }
      let info = filter['yval'];
      var margin = {
          top: 20,
          right: 20,
          bottom: 30,
          left: 40
        },
        width = 760 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
      var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
      var y = d3.scaleLinear()
        .range([height, 0]);

      var svg = d3.select(target).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

        // format the data
        // data.forEach(function(d) {
        //   if(d['location'] == filter['location']){
        //     if(d['year'] == filter['year']){
        //       d.year = +d['year'];
        //       d.month = +d['month'];
        //       d.location = +d['location'];
        //       d[info] = +d[info];
        //     }
        //   }
        // });

        // Scale the range of the data in the domains
        x.domain(data.map(function(d) {
          return d.month;
        }));
        y.domain([0, d3.max(data, function(d) {
          return d[info];
        })]);

        var max = d3.max(data, function(d){
          return d[info]
        });

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .filter(function(d){
            return d.location == filter['location']
          }).filter(function(d){
            return d.year == filter['year']
          })
          .attr("class", "bar")
          .attr("x", function(d) {
            return x(d.month);
          })
          .attr("width", x.bandwidth())
          .attr("y", height).attr("height", height)
          .attr("fill", (d) => {
            return ("rgb(120, 120, 120)")
          }).on("click", (d, i) => {
            d3.select(this)
              .attr("fill", 'red')
          }).attr("opacity", function (d, i) {
    				return 1
    			}).transition()
          .ease(d3.easeExp)
			.duration(800)
			.delay(function (d, i) {
				return i * 50;
			})
      .attr("y", function(d) {
        return y(d[info]);
      })
      .attr("height", function(d) {
        return height - y(d[info]);
      })
      .attr("fill", (d) => {

        c_var = d[info]/max
        if (c_var >= 1) {
          return ("rgb(210, 0, 0)")
        } else if (c_var > 0.84) {
          return ("rgb(180, 0, 30)")
        } else if (c_var > 0.7) {
          return ("rgb(150, 0, 60)")
        } else if (c_var > 0.56) {
          return ("rgb(120, 0, 90)")
        } else if (c_var > 0.42) {
          return ("rgb(90, 0, 120)")
        } else if (c_var > 0.28) {
          return ("rgb(60, 0, 150)")
        } else if (c_var > 0.14) {
          return ("rgb(30, 0, 180)")
        } else {
          return ("rgb(0, 0, 210)")
        }
      })
      .attr("opacity", (d) => {
        // console.log(d[info]/max);
         return d[info]/max
      });


        // add the x Axis
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .attr("color", "#ffffff")
          .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
          .attr("color", "#ffffff")
          .call(d3.axisLeft(y));


    }

  }
})
