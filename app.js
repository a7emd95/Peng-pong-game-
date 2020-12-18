document.addEventListener("DOMContentLoaded", function (event) {
    const canvas = document.getElementById("pong");
    const ctx = canvas.getContext("2d");

    function drawRect(xAxis, yAxis, witdh, hieght, color) {
        ctx.fillStyle = color
        ctx.fillRect(xAxis, yAxis, witdh, hieght)
    }

    function drawCricle(xAxis, yAxis, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath()
        ctx.arc(xAxis, yAxis, radius, 0, Math.PI * 2, false);

        ctx.closePath();
        ctx.fill();

    }

    function drawText(text, xAxis, yAxis, color) {

        ctx.fillStyle = color;
        ctx.font = "65px fantasy";
        ctx.fillText(text, xAxis, yAxis)
    }


    //    setInterval(render , 1000)

    var user = {

        "xAxis": 0,

        "yAxis": (canvas.height / 2) - (100 / 2),

        "width": 10,

        "heigt": 100,

        "color": "white",

        "score": 0

    }
    //use const
    var com = {

        "xAxis": canvas.width - 10,

        "yAxis": (canvas.height / 2) - (100 / 2), // 100 heigh of net 

        "width": 10,

        "heigt": 100,

        "color": "white",

        "score": 0

    }

    //use const
    var net = {

        "xAxis": (canvas.width / 2) - (2 / 2), // 2 is width of net 

        "yAxis": 0,

        "width": 2,

        "heigt": 10,

        "color": "white"

    }

    //use const 
    var ball = {
        "xAxis": canvas.width / 2,

        "yAxis": canvas.height / 2,

        "speed": 5, //speed 

        "velocityX": 5, // speed + direction 

        "velocityY": 5, //speed + direction

        "radius": 10,

        "color": "white"

    }

    function drawNet() {
        var i = 0;
        for (net.yAxis; net.yAxis <= canvas.width; net.yAxis += 15) {
            drawRect(net.xAxis, net.yAxis, net.width, net.heigt, net.color);
        }
        net.yAxis = 0;
    }
    /*
    function drawNet(){
        var i = 0 ;
        for(i = 0  ; i <= canvas.width ; i +=15){
            drawRect(net.xAxis , net.yAxis , net.width , net.heigt , net.color);
            console.log(i);
            net.yAxis +=15;
        }        

    }
   */

    function drawScore() {
        //user score 
        drawText(user.score, canvas.width / 4, canvas.height / 7, "white")
        //com score
        drawText(com.score, 3 * (canvas.width / 4), canvas.height / 7, "white")

    }

    //use var 
    let rectX = 0
    function render() {

        drawRect(0, 0, 600, 400, "black"); //canvans
        drawScore();
        drawNet();
        drawRect(user.xAxis, user.yAxis, user.width, user.heigt, user.color)
        drawRect(com.xAxis, com.yAxis, com.width, com.heigt, com.color);
        drawCricle(ball.xAxis, ball.yAxis, ball.radius, ball.color)
    }

    function collision(player, ball) {
        //player direction 
        player.top = player.yAxis;
        player.bottom = player.yAxis + player.heigt;
        player.left = player.xAxis;
        player.right = player.xAxis + player.width;

        //ball direction
        ball.top = ball.yAxis - ball.radius;
        ball.bottom = ball.yAxis + ball.radius;
        ball.right = ball.xAxis + ball.radius;
        ball.left = ball.xAxis - ball.radius;

        return ball.right > player.left && ball.top < player.bottom &&
            ball.left < player.right && ball.bottom > player.top;
        //if true hppen collision false not happen 



    }
  function ballMovement(){


  }


    function update() {

        //ball movments 
        ball.xAxis = velocityX;
        ball.yAxis = velocityY;

        if (ball.yAxis + ball.radius > canvas.height || ball.yAxis - ball.radius < 0) {

            velocityY = -velocityY; //change direction of ball in y axis

        }
        //make let
        var player = (ball.xAxis < (canvas.width / 2)) ? user : com;

        if (collision(ball, player)) {

            //change volcityX and volcityY depend on where ball hit paddle 

            //make let 
            var collidPoint = ball.yAxis - (player.yAxis + player.heigt / 2);
            collidPoint = collidPoint / (player.heigt / 2);
            var angle = collidPoint * (Math.PI / 4);
            // make let ---direicrion of x
            var direction = (ball.xAxis < (canvas.width / 2)) ? 1 : -1;
            ball.velocityX = direction * ball.speed * Math.cos(angle);
            ball.velocityY = ball.speed * Math.sin(angle) ;
        }

        upadteScore();


    }
     function resetBall(){
         ball.xAxis =  canvas.width / 2 ;
         ball.yAxis = canvas.height / 2 ;
         ball.speed = 5 ;
         ball.velocityX = -ball.velocityX;
     }

    function upadteScore(){
        if((ball.xAxis - ball.radius) < 0 ){
              com.score++;
              resetBall() 
        }else if((ball.xAxis + ball.radius) < canvas.width){
              user.score++;
              resetBall(); 

        }

    }

    function game() {
        render();
        update(); //movments collision score updates
    }

    const framePerscond = 50; //fifty frame per second

    // setInterval(game , 1000 / framePerscond );

})


