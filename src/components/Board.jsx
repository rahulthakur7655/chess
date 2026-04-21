import Square from "./Square";

function Board(props) {
  const { board, orientation, selected, moves, lastMove, checkedKing, onSquareClick } =
    props;
  const isBlackView = orientation === "b";
  const files = isBlackView
    ? ["h", "g", "f", "e", "d", "c", "b", "a"]
    : ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = isBlackView
    ? ["1", "2", "3", "4", "5", "6", "7", "8"]
    : ["8", "7", "6", "5", "4", "3", "2", "1"];

  return (
    <div style={styles.wrapper}>
      <div style={styles.rankLabels}>
        {ranks.map((rank) => (
          <span key={rank} style={styles.label}>
            {rank}
          </span>
        ))}
      </div>

      <div>
        <div style={styles.grid}>
          {board.map((row, i) =>
            row.map((sq, j) => {
              const square = `${files[j]}${ranks[i]}`;
              const isWhite = (i + j) % 2 === 0;

              let moveObj = null;
              for (let k = 0; k < moves.length; k += 1) {
                if (moves[k].to === square) {
                  moveObj = moves[k];
                  break;
                }
              }

              return (
                <Square
                  key={square}
                  square={square}
                  piece={sq}
                  isWhite={isWhite}
                  isSelected={selected === square}
                  isMove={!!moveObj}
                  isCapture={!!moveObj?.isCapture}
                  isLastMove={
                    !!lastMove && (lastMove.from === square || lastMove.to === square)
                  }
                  isCheck={checkedKing === square}
                  onClick={() => onSquareClick(square)}
                />
              );
            })
          )}
        </div>

        <div style={styles.fileLabels}>
          {files.map((file) => (
            <span key={file} style={styles.label}>
              {file}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Board;

const styles = {
  wrapper: {
    display: "grid",
    gridTemplateColumns: "20px auto",
    gap: "12px",
    alignItems: "start"
  },
  rankLabels: {
    height: "576px",
    display: "grid",
    gridTemplateRows: "repeat(8, 72px)",
    alignItems: "center",
    color: "#9db2bf",
    fontSize: "14px"
  },
  fileLabels: {
    marginTop: "10px",
    display: "grid",
    gridTemplateColumns: "repeat(8, 72px)",
    justifyItems: "center",
    color: "#9db2bf",
    fontSize: "14px"
  },
  label: {
    userSelect: "none"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 72px)",
    borderRadius: "16px",
    overflow: "hidden"
  }
};
