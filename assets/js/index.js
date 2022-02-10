$(function(){
	var controller = new ScrollMagic.Controller();
	var tl = new TimelineMax();
  
	var ww = window.innerWidth;
  
	var noSlides = $(".section").length;
	var slideWidth = $(".section").width();
	var slideContainerWidth = slideWidth * noSlides - ww;
  
	var actionHorizontal = new TimelineMax().to("#slideContainer", 1, {
	  x: -slideContainerWidth,
	  ease: Power0.easeNone
	});
  
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
		// trigger scroll
		controller.scrollTo($targetPos);
		$(this).addClass('active').siblings().removeClass('active');
	  }
	});
});