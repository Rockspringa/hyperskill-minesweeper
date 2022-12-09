import React from "react";
import Cell from "./Cell";

function Row(props) {
  const cellsData = props.gameFlow.cells;
  const cells = cellsData[props.row].map((withBomb, index) => {
    const pos = { row: props.row, col: index };
    const bomb = typeof withBomb == "boolean" ? withBomb : withBomb.bomb;

    cellsData[props.row][index] = {
      bomb,
      stepped: false,
    };

    return (
      <Cell
        key={index + 8 * props.row}
        pos={pos}
        withBomb={bomb}
        gameFlow={props.gameFlow}
      />
    );
  });

  return <div className="row">{cells}</div>;
}

export default React.memo(Row, () => true);
