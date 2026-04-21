import { pieceIcons } from "../../utils/game/gameUI";
import { styles } from "../../styles/app/appStyles";

function CapturedPieceRow(props) {
  const { pieces } = props;

  if (pieces.length === 0) {
    return <span style={styles.emptyState}>None yet</span>;
  }

  return pieces.map((piece, index) => (
    <span
      key={`${piece.color}${piece.type}-${index}`}
      style={styles.capturedPiece}
    >
      {pieceIcons[`${piece.color}${piece.type}`]}
    </span>
  ));
}

function CapturedPieceCard(props) {
  const { title, pieces } = props;

  return (
    <div style={styles.infoCard}>
      <span style={styles.infoLabel}>{title}</span>
      <div style={styles.capturedRow}>
        <CapturedPieceRow pieces={pieces} />
      </div>
    </div>
  );
}

function CapturedPieces(props) {
  const { capturedByWhite, capturedByBlack } = props;

  return (
    <div style={styles.capturedGrid}>
      <CapturedPieceCard title="Captured by White" pieces={capturedByWhite} />
      <CapturedPieceCard title="Captured by Black" pieces={capturedByBlack} />
    </div>
  );
}

export default CapturedPieces;
