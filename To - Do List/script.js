const task      = document.getElementById('task')
const taskBox   = document.getElementById('taskBox')
const addButton = document.getElementById('add-task')
const clrButton = document.getElementById('clear-all')

window.addEventListener('load', function(){
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    savedTasks.forEach(function(task){
        addTask(task)
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

let isEditing = false

function addTask (task) {
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

    const delButton = document.createElement('input');
    delButton.setAttribute('type', 'button')
    delButton.setAttribute('value','Delete')
    delButton.classList.add('delete')
    
    const editButton = document.createElement('input')
    editButton.setAttribute('type','button')
    editButton.setAttribute('value','Edit')
    editButton.classList.add('edit')

    const saveButton = document.createElement('input')
    saveButton.setAttribute('type', 'button')
    saveButton.setAttribute('value', 'Save')
    saveButton.classList.add('save')
    saveButton.style.display = 'none'

    buttons.appendChild(saveButton)
    buttons.appendChild(editButton)
    buttons.appendChild(delButton)

    const inside = document.createElement('div')
    inside.classList.add('inside')

    inside.appendChild(checkBoxDiv)
    inside.appendChild(divMsg)
    inside.appendChild(buttons)

    taskBox.appendChild(inside)
    
    if (isEditing === false){
        delButton.addEventListener('click', function() {
            clickedDeleteButton (inside, taskBox)
        })
        editButton.addEventListener('click', function(){
            clickedEditButton (editButton, saveButton, divMsg)
        })
        checkbox.addEventListener('change', function(){
            clickedCheckBox(inside, checkbox, divMsg)
        })
    }

    saveTasksToLocalStorage()
}

function clickedDeleteButton (inside, taskBox) {
    taskBox.removeChild(inside)
    saveTasksToLocalStorage()
}

function clickedCheckBox (inside, checkbox, divMsg) {
    if (checkbox.checked === true){
        inside.style.backgroundColor = 'var(--clr-checked)'
        divMsg.style.textDecoration = 'line-through'
        divMsg.style.opacity = '0.7'
        saveTasksToLocalStorage()
    }
    else{
        inside.style.backgroundColor = 'var(--clr-input)'
        divMsg.style.textDecoration = 'none'
        divMsg.style.opacity = '1'
        saveTasksToLocalStorage()
    }
    console.log('checkbox changed')

    saveTasksToLocalStorage()
}

function clickedEditButton (editButton, saveButton, divMsg){
    if (isEditing === false){
        function completeEdit() {
            console.log('save')
            divMsg.blur()
            saveButton.style.display = 'none'
            editButton.style.display = 'block'
            divMsg.style.textDecoration = 'none'
            divMsg.contentEditable = false
            isEditing = false
            editButton.removeEventListener('click', completeEdit)
            saveTasksToLocalStorage()
        }

        editButton.style.display = 'none'
        saveButton.style.display = 'block'
        isEditing = true
        divMsg.contentEditable = true
        divMsg.focus()
        divMsg.style.textDecoration = 'underline'

        const range = document.createRange()
        const selection = window.getSelection()
        range.selectNodeContents(divMsg)
        range.collapse()
        selection.removeAllRanges()
        selection.addRange(range)

        saveButton.addEventListener('click', completeEdit)

        divMsg.addEventListener('keydown', function(event){
            if (event.key  === 'Enter'){
                completeEdit()
            }
        })
    }
    else if (isEditing === false){
        console.log('save')
        divMsg.blur()
        editButton.setAttribute('value', 'Edit')
        divMsg.contentEditable = false
    }
    
    saveTasksToLocalStorage()
}

function saveTasksToLocalStorage () {
    const tasks = [];
    const taskElements = taskBox.querySelectorAll('.taskMsg')
    taskElements.forEach(function (taskElements){
        tasks.push(taskElements.textContent)
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
