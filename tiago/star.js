var dataset;

d3.csv("teste.csv", function (data) {
    dataset = data;
    
    gen_vis();
      
})


function gen_vis(){
	
	
    var w = 400;
    var h = 400;
    
	var padding = 20;
	
	var h_tri = 300;
	var w_tri = 260;
	
	var svg = d3.select("#the_chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
	
	 //svg.append("path")          // attach a path
   //  .style("stroke", "#ffffff")  // colour the line
   //  .style("fill", "#ffffff")     // remove any fill colour
   //  .attr("d", d3.svg.symbol().type('triangle-up').size((h_tri*w_tri)/2))
   //  .attr("transform","translate(175, 175) ");
	
	 //svg.append("path")          // attach a path
   //  .style("stroke", "#fbfbfb")  // colour the line
   //  .style("fill", "#fbfbfb")     // remove any fill colour
   //  .attr("d", d3.svg.symbol().type('triangle-up').size((h_tri*w_tri)/3.55))
   //  .attr("transform","translate(175, 186) ");
	
	 //svg.append("path")          // attach a path
   //  .style("stroke", "#f6f6f6")  // colour the line
   //  .style("fill", "#f6f6f6")     // remove any fill colour
   //  .attr("d", d3.svg.symbol().type('triangle-up').size((h_tri*w_tri)/8))
   //  .attr("transform","translate(175, 197) ");
	
	 //svg.append("path")          // attach a path
   //  .style("stroke", "#f0f0f0")  // colour the line
   //  .style("fill", "#f0f0f0")     // remove any fill colour
   //  .attr("d", d3.svg.symbol().type('triangle-up').size((h_tri*w_tri)/32))
   //  .attr("transform","translate(175, 207.5) ");
	
	//gide line
	svg.append("line")          // attach a line
    .style("stroke", "#999999")  // colour the line
    .style("stroke-width", "2pt")
    .attr("x1", 25)     // x1 position of the first end of the line
    .attr("y1", 305)      // y1 position of the first end of the line
    .attr("x2", 175)     // x2 position of the second end of the line
    .attr("y2", 218);    // y2 position of the second end of the line
	
	//gide line
	svg.append("line")          // attach a line
    .style("stroke", "#999999")  // colour the line
    .style("stroke-width", "2pt")
    .attr("x1", 175)     // x1 position of the first end of the line
    .attr("y1", 218)      // y1 position of the first end of the line
    .attr("x2", 325)     // x2 position of the second end of the line
    .attr("y2", 305);    // y2 position of the second end of the line
	
	//gide line
	svg.append("line")          // attach a line
    .style("stroke", "#999999")  // colour the line
    .style("stroke-width", "2pt")
    .attr("x1", 175)     // x1 position of the first end of the line
    .attr("y1", 45)      // y1 position of the first end of the line
    .attr("x2", 175)     // x2 position of the second end of the line
    .attr("y2", 218);    // y2 position of the second end of the line
	
	svg.append("text")         // append text "FS"
		.style("fill", "black")   // fill the text with the colour black
		.attr("x", 10)           // set x position of left side of text
		.attr("y", 310)           // set y position of bottom of text
		.attr("dy", ".35em")           // set offset y position
		.attr("text-anchor", "middle") // set anchor y justification
		.text("Fs");          // define the text to display
	
		svg.append("text")         // append text "Wo"
		.style("fill", "black")   // fill the text with the colour black
		.attr("x", 340)           // set x position of left side of text
		.attr("y", 310)           // set y position of bottom of text
		.attr("dy", ".35em")           // set offset y position
		.attr("text-anchor", "middle") // set anchor y justification
		.text("Wo");          // define the text to display
	
	svg.append("text")         // append text "Fe"
		.style("fill", "black")   // fill the text with the colour black
		.attr("x", 175)           // set x position of left side of text
		.attr("y", 25)           // set y position of bottom of text
		.attr("dy", ".35em")           // set offset y position
		.attr("text-anchor", "middle") // set anchor y justification
		.text("Fe");          // define the text to display
	
	//
	//
	//cuidado, verificar se dados tem todos Fa, Fe, Wo preencidos e se % nao e maior que 100
	//
	//

	svg.selectAll("rect")
        .data(dataset)
        .enter()
			.append("polygon")          // attach a path
			.style("stroke", "blue")  // colour the line
			.style("stroke-width","2pt")
			.style("fill", "none")     // remove any fill colour
			.style("opacity", 0.3)
			.attr("points", function(d, i) { return (" " +  (150 - (d.Fs * 1.50) + 25) + "," + 
				(305 -(87 - (d.Fs * 0.87))) + ", " + 
				(175 + (d.Wo * 1.50)) + "," + (305 -(87 - (d.Wo * 0.87))) + ", 175," + 
				(173 - (d.Fa * 1.73) + 45) +" " )})
				
			.on("mouseover", function(d, i) {
				d3.select(this).style("stroke", "red")
				.style("opacity", 1);
				info(i);
			})
			.on("mouseout", function(d) {
				d3.select(this).style("stroke", "blue")
				.style("opacity", 0.2);
				d3.select("#amazingViz1").remove();
				d3.select("#amazingViz2").remove();
				d3.select("#amazingViz3").remove();
				d3.select("#amazingViz4").remove();
				d3.select("#amazingViz5").remove();
			})

	function info(i){
		svg.append("text")         // append text "Fe"
			.attr("id", "amazingViz1")
			.style("fill", "black")   // fill the text with the colour black
			.attr("x", 25)           // set x position of left side of text
			.attr("y", 320)           // set y position of bottom of text
			.attr("text-anchor", "left") // set anchor y justification
			.attr("font-family", "sans-serif")
            .attr("font-size", "12px")
			.text("Meteorite name: " + dataset[i].Name);
			
		svg.append("text")         // append text "Fe"
			.attr("id", "amazingViz2")
			.style("fill", "black")   // fill the text with the colour black
			.attr("x", 25)           // set x position of left side of text
			.attr("y", 335)           // set y position of bottom of text
			.attr("text-anchor", "left") // set anchor y justification
			.attr("font-family", "sans-serif")
            .attr("font-size", "12px")
			.text("Location: " + dataset[i].Place + ", " + dataset[i].Country);
			
		svg.append("text")         // append text "Fe"
			.attr("id", "amazingViz3")
			.style("fill", "black")   // fill the text with the colour black
			.attr("x", 25)           // set x position of left side of text
			.attr("y", 350)           // set y position of bottom of text
			.attr("text-anchor", "left") // set anchor y justification
			.attr("font-family", "sans-serif")
            .attr("font-size", "12px")
			.text("Year: " + dataset[i].Year + "; mass(g): " + dataset[i].Mass + "; Class: " +  dataset[i].Class + ", value: " + dataset[i].MonetaryValue + "$");
			
		svg.append("text")         // append text "Fe"
			.attr("id", "amazingViz5")
			.style("fill", "black")   // fill the text with the colour black
			.attr("x", 25)           // set x position of left side of text
			.attr("y", 365)           // set y position of bottom of text
			.attr("text-anchor", "left") // set anchor y justification
			.attr("font-family", "sans-serif")
            .attr("font-size", "12px")
			.text("% de Fe: " + dataset[i].Fa + "; % de Fs: " + dataset[i].Fs + "; % de Wo: " + dataset[i].Wo);
	}	
}