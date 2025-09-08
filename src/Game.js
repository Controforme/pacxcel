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
  return !pacman.madeFirstMove || gameOver;
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
