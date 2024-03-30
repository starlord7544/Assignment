const userInput = document.getElementById('username')
const signUp = document.getElementById('signup-btn')
const errorMsg = document.getElementById('error-msg')
const redirect = document.querySelector('.redirect')
const passInput = document.getElementById('pass')

userInput.addEventListener('click' , function(event){
    if(event.key === 'Enter')
    signUp.click()
})

signUp.addEventListener('click' , async function(event) {
    event.preventDefault()
    const username = userInput.value
    const pass = passInput.value
    createUser (username , pass)
})

async function createUser (userID , pass) {
    const url = `http://localhost:1400/api/v1/users/`
    try {
        const response = await fetch(url , {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                username : userID,
                password : pass,
            })
        })

        if (!response.ok)
        throw new Error("User already exists")
        
        redirect.style.display = 'block'
        setTimeout(() => {
            window.location.href = "./login.html";
        }, 1500);

    }
    catch (err) {
        console.log(err)
        errorMsg.style.display = 'block'
        errorMsg.textContent = err
    }
}