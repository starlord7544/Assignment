const items = document.querySelector('.items')
        const buttons = document.querySelector('.buttons')
        const itemsPerPage = 2
        const itemBank = [ "Item - 1", "Item - 2", "Item - 3", "Item - 4", "Item - 5", "Item - 6", "Item - 7", "Item - 8", "Item - 9", "Item - 10", "Item - 11", "Item - 12", "Item - 13", "Item - 14", "Item - 15", "Item - 16", "Item - 17", "Item - 18", "Item - 19", "Item - 20", "Item -21", "Item - 22", "Item -23", "Item - 24" , "Item - 25", "Item - 26", "Item - 27", "Item - 28", "Item - 29", "Item - 30", "Item - 31", "Item - 32", "Item - 33", "Item - 34", "Item - 35", "Item - 36", "Item - 37", "Item - 38", "Item - 39", "Item - 40", "Item - 41", "Item - 42", "Item - 43", "Item - 44" ]
        totalItemsCnt = itemBank.length
        const TotalPages = Math.ceil(totalItemsCnt/itemsPerPage)

        addItems()
        createButton()
        let currentPage = 1

        const allItems = document.querySelectorAll('.items li')
        const allButtons = document.querySelectorAll('.buttons li')
        showButtons(allButtons)
        updateCurrentPageStyle (allButtons)
        createNavButton (allButtons)


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
                    if (tempButton.textContent === '...'){
                        return
                    }
                    currentPage = pageNo
                    updateCurrentPageStyle (allButtons)
                    showButtons (allButtons)
                    showItems(pageNo)
                })
            }
        }

        function createNavButton (allButtons) {
            const jumpToLast = document.createElement('li')
            jumpToLast.textContent = '>>'
            const jumpToFirst = document.createElement('li')
            jumpToFirst.textContent = '<<'
            const firstChild = buttons.firstChild

            const prevButton = document.createElement('li')
            prevButton.textContent  = '<'
            const nextButton = document.createElement('li')
            nextButton.textContent = '>'

            buttons.insertBefore(jumpToFirst,firstChild)
            buttons.insertBefore(prevButton,firstChild)
            buttons.appendChild(nextButton)
            buttons.appendChild(jumpToLast)

            prevButton.addEventListener('click', function() {
                allButtons[currentPage-2].click()
            })

            nextButton.addEventListener('click', function () {
                allButtons[currentPage].click()
            })

            jumpToFirst.addEventListener('click', function() {
                allButtons[0].click()
            })
            jumpToLast.addEventListener('click', function() {
                allButtons[TotalPages-1].click()
            })

        
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
                if (i === TotalPages-1 && currentPage===TotalPages)
                    allButtons[i-2].textContent = '...'
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
