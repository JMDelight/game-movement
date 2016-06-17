// -- Helps with animation -- //
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60)
  };

// -- Initialize Global Variables -- //
var canvas = document.createElement('canvas');
var width = 1200;
var height = 1200;
var playerSpeed = 4;

canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

// -- Initialize an empty array
var monsters = [];
var time = 0;
var player = new Sprite(100, 100, 20, "blue");
var monster1 = new Sprite(300, 300, 20);
var monster2 = new Sprite(500, 200, 30, "orange");
var monster3 = new Sprite(700, 600, 20);
var monster4 = new Sprite(500, 500, 30, "pink");
var monster5 = new Sprite(400, 800, 20);
var monster6 = new Sprite(800, 200, 30, "purple");
monsters.push(monster1, monster2, monster3, monster4, monster5, monster6);

// -- place each function in here that runs on each animation step -- //
var step = function() {
  update();
  draw();
  animate(step);
  time ++;
  if (time % 30 === 0) {
    for (i = 0; i < monsters.length; i++) {
      monsters[i].monsterMove();
    };
    // -- Spawn new monsters at set intervals -- //
  } else if (time % 400 === 0) {
    var newMonster = new Sprite(600, 600, 35, "brown");
    monsters.push(newMonster);
  }
};

// -- place update functions in here -- //
// -- Updates are used to incrementally adjust an objects position and possibly other things.  Called every frame through the step function -- //
var update = function() {
  player.update();
  for (i = 0; i < monsters.length; i++) {
    monsters[i].update();
  };
};

// -- place items that need to be drawn in here. static lines, text, images and objects -- //
var draw = function() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  context.strokeStyle = "#fff";
  context.strokeRect(width/2, 0, 1, height);
  player.draw();
  for (i = 0; i < monsters.length; i++) {
    monsters[i].draw();
  };
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

// -- draws the sprite on the canvas -- //
Sprite.prototype.draw = function () {
  context.beginPath();
  context.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, false);
  context.fillStyle = this.ballColor;
  context.fill();
};

// -- Updates the sprites position -- //
Sprite.prototype.update = function() {
  this.xPos += this.xVel;
  this.yPos += this.yVel;
  if (this.yPos + this.radius >= height) {
      this.yVel *= -1;
    } else if (this.yPos - this.radius<= 0) {
      this.yVel *= -1;
    }
  if (this.xPos + this.radius >= width) {
      this.xVel *= -1;
    } else if (this.xPos - this.radius<= 0) {
      this.xVel *= -1;
    }
};

// -- First prototype for monster movement -- //
Sprite.prototype.monsterMove = function() {
  var randomNumber = Math.floor(Math.random() * 10);
  if (randomNumber ===  0) {
    this.xVel = 2;
    this.yVel = 0;
  } else if (randomNumber === 1) {
    this.xVel = -2;
    this.yVel = 0;
  } else if (randomNumber === 2) {
    this.xVel = 0;
    this.yVel = 2;
  } else if (randomNumber === 3) {
    this.xVel = 0;
    this.yVel = -2;
  } else if (randomNumber === 4) {
    this.xVel = 0;
    this.yVel = 0;
  } else {
    console.log(randomNumber)
  }
};


// -- Creates the canvas element on page load and starts animating the canvas -- //
window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

window.addEventListener("keydown", function(event) {
// -- Event listener for up and down key. -- //
  if (event.keyCode === 38) {
    player.yVel = -playerSpeed;
  } else if (event.keyCode === 40) {
    player.yVel = playerSpeed;
  }
  if (event.keyCode === 37) {
    // -- Event listener for left and rigth key. -- //
    player.xVel = -playerSpeed;
  } else if (event.keyCode === 39) {
    player.xVel = playerSpeed;
  }
  console.log(event.keyCode);
  console.log("time = " + time);
});
// -- keyup press is designed to stop movement if the key for the direction you are moving is released. We can adjust that behavior towards whatever we want. -- //
window.addEventListener("keyup", function (event) {
  if (event.keyCode === 39 && player.xVel === playerSpeed) {
    player.xVel = 0;
  } else if (event.keyCode === 37 && player.xVel === -playerSpeed) {
    player.xVel = 0;
  }
  if (event.keyCode === 38 && player.yVel === -playerSpeed) {
    player.yVel = 0;
  } else if (event.keyCode === 40 && player.yVel === playerSpeed) {
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
