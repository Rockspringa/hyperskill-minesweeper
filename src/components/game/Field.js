import React, { useState } from "react";

import Cell from "./Cell";
import "./Field.css";

import MinesField from "../../model/MinesField";

const Field = ({
  stop,
  rows,
  cols,
  bombs,
  gameOver,
  setBombs,
  onFirstClick,
}) => {
  const [minesField, setMinesField] = useState(new MinesField({ rows, cols }));

  const cells = minesField.field.map((cell, index) => {
    const stepOnCell = () => {
      minesField.stepOnCell(index);
      setMinesField((minesField) => new MinesField(minesField));

      if (cell.hasBomb || (minesField.isWinner() && !stop)) {
        gameOver();
      }
    };

    const firstClick = (callback) => {
      onFirstClick(() => {
        minesField.createField(rows, cols, bombs, index);
        callback();
      });
    };

    return (
      <Cell
        stop={stop}
        bombs={cell.bombsAround}
        hasBomb={cell.hasBomb}
        setBombs={setBombs}
        activated={cell.activated}
        stepOnCell={stepOnCell}
        firstClick={firstClick}
        key={index}
      />
    );
  });

  return <div id="field">{cells}</div>;
};

export default Field;
