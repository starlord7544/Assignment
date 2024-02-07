const task      = document.getElementById('task')
const taskBox   = document.getElementById('taskBox')
const addButton = document.getElementById('add-task')

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

addButton.addEventListener('click', function (event){
    event.preventDefault()
    if (task.value != "") {
    addTask (task.value)
    console.log(task.value)
    task.value = ""
    }
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

    buttons.appendChild(editButton)
    buttons.appendChild(delButton)

    const inside = document.createElement('div')
    inside.classList.add('inside')

    inside.appendChild(checkBoxDiv)
    inside.appendChild(divMsg)
    inside.appendChild(buttons)

    taskBox.appendChild(inside)
    
    if (isEditing == false){
        delButton.addEventListener('click', clickedDeleteButton)
        editButton.addEventListener('click', clickedEditButton)
        checkbox.addEventListener('change', clickedCheckBox)
    }

    saveTasksToLocalStorage()
}

function clickedDeleteButton (event) {
    const delButton = event.target
    const inside = delButton.parentElement.parentElement
    const taskBox = inside.parentElement
    taskBox.removeChild(inside)

    saveTasksToLocalStorag()
}

function clickedCheckBox (event) {
    const checkbox = event.target
    const inside = checkbox.parentElement.parentElement
    const divMsg = inside.querySelector('.taskMsg')

    if (checkbox.checked == true){
        inside.style.backgroundColor = 'var(--clr-checked)'
        divMsg.style.textDecoration = 'line-through'
        divMsg.style.opacity = '0.7'
    }
    else{
        inside.style.backgroundColor = 'var(--clr-input)'
        divMsg.style.textDecoration = 'none'
        divMsg.style.opacity = '1'
    }
    console.log('checkbox changed')

    saveTasksToLocalStorage()
}

function clickedEditButton (event){
    event.preventDefault()
    const editButton = event.target
    const inside = editButton.parentElement.parentElement
    const divMsg = inside.querySelector('.taskMsg')

    if (editButton.value == 'Edit' && isEditing == false){
        function completeEdit() {
            console.log('save')
            divMsg.blur()
            editButton.setAttribute('value', 'Edit')
            divMsg.style.textDecoration = 'none'
            divMsg.contentEditable = false
            isEditing = false
            editButton.removeEventListener('click', completeEdit)

            saveTasksToLocalStorage()
        }

        isEditing = true
        divMsg.contentEditable = true
        divMsg.focus()
        editButton.setAttribute('value', 'Save')
        divMsg.style.textDecoration = 'underline'

        editButton.addEventListener('click', completeEdit)

        divMsg.addEventListener('keydown', function(event){
            if (event.key  === 'Enter'){
                completeEdit()
            }
        })
    }
    else if (isEditing == false){
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
