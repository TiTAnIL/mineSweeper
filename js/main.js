'use strict'

const gLevel = { SIZE: 4, MINES: 2 }
const gGame = { isOn: false, shownCount: 0, secsPassed: 0 }

const BOMB = '&#128163'
const FLAG = '🚩'
let gFlagCount = 0
let gBoard

const elTable = document.getElementById('table')
let elTimer = document.getElementById('timer')


function init() {
    console.log('hello')

    startGame() // for debuging
}


// start the game!
function startGame() {
    gGame.isOn = true
    gBoard = createBoard()
    renderBoard(gBoard)
    scatterMines(gBoard)
    setMinesNegsCount(gBoard)
    //scatterMines(gBoard)
}


// while(gGame.isOn) {
// }

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = countNeighbors(i, j, board)
        }
    }
    renderBoard(board)
}


function cellClicked(elCell, i, j) {

    const firstClickTimer = gGame.secsPassed === 0 ? setInterval(function () { countSeconds() }, 985) : false
    const currCell = gBoard[i][j]

    if (currCell.isMarked || currCell.isShown) {
        return

    } else if (currCell.isMine) {
        elCell.innerHTML = BOMB
        currCell.isShown = true
        checkGameOver(elCell, i, j)
        return

    } else {
        (elCell.innerText = currCell.minesAroundCount)
        currCell.isShown = true
        gGame.shownCount++
        checkGameOver(elCell, i, j)
        return
    }
}


function rightMClick(elCell, i, j) {
    const currCell = gBoard[i][j]
    const isFirstClick = gGame.secsPassed === 0 ? setInterval(function () { countSeconds() }, 985) : false
    if (currCell.isShown) {
        return

    } else if (currCell.isMarked) {
        currCell.isMarked = false
        elCell.innerText = ''

    } else {
        currCell.isMarked = true
        elCell.innerText = FLAG
    }
}


function scatterMines(board) {

    board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = true
    board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = true
    renderBoard(board)
}


function countSeconds() {
    gGame.secsPassed++
    elTimer.innerHTML = gGame.secsPassed
}


function checkGameOver(elCell, i, j) {
    const currCell = gBoard[i][j]
    if (currCell.isMine) {
        console.log('you lose')
    } else if (gGame.shownCount === gLevel.SIZE ** 2 - gLevel.MINES && gGame.MINES === gFlagCount) {
        console.log('you win')
    }
}

function expandShown(board, elCell,
    i, j){

    }


        //      TODO'S
        // win/lose condtions
        // restart game
        // changing smiley in start button
        // reveal neighbor cells if 0 presented
        // ez-med-hard difficulties
        // CSS!
