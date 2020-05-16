document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const score = document.querySelector('#score')
    const startbtn = document.querySelector('#start')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const width = 10
    let nextRandom = 0
   
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    let currentPosition = 4
    let currentRotation = 0
    

    let rnd = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[rnd][currentRotation]

    function draw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }
    function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }
    
    timerId = setInterval(moveDown , 500)

    function control(e){
        if(e.keyCode  === 37){
            moveLeft()
        }
        else if(e.keyCode  === 40){
            moveDown()
        }
        else if(e.keyCode  === 39){
            moveRight()
        }
        else if(e.keyCode  === 38){
            rotate()
        }
    }

    function moveDown(){
        undraw()
        currentPosition += width
        draw()
        freeze()
    }
    document.addEventListener('keyup', control)
    function freeze(){
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            rnd = nextRandom
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
            current = theTetrominoes[rnd][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
        }
    } 
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if(!isAtLeftEdge) currentPosition -=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
          currentPosition +=1
        }
        draw()
      }                     
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if(!isAtRightEdge) currentPosition +=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
          currentPosition -=1
        }
        draw()
      }   
      
    function rotate(){
        undraw()
        currentRotation++
        if (currentRotation === current.length){
            currentRotation = 0 
        }
        current = theTetrominoes[rnd][currentRotation]
        draw()
    }

    const displaySquare = document.querySelectorAll('.miniGrid div')
    const displayWidth = 4
    let displayIndex = 0

    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
      ]

    function displayShape(){
        displaySquare.forEach(square => {
            square.classList.remove('tetromino')
        })
        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquare[displayIndex + index].classList.add('tetromino')
        })
    }     
})