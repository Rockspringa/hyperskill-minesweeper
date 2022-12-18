import React, { useState } from "react";

import Cell from "./Cell";
import "./Field.css";

import MinesField from "../../model/MinesField";
import gameStates from "../../model/GameStates";

const Field = ({
  rows,
  cols,
  bombs,
  gameOver,
  setBombs,
  gameState,
  onFirstClick,
}) => {
  const [minesField, setMinesField] = useState(new MinesField({ rows, cols }));

  const cells = minesField.field.map((cell, index) => {
    const stepOnCell = () => {
      minesField.stepOnCell(index);
      setMinesField((minesField) => new MinesField(minesField));

      if (cell.hasBomb) {
        gameOver(false);
      } else if (minesField.isWinner() && gameState === gameStates.playing) {
        gameOver(true);
      }
    };

    const firstClick = (callback) => {
      onFirstClick();
      minesField.createField(rows, cols, bombs, index);
      callback();
    };

    return (
      <Cell
        bombs={cell.bombsAround}
        hasBomb={cell.hasBomb}
        setBombs={setBombs}
        activated={cell.activated}
        gameState={gameState}
        stepOnCell={stepOnCell}
        firstClick={firstClick}
        key={index}
      />
    );
  });

  return <div id="field">{cells}</div>;
};

export default Field;
