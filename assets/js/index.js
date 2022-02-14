let width = $(window).width();
let index = null;
let activeLink = null;

var sliderIndex = 0

window.addEventListener('load', function() {
	var scrollStatus = {
		wheeling: false,
		functionCall: false
	};
	var scrollTimer = false;
	window.addEventListener('wheel', function(e) {
		scrollStatus.wheeling = true;
		if (!scrollStatus.functionCall) {
			//parseScroll here
			if (e.deltaY > 0 && sliderIndex < 10) {
				sliderIndex ++;
			}
			if (e.deltaY < 0 && sliderIndex > 0 ) {
				sliderIndex --;
			}
			scrollStatus.functionCall = true;
			console.log(width * sliderIndex, sliderIndex);
			$('#js-wrapper').animate({
				scrollLeft: width * sliderIndex
			}, 500);
			if ( sliderIndex > 0 ) {
				$('.navigation').fadeIn();
			} else {
				$('.navigation').fadeOut();
			}
			if ( sliderIndex == 7 ) {
				$('a.anchor-nav-item').eq(6).addClass('active');
			} else {
				$('a.anchor-nav-item').removeClass('active').eq(sliderIndex-1).addClass('active');
			}
		}
		window.clearInterval(scrollTimer);
		scrollTimer = window.setTimeout(function() {
			scrollStatus.wheeling = false;
			scrollStatus.functionCall = false;
		}, 100); //set this millisecond to your liking
	});
});

$('a.anchor-nav-item').click(function() {
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	sliderIndex = $(this).index();
})
