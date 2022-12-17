import React, { useEffect, useState } from "react";

let secondsTimer;
let minutesTimer;

const Timer = ({ stopped, defaultState }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (!stopped) {
      secondsTimer = setInterval(() => setSeconds((sec) => sec + 1), 1000);
      minutesTimer = setInterval(() => {
        setMinutes((min) => min + 1);
        setSeconds(0);
      }, 60000);
    } else {
      clearInterval(secondsTimer);
      clearInterval(minutesTimer);
      secondsTimer = undefined;
      minutesTimer = undefined;
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
