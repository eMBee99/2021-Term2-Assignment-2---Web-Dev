var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var devBomb = false;



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
	if (event.key == '1') {
		devBomb = false
		
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
	if (event.key == '1') {
		devBomb = true;
	}
}

var scoreCounter = 0;
var bombFall;
var hitCheck;
var i = -1

function spawnBombs() {
var x =0;
	var player = document.getElementById('player');
	const bomb = document.createElement('div');
	bomb.className = 'bomb';
	
	bomb.style.display = 'block';
	randomNumber = Math.random() * (window.innerWidth - 60) + 30;
	randomSpeed = Math.random() * 10 + 1;

	if ( devBomb == true){
		bomb.style.left = player.style.left
	}else{

	bomb.style.left = randomNumber + 'px';
	}
	explosionY = (Math.random() * ((innerHeight - 30)-(innerHeight/5 * 4)) + (innerHeight/5 * 4));
	
		bombFall = setInterval(function() {
		
			var bombTop = bomb.offsetTop;
			bombTop = bombTop + 2 + 'px';
			bomb.style.top = bombTop ;
			document.body.appendChild(bomb);
		
			if (bomb.offsetTop >= explosionY) {
			
				bomb.classList.remove('bomb')
				bomb.className = 'explosion'
				bomb.style.display = 'block';
				
				//bomb still falling in background - eventually will lag
			
			
			var explosionCollision = {x:bomb.offsetLeft, y:bomb.offsetTop, width:128, height:80}
			var playerCollsion = {x:player.offsetLeft, y:player.offsetTop, width:32, height:64}

				if (explosionCollision.x < playerCollsion.x + playerCollsion.width &&
					explosionCollision.x + explosionCollision.width > playerCollsion.x &&
					explosionCollision.y < playerCollsion.y + playerCollsion.height &&
					explosionCollision.y + explosionCollision.height > playerCollsion.y) {
						
						player.className = 'character hit down';

						hitCheck = setInterval(function() {

						life();

						}, 1000);
						
						bomb.classList.remove('explosion');
						i++
						
				} else if (bomb.offsetTop >= innerHeight) {
					
					bomb.parentNode.removeChild(bomb);
					scoreCounter++;
					console.log(scoreCounter)
					bomb.classList.remove('explosion');
				}


			}

		}, 10)


}

var healthList;

function life() {
	
	healthList = document.getElementsByTagName("li")[i]
	
	healthList.style.display = 'none';
	

	if (i == 2 ){
		gameOver();
		
		clearInterval(bombTimer)
		clearInterval(bombFall)
		clearInterval(hitCheck)
	}

		
		// if (player.classList.contains('character walk up' | 'character stand up' )) {
		// 	player.className = 'character hit up';
		// }
		// if (player.classList.contains('character walk down' | 'character stand down' )) {
		// 	player.className = 'character hit down';
		// }
		// if (player.classList.contains('character walk left' | 'character stand left' )) {
		// 	player.className = 'character hit left';
		// }
		// if (player.classList.contains('character walk right' | 'character stand rightleft' )) {
		// 	player.className = 'character hit right';
		// }
		
	
}

function resetHealth() {

	for (var y=0;y<3;y++){
		healthList = document.getElementsByTagName("li")[y]
		healthList.style.display = 'block';
	}
	player.className = 'character stand down';
}

var bombTimer
function clickStart() {

	document.querySelector('.start').style.display = 'none';
	document.querySelector('.gameOver').style.display = 'none';
	
	bombTimer = setInterval(spawnBombs, 1000);	
	
}

function gameOver() {
	


	player.className = 'character dead';

	document.querySelector('.gameOver').style.display = 'block';

	// var roundScore = localStorage.setItem(scoreCounter)

	// var scoreBoard = document.getElementById('scoreBoard');
	// var scores = document.createElement("li")
	
	// scoreBoard.appendChild(scores);
	// scores.innerHTML(roundScore);
	
	


	scoreCounter =0;
}



function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	document.querySelector('.start').addEventListener('click', clickStart);
	document.querySelector('.gameOver').addEventListener('click', clickStart);
	document.querySelector('.gameOver').addEventListener('click', resetHealth);
	
}


document.addEventListener('DOMContentLoaded', myLoadFunction);