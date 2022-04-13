const startBtn = document.getElementById('normal-start-button')
const instructionButton = document.getElementById("instruction-button")
const timerModeButton = document.getElementById("timer-mode-button")
const tryAgainButton = document.getElementById('try-again-button')
const returnButton = document.getElementById('return-button')
const startTimer = document.getElementById('timer-button')
const victoryTimer = document.getElementById('victory-timer')
const failTimer = document.getElementById('fail-timer')

const timerNormalButton = document.getElementById('timer-normal')
const timerTimerButton = document.getElementById('timer-timer-mode')


const playingSpace = document.getElementById('playing-space')


const startMenu = document.getElementById("start-menu")
const gameOverMenu = document.getElementById("game-over-menu")
const victoryMenu = document.getElementById("victory-menu")
const instructionMenu = document.getElementById('instruction-menu')
const timerMenu = document.getElementById('timer-ending-menu')


let game = new Game(createGridElement, drawBoard)


function createGridElement(number, id){
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    
    h2.classList.add('grid-square')
    h2.classList.add('number')
    
    if (number){
        h2.textContent = number
    }
    if (id){
        h2.setAttribute('id', id)
    }
    console.log(h2)
    // div.appendChild(h2)
    return h2
}


function drawBoard(tileArray){
    tileArray.forEach(div => {
        playingSpace.appendChild(div)
    });
}





startBtn.addEventListener('click', () => {
    startMenu.classList.toggle('fade-out')
    game.start()
    game.cardArray[0].getClass()
        setTimeout(() => {
            startMenu.classList.toggle('hide')
    }, 2000)
})

startTimer.addEventListener('click', () => {
    console.log('clicked')
    startMenu.classList.toggle('fade-out')
    game.start()
    game.cardArray[0].getClass()
        setTimeout(() => {
            startMenu.classList.toggle('hide')
    }, 2000)
    console.log(instructionMenu)
    setTimeout( () => {
        timerMenu.classList.toggle('hide')
    },120000)
})



tryAgainButton.addEventListener('click', () => {
    gameOverMenu.classList.toggle('fade-out')
    playingSpace.innerHTML = ''
    game = new Game(createGridElement, drawBoard)
    game.start()
    game.cardArray[0].getClass()
        setTimeout(() => {
            gameOverMenu.classList.add('hide')
            gameOverMenu.classList.toggle('fade-out')
    }, 2000)

})

timerNormalButton.addEventListener('click', () => {
    timerMenu.classList.toggle('fade-out')
    playingSpace.innerHTML = ''
    game = new Game(createGridElement, drawBoard)
    game.start()
    game.cardArray[0].getClass()
        setTimeout(() => {
            timerMenu.classList.add('hide')
            timerMenu.classList.toggle('fade-out')
    }, 2000)
})

timerTimerButton.addEventListener('click', () => {
    timerMenu.classList.toggle('fade-out')
    playingSpace.innerHTML = ''
    game = new Game(createGridElement, drawBoard)
    game.start()
    game.cardArray[0].getClass()
        setTimeout(() => {
            timerMenu.classList.toggle('fade-out')
            timerMenu.classList.toggle('hide')
    }, 2000)
    console.log(instructionMenu)
    setTimeout( () => {
        timerMenu.classList.toggle('hide')
    },120000)
})

failTimer.addEventListener('click', () => {
    gameOverMenu.classList.toggle('fade-out')
    playingSpace.innerHTML = ''
    game = new Game(createGridElement, drawBoard)
    game.start()
    game.cardArray[0].getClass()
        setTimeout(() => {
            gameOverMenu.classList.toggle('fade-out')
            gameOverMenu.classList.toggle('hide')
    }, 2000)
    console.log(instructionMenu)
    setTimeout( () => {
        timerMenu.classList.toggle('hide')
    },120000)
})



instructionButton.addEventListener('click', () => {
    startMenu.classList.toggle('fade-out')
    instructionMenu.classList.toggle('hide')

})


returnButton.addEventListener('click', () => {
    startMenu.classList.remove('fade-out')
    instructionMenu.classList.toggle('fade-out')
    setTimeout(() => {
        instructionMenu.classList.toggle('hide')
        instructionMenu.classList.toggle('fade-out')
}, 2000)
})




// instructionButton.addEventListener('click', () => {
//     startMenu.classList.toggle('fade-out')
//     game.cardArray[0].getClass()
//         setTimeout(() => {
//             instru.classList.toggle('hide')
//     }, 2000)
// }) 
/* NEED TO CREATE THE bloody thing*/



document.addEventListener('keyup', (even) => {
    let card = game.cardArray[0]
    switch(event.key){
        case "ArrowLeft":
            card.moveHorizontally('left', "0")
            break
        case "ArrowRight":
            card.moveHorizontally('right', "3")
            break
        case "ArrowUp":
            card.moveVertically('up', '0')
            break
        case "ArrowDown":
            card.moveVertically('down', '3')
            break
    }
})
    