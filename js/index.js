

function createGridElement(number, id){
    let div = document.createElement('div')
    div.classList.add('grid-square')
    if (number){
        div.textContent = number
    }
    if (id){
        div.setAttribute('id', id)
    }
    return div
}

function drawBoard(tileArray){
    tileArray.forEach(div => {
        document.getElementById('board').appendChild(div)
    });
}

function updateScoreDom(score){
    document.getElementById('score-el').textContent = score
}

const game = new Game(createGridElement, drawBoard, updateScoreDom)
game.start()
game.cardArray[0].getClass()

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
    