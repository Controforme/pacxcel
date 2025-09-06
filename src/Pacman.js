/*build Pacman*/
export default class Pacman {
  constructor(x, y, tileX, tileY, velocity, tileMap) {
    this.x = x; //position X
    this.y = y; //position Y
    this.tileX = tileX; //tile X size
    this.tileY = tileY; //tile Y size
    this.velocity = velocity; //velocity
    this.tileMap = tileMap; //map
    //image
    this.pacmanImage = new Image();
    this.pacmanImage.src = "images/cursor.png";
  }

  draw(ctx) {
    ctx.drawImage(this.pacmanImage, this.x, this.y, this.tileX, this.tileY);
  }
}
