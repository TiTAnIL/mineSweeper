'use strict'

let gLevel = { SIZE: 4, MINES: 2 }
const gGame = { isOn: false, shownCount: 0, secsPassed: 0 }

let difficulty

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


function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}


window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


function chooseDiff(elClicked) {
    switch (elClicked.innerHTML) {
        case 'Easy':
            gLevel = { SIZE: 4, MINES: 2 }
            renderBoard(gBoard)
            startGame()

            break
        case 'Medium':
            gLevel = { SIZE: 8, MINES: 12 }
            renderBoard(gBoard)
            startGame()

            break
        case 'Hard':
            gLevel = { SIZE: 12, MINES: 30 }
            renderBoard(gBoard)
            startGame()

            break
        default:
            console.log('Choosing Difficulty has Difficulties')
    }
}


// start the game!
function startGame() {
    stopClock()
    gFirstClickTimer = true
    elFlag.innerHTML = FLAG + gLevel.MINES
    elTimer.innerHTML = 0
    gGame.secsPassed = 0
    gGame.isOn = true
    gGame.shownCount = 0
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


function isFirstClick() {
    if (gFirstClickTimer === true) {
        timer = setInterval(function () { startClock() }, 1000);
        gFirstClickTimer = false
        return true
    }
    return false
}


function isMine(i, j) {
    if (gBoard[i][j].isMine) {
        return true
    }
    return false
}


function cellClicked(elCell, i, j) {
    if (gGame.isOn) {
        if (isFirstClick() && isMine(i, j)) {
            console.log('fsd')
            scatterMines(gBoard)
            setMinesNegsCount(gBoard)
        } else {

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
    }
}


function rightMClick(elCell, i, j) {
    const currCell = gBoard[i][j]
    if (gGame.isOn) {
        

        if (currCell.isShown) {
            return

        } else if (currCell.isMarked) {
            currCell.isMarked = false
            elCell.innerText = ''
            --gFlagCount
            let flagsLeft = gLevel.MINES - gFlagCount
            elFlag.innerHTML = FLAG + flagsLeft

        } else {
            currCell.isMarked = true
            elCell.innerText = FLAG
            ++gFlagCount
            let flagsLeft = gLevel.MINES - gFlagCount
            elFlag.innerHTML = FLAG + flagsLeft
            checkGameOver(i, j)
        }
    }
}


function scatterMines(board) {
    let count = 0
    while (count != gLevel.MINES) {
        const row = getRandomInt(0, gLevel.SIZE)
        const col = getRandomInt(0, gLevel.SIZE)
        if (board[row][col].isMine === false) {
            console.log(row, col, ' is free')
            board[row][col].isMine = true
            count++
        } else {
            console.log(row, col, 'ocupied')
        }
    }
    renderBoard(board)
}


function checkGameOver(i, j) {
    const currCell = gBoard[i][j]

    if (gGame.shownCount == gLevel.SIZE ** 2 - gLevel.MINES && gFlagCount == gLevel.MINES) {
        console.log('you win')
        elStartButton.innerHTML = winFace
        stopClock()
        gGame.isOn = false

    } else if (currCell.isMine && !currCell.isMarked) {
        console.log('you lose')
        elStartButton.innerHTML = loseFace
        stopClock()
        gGame.isOn = false
    }
}


function expandShown(board, cellI, cellJ, elCell) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[0].length) continue;
            const currNeighbour = board[i][j]
            if (currNeighbour.minesAroundCount !== 0) {
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

// first move never a bomb
// CSS!


