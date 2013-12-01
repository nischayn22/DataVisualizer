( function( $ ) {

function dv_d3( element, i ){
	var d3ID   = element.attr( 'id' ),
	root = $.parseJSON( element.attr('dv_data') );

	var diameter = 660;

	var tree = d3.layout.tree()
		.size([360, diameter / 2 - 120]);

	var svg = d3.select( "#" + d3ID ).append("svg")
		.attr("width", diameter)
		.attr("height", diameter )
		.append("g")
		.attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

	var nodes = tree.nodes(root),
		links = tree.links(nodes);

	var link = svg.selectAll(".link")
		.data(links)
		.enter().append("line")
		.attr("class", "link")
		.attr("x1", function(d) { return 0; })
		.attr("y1", function(d) { return 0; })
		.attr("x2", function(d) { return d.target.y;})
		.attr("y2", function(d) { return 0;})
		.attr("transform", function(d){return "rotate(" + (d.target.x-180) + ")"; });

	var node = svg.selectAll(".node")
		.data(nodes)
		.enter().append("g")
		.attr("class", "node")
		.attr("transform", function(d) { console.log(d.x, d.y);  return "rotate(" + (d.x - 180) + ")translate(" + d.y + ")"; })

	node.append("circle")
		//to get size of circle same as size of text
		//.attr("r", function(d) { return d.name.length*7;  } );
		.attr("r", 25);

	node.append("text")
		.attr("dy", ".31em")
		.attr("dx", function(d){ return d.x < 180 ? "-2.31em" : d.x < 220 ? "1.31em" : "2.31em"})
		.attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
		.attr("transform", function(d) {  return "rotate(" + -(d.x - 180) + ")"; })
		.text(function(d) { return d.name; });

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