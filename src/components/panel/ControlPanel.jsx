import ActionButtons from "./ActionButtons";
import CapturedPieces from "./CapturedPieces";
import ModeSettings from "./ModeSettings";
import ProfileCard from "./ProfileCard";
import StatusCard from "./StatusCard";
import { styles } from "../../styles/app/appStyles";

function ControlPanel(props) {
  const {
    gameMode,
    status,
    twoPlayerView,
    aiDifficulty,
    onlineState,
    playerColor,
    user,
    capturedByWhite,
    capturedByBlack,
    onSwitchMode,
    onSwitchTwoPlayerView,
    onSwitchPlayerColor,
    onSwitchAIDifficulty,
    onJoinQueue,
    onLeaveQueue,
    onResetGame,
    onFlipBoard,
    onLogout
  } = props;

  return (
    <section style={styles.sidePanel}>
      <p style={styles.eyebrow}>React + Mongo + Socket.IO</p>
      <h1 style={styles.title}>Studio Chess</h1>
      <p style={styles.subtitle}>
        Track wins, climb ranks, and switch between local, AI, and online play.
      </p>

      <ProfileCard user={user} onLogout={onLogout} />
      <StatusCard status={status} />
      <ModeSettings
        gameMode={gameMode}
        twoPlayerView={twoPlayerView}
        aiDifficulty={aiDifficulty}
        onlineState={onlineState}
        playerColor={playerColor}
        onSwitchMode={onSwitchMode}
        onSwitchTwoPlayerView={onSwitchTwoPlayerView}
        onSwitchPlayerColor={onSwitchPlayerColor}
        onSwitchAIDifficulty={onSwitchAIDifficulty}
        onJoinQueue={onJoinQueue}
        onLeaveQueue={onLeaveQueue}
      />
      <ActionButtons
        gameMode={gameMode}
        onResetGame={onResetGame}
        onFlipBoard={onFlipBoard}
      />

      <CapturedPieces
        capturedByWhite={capturedByWhite}
        capturedByBlack={capturedByBlack}
      />
    </section>
  );
}

export default ControlPanel;
