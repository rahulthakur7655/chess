const pieces = {
  p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
  P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔"
};

function Piece(props) {
  const piece = props.piece;

  if (piece === null) {
    return null;
  }

  let key;

  if (piece.color === "w") {
    key = piece.type.toUpperCase();
  } else {
    key = piece.type;
  }

  return <span>{pieces[key]}</span>;
}

export default Piece;