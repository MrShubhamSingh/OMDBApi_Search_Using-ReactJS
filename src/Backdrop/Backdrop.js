import React from 'react';
import './Backdrop.css'
const backdrop = (props) =>{
    return (
        props.show?<div className="Backdrop" onClick={props.hide}></div>:null
    )
} 

export default backdrop;