import React from 'react'


const Button = ({ id, value, onClick }) => {

    return (
        <button className='btn' id={id} onClick={onClick}>{value}</button>
    )
}

export default Button
