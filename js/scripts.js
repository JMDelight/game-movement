// -- Helps with animation -- //
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60)
  };
// -- Initialize Global Variables -- //
var canvas = document.createElement('canvas');
var width = 900;
var height = 500;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var player = new Sprite(100, 100, 20, "blue");
var monster = new Sprite(300, 300, 20);
// -- place each function in here that runs on each animation step -- //
var step = function() {
  update();
  draw();
  animate(step);
};

// -- place update functions in here -- //
// -- Updates are used to incrementally adjust an objects position and possibly other things.  Called every frame through the step function -- //
var update = function() {
  player.update();
};

// -- place items that need to be drawn in here. static lines, text, images and objects -- //
var draw = function() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  context.strokeStyle = "#fff";
  context.strokeRect(width/2, 0, 1, height);
  player.draw();
};

// -- Creates a sprite object, the last three parameters are optional -- //
function Sprite(xPos, yPos, radius, color = "red", xVel = 0, yVel = 0) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.radius = radius;
  this.ballColor = color;
  this.xVel = xVel;
  this.yVel = yVel;
}

//-- draws the sprite on the canvas -- //
Sprite.prototype.draw = function () {
  context.beginPath();
  context.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, false);
  context.fillStyle = this.ballColor;
  context.fill();
};

//-- Updates the sprites position -- //
Sprite.prototype.update =function() {
  this.xPos += this.xVel;
  this.yPos += this.yVel;
};


// -- Creates the canvas element on page load and starts animating the canvas -- //
window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

// -- Listens for keypresses -- //
window.addEventListener("keydown", function(event) {
// -- Event listener for up and down key. -- //
  if (event.keyCode === 38) {
    player.yVel = -6;
  } else if (event.keyCode === 40) {
    player.yVel = 6;
    console.log(event.keyCode);
  }
  if (event.keyCode === 37) {
    // -- Event listener for left and rigth key. -- //
    player.xVel = -6;
  } else if (event.keyCode === 39) {
    player.xVel = 6;
    console.log(event.keyCode);
  }
});

window.addEventListener("keyup", function (event) {
  if (event.keyCode === 37 || event.keyCode === 39) {
    player.xVel = 0;
  }
  if (event.keyCode === 38 || event.keyCode === 40) {
    player.yVel = 0;
  }
});


// -- this is an example of an object and prototypes that I used for pong. It is left in here as an example of how to construct a basic moving object that reflects off of objects. -- //

// function Ball(xPos, yPos) {
//   this.xPos = xPos;
//   this.yPos = yPos;
//   this.xVel = 3;
//   this.yVel = 6;
//   this.radius = ballRadius;
// };
//
//
// Ball.prototype.draw = function () {
//   context.beginPath();
//   context.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, false);
//   context.fillStyle = "#fff";
//   context.fill();
// };
//
// Ball.prototype.update =function() {
//   this.xPos += this.xVel;
//   this.yPos += this.yVel;
//   if (this.xPos + this.radius>= width - paddleWidth) {
//     if (this.yPos > paddleTwo.yPos && this.yPos < paddleTwo.yPos + paddleHeight) {
//       this.xVel *= -1;
//     } else {
//       ball.xPos = 250;
//       ball.yPos = 250;
//     }
//   } else if (this.xPos - this.radius<= paddleWidth) {
//       if (this.yPos > paddleOne.yPos && this.yPos < paddleOne.yPos + paddleHeight) {
//         this.xVel *= -1;
//       } else {
//         ball.xPos = 750;
//         ball.yPos = 250;
//       }
//     }
//   if (this.yPos + this.radius>= height) {
//     this.yVel *= -1;
//   } else if (this.yPos - this.radius<= 0) {
//     this.yVel *= -1;
//   }
// };
