import React from 'react';
import Cell from "./Cell";

const getCellsData = (bombsAmount) => {
  const cellBombs = new Array(8).fill(false);
  let bombs = 0;

  while (bombs < bombsAmount) {
    const index = Math.floor(Math.random() * 8);

    if (!cellBombs[index]) {
      cellBombs[index] = true;
      bombs++;
    }
  }

  return cellBombs;
}

function Row(props) {
  const cellsData = getCellsData(props.bombsAmount);
  const cells = cellsData.map((withBomb, index) => <Cell key={index} withBomb={withBomb}/>);

  return (
    <div className="row">
      {cells}
    </div>
  );
}

export default Row;
