var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var boom = false;


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



function spawnBombs() {
var x =0;
	
	
	const bomb = document.createElement('div');
	bomb.className = 'bomb';
	

	// bombArray.push(bomb);
	
	bomb.style.display = 'block';
	randomNumber = Math.random() * (window.innerWidth - 60) + 30;
	randomSpeed = Math.random() * 10 + 1;
	bomb.style.left = randomNumber + 'px';

	explosionY = (Math.random() * ((innerHeight - 30)-(innerHeight/5 * 4)) + (innerHeight/5 * 4));
	
	console.log(x)
	console.log(bomb)

		setInterval(function() {
		
			var bombTop = bomb.offsetTop;
			bombTop = bombTop + 2 + 'px';
			bomb.style.top = bombTop ;
			document.body.appendChild(bomb);
		
		

// console.log(explosionY)
// console.log(bomb.offsetTop)


			if (bomb.offsetTop >= explosionY) {
			
				bomb.classList.remove('bomb')
				bomb.className = 'explosion'
				bomb.style.display = 'block';
				
				//bomb still falling in background - eventually will overload the cpu 
			
			
			var explosionCollision = {x:bomb.offsetLeft, y:bomb.offsetTop, width:128, height:80}
			var playerCollsion = {x:player.offsetLeft, y:player.offsetTop, width:32, height:64}

				if (explosionCollision.x < playerCollsion.x + playerCollsion.width &&
					explosionCollision.x + explosionCollision.width > playerCollsion.x &&
					explosionCollision.y < playerCollsion.y + playerCollsion.height &&
					explosionCollision.y + explosionCollision.height > playerCollsion.y) {

						console.log('boom')
						
						boom = true;
						life();
				}


			}

		}, 10)

// x++;	
}

function life() {
	if (boom=true) {
		console.log('game over')
		boom=false;
		console.log(boom)
	}
}


function clickStart() {
	document.querySelector('.start').style.display = 'none';
	spawnBombs()
	// setInterval(spawnBombs, 1000);	
	
}



function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	document.querySelector('.start').addEventListener('click', clickStart);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);