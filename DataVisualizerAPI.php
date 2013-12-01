<?php


class DataVisualizerAPI {

	static function getHTML($name, $values){
		global $wgOut;
		//load module
		$wgOut->addModules( 'ext.DataVisualizer' );

		var_dump($name, $values);

		$children = array();
		foreach($values as $value => $size ){
			$children[] = array(
				'name' => $value,
				'size' => $size
			);
		}

		$data = array(
			'name' => $name,
			'children'=> $children
		);

		return '<div class="dv_sd" dv_data=' . json_encode($data) .'></div>';
	}

}