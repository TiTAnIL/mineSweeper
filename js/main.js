'use strict'

const bomb = '&#128163'
let gBoard
const gBoardSize = 8
const elTable = document.getElementById('table')


function init() {
console.log('hello')
startGame() // for debuging
}


function startGame() {
    gBoard = createBoard()
    renderBoard(gBoard)
    console.log(renderBoard())
}


function scatterMines() {
    
}