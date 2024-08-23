import React from 'react'

const TaskBox = ({ tasks }) => {
    return (
        <div id='task-box'>
            <ul>
                {tasks.map((task, index) => {
                    return <li key = {index} >{task}</li>
                })}
            </ul>
        </div>
    )
}

export default TaskBox