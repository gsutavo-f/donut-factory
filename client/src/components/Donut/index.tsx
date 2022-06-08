import React from 'react';
import './Donut.css';
import donutImage from './donut.png'; 

function Donut() {
    return (
        <div className="donut">
            <img src={donutImage}/>
        </div> 
    )
}

export default Donut;