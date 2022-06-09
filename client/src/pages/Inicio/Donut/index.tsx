import React from 'react';
import stylesTema from '../../../components/PaginaPadrao/PaginaPadrao.module.scss';
import './Donut.css';
import donutImage from './donut.png';

export default function Donut() {
  return (
    <>
      <div
        className='donut'
        onDragStart={(e) => e.preventDefault()}
      >
        <img
          src={donutImage}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
    </>
  )
}