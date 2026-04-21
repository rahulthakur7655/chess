export const pieceIcons = {
  wp: "\u2659",
  wr: "\u2656",
  wn: "\u2658",
  wb: "\u2657",
  wq: "\u2655",
  wk: "\u2654",
  bp: "\u265F",
  br: "\u265C",
  bn: "\u265E",
  bb: "\u265D",
  bq: "\u265B",
  bk: "\u265A"
};

export function formatStatus(game, gameMode, aiColor) {
  if (game.isCheckmate()) {
    return `Checkmate. ${game.turn() === "w" ? "Black" : "White"} wins.`;
  }

  if (game.isStalemate()) {
    return "Stalemate.";
  }

  if (game.isThreefoldRepetition()) {
    return "Draw by threefold repetition.";
  }

  if (game.isInsufficientMaterial()) {
    return "Draw by insufficient material.";
  }

  if (game.isDraw()) {
    return "Draw.";
  }

  if (gameMode === "ai" && game.turn() === aiColor) {
    return `${aiColor === "w" ? "White" : "Black"} AI is thinking...`;
  }

  if (game.isCheck()) {
    return `${game.turn() === "w" ? "White" : "Black"} is in check.`;
  }

  return `${game.turn() === "w" ? "White" : "Black"} to move.`;
}

export function getCapturedPieces(game) {
  const capturedByWhite = [];
  const capturedByBlack = [];

  for (const move of game.history({ verbose: true })) {
    if (!move.captured) {
      continue;
    }

    const capturedPiece = {
      type: move.captured,
      color: move.color === "w" ? "b" : "w"
    };

    if (move.color === "w") {
      capturedByWhite.push(capturedPiece);
    } else {
      capturedByBlack.push(capturedPiece);
    }
  }

  return { capturedByWhite, capturedByBlack };
}

export function findCheckedKing(game) {
  if (!game.isCheck()) {
    return null;
  }

  const board = game.board();

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      const piece = board[row][col];

      if (piece && piece.type === "k" && piece.color === game.turn()) {
        return `${String.fromCharCode(97 + col)}${8 - row}`;
      }
    }
  }

  return null;
}
