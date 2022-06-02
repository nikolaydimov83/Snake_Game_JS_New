function drawTheGrid(width,height){
    ctx.lineWidth = 1;
    ctx.strokeRect(0,0,(width-50),(height-50))
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
    //console.log(`${newSnakeHead.x},${newSnakeHead.y}--->${snake[snake.length-1].x},${snake[snake.length-1].y}`)
    snake.pop();
    
}

function addFoodToGrid(foodArray,snakeArray){
    let food;
    let foodIsPartOfSnake=false;
    do{    
        let foodX=Math.floor(Math.random()*(ctx.canvas.width-50)/10)*10
        let foodY=Math.floor(Math.random()*(ctx.canvas.height-50)/10)*10
        food=new snakeBrick(foodX,foodY)
        //console.log(`${foodX}-->${foodY}`)
        for (let i in snakeArray){
            if((food.x===snakeArray.x)&&(food.y===snakeArray.y)){
                foodIsPartOfSnake=true
            }
        } 
    }while (foodIsPartOfSnake===true)
    foodArray.pop();
    foodArray.push(food)

}

function drawFood(foodArray){
    for (let i in foodArray){
        ctx.lineWidth = 1;
        ctx.strokeRect(foodArray[i].x,foodArray[i].y,10,10)
    }
}

function snakeEats(foodArr,snake, direction){
    /*In order to check whether snake's head is touching the food based on Head co-ordinates and direction 
    I create imaginative "future" snake that is wold be on the next setInterval itteration and check whether 
    it's coordinates are equal to food coordinates 
     */
   //First I assign the head of the snake of the present to the future snake
    let futureSnake=[snake[0]]; 
    direction=direction1
    //console.log(foodArr)
    //console.log(futureSnake)
    //Here I imaginery "move" the future snake to the next setInterval  
    snakeMove(direction,futureSnake);

    //now I will check if the coordinates of the future snake equal food coordinates.
    //If so, I will assign the Future snake head as a head to the real snake
    for (let i in foodArr){            
                /*console.log(`Present Snake: ${snake}`)
                console.log(`Future Snake: ${futureSnake}`)
                console.log(`Food:${foodArr}`)*/
            if (foodArr[i].x===futureSnake[0].x&&foodArr[i].y===futureSnake[0].y){
                foodArr.splice(i,1);
                
                /*for (let i in snake){
                    console.log(`Start snake elements`)
                    console.log(`${snake[i].x}-->${snake[i].y}`)
                    console.log(`End snake elements`)
                }
                console.log(`EATED!!!!!!!!!!!!!`)
                console.log(`EATED!!!!!!!!!!!!!`)
                console.log(`EATED!!!!!!!!!!!!!`)
                console.log(`EATED!!!!!!!!!!!!!`)
                console.log(`EATED!!!!!!!!!!!!!`)*/
                let newHead=new snakeBrick(futureSnake[0].x,futureSnake[0].y)
                //console.log(`New Head: ${newHead}`);
                snake.unshift(newHead);
               
                addFoodToGrid(foodArr,snake);
                drawFood(foodArr);
                alert(`Length:${snake.length}`)
                drawSnake(snake)

            }

        }
}
function drawSnake(snake){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i in snake){
        
        ctx.lineWidth = 1;
        
        drawTheGrid(ctx.canvas.width,ctx.canvas.height);
        ctx.strokeRect(snake[i].x,snake[i].y,10,10)
    }

}

let direction1;
let listenForDirections=this.addEventListener('keypress', event => {
    
     let arrowpressed=event.key;
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
drawTheGrid(ctx.canvas.width,ctx.canvas.height);
//draw the snake
let snake=[new snakeBrick(150,0)];
direction1='down';
foodArray=[];
let snakeEaten=false;
 //turnsInSetInterval  counts how many times the setInterval Function has been iterated. Every 90 times food will be drawn 
let turnsInSetInterval=90
setInterval(function () {
    snakeMove(direction1,snake)
    drawSnake(snake)
    drawFood(foodArray);
    
    if (turnsInSetInterval%90===0){
        addFoodToGrid(foodArray,snake);
    }
    snakeEats(foodArray,snake,direction1);
    turnsInSetInterval++
    if (snakeEaten===`true`){
        console.log(`MAIN CONTEXT!!!!`)
        console.log(`Start snake elements`)
                
                for (let i in snake){                                  
                    console.log(`${snake[i].x}-->${snake[i].y}`)                   
                }
                console.log(`End snake elements`)
    }
    
}, 400);


