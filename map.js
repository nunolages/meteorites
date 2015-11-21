var width = 960,
    height = 500;

//choroplets: azimuthalEqualArea, albers
//meteorite fall animation: equirectangular, stereographic
//var projection = d3.geo.azimuthalEquidistant() //This is the most interesting one to center on a place (city)
//var projection = d3.geo.albers()
var projection = d3.geo.equirectangular()
    //.center([50, 0 ])
    .scale(100)
    //.rotate([-180,0]);

var path = d3.geo.path()
    .projection(projection);

//var g = svg.append("g");
var g = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// load and display the World
d3.json("world-110m.json", function(error, topology) {
/*    g.selectAll("path")
        .data(topojson.object(topology, topology.objects.countries)
            .geometries)
        .enter()
        .append("path")
        .attr("d", path);*/

    g.append("path")
        .datum(topojson.feature(topology, topology.objects.countries))
        .attr("d", path);

});