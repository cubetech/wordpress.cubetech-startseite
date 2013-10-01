<?php

function cubetech_startseite_create_post_type() {
	register_post_type('cubetech_startseite',
		array(
			'labels' => array(
				'name' => __('Startseiten'),
				'singular_name' => __('Startseite'),
				'add_new' => __('Startseite hinzufügen'),
				'add_new_item' => __('Neue Startseite hinzufügen'),
				'edit_item' => __('Startseite bearbeiten'),
				'new_item' => __('Neue Startseite'),
				'view_item' => __('Startseite betrachten'),
				'search_items' => __('Startseite durchsuchen'),
				'not_found' => __('Keine Startseiten gefunden.'),
				'not_found_in_trash' => __('Keine Startseiten gefunden.')
			),
			'capability_type' => 'post',
			'taxonomies' => array('cubetech_startseite_group'),
			'public' => true,
			'has_archive' => false,
			'rewrite' => array('slug' => 'startseite', 'with_front' => false),
			'show_ui' => true,
			'menu_position' => '20',
			'menu_icon' => null,
			'hierarchical' => true,
			'supports' => array('title')
		)
	);
	flush_rewrite_rules();
}

add_action('init', 'cubetech_startseite_create_post_type');

?>
