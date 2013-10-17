<?php
function cubetech_startseite_shortcode($atts)
{
	extract(shortcode_atts(array(
		'id'			=> 'id',
		'orderby' 		=> 'menu_order',
		'order'			=> 'asc',
		'numberposts'	=> 999,
		'offset'		=> 0,
		'poststatus'	=> 'publish',
	), $atts));
	
	$return = '';	

	$return .= '<div class="cubetech-startseite-container">';
	$return .= '<div id="left_arrow_startseite"></div><div class="cubetech-startseite-inner">';
	if ( get_option('cubetech_startseite_show_groups') != false )
		$return .= '<h2>' . $tax->name . '</h2>';
	
	$args = array(
		'posts_per_page'  	=> 999,
		'numberposts'     	=> $numberposts,
		'offset'          	=> $offset,
		'orderby'         	=> $orderby,
		'order'           	=> $order,
		'post_type'       	=> 'cubetech_startseite',
		'post_status'     	=> $poststatus,
		'suppress_filters' 	=> true,
		'include'			=> $id,
	);
		
	$posts = get_posts($args);
	
	$return .= cubetech_startseite_content($posts);
	
	$return .= '</div><div id="right_arrow_startseite"></div><div class="cubetech-startseite-progress"></div></div>';
		
	return $return;

}

add_shortcode('cubetech-startseite', 'cubetech_startseite_shortcode');

function cubetech_startseite_content($posts) {

	$contentreturn = '<ul class="cubetech-startseite">';
	
	$i = 0;
	
	foreach ($posts as $post) {		
		$post_meta_data = get_post_custom($post->ID);
		$post_meta = get_post($post->ID);
		$titlelink = array('', '');
		$youtube = $post_meta_data['cubetech_startseite_movie'];
		
		if($youtube) {
			$contentreturn .= '
			<iframe width="100%" height="100%" src="//www.youtube.com/embed/' . $youtube[0] . '" frameborder="0" allowfullscreen></iframe>';
		}
		foreach($post_meta_data as $p) {
			$image = wp_get_attachment_image($p[0], 'cubetech-startseite-icon');
			if ( $image && !$youtube ) {
				$contentreturn .= '
					<li class="cubetech-startseite-icon cubetech-startseite-slide-' . $i . '">
						' . $image . '
					</li>';
			}
		}
	}
	return $contentreturn . '</ul>';
	
}
function cubetech_startseite_contenttext($posts) {
	$slidercontenttext = '<div class="cubetech_startseite_overlay" >';
	
	$i = 0;
	
	foreach ($posts as $post) {
		$post_meta_data = get_post_custom($post->ID);
		
		$date = $post_meta_data['cubetech_startseite_date'][0];
		$title = '<h3 class="cubetech-startseite-title">' . $post->post_title . '</h3>';
		$content = the_content($post->ID);
		
		
	}
	
	
	
}
?>