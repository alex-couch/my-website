var c = document.getElementById('canvas');
var ctx = c.getContext('2d');

var red = '#FA5128';

ctx.strokeStyle = red;
ctx.lineWidth = 17;
ctx.lineCap = 'round';
ctx.shadowBlur = 15;
ctx.shadowColor = red;

function degreeToRad(degree){
	var x = Math.PI/180;
	return degree*x;
}

function renderClock(){
	var now = new Date();
	var time = now.toLocaleString();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	var millisecond = now.getMilliseconds();
	var newSeconds = second+(millisecond/1000);

	ctx.fillStyle = '#333';
	ctx.fillRect(0, 0, 600, 400);

	renderArc(300, 200, 150, degreeToRad(270), degreeToRad((hour*15)-90));
	renderArc(300, 200, 120, degreeToRad(270), degreeToRad((minute*6)-90));
	renderArc(300, 200, 90, degreeToRad(270), degreeToRad((newSeconds*6)-90));

	renderArc(300, 200, 10, degreeToRad(270), degreeToRad(269));

	renderTextOnCanvas(now, "20px Arial", c.width/2-270, 25)
	renderTextOnCanvas("CouchDoesCode" , "15px Arial", c.width/2-65, c.height-10);
}

function renderTextOnCanvas(text, font, x, y){
	ctx.font = font;
	ctx.fillStyle = red;
	ctx.fillText(text, x, y);
}

function renderArc(x, y, radius, deg1, deg2){
	ctx.beginPath();
	ctx.arc(x, y, radius, deg1, deg2);
	ctx.stroke();
}

setInterval(renderClock, 40);