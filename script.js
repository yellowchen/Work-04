$(document).ready(function () {
	//header
	$(".headerPage").load("header.html");

	//footer
	$(".footerPage").load("footer.html");

	//carousel
	$(".owl-carousel").owlCarousel({
		loop: true,
		margin: 10,
		stagePadding: 50, //左右兩端會將剩餘的空間填滿樣式
		

		//左右箭頭符號設定
		nav: true,
		navText: [
			'<i class="fa fa-chevron-left" aria-hidden="true"></i>',
			'<i class="fa fa-chevron-right" aria-hidden="true"></i>',
		],

		//自動輪播設定
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,

		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
				nav: false,
			},
			576: {
				items: 2,
			},
			768: {
				items: 3,
			},
			1080: {
				items: 5,
			},
		}

	});
	
});

