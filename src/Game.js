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
var maxWidth = window.innerWidth - 100;
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

/*game loop - redraws the screen*/
function gameLoop() {
  tileMap.draw(ctx);
  pacman.draw(ctx);
}

/*set canvas size*/
tileMap.setCanvasSize(canvas);

/*call game loop every x milliseconds set in glInterval*/
setInterval(gameLoop, glInterval);
