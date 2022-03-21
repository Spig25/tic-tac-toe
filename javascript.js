const container = document.querySelector(`.container`)
const info = document.querySelector(`.info`)
const start = document.querySelector(`.start`)

const personFactory = (name, symbol) => {
    return {
        name,
        symbol
    }
}

const playerOne = personFactory(`Player 1`, `X`)
const playerTwo = personFactory(`Player 2`, `O`)
let activePlayer = playerOne

const gameboard = (() => {
    const array = [``, ``, ``, ``, ``, ``, ``, ``, ``]
    const drawBoard = () => {
        container.innerHTML = ``
        info.textContent = `${activePlayer.name}'s (${activePlayer.symbol}) turn!`

        gameboard.array.forEach((e, index) => {
            const box = document.createElement(`button`)
            box.setAttribute(`data-index`, index)
            box.classList.add(`box`)
            box.textContent = `${e}`
            container.appendChild(box)
        })
    }
    const toggleBox = (event) => {
        const index = event.target.getAttribute(`data-index`)
        gameboard.array.splice(index, 1, activePlayer.symbol)
        if (activePlayer === playerOne) {
            activePlayer = playerTwo
        }
        else if (activePlayer === playerTwo) {
            activePlayer = playerOne
        }
        else {
            return
        }
        gameboard.drawBoard()

    }

    return {
        array,
        drawBoard,
        toggleBox
    }
})()
gameboard.drawBoard()

const game = (() => {
    const winCombo = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    const checkWin = (arr) => {
        // Iterates through winCombo and on each iteration we will use the arrays that are inside winCombo
        arr.forEach((subArr) => {
            // Uses every number (0,1,2 ... 3,4,5 ... 6,7,8) inside of the arrays (subArr) of winCombo as indexes for gameboard.array (i.e. checks gameboard.array index 0, 1 and 2 to see if they all contain either an X or a O)
            if (subArr.every(element => gameboard.array[element] === playerOne.symbol)) {
                console.log(`player 1 wins`)
                game.disableButtons()
            }
            if (subArr.every(element => gameboard.array[element] === playerTwo.symbol)) {
                console.log(`player 2 wins`)
                game.disableButtons()
            }
        })
    }
    const disableButtons = () => {
        const buttons = container.querySelectorAll(`button`)
        buttons.forEach((e) => {
            e.disabled = true
        })
    }
    const enableButtons = () => {
        const buttons = container.querySelectorAll(`button`)
        buttons.forEach((e) => {
            e.disabled = false
        })
    }
    const startNewGame = () => {
        gameboard.array = [``, ``, ``, ``, ``, ``, ``, ``, ``]
        activePlayer = playerOne
        gameboard.drawBoard()
        game.enableButtons()
    }

    return {
        winCombo,
        checkWin,
        disableButtons,
        enableButtons,
        startNewGame
    }
})()
game.disableButtons()

start.addEventListener(`click`, () => {
    game.startNewGame()
})

container.addEventListener(`click`, (event) => {
    if (event.target.className === `box` && event.target.innerHTML === ``) {
        gameboard.toggleBox(event)
        game.checkWin(game.winCombo)  
    }
})