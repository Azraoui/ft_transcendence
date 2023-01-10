import { Paddle } from "./paddle";
import { Ball } from "./ball";

class gameCoordinates
{
    public ballX : number;
    public ballY : number;
    public rightPaddleY : number;
    public leftPaddleY : number;
    public rightPaddleScore : number;
    public leftPaddleScore : number;
};

export class GameInfo
{
    public leftPaddle : Paddle;
    public rightPaddle : Paddle;
    public ball : Ball;
    public canvasHeight : number = 400;
    public canvasWidth : number = 600;
    public winScore : number  = 5;

    constructor()
    {
        this.ball = new Ball(this.canvasWidth/2, this.canvasHeight/2, this.canvasHeight/50, "YELLOW");
        this.leftPaddle = new Paddle(this.canvasHeight/24/4, this.canvasHeight/2 - this.canvasHeight/4, this.canvasHeight/24, this.canvasHeight/4, "WHITE", this.canvasHeight/4 * .2);
        this.rightPaddle = new  Paddle(this.canvasWidth - 5*(this.canvasHeight/24/4), this.canvasHeight/2 - this.canvasHeight/4, this.canvasHeight/24, this.canvasHeight/4, "WHITE", this.canvasHeight/4 * .2);

        // console.log(this.ball);
    }
    // Updating ball, score
    update() : boolean
    {
        if (this.ball.x <= this.ball.radius - 1)
        {
            this.rightPaddle.score++;
            this.ball.directionX *= -1;
            this.ball.resetBall(this.canvasWidth/2, this.canvasHeight/2);
        }
        else if (this.ball.x >= this.canvasWidth - this.ball.radius)
        {
            this.leftPaddle.score++;
            this.ball.directionX *= -1;
            this.ball.resetBall(this.canvasWidth/2, this.canvasHeight/2);
        }
        if (this.leftPaddle.score == this.winScore || this.rightPaddle.score == this.winScore)
            return true;
        this.ball.update(this.canvasWidth, this.canvasHeight, this.leftPaddle, this.rightPaddle);
        return false;
    }
    winner() : string
    {
        return (this.leftPaddle.score == this.winScore)? "left" : "right";
    }
    coordinates() : any
    {
        return {
            ballX : this.ball.x,
            ballY : this.ball.y,
            rightPaddleY : this.rightPaddle.y,
            leftPaddleY : this.leftPaddle.y,
            rightPaddleScore : this.rightPaddle.score,
            leftPaddleScore : this.leftPaddle.score,
        };
    }
    updatePaddles(which:string, dir: string)
    {
        if (which == "left")
        {
            if (dir == "up")
                this.leftPaddle.moveUp();
            else
                this.leftPaddle.moveDown(this.canvasHeight);
        }
        else
        {
            if (dir == "up")
                this.rightPaddle.moveUp();
            else
                this.rightPaddle.moveDown(this.canvasHeight);
        }
    }
}