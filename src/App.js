import React, {useState} from 'react';
import logo from './bomb.svg';
import './App.css';

import Counter from "./info/Counter";
import Reset from "./info/Reset";
import Timer from "./info/Timer";

import Field from "./game/Field";

const getRowsData = () => {
  const bombsPerRow = new Array(9).fill(0);

  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * 9);
    bombsPerRow[index]++;
  }

  return bombsPerRow;
}

const getCellsData = (bombsAmount) => {
  const cellBombs = new Array(8).fill(false);
  let bombs = 0;

  while (bombs < bombsAmount) {
    const index = Math.floor(Math.random() * 8);

    if (!cellBombs[index]) {
      cellBombs[index] = true;
      bombs++;
    }
  }

  return cellBombs;
}

function App() {
  const [defaultState, setDefaultState] = useState(true);
  const [bombs, setBombs] = useState(10);
  const [field, setField] = useState(true);
  const [stop, setStop] = useState(true);

  const gameFlow = {
    cells: getRowsData().map(bombsAmount => getCellsData(bombsAmount)),
    stop: false,
    setBombs,
    bombs,
    bombExploded: () => setStop(true),
    beginGame: defaultState ? () => {
      setDefaultState(false);
      setStop(false);
    } : undefined,
  };

  const resetGame = () => {
    setDefaultState(true);
    setBombs(10);
    setField(!field);
    setStop(true);
    gameFlow.cells = getRowsData().map(bombsAmount => getCellsData(bombsAmount));
    gameFlow.stop = false;
  }

  return (
    <>
      <header>
        <h2>Minesweeper</h2>
        <img src={logo} className="logo" alt="logo"/>
      </header>

      <main>
        <div id="info">
          <Counter bombs={bombs}/>
          <Reset resetGame={resetGame}/>
          <Timer defaultState={defaultState} stopped={stop}/>
        </div>

        <Field gameFlow={gameFlow} key={-field}/>
      </main>
    </>
  );
}

export default App;
