export function getOrientation(gameMode, twoPlayerView, game, manualOrientation) {
  if (gameMode === "twoPlayer") {
    return twoPlayerView === "pc" ? game.turn() : "w";
  }

  return manualOrientation;
}

export function getDisplayedBoard(game, orientation) {
  const nextBoard = game.board();

  if (orientation === "b") {
    return [...nextBoard].reverse().map((row) => [...row].reverse());
  }

  return nextBoard;
}

export function getBoardTransform(shake, boardRotation) {
  const shakeX = shake ? (Math.random() - 0.5) * shake * 4 : 0;
  const shakeY = shake ? (Math.random() - 0.5) * shake * 4 : 0;
  return `translate(${shakeX}px, ${shakeY}px) rotate(${boardRotation}deg)`;
}
