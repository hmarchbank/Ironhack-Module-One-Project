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
    
// SWIPE INPUTS


document.addEventListener('swiped', function(e) {
    e.preventDefault()
    console.log(e)
    let card = game.cardArray[0]
    switch(e.detail.dir){
        case "left":
            card.moveHorizontally('left', "0")
            break
        case "right":
            card.moveHorizontally('right', "3")
            break
        case "up":
            card.moveVertically('up', '0')
            break
        case "down":
            card.moveVertically('down', '3')
            break
    }
});
        

/*!
 * swiped-events.js - v1.1.6
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
!function(t,e){"use strict";"function"!=typeof t.CustomEvent&&(t.CustomEvent=function(t,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var a=e.createEvent("CustomEvent");return a.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),a},t.CustomEvent.prototype=t.Event.prototype),e.addEventListener("touchstart",function(t){if("true"===t.target.getAttribute("data-swipe-ignore"))return;s=t.target,r=Date.now(),n=t.touches[0].clientX,a=t.touches[0].clientY,u=0,i=0},!1),e.addEventListener("touchmove",function(t){if(!n||!a)return;var e=t.touches[0].clientX,r=t.touches[0].clientY;u=n-e,i=a-r},!1),e.addEventListener("touchend",function(t){if(s!==t.target)return;var e=parseInt(l(s,"data-swipe-threshold","20"),10),o=parseInt(l(s,"data-swipe-timeout","500"),10),c=Date.now()-r,d="",p=t.changedTouches||t.touches||[];Math.abs(u)>Math.abs(i)?Math.abs(u)>e&&c<o&&(d=u>0?"swiped-left":"swiped-right"):Math.abs(i)>e&&c<o&&(d=i>0?"swiped-up":"swiped-down");if(""!==d){var b={dir:d.replace(/swiped-/,""),touchType:(p[0]||{}).touchType||"direct",xStart:parseInt(n,10),xEnd:parseInt((p[0]||{}).clientX||-1,10),yStart:parseInt(a,10),yEnd:parseInt((p[0]||{}).clientY||-1,10)};s.dispatchEvent(new CustomEvent("swiped",{bubbles:!0,cancelable:!0,detail:b})),s.dispatchEvent(new CustomEvent(d,{bubbles:!0,cancelable:!0,detail:b}))}n=null,a=null,r=null},!1);var n=null,a=null,u=null,i=null,r=null,s=null;function l(t,n,a){for(;t&&t!==e.documentElement;){var u=t.getAttribute(n);if(u)return u;t=t.parentNode}return a}}(window,document);