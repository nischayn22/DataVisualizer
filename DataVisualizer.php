<?php

/**
 * Initialization file for the Data Visualizer extension.
 *
 * Documentation:	 		http://www.mediawiki.org/wiki/Extension:Data_Visualizer
 * Support					http://www.mediawiki.org/wiki/Extension_talk:Data_Visualizer
 * Source code:             http://svn.wikimedia.org/viewvc/mediawiki/trunk/extensions/DataVisualizer
 *
 * @file DataVisualizer.php
 * @ingroup DataVisualizer
 *
 * @licence MIT
 * @author Nischay Nahata < nischayn22@gmail.com >
 */

/**
 * This documentation group collects source code files belonging to Data Visualizer.
 *
 * @defgroup DataVisualizer DataVisualizer
 */

if ( !defined( 'MEDIAWIKI' ) ) {
	die( 'Not an entry point.' );
}

define( 'DataVisualizer_VERSION', '0.1' );

$wgExtensionCredits['other'][] = array(
	'path' => __FILE__,
	'name' => 'Data Visualizer',
	'version' => DataVisualizer_VERSION,
	'author' => array(
		'[http://www.mediawiki.org/wiki/User:Nischayn22 Nischay Nahata] for [http://www.wikiworks.com WikiWorks]',
	),
	'url' => 'https://www.mediawiki.org/wiki/Extension:Data_Visualizer',
	'descriptionmsg' => 'DataVisualizer-desc'
);

$useExtensionPath = version_compare( $wgVersion, '1.16', '>=' ) && isset( $wgExtensionAssetsPath ) && $wgExtensionAssetsPath;
$egDataVisualizerScriptPath = ( $useExtensionPath ? $wgExtensionAssetsPath : $wgScriptPath . '/extensions' ) . '/DataVisualizer';
$egDataVisualizerIP = dirname( __FILE__ );
unset( $useExtensionPath );

$wgExtensionMessagesFiles['DataVisualizer'] = $egDataVisualizerIP . '/DataVisualizer.i18n.php';

$wgAutoloadClasses['DataVisualizerAPI'] = $egDataVisualizerIP . '/DataVisualizerAPI.php';

$wgResourceModules['ext.DataVisualizer'] = array(
	// JavaScript and CSS styles.
	'scripts' => array( 'libraries/d3/d3.v3.min.js', 'js/mediawiki.d3.js' ),
	'styles' => array( 'css/style.css' ),
	'localBasePath' => dirname( __FILE__ ),
	'remoteExtPath' => 'DataVisualizer'
);
