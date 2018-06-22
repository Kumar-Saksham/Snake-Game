var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

// console.log(canvas);
canvas.width = 1200;
canvas.height = 600;
var scl = 40;
var no_of_rows = canvas.height/scl;
var no_of_cols = canvas.width/scl;

function load(){
	document.getElementById('blur').style.display = 'block';
	document.getElementById('darken').style.display = 'block';
	document.getElementById('banner').style.display = 'block';
}

function start(){
	document.getElementById('blur').style.filter = 'blur(0px)';
	document.getElementById('darken').style.display = 'none';
	document.getElementById('banner').style.display = 'none';
	document.getElementById('start').style.display = 'none';
	animate();

}

function retry(){
	snake = new Snake();
	flag = 0;
	document.getElementById('finish').style.display = 'none';
	document.getElementById('blur').style.filter = 'blur(0px)';
	document.getElementById('darken').style.display = 'none';
	animate();


}

function getRandomInt(min, max){
	return Math.floor((Math.random() * (max - min + 1)) + min);

}

function distance(x1, x2, y1, y2){
	return Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2));
}

addEventListener('keypress', function(event){
	// console.log(snake.dx, snake.dy);
	var key = event.key;

	if(key == 'w'){
		if(snake.dy != scl){
		snake.dir(0,-1);
	}
	}
	else if(key == 's'){
		if(snake.dy != -scl)
		snake.dir(0,1);
	}
	else if(key == 'a'){
		if(snake.dx != scl)
		snake.dir(-1,0);
	}
	else if(key == 'd'){
		if(snake.dx != -scl)
		snake.dir(1,0);
	} 

});

function Food(){

	this.x = scl*getRandomInt(0, no_of_cols-1);
	this.y = scl*getRandomInt(0, no_of_rows-1);

	this.draw = function(){
		c.beginPath();
		c.rect(this.x, this.y, scl, scl);
		c.fillStyle = '#dc0054';
		c.fill();
		c.closePath();
	}
} 

function Snake(){

	this.x  = -scl;
	this.y = 0;
	this.dx = scl;
	this.dy = 0;
	this.tail = [];
	this.length = 0;

	this.dir = function(x, y){
		this.dx = x*scl;
		this.dy = y*scl;
	}

	this.crash = function(){
		if(this.length > 2){
			for(var i = 3; i < this.length; i++){
				var touch_dist = distance(this.x,this.tail[i][0], this.y, this.tail[i][1]);
				if(touch_dist == 0){
					return 1;
				}
			}
		}
		return 0;
	}

	this.eat = function(){
		if(this.x == food.x && this.y == food.y){
			this.length++;
			// this.tail.push([this.x, this.y]);
			return 1;
		}
		else return 0;
	}

	this.update = function(){
		if(this.x + scl == canvas.width && this.dx > 0){
			this.x = -scl;
		}
		if(this.x == 0 && this.dx < 0){
			this.x = canvas.width;
		}
		if(this.y + scl == canvas.height && this.dy > 0){
			this.y = -scl;
		}
		if(this.y == 0 && this.dy < 0){
			this.y = canvas.height;
		}
		if(this.length >= 1){
			this.tail[0] = [this.x, this.y];
		}
		for(var i = this.length; i >= 1; i--){
				this.tail[i] = this.tail[i-1];
		}
		this.x += this.dx;
		this.y += this.dy;


		this.draw();
	}

	this.draw = function(){
		
		c.beginPath();
		c.rect(this.x, this.y, scl, scl);
		// console.log(this.tail);
		for(var i = 0; i < this.tail.length; i++){
			c.rect(this.tail[i][0], this.tail[i][1], scl, scl);	
		}
		c.fillStyle = 'rgba(100,100,100,0.8)';
		c.fill();
		c.closePath();
		

		
	}

}
var timer
var snake = new Snake();
var food = new Food();
var flag = 0;
function animate(){
	c.clearRect(0,0, canvas.width, canvas.height);
	// requestAnimationFrame(animate);
	snake.update();
	if(snake.eat()){
		food = new Food();
	}
	food.draw();
	if(snake.crash()){
		flag = 1;
		document.getElementById('finish').style.display = 'block';
		document.getElementById('blur').style.display = 'block';
		document.getElementById('darken').style.display = 'block';
	}
	if(flag == 0)
	{timer = setTimeout(animate, 70);}
}



