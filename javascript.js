const container = document.querySelector(`.container`)

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
        gameboard.array.forEach((e, index) => {
            const box = document.createElement(`button`)
            box.setAttribute(`data-index`, index)
            box.classList.add(`box`)
            box.textContent = `${e}`
            container.appendChild(box)
        })
    }
    const toggleBox = (event) => {
        if (event.target.className === `box` && event.target.innerHTML === ``) {
            const index = event.target.getAttribute(`data-index`)
            gameboard.array.splice(index, 1, activePlayer.symbol)
            if (activePlayer === playerOne) {
                activePlayer = playerTwo
            }
            else {
                activePlayer = playerOne
            }
        console.log(activePlayer)
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


document.addEventListener(`click`, (event) => {
    gameboard.toggleBox(event)
})