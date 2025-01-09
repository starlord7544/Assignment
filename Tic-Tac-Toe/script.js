const board = document.getElementById('board')
const player = document.querySelector('.indicator')
const reset = document.querySelector('.reset')
const start = document.querySelector('.start')
const header = document.getElementById('title')
const kitty = document.querySelector('.kitty')
createDiv()
let allBoxes = Array.from(document.querySelectorAll('.boxes'))

let turn = true
let cnt = 0;
if (turn)
    player.textContent = `Player 1's move ( X )`
else
    player.textContent = `Player 2's move ( O )`


const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


function createDiv() {
    for (let i = 1; i <= 9; i++) {
        const tempDiv = document.createElement('div')
        tempDiv.classList.add('boxes');
        tempDiv.classList.add(`box${i}`)
        board.appendChild(tempDiv)
        tempDiv.addEventListener('click', function () {
            if (tempDiv.textContent != "")
                return
            updateDisplay(turn, tempDiv)
            turn = !turn
            check_win()
        })
    }
}

function updateDisplay(turn, tempDiv) {
    if (turn === true) {
        tempDiv.textContent = 'X';
        player.textContent = `Player 2's move ( O )`
    }
    else {
        tempDiv.textContent = 'O'
        player.textContent = `Player 1's move ( X )`
    }
    cnt++;
}

function check_win() {
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if ((allBoxes[a].textContent === allBoxes[b].textContent
            && allBoxes[b].textContent === allBoxes[c].textContent)
            && (allBoxes[a].textContent != ""))
            updateWin(allBoxes[a].textContent, a, b, c)
    }
    if (cnt === 9) {
        updateWin(-1, -1, -1, -1,)
    }
}

function updateWin(Plyr, i1, i2, i3) {
    board.style.opacity = '0.5'
    board.style.pointerEvents = 'none'
    reset.style.display = 'flex'
    if (Plyr === -1)
        player.innerHTML = 'Draw &nbsp :( &nbsp Boring'
    else {
        let winner;
        if (Plyr === 'X')
            winner = 1
        else
            winner = 2
        player.textContent = `Player ${winner} won the game`
        allBoxes[i1].style.backgroundColor = 'rgba(255, 255, 255, 0.7)'
        allBoxes[i2].style.backgroundColor = 'rgba(255, 255, 255, 0.7)'
        allBoxes[i3].style.backgroundColor = 'rgba(255, 255, 255, 0.7)'
        allBoxes[i1].style.borderRadius = '10px'
        allBoxes[i2].style.borderRadius = '10px'
        allBoxes[i3].style.borderRadius = '10px'
        kitty.style.opacity = '1'
    }
}
function clearBoxes() {
    allBoxes.forEach(box => {
        box.textContent = ""
    })
}

reset.addEventListener('click', function () {
    cnt = 0
    board.textContent = ""
    board.style.pointerEvents = 'all'
    board.style.opacity = '1'
    kitty.style.opacity = '0'
    if (turn)
        player.textContent = `Player 1's move ( X )`
    else
        player.textContent = `Player 2's move ( O )`
    createDiv()
    clearBoxes()
    allBoxes = Array.from(document.querySelectorAll('.boxes'))
})
start.addEventListener('click', function () {
    header.classList.remove('head')
    start.style.display = 'none'
    board.style.display = 'flex'
    player.style.display = 'block'
    reset.style.display = 'flex'
})

