import React, {useState} from 'react';

function Cell(props) {
  const [classes, setClasses] = useState("cell");
  const [stepped, setStepped] = useState(false);

  const stepOnCell = () => {
    if (!stepped) {
      if (props.withBomb) {
        setClasses("cell mine");
      } else {
        setClasses("cell opened");
      }

      setStepped(true);
    }
  }

  return (
    <div className={classes} onClick={stepOnCell}>
    </div>
  );
}

export default Cell;
