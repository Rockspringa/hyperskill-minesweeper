import Counter from "./info/Counter";
import Reset from "./info/Reset";
import Timer from "./info/Timer";

const Info = ({ stop, bombs, resetGame, defaultState }) => {
  return (
    <div id="info">
      <Counter bombs={bombs} />
      <Reset resetGame={resetGame} />
      <Timer defaultState={defaultState} stopped={stop} />
    </div>
  );
};

export default Info;
