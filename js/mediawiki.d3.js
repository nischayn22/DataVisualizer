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
			return 30 + 10*( size/maxSize );
		})
		.on("click", function(d) {
			window.location = d.link !== undefined ? d.link : '' ;
		});

	node.append("foreignObject")
		.attr("transform", function(d) {  return "rotate(" + -(d.x - 180) + ")"; })
		.attr("x", function(d){
			var size = maxSize/2;
			if( d.size !== undefined )
				size = d.size;
			return -(30-2 + 10*( size/maxSize ));
		})
		.attr("y", function(d){
			return -20;
		})
		.attr("width", function(d){
			var size = maxSize/2;
			if( d.size !== undefined )
				size = d.size;
			return 2* (30-2 + 10*( size/maxSize ));
		})
		.attr("height", function(d){
			var size = maxSize/2;
			if( d.size !== undefined )
				size = d.size;
			return 2* (32 + 10*( size/maxSize ));
		})
		.style("background-color", "transparent")
		.style("background", "transparent")
		.on("click", function(d) {
			window.location = d.link !== undefined ? d.link : '' ;
		})
		.append("xhtml:p")
		.style("font", function(d){
			var len = d.name.length;
			if( len > 15 )
				return "10px 'georgia,\"Times New Roman\", Times, serif'";
			else if(len > 8)
				return "12px 'georgia,\"Times New Roman\", Times, serif'";
			else
				return "14px 'georgia,\"Times New Roman\", Times, serif'";
		})
		.style("border-radius", "100%")
		.style("pointer-events", "none")
		.style("background-color", "transparent")
		.style("background", "transparent")
		.style("text-align", "center")
		.style("vertical-align", "middle")
		.style("padding-top", "10px")
		.style("padding-left", "3px")
		.style("padding-right", "3px")
		.html( function(d){
			if(d.name.length > 20)
			{
				d.name = d.name.substr(0,20);
				d.name += '...';
			}
			return d.name.replace(/_/g,' '); }
		);

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