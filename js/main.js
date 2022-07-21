'use strict'

const gLevel = { SIZE: 4, MINES: 2 }
const gGame = { isOn: false, shownCount: 0, secsPassed: 0 }

const BOMB = '&#128163'
const FLAG = '&#128681'
let gBoard

const elTable = document.getElementById('table')
let elTimer = document.getElementById('timer')


function init() {
    console.log('hello')
    elTable.addEventListener('contextmenu', e => {
        onRightMouseClick(e)
        e.preventDefault()
      })
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
    
    const isFirstClick = gGame.secsPassed === 0 ? setInterval(function () { countSeconds() }, 1000) : false
    
    const currCell = gBoard[i][j]

    if (currCell.isShown) {
        console.log('isShown', currCell.isShown)
        return

    } else {
        console.log('Cell clicked: ', elCell, i, j)
        gGame.shownCount++
        console.log(gGame.shownCount)
        currCell.isShown = true
        elCell.style.color = 'black'
    }
}


function scatterMines(board) {

    board[getRandomInt(0,4)][getRandomInt(0,4)].isMine = true
    board[getRandomInt(0,4)][getRandomInt(0,4)].isMine = true
    renderBoard(board)
}


function countSeconds() {
    gGame.secsPassed++
    elTimer.innerHTML = gGame.secsPassed

}


function onRightMouseClick(el) {
    console.log('RMClick', el)
}