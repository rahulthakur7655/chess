import Piece from "./Piece";

function Square(props) {
  const {
    square,
    piece,
    isWhite,
    isSelected,
    isMove,
    isCapture,
    onClick
  } = props;

  let bgColor = "#b58863";

  if (isWhite) bgColor = "#f0d9b5";
  if (isCapture) bgColor = "#ef4444";
  if (isSelected) bgColor = "#facc15";

  return (
    <div
      onClick={onClick}
      style={{
        width: "70px",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "34px",
        cursor: "pointer",
        backgroundColor: bgColor,
        position: "relative"
      }}
    >
      {/* move indicator */}
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

      {/* capture indicator */}
      {isCapture ? (
        <div
          style={{
            position: "absolute",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "4px solid red"
          }}
        />
      ) : null}

      <Piece piece={piece} />
    </div>
  );
}

export default Square;