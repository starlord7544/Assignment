const task      = document.getElementById('task')
const taskBox   = document.getElementById('taskBox')
const addButton = document.getElementById('add-task')

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

    delButton.addEventListener('click', function (event){
        event.preventDefault()
        taskBox.removeChild(inside)
    })

    editButton.addEventListener('click', function (event){
        event.preventDefault()
        if (editButton.value == 'Edit'){
            divMsg.contentEditable = true
            divMsg.focus()
            editButton.setAttribute('value', 'Save')
            divMsg.addEventListener('keydown', function(event){
                if (event.key  === 'Enter'){
                    console.log('save')
                    divMsg.blur()
                    editButton.setAttribute('value', 'Edit')
                    divMsg.contentEditable = false
                }
            })
        }
        else {
            console.log('save')
            divMsg.blur()
            editButton.setAttribute('value', 'Edit')
            divMsg.contentEditable = false
        }
    })

    checkbox.addEventListener('change', function(event){
        if (checkbox.checked == true){
            inside.style.backgroundColor = 'var(--clr-checked)'
            divMsg.style.textDecoration = 'line-through'
        }
        else{
            inside.style.backgroundColor = 'var(--clr-input)'
            divMsg.style.textDecoration = 'none'
        }
    })
}

