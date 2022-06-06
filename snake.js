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
    
    snake.pop();
    
}

function addFoodToGrid(foodArray,snakeArray){
    let food;
    let foodIsPartOfSnake=false;
    do{    
        let foodX=Math.floor(Math.random()*(ctx.canvas.width-50)/10)*10
        let foodY=Math.floor(Math.random()*(ctx.canvas.height-50)/10)*10
        food=new snakeBrick(foodX,foodY)
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
    let futureSnake=[snake[0]]; 
    snakeMove(direction,futureSnake);
    for (let i in foodArr){            
                
            if (foodArr[i].x===snake[0].x&&foodArr[i].y===snake[0].y){                
                foodArr.splice(i,1);
                let newSnakeHead=new snakeBrick(futureSnake[0].x,futureSnake[0].y)
                snake.unshift(newSnakeHead);                          
                addFoodToGrid(foodArr,snake);
                drawFood(foodArr);             
                drawSnake(snake)
            }

        }
}
function snakeDies(snake,width,height){
    if(snake[0].x===width-40||snake[0].x===-10
    ||snake[0].y===height-40||snake[0].y===-10){
        
        return true
    }
    for (i=1; i<snake.length;i++){
        if (snake[0].x===snake[i].x&&snake[0].y===snake[i].y){
          
            return true
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

let listenForDirections=this.addEventListener('keypress', event => {
    
     let arrowpressed=event.key;
     switch(arrowpressed){
         case 'w':
           if (direction1==='down'){
                snake.reverse();
            }
            direction1='up'
             
         break
         case 's':
            if (direction1==='up'){
                snake.reverse();
            }
            direction1='down'
        break
        case 'a':
            if (direction1==='right'){
                snake.reverse();
            } 
            direction1='left'
        break
        case 'd':
           if (direction1==='left'){
            snake.reverse();
            }
            direction1='right'
        break
        case 'e':
            addFoodToGrid(foodArray,snake);
        break
        case 'p':
         gamePaused=!gamePaused    
        if (gamePaused){
                clearInterval(gameLoop);
            }else{
                mainGame()
            }
           
        break
        case '+':
            speed+=50
            console.log(speed)
            clearInterval(gameLoop);
            mainGame();
        break
        case '-':
            speed-=50
            
            console.log(speed)
            clearInterval(gameLoop);
            mainGame();
        break
        default:
            console.log(`MANUAL!!!!!!!!!
Typing SNAKE coordinates:`)
            for (let i in snake){
                console.log(`${snake[i].x}-->${snake[i].y}`)
            } 
            console.log(`Typing FOOD coordinates:`)
            for (let i in foodArray){
                console.log(`${foodArray[i].x}-->${foodArray[i].y}`)
            }
            console.log(speed);
        break
     }
    
  })

let listenForGameStart=document.getElementById(`start`).addEventListener('click', event => {
    clearInterval(gameLoop);
    setInitialGameStatus.call();
    mainGame();
    console.log('Started the game')

  })

let setInitialGameStatus=function(){

direction1='down';
  
canvas=document.getElementById("snakePlace")
ctx=canvas.getContext("2d");
ctx.canvas.width=350;
ctx.canvas.height=350;
ctx.lineWidth = 1;
//let snake=[];

foodArray=[new snakeBrick(150,150)];
gamePaused=false;
drawTheGrid(ctx.canvas.width,ctx.canvas.height);
snake=[new snakeBrick(150,0)];


 //turnsInSetInterval  counts how many times the setInterval Function has been iterated. Every 75 times food will be drawn 
turnsInSetInterval=76
snakeDead=false;    
}
let speed=250;
let direction1; 
let gameLoop; 
let canvas=document.getElementById("snakePlace")
let ctx=canvas.getContext("2d");
ctx.canvas.width=350;
ctx.canvas.height=350;
ctx.lineWidth = 1;
//let snake=[];
let direction='';
let foodArray=[];
let gamePaused=false;
drawTheGrid(ctx.canvas.width,ctx.canvas.height);
let snake=[new snakeBrick(150,0)];
direction1='down';

 //turnsInSetInterval  counts how many times the setInterval Function has been iterated. Every 75 times food will be drawn 
let turnsInSetInterval=75
let snakeDead=false; 

function mainGame(){

    gameLoop=setInterval(function () {
 
        snakeMove(direction1,snake)
        drawSnake(snake)
        drawFood(foodArray);
        
        if (turnsInSetInterval%75===0){
            addFoodToGrid(foodArray,snake);
        }
        snakeDead=snakeDies(snake,ctx.canvas.width,ctx.canvas.height)
        
        snakeEats(foodArray,snake,direction1);
    
        if (snakeDead){
            alert(`Game Over`)
            clearInterval(gameLoop)
        }
    
    
        
        turnsInSetInterval++   
    }, speed);

}
