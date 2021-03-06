jQuery(function(jQuery) {
	function removeImage() {
		jQuery(this).siblings('.cubetech-upload-image').val('');
		jQuery(this).siblings('img').attr('src' , '');
		jQuery(this).parent('.cubetech-startseite-infosection').css('display' , 'none');
		jQuery(this).parent().siblings('.cubetech-startseite-deletesection').css('display' , 'block');
		return false;
	}
	jQuery('.cubetech-upload-startseite-button').click(function(e) {
		e.preventDefault();
		frame = wp.media({
			frame: 'post',
			multiple : true, // set to false if you want only one image
			library : { type : 'image'},
		});
		frame.on('close',function(data) {
			var counter = 1;
			if ( jQuery('.cubetech-preview-image').size() >= 1 ) {
				counter = jQuery('.cubetech-preview-image').size()+1;
			}
			images = frame.state().get('selection');
			images.each(function(image) {
				var emptyUploadImageExist =  jQuery('.cubetech-upload-image[value=""]').size();
				
				if ( emptyUploadImageExist == 0 ) {
					jQuery('#cubetech_startseite_movie').parent('td').parent('tr').before('<tr><th><label for="cubetech_startseite_image">Bild '+counter+'</label></th><td><div class="cubetech-startseite-infosection"><input name="cubetech_startseite_image-'+counter+'" type="hidden" class="cubetech-upload-image cubetech-upload-image-'+counter+'" value="'+image.attributes.id+'" /><img src="'+image.attributes.url+'" class="cubetech-preview-image cubetech-preview-image-'+counter+' cubetech_startseite_image-'+counter+'" alt="" style="max-height: 100px;" /><br /><a href="#" class="cubetech-clear-image-button">Bild entfernen</a></div><div class="cubetech-startseite-deletesection" style="display: none" ><p>Bild entfernt</p></div></td></tr>');
					counter++;
				} else if ( emptyUploadImageExist >= 1 )
				{
					jQuery('.cubetech-upload-image[value=""]').first().siblings('img').attr('src' , image.attributes.url);
					jQuery('.cubetech-upload-image[value=""]').first().parent('.cubetech-startseite-infosection').css('display' , 'block');
					jQuery('.cubetech-upload-image[value=""]').first().parent().siblings('.cubetech-startseite-deletesection').css('display' , 'none');
					jQuery('.cubetech-upload-image[value=""]').first().val(image.attributes.id);
				}		
			});
			jQuery('.cubetech-clear-image-button').on("click", removeImage);	
		});
		frame.open()
	});
	jQuery('.cubetech-clear-image-button').on("click", removeImage);	
});

jQuery(document).ready(function(){
	var contentwidth = jQuery('.viewbox').width();
	var imgcount = jQuery(".cubetech-startseite > li").size();
	var contentpart = contentwidth / imgcount;	

	
	jQuery('.cubetech-startseite-progress').width(contentpart);

	jQuery('.cubetech-startseite > li').first().addClass('aktiv');
	jQuery('.cubetech-startseite > li').hide();    
	jQuery('.cubetech-startseite > li.aktiv').show();
	jQuery('.button-right-mobile').click(function(){
    	indeximage = jQuery('.cubetech-startseite > li.aktiv').index();	
	    jQuery('.cubetech-startseite > li.aktiv').removeClass('aktiv').addClass('oldaktiv');    
	    if ( jQuery('.oldaktiv').is(':last-child')) {
			jQuery('.cubetech-startseite > li').first().addClass('aktiv');
			position = 0;
	    	jQuery('.cubetech-startseite-progress').animate({'left': position}, 200);
	    	return false;

	    } else{
	        jQuery('.oldaktiv').next().addClass('aktiv');
	        indeximage = jQuery('.cubetech-startseite > li.aktiv').index();
	        position = contentpart * indeximage;
	        jQuery('.cubetech-startseite-progress').animate({'left': position}, 200);
	        return false;
		}
	    jQuery('.oldaktiv').removeClass('oldaktiv');
	    jQuery('.cubetech-startseite > li').fadeOut();
	    jQuery('.cubetech-startseite > li.aktiv').fadeIn();		        
	});		
	
    jQuery('#right_arrow_startseite').click(function(){
    	indeximage = jQuery('.cubetech-startseite > li.aktiv').index();	
	    jQuery('.cubetech-startseite > li.aktiv').removeClass('aktiv').addClass('oldaktiv');    
	    if ( jQuery('.oldaktiv').is(':last-child')) {
			jQuery('.cubetech-startseite > li').first().addClass('aktiv');
			position = 0;
	    	jQuery('.cubetech-startseite-progress').animate({'left': position}, 200);

	    } else{
	        jQuery('.oldaktiv').next().addClass('aktiv');
	        indeximage = jQuery('.cubetech-startseite > li.aktiv').index();
	        position = contentpart * indeximage;
	        jQuery('.cubetech-startseite-progress').animate({'left': position}, 200);
	        
		}
	    jQuery('.oldaktiv').removeClass('oldaktiv');
	    jQuery('.cubetech-startseite > li').fadeOut();
	    jQuery('.cubetech-startseite > li.aktiv').fadeIn();	        
	});
		  
	jQuery('#left_arrow_startseite').click(function rightclick(){
		indeximage = jQuery('.cubetech-startseite > li.aktiv').index();	
	    jQuery('.cubetech-startseite > li.aktiv').removeClass('aktiv').addClass('oldaktiv');    
	    if ( jQuery('.oldaktiv').is(':first-child')) {
	    	jQuery('.cubetech-startseite > li').last().addClass('aktiv');
	    	position = contentpart * (imgcount - 1);
	    	jQuery('.cubetech-startseite-progress').animate({'left': position}, 200);
	    } else{
		    jQuery('.oldaktiv').prev().addClass('aktiv');
		    indeximage = jQuery('.cubetech-startseite > li.aktiv').index();
	        position = contentpart * indeximage;
		    jQuery('.cubetech-startseite-progress').animate({'left': position}, 200);
	    }
	    jQuery('.oldaktiv').removeClass('oldaktiv');
	    jQuery('.cubetech-startseite > li').fadeOut();
	    jQuery('.cubetech-startseite > li.aktiv').fadeIn();
    });
    /*Auto Timer*/
    /* buttons that can be turned on (1) and off (0) */
	/* turns auto moving on */
	var auto_slide = 1;
	/* disables the auto moving feature when mouse is hovered over the carousel */
	var hover_pause = 1;
	/* sets auto moving by one image width at once every 5 seconds */
	var auto_slide_seconds = 2500;
	/* puts one image to the left of the first one so that when the right arrow is clicked there's a image to be moved over from the left. The 'left: -200px;' css makes it so that this moved over image is hidden to the left combined with the css 'overflow: hidden;' */

	
	if (auto_slide == 1) {
		/* setInterval function causes the slide() function to be run every few seconds defined by the various auto_slid_seconds. It is currently set to go right but you can change it to left if you wish */
		var timer = setInterval(function(){ jQuery('.cubetech-startseite > li.aktiv').removeClass('aktiv').addClass('oldaktiv');   
		indeximage = jQuery('.cubetech-startseite > li.aktiv').index();	 
	    if ( jQuery('.oldaktiv').is(':last-child')) {
			jQuery('.cubetech-startseite > li').first().addClass('aktiv');
			position = 0;
	    	jQuery('.cubetech-startseite-progress').animate({'left': position}, 200);
	    	
	    } else{
	        jQuery('.oldaktiv').next().addClass('aktiv');
	        indeximage = jQuery('.cubetech-startseite > li.aktiv').index();
	        position = contentpart * indeximage;
	        jQuery('.cubetech-startseite-progress').animate({'left': position}, 200);		    
	    }
	    jQuery('.oldaktiv').removeClass('oldaktiv');
	    jQuery('.cubetech-startseite > li').fadeOut();
	    jQuery('.cubetech-startseite > li.aktiv').fadeIn();}, auto_slide_seconds);
	}
	
	if (hover_pause == 1) {
		// remove the previously set setInterval function when mouse pointer is hovered over the cubetech-image-carousel unordered list
		jQuery('.cubetech-startseite-container').hover(function() {
			clearInterval(timer)
		}, function() {
			// add back in the setInterval auto-moving function when the mouse moves out of the unordered list area
			timer = setInterval(function(){ jQuery('.cubetech-startseite > li.aktiv').removeClass('aktiv').addClass('oldaktiv');    
		indeximage = jQuery('.cubetech-startseite > li.aktiv').index();	 
	    if ( jQuery('.oldaktiv').is(':last-child')) {
			jQuery('.cubetech-startseite > li').first().addClass('aktiv');
			position = 0;
	    	jQuery('.cubetech-startseite-progress').animate({'left': position}, 200);
	    	
	    } else{
	        jQuery('.oldaktiv').next().addClass('aktiv');
	        indeximage = jQuery('.cubetech-startseite > li.aktiv').index();
	        position = contentpart * indeximage;
	        jQuery('.cubetech-startseite-progress').animate({'left': position}, 200);		    
	    }
	    jQuery('.oldaktiv').removeClass('oldaktiv');
	    jQuery('.cubetech-startseite > li').fadeOut();
	    jQuery('.cubetech-startseite > li.aktiv').fadeIn();}, auto_slide_seconds);
		});
	}
    
    /* Content einblenden */
	jQuery('#content-maximize').click(function(){
		jQuery('.content-overlay').css('display','block'); 
		jQuery('#maximize').animate({ opacity: "0" }, 200);
		jQuery('.content-overlay').animate({ opacity: "1" }, 500, function() { jQuery('#maximize').css('z-index','999') });
		return false;
	});
	jQuery('#content-minimize').click(function(){
		jQuery('.content-overlay').animate({ opacity: "0" }, 500, function() { 
			jQuery('#maximize').css('z-index','1001'); 
			jQuery('.content-overlay').css('display','none'); 
			jQuery('#maximize').animate({ opacity: "1" }, 200);
		});
		return false;
	});
});
