import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Info from "./components/Info";
import Field from "./components/game/Field";

const defaultBombs = 10;
const defaultRows = 9;
const defaultCols = 8;

function App() {
  const [defaultState, setDefaultState] = useState(true);
  const [bombs, setBombs] = useState(defaultBombs);
  const [stop, setStop] = useState(true);
  const [game, setGame] = useState(0);

  const resetGame = () => {
    if (defaultState) {
      return;
    }

    setDefaultState(true);
    setBombs(defaultBombs);
    setStop(true);
    setGame((game) => game + 1);
  };

  const beginGame = (callback) => {
    if (!defaultState) {
      return;
    }
    setDefaultState(false);
    setStop(false);
    callback();
  };

  return (
    <>
      <Header />
      <Info
        stop={stop}
        bombs={bombs}
        resetGame={resetGame}
        defaultState={defaultState}
      />
      <main>
        <Field
          stop={stop}
          rows={defaultRows}
          cols={defaultCols}
          bombs={bombs}
          gameOver={() => setStop(true)}
          setBombs={setBombs}
          onFirstClick={beginGame}
          key={game}
        />
      </main>
    </>
  );
}

export default App;
