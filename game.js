var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var bombSpawn = false;


function keyup(event) {
	var player = document.getElementById('player');
	if (event.key == 'ArrowLeft') {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.key == 'ArrowRight') {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.key == 'ArrowUp') {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.key == 'ArrowDown') {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}

function bombDrop() {
	var bomb = document.querySelector('.bomb');
	if (bombSpawn) {
		var bombTop = bombTop+1;

		bomb.style.top = bombTop + 'px';
	}
		
		
	
}

function move() {
	var player = document.getElementById('player');
	var playerLeft = player.offsetLeft;
	var playerTop = player.offsetTop;
	if (downPressed) {
		var newTop = playerTop+1;

		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = playerTop-1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}
		
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = playerLeft-1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = playerLeft+1;
		
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';		
		}

		player.className = 'character walk right';
	}

}

function keydown(event) {
	if (event.key == 'ArrowLeft') {
		leftPressed = true;
	}
	if (event.key == 'ArrowRight') {
		rightPressed = true;
	}
	if (event.key == 'ArrowUp') {
		upPressed = true;
	}
	if (event.key == 'ArrowDown') {
		downPressed = true;
	}
}



function spawnBomb() {
	var x;
	// var bombArray = new Array(9);
	var bomb = document.querySelector('.bomb');
	bomb[x] = new Array;
	
	// if (bombSpawn) {
		// for (x = 0; x<9; x ++){
			var randomNumber = Math.random() * (window.innerWidth - 30) + 15;
			bomb.style.display = 'block';
			console.log(bomb.style.display);
			console.log(bomb.style.left);
			bomb.style.left = randomNumber + 'px';
			console.log(randomNumber);
			// console.log(x)
			// setInterval(1000);
			
		// }
	
	
	// }
}

function clickStart() {
	document.querySelector('.start').style.display = 'none';
	bombSpawn = true;
	setInterval(spawnBomb, 1000)
	setInterval(bombDrop, 100);
}

function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	document.querySelector('.start').addEventListener('click', clickStart);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);