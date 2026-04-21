import { Chess } from "chess.js";

const pieceValues = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000
};

const centerSquares = new Set(["c3", "c4", "c5", "c6", "d3", "d4", "d5", "d6", "e3", "e4", "e5", "e6", "f3", "f4", "f5", "f6"]);

export const createGame = () => new Chess();

export const getMoves = (game, square) => {
  return game.moves({ square, verbose: true }).map((move) => ({
    to: move.to,
    isCapture: !!move.captured,
    piece: move.piece,
    captured: move.captured || null
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

function evaluateBoard(game) {
  const board = game.board();
  let score = 0;

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      const piece = board[row][col];

      if (!piece) {
        continue;
      }

      const value = pieceValues[piece.type];
      const square = `${String.fromCharCode(97 + col)}${8 - row}`;
      const centerBonus = centerSquares.has(square) ? 12 : 0;
      const signedValue = value + centerBonus;

      score += piece.color === "w" ? signedValue : -signedValue;
    }
  }

  return score;
}

function scoreMove(game, move) {
  let score = 0;

  if (move.captured) {
    score += pieceValues[move.captured] - pieceValues[move.piece] * 0.1;
  }

  if (move.promotion) {
    score += 800;
  }

  if (move.san.includes("+")) {
    score += 60;
  }

  if (move.san.includes("#")) {
    score += 100000;
  }

  if (centerSquares.has(move.to)) {
    score += 18;
  }

  const nextGame = new Chess(game.fen());
  nextGame.move({
    from: move.from,
    to: move.to,
    promotion: "q"
  });

  const boardScore = evaluateBoard(nextGame);
  score += move.color === "w" ? boardScore : -boardScore;

  if (nextGame.isCheckmate()) {
    score += 100000;
  }

  if (nextGame.isCheck()) {
    score += 40;
  }

  return score;
}

function pickRandomMove(game) {
  const legalMoves = game.moves({ verbose: true });

  if (legalMoves.length === 0) {
    return null;
  }

  return legalMoves[Math.floor(Math.random() * legalMoves.length)];
}

function pickModerateMove(game) {
  const legalMoves = game.moves({ verbose: true });

  if (legalMoves.length === 0) {
    return null;
  }

  const scoredMoves = legalMoves.map((move) => ({
    ...move,
    score: scoreMove(game, move) + Math.random() * 25
  }));

  scoredMoves.sort((a, b) => b.score - a.score);
  const topMoves = scoredMoves.slice(0, Math.min(3, scoredMoves.length));
  return topMoves[Math.floor(Math.random() * topMoves.length)];
}

function minimax(game, depth, maximizingColor, alpha, beta) {
  if (depth === 0 || game.isGameOver()) {
    const score = evaluateBoard(game);
    return maximizingColor === "w" ? score : -score;
  }

  const moves = game.moves({ verbose: true });

  if (game.turn() === maximizingColor) {
    let bestScore = -Infinity;

    for (const move of moves) {
      const nextGame = new Chess(game.fen());
      nextGame.move({
        from: move.from,
        to: move.to,
        promotion: "q"
      });

      const score = minimax(nextGame, depth - 1, maximizingColor, alpha, beta);
      bestScore = Math.max(bestScore, score);
      alpha = Math.max(alpha, score);

      if (beta <= alpha) {
        break;
      }
    }

    return bestScore;
  }

  let bestScore = Infinity;

  for (const move of moves) {
    const nextGame = new Chess(game.fen());
    nextGame.move({
      from: move.from,
      to: move.to,
      promotion: "q"
    });

    const score = minimax(nextGame, depth - 1, maximizingColor, alpha, beta);
    bestScore = Math.min(bestScore, score);
    beta = Math.min(beta, score);

    if (beta <= alpha) {
      break;
    }
  }

  return bestScore;
}

function pickHardMove(game) {
  const legalMoves = game.moves({ verbose: true });

  if (legalMoves.length === 0) {
    return null;
  }

  const maximizingColor = game.turn();
  let bestMove = legalMoves[0];
  let bestScore = -Infinity;

  for (const move of legalMoves) {
    const nextGame = new Chess(game.fen());
    nextGame.move({
      from: move.from,
      to: move.to,
      promotion: "q"
    });

    let score = minimax(nextGame, 1, maximizingColor, -Infinity, Infinity);
    score += scoreMove(game, move) * 0.2;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

export const getAIMove = (game, difficulty = "moderate") => {
  if (difficulty === "easy") {
    return pickRandomMove(game);
  }

  if (difficulty === "hard") {
    return pickHardMove(game);
  }

  return pickModerateMove(game);
};
