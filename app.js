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

        "xAxis": (canvas.width / 2) - ( 2 / 2), // 2 is width of net 

        "yAxis": 0,

        "width": 2,

        "heigt": 10,

        "color": "white"

    }

    //use const 
    var ball = {
      "xAxis" : canvas.width / 2 ,

      "yAxis" : canvas.height / 2 ,

      "radius" : 10 ,

      "color" : "white"

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

   function drawScore(){
     //user score 
     drawText(user.score , canvas.width/4 , canvas.height/7 ,"white" )
     //com score
     drawText(com.score , 3*(canvas.width/4) , canvas.height/7 ,"white" )

   }

   //use var 
   let rectX = 0
   function render() {

       drawRect(0, 0, 600, 400, "black"); //canvans
       drawScore();
       drawNet();
       drawRect(user.xAxis , user.yAxis , user.width , user.heigt , user.color)
       drawRect(com.xAxis , com.yAxis , com.width , com.heigt , com.color);
       drawCricle(ball.xAxis , ball.yAxis , ball.radius , ball.color)
   }



   function game(){
    render();
     update()
    }

   const framePerscond = 50 ;
   
  // setInterval(game , 1000 / framePerscond );
})


