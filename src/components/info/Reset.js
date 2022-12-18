import React from "react";

import normal from "../../images/emojis/normal.svg";
import playing from "../../images/emojis/playing.svg";
import failed from "../../images/emojis/failed.svg";
import cleared from "../../images/emojis/cleared.svg";

const Reset = ({ resetGame, gameState }) => {
  let emoji;

  switch (gameState) {
    case 3:
      emoji = cleared;
      break;

    case 2:
      emoji = failed;
      break;

    case 1:
      emoji = playing;
      break;

    default:
      emoji = normal;
  }

  return (
    <div onClick={resetGame}>
      <img src={emoji} alt="emoji reacting to the game" />
    </div>
  );
};

export default Reset;
