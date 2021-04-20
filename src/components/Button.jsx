import React from 'react'
import './Button.css'

// eslint-disable-next-line
export default props =>
    <button className={`btn ${ props.type}`}
    onClick={e => props.click(props.label)} >
        {props.label}
    </button>