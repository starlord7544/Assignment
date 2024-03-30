const userInput = document.getElementById('username')
const passInput = document.getElementById('pass')
const login = document.getElementById('login-btn')
const errorMsg = document.getElementById('error-msg')

userInput.addEventListener('click' , function(event){
    if(event.key === 'Enter')
    login.click()
})

login.addEventListener('click' , async function(event) {
    event.preventDefault()
    const username = userInput.value
    const pass = passInput.value
    fetchURL (username , pass)
})
async function fetchURL(username , pass) {
    const url = `http://localhost:1400/api/v1/users/${username}`
    try {
        const response = await fetch(url)

        if (!response.ok)
        throw new Error("Invalid User ID")

        const data = await response.json()
        const userData = data.body
        const tasks = userData[0].tasks
        const password = userData[0].password
        console.log(tasks)
        console.log(pass)
        console.log(password)
        errorMsg.style.display = 'none'

        if (pass != password)
        throw new Error("Incorrect Password")

        localStorage.removeItem('tasks')
        localStorage.removeItem('username')
        localStorage.setItem('tasks' , JSON.stringify(tasks))
        localStorage.setItem('url' , url)
        console.log(localStorage.getItem('url'))
        window.location.href = "../Exp -  To - Do List/index.html";
    }
    catch (err) {
        console.log(err)
        errorMsg.style.display = 'block'
        errorMsg.textContent = err
    }
}