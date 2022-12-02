import React from 'react';
import Row from "./Row";
import './Field.css';

const getRowsData = () => {
  const bombsPerRow = new Array(9).fill(0);

  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * 9);
    bombsPerRow[index]++;
  }

  return bombsPerRow;
}

function Field() {
  const rowsData = getRowsData();
  const rows = rowsData.map((bombsAmount, index) => <Row key={index} bombsAmount={bombsAmount}/>);

  return (
    <div id="field">
      {rows}
    </div>
  );
}

export default Field;
