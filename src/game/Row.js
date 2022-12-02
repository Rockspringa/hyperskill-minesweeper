import React from 'react';
import Cell from "./Cell";

const keys = [0, 1, 2, 3, 4, 5, 6, 7];

function Row() {
  const cells = keys.map((key) => <Cell key={key}/>);
  return (
    <div className="row">
      {cells}
    </div>
  );
}

export default Row;
