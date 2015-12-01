var dataset;
var max_paises = 164;
var arrayData = new Array(max_paises);
var arrayNameCountries = new Array(max_paises);
var arrayDataPosisao = new Array;
var arrayWbcode = new Array;
var paisesIndividuais = 0;
var maxPaisRepetido = 0;
d3.csv("countries.csv", function(data){
	for(var i = 0; i < max_paises; i++){
		arrayData[i] = new Array(2);
		arrayData[i][0] = data[i].wbcode;
		arrayData[i][1] = 0;
		arrayNameCountries[i] = data[i].country;
	}
})
	

d3.csv("valor.csv", function (data) {
    dataset = data;
    
	for(var i = 0; i < dataset.length; i++){
		//ver se os nomes dos paises são iguais de csv para csv.
		
		var temp = arrayNameCountries.indexOf(dataset[i].Country);
		arrayData[temp][1] = (arrayData[temp][1] + 1);
		if ((arrayData[temp][1]) == 1) {
			arrayDataPosisao[paisesIndividuais] = temp;
			arrayWbcode[paisesIndividuais] = arrayData[temp][0];
			paisesIndividuais = paisesIndividuais + 1;
		}
		if ((arrayData[temp][1]) >= maxPaisRepetido) {
			maxPaisRepetido = maxPaisRepetido + 1;
		}
	}
	
    gen_vis();
      
})


function gen_vis(){
	
    var w = window.innerWidth;
    var h = window.innerHeight;
	var padding = 10;
	
	var hscale = d3.scale.linear()
        .domain([maxPaisRepetido, 0])
        .range([padding, h-padding]);
				
	var xscale = d3.scale.linear()
        .domain([0, paisesIndividuais])
        .range([padding, w-padding]); //.range([padding, w-padding]);

    var svg = d3.select("#the_chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
	
	for(var i = 0; i < paisesIndividuais; i++){
		svg.append("rect")
		.attr("width", Math.floor((w-padding)/paisesIndividuais)-1)
		.attr("height",  h-padding-hscale(arrayData[arrayDataPosisao[i]][1]))
		.attr("fill", "blue")
		.attr("x", xscale(i))
		.attr("y", hscale(arrayData[arrayDataPosisao[i]][1]))
		.on('mouseover', function(d, i) {
			d3.select(this).attr("fill", "red");
		})
		.on('mouseleave', function(d) {	
			d3.select(this).attr("fill", "blue");
		})
		.append("title")
			.text( "country: " + arrayNameCountries[arrayDataPosisao[i]] + ", number of impacts: " + arrayData[arrayDataPosisao[i]][1] );
	}
/////////////////////////////////////////////
	var yaxis = d3.svg.axis()
        .scale(hscale)
        .orient("left");
		
	var range = (Math.floor((w-padding)/paisesIndividuais)-1)/2;
		
	var x = d3.scale.ordinal()
		.domain(arrayWbcode)
		.range([padding, w-padding])
		.rangePoints([padding + range, w-padding - range]);
		
	var xaxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")

/*    // NOT DRAWING THE Y AXIS, VALUES ARE MORE OR LESS MEANINGLESS

      svg.append("g")
       .attr("transform", "translate(50, 0)")
       .attr("class", "y axis")
       .call(yaxis);
*/

/*  // NOT DRAWING THE X AXIS EITHER, NOMINAL SCALE

    svg.append("g")
       .attr("transform", "translate(0, " + (h-padding) + ")")
       .attr("class", "x axis")
       .call(xaxis);
       
*/
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
