import React from 'react';

function App() {
  let minutes = 0, seconds = 0;
  return (
    <p>{minutes}:{seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}</p>
  );
}

export default App;
