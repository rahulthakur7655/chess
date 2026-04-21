export const styles = {
  container: {
    minHeight: "100vh",
    padding: "32px",
    background:
      "radial-gradient(circle at top, #27445d 0%, #11212d 45%, #06141b 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f5f7fa",
    fontFamily: '"Segoe UI", sans-serif',
    boxSizing: "border-box"
  },
  shell: {
    width: "100%",
    maxWidth: "1460px",
    display: "grid",
    gridTemplateColumns: "minmax(280px, 340px) auto minmax(240px, 300px)",
    gap: "24px",
    alignItems: "start"
  },
  authShell: {
    width: "100%",
    maxWidth: "520px"
  },
  authCard: {
    padding: "28px",
    borderRadius: "24px",
    background: "rgba(6,20,27,0.72)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 22px 60px rgba(0, 0, 0, 0.35)",
    display: "grid",
    gap: "18px"
  },
  authForm: {
    display: "grid",
    gap: "12px"
  },
  input: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: "#f5f7fa",
    outline: "none"
  },
  errorText: {
    margin: 0,
    color: "#fda4af"
  },
  helperText: {
    margin: 0,
    color: "#c7d5e0",
    lineHeight: 1.5,
    fontSize: "14px"
  },
  sidePanel: {
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },
  boardPanel: {
    display: "flex",
    justifyContent: "center"
  },
  movesPanel: {
    alignSelf: "stretch"
  },
  eyebrow: {
    margin: 0,
    color: "#9db2bf",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    fontSize: "12px"
  },
  title: {
    margin: 0,
    fontSize: "48px",
    lineHeight: 1
  },
  subtitle: {
    margin: 0,
    color: "#c7d5e0",
    lineHeight: 1.6
  },
  statusCard: {
    padding: "18px 20px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)"
  },
  statusLabel: {
    display: "block",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "#9db2bf",
    marginBottom: "8px"
  },
  statusText: {
    fontSize: "20px",
    lineHeight: 1.4
  },
  modeCard: {
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(8px)"
  },
  segmented: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px"
  },
  segmentedThree: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px"
  },
  segmentButton: {
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "14px",
    padding: "11px 14px",
    background: "rgba(255,255,255,0.03)",
    color: "#f5f7fa",
    fontWeight: 600,
    cursor: "pointer"
  },
  segmentButtonActive: {
    background: "#ffd166",
    color: "#11212d",
    border: "1px solid #ffd166"
  },
  aiControls: {
    marginTop: "16px",
    display: "grid",
    gap: "10px"
  },
  modeHint: {
    margin: "14px 0 0",
    color: "#c7d5e0",
    lineHeight: 1.5
  },
  controls: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px"
  },
  primaryButton: {
    border: "none",
    borderRadius: "999px",
    padding: "12px 18px",
    background: "#ffd166",
    color: "#11212d",
    fontWeight: 700,
    cursor: "pointer"
  },
  secondaryButton: {
    borderRadius: "999px",
    padding: "12px 18px",
    background: "transparent",
    color: "#f5f7fa",
    border: "1px solid rgba(255,255,255,0.25)",
    fontWeight: 600,
    cursor: "pointer"
  },
  disabledButton: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  capturedGrid: {
    display: "grid",
    gap: "14px"
  },
  infoCard: {
    height: "100%",
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(8px)",
    boxSizing: "border-box"
  },
  profileHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "start"
  },
  profileName: {
    margin: "4px 0",
    fontSize: "24px"
  },
  profileMeta: {
    margin: 0,
    color: "#c7d5e0"
  },
  statsGrid: {
    marginTop: "16px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px"
  },
  statPill: {
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.04)"
  },
  infoLabel: {
    display: "block",
    marginBottom: "12px",
    color: "#9db2bf",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.12em"
  },
  capturedRow: {
    minHeight: "38px",
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    alignItems: "center"
  },
  capturedPiece: {
    fontSize: "30px",
    lineHeight: 1
  },
  emptyState: {
    color: "#9db2bf"
  },
  boardShell: {
    padding: "18px",
    borderRadius: "28px",
    background: "rgba(6,20,27,0.58)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 22px 60px rgba(0, 0, 0, 0.35)",
    willChange: "transform"
  },
  moveList: {
    display: "grid",
    gap: "8px",
    maxHeight: "560px",
    overflowY: "auto"
  },
  moveItem: {
    display: "grid",
    gridTemplateColumns: "52px 1fr",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.04)"
  },
  moveNumber: {
    color: "#9db2bf",
    fontVariantNumeric: "tabular-nums"
  },
  leaderboardList: {
    display: "grid",
    gap: "10px"
  },
  leaderboardItem: {
    display: "grid",
    gridTemplateColumns: "44px 1fr",
    gap: "10px",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.04)"
  },
  leaderboardMeta: {
    color: "#9db2bf",
    fontSize: "13px"
  }
};
