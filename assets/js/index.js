var sliderIndex = 0;
var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

let width = $(window).width();
function sliderInit(width) {
	var scrollStatus = {
		wheeling: false,
		functionCall: false
	};
	var scrollTimer = false;

	function sliderWheel() {
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
				sliderAction();
			}
			window.clearInterval(scrollTimer);
			scrollTimer = window.setTimeout(function() {
				scrollStatus.wheeling = false;
				scrollStatus.functionCall = false;
			}, 100); //set this millisecond to your liking
		});
	}

	function sliderSwipe() {
		document.addEventListener('touchstart', handleTouchStart, false);        
		document.addEventListener('touchmove', handleTouchMove, false);

		var xDown = null;
		var yDown = null;

		function getTouches(evt) {
		return evt.touches ||             // browser API
				evt.originalEvent.touches; // jQuery
		}

		function handleTouchStart(evt) {
			const firstTouch = getTouches(evt)[0];
			xDown = firstTouch.clientX;
			yDown = firstTouch.clientY;
		};

		function handleTouchMove(evt) {
			if ( ! xDown || ! yDown ) {
				return;
			}

			var xUp = evt.touches[0].clientX;
			var yUp = evt.touches[0].clientY;

			var xDiff = xDown - xUp;
			var yDiff = yDown - yUp;

			if ( Math.abs( xDiff ) <= Math.abs( yDiff ) ) {
				if ( yDiff > 0 ) {
					/* down swipe */ 
					console.log('down swipe');
					if (sliderIndex < 10) {
						sliderIndex ++;
					}
				} else { 
					/* up swipe */
					console.log('up swipe');
					if (sliderIndex > 0 ) {
						sliderIndex --;
					}
				}
			}
			sliderAction();
			/* reset values */
			xDown = null;
			yDown = null;
		};
	}

	function sliderAction() {
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

	if( isMobile.any() ) {
		sliderSwipe()
	} else {
		sliderWheel()
	}
}
sliderInit(width);

window.onresize = function() {
	let width = $(window).width();
	sliderInit(width);
}

$('a.anchor-nav-item').click(function() {
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	sliderIndex = $(this).index();
})
