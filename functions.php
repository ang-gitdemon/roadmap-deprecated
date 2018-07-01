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
function as3_css() {
  wp_enqueue_style( 'as3-style', get_stylesheet_uri().'/dist/css/style.css' );
  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
  	wp_enqueue_script( 'comment-reply' );
  }
}
add_action( 'wp_enqueue_scripts', 'as3_css' );

// Enqueue Scripts in Footer
function as3_js() {
	wp_enqueue_script( 'jquery-js', 'https://code.jquery.com/jquery-3.3.1.slim.min.js');
	//wp_enqueue_script( 'popper-min', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js' );
	//wp_enqueue_script( 'bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js');
	//wp_enqueue_script( 'owl-min', 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.min.js' );
	//wp_enqueue_script( 'main', get_stylesheet_directory_uri().'/js/main.js' );
	wp_enqueue_script( 'font-awesome', 'https://use.fontawesome.com/e66dca7e8d.js' );
}
add_action( 'get_footer', 'as3_js' );

// Remove excess WP default items
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

?>
