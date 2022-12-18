import React from "react";
import bomb from "../../images/bomb.svg";

const Counter = (props) => (
  <div>
    <img src={bomb} alt="bomb counter" className="bombs-counter" />
    <p>{props.bombs}</p>
  </div>
);

export default Counter;
