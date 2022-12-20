import React, { useState } from "react";

import Cell from "./Cell";
import "./Field.css";

import Board from "../../model/Board";
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
  const [board, setBoard] = useState(new Board({ rows, cols }));

  const cells = board.cells.map((cell, index) => {
    const refreshBoard = () => {
      if (cell.hasBomb && cell.activated) {
        gameOver(false);
      }
      if (board.isWinner() && gameState === gameStates.playing) {
        gameOver(true);
      }

      setBoard(new Board(board));
    };

    const firstClick = (callback) => {
      onFirstClick();
      board.createField(rows, cols, bombs, index);
      callback();
    };

    return (
      <Cell
        setBombs={setBombs}
        boardCell={cell}
        gameState={gameState}
        firstClick={firstClick}
        refreshBoard={refreshBoard}
        key={index}
      />
    );
  });

  return <div id="field">{cells}</div>;
};

export default Field;
