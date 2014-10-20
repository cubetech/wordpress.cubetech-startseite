<?php
/**
 * Plugin Name: cubetech Startseite
 * Plugin URI: http://www.cubetech.ch
 * Description: cubetech startseite - simple startseite view with images
 * Version: 1.0
 * Author: cubetech GmbH
 * Author URI: http://www.cubetech.ch
 */

include_once('lib/cubetech-install.php');
include_once('lib/cubetech-metabox.php');
include_once('lib/cubetech-post-type.php');
include_once('lib/cubetech-settings.php');
include_once('lib/cubetech-shortcode.php');

add_image_size( 'cubetech-startseite-icon', 855, 550, true );
add_action('init', 'cubetech_startseite_add_styles');

function cubetech_startseite_add_styles() {
	wp_register_style('cubetech-startseite-css', plugins_url('assets/css/cubetech-startseite.css', __FILE__) );
	wp_enqueue_style('cubetech-startseite-css');
	wp_enqueue_script('jquery');
	wp_register_script('cubetech_startseite_js', plugins_url('assets/js/cubetech-startseite.js', __FILE__), array('jquery','wpdialogs'));
	wp_enqueue_script('cubetech_startseite_js');
}

if(!function_exists('cubetech_startseite_enqueue_css'))
{
	function cubetech_startseite_enqueue_css()
	{
		wp_register_style('cubetech_startseite_jquery-ui-dialog', plugins_url('assets/css/jquery-ui-dialog.min.css', __FILE__) );
		wp_enqueue_style('cubetech_startseite_jquery-ui-dialog');
	}
	add_action( 'admin_enqueue_scripts', 'cubetech_startseite_enqueue_css' );
} 

/* Add button to TinyMCE */
function cubetech_startseite_addbuttons() {

	if ( (! current_user_can('edit_posts') && ! current_user_can('edit_pages')) )
		return;
	
	if ( get_user_option('rich_editing') == 'true') {
		add_filter("mce_external_plugins", "add_cubetech_startseite_tinymce_plugin");
		add_filter('mce_buttons', 'register_cubetech_startseite_button');
		add_action( 'admin_footer', 'cubetech_startseite_dialog' );
	}
}
 
function register_cubetech_startseite_button($buttons) {
   array_push($buttons, "|", "cubetech_startseite_button");
   return $buttons;
}
 
function add_cubetech_startseite_tinymce_plugin($plugin_array) {
	$plugin_array['cubetech_startseite'] = plugins_url('assets/js/cubetech-startseite-tinymce.js', __FILE__);
	return $plugin_array;
}

add_action('init', 'cubetech_startseite_addbuttons');

function cubetech_startseite_dialog() {

	$args=array(
		'post_type' => 'cubetech_startseite',
		'orderby' => 'name',
		'order' => 'ASC'
	);
	$posts = get_posts($args);
	
	?>
	<style type="text/css">
		#cubetech_startseite_dialog { padding: 10px 30px 15px; }
	</style>
	<div style="display:none;" id="cubetech_startseite_dialog">
		<div>
			<p>
				<select name="cubetech_startseite_posts" id="cubetech_startseite_posts">
					<option value="">Bitte Startseite auswählen</option>
					<?php
						foreach($posts as $p) {
							echo '<option value="' . $p -> ID  . '">' . $p -> post_title . '</option>';
						}
					?>
				</select>
			</p>
			<p><input type="submit" class="button-primary" value="Startseite einfügen" onClick="if ( cubetech_startseite_posts.value != '' && cubetech_startseite_posts.value != 'undefined' ) { tinyMCE.activeEditor.execCommand('mceInsertContent', 0, '[cubetech-startseite id=' + cubetech_startseite_posts.value + ']'); tinymce.activeEditor.windowManager.close(); }" /></p>
		</div>
	</div>
	<?php
}
?>
