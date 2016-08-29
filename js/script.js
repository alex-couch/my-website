$(document).ready(function(){
	var $img = $("#img"), speed = 2000;
	var images = [];
	images[0] = "imgs/pic-of-me-1.png";
	images[1] = "imgs/pic-of-me-2.png";
	images[2] = "imgs/pic-of-me-3.png";
	//"imgs/pic-of-me-1.png", "imgs/pic-of-me-2.png", "imgs/pic-of-me-3.png"
	window.setInterval(function(){
		$img.fadeOut(speed, function(){
			$img.attr("src", images[(++i)]);
			if(i >= 3){
				i = 0;
			}
			$img.fadeIn(speed);
		});
	}, 3000);
});