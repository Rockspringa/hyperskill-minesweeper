import React from "react";
import reset from "../../images/emoji.svg";

const Reset = ({ resetGame }) => (
  <div onClick={resetGame}>
    <img src={reset} alt="bomb counter" />
  </div>
);

export default Reset;
