class Game {
    constructor(createGridElement, drawBoard) {
        this.numbersArray = []
        this.tileArray = []
        this.cardArray = []
        this.createGridElement = createGridElement
        this.drawBoard = drawBoard

    }

    start() {
        for (let i = 0; i < 8; i++) {
            this.numbersArray.push(2)
        }
        this.createBoard(this.tileArray, this.createGridElement)
    }

    createBoard() {
        for (let i = 0; i < 4; i++) {
            for (let i = 0; i < 4; i++) {
                let h2 = this.createGridElement()
                h2.setAttribute('id', `${i}`)
                this.tileArray.push(h2)
            }
        }
        for (let i = 0; i < 7; i++) {
            let randomIndex = Math.floor(Math.random() * 15)
            if (this.tileArray[randomIndex].textContent === "2") {
                i -= 1
                continue
            } else {
                var newCard = new Card(this.tileArray)
                this.tileArray[randomIndex].innerText = this.numbersArray.shift()
            }
            this.cardArray.push(newCard)
        }
        this.drawBoard(this.tileArray)
    }

    
}

class Card {
    constructor(cardArray) {
        this.cardArray = cardArray
        this.topRow = []
        this.secondRow = []
        this.thirdRow = []
        this.bottomRow = []
        this.leftColumn = []
        this.midLeftColumn = []
        this.midRightColumn = []
        this.rightColumn = []
        this.highestNumber = 0
        this.score = 0
        this.outOfMoveCounter = []
        this.noMoveCounter = 0
        this.isActive = true
    }
    
    moveHorizontally(direction, id) {

        if (this.isActive === false){
            return
        }
        
        this.changeArrayDirection()

        this.moveImpossible = true
        this.moveRows(this.topRow, direction, id)
        this.moveRows(this.secondRow, direction, id)
        this.moveRows(this.thirdRow, direction, id)
        this.moveRows(this.bottomRow, direction, id)

        if (this.noMoveCounter < 16){
            this.newTile(direction)
        } else {
            this.newTile(direction, false)
        }
        this.noMoveCounter = 0

        this.getClass()

        this.getScore()
        document.getElementById('score-el').textContent = this.score
        document.getElementById('timer-score-el').textContent = this.score
        document.getElementById('highestTileEl').textContent = this.highestNumber

        if (this.highestNumber === "2048"){
            document.getElementById('victory-menu').classList.remove('hide')
        }
    }
    
    moveVertically(direction, id) {
        if (this.isActive === false){
            return
        }
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

        this.moveRows(this.leftColumn, direction, id)
        this.moveRows(this.midLeftColumn, direction, id)
        this.moveRows(this.midRightColumn, direction, id)
        this.moveRows(this.rightColumn, direction, id)
        
        if (this.noMoveCounter < 16){
            this.newTile(direction)
        } else {
            this.newTile(direction, false)
        }

        this.noMoveCounter = 0
        this.getClass()

        this.getScore()
        document.getElementById('score-el').textContent = this.score
        document.getElementById('timer-score-el').textContent = this.score
        document.getElementById('highestTileEl').textContent = this.highestNumber

        // reverts array direction and clears them for next movement
        this.changeArrayDirection()
        this.generateId(this.topRow)
        this.generateId(this.secondRow)
        this.generateId(this.thirdRow)
        this.generateId(this.bottomRow)

        if (this.highestNumber === "2048"){
            document.getElementById('scoreEl').textContent = this.score 
            document.getElementById('victory-menu').classList.toggle('hide')
        }

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
                    this.noMoveCounter++
                    // make sure the elements can't move out of bounds
                } else if (row[index].textContent) {
                    if (row[index].textContent === element.textContent) {
                        row[index].classList.toggle("turned")
                        row[index].textContent *= 2
                        element.textContent = ''
                    } else {
                        this.noMoveCounter++
                    }
                } else {
                    row[index].textContent = element.textContent
                    element.textContent = ""
                    
                }
            } else {
                this.noMoveCounter++
            }
        })
        if (direction === 'right' || direction === 'down') {
            row.reverse()
        }
    }

    newTile(direction, boolean){
        switch (direction) {
            case 'left':
                this.findEmptySquare(3, this.topRow, this.secondRow, this.thirdRow, this.bottomRow, boolean)
                break;
            case 'right':
                this.findEmptySquare(0, this.topRow, this.secondRow, this.thirdRow, this.bottomRow, boolean)
                break;
            case 'up':
                this.findEmptySquare(3, this.rightColumn, this.midRightColumn, this.midLeftColumn, this.leftColumn, boolean)
                break;
            case 'down':
                this.findEmptySquare(0, this.rightColumn, this.midRightColumn, this.midLeftColumn, this.leftColumn, boolean)
                break;
        }
    }

    findEmptySquare(index, arrayOne, arrayTwo, arrayThree, arrayFour, boolean){
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
        if(emptyTileArray.length > 0){
            if (boolean === undefined){
                let randomIndex = Math.floor(Math.random() * emptyTileArray.length)
                emptyTileArray[randomIndex].textContent = this.generateNewNumber()
                this.outOfMoveCounter = []
            }
        } 
        let numberOfTiles = []
        this.cardArray.forEach( element => {
            if (element.textContent){
                numberOfTiles.push(element)
            }
        })
        if (numberOfTiles.length === 16){
            this.isActive = false
            setTimeout( () => {
                document.getElementById('score-el').textContent = this.score 
                document.getElementById('game-over-menu').classList.remove('hide')
            }, 1500)

        }
    }

    generateNewNumber(){
        let randomNumber = Math.floor(Math.random() * 200 + 1)
        for (let i = 0; i < this.cardArray.length; i++){
            var number = parseInt(this.cardArray[i].textContent)
            if (number > this.highestNumber){
                this.highestNumber = number
            }
        }
        if (this.highestNumber >= 32){
            if (randomNumber >= 200){
                return this.highestNumber / 2
            } else if (randomNumber >= 198){
                return this.highestNumber / 4
            } else if (randomNumber >= 196){
                return this.highestNumber / 8
            } else if (randomNumber >= 180) {
                return "4"
            } else {
                return "2"
            }
        } else {
            return "2"
        }

    }

    getScore(){
        this.score = 0
        for (let i = 0; i < this.cardArray.length; i++){
            let parsed = parseInt(this.cardArray[i].textContent)
            if (!isNaN(parsed)){
                this.score += Math.round((parsed * Math.sqrt(parsed)))
            }  
        }
        return this.score
    }

    getClass(){
        this.cardArray.forEach( el => {
            let element = el.textContent

            switch (element) {
                case '2':
                    el.style = "background: #ff0000"
                    break;
                case '4':
                    el.style = "background: #ffff00;"
                    break;
                case '8':
                    el.style = "background: #fffdd0;"
                    break;
                case '16':
                    el.style = "background: #f54287;"
                    break;
                case '32':
                    el.style = "background: #0000ff;"
                    break;
                case '64':
                    el.style = "background: #ff00ff;"
                    break;
                case '128':
                    el.style = "background: #80ff00;"
                    break;
                case '256':
                    el.style = "background: #00ff80;"
                    break;
                case '512':
                    el.style = "background: #0080ff;"
                    break;
                case '1024':
                    el.style = "background: #8000ff;"
                    break;
                case '2048':
                    el.style = "background: #ff0080;"
                    break;
                default:
                    el.style = "background: #c51350;"
                    break;
            }
        })

    }
}


