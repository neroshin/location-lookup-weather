<?php
/**
 * Class DeliveryScripts
 *
* This class is responsible for enqueuing scripts and styles for the Delivery plugin.
 * It hooks into WordPress actions to load the necessary resources for both the
 * admin area and the frontend.
 *
 * @package Delivery Plugin
 * @subpackage	classes/ DeliveryScripts
 * @author		Unknown
 * @since		1.0.0
 * 
 */

class LocationWeatherScripts {

  public function __construct() {
    // add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
    add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
  }

  /**
	 * Enqueue scripts and styles.
	 *
	 * @return void
	 */
  public function enqueue_admin_scripts() {
    /* wp_enqueue_script( 'delivery-date-script', CO_PLUGIN_URL . 'assets/delivery-date.js', array( 'wp-element' ), '1.0.0', true );
    wp_enqueue_style( 'delivery-style', CO_PLUGIN_URL . 'assets/admin-delivery.css' ); */
}

  /**
	 * Enqueue scripts and styles.
	 *
	 * @return void
	 */
  public function enqueue_scripts() {
    wp_enqueue_script( 'lodash-script', 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js', array( 'wp-element' ), '1.0.0', true );
    // wp_enqueue_script( 'front-delivery-date-script', CO_PLUGIN_URL . 'assets/front-delivery-date.js', array( 'wp-element' ), '1.0.0', true );
    wp_enqueue_style( 'location-weather-style', CO_PLUGIN_URL . 'build/index.css' );
    wp_enqueue_script( 'location-weather-script', CO_PLUGIN_URL . 'build/index.js', array( 'wp-element' ), '1.0.0', true );

    wp_localize_script( 'location-weather-script', 'react_ajax_object',
			array( 
				
				'ajax_react' => admin_url('admin-ajax.php'),
				'ajax_react_nonce' => wp_create_nonce("ajax_react_nonce"),
				'get_site_url_react' => get_site_url(),
				
			)
		);
  }
}

