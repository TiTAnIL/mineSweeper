'use strict'

const gLevel = { SIZE: 4, MINES: 2 }
const gGame = { isOn: false, shownCount: 0, secsPassed: 0 }

const BOMB = '&#128163'
const FLAG = '🚩'
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


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = countNeighbors(i, j, board)
        }
    }
    renderBoard(board)
}


function cellClicked(elCell, i, j) {
    // console.log(gBoard)
    // console.log('clicked: ', elCell, i, j)

    const isFirstClick = gGame.secsPassed === 0 ? setInterval(function () { countSeconds() }, 973) : false

    const currCell = gBoard[i][j]

    if (currCell.isShown || currCell.isMarked) {
        console.log('shown or marked', currCell.isShown)
        return

    } else {
        gGame.shownCount++
        currCell.isShown = true
        elCell.style.color = 'black'
    }
}


function rightMClick(elCell, i, j) {
    const currCell = gBoard[i][j]
    const isFirstClick = gGame.secsPassed === 0 ? setInterval(function () { countSeconds() }, 987) : false
    if (currCell.isMarked) {
        currCell.isMarked = false
        elCell.innerText = ''
    } else {
        
        currCell.isMarked = true
        elCell.innerText = FLAG
        
    }
    // renderCell({i: i, j: j}, FLAG)
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

