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

    //sound when a new cell is selected
    this.wakaSound = new Audio("sounds/mouse-click.mp3");

    document.addEventListener("keydown", this.#keydown);

    //image
    this.pacmanImage = new Image();
    this.pacmanImage.src = "images/cursor.png";
  }

  //draw pacman
  draw(ctx) {
    this.#move();
    this.#eatDot();
    ctx.drawImage(this.pacmanImage, this.x, this.y, this.tileX, this.tileY);
  }

  //keyboard movements
  #keydown = (event) => {
    //up
    if (event.keyCode == 38 || event.keyCode == 87) {
      //arrow up or W
      if (this.currentMovingDirection == MovingDirection.down) {
        this.currentMovingDirection = MovingDirection.up;
        //play sound only when changing direction
        this.wakaSound.play();
      }
      this.requestedMovingDirection = MovingDirection.up;
    }
    //down
    if (event.keyCode == 40 || event.keyCode == 83) {
      //arrow down or S
      if (this.currentMovingDirection == MovingDirection.up) {
        this.currentMovingDirection = MovingDirection.down;
        //play sound only when changing direction
        this.wakaSound.play();
      }
      this.requestedMovingDirection = MovingDirection.down;
    }
    //left
    if (event.keyCode == 37 || event.keyCode == 65) {
      //arrow left or A
      if (this.currentMovingDirection == MovingDirection.right) {
        this.currentMovingDirection = MovingDirection.left;
        //play sound only when changing direction
        this.wakaSound.play();
      }
      this.requestedMovingDirection = MovingDirection.left;
    }
    //right
    if (event.keyCode == 39 || event.keyCode == 68) {
      //arrow right or D
      if (this.currentMovingDirection == MovingDirection.left) {
        this.currentMovingDirection = MovingDirection.right;
        //play sound only when changing direction
        this.wakaSound.play();
      }
      this.requestedMovingDirection = MovingDirection.right;
    }
  };

  //pacman movement
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
        ) {
          this.currentMovingDirection = this.requestedMovingDirection;
          //play sound only when changing direction
          this.wakaSound.play();
        }
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

  //when pacman goes over a cell without being caught
  #eatDot() {
    //check tilemap on pacman position
    if (this.tileMap.eatDot(this.x, this.y)) {
      //play sound
      //this.wakaSound.play();
    }
  }
}
