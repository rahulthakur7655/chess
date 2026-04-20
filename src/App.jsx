import { useState } from "react";
import Board from "./components/Board";
import { createGame, getBoard, getMoves, makeMove } from "./utils/chessLogic";

function App() {
  const [game, setGame] = useState(createGame());
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState([]);
  const [shake, setShake] = useState(0);

  const flipped = game.turn() === "b";
  const board = getBoard(game, flipped);

  const handleClick = (row, col) => {
    let r = flipped ? 7 - row : row;
    let c = flipped ? 7 - col : col;

    let square = String.fromCharCode(97 + c) + (8 - r);
    let piece = game.get(square);

    // if already selected
    if (selected) {
      // change selection if same color piece
      if (piece && piece.color === game.turn()) {
        setSelected(square);
        setMoves(getMoves(game, square));
        return;
      }

      let target = game.get(square);
      let newGame = makeMove(game, selected, square);

      if (newGame) {
        // simple capture effect
        if (target) {
          let power = 2;

          if (target.type === "q") power = 8;
          else if (target.type === "r") power = 5;
          else if (target.type === "n" || target.type === "b") power = 3;
          else if (target.type === "k") power = 10;

          setShake(power);
          setTimeout(() => setShake(0), 300);
        }

        setGame(newGame);
      }

      setSelected(null);
      setMoves([]);
      return;
    }

    // select piece
    if (piece && piece.color === game.turn()) {
      setSelected(square);
      setMoves(getMoves(game, square));
    }
  };

  const resetGame = () => {
    setGame(createGame());
    setSelected(null);
    setMoves([]);
    setShake(0);
  };

  return (
    <div style={styles.container}>
      <h1>Chess Game</h1>

      <div
        style={{
          transform: shake
            ? `translate(${(Math.random() - 0.5) * shake * 4}px, ${(Math.random() - 0.5) * shake * 4}px)`
            : "none",
          transition: "0.1s"
        }}
      >
        <Board
          board={board}
          flipped={flipped}
          selected={selected}
          moves={moves}
          onSquareClick={handleClick}
        />
      </div>

      <h3>Turn: {game.turn() === "w" ? "White" : "Black"}</h3>

      <button onClick={resetGame}>Restart</button>
    </div>
  );
}

export default App;

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#1e1e2f",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  }
};