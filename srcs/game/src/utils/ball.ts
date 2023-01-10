import { Paddle } from "./paddle";

export class Ball {
    public x : number;
    public y : number;
    public radius : number;
    public speed : number;
    public movement_angle : number;
    public color : string;
    public directionX : number;
    public directionY : number;
    
    constructor (x: number, y: number, radius: number, color: string) 
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 5;
        this.directionX = 1;
        this.directionY = 1;
        this.color = color;
        this.movement_angle = Math.PI/4;
    }
    // Checking ball collision with paddles
    public collision(paddle: Paddle) : boolean{
        return (this.x >= paddle.x - (this.radius - 1) && this.x <= paddle.x + (paddle.width - 1) + (this.radius - 1)
        &&  this.y >= paddle.y - (this.radius - 1) && this.y <= paddle.y + (paddle.height - 1) + (this.radius - 1))
      }
    // Updating ball coordinates according to its actual position
    public update (canvasWidth: number, canvasHeight: number, leftPaddle: Paddle, rightPaddle: Paddle) : void
    {
        // If ball touches up or down surface
        if (this.y >= canvasHeight - this.radius || this.y <= this.radius - 1)
            this.directionY *= -1;
        // If ball touchs one of the paddles
        let paddle = (this.x < canvasWidth/2) ? leftPaddle : rightPaddle;
        if (this.collision(paddle))
        {
            // Updating the angle according to where the ball hits the paddle
            this.movement_angle = Math.abs(((this.y - (paddle.y + paddle.height/2))/(paddle.y + paddle.height/2))*(Math.PI/4));
            // Updating directions
            this.directionX *= -1;
            this.directionY = (this.y <= paddle.y + paddle.height/2) ? -1 : 1;
            // Increasing speed
            this.speed += 0.1;
        }
        // Updating ball coordinates
        this.x += Math.cos(this.movement_angle) * this.speed * this.directionX;
        this.y += Math.sin(this.movement_angle) * this.speed * this.directionY;
    }
    // Reseting ball
    public resetBall (x: number, y: number): void 
    {
        this.speed = 5;
        this.x = x;
        this.y = y;
    }
}