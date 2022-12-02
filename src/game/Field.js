import React from 'react';
import Row from "./Row";
import './Field.css';

function Field(props) {
  const rows = props.gameFlow.cells.map(
    (_, index) => <Row key={72 + index} row={index} gameFlow={props.gameFlow}/>
  );

  return (
    <div id="field">
      {rows}
    </div>
  );
}

export default React.memo(Field, () => true);
