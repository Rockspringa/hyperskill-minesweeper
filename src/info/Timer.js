import React, {useEffect, useState} from 'react';

let timer = 0;

function Timer(props) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!props.stopped) {
      timer = setInterval(() => {
        setSeconds(actualSeconds => {
          if (actualSeconds === 59) {
            setMinutes(minutes => minutes + 1);
            return 0;
          }
          return actualSeconds + 1
        });
      }, 1000);
    } else {
      clearInterval(timer);
      timer = 0;
    }
  }, [props.stopped]);

  useEffect(() => {
    if (props.defaultState) {
      setMinutes(0);
      setSeconds(0);
    }
  }, [props.defaultState]);

  return (
    <p>{minutes}:{seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}</p>
  );
}

export default Timer;
