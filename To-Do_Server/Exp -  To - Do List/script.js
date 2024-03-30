const task         = document.getElementById('task')
const taskBox      = document.getElementById('taskBox')
const addButton    = document.getElementById('add-task')
const clrButton    = document.getElementById('clear-all')
const logoutButton = document.getElementById('logout')

window.addEventListener('load', function () {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || [])
    savedTasks.forEach(function (taskObj) {
        addTask(taskObj.task, taskObj.isChecked)
    })
})

task.addEventListener('keyup', function (event){
    if (event.key === 'Enter'){
        addButton.click()
    }
})

addButton.addEventListener('click', function (){
    if (task.value != "") {
    addTask (task.value)
    console.log(task.value)
    task.value = ""
    }
})

clrButton.addEventListener('click', function() {
    taskBox.textContent=""
    localStorage.removeItem('tasks')
})

function setButtonProperties(button, btn_Type, btn_Value, btn_calss) {
    button.setAttribute('type', btn_Type)
    button.setAttribute('value',btn_Value)
    button.classList.add(btn_calss)
}

function appendItem (container, item1 ,item2, item3) {
    container.appendChild(item1)
    container.appendChild(item2)
    container.appendChild(item3)
}

function addTask (task, isChecked = false) {
    const checkBoxDiv = document.createElement('div')
    checkBoxDiv.classList.add('check')

    const checkbox = document.createElement('input')
    checkbox.setAttribute('type','checkbox')
    checkbox.classList.add('checkbox')
    checkBoxDiv.appendChild(checkbox)

    const divMsg = document.createElement('div');
    divMsg.textContent = `${task}`
    divMsg.classList.add('taskMsg')
    
    const buttons = document.createElement('div')
    buttons.classList.add('buttons')

    const delButton = document.createElement('input')
    setButtonProperties(delButton, 'button', 'Delete', 'delete')
    
    const editButton = document.createElement('input')
    setButtonProperties(editButton, 'button', 'Edit', 'edit')
    
    const saveButton = document.createElement('input')
    setButtonProperties(saveButton, 'button', 'Save', 'save')
    appendItem(buttons ,saveButton ,editButton,  delButton)

    
    const inside = document.createElement('div')
    inside.classList.add('inside')
    appendItem(inside, checkBoxDiv, divMsg, buttons)

    taskBox.appendChild(inside)

    divMsg.textContent = task;
    checkbox.checked = isChecked;

    if (checkbox.checked === true) {
        checkBoxStyling(inside, divMsg, 'var(--clr-checked)', 'line-through', '0.7')
    }
    
    delButton.addEventListener('click', function() {
        clickedDeleteButton (inside, taskBox)
    })
    editButton.addEventListener('click', function(){
        clickedEditButton (editButton, saveButton, divMsg)
    })
    checkbox.addEventListener('change', function(){
        clickedCheckBox(inside, checkbox, divMsg)
    })
    saveButton.addEventListener('click', function(){
        clickedSaveButton(editButton, saveButton, divMsg)
    })
    saveTasksToLocalStorage()
}

function clickedSaveButton (editButton, saveButton, divMsg){
    task.disabled = false
    task.style.opacity = '1'
    divMsg.contentEditable = false
    divMsg.blur()
    document.querySelectorAll('.edit').forEach(el => {
        el.style.opacity = '1'
        el.disabled = false
    })
    document.querySelectorAll('.delete').forEach(el => {
        el.style.opacity = '1'
        el.disabled = false
    })
    clrButton.disabled = false
    editButton.style.display = 'block'
    saveButton.style.display = 'none'
    saveTasksToLocalStorage()
}

function clickedEditButton (editButton, saveButton, divMsg){
    task.disabled = true
    task.style.opacity = '0.8'
    clrButton.disabled = true
    clrButton.style.opacity = '0.8'
    editButton.style.display = 'none'
    document.querySelectorAll('.edit').forEach(el => {
        el.style.opacity = '0.8'
        el.disabled = true
    })
    document.querySelectorAll('.delete').forEach(el => {
        el.style.opacity = '0.8'
        el.disabled = true
    })
    saveButton.style.display = 'block'
    divMsg.contentEditable = true
    divMsg.focus()
    
    const range = document.createRange()
    const selection = window.getSelection()
    range.selectNodeContents(divMsg)
    range.collapse()
    selection.removeAllRanges()
    selection.addRange(range)
    
    divMsg.addEventListener('keydown', function(event){
        if (event.key === 'Enter'){
            saveButton.click()
        }
    })
}

function clickedDeleteButton (inside, taskBox) {
    taskBox.removeChild(inside)

    setTimeout(() => {
        saveTasksToLocalStorage()
    }, 200)
}

logoutButton.addEventListener('click', function(){
    window.location.href = "../Login Page/login.html"
})

function clickedCheckBox (inside, checkbox, divMsg) {
    if (checkbox.checked === true){
        checkBoxStyling(inside, divMsg, 'var(--clr-checked)', 'line-through', '0.7')
    }
    else{
        checkBoxStyling(inside, divMsg, 'var(--clr-input)', 'none', '1')
    }
    console.log('checkbox changed')

    saveTasksToLocalStorage()
}

function checkBoxStyling (inside, divMsg, bgColor, textStyle, opacity) {
    inside.style.backgroundColor = bgColor
    divMsg.style.textDecoration = textStyle
    divMsg.style.opacity = opacity
}

let tasksArray = []
function saveTasksToLocalStorage() {
    tasksArray = []
    localStorage.removeItem('tasks')
    const taskElements = taskBox.querySelectorAll('.inside')
    taskElements.forEach(function (taskElement) {
        const taskMsg = taskElement.querySelector('.taskMsg').textContent
        const isChecked = taskElement.querySelector('.checkbox').checked
        tasksArray.push({ task: taskMsg, isChecked: isChecked })
    });
    localStorage.setItem('tasks', JSON.stringify(tasksArray))
    updateTasks(tasksArray)
}

async function updateTasks (tasksArray) {
    const URL = localStorage.getItem('url')
    try {
        const response = await fetch(URL, {
            method : 'PATCH',
            mode : 'cors',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({tasks: tasksArray})
        })
        
        if (!response.ok)
        throw new Error("Save failed")
    }
    catch (err) {
        console.log(err)
    }
}

