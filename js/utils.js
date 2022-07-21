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
            var currCell = board[i][j];
            if (currCell.isMine) {
                strHTML += `<td class="cell" onclick="cellClicked(this, ${i}, ${j})"; oncontextmenu="event.preventDefault(); rightMClick(this, ${i}, ${j})">${BOMB}</td>\n`
            } else {
                strHTML += `<td class="cell" onclick="cellClicked(this, ${i}, ${j})"; oncontextmenu="event.preventDefault(); rightMClick(this, ${i}, ${j})">${currCell.minesAroundCount}</td>\n`
            }
        }
        strHTML += '</tr>\n'
    }


    elTable.innerHTML = strHTML
    elTable.setAttribute("border", "6");
    // console.log(elTable)
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