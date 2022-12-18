import React, { useEffect, useState } from "react";

import gameStates from "../../model/GameStates";

let interval;

const Timer = ({ gameState }) => {
  const [timer, setTimer] = useState({ sec: 0, min: 0 });

  useEffect(() => {
    if (gameState === gameStates.playing) {
      interval = setInterval(
        () =>
          setTimer(({ sec, min }) =>
            sec === 59 ? { sec: 0, min: min + 1 } : { sec: sec + 1, min }
          ),
        1000
      );
    } else {
      interval = clearInterval(interval);

      if (gameState === gameStates.default) {
        setTimer({ sec: 0, min: 0 });
      }
    }
  }, [gameState]);

  useEffect(() => {}, [gameState]);

  return (
    <p>
      {timer.min}:
      {timer.sec.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
    </p>
  );
};

export default Timer;
