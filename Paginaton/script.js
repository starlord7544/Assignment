const buttons = document.querySelector('.buttons')
const items   = document.querySelector('.items')
const itemBank = [ "Item - 1", "Item - 2", "Item - 3", "Item - 4", "Item - 5", "Item - 6", "Item - 7", "Item - 8", "Item - 9", "Item - 10", "Item - 11", "Item - 12", "Item - 13", "Item - 14", "Item - 15", "Item - 16", "Item - 17", "Item - 18", "Item - 19", "Item - 20", "Item -21", "Item - 22", "Item -23", "Item - 24" , "Item - 25", "Item - 26", "Item - 27", "Item - 28", "Item - 29", "Item - 30", "Item - 31", "Item - 32", "Item - 33", "Item - 34", "Item - 35", "Item - 36", "Item - 37", "Item - 38", "Item - 39", "Item - 40", "Item - 41", "Item - 42", "Item - 43", "Item - 44" ]
totalItemCnt = itemBank.length
itemPerPage  = 2
totalPages = Math.ceil(totalItemCnt/itemPerPage)
let currentPage = 1
const tempItemHolder = document.createElement('ul')

const jumpToFirst = document.createElement('li')
const jumpToLast = document.createElement('li')
const nextButton = document.createElement('li')
const prevButton = document.createElement('li')

createButtons()
const allButtons = Array.from(document.querySelectorAll('.buttons li'))

createTempItems()
const allItems   = Array.from(tempItemHolder.querySelectorAll('li'))

allButtons[0].click()

createNavButtons()

function createButtons () {
    for(let i=1; i<=totalPages; i++){
        const tempButton = document.createElement('li')
        buttons.appendChild(tempButton)
        tempButton.addEventListener('click' , function() {
            currentPage = i
            if (tempButton.textContent === '...')
                return
            showNav(currentPage)
            addCurrentPageStyle(currentPage)
            appendItems(currentPage)
            showButtons(allButtons)
        })
    }
}    

function showNav(currentPage) {
    if (currentPage === 1) {
        jumpToFirst.classList.add('hidden')
        prevButton.classList.add('hidden')
    }
    else {
        jumpToFirst.classList.remove('hidden')
        prevButton.classList.remove('hidden')
    }
    
    if (currentPage === totalPages){
        jumpToLast.classList.add('hidden')
        nextButton.classList.add('hidden')
    }
    else {
        jumpToLast.classList.remove('hidden')
        nextButton.classList.remove('hidden')
    }
}


function createNavButtons () {
    jumpToLast.textContent = '>>'
    jumpToFirst.textContent = '<<'
    prevButton.textContent  = '<'
    nextButton.textContent = '>'

    jumpToFirst.classList.add('hidden')
    prevButton.classList.add('hidden')

    const firstChild = buttons.firstChild

    buttons.insertBefore(jumpToFirst , firstChild)
    buttons.insertBefore(prevButton,firstChild)
    buttons.appendChild(nextButton)
    buttons.appendChild(jumpToLast)


    jumpToFirst.addEventListener ('click' , function() {
        allButtons[0].click()
    })
    jumpToLast.addEventListener ('click' , function () {
        allButtons[totalPages-1].click()
    })

    prevButton.addEventListener('click', function() {
        allButtons[currentPage-2].click()
    })

    nextButton.addEventListener('click', function () {
        allButtons[currentPage].click()
    })
}

function createTempItems () {
    itemBank.forEach((item,i) => {
        const tempItem = document.createElement('li')
        tempItem.textContent = item
        tempItemHolder.appendChild(tempItem)
    })
}

function appendItems (pageNo) {
    items.innerHTML =''
    const start = (pageNo - 1) * itemPerPage
    const end = start + itemPerPage

    const displayItems = allItems.slice(start,end)
    items.append(...displayItems)
}

function addCurrentPageStyle (currentPage) {
    allButtons.forEach ((button, i) => {
        if (i+1 === currentPage)
            button.classList.add('current')
        else
            button.classList.remove('current')
    })
}

function showButtons(allButtons) {

    allButtons.forEach((Element,i) => {
        Element.textContent = i+1
        if ( i<2 || i>totalPages-3)
            Element.classList.remove('hidden')

        else if (i<currentPage-3 || i>currentPage+1)
            Element.classList.add('hidden')
        else
            Element.classList.remove('hidden')

        if ((i>=2 && i<totalPages-3) && (i===currentPage-3 || i===currentPage+1))
            Element.textContent = '...'
        if (i === totalPages-1 && currentPage===totalPages)
            allButtons[i-2].textContent = '...'
    })
}
