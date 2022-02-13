$(function(){
	var controller = new ScrollMagic.Controller();
	var tl = new TimelineMax();
  
	var ww = window.innerWidth;
  
	var noSlides = $(".section").length;
	var slideWidth = $(".section").width();
	var slideContainerWidth = slideWidth * noSlides - ww;
  	var scrollIng = 0;
	var actionHorizontal = new TimelineMax().to("#slideContainer", 1, {
	  x: -slideContainerWidth,
	  ease: Power0.easeNone
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
				sceneWidth= (e.endPos) / (sceneAmount),
				currentPos=e.scrollPos;
			var getScene = Math.round(currentPos/sceneWidth);

			if (getScene > 0) {
				$('.navigation').fadeIn();
				var anchorID = getScene - 1 ;
				$('#anchor'+ anchorID).addClass('active').siblings().removeClass('active')
			} else {
				$('.navigation').fadeOut();
			}
			// DC
			if (Math.abs(scrollIng - currentPos) < 100) scrollIng = 0;

			if (getScene >= 0 && scrollIng == 0) {
				var nextScene = Math.floor((currentPos - 50)/sceneWidth);

				if (nowCurrentPos > currentPos) {
					nextScene = Math.floor((currentPos + 25)/sceneWidth) - 1;
				}

				if (nextScene >= 0) {
					$targetPos = $('#section-' + nextScene).offset().top;
					$targetPos += $('#section-' + nextScene).offset().left;
					controller.scrollTo($targetPos);
					$(this).addClass('active').siblings().removeClass('active');
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
  
	$(window).on('resize',function () {
	  ww = window.innerWidth;
	  slideWidth = $(".section").width();
	  slideContainerWidth = slideWidth * noSlides - ww;
	  
	  horizontal.destroy(true);
	  horizontal = createHorizontal();
	});
  
	$('.anchor-nav > a').on("click", function (e) {
	  var id = $(this).attr("href");
	  $targetPos = $(id).offset().top;
	  $targetPos += $(id).offset().left;
	  if ($(id).length > 0) {
		e.preventDefault();
		// DC
		scrollIng = $targetPos;
		// trigger scroll
		controller.scrollTo($targetPos, true);
		$(this).addClass('active').siblings().removeClass('active');
	  }
	});
});