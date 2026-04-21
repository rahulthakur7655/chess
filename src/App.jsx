import { io } from "socket.io-client";
import { useEffect, useMemo, useRef, useState } from "react";
import { apiRequest, SOCKET_URL } from "./api/client";
import AuthPage from "./components/auth/AuthPage";
import Board from "./components/Board";
import ControlPanel from "./components/panel/ControlPanel";
import LeaderboardPanel from "./components/panel/LeaderboardPanel";
import MoveList from "./components/panel/MoveList";
import { styles } from "./styles/app/appStyles";
import {
  getBoardTransform,
  getDisplayedBoard,
  getOrientation
} from "./utils/game/boardView";
import { getCaptureShakePower } from "./utils/game/captureEffects";
import {
  createGame,
  getAIMove,
  getMoves,
  makeMove
} from "./utils/game/chessLogic";
import {
  findCheckedKing,
  formatStatus,
  getCapturedPieces
} from "./utils/game/gameUI";
import { getResultForFinishedGame } from "./utils/game/onlineResult";

const tokenStorageKey = "chess-app-token";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem(tokenStorageKey));
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [game, setGame] = useState(createGame());
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState([]);
  const [shake, setShake] = useState(0);
  const [gameMode, setGameMode] = useState("twoPlayer");
  const [twoPlayerView, setTwoPlayerView] = useState("pc");
  const [aiDifficulty, setAIDifficulty] = useState("moderate");
  const [playerColor, setPlayerColor] = useState("w");
  const [manualOrientation, setManualOrientation] = useState("w");
  const [boardRotation, setBoardRotation] = useState(0);
  const [isManualFlipAnimating, setIsManualFlipAnimating] = useState(false);
  const [onlineState, setOnlineState] = useState({
    waiting: false,
    match: null
  });

  const previousOrientationRef = useRef("w");
  const socketRef = useRef(null);
  const gameRef = useRef(game);
  const onlineStateRef = useRef(onlineState);

  useEffect(() => {
    gameRef.current = game;
  }, [game]);

  useEffect(() => {
    onlineStateRef.current = onlineState;
  }, [onlineState]);

  useEffect(() => {
    if (!token) {
      setAuthLoading(false);
      return undefined;
    }

    let active = true;

    apiRequest("/auth/me", { token })
      .then((data) => {
        if (active) {
          setUser(data.user);
        }
      })
      .catch(() => {
        localStorage.removeItem(tokenStorageKey);
        if (active) {
          setToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setAuthLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  useEffect(() => {
    apiRequest("/leaderboard")
      .then((data) => setLeaderboard(data.users))
      .catch(() => {});
  }, [user]);

  useEffect(() => {
    if (!token || !user) {
      return undefined;
    }

    const socket = io(SOCKET_URL, {
      auth: { token }
    });

    socket.on("queue:waiting", () => {
      setOnlineState((current) => ({ ...current, waiting: true }));
    });

    socket.on("match:found", (match) => {
      setOnlineState({
        waiting: false,
        match
      });
      setGameMode("online");
      setManualOrientation(match.color);
      setPlayerColor(match.color);
      setGame(createGame());
      setSelected(null);
      setMoves([]);
    });

    socket.on("move:played", ({ move }) => {
      const nextGame = makeMove(gameRef.current, move.from, move.to);

      if (!nextGame) {
        return;
      }

      setGame(nextGame);
      setSelected(null);
      setMoves([]);

      const result = getResultForFinishedGame(
        nextGame,
        onlineStateRef.current.match?.color
      );

      if (result && onlineStateRef.current.match) {
        socket.emit("match:finish", {
          matchId: onlineStateRef.current.match.matchId,
          result
        });
      }
    });

    socket.on("match:finished", ({ profile }) => {
      if (profile) {
        setUser(profile);
      }

      setOnlineState({
        waiting: false,
        match: null
      });
      setGame(createGame());
      setSelected(null);
      setMoves([]);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, user]);

  const aiColor = playerColor === "w" ? "b" : "w";
  const isOnlineTurn =
    gameMode === "online" &&
    onlineState.match &&
    game.turn() !== onlineState.match.color;
  const isAIsTurn =
    gameMode === "ai" && !game.isGameOver() && game.turn() === aiColor;
  const orientation = getOrientation(
    gameMode === "online" ? "ai" : gameMode,
    twoPlayerView,
    game,
    manualOrientation
  );
  const history = game.history({ verbose: true });
  const lastMove = history.length > 0 ? history[history.length - 1] : null;
  const checkedKing = findCheckedKing(game);
  const status =
    gameMode === "online" && onlineState.waiting
      ? "Searching for an online opponent..."
      : formatStatus(game, gameMode === "online" ? "ai" : gameMode, aiColor);
  const { capturedByWhite, capturedByBlack } = getCapturedPieces(game);

  const board = useMemo(
    () => getDisplayedBoard(game, orientation),
    [game, orientation]
  );

  useEffect(() => {
    if (!isAIsTurn) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      const aiMove = getAIMove(game, aiDifficulty);

      if (!aiMove) {
        return;
      }

      const target = game.get(aiMove.to);
      const newGame = makeMove(game, aiMove.from, aiMove.to);

      if (!newGame) {
        return;
      }

      const power = getCaptureShakePower(target);
      if (power > 0) {
        setShake(power);
        window.setTimeout(() => setShake(0), 260);
      }

      setGame(newGame);
      setSelected(null);
      setMoves([]);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [aiDifficulty, game, isAIsTurn]);

  useEffect(() => {
    previousOrientationRef.current = orientation;
  }, [orientation]);

  const applyLocalMove = (from, to) => {
    const target = game.get(to);
    const newGame = makeMove(game, from, to);

    if (!newGame) {
      return;
    }

    const power = getCaptureShakePower(target);
    if (power > 0) {
      setShake(power);
      window.setTimeout(() => setShake(0), 260);
    }

    setGame(newGame);
    setSelected(null);
    setMoves([]);

    if (gameMode === "online" && onlineState.match) {
      socketRef.current?.emit("move:play", {
        matchId: onlineState.match.matchId,
        move: { from, to }
      });

      const result = getResultForFinishedGame(newGame, onlineState.match.color);
      if (result) {
        socketRef.current?.emit("match:finish", {
          matchId: onlineState.match.matchId,
          result
        });
      }
    }
  };

  const handleClick = (square) => {
    if (isAIsTurn || isOnlineTurn) {
      return;
    }

    const piece = game.get(square);

    if (!selected && gameMode === "ai" && piece && piece.color !== playerColor) {
      return;
    }

    if (
      !selected &&
      gameMode === "online" &&
      piece &&
      piece.color !== onlineState.match?.color
    ) {
      return;
    }

    if (selected) {
      if (selected === square) {
        setSelected(null);
        setMoves([]);
        return;
      }

      if (piece && piece.color === game.turn()) {
        if (
          (gameMode === "ai" && piece.color !== playerColor) ||
          (gameMode === "online" && piece.color !== onlineState.match?.color)
        ) {
          return;
        }

        setSelected(square);
        setMoves(getMoves(game, square));
        return;
      }

      applyLocalMove(selected, square);
      return;
    }

    if (piece && piece.color === game.turn()) {
      if (
        (gameMode === "ai" && piece.color !== playerColor) ||
        (gameMode === "online" && piece.color !== onlineState.match?.color)
      ) {
        return;
      }

      setSelected(square);
      setMoves(getMoves(game, square));
    }
  };

  const resetGame = (nextMode = gameMode, nextPlayerColor = playerColor) => {
    setGame(createGame());
    setSelected(null);
    setMoves([]);
    setShake(0);
    setBoardRotation(0);
    setIsManualFlipAnimating(false);
    setManualOrientation(
      nextMode === "twoPlayer" ? "w" : nextPlayerColor
    );
    previousOrientationRef.current =
      nextMode === "twoPlayer" ? "w" : nextPlayerColor;
  };

  const switchMode = (nextMode) => {
    setGameMode(nextMode);

    if (nextMode !== "online") {
      socketRef.current?.emit("queue:leave");
      setOnlineState({ waiting: false, match: null });
    }

    resetGame(nextMode, playerColor);
  };

  const switchPlayerColor = (nextColor) => {
    setPlayerColor(nextColor);
    setGameMode("ai");
    resetGame("ai", nextColor);
  };

  const joinQueue = () => {
    setGameMode("online");
    socketRef.current?.emit("queue:join");
  };

  const leaveQueue = () => {
    socketRef.current?.emit("queue:leave");
    setOnlineState({ waiting: false, match: null });
  };

  const flipBoard = () => {
    if (gameMode === "twoPlayer" || gameMode === "online") {
      return;
    }

    setIsManualFlipAnimating(true);
    setManualOrientation((current) => (current === "w" ? "b" : "w"));
    setBoardRotation((current) => current + 180);
    window.setTimeout(() => {
      setIsManualFlipAnimating(false);
    }, 520);
  };

  const handleAuthSuccess = (nextToken, nextUser) => {
    localStorage.setItem(tokenStorageKey, nextToken);
    setToken(nextToken);
    setUser(nextUser);
    setAuthLoading(false);
  };

  const logout = () => {
    socketRef.current?.disconnect();
    localStorage.removeItem(tokenStorageKey);
    setToken(null);
    setUser(null);
    setOnlineState({ waiting: false, match: null });
  };

  const boardTransform = getBoardTransform(shake, boardRotation);

  if (authLoading) {
    return <div style={styles.container}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.shell}>
        <ControlPanel
          gameMode={gameMode}
          status={status}
          twoPlayerView={twoPlayerView}
          aiDifficulty={aiDifficulty}
          onlineState={onlineState}
          playerColor={playerColor}
          user={user}
          capturedByWhite={capturedByWhite}
          capturedByBlack={capturedByBlack}
          onSwitchMode={switchMode}
          onSwitchTwoPlayerView={setTwoPlayerView}
          onSwitchPlayerColor={switchPlayerColor}
          onSwitchAIDifficulty={setAIDifficulty}
          onJoinQueue={joinQueue}
          onLeaveQueue={leaveQueue}
          onResetGame={() => resetGame()}
          onFlipBoard={flipBoard}
          onLogout={logout}
        />

        <section style={styles.boardPanel}>
          <div
            style={{
              ...styles.boardShell,
              transform: boardTransform,
              transition: shake
                ? "transform 0.12s ease"
                : isManualFlipAnimating
                  ? "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none"
            }}
          >
            <Board
              board={board}
              orientation={orientation}
              selected={selected}
              moves={moves}
              lastMove={lastMove}
              checkedKing={checkedKing}
              onSquareClick={handleClick}
            />
          </div>
        </section>

        <aside style={styles.movesPanel}>
          <MoveList history={history} />
          <div style={{ marginTop: "18px" }}>
            <LeaderboardPanel users={leaderboard} />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
