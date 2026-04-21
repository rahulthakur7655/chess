import { styles } from "../../styles/app/appStyles";

function MoveListItem(props) {
  const { move, index } = props;

  return (
    <div style={styles.moveItem}>
      <span style={styles.moveNumber}>
        {Math.floor(index / 2) + 1}
        {index % 2 === 0 ? "." : "..."}
      </span>
      <span>{move.san}</span>
    </div>
  );
}

function MoveList(props) {
  const { history } = props;

  return (
    <div style={styles.infoCard}>
      <span style={styles.infoLabel}>Move list</span>
      <div style={styles.moveList}>
        {history.length === 0 ? (
          <span style={styles.emptyState}>No moves yet</span>
        ) : (
          history.map((move, index) => (
            <MoveListItem key={`${move.san}-${index}`} move={move} index={index} />
          ))
        )}
      </div>
    </div>
  );
}

export default MoveList;
