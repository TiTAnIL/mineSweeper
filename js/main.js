'use strict'

const gLevel = { SIZE: 4, MINES: 2 }
const gGame = { isOn: false, shownCount: 0, secsPassed: 0 }

let firstClickTimer
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

    firstClickTimer = gGame.secsPassed === 0 ? setInterval(function () { countSeconds() }, 985) : firstClickTimer
    const currCell = gBoard[i][j]

    if (currCell.isMarked || currCell.isShown) {
        return

    } else if (currCell.isMine) {
        elCell.innerHTML = BOMB
        currCell.isShown = true
        checkGameOver(i, j)
        return

    } else {
        (elCell.innerText = currCell.minesAroundCount)
        currCell.isShown = true
        gGame.shownCount++
        checkGameOver(i, j)
        return
    }
}


function rightMClick(elCell, i, j) {
    const currCell = gBoard[i][j]
    firstClickTimer = gGame.secsPassed === 0 ? setInterval(function () { countSeconds() }, 985) : firstClickTimer
    if (currCell.isShown) {
        return

    } else if (currCell.isMarked) {
        currCell.isMarked = false
        elCell.innerText = ''
        --gFlagCount

    } else {
        currCell.isMarked = true
        elCell.innerText = FLAG
        ++gFlagCount
        checkGameOver(i, j)

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


function checkGameOver(i, j) {
    const currCell = gBoard[i][j]
    if (gGame.shownCount == gLevel.SIZE ** 2 - gLevel.MINES && gFlagCount == gLevel.MINES) {
        clearInterval(firstClickTimer)
        alert('you win')
    } else if (currCell.isMine && !currCell.isMarked) {
        clearInterval(firstClickTimer)
        alert('you lose')
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
        // first move never a bomb
        // CSS!
