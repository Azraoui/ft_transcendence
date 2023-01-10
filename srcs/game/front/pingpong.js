//===+Functions to draw with+============

// Draw rectangle function
function rectangle(x,y,w,h,color)
{
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}

// Draw circle function
function circle(x,y,r,color)
{
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,false);
    context.closePath();
    context.fill();
}

// Draw text
function text(text,x,y,color)
{
    context.fillStyle = color;
    context.font = `${canvas.width/24 * 2.5}px system-ui`;
    context.fillText(text,x,y);
}
//========================================

//=========+Objects to draw+===============

// User paddle
const user = {
    height : undefined,
    width : undefined,
    x : undefined,
    y : undefined,
    color : "WHITE",
    score : 0,
}

// User2 paddle
const user2 = {
    height : undefined,
    width : undefined,
    x : undefined,
    y : undefined,
    color : "WHITE",
    score : undefined,
}

// The ball
const ball = {
    x : undefined,
    y : undefined,
    radius : undefined,
    color : "WHITE",
}

// The net pieces
const net = {
    x : undefined,
    y : 0,
    width : undefined,
    height : undefined,
    color : "WHITE",
}
//=======================================
// Backendgamecanvas
const bcWidth = 600;
const bcHeight = 400;
// Getting my canvas info and tools to draw in it
const canvas = document.getElementById("PingPong");
const context = canvas.getContext("2d");
context.canvas.width = canvas.parentNode.offsetWidth;
context.canvas.height = canvas.parentNode.offsetWidth * .6;
// Dealing with responsivity
window.addEventListener("resize", (event)=>{

    const tmpCanvas = document.createElement("canvas");
    let tempContext = tmpCanvas.getContext("2d");
    tempContext.canvas.width = context.canvas.width;
    tempContext.canvas.height = context.canvas.height;

    //Draw our canvas to temp canvas
    tempContext.drawImage(context.canvas, 0, 0);

    //Resize our canvas
    context.canvas.width = canvas.parentNode.offsetWidth;
    context.canvas.height = canvas.parentNode.offsetWidth * .6;
    //Draw temp canvas to our canvas
    context.drawImage(tempContext.canvas, 0, 0);
    tmpCanvas.remove();

})

// ==================+Connection to server+====================== 
const socket = io('http://localhost:80', {autoConnect: false, autoReconnect:false, transports: ['websocket'], query: {role:"player"}});
// socket.on("connect_error", (error) => {console.log("Connection error occured: ", error);});
socket.on("connect", () => {console.log("Connection to server established");});
// socket.on("disconnect", (reason) => {console.log(`Disconnection from server: ${reason}`);
//                                         if (reason == "io server disconnect")
//                                             socket.disconnect();
//                                             console.log("Reconnection..");});
socket.on("queue", renderqueue());
socket.on("update", (cords) => {
updateObjects(cords, bcWidth, bcHeight);
renderElements();
})
socket.on("uWon", () => {renderWinLost("YOU WON")});
socket.on("uLost", () => {renderWinLost("YOU LOST")});
socket.on("OpponentLeft", () => {renderWinLost("OPPONENT LEFT")});
socket.connect();

// =====================================================

var queueIntervalId;
// Updating my game objects after receiving data from server
function updateObjects(cords, Width, Height)
{
    ball.x = (canvas.width / Width) * cords.ballX;
    ball.y = (canvas.height / Height) * cords.ballY;
    ball.radius = canvas.height / 50;
    user.y = (canvas.height / Height) * cords.leftPaddleY;
    user2.y = (canvas.height / Height) * cords.rightPaddleY;
    user2.x = canvas.width - 5*(canvas.height/24/4);
    user.x = canvas.height/24/4;
    user.score = cords.leftPaddleScore;
    user2.score = cords.rightPaddleScore;
    user.height = canvas.height/4;
    user2.height = canvas.height/4;
    user.width = canvas.height/24;
    user2.width = canvas.height/24;
    net.width = canvas.width/24 * .1;
    net.x = canvas.width / 2 - (net.width/2);
    net.height = canvas.height/4 * .05;
}

// Drawing the net
function drawNet()
{
    for (let i = 0; i <= canvas.height; i += net.height * 2)
        rectangle(net.x, net.y + i, net.width, net.height, net.color);
}


/* For keyboard event */
document.addEventListener('keydown', (event) =>
{
    if (event.key == "ArrowUp")
        socket.emit("keyUp");
    if (event.key == "ArrowDown")
        socket.emit("keyDown");
});

// Rendering the game
function renderElements()
{
    // Stop queue interval
    clearInterval(queueIntervalId);
    // Clear the canvas
    rectangle(0, 0, canvas.width, canvas.height, "BLACK");
    // Draw the net
    drawNet();
    // Draw the score
    text(user.score, canvas.width* .3, canvas.height* .2, user.color);
    text(user2.score, canvas.width* .7, canvas.height* .2, user2.color);
    // Draw the paddles
    rectangle(user.x, user.y, user.width, user.height, user.color);
    rectangle(user2.x, user2.y, user2.width, user2.height, user2.color);
    // Draw the ball
    circle(ball.x, ball.y, ball.radius, ball.color);
}
// Rendering win or lost
function renderWinLost(result)
{
    setInterval(()=>{
    rectangle(0, 0, canvas.width, canvas.height, "BLACK");
    if (result != "OPPONENT LEFT")
        text(result, canvas.width * .3, canvas.height* .5, "WHITE");
    else 
    {
        text(result, 0, canvas.height* .4, "WHITE");
        text("YOU WIN", canvas.width * .3, canvas.height* .7, "WHITE");
    }
}, 1000/60);
}

// Rendering queue
function renderqueue()
{
    let seconds = 0;
    let minutes = 0;

    queueIntervalId = setInterval(()=>{
        if (seconds == 60)
        {
            seconds = 0;
            minutes++;
        }
        else
            seconds++;
        rectangle(0, 0, canvas.width, canvas.height, "BLACK");
        text(`${minutes} : ${seconds}`, canvas.width * .4, canvas.height * .5, "WHITE");
    }, 1000);
}