'use strict'

function createBoard() {
    var board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])

        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }
        }
    }
    return board
}


function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < gLevel.SIZE; j++) {
            strHTML += `<td class="cell" id="${i},${j}" onclick="cellClicked(this, ${i}, ${j})"; oncontextmenu="event.preventDefault(); rightMClick(this, ${i}, ${j})"></td>\n`
        }
        strHTML += '</tr>\n'
    }

    elTable.innerHTML = strHTML
    elTable.setAttribute("border", "6");
    return board
}


// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function randomColor() {
    return 'rgb(' + getRandomIntInt(0, 255) + ', ' + getRandomIntInt(0, 255) + ', ' + getRandomIntInt(0, 255) + ')';
}


// Create numbers array (destinetion) Ex. arrayTo(10, 15) INCLUSIVE
function arrayTo(start, end) {
    return [...Array(end - start).keys()].map(i => i + start);
}


//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


function shuffledNums() {
    // Shuffle numbers in array
    var shuffleNums = (arr) => arr.sort(() => 0.5 - Math.random())
    var nums = arrayTo(1, 17)
    return nums = shuffleNums(nums)
}
//var shuffleNumArray = (arr) => arr.sort(() => 0.5 - Math.random());


// TODO: check if can be added as a function
// setTimeout(function() {
//     console.log('123')
// }, 3000);


function countNeighborMines(cellI, cellJ, board) {
    let numOfNeighbors = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isMine) numOfNeighbors++;
        }
    }
    return numOfNeighbors;
}


function isCellEmpty(board) {
    for (i = 0; i < board.length; i++) {
        for (j = 0; j < board.length; j++) {
            if (!board[i][j].isMine) {
                return true
            }
        }
    }
}

// function isNeighborEmptyCell(board, cellI, cellJ) {
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= board.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (i === cellI && j === cellJ) continue;
//             if (j < 0 || j >= board[0].length) continue;
//             if (board[i][j].isMine && board[i][j].isShown) {
//                 console.log(i,j)
//             }
//             else {
//                 return false
//             }
//         }
//     }
// }