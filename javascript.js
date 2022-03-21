const container = document.querySelector(`.container`)
const info = document.querySelector(`.info`)

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
        console.log(gameboard.array)
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
        arr.forEach((combo) => {
            // Uses every number (0,1,2 ... 3,4,5 ... 6,7,8) inside of the arrays (combo) of winCombo as indexes for gameboard.array (i.e. checks gameboard.array index 0, 1 and 2 to see if they all contain either an X or a O)
            if (combo.every(element => gameboard.array[element] === playerOne.symbol)) {
                console.log(`player 1 wins`)
            }
            if (combo.every(element => gameboard.array[element] === playerTwo.symbol)) {
                console.log(`player 2 wins`)
            }
        })
    }

    return {
        winCombo,
        checkWin
    }
})()

container.addEventListener(`click`, (event) => {
    if (event.target.className === `box` && event.target.innerHTML === ``) {
        gameboard.toggleBox(event)
        game.checkWin(game.winCombo)  
    }
})