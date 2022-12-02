import React from 'react';
import bomb from '../bomb.svg';

function Counter(props) {
  return (
    <div>
      <img src={bomb} alt="bomb counter"/>
      <p>{props.bombs}</p>
    </div>
  );
}

export default Counter;
