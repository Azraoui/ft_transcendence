import {Socket} from "socket.io-client"
import Avatar from "../../../assets/avatar_none.jpeg";

interface Paddle {
    height: number;
    width: number;
    x: number;
    y: number;
    color: string;
    score: number;
}

interface Ball {
    x: number;
    y: number;
    radius: number;
    color: string;
}

interface Net {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}

interface BcInfo {
    bcWidth: number;
    bcHeight: number;
}

interface Coordinates{
    ballX : number;
    ballY : number;
    rightPaddleY : number;
    leftPaddleY : number;
    rightPaddleScore : number;
    leftPaddleScore : number;
}

interface User {
    height: number;
    width: number;
    x: number;
    y: number;
    color: string;
    score: number;
}
class Game
{
    context:any;
    socket:Socket;
    ball:Ball = {
        x: 0,
        y: 0,
        radius: 0,
        color: ""
    };
    net:Net = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        color: ""
    };
    user: User = {
            height: 0,
            width: 0,
            x: 0,
            y: 0,
            color: "",
            score: 0
    };
    user2: User = {
            height: 0,
            width: 0,
            x: 0,
            y: 0,
            color: "",
            score: 0
    };
    bcInfo:BcInfo;
    queueIntervalId:any = -1;
    conIntervalId:any = -1;
    noGameInterval:any = -1;
    invitationexpired:any = -1;
    seconds:number=0;
    minutes:number=0;
    queue:boolean=false;
    role:string;
    playersInfo:any;
    count:number = 0;
    ref:any;
    image:any;

    constructor(socket:Socket,ref:any, role:string, bcinfo:BcInfo, bcolor:string="WHITE", pcolor:string="WHITE", ncolor:string="WHITE", bg:any)
    {
        this.socket = socket;
        this.ref = ref;
        this.role = role;
        this.bcInfo = bcinfo;
        this.ball.color = bcolor;
        this.user.color = pcolor;
        this.user2.color = pcolor;
        this.net.color = ncolor;
        this.image = new Image();
        this.image.src = bg;
    }
//=========================starting===========================================
start()
{
    this.context = this.ref.canvasRef.current.getContext("2d");
    this.context.canvas.width = this.context.canvas.parentNode.offsetWidth * 0.9;
    this.context.canvas.height = this.context.canvas.parentNode.offsetWidth * 0.5;
    this.image.onload = ()=>  this.context.drawImage(this.image, 0 ,0, this.context.canvas.width, this.context.canvas.height);
    this.renderconnectionInterval();
    this.setGameEvents();
    this.setKeyboardEvents();
    this.makeItResponsive();
    this.socket.connect();
}
//=========================Events==============================================
    //Socket events
    setGameEvents()
    {
        this.socket.on("connect", () => {
            console.log("Connection to server established");
        });
        this.socket.on("disconnect", (reason) => {
                console.log("Disconnection from server");
                clearInterval(this.conIntervalId);
                this.count = 0;
                this.renderconnectionInterval();
                clearInterval(this.queueIntervalId);
                this.queueIntervalId = -1;
                this.queue = false;
                this.seconds = 0;
                this.minutes = 0;
                clearInterval(this.noGameInterval);
                this.noGameInterval = -1;
                clearTimeout(this.invitationexpired);
                this.invitationexpired = -1;
                this.ref.lImageRef.current.src = Avatar;
                this.ref.lnameRef.current.innerText = "";
                this.ref.rImageRef.current.src = Avatar;
                this.ref.rnameRef.current.innerText = "";
                this.ref.lscore.current.innerText = 0;
                this.ref.rscore.current.innerText = 0;
                if (this.role == "spectator")
                    this.ref.buttonRef.current.hidden = true;
        });
        if (this.role == "player" || this.role == "inviting" || this.role == "invited")
        {
            this.socket.on("queue", ()=>
            {
                clearInterval(this.conIntervalId);
                this.conIntervalId = -1;
                this.count = 4;
                this.queue = true;
                this.renderqueueInterval()});
            this.socket.on("uWon", (side) => {
                // this.ref.buttonRef.current.hidden = false;
                // this.ref.buttonRef.current.addEventListener('click', ()=>window.location.reload());
                if (side == "left")
                    this.ref.lscore.current.innerText = this.user.score+1;
                else
                    this.ref.rscore.current.innerText = this.user2.score+1;
                this.renderEnd("You Won");
            });
            this.socket.on("uLost", (side) => {
                // this.ref.buttonRef.current.hidden = false;
                // this.ref.buttonRef.current.addEventListener('click', ()=>window.location.reload());
                if (side == "left")
                    this.ref.rscore.current.innerText = this.user2.score+1;
                else
                    this.ref.lscore.current.innerText = this.user.score+1;
                this.renderEnd("You Lost");
            });
            this.socket.on("OpponentLeft", () => {
                // this.ref.buttonRef.current.hidden = false;
                // this.ref.buttonRef.current.addEventListener('click', ()=>window.location.reload());
                this.renderEnd("Opponent Left");
            });
            this.socket.on("expired", ()=> 
                {
                    clearInterval(this.noGameInterval);
                    this.renderEnd("Invitation Expired");
                    this.invitationexpired =  setTimeout(() => {
                        this.socket.disconnect();
                        window.location.href = window.location.origin + '/messages'
                    }, 1000);
                    });
            this.socket.on("declined", ()=>
            {
                clearInterval(this.noGameInterval);
                this.renderEnd("Invitation Declined");
                this.invitationexpired =  setTimeout(() => {
                    this.socket.disconnect();
                    window.location.href = window.location.origin + '/messages'
                }, 1000);
            });
        }
        if (this.role == "spectator")
        {
            this.ref.buttonRef.current.addEventListener('click', ()=>this.socket.emit("next"));
            this.socket.on("Winner", (winner)=>
            {
                if (winner == "left")
                {
                    this.ref.lscore.current.innerText = this.user.score+1;
                    this.renderEnd("Left Player Won");
                }
                else
                {
                    this.ref.rscore.current.innerText = this.user2.score+1;
                    this.renderEnd("Right Player Won");
                }
                })
                this.socket.on("noGames", ()=>
                {
                    // console.log(1);
                    clearInterval(this.noGameInterval);
                    clearInterval(this.conIntervalId);
                    this.conIntervalId = -1;
                    this.count = 4;
                    this.renderEnd("No Games At The Moment");
                    this.ref.buttonRef.current.hidden = true;
                    this.ref.lImageRef.current.src = Avatar;
                    this.ref.lnameRef.current.innerText = "";
                    this.ref.rImageRef.current.src = Avatar;
                    this.ref.rnameRef.current.innerText = "";
                    this.ref.lscore.current.innerText = 0;
                    this.ref.rscore.current.innerText = 0;
                });
            }
        this.socket.on("playerInfo", (info)=>
        {
            if (info.side == "left")
            {
                this.ref.lImageRef.current.src = info.piclink;
                this.ref.lnameRef.current.innerText = info.id;
            }
            else
            {
                this.ref.rImageRef.current.src = info.piclink;
                this.ref.rnameRef.current.innerText = info.id;
            }
            if (this.role == "inviting")
            {
                clearInterval(this.conIntervalId);
                this.conIntervalId = -1;
                this.count = 4;
                clearInterval(this.noGameInterval);
                this.renderEnd("Waiting for accept");
            }
        });

        this.socket.on("update", (cords:Coordinates) => {
        clearInterval(this.conIntervalId);
        this.conIntervalId = -1;
        clearInterval(this.queueIntervalId);
        this.queueIntervalId = -1;
        clearInterval(this.noGameInterval);
        this.noGameInterval = -1;
        this.queue = false;
        this.count = 4;
        this.updateObjects(cords, this.bcInfo.bcWidth, this.bcInfo.bcHeight);
        this.renderGame();
        if (this.role == "spectator")
            this.ref.buttonRef.current.hidden = false;
        });
    }
    //Keyboard events
    setKeyboardEvents(){    
    document.addEventListener('keydown', (event) =>{
        if (event.key == "ArrowUp" || event.key == "ArrowDown")
        {
            event.preventDefault();
            if (event.key == "ArrowUp")
                this.socket.emit("keyUp");
            else
                this.socket.emit("keyDown");
        }
    });}
    /*For responsivity*/
    makeItResponsive(){
    window.addEventListener("resize", (event) => {
        const tmpCanvas = document.createElement("canvas");
        const tempContext = tmpCanvas.getContext("2d");
        if (!tempContext) {
            return;
        }
        tempContext.canvas.width = this.context.canvas.width;
        tempContext.canvas.height = this.context.canvas.height;

        // Draw our canvas to temp canvas
        tempContext.drawImage(this.context.canvas, 0, 0);
        // Resize our canvas
        this.context.canvas.width = this.context.canvas.parentNode.offsetWidth * 0.9;
        this.context.canvas.height = this.context.canvas.parentNode.offsetWidth * 0.5;

        if (this.queue)
            this.renderqueue();
        else if (this.count != 4)
            this.renderconnection();
        else
        // Draw temp canvas to our canvas
            this.context.drawImage(tempContext.canvas, 0, 0);
        tmpCanvas.remove();
    });}
//=========================Ubdating game objects===============================
    updateObjects(cords:Coordinates, Width:number, Height:number)
    {
        this.ball.x = (this.context.canvas.width / Width) * cords.ballX;
        this.ball.y = (this.context.canvas.height / Height) * cords.ballY;
        this.ball.radius = this.context.canvas.height / 50;
        this.user.y = (this.context.canvas.height / Height) * cords.leftPaddleY;
        this.user2.y = (this.context.canvas.height / Height) * cords.rightPaddleY;
        this.user2.x = this.context.canvas.width - 5*(this.context.canvas.height/24/4);
        this.user.x = this.context.canvas.height/24/4;
        this.user.score = cords.leftPaddleScore;
        this.user2.score = cords.rightPaddleScore;
        this.user.height = this.context.canvas.height/6;
        this.user2.height = this.context.canvas.height/6;
        this.user.width = this.context.canvas.height/24;
        this.user2.width = this.context.canvas.height/24;
        this.net.width = this.context.canvas.width/24 * .1;
        this.net.x = this.context.canvas.width / 2 - (this.net.width/2);
        this.net.height = this.context.canvas.height/4 * .05;
    }
//=========================Drawing in Canvas====================================
    //Rendering queue
    renderqueue()
    {
        this.context.drawImage(this.image, 0 ,0, this.context.canvas.width, this.context.canvas.height);
        // this.rectangle(0, 0, this.context.canvas.width, this.context.canvas.height, "BLACK");
        this.text("Waiting for a player to join...", this.context.canvas.width * .2, this.context.canvas.height * .4, "WHITE", `${this.context.canvas.width / 24 }px system-ui`);
        this.text(`${this.minutes} : ${this.seconds}`, this.context.canvas.width * .4, this.context.canvas.height * .6, "WHITE", `${this.context.canvas.width / 24 * 1.5}px system-ui`);
    }
    renderqueueInterval(){
    this.queueIntervalId = setInterval(()=>
    {
        this.renderqueue();
        this.seconds++;
        if (this.seconds == 60)
        {
            this.seconds = 0;
            this.minutes++;
        }
    }, 1000);}
    //Rendering end of game
    renderEnd(result:string)
    {
        this.noGameInterval =  setInterval(()=>{
        this.context.drawImage(this.image, 0 ,0, this.context.canvas.width, this.context.canvas.height);
            // this.rectangle(0, 0, this.context.canvas.width, this.context.canvas.height, "BLACK");
        if (result == "Opponent Left")
        {
            this.text(result, this.context.canvas.width * .4, this.context.canvas.height* .7, "WHITE", `${this.context.canvas.width / 24}px system-ui`);
            this.text("YOU WON", this.context.canvas.width * .3, this.context.canvas.height* .5, "WHITE", `${this.context.canvas.width / 24 * 2.5}px system-ui`);
        }
        else if (result == "Right Player Won" || result == "Left Player Won" || result == "No Games At The Moment" || result == "Waiting for accept" || result == "Invitation Expired" || result == "Invitation Declined") 
            this.text(result,this.context.canvas.width * .3, this.context.canvas.height* .5, "WHITE", `${this.context.canvas.width / 24}px system-ui`);
        else
            this.text(result, this.context.canvas.width * .3, this.context.canvas.height* .5, "WHITE", `${this.context.canvas.width / 24 * 2.5}px system-ui`);        
    }, 1000/60);
    }
    //Rendering game
    renderGame()
    {
        // Clear the canvas
        // this.rectangle(0, 0, this.context.canvas.width, this.context.canvas.height, "BLACK");
        this.context.drawImage(this.image, 0 ,0, this.context.canvas.width, this.context.canvas.height);
        // Draw the net
        this.drawNet();
        // change the score
        this.ref.lscore.current.innerText = this.user.score;
        this.ref.rscore.current.innerText = this.user2.score;
        // Draw the paddles
        this.rectangle(this.user.x, this.user.y, this.user.width, this.user.height, this.user.color);
        this.rectangle(this.user2.x, this.user2.y, this.user2.width, this.user2.height, this.user2.color);
        // Draw the ball
        this.circle(this.ball.x, this.ball.y, this.ball.radius, this.ball.color);
    }
    //Render connection
    renderconnection()
    {
        this.context.drawImage(this.image, 0 ,0, this.context.canvas.width, this.context.canvas.height);
        // this.rectangle(0, 0, this.context.canvas.width, this.context.canvas.height, "BLACK");
        if (this.count == 0)
            this.text("Connecting to server", this.context.canvas.width * .3, this.context.canvas.height* .5, "WHITE", `${this.context.canvas.width / 24/2 }px system-ui`);
        else if (this.count == 1)
            this.text("Connecting to server.", this.context.canvas.width * .3, this.context.canvas.height* .5, "WHITE", `${this.context.canvas.width / 24/2 }px system-ui`);        
        else if (this.count == 2)
            this.text("Connecting to server..", this.context.canvas.width * .3, this.context.canvas.height* .5, "WHITE", `${this.context.canvas.width / 24/2 }px system-ui`);        
        else if (this.count == 3)
            this.text("Connecting to server...", this.context.canvas.width * .3, this.context.canvas.height* .5, "WHITE", `${this.context.canvas.width / 24/2 }px system-ui`);
    }
    renderconnectionInterval()
    {
        this.conIntervalId = setInterval(()=>{
            if (this.count == 3)
                this.count = 0;
            else
                this.count++;
            this.renderconnection();
            }, 1000/2);}
    // Draw rectangle function
    rectangle(x: number, y: number, w: number, h: number, color: string) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, w, h);
    }

    // Draw circle function
    circle(x: number, y: number, r: number, color: string) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, r, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.fill();
    }

    // Draw text
    text(text: string, x: number, y: number, color: string, font: string) {
        this.context.fillStyle = color;
        this.context.font = font;
        this.context.fillText(text, x, y);
    }
    // Drawing the net
    drawNet(){
        for (let i = 0; i <= this.context.canvas.height; i += this.net.height * 2)
            this.rectangle(this.net.x, this.net.y + i, this.net.width, this.net.height, this.net.color);
    }

//======================================================================================

}
export default Game;