import Counter from "./info/Counter";
import Reset from "./info/Reset";
import Timer from "./info/Timer";

const Info = ({ bombs, resetGame, gameState }) => (
  <div id="info">
    <Counter bombs={bombs} />
    <Reset resetGame={resetGame} gameState={gameState} />
    <Timer gameState={gameState} />
  </div>
);

export default Info;
