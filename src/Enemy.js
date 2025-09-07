import MovingDirection from "./MovingDirection.js";

//variables for enemy difficulties (lower=harder, higher=easier)
const minTimer = 3;
const maxTimer = 10;

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

    //pick a random direction
    this.movingDirection = Math.floor(
      Math.random() * Object.keys(MovingDirection).length
    );
    //pick a random timer
    this.directionTimerDefault = this.#random(minTimer, maxTimer);
    this.directionTimer = this.directionTimerDefault;
  }

  draw(ctx) {
    this.#move();
    this.#changeDirection();
    ctx.drawImage(this.enemyImage, this.x, this.y, this.tileX, this.tileY);
  }

  //pick a value between min and max
  #random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //random direction changes
  #changeDirection() {
    this.directionTimer--;
    let newMoveDirection = null;
    //reset the timer if it goes to 0
    if (this.directionTimer == 0) {
      this.directionTimer = this.directionTimerDefault;
      newMoveDirection = Math.floor(
        Math.random() * Object.keys(MovingDirection).length
      );
    }

    //check if the enemy is stuck in a wall
    if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
      if (
        Number.isInteger(this.x / this.tileX) &&
        Number.isInteger(this.y / this.tileY)
      ) {
        //check for collisions
        if (
          !this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            newMoveDirection
          )
        ) {
          this.movingDirection = newMoveDirection;
        }
      }
    }
  }

  //movement
  #move() {
    //check for collisions
    if (
      !this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection
      )
    ) {
      switch (this.movingDirection) {
        case MovingDirection.up:
          this.y -= this.velocity;
          break;
        case MovingDirection.down:
          this.y += this.velocity;
          break;
        case MovingDirection.left:
          this.x -= this.velocity;
          break;
        case MovingDirection.right:
          this.x += this.velocity;
          break;
      }
    }
  }
}
