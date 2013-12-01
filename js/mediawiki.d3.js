( function( $ ) {

function dv_d3( element, i ){
	var d3ID   = element.attr( 'id' ),
	jsonData = $.parseJSON( element.attr('dv_data') );
	root = jsonData;

	console.log(jsonData);

	var diameter = 660;

	var tree = d3.layout.tree()
		.size([360, diameter / 2 - 120])
		.separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

	var diagonal = d3.svg.diagonal.radial()
		.projection(function(d) { return [d.y , d.x / 180 * Math.PI]; });



	var svg = d3.select( "#" + d3ID ).append("svg")
		.attr("width", diameter)
		.attr("height", diameter )
		.append("g")
		.attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

//	d3.json(jsonData, function(error, root) {
	  var nodes = tree.nodes(root),
		  links = tree.links(nodes);

	  var link = svg.selectAll(".link")
		  .data(links)
		  .enter().append("path")
		  .attr("class", "link")
		  .attr("d", diagonal);

	  var node = svg.selectAll(".node")
		  .data(nodes)
		  .enter().append("g")
		  .attr("class", "node")
		  .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

	  node.append("circle")
	//to get size of circle same as size of text
	//      .attr("r", function(d) { return d.name.length*7;  } );
		  .attr("r", 25);

	  node.append("text")
		  .attr("dy", ".31em")
		  .attr("dx", function(d){ return d.x < 180 ? "-2.31em" : d.x < 220 ? "1.31em" : "2.31em"})
		  .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
		  .attr("transform", function(d) { return d.x < 180 ?  d.x < 90 ? "rotate(45)translate(8)" : "rotate(-45)translate(8)" : d.x < 220 ?  "rotate(-90)translate(-8)" : d.x < 300 ? "rotate(-135)translate(-8)" : "rotate(135)translate(-8)"; })
		  .text(function(d) { return d.name; });
//	});

	d3.select(self.frameElement).style("height", diameter - 150 + "px");
};

( function ( $ ) {

	$.fn.dv_d3 = function( i ) {
		dv_d3( this , i );
		return this;
	};
} )( $ );

$( document ).ready( function () { //jquery
	$( '.dv_sd' ).each( function ( i, member ) {
		$( member ).attr( "id", 'dv_sd' + i );
	} );
	$( '.dv_sd' ).each( function ( i, member ) {
		$( member ).dv_d3( i );
	} );
} );

} )( jQuery );