import MovingDirection from "./MovingDirection.js";

export default class Enemy {
  constructor(x, y, tileX, tileY, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileX = tileX;
    this.tileY = tileY;
    this.velocity = velocity;
    this.tileMap = tileMap;

    //image
    this.enemyImage = new Image();
    this.enemyImage.src = "images/pilot.png";

    //movement
    //pick a random direction
    this.movingDirection = Math.floor(
      Math.random() * Object.keys(MovingDirection).length
    );

    this.directionTimerDefault = this.#random(10, 50);
  }

  draw(ctx) {
    ctx.drawImage(this.enemyImage, this.x, this.y, this.tileX, this.tileY);
  }

  //pick a value between min and max
  #random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
