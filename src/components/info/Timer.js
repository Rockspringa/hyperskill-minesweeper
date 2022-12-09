import React, { useEffect, useState } from "react";

let timer;

const Timer = ({ stopped, defaultState }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (!stopped) {
      timer = setInterval(() => {
        setSeconds((sec) => {
          if (sec === 59) {
            setMinutes((min) => min + 1);
            return 0;
          }
          return sec + 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
      timer = undefined;
    }
  }, [stopped]);

  useEffect(() => {
    if (defaultState) {
      setSeconds(0);
      setMinutes(0);
    }
  }, [defaultState]);

  return (
    <p>
      {minutes}:{seconds.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
    </p>
  );
};

export default Timer;
