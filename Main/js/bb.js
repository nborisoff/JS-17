// DEFINITIONS

var btn = document.querySelector('.btn');
var canvas = document.querySelector('canvas');
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;
var context = canvas.getContext('2d');
var currentFrame = 0;
var particles = [];
var storedParticles = [];
var particleCount = 2000;
var isUp;
var isLeft;
var isRight;
var isDown;
var isShift;
var lastDirection;
var visibleParticles = 0;

var car = new vehicle();

// LIFECYCLE

function update() {
	// update state
	currentFrame ++;

	// render
	render();
}

function render() {



	// ----------------
	// Clear the canvas
	// ----------------

	context.clearRect(0, 0, canvas.width, canvas.height);



	// ---------------
	// Render the ball
	// ---------------





	// ----------------
	// Ball manouvering
	// ----------------

	if(!isLeft && !isRight && car.velocity.x !== 0) {
		if(lastDirection === 'left') {
			car.velocity.add(car.decay);
		}

		if(lastDirection === 'right') {
			car.velocity.sub(car.decay);
		}
	}

	if(isRight) {
		if(car.velocity.x < 10) {
			car.velocity.add(car.acceleration);
			lastDirection = 'right';
		}
	}

	if(isLeft) {
		if(car.velocity.x > -10) {

			car.velocity.sub(car.acceleration);
			lastDirection = 'left';
		}
	}

	if(!isLeft && !isRight && car.velocity.x !== 0 || isLeft || isRight) {
		// visibleParticles++;

		storedParticles[0].position.x = car.position.x;
		particles.push(storedParticles[0]);
		storedParticles.splice(0, 1);

		storedParticles[0].position.x = car.position.x;
		particles.push(storedParticles[0]);
		storedParticles.splice(0, 1);

		storedParticles[0].position.x = car.position.x;
		particles.push(storedParticles[0]);
		storedParticles.splice(0, 1);
	}

	// ---------------------
	// Display the particles
	// ---------------------


	for (var i = 0; i < particles.length; i++) {
		particles[i].reset();
		particles[i].scale();
		particles[i].bounds();
		particles[i].render();

		// particles[i].position.sub(particles[i].velocity);

		if(lastDirection === 'right') {
			particles[i].position.add(particles[i].velocity);
		}

		if(lastDirection === 'left') {
			particles[i].position.sub(particles[i].velocity);
		}

		// // console.log(lastDirection);

		if(particles[i].complete) {
			particles[i].complete = false;
			storedParticles.push(particles[i]);
			particles.splice(i, 1);
      i--;
		}
	}

	// ---------------
	// Draw the ground
	// ---------------

	context.beginPath();
	context.fillStyle = '#108d89';
	context.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);

	context.save();
	context.translate(car.position.x, car.position.y - 39);
	context.rotate(car.velocity.x / 20);

	context.beginPath();
	context.fillStyle = '#072d2d';
	context.arc(0, car.radius * -0.9, 26, 0, Math.PI, true);
	context.fill();

	context.beginPath();
	context.fillStyle = '#072d2d';
	context.moveTo(-26, car.radius * -0.92);
	context.lineTo(0, 0);
	context.lineTo(26, car.radius * -0.92);
	context.closePath();
	context.fill();

	context.beginPath();
	context.fillStyle = '#072d2d';
	context.fillRect(-10, car.radius * -0.9 - 23, 1, -20);

	context.beginPath();
	context.fillStyle = '#072d2d';
	context.fillRect(-5, car.radius * -0.9 - 23, 1, -10);

	context.restore();

	car.render();
	car.bounds();
	car.position.add(car.velocity);

	requestAnimationFrame(update);
}



// --------------
// Particle Class
// --------------

function dustParticle() {
	this.radius = 0;
	this.position = new vec2(car.position.x, car.position.y);
	this.velocity = new vec2(Math.floor(Math.random() * (4 - 1)) + 1, 0);
	this.growing = true;
	this.complete = false;

	this.render = function(car) {
		context.beginPath();
		context.fillStyle = '#147372';
		context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
		context.fill();
	}

	this.bounds = function() {
		if(this.radius > 16) {
			this.growing = false;
		}
	}

	this.reset = function() {
		if(this.radius <= 1 && this.growing === false) {
			this.complete = true;

			this.position.x = car.position.x;
			this.position.y = car.position.y;
			this.growing = true;
		}
	}

	this.scale = function() {
		if(this.growing) {
			this.radius += (Math.random() * 4);
		} else {
			this.radius -= (Math.random() * 0.75);
		}
	}
}



// ----------------------
// Populate the particles
// ----------------------

for (var i = 0; i < particleCount; i++) {
	storedParticles.push(new dustParticle());
}



// -------
// Vehicle
// -------

function vehicle() {
	this.radius = 36;
	this.position = new vec2(canvas.width/2, canvas.height/2);
	this.velocity = new vec2(0, 0);
	this.acceleration = new vec2(1.5, 0);
	this.decay = new vec2(0.25, 0);

	this.render = function() {
		context.beginPath();
		context.fillStyle = '#072d2d';
		context.arc(this.position.x, this.position.y - this.radius, this.radius, 0, Math.PI*2, false);
		context.fill();
	}

	this.bounds = function() {
		if(this.position.x > canvas.width + this.radius) {
			this.position.x = 0 - this.radius;
		}

		if(this.position.x < 0 - this.radius) {
			this.position.x = canvas.width + this.radius;
		}
	}
}



requestAnimationFrame(update);



// ---------------
// Event Listeners
// ---------------

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

function onKeyDown(evt) {
	var key = evt.keyCode;
	switch (key) {
		case 38:
			isUp = true;
			break;
		case 37:
			isLeft = true;
			break;
		case 40:
			isDown = true;
			break;
		case 39:
			isRight = true;
			break;
		case 16:
			isShift = true;
			break;
	}
}

function onKeyUp(evt) {
	var key = evt.keyCode;
	switch (key) {
		case 38:
			isUp = false;
			break;
		case 37:
			isLeft = false;
			break;
		case 40:
			isDown = false;
			break;
		case 39:
			isRight = false;
			break;
		case 16:
			isShift = false;
			break;
	}
}

window.addEventListener('resize', function() {
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;

	car.position.x = canvas.width/2;
	car.position.y = canvas.height/2;

	storedParticles = [];
	for (var i = 0; i < particleCount; i++) {
		storedParticles.push(new dustParticle());
	}
});

function vec2(x = 0, y = 0) {

	this.x = x;
	this.y = y;

	this.add = function(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}

	this.sub = function(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	this.mult = function(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}

	this.mag = function() {
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}

	this.norm = function() {
		var m = this.mag();
		this.x /= m;
		this.y /= m;
		return this;
	}

	this.rotate = function(a) {
		var sina = Math.sin(a);
		var cosa = Math.cos(a);
		var rx = this.x * cosa - this.y * sina;
		var ry = this.x * sina + this.y * cosa;
		this.x = rx;
		this.y = ry;
		return this;
	}

	this.copy = function() {
		return new vec2(this.x, this.y);
	}

	this.render = function(context, ox = 0, oy = 0, color = "#FF330088", minLen = 42) {

		if (this.mag() < 0.001) return;

		context.save();

		var cp = this.copy();
		if (cp.mag() < minLen) {
			cp.norm();
			cp.mult(minLen);
		}
		context.fillStyle = "";
		context.lineWidth = 2;
		context.strokeStyle = color;
		context.lineCap = "square";
		context.beginPath();
		context.moveTo(ox, oy);
		context.lineTo(ox + cp.x, oy + cp.y);
		// arrow
		var r = 16;
		var a = Math.atan2(cp.y, cp.x) - Math.PI;
		var da = 30 * (Math.PI/180);
		var p1x = ox + cp.x + Math.cos(a-da)*r;
		var p1y = oy + cp.y + Math.sin(a-da)*r;
		var p2x = ox + cp.x + Math.cos(a+da)*r;
		var p2y = oy + cp.y + Math.sin(a+da)*r;
		context.moveTo(ox + cp.x, oy + cp.y);
		context.lineTo(p1x, p1y);
		context.moveTo(ox + cp.x, oy + cp.y);
		context.lineTo(p2x, p2y);
		context.stroke();

		context.restore();

	}

}