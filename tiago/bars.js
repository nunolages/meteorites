var dataset;

d3.csv("valor.csv", function (data) {
    dataset = data;
    
    gen_vis();
      
})


function gen_vis(){
	
    //var w = window.document.body.offsetWidth; // var w = 1000; // deprecated for now
    //var h = window.document.body.offsetHeight; // var h = 500; // deprecated for now
	var w = window.innerWidth;
    var h = window.innerHeight;
	var max_bars = 214;
	var padding = 30; // 50
	
	var hscale = d3.scale.linear()
                .domain([100000, 0])
                .range([10, h-padding]);
				
	var xscale = d3.scale.linear()
                .domain([0, dataset.length])
                .range([10, w-10]); // .range([padding, w-padding]);

    var svg = d3.select("#the_chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
								
	svg.selectAll("rect")
        .data(dataset)
        .enter()
			.append("rect")
			.attr("width", Math.floor((w)/dataset.length)+1) // .attr("width", Math.floor((w-padding)/dataset.length)-1)
			.attr("height", function(d) {
                           return h-padding-hscale(d.MonetaryValue);
                           })
			.attr("fill", "blue")
			.attr("x", function(d, i) {
                        return xscale(i);
                        })
			.attr("y", function(d) {
                        return hscale(d.MonetaryValue );
                        })
			

				.on('mouseover', function(d, i) {
					d3.select(this).attr("fill", "red");
					console.log(i + 1);
					console.log(d.MonetaryValue);
					console.log(dataset[i].MonetaryValue);
				})
				.on('mouseleave', function(d) {	
					d3.select(this).attr("fill", "blue");
				})
				.append("title")
					.text(function(d, i) {return ( (i + 1) + " most valuable meteorite, name: " 
						+ d.Name + ", monetary value: " + d.MonetaryValue + "$")});
				
///////////////////////////////////////////////
	var yaxis = d3.svg.axis()
        .scale(hscale)
        .orient("left");
    
	var xaxis = d3.svg.axis()
		.scale(xscale)
        .orient("bottom")
		.ticks(dataset.length/20) 
		.tickFormat(function(d) { return d + 1; });

/*    // DESACTIVEI O EIXO VERTICAL PARA VER COMO FICAVA

        svg.append("g")
       .attr("transform", "translate(50, 0)")
       .attr("class", "y axis")
       .call(yaxis);
*/
    svg.append("g")
       .attr("transform", "translate(0, " + (h-padding) + ")")
       .attr("class", "x axis")
       .call(xaxis);

}

// THE FOLLOWING CODE IS QUITE INELEGANT.
// A RE-WRITING OF THE PREVIOUS CODE IS REQUIRED FOR
// RESPONSIVE CHART RESIZING

d3.select(window).on('resize',resize);

function resize() { 
    // update width
    var myNode = document.getElementById("the_chart");
    while (myNode.firstChild) 
      myNode.removeChild(myNode.firstChild);
    gen_vis();
}
