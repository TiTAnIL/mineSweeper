'use strict'

// function createMat(ROWS, COLS) {
//     var mat = []
//     for (var i = 0; i < ROWS; i++) {
//         var row = []
//         for (var j = 0; j < COLS; j++) {
//             row.push('')
//         }
//         mat.push(row)
//     }
//     return mat
// }

// function printMat(mat, selector) {

//     var strHTML = '<table border="0"><tbody>'
//     for (var i = 0; i < mat.length; i++) {

//         strHTML += '<tr>'
//         for (var j = 0; j < mat[0].length; j++) {

//             const cell = mat[i][j]
//             const className = 'cell cell-' + i + '-' + j
//             strHTML += `<td class="${className}">${cell}</td>`
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>'

//     const elContainer = document.querySelector(selector)
//     elContainer.innerHTML = strHTML
// }

function createBoard() {
    var board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])

        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = { minesAroundCount: null, isShown: true, isMine: false, isMarked: false }
        }
    }
    return board
}


function renderBoard(board) {
    var strHTML = ''
    board[0][0].isMine = true
    board[3][3].isMine = true

    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < gLevel.SIZE; j++) {
            var currCell = board[i][j];
            if (currCell.isMine) {
                strHTML += `<td>${BOMB}</td>\n`
            } else {
                strHTML += `<td></td>\n`
            }
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


function countNeighbors(cellI, cellJ, mat) {
    let numOfNeighbors = 0
    
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[0].length) continue;
            if (mat[i][j].isMine) numOfNeighbors++  ;
        }
    }
    return numOfNeighbors;
}