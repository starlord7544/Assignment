import React from 'react'
import Button from "./Button.jsx";

const InputBox = () => {
  return (
    <>
      <div id='input-container'>
        <label htmlFor="input-box">Ready to tackle something new?</label><br />
        <input type="text" id='input-box' placeholder='What needs to be done?' />
      </div>
      <div id="btn-container">
        <Button value="Add task" id="add-btn" />
        <Button value="Clear All" id="clr-btn" />
      </div>
    </>
  )
}

export default InputBox