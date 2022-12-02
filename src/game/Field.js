import React from 'react';
import Row from "./Row";
import './Field.css';

const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function Field() {
  const rows = keys.map((key) => <Row key={key}/>);
  return (
    <div id="field">
      {rows}
    </div>
  );
}

export default Field;
