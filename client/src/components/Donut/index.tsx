import React from 'react';
import './Donut.css';
import donutImage from './donut.png'; 

function Donut() {
    return (
        <div className="donut" onDragStart={(e) => e.preventDefault()}>
            <img src={donutImage} onDragStart={(e) => e.preventDefault()}/>
        </div> 
    )
}

export default Donut;