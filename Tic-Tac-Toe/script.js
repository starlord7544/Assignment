const board = document.getElementById('board')
const player = document.querySelector('.indicator')
const reset  = document.querySelector('.reset')
const start = document.querySelector('.start')
const header = document.getElementById('title')
createDiv()
let allBoxes = Array.from(document.querySelectorAll('.boxes'))

let turn = true
let cnt = 0;
if (turn)
player.textContent = `Player 1's move ( X )`
else
player.textContent = `Player 2's move ( O )`


function createDiv () {
    for (let i=1; i<=9; i++) {
        const tempDiv = document.createElement('div')
        tempDiv.classList.add('boxes');
        tempDiv.classList.add(`box${i}`)
        board.appendChild(tempDiv)
        tempDiv.addEventListener('click', function() {
            if (tempDiv.textContent != "") 
                return
            updateDisplay(turn , tempDiv)
            turn = !turn
            check_win ()
        })
    }
}

function updateDisplay (turn, tempDiv) {
    if (turn === true) {
        tempDiv.textContent = 'X';
        player.textContent = `Player 2's move ( O )`
    }
    else{
        tempDiv.textContent = 'O'
        player.textContent = `Player 1's move ( X )`
    }
    cnt++;
}

function check_win () {
    if      ((allBoxes[0].textContent ===  allBoxes[1].textContent && allBoxes[1].textContent === allBoxes[2].textContent) && (allBoxes[1].textContent != "")) {
        updateWin (allBoxes[1].textContent , 0, 1, 2)
    }
    else if ((allBoxes[3].textContent === allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[5].textContent) && (allBoxes[4].textContent != "")) {
        updateWin (allBoxes[4].textContent , 3, 4, 5)
    }
    else if ((allBoxes[6].textContent ===  allBoxes[7].textContent && allBoxes[7].textContent === allBoxes[8].textContent) && (allBoxes[7].textContent != "")) {
        updateWin (allBoxes[7].textContent , 6, 7, 8)
    }
    else if ((allBoxes[0].textContent ===  allBoxes[3].textContent && allBoxes[3].textContent === allBoxes[6].textContent) && (allBoxes[3].textContent != "")) {
        updateWin (allBoxes[3].textContent , 0, 3, 6)
    }
    else if ((allBoxes[1].textContent ===  allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[7].textContent) && (allBoxes[4].textContent != "")) {
        updateWin (allBoxes[4].textContent , 1, 4, 7)
    }
    else if ((allBoxes[2].textContent ===  allBoxes[5].textContent && allBoxes[5].textContent === allBoxes[8].textContent) && (allBoxes[5].textContent != "")) {
        updateWin (allBoxes[5].textContent , 2, 5, 8)
    }
    else if ((allBoxes[0].textContent ===  allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[8].textContent) && (allBoxes[4].textContent != "")) {
        updateWin (allBoxes[4].textContent , 0, 4, 8)
    }
    else if ((allBoxes[2].textContent ===  allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[6].textContent) && (allBoxes[4].textContent != "")) {
        updateWin (allBoxes[4].textContent , 2, 4, 6)
    }
    else if (cnt === 9) {
        updateWin (-1 , -1, -1, -1,)
    }
}

function updateWin(Plyr , i1 , i2 , i3) {
    board.style.opacity = '0.5'
    board.style.pointerEvents = 'none'
    reset.style.display = 'flex'
    if (Plyr === -1)
    player.innerHTML = 'Draw &nbsp :( &nbsp Boring'
    else{
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
    }
}
function clearBoxes () {
    allBoxes.forEach(box => {
        box.textContent = ""
    })
}

reset.addEventListener('click', function () {
    cnt = 0
    board.textContent = ""
    board.style.pointerEvents = 'all'
    board.style.opacity = '1'
    if (turn)
    player.textContent = `Player 1's move ( X )`
    else
    player.textContent = `Player 2's move ( O )`
    createDiv()
    clearBoxes()
    allBoxes = Array.from(document.querySelectorAll('.boxes'))
})
start.addEventListener('click' , function () {
    header.classList.remove('head')
    start.style.display = 'none'
    board.style.display = 'flex'
    player.style.display = 'block'
    reset.style.display = 'flex'
})

