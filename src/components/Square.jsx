import Piece from "./Piece";

function Square(props) {
  const {
    square,
    piece,
    isWhite,
    isSelected,
    isMove,
    isCapture,
    isLastMove,
    isCheck,
    onClick
  } = props;

  let bgColor = "#b58863";

  if (isWhite) bgColor = "#f0d9b5";
  if (isLastMove) bgColor = isWhite ? "#d8c36a" : "#b39247";
  if (isCapture) bgColor = "#ef4444";
  if (isSelected) bgColor = "#facc15";
  if (isCheck) bgColor = "#fb7185";

  return (
    <div
      onClick={onClick}
      style={{
        width: "72px",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "38px",
        cursor: "pointer",
        backgroundColor: bgColor,
        position: "relative",
        transition: "background-color 0.16s ease, transform 0.12s ease"
      }}
    >
      {isMove && !isCapture && !piece ? (
        <div
          style={{
            width: "15px",
            height: "15px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.4)"
          }}
        />
      ) : null}

      {isCapture ? (
        <div
          style={{
            position: "absolute",
            width: "62px",
            height: "62px",
            borderRadius: "50%",
            border: "4px solid rgba(127, 29, 29, 0.85)"
          }}
        />
      ) : null}

      <span
        style={{
          position: "absolute",
          bottom: "6px",
          left: "7px",
          fontSize: "11px",
          fontWeight: 700,
          color: isWhite ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.55)",
          userSelect: "none"
        }}
      >
        {square}
      </span>

      <Piece piece={piece} />
    </div>
  );
}

export default Square;
