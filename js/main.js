'use strict'

const gLevel = { SIZE: 4, MINES: 2 }
const gGame = { isOn: false, shownCount: 0, secsPassed: 0 }

let timer
let gFirstClickTimer = true
const BOMB = '&#128163'
const FLAG = '🚩'
let gFlagCount = 0
let gBoard

const normalFace = '😀'
const loseFace = '😞'
const winFace = '😎'

const elTable = document.getElementById('table')
const elTimer = document.getElementById('timer')
const elFlag = document.getElementById('flags')
const elStartButton = document.getElementById('start-button')


function init() {
    console.log('hello')
    startGame() // for debuging
}


// start the game!
function startGame() {
    stopClock()
    gFirstClickTimer = true
    elTimer.innerHTML = 0
    gGame.secsPassed = 0
    gGame.isOn = true
    elStartButton.innerHTML = normalFace
    gBoard = createBoard()
    renderBoard(gBoard)
    scatterMines(gBoard)
    setMinesNegsCount(gBoard)
}


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = countNeighborMines(i, j, board)
        }
    }
    renderBoard(board)
}

function startClock() {
    gGame.secsPassed++
    elTimer.innerHTML = gGame.secsPassed

}

function stopClock() {
    clearInterval(timer)
}

function cellClicked(elCell, i, j) {

    if (gFirstClickTimer === true) {
        timer = setInterval(function () { startClock() }, 1000);
        gFirstClickTimer = false
    }

    const currCell = gBoard[i][j]
    if (currCell.isMarked || currCell.isShown) {
        return

    } else if (currCell.isMine) {
        elCell.innerHTML = BOMB
        currCell.isShown = true
        checkGameOver(i, j)
        return

    } else {
        elCell.innerText = currCell.minesAroundCount
        currCell.isShown = true
        gGame.shownCount++
        checkGameOver(i, j)
        //expandShown(gBoard, i , j, elCell)
        return
    }
}


function rightMClick(elCell, i, j) {

    if (gFirstClickTimer === true) {
        timer = setInterval(function () { startClock() }, 1000);
        gFirstClickTimer = false
    }

    const currCell = gBoard[i][j]
    //gFirstClickTimer = gGame.secsPassed === 0 ? setInterval(function () { startClock() }, 1000) : gFirstClickTimer
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


function checkGameOver(i, j) {
    const currCell = gBoard[i][j]
    if (gGame.shownCount == gLevel.SIZE ** 2 - gLevel.MINES && gFlagCount == gLevel.MINES) {
        elStartButton.innerHTML = winFace
        stopClock()
        console.log('you win')

    } else if (currCell.isMine && !currCell.isMarked) {
        elStartButton.innerHTML = loseFace
        stopClock()
        console.log('you lose')
    }
}





function expandShown(board, cellI, cellJ, elCell) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[0].length) continue;
            const currNeighbour = board[i][j]
            if (currNeighbour.minesAroundCount !== 0 ) {
                return
            }
            // else {
            //     board[i][j].innerHTML = board[i][j].minesAroundCount
            //     currNeighbour.innerText = currNeighbour.minesAroundCount
            //     currNeighbour.isShown = true
            //     gGame.shownCount++
            // }
        }
    }
}


        //      TODO'S
        // reveal neighbor cells if 0 presented
        
        // css for win lose condtions
        
        // changing smiley in start button
        // ez-med-hard difficulties

        // first move never a bomb
        // CSS!
