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
        ctx.font = "45px fantasy";
        ctx.fillText(text, xAxis, yAxis)
    }

    var user = {

        "xAxis": 0,

        "yAxis": (canvas.height / 2) - (100 / 2),

        "width": 10,

        "heigt": 100,

        "color": "white",

        "score": 0

    }

    var com = {

        "xAxis": canvas.width - 10,

        "yAxis": (canvas.height / 2) - (100 / 2), // 100 heigh of net 

        "width": 10,

        "heigt": 100,

        "color": "white",

        "score": 0

    }

    var net = {

        "xAxis": (canvas.width / 2) - (2 / 2), // 2 is width of net 

        "yAxis": 0,

        "width": 2,

        "heigt": 10,

        "color": "white"

    }

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

    function drawScore() {
        //user score 
        drawText(user.score, canvas.width / 4, canvas.height / 7, "white")
        //com score
        drawText(com.score, 3 * (canvas.width / 4), canvas.height / 7, "white")

    }



    function render() {
        drawRect(0, 0, 600, 400, "black"); //canvans
        drawScore();
        drawNet();
        drawRect(user.xAxis, user.yAxis, user.width, user.heigt, user.color)
        drawRect(com.xAxis, com.yAxis, com.width, com.heigt, com.color);
        drawCricle(ball.xAxis, ball.yAxis, ball.radius, ball.color)
    }

    function collision(player, Ball) {
        //player direction s
        player.top = player.yAxis;
        player.bottom = player.yAxis + player.heigt;
        player.left = player.xAxis;
        player.right = player.xAxis + player.width;

        //ball directions
        Ball.top = Ball.yAxis - Ball.radius;
        Ball.bottom = Ball.yAxis + Ball.radius;
        Ball.right = Ball.xAxis + Ball.radius;
        Ball.left = Ball.xAxis - Ball.radius;

        return Ball.right > player.left && Ball.top < player.bottom &&
            Ball.left < player.right && Ball.bottom > player.top;
        //if true hppen collision false not happen 

    }



    function resetBall() {
        ball.xAxis = canvas.width / 2;
        ball.yAxis = canvas.height / 2;
        ball.speed = 5;
        ball.velocityX = -ball.velocityX;
    }

    function upadteScore() {
        if ((ball.xAxis - ball.radius) < 0) {
            com.score++;
            resetBall()
            console.log("ahmed Com");
        } else if (ball.xAxis + ball.radius > canvas.width) {
            user.score++;
            console.log("ahmed User");
            resetBall();

        }



    }


    function moveUserPaddle(event) {

        var rect = canvas.getBoundingClientRect(); // scrolling 
        user.yAxis = event.clientY - rect.top - user.heigt / 2; // user.heigt / 2  to make mouse movee from center of paddle 


    }
    canvas.addEventListener("mousemove", moveUserPaddle);
    function moveComputerPaddle() {
        computerLevel = 0.1;
        com.yAxis += (ball.yAxis - (com.yAxis + com.heigt / 2)) * computerLevel;
    }

      function ballWallHits(){

       

        if (ball.yAxis + ball.radius > canvas.height || ball.yAxis - ball.radius < 0) {

            ball.velocityY = -ball.velocityY; //change direction of ball in y axis

        }
      }

      function ballPaddleCollision(){

        let player = (ball.xAxis < (canvas.width / 2)) ? user : com;
        if (collision(player, ball)) {

            //change volcityX and volcityY depend on where ball hit paddle 

            //make let 
            var collidPoint = ball.yAxis - (player.yAxis + player.heigt / 2);
            collidPoint = collidPoint / (player.heigt / 2);
            var angle = collidPoint * (Math.PI / 4);
            // make let ---direicrion of x
            var direction = (ball.xAxis < canvas.width / 2) ? 1 : -1;


            ball.velocityX = direction * ball.speed * Math.cos(angle);
            ball.velocityY = ball.speed * Math.sin(angle);
            ball.speed += 0.5; // increas speed 


        }
      }

    function update() {
        //ball movments 
        ball.xAxis += ball.velocityX;
        ball.yAxis += ball.velocityY;
     
         ballWallHits()
         moveComputerPaddle();
         ballPaddleCollision()
         upadteScore();


    }

    function game() {
        update(); //movments collision score updates
        render();

    }

    const framePerscond = 50; //fifty frame per second

 var timer = setInterval(game, 1000 / framePerscond);

})


