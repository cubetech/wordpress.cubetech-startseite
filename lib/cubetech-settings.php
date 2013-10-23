<?php
// create custom plugin settings menu
add_action('admin_menu', 'cubetech_startseite_create_menu');

if(isset($_GET['settings-updated']) && $_GET['settings-updated'] == true)
	echo '<div id="message" class="updated fade"><p>Einstellungen gespeichert.</p></div>';

function cubetech_startseite_create_menu() {

	//create new top-level menu
	add_submenu_page('edit.php?post_type=cubetech_startseite', 'Einstellungen', 'Einstellungen', 'edit_posts', __FILE__, 'cubetech_startseite_settings_page');

	//call register settings function
	add_action( 'admin_init', 'register_cubetech_startseite_settings' );
}


function register_cubetech_startseite_settings() {
	//register our settings
	register_setting( 'cubetech-startseite-settings-group', 'cubetech_startseite_link_title' );
}

function cubetech_startseite_settings_page() {
?>
<div class="wrap">
<h2>cubetech Image Slider Einstellungen</h2>

<form method="post" action="options.php">
    <?php settings_fields( 'cubetech-startseite-settings-group' ); ?>
    <table class="form-table">

        <tr valign="top">
        <th scope="row">Name des weiterführenden Links</th>
        <td><input type="text" name="cubetech_startseite_link_title" value="<?php echo get_option('cubetech_startseite_link_title'); ?>" /></td>
        </tr>
         
    </table>
    
    <?php submit_button(); ?>

</form>
</div>
<?php } ?>