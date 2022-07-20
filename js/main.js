'use strict'

const gLevel = { SIZE: 4, MINES: 2 }
const gGame = { isOn: false, shownCount: 0, secsPassed: 0 }

const BOMB = '&#128163'
let gBoard

const elTable = document.getElementById('table')

function init() {
    console.log('hello')
    startGame() // for debuging
}


function startGame() {
    gBoard = createBoard()
    renderBoard(gBoard)
    setMinesNegsCount(gBoard)
    //scatterMines(gBoard)
}


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].countNeighbors = countNeighbors(i, j, board)
        }
    }
    console.log(renderBoard(gBoard))
}

function cellClicked(elCell, i, j) {
    console.log('clicked: ', elCell, i, j)
}