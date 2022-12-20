import React from "react";

import gameStates from "../../model/GameStates";
import cellStates from "../../model/CellStates";

const Cell = ({ setBombs, boardCell, gameState, firstClick, refreshBoard }) => {
  const actionWrapper = (action) => {
    return (attributes) => {
      const execute = () => action(attributes) || refreshBoard();

      if (gameState === gameStates.default) {
        firstClick(execute);
        return;
      }
      if (gameState !== gameStates.playing || boardCell.activated) {
        return;
      }
      execute();
    };
  };

  const activate = actionWrapper(() => {
    if (boardCell.state === cellStates.flagged) {
      return;
    }
    boardCell.activate();
  });

  const flag = actionWrapper((event) => {
    event.preventDefault();

    setBombs((bombs) => {
      if (bombs > 0 && boardCell.state === cellStates.default) {
        return bombs - boardCell.flag();
      }
      return bombs + boardCell.unflag();
    });
  });

  return (
    <div className={boardCell.state} onClick={activate} onContextMenu={flag}>
      <h6>{boardCell.bombs}</h6>
    </div>
  );
};

export default Cell;
