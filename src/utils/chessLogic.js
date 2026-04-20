import { Chess } from "chess.js";

export const createGame = () => new Chess();


export const getBoard = (game, flipped) => {
  let board = game.board();

  if (flipped) {
    board = [...board].reverse().map(row => [...row].reverse());
  }

  return board;
};

export const getMoves = (game, square) => {
  return game.moves({ square, verbose: true }).map(m => ({
    to: m.to,
    isCapture: !!m.captured,   
    piece: m.piece,            
    captured: m.captured || null
  }));
};

export const makeMove = (game, from, to) => {
  const newGame = new Chess(game.fen());

  const move = newGame.move({
    from,
    to,
    promotion: "q"
  });

  return move ? newGame : null;
};