import React, { useState } from "react";

const stateClasses = {
  default: "cell",
  flagged: "cell flag",
  exploded: "cell mine",
  activated: "cell open",
};

const Cell = ({
  stop,
  bombs,
  hasBomb,
  setBombs,
  activated,
  propagate,
  firstClick
}) => {
  const [state, setState] = useState(stateClasses.default);

  if (state === stateClasses.default && activated) {
    setState(hasBomb ? stateClasses.exploded : stateClasses.activated);
  }

  const actionWrapper = (action) => {
    return (attributes) => {
      if (stop) {
        firstClick(() => action(attributes));
        return;
      }
      if (state === stateClasses.exploded || state === stateClasses.activated) {
        return;
      }
      action(attributes);
    };
  };

  const activate = actionWrapper(() => {
    if (state === stateClasses.flagged) {
      return;
    }

    setState(hasBomb ? stateClasses.exploded : stateClasses.activated);
    propagate();
  });

  const flag = actionWrapper((event) => {
    event.preventDefault();

    setBombs((bombs) => {
      if (state === stateClasses.flagged) {
        setState(stateClasses.default);
        return bombs + 1;
      }
      if (bombs > 0) {
        setState(stateClasses.flagged);
        return bombs - 1;
      }
    });
  });

  return (
    <div className={state} onClick={activate} onContextMenu={flag}>
      <h6>{state === stateClasses.activated ? bombs : ""}</h6>
    </div>
  );
};

export default Cell;
