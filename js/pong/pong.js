var canvasContext;
var canvas;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 5;
var width = 800;
var height = 600;

var paddle1Y = 250;
var paddle2Y = 250;

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const WINNING_SCORE = 10;

var player1Score = 0;
var player2Score = 0;

var showWinScreen = false;

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

window.onload = function(){
	canvas = document.getElementById('canvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(function(){
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);

	canvas.addEventListener('mousemove',
		function(evt){
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
			// paddle2Y = mousePos.y - (PADDLE_HEIGHT/2);
		});

		canvas.addEventListener('mousedown', handleMouseClick);
}

function handleMouseClick(evt){
	if(showWinScreen){
		player1Score = 0;
		player2Score = 0;
		showWinScreen = false;
		console.log("Restarting");
	}
}

function detectMobilePlatform(){
	if(navigator.platform == 'Android'){
		return true;
	}else{
		return false;
	}
}

function computerMovement(){
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2)
	if(paddle2YCenter < ballY-15){
		paddle2Y += 10;
	}else if(paddle2YCenter > ballY+15){
		paddle2Y -= 10;
	}
}

function moveEverything(){
	if(showWinScreen){
		return;
	}else{
		computerMovement();
		ballX -= ballSpeedX;
		ballY -= ballSpeedY;
		if(ballY > canvas.height || ballY < 0){
			ballSpeedY = -ballSpeedY;
		}

		if(ballX < 10){
			if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
				ballSpeedX = -ballSpeedX;
				var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
				ballSpeedY = deltaY * 0.35;
			}else{
				player2Score++;
				reset();
			}
		}else if(ballX > canvas.width-PADDLE_WIDTH){
			if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
				ballSpeedX = -ballSpeedX;
				var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
				ballSpeedY = deltaY * 0.35;
			}else{
				player1Score++;
				reset();
			}
		}
	}
}

function reset(){
	ballX = canvas.width/2;
	ballY = canvas.height/2;
	if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
			showWinScreen = true;
	}
}

function drawEverything(){
	if(detectMobilePlatform()){
		var mq = window.matchMedia("(orientation: landscape)");
		if(mq.matches){
			width = window.width;
			height = window.height;
		}
	}
	canvas.width = width;
	canvas.height = height;
	if(showWinScreen){
		colorRect(0, 0, canvas.width, canvas.height, 'black');
		if(player1Score >= WINNING_SCORE){
			colorText('Player 1 Wins!', canvas.width/2-25, canvas.height/2, 'white');
		}else if(player2Score >= WINNING_SCORE){
			colorText('Player 2 Wins!', canvas.width/2-25, canvas.height/2, 'white');
		}
		colorText('Click to Play Again!', canvas.width/2-35, canvas.height/2+25, 'white');
		return;
	}else{
		colorRect(0, 0, canvas.width, canvas.height, 'black');
		colorRect(0, paddle1Y, PADDLE_WIDTH, 100, 'white');
		colorRect(canvas.width-PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, 100, 'white');
		colorCircle(ballX, ballY, 5, 0, Math.PI*2, true, 'white');
		colorText(player1Score, 100, 50, 'white');
		colorText(player2Score, canvas.width-100, 50, 'white');
	}
}

function colorCircle(x, y, radius, start, end, clockwise, color){
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(x, y, radius, start, end, clockwise);
	canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}

function colorText(text, x, y, color){
	canvasContext.fillStyle = color;
	canvasContext.fillText(text, x, y);
}
