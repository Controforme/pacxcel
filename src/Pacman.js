import MovingDirection from "./MovingDirection.js";

const buttonLeft = document.getElementById("pressLeft");

/*build Pacman*/
export default class Pacman {
  constructor(x, y, tileX, tileY, velocity, tileMap) {
    this.x = x; //position X
    this.y = y; //position Y
    this.tileX = tileX; //tile X size
    this.tileY = tileY; //tile Y size
    this.velocity = velocity; //velocity
    this.tileMap = tileMap; //map

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    document.addEventListener("keydown", this.#keydown);

    //image
    this.pacmanImage = new Image();
    this.pacmanImage.src = "images/cursor.svg";
  }

  //draw pacman
  draw(ctx) {
    this.#move();
    ctx.drawImage(this.pacmanImage, this.x, this.y, this.tileX, this.tileY);
  }

  //keyboard movements
  #keydown = (event) => {
    //up
    if (event.keyCode == 38 || event.keyCode == 87) {
      //arrow up or W
      if (this.currentMovingDirection == MovingDirection.down)
        this.currentMovingDirection = MovingDirection.up;
      this.requestedMovingDirection = MovingDirection.up;
    }
    //down
    if (event.keyCode == 40 || event.keyCode == 83) {
      //arrow down or S
      if (this.currentMovingDirection == MovingDirection.up)
        this.currentMovingDirection = MovingDirection.down;
      this.requestedMovingDirection = MovingDirection.down;
    }
    //left
    if (event.keyCode == 37 || event.keyCode == 65) {
      //arrow left or A
      if (this.currentMovingDirection == MovingDirection.right)
        this.currentMovingDirection = MovingDirection.left;
      this.requestedMovingDirection = MovingDirection.left;
    }
    //right
    if (event.keyCode == 39 || event.keyCode == 68) {
      //arrow right or D
      if (this.currentMovingDirection == MovingDirection.left)
        this.currentMovingDirection = MovingDirection.right;
      this.requestedMovingDirection = MovingDirection.right;
    }
  };

  #move() {
    //get the current direction
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileX) &&
        Number.isInteger(this.y / this.tileY)
      ) {
        //check collisions on walls
        if (
          !this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            this.requestedMovingDirection
          )
        )
          this.currentMovingDirection = this.requestedMovingDirection;
      }
    }

    //don't move if there's a wall
    if (
      this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.currentMovingDirection
      )
    ) {
      return;
    }
    //move pacman - 0,0 is top left
    switch (this.currentMovingDirection) {
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
