//////////////////
// D3 FACTORIES //
//////////////////


////////////////////
// mapMaker

app.factory("mapping", function(data) {
// stopped using the d3 for geo projection. yay!
  /// BEHAVIOURS
  return {
    mapFunction: function(target, callback){
      var src="src/toronto_geoJSON.json";
      mapboxgl.accessToken = 'pk.eyJ1IjoiaGFzYXVuZGVycml0Y2hpZSIsImEiOiJjajl1NmwybzM3NmQzMnhxbW0zMHpnNjg1In0.x01Xu2dBd7Amg9VMVGgGZQ';
      var map = new mapboxgl.Map({
        container: target,
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [-79.3832, 43.6532],
        zoom: 9.45
      });

      map.on('load', function(){

        map.addSource('toronto',{
          'type': 'geojson',
          'data': src,
          'onEachFeature': onEachFeature
        });
        function onEachFeature(feature, layer) {
     layer.on({
         mousemove: mousemove,
         mouseout: mouseout,
         click: zoomToFeature
     });
 }

        map.addLayer({
          'id': 'toronto_map',
          'type': 'fill',
          'source': 'toronto',
          'layout': {},
          'paint': {
            'fill-color': '#fff',
            'fill-opacity': 0.8
          }
        });
      })
      map.on('click', 'toronto_map', function (e) {
        message = e.features[0].properties.HOOD;
        layer = e.target;
        console.log(layer);
        e.target.setStyle({
          weight: 3,
          opacity: 0.3,
          fillOpacity: 0.9
        })
        callback(message)
       new mapboxgl.Popup()
           .setLngLat(e.lngLat)
           .setHTML(e.features[0].properties.HOOD)
           .addTo(map);
   });

    },
    map: function(target, callback) {
      d3.json(src, function(nyc) {
        //////////////////
        // VARIABLES
        var w = 800;
        var h = 700;
        var scale = 100000;

        for (k in nyc.features) {
          nyc.features[k].count = 0;
          nyc.features[k].id = k;
        }
        //////////////////
        // PARAMETERS
        var center = d3.geoCentroid(nyc);
        var projection = d3.geoMercator()
        var path = d3.geoPath(projection);
        var svg = d3.select('#' + target)
          .append("svg")
          .attr("width", w)
          .attr("height", h);
          // .call(drag);
        var selection = svg.append("g")
        //////////////////
        // CONSTRUCTOR
        var g = selection.selectAll("path")
          .data(nyc.features)
          .enter();
        g.append("path")
          .attr("d", path)
          .attr("class", "blocks")
          .attr("id", function(d) {
            return ("a" + d.id)
          })
          .on("click", function(d, i) {
            d3.selectAll(".blocks")
              .style("fill", function() {
                return ("#fff")
              })
            d3.select(this)
              .style("fill", function() {
                return ("#f00")
              });
            // miniMap(i);
            // importData.port(d);
            // importData.return();
            callback(d)
          })
          .style("fill", function(d, i) {
            return ("#fff");
          });


        function zoomed(d) {
          selection.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
      });
    }
  }
});

////// END OF mapMaker


////////////////////
// miniMap

app.factory('miniMap', [function() {
  var w = 350;
  var h = 250;
  var scale = 170000;
  var centered;
  var active;
  return function(id) {
    d3.selectAll("#miniViewMap>svg").remove();
    console.log('miniMap started with id ' + id);
    d3.json("src/toronto_geoJSON.json", function(nyc) {
      var center = d3.geoCentroid(nyc.features[id])
      var projection = d3.geoMercator()
        .center(center)
        .scale(scale)
      var path = d3.geoPath(projection);
      var svg = d3.select('#miniViewMap')
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      var g = svg.append("g")
        .selectAll("path")
        .data(nyc.features)
        .enter()
        .filter(function(d, i) {
          return i == id;
        }).append('path');

      g.attr("d", path)
        .attr("class", "blocks")
        .attr("id", function(d) {
          return ("a" + d.id)
        }).style("fill", function() {
          return "#e0e0ef"
        }).attr('transform', 'translate(-350, -100)')

    });
  }

}])

///// end of miniMap

////////////////////
// importData

app.factory("importData", [function() {
  var datum;
  return {
    port: function(d) {
      datum = d;
      target = document.getElementById('miniView_title')
      console.log(d);
      target.innerHTML = d.properties['HOOD']
    },
    return: function() {
      if (datum) {
        return true;
        console.log("tru")
      } else {
        return false
      }
    }
  }


}]);
/////// END OF importData

//////////////////////
// timeLine

app.factory("timeLine", [function() {
  return function() {
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      },
      width = 9960 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;
    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);
    var y = d3.scaleLinear()
      .range([height, 0]);

    var svg = d3.select("#timeLine").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("../src/fake_data.csv", function(error, data) {
      if (error) throw error;

      // format the data
      data.forEach(function(d) {
        d.cost = +d['Cost'];
        d.frequency = +d['Frequency'];
        d.purchased = +d['Purchased'];

      });

      // Scale the range of the data in the domains
      x.domain(data.map(function(d) {
        return d['Process'];
      }));
      y.domain([0, d3.max(data, function(d) {
        return d.cost;
      })]);

      // append the rectangles for the bar chart
      svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
          return x(d['Process']);
        })
        .attr("width", x.bandwidth())
        .attr("y", function(d) {
          return y(d.cost);
        })
        .attr("height", function(d) {
          return height - y(d.cost);
        })
        .attr("fill", (d) => {
          if (d > 190) {
            return ("rgb(250, 250, 255)")
          } else if (d > 130) {
            return ("rgb(250, 250, 255)")
          } else if (d > 100) {
            return ("rgb(250, 250, 255)")
          } else if (d > 90) {
            return ("rgb(250, 250, 255)")
          } else if (d > 60) {
            return ("rgb(250, 250, 255)")
          } else {
            return ("rgb(250, 250, 255)")
          }
        })
        .attr("opacity", (d) => {
          if (d > 190) {
            return (1)
          } else if (d > 130) {
            return (0.8)
          } else if (d > 100) {
            return (0.6)
          } else if (d > 90) {
            return (0.4)
          } else if (d > 60) {
            return (0.25)
          } else {
            return (0.1)
          }
        }).on("click", (d, i) => {
          d3.selectAll('rect.bar')
            .classed("active", false)
          d3.select(this)
            .classed("active", true)
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

    });

  }
}])
