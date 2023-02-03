import { Ball } from "./ball";

export class Paddle {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string;
    public movSpeed: number;
    public score: number;
  
    constructor(x: number, y: number, width: number, height: number, color: string, movSpeed: number) 
    {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.movSpeed = movSpeed;
      this.score = 0;
    }
  
    public moveUp(ball:Ball): void {
      this.y = (this.y - this.movSpeed >= 0) ? this.y - this.movSpeed : 0;
      if (ball.collision(this) && ball.x >= this.x && this.x <= this.x + this.width - 1)
      {
        if (ball.y < this.y + this.height/2)
            ball.y = this.y - (ball.radius - 1);
        else
            ball.y = this.y + (this.height - 1) + (ball.radius - 1);

      }
  }

  public moveDown(canvasHeight: number, ball:Ball): void {
      this.y = (this.y + this.movSpeed <= canvasHeight - this.height) ? this.y + this.movSpeed : canvasHeight - this.height;
      if (ball.collision(this) && ball.x >= this.x && this.x <= this.x + this.width - 1)
      {
          ball.movement_angle = Math.PI/3;
        if (ball.y < this.y + this.height/2)
            ball.y = this.y - (ball.radius - 1);

        else
            ball.y = this.y + (this.height - 1) + (ball.radius - 1);

      }
  }

    public reset(x: number, y: number): void {
      this.x = this.x;
      this.y = this.y;
    }
  }
