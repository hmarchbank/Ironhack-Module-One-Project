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
        this.updateBoard = updateBoard
        this.createEl = createGridElement
        this.topRow = []
        this.secondRow = []
        this.thirdRow = []
        this.bottomRow = []
        this.leftColumn = []
        this.midLeftColumn = []
        this.midRightColumn = []
        this.rightColumn = []
    }

    moveHorizontally(direction, id) {
        if (direction === "left" || direction === "right"){
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


        // this.generateId(this.topRow)
        // this.generateId(this.secondRow)
        // this.generateId(this.thirdRow)
        // this.generateId(this.bottomRow)


        this.moveRowsHorizontally(this.topRow, direction, id)
        this.moveRowsHorizontally(this.secondRow, direction, id)
        this.moveRowsHorizontally(this.thirdRow, direction, id)
        this.moveRowsHorizontally(this.bottomRow, direction, id)

        // this.leftColumn = []
        // this.midLeftColumn = []
        // this.midRightColumn = []
        // this.rightColumn = []

        // this.updateBoard(this.topRow, this.secondRow, this.thirdRow, this.bottomRow)
        
    }

    moveVertically(direction, id){
        for (let i = 0; i < this.cardArray.length; i++){
            if (this.cardArray[i].id === '0'){
            this.leftColumn.push(this.cardArray[i])
            } else if (this.cardArray[i].id === '1'){
                this.midLeftColumn.push(this.cardArray[i])
            } else if (this.cardArray[i].id === '2'){
                this.midRightColumn.push(this.cardArray[i])
            } else if (this.cardArray[i].id === '3'){
                this.rightColumn.push(this.cardArray[i])
            }
        }

        // prepares arrays for vertical movement
        this.generateId(this.leftColumn)
        this.generateId(this.midLeftColumn)
        this.generateId(this.midRightColumn)
        this.generateId(this.rightColumn)


        
        this.moveRowsHorizontally(this.leftColumn, direction, id)
        this.moveRowsHorizontally(this.midLeftColumn, direction, id)
        this.moveRowsHorizontally(this.midRightColumn, direction, id)
        this.moveRowsHorizontally(this.rightColumn, direction, id)


        //  Return arrays to original state
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

        this.generateId(this.topRow)
        this.generateId(this.secondRow)
        this.generateId(this.thirdRow)
        this.generateId(this.bottomRow)


        this.leftColumn = []
        this.midLeftColumn = []
        this.midRightColumn = []
        this.rightColumn = []
        
        // this.updateBoard(this.leftColumn, this.midLeftColumn, this.midRightColumn, this.rightColumn)
    }

    generateId(array){
        array.forEach( (element, index) => {
            element.id = index
        })
    }

    moveRowsVerically(row, direction, id){
        console.log(row)
        if (direction === 'down') {
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
                        row[index].textContent *= 2
                        element.textContent = ''
                    }
                } else {
                    row[index].textContent = element.textContent
                    element.textContent = ""
                }
            }
        })
        if (direction === 'down') {
            row.reverse()
        }
    }




    moveRowsHorizontally(row, direction, id) {
        if (direction === 'right' ||  direction === 'down') {
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
                        row[index].textContent *= 2
                        element.textContent = ''
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
}





