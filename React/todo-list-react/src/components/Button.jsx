import React from 'react'

const Button = ({id, value}) => {
  return (
    <button className='btn' id={id}>{value}</button>
  )
}

export default Button
