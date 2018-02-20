$(document).ready(function(){
	$('#owl-testimonial').owlCarousel({
		loop: true,
		items: 1,
		autoplay: true,
		autoplayTimeout: 3000,
		dots: false,
		nav: true,
		navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>']
	});

	if($(window).width() < 1025){

		$('#portfolio-grid').owlCarousel({
			loop: true,
			items: 1,
			autoplay: false,
			autoplayTimeout: 3000,
			dots: false,
			nav: true,
			navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
			responsive: {
				768: {
					items: 2,
					margin: 15
				}
			}
		});
	}
});	