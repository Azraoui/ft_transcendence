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
  
    public moveUp(): void {
        this.y = (this.y - this.movSpeed >= 0) ? this.y - this.movSpeed : 0;
    }
  
    public moveDown(canvasHeight: number): void {
        this.y = (this.y + this.movSpeed <= canvasHeight - this.height) ? this.y + this.movSpeed : canvasHeight - this.height;

    }

    public reset(x: number, y: number): void {
      this.x = this.x;
      this.y = this.y;
    }
  }
