/*import*/
import TileMap from "./TileMap.js";

/*variables*/
const canvas = document.getElementById("gameCanvas"); //select the html canvas
const ctx = canvas.getContext("2d"); //two dimensional rendering context
const glInterval = 1000 / 75; //interval between consecutive gameLoop redraws

const tileX = 48; //width of a single tile
const tileY = 16; //height of a single tile
const velocity = 1; //pacman velocity

const tileMap = new TileMap(tileX, tileY); //build a tile map
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
