        const start = document.querySelector('.startGame')
        const main = document.querySelector('.main')
        const word = document.getElementById('word')
        const response = document.getElementById('response')
        const guessCntDiv = document.querySelector('.guesscnt')
        const submit = document.getElementById('submit')
        const reset = document.getElementById('reset')
        const overMsg = document.querySelector('.over')
        const input = document.getElementById('input')
        const lable = document.querySelector('.lable')
        const wrongGusses = document.querySelector('.wrongGuesses')

        const wordBank = [ "Adore", "Album", "Alias", "Alpha", "Aloha", "Amaze", "Amber", "Angel", "Apple", "Arbor",
                        "Bacon", "Bench", "Bliss", "Brick", "Bulge", "Bingo", "Blush", "Brisk", "Candy", "Champ",
                        "Charm", "Civet", "Cabin", "Crown", "Crane", "Drape", "Drift", "Dough", "Dodge", "Dusky",
                        "Daisy", "Eagle", "Eager", "Elbow", "Emote", "Evoke", "Fable", "Frost", "Fjord", "Flask",
                        "Faint", "Flute", "Fuzzy", "Forge", "Gears", "Gleam", "Ghost", "Grove", "Gypsy", "Girth",
                        "Honey", "Happy", "Havoc", "Heart", "Hazel", "Habit", "Hatch", "Heist", "Inked", "Ivory",
                        "Infer", "Inane", "Inlet", "Joker", "Juicy", "Jolly", "Joust", "Kazoo", "Karma", "Kitty",
                        "Knack", "Kiosk", "Knead", "Lemon", "Lilac", "Lurch", "Laser", "Lucky", "Mirth", "Mango",
                        "Mocha", "Maple", "Nudge", "Noble", "Nifty", "Nymph", "Niche", "Olive", "Ozone", "Onset",
                        "Opera", "Opine", "Pique", "Piano", "Panda", "Plumb", "Puppy", "Panda", "Quail", "Quirk",
                        "Quash", "Quest", "Quack", "Rogue", "Rainy", "River", "Radar", "Ramen", "Salad", "Savvy",
                        "Snake", "Smile", "Space", "Storm", "Sting", "Sunny", "Swish", "Tulip", "Tiger", "Toast",
                        "Tryst", "Tango", "Twine", "Twirl", "Unity", "Usurp", "Ulcer", "Venus", "Vogue", "Vixen",
                        "Vivid", "Vital", "Vibes", "Wagon", "Wedge", "Whale", "Windy", "Waltz", "Water", "Xenon",
                        "Xerox", "Xylon", "Yacht", "Yield", "Yummy", "Zealot", "Zebra", "Zippy", "Zesty", "Zappy","Quack"]
        
        let index = Math.floor(Math.random() * wordBank.length)
        let wordToGuess = wordBank[index].toUpperCase()
        console.log('Cheat Menu: The word is',wordToGuess)    // For Educational purposes
        let remaningCnt = 10
        guessCntDiv.textContent = `You have ${remaningCnt} guesses remaining`


        let wordToDisplay = Array(wordToGuess.length).fill('○')
        word.textContent = wordToDisplay.join(' ')
        
        showLetters()
        
        function showLetters () {
            
            let idx1 = Math.floor(Math.random() * wordToGuess.length)
            let idx2 = Math.floor(Math.random() * wordToGuess.length)
            while (idx1 === idx2) {
                idx2 = Math.floor(Math.random() * wordToGuess.length)
            }
            wordToDisplay[idx1] = wordToGuess[idx1]
            wordToDisplay[idx2] = wordToGuess[idx2]
        }
        word.textContent = wordToDisplay.join(' ')

        start.addEventListener('click', function(){
            main.style.display = 'block'
            start.style.display = 'none'
            input.focus()
        })

        submit.addEventListener('click', function (){
            const guess = input.value.toUpperCase()
            input.value = ''
            let letterFound = false
            let validInput = false
            if(guess.length ===1){
                validInput = checkInput(guess)
                letterFound = matchInput(guess)
    
                if (letterFound && validInput){
                    updateDisplayedWord(guess)
                }
                else if (letterFound === false && validInput) {
                    remaningCnt--
                    updateNotFound(guess,remaningCnt)
                }
            }
        })
        
        function updateDisplayedWord(guess) {
            response.textContent = `Good guess! The word has letter ${guess}`
            for (let i=0; i<wordToGuess.length; i++){
                if (wordToGuess[i] === guess){
                    wordToDisplay[i] = wordToGuess[i]
                }
            }
            word.textContent = wordToDisplay.join(' ')
            if (word.textContent.replace(/\s/g,'') === wordToGuess) {
                gameWon()
            }
        }
        
        function updateNotFound(guess,remaningCnt) {
            response.textContent = `Sorry, The letter ${guess} is not in the word`
            guessCntDiv.textContent = `You have ${remaningCnt} guesses remaining`
            wrongGusses.textContent += `${guess}`
            wrongGusses.textContent = wrongGusses.textContent.split('').join(' ')
            if (remaningCnt === 0){
                gameOver()
            }
        }

        function checkInput (guess) {
            return /^[A-Za-z]$/.test(guess)
        }

        function matchInput (guess) {
            for (let i=0;  i<guess.length; i++){
                if (wordToGuess.includes(guess[i])){
                    return true
                }
            }
            return false
        }
        
        function gameOver() {
            reset.style.display = 'block'
            response.textContent = `The word was ${wordToGuess}`
            overMsg.style.display = 'block'
            input.style.display = 'none'
            submit.style.display = 'none'
            lable.style.display = 'none'
        }

        function gameWon() {
            reset.style.display = 'block'
            response.textContent = `Game Won! The word was ${wordToGuess}`
            input.style.display = 'none'
            submit.style.display = 'none'
            lable.style.display = 'none'
        }

        input.addEventListener('keyup', function(event){
            // if (event.key === 'Enter')
            submit.click()
        })

        reset.addEventListener('click', function(event){
            window.location.reload()
            start.click()
        })
