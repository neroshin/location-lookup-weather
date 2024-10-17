<?php
/**
 * Class AdminDeliverySettingProduct
 *
 * Handles the delivery date settings for products in the WooCommerce admin.
 * Adds custom fields to the product edit page for configuring delivery options.
 *
 * @package Delivery Plugin
 * @subpackage classes
 * @author Your Name/Company (if applicable)
 * @since 1.0.0
 */

class AdminHookFilterWeather {

  public function __construct() {
    
	add_action( 'init', [$this , "register_cities_post_type"] );
	add_action( 'init',  [$this ,'register_countries_taxonomy'] );
	add_action( 'add_meta_boxes', [$this ,'cities_add_lat_lng_metabox'] );
	add_action( 'save_post', [$this ,'cities_save_lat_lng_data'] );

	/* add_action("wp_ajax_get_weather_api",  array($this , 'get_weather_api'));
	add_action("wp_ajax_nopriv_get_weather_api", array($this , 'get_weather_api'));
 */

	add_action("wp_ajax_get_next_list_location",  [$this , 'next_list_location']);
	add_action("wp_ajax_nopriv_get_next_list_location", [$this , 'next_list_location']);


	add_shortcode( 'shortcode_location_weather_list', array( $this , 'location_weather_list' ) );
  }


  public function location_weather_list(){


	$limit = 6;
       

	$args_query = array(
		   'post_type'      => 'cities', // Change 'city' to your custom post type slug
		   'posts_per_page' =>  $limit,     // Limit to 10 posts
		   'post_status'    => 'publish' // Only retrieve published posts
	   );

	   $posts = get_posts( $args_query );
	   $posts_data = []; 
		   // Check if posts exist
	   if ( ! empty( $posts ) ) {
		   // Initialize an array to hold post data

		   // Loop through each post
		   foreach ( $posts as $post ) {
			   $posts_data[] = array(
				   'ID'        => $post->ID,
				   'title'     => get_the_title( $post->ID ),
				   'permalink' => get_permalink( $post->ID ),
				   'latitude'  => get_post_meta( $post->ID, '_city_latitude', true ),
				   'longitude' => get_post_meta( $post->ID, '_city_longitude', true ),
				   'excerpt'   => get_the_excerpt( $post->ID ),
			   );
		   }
	   }

	   
	

	   	
		ob_start();
		
		
	   // Widget content (this is where your custom content goes)
	   	echo '<div class="listing-location-weather" limit="'.$limit.'" totalCount="'.wp_count_posts( "cities" )->publish.'"><pre class="json_data">'. htmlspecialchars(json_encode($posts_data), ENT_QUOTES, 'UTF-8') .'</pre></div>';

		
		$output = ob_get_clean();

		return $output; 
  }
  public function next_list_location(){


	if(!isset($_REQUEST['page']) && !isset($_REQUEST['limit']) ) return null;

		$page = isset($_REQUEST['page']) ? intval($_REQUEST['page']) : 1; // Default to page 1 if not provided
		$limit = isset($_REQUEST['limit']) ? intval($_REQUEST['limit']) : 10; // Default to 10 posts per page if not provided
		
		// Correct the offset calculation
		$postOffset = ($page - 1) * $limit;

		$args_query = array(
			'post_type'      => 'cities', // Change 'city' to your custom post type slug
			'posts_per_page' => $limit,     // Limit to 10 posts
			'offset' => $postOffset,     // Limit to 10 posts
			'post_status'    => 'publish' // Only retrieve published posts
		);

		$posts = get_posts( $args_query );
		$posts_data = []; 
			// Check if posts exist
		if ( ! empty( $posts ) ) {
			// Initialize an array to hold post data

			// Loop through each post
			foreach ( $posts as $post ) {
				$posts_data[] = array(
					'ID'        => $post->ID,
					'title'     => get_the_title( $post->ID ),
					'permalink' => get_permalink( $post->ID ),
					'latitude'  => get_post_meta( $post->ID, '_city_latitude', true ),
					'longitude' => get_post_meta( $post->ID, '_city_longitude', true ),
					'excerpt'   => get_the_excerpt( $post->ID ),
				);
			}
		}
		// echo "fasfasd";
		// echo json_encode($posts_data);
		wp_send_json($posts_data);
		exit;
  }
  public function get_weather_api(){

		
		// Error Handling: Check for Missing EndPoint (already included)
		/* if (!isset($_REQUEST['endPoint'])) {
			wp_send_json_error('Missing required parameter: endPoint');
			return;
		} */
		
		// Input Validation: Sanitize Parameters (optional)
		// You might want to sanitize user-provided input in $_REQUEST
		// to prevent potential security vulnerabilities.
		
		$access_token = WEATHER_API_KEY; // Replace with placeholder
		
		
		
		// Remove processed parameters (already included)
		// unset($_REQUEST['endPoint']);
		unset($_REQUEST['action']);
		// unset($_REQUEST['nonce']);
		
		// Build Query String (already included)
		$params = $_REQUEST;
		$query_string = http_build_query($params);
		
		// Headers (already included)
		
		echo "http://api.weatherapi.com/v1/current.json" . '?' . $query_string;
		// API Request (use wp_remote_get or alternative)
		$args = array(
			'method' => 'GET',
			'headers' => $headers,
			'url' => "http://api.weatherapi.com/v1/current.json" . '?' . $query_string,
		);
		
		$response = wp_remote_get($api_url . '?' . $query_string, $args);
		
		// Error Handling: Check for WP Error (already included)
		if (is_wp_error($response)) {
			$error_message = $response->get_error_message();
			wp_send_json_error('Error fetching : ' . $error_message);
			return;
		}
		
		// Error Handling: Check for JobAdder API Error Response (already included)
		$body = wp_remote_retrieve_body($response);
		if (isset($body->error)) {
			$error_message = $body->error_description;
			wp_send_json_error(' API Error: ' . $error_message);
			return;
		}
		
		// Success: Return Valid Data or JSON Error (already included)
		echo $body;
		exit;
			
	}
  public function register_cities_post_type() {
		$labels = array(
			'name'               => _x( 'Cities', 'post type general name', 'textdomain' ),
			'singular_name'      => _x( 'City', 'post type singular name', 'textdomain' ),
			'menu_name'          => _x( 'Cities', 'admin menu', 'textdomain' ),
			'name_admin_bar'     => _x( 'City', 'add new on admin bar', 'textdomain' ),
			'add_new'            => _x( 'Add New', 'city', 'textdomain' ),
			'add_new_item'       => __( 'Add New City', 'textdomain' ),
			'new_item'           => __( 'New City', 'textdomain' ),
			'edit_item'          => __( 'Edit City', 'textdomain' ),
			'view_item'          => __( 'View City', 'textdomain' ),
			'all_items'          => __( 'All Cities', 'textdomain' ),
			'search_items'       => __( 'Search Cities', 'textdomain' ),
			'not_found'          => __( 'No cities found.', 'textdomain' ),
			'not_found_in_trash' => __( 'No cities found in Trash.', 'textdomain' ),
		);

		$args = array(
			'labels'             => $labels,
			'public'             => true, // Whether it’s public or not
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'cities' ), // Custom slug
			'capability_type'    => 'post',
			'has_archive'        => true, // Enables archive page
			'hierarchical'       => false, // Like pages (true) or posts (false)
			'menu_position'      => 5, // Position in the admin menu
			'menu_icon'          => 'dashicons-location-alt', // Dashicons icon for the menu
			'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'comments' ), // Post editor features to support
			'show_in_rest'       => true, // Enables Gutenberg editor
		);

		register_post_type( 'cities', $args );


	}



		// Register Custom Taxonomy for Countries
	public function register_countries_taxonomy() {

			// Labels for the Countries taxonomy
			$labels = array(
				'name'              => _x( 'Countries', 'taxonomy general name', 'textdomain' ),
				'singular_name'     => _x( 'Country', 'taxonomy singular name', 'textdomain' ),
				'search_items'      => __( 'Search Countries', 'textdomain' ),
				'all_items'         => __( 'All Countries', 'textdomain' ),
				'parent_item'       => __( 'Parent Country', 'textdomain' ),
				'parent_item_colon' => __( 'Parent Country:', 'textdomain' ),
				'edit_item'         => __( 'Edit Country', 'textdomain' ),
				'update_item'       => __( 'Update Country', 'textdomain' ),
				'add_new_item'      => __( 'Add New Country', 'textdomain' ),
				'new_item_name'     => __( 'New Country Name', 'textdomain' ),
				'menu_name'         => __( 'Countries', 'textdomain' ),
			);

			// Arguments for the Countries taxonomy
			$args = array(
				'hierarchical'      => true, // Set to true for hierarchical like categories, false for tags
				'labels'            => $labels,
				'show_ui'           => true,
				'show_admin_column' => true,
				'query_var'         => true,
				'rewrite'           => array( 'slug' => 'country' ),
			);

			// Register the taxonomy and attach it to the Cities post type
			register_taxonomy( 'country', array( 'cities' ), $args );
		}



		// Register the meta box for latitude and longitude
		public	function cities_add_lat_lng_metabox() {
			add_meta_box(
				'cities_lat_lng', // Meta box ID
				__( 'City Location (Latitude & Longitude)', 'textdomain' ), // Meta box title
				[$this , 'cities_lat_lng_callback'], // Callback function that renders the fields
				'cities', // Post type (for Cities)
				'normal', // Context: normal (main column), side, etc.
				'default' // Priority
			);
		}
	
		// Callback function to display latitude and longitude fields
		public	function cities_lat_lng_callback( $post ) {
			// Add nonce for security and authentication
			wp_nonce_field( 'save_cities_lat_lng_data', 'cities_lat_lng_meta_box_nonce' );

			// Retrieve existing latitude and longitude meta data (if any)
			$latitude = get_post_meta( $post->ID, '_city_latitude', true );
			$longitude = get_post_meta( $post->ID, '_city_longitude', true );

			?>
			<style>
			.metabox-container-weather {
				margin-bottom: 20px;
			}

			.metabox-container-weather p {
				margin-bottom: 10px;
			}

			.metabox-container-weather label {
				display: block;
				font-weight: bold;
				margin-bottom: 5px;
			}

			.metabox-container-weather input[type="text"] {
				width: 100%;
				padding: 5px;
				border: 1px solid #ccc;
				border-radius: 3px;
			}
			</style>
			<div class="metabox-container-weather">
				<p>
					<label for="city_latitude"><?php _e( 'Latitude:', 'textdomain' ); ?></label>
					<input type="text" id="city_latitude" name="city_latitude" value="<?php echo esc_attr( $latitude ); ?>" size="25" />
				</p>
				<p>
					<label for="city_longitude"><?php _e( 'Longitude:', 'textdomain' ); ?></label>
					<input type="text" id="city_longitude" name="city_longitude" value="<?php echo esc_attr( $longitude ); ?>" size="25" />
				</p>
			</div>
			<?php
		}

		// Save latitude and longitude data
		public	function cities_save_lat_lng_data( $post_id ) {
			// Verify nonce for security
			if ( ! isset( $_POST['cities_lat_lng_meta_box_nonce'] ) || ! wp_verify_nonce( $_POST['cities_lat_lng_meta_box_nonce'], 'save_cities_lat_lng_data' ) ) {
				return;
			}

			// Check if the current user has permission to edit the post
			if ( ! current_user_can( 'edit_post', $post_id ) ) {
				return;
			}

			// Check if the post is being autosaved
			if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
				return;
			}

			// Validate and sanitize latitude input
			if ( isset( $_POST['city_latitude'] ) ) {
				$latitude = sanitize_text_field( $_POST['city_latitude'] );
				update_post_meta( $post_id, '_city_latitude', $latitude );
			}

			// Validate and sanitize longitude input
			if ( isset( $_POST['city_longitude'] ) ) {
				$longitude = sanitize_text_field( $_POST['city_longitude'] );
				update_post_meta( $post_id, '_city_longitude', $longitude );
			}
		}
		

}

