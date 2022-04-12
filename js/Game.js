class Game {
    constructor(createGridElement, drawBoard) {
        this.gridBlock = null
        this.numbersArray = []
        this.numbers = null
        this.tileArray = []
        this.board = null
        this.createGridElement = createGridElement
        this.drawBoard = drawBoard
        this.cardArray = []

    }

    start() {
        for (let i = 0; i < 8; i++) {
            this.numbersArray.push(this.getNumber(2))
        }
        this.createBoard(this.tileArray, this.createGridElement)
    }


    getNumber(number) {
        if (typeof number === 'number') return number
    }


    createBoard() {
        for (let i = 0; i < 4; i++) {
            for (let i = 0; i < 4; i++) {
                let div = this.createGridElement()
                div.setAttribute('id', `${i}`)
                this.tileArray.push(div)
            }
        }
        for (let i = 0; i < 7; i++) {
            let randomIndex = Math.floor(Math.random() * 15)
            if (this.tileArray[randomIndex].textContent === "2") {
                i -= 1
                continue
            } else {
                var newCard = new Card(2, randomIndex, this.tileArray, this.createGridElement)
                this.tileArray[randomIndex].innerText = this.numbersArray.shift()
            }
            this.cardArray.push(newCard)
        }
        this.drawBoard(this.tileArray)
    }
}

class Card {
    constructor(number, position, cardArray, createGridElement) {
        this.number = number
        this.position = position
        this.cardArray = cardArray
        this.createEl = createGridElement
        this.topRow = []
        this.secondRow = []
        this.thirdRow = []
        this.bottomRow = []
        this.leftColumn = []
        this.midLeftColumn = []
        this.midRightColumn = []
        this.rightColumn = []
        this.highestNumber = 0
    }
    
    moveHorizontally(direction, id) {
        
        this.changeArrayDirection()

        this.moveRows(this.topRow, direction, id)
        this.moveRows(this.secondRow, direction, id)
        this.moveRows(this.thirdRow, direction, id)
        this.moveRows(this.bottomRow, direction, id)

        this.newTile(direction)
    }
    
    moveVertically(direction, id) {
        // prepares arrays for vertical movement
        for (let i = 0; i < this.cardArray.length; i++) {
            if (this.cardArray[i].id === '0') {
                this.leftColumn.push(this.cardArray[i])
            } else if (this.cardArray[i].id === '1') {
                this.midLeftColumn.push(this.cardArray[i])
            } else if (this.cardArray[i].id === '2') {
                this.midRightColumn.push(this.cardArray[i])
            } else if (this.cardArray[i].id === '3') {
                this.rightColumn.push(this.cardArray[i])
            }
        }

        this.generateId(this.leftColumn)
        this.generateId(this.midLeftColumn)
        this.generateId(this.midRightColumn)
        this.generateId(this.rightColumn)


        // moves rows
        this.moveRows(this.leftColumn, direction, id)
        this.moveRows(this.midLeftColumn, direction, id)
        this.moveRows(this.midRightColumn, direction, id)
        this.moveRows(this.rightColumn, direction, id)

        this.newTile(direction)

        // reverts array direction and clears them for next movement
        this.changeArrayDirection()
        this.generateId(this.topRow)
        this.generateId(this.secondRow)
        this.generateId(this.thirdRow)
        this.generateId(this.bottomRow)


        this.leftColumn = []
        this.midLeftColumn = []
        this.midRightColumn = []
        this.rightColumn = []

    }


    changeArrayDirection(){
        this.cardArray.forEach(element => {
            if (this.topRow.length < 4) {
                this.topRow.push(element)
            } else if (this.secondRow.length < 4) {
                this.secondRow.push(element)
            } else if (this.thirdRow.length < 4) {
                this.thirdRow.push(element)
            } else if (this.bottomRow.length < 4) {
                this.bottomRow.push(element)
            }
        })
    }


    generateId(array) {
        array.forEach((element, index) => {
            element.id = index
        })
    }

    moveRows(row, direction, id) {
        if (direction === 'right' || direction === 'down') {
            row.reverse()
        }
        row.forEach((element, index) => {
            if (index >= 1) {
                index--
            }
            if (element.textContent) {
                if (element.id === id) {
                    // make sure the elements can't move out of bounds
                } else if (row[index].textContent) {
                    if (row[index].textContent === element.textContent) {
                        row[index].classList.toggle("turned")
                        row[index].textContent *= 2
                        element.textContent = ''
                        console.log(element.classList)
                    }
                } else {
                    row[index].textContent = element.textContent
                    element.textContent = ""
                    
                }
            }
        })
        if (direction === 'right' || direction === 'down') {
            row.reverse()
        }
    }

    newTile(direction){
        let counter = 0
        switch (direction) {
            case 'left':
                this.findEmptySquare(3, this.topRow, this.secondRow, this.thirdRow, this.bottomRow)
                // horizontal rows 3
                break;
            case 'right':
                this.findEmptySquare(0, this.topRow, this.secondRow, this.thirdRow, this.bottomRow)
                // horizontal rows 0
                break;
            case 'up':
                this.findEmptySquare(3, this.rightColumn, this.midRightColumn, this.midLeftColumn, this.leftColumn)
                // vertical columns 3
                break;
            case 'down':
                this.findEmptySquare(0, this.rightColumn, this.midRightColumn, this.midLeftColumn, this.leftColumn)
                // vertical columns 0
                break;
        }
    }

    findEmptySquare(index, arrayOne, arrayTwo, arrayThree, arrayFour){
        let emptyTileArray = []
        if (!arrayOne[index].textContent) {
            emptyTileArray.push(arrayOne[index])
        }
        if (!arrayTwo[index].textContent) {
            emptyTileArray.push(arrayTwo[index])
        }
        if (!arrayThree[index].textContent) {
            emptyTileArray.push(arrayThree[index])
        }
        if (!arrayFour[index].textContent) {
            emptyTileArray.push(arrayFour[index])
        }
        if(emptyTileArray.length >= 0){
            let randomIndex = Math.floor(Math.random() * emptyTileArray.length)
            emptyTileArray[randomIndex].classList.toggle("turnedZ")
            emptyTileArray[randomIndex].textContent = this.generateNewNumber()
        } else {
            document.getElementById('board').textContent = "GAME OVER"
        }
    }

    generateNewNumber(){
        let randomNumber = Math.floor(Math.random() * 100 + 1)
        for (let i = 0; i < this.cardArray.length; i++){
            var number = parseInt(this.cardArray[i].textContent)
            if (number > this.highestNumber){
                this.highestNumber = number
            }
        }
        console.log(randomNumber)
        if (this.highestNumber >= 32){
            if (randomNumber >= 100){
                return this.highestNumber / 2
            } else if (randomNumber >= 98){
                return this.highestNumber / 4
            } else if (randomNumber >= 96){
                return this.highestNumber / 8
            } else if (randomNumber >= 93){
                return this.highestNumber / 16
            } else {
                return "2"
            }
        } else {
            return "2"
        }

    }
}

