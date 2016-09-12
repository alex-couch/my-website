var c = document.getElementById('canvas');
var ctx = c.getContext('2d');

ctx.strokeStyle = '#28d1fa';
ctx.lineWidth = 17;
ctx.lineCap = 'round';
ctx.shadowBlur = 15;
ctx.shadowColor = '#28d1fa'

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

	ctx.font = "20px Arial";
	ctx.fillStyle = "#28d1fa";
	ctx.fillText(now, c.width/2-270, 25);

	ctx.font = "15px Arial";
	ctx.fillStyle = "#28d1fa";
	ctx.fillText("CouchDoesCode", c.width/2-65, c.height-10);
}

function renderArc(x, y, radius, deg1, deg2){
	ctx.beginPath();
	ctx.arc(x, y, radius, deg1, deg2);
	ctx.stroke();
}

setInterval(renderClock, 40);