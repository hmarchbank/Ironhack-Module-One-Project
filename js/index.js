

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

function getTileArray(){
    return this.tileArray
}

function drawBoard(tileArray){
    tileArray.forEach(div => {
        document.getElementById('board').appendChild(div)
    });
}

function updateBoard(topRow, secondRow, thirdRow, fourthRow){
    let board = document.getElementById('board')
    for (let i = 0; i < topRow.length; i++){
        board.appendChild(topRow[i])
    }
    for (let i = 0; i < topRow.length; i++){
        board.appendChild(secondRow[i])
    }
    for (let i = 0; i < topRow.length; i++){
        board.appendChild(thirdRow[i])
    }
    for (let i = 0; i < topRow.length; i++){
        board.appendChild(fourthRow[i])
    }
}

const game = new Game(createGridElement, drawBoard)
game.start()

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
    