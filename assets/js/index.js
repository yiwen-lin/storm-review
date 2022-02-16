$(function () {
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
	var sliderIndex = 0;

	if( isMobile.any() ) {
		$('body').addClass('mobile');
	} else {
		$('body').removeClass('mobile');
	}

	let width = $(window).width();
	function sliderInit(width) {
		var scrollStatus = {
			wheeling: false,
			functionCall: false
		};
		var scrollTimer = false;

		function sliderTween() {
			var controller = new ScrollMagic.Controller();
			var tl = new TimelineMax();
		
			var ww = window.innerWidth;
		
			var noSlides = $(".section").length;
			var slideWidth = $(".section").width();
			var slideContainerWidth = slideWidth * noSlides - ww;
			var scrollIng = 0;
			var actionHorizontal = new TimelineMax().to("#slideContainer", 1, {
				x: -slideContainerWidth,
				ease: Power0.easeNone,
			});
			var nowCurrentPos = 0;
			var horizontal = createHorizontal();
		
			function createHorizontal() {
				return new ScrollMagic.Scene({
						triggerElement: "#js-wrapper",
						triggerHook: "onLeave",
						duration: slideContainerWidth,
					})
					.refresh()
					.setPin("#js-wrapper")
					.setTween(actionHorizontal)
					.addTo(controller)
					.on("update", function (e) {
						var sceneAmount = 10,
							sceneWidth = e.endPos / sceneAmount,
							currentPos = e.scrollPos;
						var getScene = Math.round(currentPos / sceneWidth);
		
						if (getScene > 0) {
							$(".navigation").fadeIn();
							var anchorID = getScene - 1;
							if ( anchorID == 6 ) {
								$("#anchor5").addClass("active").siblings().removeClass("active");
							} else {
								$("#anchor" + anchorID).addClass("active").siblings().removeClass("active");
							}
							$('.section [data-aos]').removeClass('aos-animate')
							$(`#section-${anchorID} [data-aos]`).addClass('aos-animate')
						} else {
							$(".navigation").fadeOut();
							$('.section [data-aos]').removeClass('aos-animate')
							$('#section--1 [data-aos]').addClass('aos-animate')
						}
						// DC
						if (Math.abs(scrollIng - currentPos) < 100) scrollIng = 0;
		
						if (getScene >= 0 && scrollIng == 0) {
							var nextScene = Math.floor((currentPos - 50) / sceneWidth);
		
							if (nowCurrentPos > currentPos) {
								nextScene = Math.floor((currentPos + 25) / sceneWidth) - 1;
							}
		
							if (nextScene >= 0) {
								$targetPos = $("#section-" + nextScene).offset().top;
								$targetPos += $("#section-" + nextScene).offset().left;
								controller.scrollTo($targetPos);
								$(this).addClass("active").siblings().removeClass("active");
								nowCurrentPos = currentPos;
							}
						}
					});
			}
		
			controller.scrollTo(function (newpos) {
				//TweenMax.to(window, 1, { scrollTo: { x: newpos } });
				TweenMax.to(window, 1, {
					scrollTo: {
						y: newpos,
						autoKill: true,
					},
					ease: Power3.easeOut,
				});
			});
		
			$(window).on("resize", function () {
				ww = window.innerWidth;
				slideWidth = $(".section").width();
				slideContainerWidth = slideWidth * noSlides - ww;
		
				horizontal.destroy(true);
				horizontal = createHorizontal();
			});
		
			$(".anchor-nav > a").on("click", function (e) {
				var id = $(this).attr("href");
				$targetPos = $(id).offset().top;
				$targetPos += $(id).offset().left;
				if ($(id).length > 0) {
					e.preventDefault();
					// DC
					scrollIng = $targetPos;
					// trigger scroll
					controller.scrollTo($targetPos, true);
					$(this).addClass("active").siblings().removeClass("active");
				}
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
						if (sliderIndex < 10) {
							sliderIndex ++;
						}
					} else { 
						/* up swipe */
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
			$('#js-wrapper').animate({
				scrollLeft: width * sliderIndex
			}, 500);
			if ( sliderIndex > 0 ) {
				$('.navigation').fadeIn();
				$('.section [data-aos]').removeClass('aos-animate');
				$(`#section-${sliderIndex-1} [data-aos]`).addClass('aos-animate')
			} else {
				$('.navigation').fadeOut();
				$('.section [data-aos]').removeClass('aos-animate');
				$('#section--1 [data-aos]').addClass('aos-animate')
			}
			if ( sliderIndex == 7 ) {
				$('a.anchor-nav-item').removeClass('active').eq(5).addClass('active');
			} else {
				$('a.anchor-nav-item').removeClass('active').eq(sliderIndex-1).addClass('active');
			}

			$('a.anchor-nav-item').click(function() {
				let thisIndex = $(this).index();
				sliderIndex = thisIndex;
				$('.section [data-aos]').removeClass('aos-animate');
				$(`#section-${thisIndex} [data-aos]`).addClass('aos-animate')
				$(this).addClass("active").siblings().removeClass("active");
			})
		}

		$('#section--1 [data-aos]').addClass('aos-animate')

		if( isMobile.any() ) {
			sliderSwipe();
		} else {
			sliderTween();
		}
	}

	sliderInit(width);

	window.onresize = function() {
		let width = $(window).width();
		sliderInit(width);
	}
});
