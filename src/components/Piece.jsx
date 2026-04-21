const pieces = {
  p: "\u265F",
  r: "\u265C",
  n: "\u265E",
  b: "\u265D",
  q: "\u265B",
  k: "\u265A",
  P: "\u2659",
  R: "\u2656",
  N: "\u2658",
  B: "\u2657",
  Q: "\u2655",
  K: "\u2654"
};

function Piece(props) {
  const piece = props.piece;

  if (piece === null) {
    return null;
  }

  const key = piece.color === "w" ? piece.type.toUpperCase() : piece.type;
  const pieceColor = piece.color === "w" ? "#f8fafc" : "#111827";
  const strokeColor = piece.color === "w" ? "rgba(15, 23, 42, 0.45)" : "rgba(248, 250, 252, 0.2)";

  return (
    <span
      style={{
        lineHeight: 1,
        color: pieceColor,
        textShadow: `0 1px 0 ${strokeColor}, 0 2px 6px rgba(0, 0, 0, 0.35)`,
        filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2))"
      }}
    >
      {pieces[key]}
    </span>
  );
}

export default Piece;
