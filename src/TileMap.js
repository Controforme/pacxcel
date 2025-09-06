/*imports*/
import Pacman from "./Pacman.js";

/*methods to build the tile map*/
export default class TileMap {
  constructor(tileX, tileY) {
    this.tileX = tileX;
    this.tileY = tileY;

    this.emptyCell = new Image();
    this.emptyCell.src = "../images/emptyCell.png";

    this.wall = new Image();
    this.wall.src = "../images/wall.png";
  }

  // array that represents the map
  // 1 - wall
  // 0 - emptyCell
  // 4 - pacman/cursor
  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  draw(ctx) {
    //draw the map based on the map array
    for (let row = 0; row < this.map.length; row++) {
      //let is a variable that has block scope
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 1) {
          this.#drawWall(ctx, column, row, this.tileX, this.tileY);
        } else if (tile === 0) {
          this.#drawEmpty(ctx, column, row, this.tileX, this.tileY);
        }
      }
    }
  }

  //draw the empty cells
  //methods that start with # are private, can't be called outside this file
  #drawEmpty(ctx, column, row, sizeX, sizeY) {
    ctx.drawImage(
      this.emptyCell,
      column * this.tileX,
      row * this.tileY,
      sizeX,
      sizeY
    );
  }

  //draw the walls
  //methods that start with # are private, can't be called outside this file
  #drawWall(ctx, column, row, sizeX, sizeY) {
    ctx.drawImage(
      this.wall,
      column * this.tileX,
      row * this.tileY,
      sizeX,
      sizeY
    );
  }

  //pacman
  getPacman(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 4) {
          this.map[row][column] = 0;
          return new Pacman(
            column * this.tileX,
            row * this.tileY,
            this.tileX,
            this.tileY,
            velocity,
            this
          );
        }
      }
    }
  }

  //sets width and height of the canvas based on the map array and the tile size
  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileX;
    canvas.height = this.map.length * this.tileY;
  }
}
