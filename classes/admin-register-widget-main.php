<?php 
// Creating the widget class
class AdminRegisterWidgetMain extends WP_Widget {

    // Constructor function to define the widget's name and description
    public function __construct() {
        parent::__construct(
            'my_custom_widget',  // Base ID of the widget
            __( 'Widget Location Weather', 'textdomain' ), // Widget name for display in the admin
            array( 'description' => __( 'A location weather custom widget', 'textdomain' ) ) // Description
        );

        // Hook to widgets_init action to register the widget
        add_action( 'widgets_init', [$this , 'register_my_custom_widget'] );
    }
        // Register the widget
        function register_my_custom_widget() {
            register_widget($this);
        }
    // Frontend display of the widget
    public function widget( $args, $instance ) {
        // Output before the widget (defined by theme)

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
 
        
        echo $args['before_widget'];


        // Check if title is set and display it
        if ( ! empty( $instance['title'] ) ) {
            echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
            }

        // Widget content (this is where your custom content goes)
        echo '<div class="listing-location-weather" limit="'.$limit.'" totalCount="'.wp_count_posts( "cities" )->publish.'"><pre class="json_data">'. htmlspecialchars(json_encode($posts_data), ENT_QUOTES, 'UTF-8') .'</pre></div>';

        // Output after the widget (defined by theme)
        echo $args['after_widget'];
    }

    // Backend widget form (for settings)
    public function form( $instance ) {
        // Get the widget title or set it to a default value
        $title = ! empty( $instance['title'] ) ? $instance['title'] : __( 'New Title', 'textdomain' );
        ?>
        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:', 'textdomain' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
        </p>
        <?php
    }

    // Updating widget form values
    public function update( $new_instance, $old_instance ) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title']) ) ? strip_tags( $new_instance['title'] ) : '';
        return $instance;
    }
}


?>