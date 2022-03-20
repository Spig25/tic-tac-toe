const container = document.querySelector(`.container`)

const gameboard = (() => {
    const array = [`X`, `X`, `O`, `X`, `X`, `O`, `O`, `X`, `O`]
    return {
        array
    }
})()

const personFactory = (name) => {
    return {
        name
    }
}

const drawBoard = () => {
    gameboard.array.forEach((e, index) => {
        const box = document.createElement(`div`)
        box.setAttribute(`data-index`, index)
        box.textContent = `${e}`
        container.appendChild(box)
    })
}

drawBoard()