( function( $ ) {

function dv_d3_tree( element, i ){
	var d3ID   = element.attr( 'id' ),
	root = $.parseJSON( element.attr('dv_data') );

	var diameter = 360;

	var tree = d3.layout.tree()
		.size([360, diameter / 2 - 60]);

	var svg = d3.select( "#" + d3ID ).append("svg")
		.attr("width", diameter )
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
		.attr("transform", function(d) { return "rotate(" + (d.x - 180) + ")translate(" + d.y + ")"; });

	var maxSize = 0;
	$.each(nodes[0].children, function( index, value ) {
		var child = value;
		maxSize = Math.max(maxSize,child.size);
	});

	node.append("circle")
		.attr("r", function(d){ 
			var size = maxSize/2;
			if( d.size !== undefined )
				size = d.size;
			return 20 + 10*( size/maxSize );
		})
		.on("click", function(d) {
			window.location = d.link !== undefined ? d.link : '' ;
		});

	node.append("text")
        .attr("dx", function(d){ return -d.name.length*3})
        .attr("dy", function(d){return 5})
		.text(function(d) {
			var title = d.name.replace(/_/g,' ');
			return title;
		})
		.attr("transform", function(d) {  return "rotate(" + -(d.x - 180) + ")"; })
		.on("click", function(d) {
			window.location = d.link !== undefined ? d.link : '' ;
		});

		d3.select(self.frameElement).style("height", diameter - 150 + "px");
};

( function ( $ ) {

	$.fn.dv_d3_tree = function( i ) {
		dv_d3_tree( this , i );
		return this;
	};
} )( $ );

$( document ).ready( function () { //jquery
	$( '.dv_d3_tree' ).each( function ( i, member ) {
		$( member ).attr( "id", 'dv_d3_tree' + i );
	} );
	$( '.dv_d3_tree' ).each( function ( i, member ) {
		$( member ).dv_d3_tree( i );
	} );
} );

} )( jQuery );