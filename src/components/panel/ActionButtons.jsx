import { styles } from "../../styles/app/appStyles";

function ActionButtons(props) {
  const { gameMode, onResetGame, onFlipBoard } = props;
  const flipDisabled = gameMode === "twoPlayer" || gameMode === "online";

  return (
    <div style={styles.controls}>
      <button onClick={onResetGame} style={styles.primaryButton}>
        Restart match
      </button>
      <button
        onClick={onFlipBoard}
        style={{
          ...styles.secondaryButton,
          ...(flipDisabled ? styles.disabledButton : {})
        }}
        disabled={flipDisabled}
      >
        Flip board
      </button>
    </div>
  );
}

export default ActionButtons;
