function drawTheGrid(){
    ctx.lineWidth = 1;
    ctx.strokeRect(0,0,300,300)
}


function snakeBrick(x,y){
    this.x=x;
    this.y=y;
}

function snakeMove(direction,snake){
    let newSnakeHead;
    let oldSnakeHead=snake[0];
    switch(direction){
        case "up":
            newSnakeHead=new snakeBrick(oldSnakeHead.x,oldSnakeHead.y-10);
        break
        case "down":
            newSnakeHead=new snakeBrick(oldSnakeHead.x,oldSnakeHead.y+10);
        break
        case "left":
            newSnakeHead=new snakeBrick(oldSnakeHead.x-10,oldSnakeHead.y);
        break
        case "right":
            newSnakeHead=new snakeBrick(oldSnakeHead.x+10,oldSnakeHead.y);
        break
    }
    snake.unshift(newSnakeHead)
    console.log(`${newSnakeHead.x},${newSnakeHead.y}--->${snake[snake.length-1].x},${snake[snake.length-1].y}`)
    snake.pop();
    
}

function drawSnake(snake){
    
    for (let i in snake){
        ctx.lineWidth = 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTheGrid();
        ctx.strokeRect(snake[i].x,snake[i].y,10,10)
    }

}

let direction1;
let listenForDirections=this.addEventListener('keypress', event => {
    
     let arrowpressed=event.key;
     console.log(arrowpressed)
     switch(arrowpressed){
         case 'w':
             direction1='up'
         break
         case 's':
            direction1='down'
        break
        case 'a':
            direction1='left'
        break
        case 'd':
            direction1='right'
        break
        default:
            break
     }
    
  })

let canvas=document.getElementById("snakePlace")
let ctx=canvas.getContext("2d");
ctx.canvas.width=350;
ctx.canvas.height=350;
ctx.lineWidth = 1;
drawTheGrid();
//draw the snake
let snake=[new snakeBrick(150,0)];
direction1='down'

setInterval(function () {
    snakeMove(direction1,snake)
    drawSnake(snake)
}, 500);


