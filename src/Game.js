/*import*/
import TileMap from "./TileMap.js";

/*variables*/
const canvas = document.getElementById("gameCanvas"); //select the html canvas
const ctx = canvas.getContext("2d"); //two dimensional rendering context
const glInterval = 1000 / 75; //interval between consecutive gameLoop redraws

var tileX = 48; //width of a single tile
var tileY = 16; //height of a single tile
const columnsNumber = 13; //number of columns set in TileMap array
var velocity = 2; //pacman velocity

/*colors*/
var lightGrey = "rgb(210, 210, 210)";
var grey = "rgb(175, 175, 175)";
var lightGreen = "rgba(170, 224, 194, 1)";
var green = "rgb(16, 124, 65)";

/*responsive resize*/
var maxWidth = window.innerWidth - 40;
var referenceCanvas = tileX * columnsNumber;
/*resize and reduce velocity on small screens*/
if (referenceCanvas > maxWidth) {
  tileX = parseInt((tileX * maxWidth) / referenceCanvas);
  tileY = parseInt((tileY * maxWidth) / referenceCanvas);
  velocity = 1;
}

//create the tile map
const tileMap = new TileMap(tileX, tileY);
//create pacman
const pacman = tileMap.getPacman(velocity);
//create enemies
const enemies = tileMap.getEnemies(velocity);

//game over variables
let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio("sounds/error.mp3");
const gameWinSound = new Audio("sounds/ding.mp3");

/*game loop - redraws the screen*/
function gameLoop() {
  tileMap.draw(ctx);
  pacman.draw(ctx, pause());
  enemies.forEach((enemy) => enemy.draw(ctx, pause()));
  checkGameOver();
  checkGameWin();
  drawGameEnd();
}

/*game win*/
function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin();
    if (gameWin) {
      gameWinSound.play();
    }
  }
}

/*game over*/
function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      gameOverSound.play();
    }
  }
}
function isGameOver() {
  return enemies.some((enemy) => enemy.collideWith(pacman));
}

/*game pause*/
function pause() {
  return !pacman.madeFirstMove || gameOver || gameWin;
}

/*game end screens*/
function drawGameEnd() {
  if (gameOver || gameWin) {
    let topText = "You Win!";
    let bottomText = [
      "You have defeated our AI!",
      "However you're still being fired,",
      "we need to free up resources to scale up",
      'computational power and "obtain" more training data.',
    ];
    if (gameOver) {
      topText = "Game Over";
      bottomText = [
        "You're fired!",
        "You've been successfully replaced by generative AI.",
        "But don't worry! You can use a chatbot to help reduce",
        "the emotional and cognitive load that comes with job loss.",
      ];
    }
    //top message shadow
    ctx.save();
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    //top message background
    ctx.fillStyle = lightGreen;
    ctx.fillRect(tileX, 5 * tileY, canvas.width - 2 * tileX, tileY);
    ctx.restore();
    //top text
    ctx.font = "bold 12px Verdana";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(topText, canvas.width / 2, 6 * tileY - 2);
    //bottom message shadow
    ctx.save();
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    //bottom message background
    ctx.fillStyle = lightGrey;
    ctx.fillRect(tileX, 6 * tileY, canvas.width - 2 * tileX, 4 * tileY + 10);
    ctx.restore();
    //bottom text
    ctx.font = "10px Verdana";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(
      bottomText[0],
      canvas.width / 2,
      7 * tileY - 2,
      canvas.width - 4 * tileX
    );
    ctx.fillText(
      bottomText[1],
      canvas.width / 2,
      8 * tileY - 2,
      canvas.width - 4 * tileX
    );
    ctx.fillText(
      bottomText[2],
      canvas.width / 2,
      9 * tileY - 2,
      canvas.width - 4 * tileX
    );
    ctx.fillText(
      bottomText[3],
      canvas.width / 2,
      10 * tileY - 2,
      canvas.width - 4 * tileX
    );
  }
}

/*set canvas size*/
tileMap.setCanvasSize(canvas);

/*call game loop every x milliseconds set in glInterval*/
setInterval(gameLoop, glInterval);

/*on display control*/
//up
document.getElementById("pressUp").addEventListener("click", function () {
  // Create a new keyboard event
  var event = new KeyboardEvent("keydown", {
    keyCode: 87, // Key code for 'W'
  });
  // Dispatch the event to the document
  document.dispatchEvent(event);
});
//down
document.getElementById("pressDown").addEventListener("click", function () {
  // Create a new keyboard event
  var event = new KeyboardEvent("keydown", {
    keyCode: 83, // Key code for 'S'
  });
  // Dispatch the event to the document
  document.dispatchEvent(event);
});
//left
document.getElementById("pressLeft").addEventListener("click", function () {
  // Create a new keyboard event
  var event = new KeyboardEvent("keydown", {
    keyCode: 65, // Key code for 'A'
  });
  // Dispatch the event to the document
  document.dispatchEvent(event);
});
//right
document.getElementById("pressRight").addEventListener("click", function () {
  // Create a new keyboard event
  var event = new KeyboardEvent("keydown", {
    keyCode: 68, // Key code for 'D'
  });
  // Dispatch the event to the document
  document.dispatchEvent(event);
});
