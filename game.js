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
var i = 0; //number of 'li' for the health orb things
var limit = 10 //number of max bombs per level
var x = 0; //number of bombs since level start
var a = 0; //number of bombs since start
var counter = 1; //a counter to count the level the player is on
var bombTimer;


function spawnBombs() {

	var player = document.getElementById('player');

	const bomb = {
		div: document.createElement('div'),
		speed: Math.random() * 4 + counter,
	}
	bomb.div.className = 'bomb';

console.log(bomb.speed)
	// console.log("bomb number " + x)
	// console.log("total number of bombs " + a)
	
	bomb.div.style.display = 'block';
	randomLeft = Math.random() * (window.innerWidth - 60) + 30;
	
	if ( devBomb == true){
		bomb.div.style.left = player.style.left
	}else{
	bomb.div.style.left = randomLeft + 'px';
	}

	explosionY = (Math.random() * ((innerHeight - 30)-(innerHeight/5 * 4)) + (innerHeight/5 * 4));
	
		bombFall = setInterval(function() {
		
			if (i == 3) {

				bomb.div.parentNode.removeChild(bomb);
				bomb.div.classList.remove('bomb');
				bomb.div.classList.remove('explosion');
				clearInterval(bombTimer)
				clearInterval(bombFall)
				
			}

			var bombTop = bomb.div.offsetTop;
			bombTop = bombTop + bomb.speed + 'px';
			bomb.div.style.top = bombTop  ;

			document.body.appendChild(bomb.div);
			
		if (bomb.div.offsetTop >= explosionY) {
			
				bomb.div.classList.remove('bomb')
				bomb.div.className = 'explosion'
				bomb.div.style.display = 'block';
				
			var explosionCollision = {x:bomb.div.offsetLeft, y:bomb.div.offsetTop, width:128, height:80}
			var playerCollsion = {x:player.offsetLeft, y:player.offsetTop, width:32, height:64}

				if (explosionCollision.x < playerCollsion.x + playerCollsion.width &&
					explosionCollision.x + explosionCollision.width > playerCollsion.x &&
					explosionCollision.y < playerCollsion.y + playerCollsion.height &&
					explosionCollision.y + explosionCollision.height > playerCollsion.y) {
						
						player.className = 'character hit down';
						
						life();
				
						bomb.div.classList.remove('explosion');
						i++
						
				} else if (bomb.div.offsetTop >= innerHeight) {
					
					bomb.div.parentNode.removeChild(bomb.div);
					scoreCounter++;
					console.log(scoreCounter + " points scored")
					bomb.div.classList.remove('explosion');
					
				}

			}
			
		}, 10)

		if (x==limit){
			
			clearInterval(bombFall);
			clearInterval(bombTimer);
			
			console.log("level " + counter)
		
			showLevel();
			
			x = 0
			limit = limit + 5;
		
		}
	x++;
a++;
		
}

var healthList;

function life() {
	console.log("lives orb " + i)
	healthList = document.getElementsByTagName("li")[i]
	
	healthList.style.display = 'none';

	if (i == 2 ){
		gameOver();
		
		
		clearInterval(bombTimer)
		clearInterval(bombFall)
		
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

function reset() {

	document.querySelector('.gameOver').style.display = 'none';

	for (var y=0;y<3;y++){
		healthList = document.getElementsByTagName("li")[y]
		healthList.style.display = 'block';
	}
	player.className = 'character stand down';
	x = 0;
	i = 0;
	limit = 10;
	counter = 1;
}

function clickStart() {
	// randomSpeed = Math.random() * 4 + counter;
	console.log("starting level "+ counter)
	
	document.querySelector('.start').style.display = 'none';
	timer = counter*100
	if (counter >=8){
		timer = 800 
	}
	randomDropRate = Math.random() * (1000-(timer)-100)+ 100;
	console.log("drop rate: " + randomDropRate)
	console.log("limit is " + limit)
	document.querySelector('.showLevel').innerHTML = "Level " + counter;
	bombTimer = setInterval(spawnBombs, randomDropRate);	
	
}	

function gameOver() {
	
	player.className = 'character dead';

	document.querySelector('.gameOver').style.display = 'block';

	var name = window.prompt("What is your name?");

	localStorage.setItem('name', name);
	localStorage.setItem('score', scoreCounter);
	var roundScore = localStorage.getItem('score');
	var roundName = localStorage.getItem('name');

	var scoreBoard = document.getElementById('scoreBoard');
	var scores = document.createElement("li")
	
	scoreBoard.appendChild(scores);
	var newScore = document.createTextNode(roundScore);
	var newName = document.createTextNode(roundName + "  ");

	scores.appendChild(newName);
	scores.appendChild(newScore);

	scoreCounter =0;
	
}

function showLevel() {
	
	document.querySelector('.showLevel').innerHTML = "Level " + counter;
	counter++;
	
	clickStart();
}

function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	document.querySelector('.start').addEventListener('click', clickStart);
	document.querySelector('.gameOver').addEventListener('click', reset);
	document.querySelector('.gameOver').addEventListener('click', clickStart);
	
}


document.addEventListener('DOMContentLoaded', myLoadFunction);