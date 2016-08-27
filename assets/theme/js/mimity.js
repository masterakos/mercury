// Function to get window width
$.fn.exist = function(){ return $(this).length > 0; }
function get_width() {
	return $(window).width();
}


$(function(){

	// open navigation dropdown on hover (only when width >= 768px)
	$('ul.nav li.dropdown').hover(function() {
		if (get_width() >= 768) {
			$(this).addClass('open');
		}
	}, function() {
		if (get_width() >= 768) {
			$(this).removeClass('open');
		}
	});

	// owlCarousel for Home Slider
	if ($('.home-slider').exist()) {
		$('.home-slider').owlCarousel({
			items:1,
		    loop:true,
		    autoplay:true,
		    autoplayHoverPause:true,
		    dots:false,
		    nav:true,
		    navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		});
	}

	// owlCarousel for Widget Slider
	if ($('.widget-slider').exist()) {
		var widget_slider = $('.widget-slider');
		widget_slider.owlCarousel({
		    loop:true,
		    dots:false,
		    nav:true,
		    navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		    responsive:{
		        0:{
		        	items:1,
		        },
		        768:{
		        	items:3,
		        	margin:15
		        },
		        992:{
		        	items:1,
		        }
		    }
		});
		widget_slider.on('changed.owl.carousel', function(event) {
			$('button[data-toggle="tooltip"]').tooltip({container:'body'});
			$('a[data-toggle="tooltip"]').tooltip({container:'body'});
		});
	}

});
