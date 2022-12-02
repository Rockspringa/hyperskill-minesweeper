import React, {useState} from 'react';

function Cell(props) {
  const [classes, setClasses] = useState("cell");
  const [stepped, setStepped] = useState(false);

  const stepOnCell = (event) => {
    if (event.type === "click") {
      if (!stepped && stepped !== undefined) {
        if (props.withBomb) {
          setClasses("cell mine");
        } else {
          setClasses("cell opened");
        }

        setStepped(true);
      }
    } else if (event.type === "contextmenu") {
      event.preventDefault();
      if (stepped === undefined) {
        setClasses("cell");
      } else if (!stepped) {
        setClasses("cell flag");
      }
    }
  }

  return (
    <div className={classes} onClick={stepOnCell} onContextMenu={stepOnCell}>
    </div>
  );
}

export default Cell;
