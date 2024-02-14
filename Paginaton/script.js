const items = document.querySelector('.items')
const buttons = document.querySelector('.buttons')
const itemsPerPage = 2
const itemBank = [ "Item - 1", "Item - 2", "Item - 3", "Item - 4", "Item - 5", "Item - 6", "Item - 7", "Item - 8", "Item - 9", "Item - 10", "Item -11", "Item - 12", "Item - 13", "Item - 14", "Item - 15", "Item - 16", "Item - 17", "Item - 18", "Item - 19", "Item - 20", "Item -21", "Item - 22", "Item -23", "Item - 24" ]
totalItemsCnt = itemBank.length
const TotalPages = Math.ceil(totalItemsCnt/itemsPerPage)

addItems()
createButton()
let currentPage = 1

const allItems = document.querySelectorAll('.items li')
const allButtons = document.querySelectorAll('.buttons li')
showButtons(allButtons)

for (let i=0; i<itemsPerPage; i++) {
    allItems[i].classList.add('active')
}

function addItems () {
    for (let i=0; i<totalItemsCnt; i++) {
        const tempItem = document.createElement('li')
        tempItem.textContent = itemBank[i]
        items.appendChild(tempItem)
    }
}

function createButton () {
    for (let pageNo=1; pageNo<=TotalPages; pageNo++){
        const tempButton = document.createElement('li')
        tempButton.textContent = pageNo
        buttons.appendChild(tempButton)
        tempButton.addEventListener('click', function(){
            currentPage = pageNo
            updateCurrentPageStyle (allButtons)
            showButtons (allButtons)
            showItems(pageNo)
        })
    }
}

function showItems (pageNo) {
    const startIndex = (pageNo - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    for (let i=0; i<totalItemsCnt; i++) {
        if (i >= startIndex && i<endIndex)
        allItems[i].classList.add('active')
    else 
    allItems[i].classList.remove('active')
    }
}

function showButtons(allButtons) {
    for (let i=1; i<TotalPages; i++) {
        allButtons[i].textContent = i+1
        if (i<2 || i>TotalPages-3)
            allButtons[i].classList.remove('hidden')

        else if (i<currentPage-3 || i>currentPage+1)
            allButtons[i].classList.add('hidden')

        else
            allButtons[i].classList.remove('hidden')
        if ((i>=2 && i<TotalPages-3) && (i===currentPage-3 || i===currentPage+1))
            allButtons[i].textContent = '...'
    }

}

function updateCurrentPageStyle (allButtons) {
    for (let i=0; i<TotalPages; i++){
        if (i+1 === currentPage){
            allButtons[i].classList.add('current')
        }
        else {
            allButtons[i].classList.remove('current')
        }
    }
}
