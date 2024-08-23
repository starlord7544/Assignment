import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from "./Button.jsx";
import TaskBox from './TaskBox.jsx';


const InputBox = () => {
  const [inputVal, setInputVal] = useState("");
  const [tasks, setTasks] = useState([])

  const handleAddTask = () => {
    const newTask = inputVal.trim()
    if (newTask) {
      setTasks([...tasks, newTask])
      setInputVal("")
    }
  }

  const handleClearAll = () => {
    setTasks([])
    setInputVal("")
  }

  return (
    <>
      <form id='input-container'>
        <label htmlFor="input-box">Ready to tackle something new?</label><br />
        <input type="text" id='input-box'
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value)
          }}
          placeholder='What needs to be done?' />
      </form>

      <div id="btn-container">
        <Button value="Add task" id="add-btn" onClick={handleAddTask} />
        <Button value="Clear All" id="clr-btn" onClick={handleClearAll} />
      </div>
      <TaskBox tasks = {tasks} />
    </>
  )
}

export default InputBox