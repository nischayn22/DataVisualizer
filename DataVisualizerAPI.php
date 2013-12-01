<?php


class DataVisualizerAPI {

	static function getHTML($name, $values, $cur_url){
		global $wgOut;
		//load module
		$wgOut->addModules( 'ext.DataVisualizer' );

		$children = array();
		foreach($values as $value => $size ){
			$filter_url = $cur_url . urlencode( str_replace( ' ', '_', $name ) ) . '=' . urlencode( str_replace( ' ', '_', $value ) );
			$children[] = array(
				'name' => $value,
				'size' => $size,
				'link' => $filter_url,
			);
		}

		$data = array(
			'name' => $name,
			'children'=> $children
		);

		return '<div class="dv_sd" dv_data=' . json_encode($data) .'></div>';
	}

}