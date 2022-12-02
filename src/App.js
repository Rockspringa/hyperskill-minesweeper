import React from 'react';
import logo from './bomb.svg';
import './App.css';

import Counter from "./info/Counter";
import Reset from "./info/Reset";
import Timer from "./info/Timer";

import Field from "./game/Field";

function App() {
  return (
    <>
      <header>
        <h2>Minesweeper</h2>
        <img src={logo} className="logo" alt="logo"/>
      </header>

      <main>
        <div id="info">
          <Counter/>
          <Reset/>
          <Timer/>
        </div>

        <Field/>
      </main>
    </>
  );
}

export default App;
