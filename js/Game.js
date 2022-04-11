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

        console.log(this.topRow)

        this.moveRowsHorizontally(this.topRow, direction, id)
        this.moveRowsHorizontally(this.secondRow, direction, id)
        this.moveRowsHorizontally(this.thirdRow, direction, id)
        this.moveRowsHorizontally(this.bottomRow, direction, id)

        this.updateBoard(this.topRow, this.secondRow, this.thirdRow, this.bottomRow)
        
    }

    moveVertically(direction, id){
        // this.cardArray.forEach( element =>{
        //     if (element.id === "0") {
        //         this.leftColumn.push(element)
        //     } else if (element.id === '1') {
        //         this.midLeftColumn.push(element)
        //     } else if (element.id === '2') {
        //         this.midRightColumn.push(element)
        //     } else if (element.id === '3') {
        //         this.rightColumn.push(element)
        //     }
        // })

        this.cardArray.forEach(element => {
            if (this.topRow.length < 4) {
                this.leftColumn.push(element)
            } else if (this.midLeftColumn.length < 4) {
                this.midLeftColumn.push(element)
            } else if (this.midRightColumn.length < 4) {
                this.midRightColumn.push(element)
            } else if (this.rightColumn.length < 4) {
                this.rightColumn.push(element)
            }
        })

        console.log(this.cardArray)

        
        this.generateId(this.leftColumn)
        this.generateId(this.midLeftColumn)
        this.generateId(this.midRightColumn)
        this.generateId(this.rightColumn)
        
        this.moveRowsVerically(this.leftColumn, direction, id)
        this.moveRowsVerically(this.midLeftColumn, direction, id)
        this.moveRowsVerically(this.midRightColumn, direction, id)
        this.moveRowsVerically(this.rightColumn, direction, id)
        
        console.log(this.midLeftColumn)
        this.updateBoard(this.leftColumn, this.midLeftColumn, this.midRightColumn, this.rightColumn)
    }

    generateId(array){
        array.forEach( (element, index) => {
            element.id = index
        })
    }

    moveRowsVerically(row, direction, id){
        if (direction === 'up') {
            row.reverse()
        }
        row.forEach((element, index) => {
            if (index >= 1) {
                index--
            }
            if (element.textContent) {
                if (element.id === id) {
                    // make sure the elements can't move out of bounds
                } 
                 if (row[index].textContent) {
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
        if (direction === 'right') {
            row.reverse()
        }
    }




    moveRowsHorizontally(row, direction, id) {
        if (direction === 'right') {
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
        if (direction === 'right') {
            row.reverse()
        }
    }
}





