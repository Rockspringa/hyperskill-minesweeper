import React from 'react';
import bomb from '../bomb.svg';

function Counter() {
  let bombs = 10;
  return (
    <div>
      <img src={bomb} alt="bomb counter"/>
      <p>{bombs}</p>
    </div>
  );
}

export default Counter;
