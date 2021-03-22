var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;



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

var x =0;

function spawnBombs() {

	var bombArray = []
	
	const bomb = document.createElement('div');
	bomb.className = 'bomb';
	bombArray[x] = bomb

	bombArray.push(bomb);
	
	bombArray[x].style.display = 'block';
	randomNumber = Math.random() * (window.innerWidth - 60) + 30;
	randomSpeed = Math.random() * 10;
	bombArray[x].style.left = randomNumber + 'px';

	explosionY = (Math.random() * ((innerHeight - 30)-(innerHeight/5 * 4)) + (innerHeight/5 * 4));
	

	setInterval(function() {

		var bombTop = bombArray[x].offsetTop;
		bombTop = bombTop + 2 + 'px';
		bombArray[x].style.top = bombTop  ;
		document.body.appendChild(bomb);
		
		var bombTop = bombArray[x].offsetTop;
		console.log(explosionY)
		console.log(bombArray[x].offsetTop)
		if (bombArray[x].offsetTop >= explosionY) {
			
			bombArray[x].classList.remove('bomb')
			bombArray[x].className = 'explosion'
			bombArray[x].style.display = 'block';
			
			//bomb still falling in background - eventually will overload the cpu 
		}

	}, 10)


}

function life() {
	var element = document.elementFromPoint(player.offsetLeft, newTop);
	
		if (element.classList.contains('explosion') == false) {

			
		}
}


function clickStart() {
	document.querySelector('.start').style.display = 'none';
	
	setInterval(spawnBombs, 1000);	
	
}



function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	document.querySelector('.start').addEventListener('click', clickStart);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);