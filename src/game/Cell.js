import React, {useEffect, useState} from 'react';

const countBombs = (cells, pos) => {
  const rows = [pos.row];
  const cols = [pos.col];

  switch (pos.row) {
    case 0:
      rows.push(1);
      break;

    case 8:
      rows.push(7);
      break;

    default:
      rows.push(pos.row - 1, pos.row + 1);
  }

  switch (pos.col) {
    case 0:
      cols.push(1);
      break;

    case 7:
      cols.push(6);
      break;

    default:
      cols.push(pos.col - 1, pos.col + 1);
  }

  let count = 0;
  for (const r of rows) {
    for (const c of cols) {
      if (cells[r][c].bomb && (pos.row !== r || pos.col !== c)) {
        count++;
      }
    }
  }

  return count;
}

const fireCellOpening = (cells, pos) => {
  const nearCells = [];

  switch (pos.row) {
    case 0:
      nearCells.push(cells[1][pos.col]);
      break;

    case 8:
      nearCells.push(cells[7][pos.col]);
      break;

    default:
      nearCells.push(cells[pos.row - 1][pos.col], cells[pos.row + 1][pos.col]);
  }

  switch (pos.col) {
    case 0:
      nearCells.push(cells[pos.row][1]);
      break;

    case 7:
      nearCells.push(cells[pos.row][6]);
      break;

    default:
      nearCells.push(cells[pos.row][pos.col - 1], cells[pos.row][pos.col + 1]);
  }

  nearCells.filter(cell => !(cell.stepped || cell.bomb)).forEach(cell => cell.stepOnCell());
}

function Cell(props) {
  const [classes, setClasses] = useState("cell");
  const [stepped, setStepped] = useState(false);
  const self = props.gameFlow.cells[props.pos.row][props.pos.col];

  const stepOnCell = async () => {
    if (stepped || stepped === undefined || props.gameFlow.stop) return;
    props.gameFlow.beginGame?.apply(undefined);

    if (props.withBomb) {
      setClasses("cell mine");
      props.gameFlow.bombExploded();
      props.gameFlow.stop = true;
    } else {
      setClasses("cell opened");
    }

    setStepped(true);
    self.stepped = true;
  }

  const flagOnCell = (event) => {
    if (stepped || props.gameFlow.stop) return;
    props.gameFlow.beginGame?.apply(undefined);
    event.preventDefault();

    if (stepped === undefined) {
      setClasses("cell");
      setStepped(false);
      props.gameFlow.setBombs(bombs => bombs + 1);
    } else if (props.gameFlow.bombs !== 0) {
      setClasses("cell flag");
      setStepped(undefined);
      props.gameFlow.setBombs(bombs => bombs - 1);
    }
  }

  self.stepOnCell = stepOnCell;

  useEffect(() => !countBombs(props.gameFlow.cells, props.pos) && self.stepped ? fireCellOpening(props.gameFlow.cells, props.pos)
        : undefined, [stepped && !props.withBomb]);

  return (
    <div className={classes} onClick={stepOnCell} onContextMenu={flagOnCell}>
      {stepped && countBombs(props.gameFlow.cells, props.pos) ? <h6>{countBombs(props.gameFlow.cells, props.pos)}</h6> : <></>}
    </div>
  );
}

export default Cell;
