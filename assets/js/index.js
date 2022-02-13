let width = $(window).width();
let index = null;
let activeLink = null;

document.getElementById('slideContainer').addEventListener("scroll", (e) => {
	const scrollLeft = e.target.scrollLeft;
	index = Math.ceil(scrollLeft / width);
	$('a.anchor-nav-item').removeClass('active').eq(index-1).addClass('active');
});
