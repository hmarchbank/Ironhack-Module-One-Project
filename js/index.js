

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
    console.log(card)
    switch(event.key){
        case "ArrowLeft":
            console.log(game.cardArray[0].bottomRow)
            game.cardArray[0].moveHorizontally('left', "0")
            break
        case "ArrowRight":
            game.cardArray[0].moveHorizontally('right', "3")
            break
        case "ArrowUp":
            game.cardArray[0].moveVertically('up', '0')
            break
        case "ArrowDown":
            game.cardArray[0].moveVertically('down', '3')
            break
    }
})
    