import Square from "./Square";

function Board(props) {
  const { board, flipped, selected, moves, onSquareClick } = props;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 70px)",
        borderRadius: "10px",
        overflow: "hidden"
      }}
    >
      {board.map((row, i) => {
        return row.map((sq, j) => {
          let isWhite = (i + j) % 2 === 0;

          let r = flipped ? 7 - i : i;
          let c = flipped ? 7 - j : j;

          let square = String.fromCharCode(97 + c) + (8 - r);

          // check move
          let moveObj = null;
          for (let k = 0; k < moves.length; k++) {
            if (moves[k].to === square) {
              moveObj = moves[k];
              break;
            }
          }

          let isMove = false;
          let isCapture = false;

          if (moveObj) {
            isMove = true;
            isCapture = moveObj.isCapture;
          }

          return (
            <Square
              key={square}
              square={square}
              piece={sq}
              isWhite={isWhite}
              isSelected={selected === square}
              isMove={isMove}
              isCapture={isCapture}
              onClick={() => onSquareClick(i, j)}
            />
          );
        });
      })}
    </div>
  );
}

export default Board;