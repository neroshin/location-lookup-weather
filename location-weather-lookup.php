<?php 
	/* 
	Plugin name: Location Lookup Wheather
	Plugin URI: https://example.com/location-lookup-wheather
	Description: A simple plugin 
	Author: Your Name
	Author URI: https://website.com 
	Version: 0.5 
	*/  
	
	define( 'CO_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
	define( 'CO_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
	define('WEATHER_API_KEY', '6d558a4ea0de48179a020450240710');
	
	require_once( CO_PLUGIN_PATH . 'classes/enqueue-locator-wheather-scripts.php' );
	// require_once( CO_PLUGIN_PATH . 'util/co-delivery-utility.php' );
	require_once( CO_PLUGIN_PATH . 'classes/admin-hook-filter-locator-weather.php' );
	require_once( CO_PLUGIN_PATH . 'classes/admin-register-widget-main.php' );

	if (class_exists('LocationWeatherScripts')  &&
	 class_exists('AdminHookFilterWeather') ) {
		new LocationWeatherScripts();
		new AdminHookFilterWeather();
		new AdminRegisterWidgetMain();
	}
	

?>
