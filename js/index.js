const startBtn = document.getElementById('normal-start-button')
const startTimer = document.getElementById('timer-button')
const timerModeButton = document.getElementById("timer-mode-button")
const instructionButton = document.getElementById("instruction-button")
const tryAgainButton = document.getElementById('try-again-button')
const returnButton = document.getElementById('return-button')
const failTimer = document.getElementById('fail-timer')
const victoryNormal = document.getElementById('victory-normal')
const victoryTimer = document.getElementById('victory-timer')
const timerNormalButton = document.getElementById('timer-normal')
const timerTimerButton = document.getElementById('timer-timer-mode')


const playingSpace = document.getElementById('playing-space')


const startMenu = document.getElementById("start-menu")
const gameOverMenu = document.getElementById("game-over-menu")
const victoryMenu = document.getElementById("victory-menu")
const instructionMenu = document.getElementById('instruction-menu')
const timerMenu = document.getElementById('timer-ending-menu')

const timerMinutes = document.getElementById('minutes')
const timerSeconds = document.getElementById('seconds')
const timer = document.getElementById('timer')


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
    return h2
}


function drawBoard(tileArray){
    tileArray.forEach(div => {
        playingSpace.appendChild(div)
    });
}

// NORMAL MODE STARTS
startBtn.addEventListener('click', startNormal)
startBtn.menu = startMenu

tryAgainButton.addEventListener('click', startNormal)
tryAgainButton.menu = gameOverMenu

timerNormalButton.addEventListener('click', startNormal)
timerNormalButton.menu = timerMenu
        

victoryNormal.addEventListener('click', startNormal)
victoryNormal.menu = victoryMenu

function startNormal(event){
    let menu = event.currentTarget.menu
    menu.classList.toggle('fade-out')
    playingSpace.innerHTML = ''
    game = new Game(createGridElement, drawBoard)
    game.start()
    game.cardArray[0].getClass()
        setTimeout(() => {
            menu.classList.add('hide')
            menu.classList.toggle('fade-out')
    }, 2000)
}


// INSTRUCTION BUTTONS
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





// TIMER STARTS
startTimer.addEventListener('click', startTimerMode)
startTimer.menu = startMenu

timerTimerButton.addEventListener('click', startTimerMode)
timerTimerButton.menu = timerMenu

failTimer.addEventListener('click', startTimerMode)
failTimer.menu = gameOverMenu

victoryTimer.addEventListener('click', startTimerMode)
victoryTimer.menu = victoryMenu

function startTimerMode(event){
    let menu = event.currentTarget.menu
    menu.classList.toggle('fade-out')
    playingSpace.innerHTML = ''

    game = new Game(createGridElement, drawBoard)
    
    newTimer = new Timer(timerMinutes, timerSeconds)
    timer.classList.remove('hide')
    newTimer.start()
        
    game.start()
    game.cardArray[0].getClass()
        setTimeout(() => {
            menu.classList.toggle('hide')
            menu.classList.toggle('fade-out')
    }, 2000)
    setTimeout( () => {
        timerMenu.classList.toggle('hide')
        timer.classList.add('hide')
    },120000)
}


// KEY INPUTS
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
    