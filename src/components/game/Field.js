import React, { useState } from "react";
import Cell from "./Cell";
import "./Field.css";

const rows = 9;
const cols = 8;

const createBombsField = (defaultBombs, invulnerable = -1) => {
  const fieldLength = rows * cols;
  const cellBombs = new Array(fieldLength).fill(false);

  let bombs = 0;
  while (bombs < defaultBombs) {
    const index = Math.floor(Math.random() * fieldLength);

    if (!cellBombs[index] && index !== invulnerable) {
      cellBombs[index] = true;
      bombs++;
    }
  }

  return cellBombs;
};

const forEachCellAround = (index, max, callback) => {
  const valuesToGetIndexes = [-9, -8, -7, -1, 1, 7, 8, 9];

  valuesToGetIndexes.forEach((value) => {
    const indexCounter = index + value;
    const col = index % 8;

    if (indexCounter < 0 || max <= indexCounter) {
      return;
    }
    if (col === 0) {
      switch (value) {
        case -9:
        case -1:
        case 7:
          return;
        default:
      }
    }
    if (col === 7) {
      switch (value) {
        case -7:
        case 1:
        case 9:
          return;
        default:
      }
    }

    callback(indexCounter);
  });
};

const countBombs = (bombsField) => {
  const countedBombs = new Array(bombsField.length).fill(0);

  bombsField.forEach((hasBomb, index) => {
    if (!hasBomb) {
      return;
    }

    forEachCellAround(index, bombsField.length, (i) => countedBombs[i]++);
  });

  return countedBombs;
};

const Field = ({ stop, bombs, explode, setBombs, onFirstClick }) => {
  const [bombsField, setBombsField] = useState(createBombsField(bombs));
  const [field, setField] = useState(new Array(bombsField.length).fill(false));
  const countedBombs = countBombs(bombsField);

  const rows = bombsField.map((hasBomb, index) => {
    const propagate = () => {
      if (hasBomb) {
        return () => {
          setField(bombsField.map((hasBomb, i) => hasBomb || field[i]));
          explode();
        };
      }

      if (countedBombs[index]) {
        return () => {
          const newField = [...field];

          newField[index] = true;
          setField(newField);
        };
      }

      return () => {
        const newField = [...field];
        const indexes = [index];

        const activator = (index_) => {
          if (bombsField[index_] || newField[index_]) {
            return;
          }
          if (!countedBombs[index_]) {
            indexes.push(index_);
          }

          newField[index_] = true;
        };

        for (const index_ of indexes) {
          forEachCellAround(index_, newField.length, (i) => activator(i));
        }

        setField(newField);
      };
    };

    const firstClick = (callback) => {
      onFirstClick(() => {
        callback();
      });
    };

    return (
      <Cell
        stop={stop}
        bombs={countedBombs[index]}
        hasBomb={hasBomb}
        setBombs={setBombs}
        activated={field[index]}
        propagate={propagate()}
        firstClick={firstClick}
        key={index}
      />
    );
  });

  return <div id="field">{rows}</div>;
};

export default Field;
