let width = $(window).width();
let index = null;
let activeLink = null;

const sliderContainer = document.getElementById('slideContainer');

// $('html, body, *').mousewheel(function(e, delta) {
//   this.scrollLeft -= (delta);
//   console.log(e);
// });
  
sliderContainer.addEventListener("scroll", (e) => {
	const scrollLeft = e.target.scrollLeft;
	index = Math.ceil(scrollLeft / width);

	if ( index > 0 ) {
		$('.navigation').fadeIn();
	} else {
		$('.navigation').fadeOut();
	}
	$('a.anchor-nav-item').removeClass('active').eq(index-1).addClass('active');
});
