<?php

add_action( 'init', 'register_my_menus' );
function register_my_menus() {
	register_nav_menus(
		array(
			'theme_location' => 'Primary Menu' ,
			'before'          => '<span>',
			'after'           => '</span>',
			'menu_class' 	=> 'menu nav nav-tabs'
		)
	);
}

// WP SUPPORT
add_theme_support( 'post-thumbnails' );

// Excerpt Length
function custom_excerpt_length( $length ) {
	return 32;
}

add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

// Enqueue Styles in Header
function mydmk_css() {
	wp_enqueue_script( 'jq-js', get_home_url().'/wp-content/themes/mydmk/jquery/jquery-3.3.1.min.js');
  wp_enqueue_style( 'mydmk-style-main', get_home_url() .'/wp-content/themes/mydmk/style.css' );
	wp_enqueue_style( 'mydmk-style-custom', get_home_url() .'/wp-content/themes/mydmk/dist/css/custom.css' );
  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
  	wp_enqueue_script( 'comment-reply' );
  }
}
add_action( 'wp_enqueue_scripts', 'mydmk_css' );

// Enqueue Scripts in Footer
function mydmk_js() {
	//wp_enqueue_script( 'jq-js', get_home_url().'/wp-content/themes/mydmk/jquery/jquery-3.3.1.min.js');
	wp_enqueue_script( 'main-js', get_home_url().'/wp-content/themes/mydmk/dist/js/all.js');
	wp_enqueue_script( 'font-awesome', 'https://use.fontawesome.com/e66dca7e8d.js' );
}
add_action( 'get_footer', 'mydmk_js' );


// Remove excess WP default items
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

?>
