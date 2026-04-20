import { Chess } from "chess.js";

export const createGame = () => new Chess();

// 🔄 Get board (with flip support)
export const getBoard = (game, flipped) => {
  let board = game.board();

  if (flipped) {
    board = [...board].reverse().map(row => [...row].reverse());
  }

  return board;
};

// 🎯 Get moves (with capture info)
export const getMoves = (game, square) => {
  return game.moves({ square, verbose: true }).map(m => ({
    to: m.to,
    isCapture: !!m.captured,   // ✅ cleaner
    piece: m.piece,            // optional (future use)
    captured: m.captured || null
  }));
};

// ♟ Make move safely
export const makeMove = (game, from, to) => {
  const newGame = new Chess(game.fen());

  const move = newGame.move({
    from,
    to,
    promotion: "q"
  });

  return move ? newGame : null;
};