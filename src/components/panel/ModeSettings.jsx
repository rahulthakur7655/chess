import ModeButton from "./ui/ModeButton";
import { styles } from "../../styles/app/appStyles";

function AIModeSettings(props) {
  const {
    playerColor,
    aiDifficulty,
    onSwitchPlayerColor,
    onSwitchAIDifficulty
  } = props;

  return (
    <div style={styles.aiControls}>
      <span style={styles.infoLabel}>Play as</span>
      <div style={styles.segmented}>
        <ModeButton
          active={playerColor === "w"}
          onClick={() => onSwitchPlayerColor("w")}
        >
          White
        </ModeButton>
        <ModeButton
          active={playerColor === "b"}
          onClick={() => onSwitchPlayerColor("b")}
        >
          Black
        </ModeButton>
      </div>

      <span style={styles.infoLabel}>Difficulty</span>
      <div style={styles.segmentedThree}>
        <ModeButton
          active={aiDifficulty === "easy"}
          onClick={() => onSwitchAIDifficulty("easy")}
        >
          Easy
        </ModeButton>
        <ModeButton
          active={aiDifficulty === "moderate"}
          onClick={() => onSwitchAIDifficulty("moderate")}
        >
          Moderate
        </ModeButton>
        <ModeButton
          active={aiDifficulty === "hard"}
          onClick={() => onSwitchAIDifficulty("hard")}
        >
          Hard
        </ModeButton>
      </div>
    </div>
  );
}

function TwoPlayerSettings(props) {
  const { twoPlayerView, onSwitchTwoPlayerView } = props;

  return (
    <div style={styles.aiControls}>
      <span style={styles.infoLabel}>Two player view</span>
      <div style={styles.segmented}>
        <ModeButton
          active={twoPlayerView === "pc"}
          onClick={() => onSwitchTwoPlayerView("pc")}
        >
          PC
        </ModeButton>
        <ModeButton
          active={twoPlayerView === "mobile"}
          onClick={() => onSwitchTwoPlayerView("mobile")}
        >
          Mobile
        </ModeButton>
      </div>
      <p style={styles.modeHint}>
        {twoPlayerView === "pc"
          ? "PC view rotates the board after every move."
          : "Mobile view keeps the board fixed so the pieces stay in place."}
      </p>
    </div>
  );
}

function OnlineModeSettings(props) {
  const { onlineState, onJoinQueue, onLeaveQueue } = props;

  return (
    <div style={styles.aiControls}>
      <span style={styles.infoLabel}>Online matchmaking</span>
      <p style={styles.modeHint}>
        {onlineState.match
          ? `Matched vs ${onlineState.match.opponent.username} as ${
              onlineState.match.color === "w" ? "White" : "Black"
            }.`
          : onlineState.waiting
            ? "Searching for a nearby-ranked opponent..."
            : "Join queue to get a live match against someone near your rating."}
      </p>
      <button
        onClick={onlineState.waiting ? onLeaveQueue : onJoinQueue}
        style={styles.primaryButton}
      >
        {onlineState.waiting ? "Leave queue" : "Join queue"}
      </button>
    </div>
  );
}

function ModeSettings(props) {
  const {
    gameMode,
    twoPlayerView,
    aiDifficulty,
    onlineState,
    playerColor,
    onSwitchMode,
    onSwitchTwoPlayerView,
    onSwitchPlayerColor,
    onSwitchAIDifficulty,
    onJoinQueue,
    onLeaveQueue
  } = props;

  return (
    <div style={styles.modeCard}>
      <span style={styles.infoLabel}>Mode</span>
      <div style={styles.segmentedThree}>
        <ModeButton
          active={gameMode === "twoPlayer"}
          onClick={() => onSwitchMode("twoPlayer")}
        >
          Local
        </ModeButton>
        <ModeButton active={gameMode === "ai"} onClick={() => onSwitchMode("ai")}>
          AI
        </ModeButton>
        <ModeButton
          active={gameMode === "online"}
          onClick={() => onSwitchMode("online")}
        >
          Online
        </ModeButton>
      </div>

      {gameMode === "ai" ? (
        <AIModeSettings
          playerColor={playerColor}
          aiDifficulty={aiDifficulty}
          onSwitchPlayerColor={onSwitchPlayerColor}
          onSwitchAIDifficulty={onSwitchAIDifficulty}
        />
      ) : gameMode === "online" ? (
        <OnlineModeSettings
          onlineState={onlineState}
          onJoinQueue={onJoinQueue}
          onLeaveQueue={onLeaveQueue}
        />
      ) : (
        <TwoPlayerSettings
          twoPlayerView={twoPlayerView}
          onSwitchTwoPlayerView={onSwitchTwoPlayerView}
        />
      )}
    </div>
  );
}

export default ModeSettings;
