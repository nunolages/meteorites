//To load CSV check https://github.com/mbostock/d3/wiki/CSV

var format = d3.time.format("%d/%m/%Y %H:%M:%S AM"); //Example: "01/01/1880 12:00:00 AM"


var width = 960,
    height = 500,
    circleradius = 5,
    strokewidth = 2;

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

//var map = svg.append("map");
var map = d3.select("body") //"select" grabs a DOM element
    .append("svg") //"append" inserts an HTML element in the tree
    .attr("width", width) // "attr" adds attributes to the tag
    .attr("height", height);
    // ".style" would customize the local style

// Tooltip
// http://bl.ocks.org/Caged/6476579
// http://bl.ocks.org/mbostock/1087001
//TODO Add fade in, fade out effects to tooltip.
//TODO Position tooltip somewhere appropriate.
var tip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("display", "none");

// load and display the World
d3.json("world-110m.json", function(error, topology) {

    map.append("g")
        .attr("class", "countries")
        .selectAll("path") //selects all DOM elements of type path
        // note that the selection could be empty
        // later, elements of the selected kind will be filled by use of data + enter
        .data(topojson.feature(topology, topology.objects.countries).features)
        // NOTE: data would do a join with the existing path elements if they existed
        .enter() //works on the data operator; returns refs for data elements that didn't have a DOM element
        .append("path")// for each placeholder created with enter, a path element is created
        //.attr("class", function(d) { return quantize(rateById.get(d.id)); })
        .attr("d", path) //attribute d defines the shape of an SVG path
        .attr("stroke-width", strokewidth);

});


d3.csv("Meteorite_Landings_short.csv",
    function(error, d) {
        map.append("g")
            .attr("class", "circles")
            .selectAll("circle") //selects all DOM elements of type path
            .data(d)
            .enter()
            .append("circle")
            .attr("r", circleradius)
            .attr("stroke-width", strokewidth)
            .attr("cx",
                function(d){
                    //console.log(d.long);
                    return projection([+d.reclong, +d.reclat])[0];
                })
            .attr("cy",
                function(d){
                    //console.log(d.lat);
                    return projection([+d.reclong, +d.reclat])[1];
                })
            .style("fill", "red")
            .on("mouseover",
                function mouseover(d) {
                    tip.style("opacity", 0.5)
                        .text("mass = " + d.mass + "g")
                        .style("display", "inline");
                })
            .on("mouseout",
                function mouseout(d) {
                    tip.style("display", "none");
                });
    });

// pan and zoom
// http://bl.ocks.org/d3noob/5193723
var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        map.attr("transform","translate("+
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        map.selectAll("circle")
            .attr("d", path.projection(projection))
            .attr("r", circleradius/zoom.scale())
            .attr("stroke-width", strokewidth/zoom.scale());
        map.selectAll("path")
            .attr("d", path.projection(projection))
            .attr("stroke-width", strokewidth/zoom.scale());

    });

map.call(zoom)


