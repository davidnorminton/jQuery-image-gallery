(function($){

    var findImg = 'cs-gallery-image'; // this is the class user uses to define an image for the gallery
    var thumbClass = 'cs-gallery-small';// this class is added to the thumb images
    var imgs = $('.cs-gallery-image');
    var gallery = $('#cs-gallery');
    var count = 0;
    
    /* code for left and right carousel arrows */
    var left_arrow = '<i class="fa fa-angle-left"></i>';// change here if not using font awesome
    var right_arrow = '<i class="fa fa-angle-right"></i>';// change here if not using font awesome
    
    /* set up html for gallery and carousel thumb images */
    var galleryHtml = '<div id="cs-gallery-top-img"><div class="cs-img-title"></div></div>';
    galleryHtml += '<div id="cs-thumbs-cont"><span id="cs-l">';
    galleryHtml += left_arrow;
    galleryHtml += '</span><div id="cs-thumbs"></div></span><span id="cs-r">';
    galleryHtml += right_arrow;
    galleryHtml += '</span></div></div>'
    // add gallery to page
    gallery.prepend(galleryHtml);
    
    /* html for gallery overlay */
    // The close butto html
    var lightbox_close = '<i class="fa fa-times" aria-hidden="true"></i>';// change here if not using font awesome
    var cs_lightbox = '<div class="cs-gallery-overlay"><span id="cs_gallery_close">';
    cs_lightbox += lightbox_close;
    cs_lightbox += '</span><img id="overlay-image" src="{{IMG_SRC}}" /></div>';
    // store the total combined width's of images to calculate container size later
    var cw = 0;
    // store a single height value to get a ratio
    var ch = 0
    // store the thumbs div reference
    var thumbs = $('#cs-thumbs');
    // store top image div refernce
    var topImage = $('#cs-gallery-top-img');

    /* loop over images provided */
    imgs.each(function(){
        // store the src, alt, and title values
        var src = $(this).attr('src');
        var alt = $(this).attr('alt');
        var title = $(this).attr('title');
        
        // the first image(0) will be used as the main large image
        if ( count === 0) {
            
            topImage.css({'background-image': 'url('+src+')' }).attr('data-src', src);
            $('.cs-img-title').html(title);
            $(this).clone().appendTo(thumbs).removeClass(findImg).addClass(thumbClass).attr('id', 'cs-img-'+count);
            cw = cw + $(this).width();
            ch = ch + $(this).height();
        } 
        
        else {
            $(this).clone().appendTo(thumbs).removeClass(findImg).addClass(thumbClass).attr('id', 'cs-img-'+count);
            cw = cw + $(this).width()
        }
        count++;
        
    });
    
    /* calculate and set width of thumbs container */
    var ratio = ch / 50;
    var cs_gallery_width = $('#cs-gallery').width();
    var total_width = Math.round( (cw / ratio) ) ;
    var final_width = total_width+"px";
    thumbs.css({'width': final_width});
    // change the main image to one of the thumb images 
    $("[id^=cs-img-]").click(function () {
         var src = $(this).attr('src');
         var title = $(this).attr('title');
         topImage.css({'background-image': 'url('+src+')' }).attr('data-src', src);
         $('.cs-img-title').html(title);
    });
    
    /* navigate thumbs container */
    var left = $('#cs-l');
    var right = $('#cs-r');
    var scroll_distance = 100
    var position = 0;
    
    // Right carousel button
    right.click(function(){
        if ( position < ( total_width - cs_gallery_width) ) {
            position += scroll_distance;
            var move = position + "px";
            thumbs.attr('style','')
            thumbs.css({'right': move, 'width': final_width});
        }

    });
    
    // Left carousel button
    left.click(function(){
        if( position > scroll_distance ) {
            position -= scroll_distance;
            var move = position + "px";
            thumbs.attr('style','');
            thumbs.css({'right': move,'width': final_width});
        }
        else if ( position >= scroll_distance && position < scroll_distance*1.99) {
            position = 0;
            var move = position + "px";
            thumbs.css({'right': move,'width': final_width});
        }
    });
    
    // make the main image clickable producing an overlay
    topImage.click(function(){
    
        var src = $(this).attr('data-src');
        var load = cs_lightbox.replace('{{IMG_SRC}}', src);
        
        $('body').append(load);
        var img_width = $('#overlay-image').width();
        var img_height = $('#overlay-image').height();
        var win_height = $(window).height();
        var win_width = $(window).width();
        var top = ( (win_height - img_height) / 2 ) + 'px';
        var left = ( (win_width - img_width) / 2 ) + 'px';

        $('#overlay-image').css({'top': top, 'left': left});
        
    });
    
    // remove overlay
    $(document).on('click', '.cs-gallery-overlay', function(){
        $('.cs-gallery-overlay').remove();
    });
     
})(jQuery);
