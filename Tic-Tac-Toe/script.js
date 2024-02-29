const board = document.getElementById('board')
const player = document.querySelector('.indicator')
const winMsg = document.querySelector('.winMsg')
const body = document.querySelector('body')
const reset  = document.querySelector('.reset')
const start = document.querySelector('.start')
createDiv()
const allBoxes = Array.from(document.querySelectorAll('.boxes'))
// console.log(allBoxes)

let turn = true;
let cnt = 0;

function createDiv () {
    for (let i=1; i<=9; i++) {
        const tempDiv = document.createElement('div')
        tempDiv.classList.add('boxes');
        board.appendChild(tempDiv)
        tempDiv.addEventListener('click', function() {
            updateDisplay(turn , tempDiv)
            turn = !turn
            check_win ()
        })
    }
}

function updateDisplay (turn, tempDiv) {
    if (tempDiv.textContent === 'X' || tempDiv.textContent === 'O') {
        return
    }
    else if (turn === true) {
        tempDiv.textContent = 'X';
        player.textContent = `Player O's move`
    }
    else{
        tempDiv.textContent = 'O'
        player.textContent = `Player X's move`
    }
    cnt++;
    console.log(cnt)
}

function check_win () {
    if      ((allBoxes[0].textContent ===  allBoxes[1].textContent && allBoxes[1].textContent === allBoxes[2].textContent) && (allBoxes[1].textContent != "")) {
        updateWin (allBoxes[1].textContent)
    }
    else if ((allBoxes[3].textContent === allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[5].textContent) && (allBoxes[4].textContent != "")) {
        updateWin (allBoxes[4].textContent)
    }
    else if ((allBoxes[6].textContent ===  allBoxes[7].textContent && allBoxes[7].textContent === allBoxes[8].textContent) && (allBoxes[7].textContent != "")) {
        updateWin (allBoxes[7].textContent)
    }
    else if ((allBoxes[0].textContent ===  allBoxes[3].textContent && allBoxes[3].textContent === allBoxes[6].textContent) && (allBoxes[3].textContent != "")) {
        updateWin (allBoxes[3].textContent)
    }
    else if ((allBoxes[1].textContent ===  allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[7].textContent) && (allBoxes[4].textContent != "")) {
        updateWin (allBoxes[4].textContent)
    }
    else if ((allBoxes[2].textContent ===  allBoxes[5].textContent && allBoxes[5].textContent === allBoxes[8].textContent) && (allBoxes[5].textContent != "")) {
        updateWin (allBoxes[5].textContent)
    }
    else if ((allBoxes[0].textContent ===  allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[8].textContent) && (allBoxes[4].textContent != "")) {
        updateWin (allBoxes[4].textContent)
    }
    else if ((allBoxes[2].textContent ===  allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[6].textContent) && (allBoxes[4].textContent != "")) {
        updateWin (allBoxes[4].textContent)
    }
    else if (cnt === 9) {
        updateWin (-1)
    }
}

function updateWin(Plyr) {
    board.style.opacity = '0.5'
    board.style.pointerEvents = 'none'
    winMsg.style.display = 'block'
    reset.style.display = 'block'
    // body.style.backgroundColor = 'rgb(28, 47, 47)'
    if (Plyr === -1)
    winMsg.textContent = `Draw  :( \tBoring`
    else
    winMsg.textContent = `player ${Plyr} won`
}
function clearBoxes () {
    for (let i=0; i<9; i++) {
        allBoxes[i].textContent = ""
    }
}

reset.addEventListener('click', function () {
    // reset.style.display = 'none'
    // cnt = 0
    // winMsg.style.display = 'none'
    // board.textContent = "";
    // board.style.pointerEvents = 'all'
    // board.style.opacity = '1'
    // createDiv()
    // clearBoxes()
    // allBoxes = Array.from(document.querySelectorAll('.boxes'))
    start.click()
    window.location.reload()

})
start.addEventListener('click' , function () {
    start.style.display = 'none'
    board.style.display = 'flex'
    player.style.display = 'block'
})

