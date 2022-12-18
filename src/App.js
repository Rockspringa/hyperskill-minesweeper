import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Info from "./components/Info";
import Field from "./components/game/Field";

import gameStates from "./model/GameStates";

const defaultBombs = 10;
const defaultRows = 9;
const defaultCols = 8;

function App() {
  const [gameState, setGameState] = useState(gameStates.default);
  const [bombs, setBombs] = useState(defaultBombs);
  const [game, setGame] = useState(0);

  const resetGame = () => {
    if (gameState === gameStates.default) {
      return;
    }
    setGameState(gameStates.default);
    setBombs(defaultBombs);
    setGame((game) => game + 1);
  };

  const beginGame = () => {
    if (gameState !== gameStates.default) {
      return;
    }
    setGameState(gameStates.playing);
  };

  const stopGame = (cleared) => {
    if (gameState !== gameStates.playing) {
      return;
    }
    setGameState(cleared ? gameStates.clear : gameStates.failed);
  };

  return (
    <>
      <Header />
      <Info bombs={bombs} resetGame={resetGame} gameState={gameState} />
      <main>
        <Field
          rows={defaultRows}
          cols={defaultCols}
          bombs={bombs}
          gameOver={stopGame}
          setBombs={setBombs}
          gameState={gameState}
          onFirstClick={beginGame}
          key={game}
        />
      </main>
    </>
  );
}

export default App;
