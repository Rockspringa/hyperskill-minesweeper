import React from 'react';
import reset from './emoji.svg';

function Reset(props) {
  return (
    <div onClick={props.resetGame}>
      <img src={reset} alt="bomb counter"/>
    </div>
  );
}

export default Reset;
