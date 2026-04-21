export function getResultForFinishedGame(game, playerColor) {
  if (game.isDraw()) {
    return "draw";
  }

  if (game.isCheckmate()) {
    return game.turn() === playerColor ? "loss" : "win";
  }

  return null;
}
