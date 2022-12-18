import React, { useState } from "react";

import gameStates from "../../model/GameStates";
import cellStates from "../../model/CellStates";

const Cell = ({
  bombs,
  hasBomb,
  setBombs,
  activated,
  gameState,
  stepOnCell,
  firstClick,
}) => {
  const [state, setState] = useState(cellStates.default);

  if (state === cellStates.default && activated) {
    setState(hasBomb ? cellStates.exploded : cellStates.activated);
  }

  const actionWrapper = (action) => {
    return (attributes) => {
      if (gameState === gameStates.default) {
        firstClick(() => action(attributes));
        return;
      }
      if (
        gameState !== gameStates.playing ||
        state === cellStates.exploded ||
        state === cellStates.activated
      ) {
        return;
      }
      action(attributes);
    };
  };

  const activate = actionWrapper(() => {
    if (state === cellStates.flagged) {
      return;
    }

    setState(hasBomb ? cellStates.exploded : cellStates.activated);
    stepOnCell();
  });

  const flag = actionWrapper((event) => {
    event.preventDefault();

    let newState;

    setBombs((bombs) => {
      if (state === cellStates.flagged) {
        newState = cellStates.default;
        return bombs + 1;
      }
      if (bombs > 0) {
        newState = cellStates.flagged;
        return bombs - 1;
      }
      return bombs;
    });

    if (newState) setState(newState);
  });

  return (
    <div className={state} onClick={activate} onContextMenu={flag}>
      <h6>{state === cellStates.activated ? bombs || "" : ""}</h6>
    </div>
  );
};

export default Cell;
